import { createClient } from "@sanity/client";
import { createReadStream, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { blogPosts } from "../lib/blog-posts";

const token = process.env.SANITY_API_TOKEN;
if (!token) {
  console.error("SANITY_API_TOKEN env var required");
  process.exit(1);
}

const client = createClient({
  projectId: "5dp82rcg",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

const ROOT = path.resolve(process.cwd(), "..");
const IMAGES_DIR = path.join(ROOT, "reference", "etihad-scrape", "images");
const POST_XML = path.join(ROOT, "reference", "etihad-scrape", "etihad-post.xml");
const MEDIA_TXT = path.join(ROOT, "reference", "etihad-scrape", "pages", "media.txt");

const MIME: Record<string, string> = {
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

function contentType(file: string): string {
  return MIME[path.extname(file).toLowerCase()] ?? "application/octet-stream";
}

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const ALL_IMAGES = walk(IMAGES_DIR);

function resolveImage(basename: string): string | null {
  const variants = [basename, basename.replace(/-\d{2,4}x\d{2,4}(\.[a-z]+)$/i, "$1")];
  for (const v of variants) {
    const hits = ALL_IMAGES.filter((p) => path.basename(p) === v);
    if (hits.length) return hits.sort((a, b) => b.length - a.length)[0];
  }
  return null;
}

function slugToImageMap(): Record<string, string> {
  const xml = readFileSync(POST_XML, "utf8");
  const map: Record<string, string> = {};
  for (const block of xml.split("<url>").slice(1)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (!loc) continue;
    const slug = loc.replace(/\/$/, "").split("/").pop() ?? "";
    const img = block.match(/<image:loc>([^<]+)<\/image:loc>/)?.[1];
    if (slug && img) map[slug] = img.split("/").pop() ?? "";
  }
  return map;
}

type BlogBody = { _type: string; style?: string; children?: { text: string }[]; rows?: string[][] };

function toPortableText(body: BlogBody[]): unknown[] {
  return body
    .map((b): unknown | null => {
      if (b._type === "block") {
        return {
          _type: "block",
          style: b.style ?? "normal",
          children: (b.children ?? []).map((c) => ({
            _type: "span",
            marks: [],
            text: c.text,
          })),
        };
      }
      if (b._type === "table" && b.rows) {
        const texts = b.rows.filter((r) => r.join("").trim()).map((r) => r.join(" | "));
        if (texts.length === 0) return null;
        return {
          _type: "block",
          style: "normal",
          children: texts.map((t) => ({ _type: "span", marks: [], text: t })),
        };
      }
      return null;
    })
    .filter((b): b is unknown => b !== null);
}

async function uploadImage(file: string, alt: string) {
  const asset = await client.assets.upload(
    "image",
    createReadStream(file),
    {
      filename: path.basename(file),
      contentType: contentType(file),
    }
  );
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt };
}

async function importBlogs() {
  const imageMap = slugToImageMap();
  const docs = [];
  for (const post of blogPosts) {
    const imgFile = resolveImage(imageMap[post.slug] ?? "");
    let mainImage = null;
    if (imgFile) {
      mainImage = await uploadImage(imgFile, post.title);
    } else {
      console.warn(`[blog] no local image for ${post.slug}`);
    }
    docs.push({
      _id: `blog-${post.slug}`,
      _type: "blog",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      mainImage,
      body: toPortableText(post.body as BlogBody[]),
      publishedAt: post.publishedAt ? `${post.publishedAt}T00:00:00Z` : null,
      author: "Etihad Town",
      categories: post.categories.map((c) => c.replace(/\s+/g, "-").toLowerCase()),
    });
  }
  await commit("blog", docs);
}

async function importMedia(dry: boolean) {
  const txt = readFileSync(MEDIA_TXT, "utf8");
  const seen = new Set<string>();
  const tokens = [...txt.matchAll(/\[IMG:[^|\]]*\|([^\]]+)\]/g)]
    .map((m) => m[1].trim())
    .filter((src) => src.includes("/uploads/"));
  const docs = [];
  let missing = 0;
  for (const src of tokens) {
    const basename = decodeURIComponent(src.split("/").pop() ?? "");
    const key = basename.replace(/-\d{2,4}x\d{2,4}(?=\.[a-z]+$)/i, "");
    if (seen.has(key)) continue;
    seen.add(key);
    const file = resolveImage(basename);
    if (!file) {
      missing++;
      continue;
    }
    const title = basename.replace(/\.[a-z0-9]+$/i, "").replace(/[-_]+/g, " ");
    if (dry) continue;
    const image = await uploadImage(file, title);
    docs.push({
      _id: `media-${key.replace(/\.[a-z0-9]+$/i, "").replace(/[^a-z0-9-_]/gi, "-")}`,
      _type: "media",
      title,
      mediaType: "image",
      image,
      tags: [],
    });
  }
  if (dry) {
    console.log(`[media] would import ${seen.size} unique items, ${missing} missing locally`);
    return;
  }
  await commit("media", docs);
}

async function commit(label: string, docs: Array<{ _id: string; _type: string } & Record<string, unknown>>) {
  for (let i = 0; i < docs.length; i += 10) {
    const batch = docs.slice(i, i + 10);
    const tx = client.transaction();
    for (const d of batch) tx.createOrReplace(d);
    await tx.commit();
    console.log(`[${label}] committed ${Math.min(i + 10, docs.length)}/${docs.length}`);
  }
}

async function main() {
  const only = process.argv[2] ?? "all";
  const dry = process.argv.includes("--dry");
  if (only === "blog" || only === "all") await importBlogs();
  if (only === "media" || only === "all") await importMedia(dry);
  console.log("done");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
