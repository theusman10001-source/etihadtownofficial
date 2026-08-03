import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/sanity.queries";
import { blogPosting, breadcrumbList } from "@/lib/schemas";
import { absoluteUrl } from "@/lib/site";
import { parsePostDate } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  if (!posts) return [];
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt || `Read about ${post.title} from Etihad Town Lahore.`,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt || `Read about ${post.title} from Etihad Town Lahore.`,
      url: `/blog/${slug}`,
      type: "article",
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(post.image ? { images: [{ url: post.image, alt: post.title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `Read about ${post.title} from Etihad Town Lahore.`,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) notFound();

  const breadcrumb = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${slug}` },
  ]);
  const articleSchema = blogPosting({
    headline: post.title,
    description: post.excerpt || `Read about ${post.title} from Etihad Town Lahore.`,
    url: absoluteUrl(`/blog/${slug}`),
    image: post.image ? absoluteUrl(post.image) : undefined,
    datePublished: post.publishedAt,
    author: post.author,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="relative overflow-hidden bg-primary">
        {post.image && (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary" />

        <div className="relative z-10 mx-auto max-w-[900px] px-6 py-24 md:py-32 lg:px-8">
          <Reveal y={20}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/85 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to Blog
            </Link>
          </Reveal>

          <Reveal delay={0.1}>
            <header className="mt-8">
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((cat: string) => (
                    <span
                      key={cat}
                      className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white"
                    >
                      {cat.replace(/-/g, " ")}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mt-5 text-3xl font-extrabold leading-[1.15] text-white md:text-5xl">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                {post.author && (
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                      {post.author.charAt(0).toUpperCase()}
                    </span>
                    <span className="font-semibold text-white">{post.author}</span>
                  </span>
                )}
                {post.publishedAt && (
                  <span className="flex items-center gap-2 text-white/70">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <time dateTime={post.publishedAt}>
                      {parsePostDate(post.publishedAt).toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </span>
                )}
              </div>
            </header>
          </Reveal>
        </div>
      </section>

      <article className="bg-neutral-50 pb-24">
        <div className="mx-auto max-w-[900px] px-6 lg:px-8">
          {!post.image && post.mainImage && (
            <div className="aspect-[16/9] rounded-3xl bg-gradient-to-br from-neutral-200 to-neutral-300" />
          )}

          {post.body ? (
            <Reveal delay={0.1}>
              <div className="prose prose-neutral mx-auto mt-12 max-w-none lg:prose-lg prose-headings:text-primary prose-p:text-neutral-600 prose-p:leading-[1.9] prose-strong:text-primary">
                {Array.isArray(post.body) &&
                  post.body.map(
                    (
                      block: {
                        _type: string;
                        style?: string;
                        children?: { text: string }[];
                        rows?: string[][];
                        alt?: string;
                      },
                      i: number
                    ) => {
                      if (block._type === "block") {
                        const Tag = block.style === "h2" ? "h2" : block.style === "h3" ? "h3" : "p";
                        return (
                          <Tag key={i} className="mb-5 leading-[1.9]">
                            {block.children?.map((child, j) => (
                              <span key={j}>{child.text}</span>
                            ))}
                          </Tag>
                        );
                      }
                      if (block._type === "table" && block.rows) {
                        return (
                          <div key={i} className="my-8 overflow-hidden rounded-2xl border border-neutral-200 shadow-[0_10px_40px_rgba(7,30,69,0.06)]">
                            <table className="w-full text-sm">
                              <tbody>
                                {block.rows.map((row, r) => (
                                  <tr key={r} className={r === 0 ? "bg-gradient-to-r from-primary to-primary-light text-white/90" : "border-t border-neutral-100 bg-white"}>
                                    {row.map((cell, cIdx) => (
                                      <td key={cIdx} className={`px-5 py-3.5 ${r > 0 && cIdx === 0 ? "font-semibold text-primary" : r === 0 ? "font-semibold" : "text-neutral-600"}`}>
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      }
                      if (block._type === "image") {
                        return (
                          <figure key={i} className="my-8">
                            <div className="aspect-video rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300" />
                            {block.alt && (
                              <figcaption className="mt-3 text-center text-sm text-neutral-400">
                                {block.alt}
                              </figcaption>
                            )}
                          </figure>
                        );
                      }
                      return null;
                    }
                  )}
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <p className="mt-12 text-center text-neutral-400 italic">
                Content coming soon.
              </p>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="relative mt-16 overflow-hidden rounded-3xl bg-primary p-8 md:p-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(140,198,63,0.2),transparent_20rem)]" />
              <div className="relative text-center">
                <span className="text-accent text-xs font-semibold uppercase tracking-[0.2em]">
                  Ready to invest?
                </span>
                <h2 className="mt-3 text-2xl font-extrabold text-white md:text-3xl">
                  Own a plot at Etihad Town today
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/70">
                  Talk to our team about current availability, payment plans, and
                  flexible instalment options.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(140,198,63,0.35)] transition-all hover:scale-[1.02] hover:bg-accent-dark"
                  >
                    Contact us
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-7 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                  >
                    View projects
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-12 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                <svg className="h-4 w-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                More from the blog
              </Link>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
