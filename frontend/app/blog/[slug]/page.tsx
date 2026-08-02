import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/sanity.queries";
import { breadcrumbList } from "@/lib/schemas";
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
    title: `${post.title} — Etihad Town Lahore`,
    description: post.excerpt || `Read about ${post.title} from Etihad Town Lahore.`,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <article className="py-24 bg-neutral-50">
        <div className="max-w-[720px] mx-auto px-6 lg:px-12">
          <Reveal y={20}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-accent transition-colors mb-8"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to Blog
          </Link>
          </Reveal>

          <Reveal delay={0.1}>
          <header className="mb-10">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((cat: string) => (
                  <span
                    key={cat}
                    className="text-xs font-medium text-accent bg-accent/5 px-2.5 py-1 rounded-full"
                  >
                    {cat.replace(/-/g, " ")}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-5xl mb-4">{post.title}</h1>

            <div className="flex items-center gap-4 text-sm text-neutral-400">
              {post.author && <span>{post.author}</span>}
              {post.publishedAt && (
                <time>
                  {parsePostDate(post.publishedAt).toLocaleDateString("en-PK", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>
          </header>
          </Reveal>

          {post.image && (
            <Reveal delay={0.15}>
            <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 mb-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>
            </Reveal>
          )}

          {post.mainImage && (
            <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-neutral-200 to-neutral-300 mb-12 overflow-hidden" />
          )}

          {post.body ? (
            <Reveal delay={0.1}>
            <div className="prose prose-neutral max-w-none">
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
                        <Tag key={i} className="text-neutral-700 leading-relaxed mb-4">
                          {block.children?.map((child, j) => (
                            <span key={j}>{child.text}</span>
                          ))}
                        </Tag>
                      );
                    }
                    if (block._type === "table" && block.rows) {
                      return (
                        <div key={i} className="overflow-x-auto border border-neutral-200 rounded-xl my-8">
                          <table className="w-full text-sm">
                            <tbody>
                              {block.rows.map((row, r) => (
                                <tr key={r} className={r === 0 ? "bg-primary text-white/90" : "border-t border-neutral-100"}>
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className={`px-4 py-3 ${r > 0 && cIdx === 0 ? "font-medium text-primary" : "text-neutral-600"}`}>
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
                          <div className="aspect-video rounded-xl bg-neutral-200" />
                          {block.alt && (
                            <figcaption className="text-sm text-neutral-400 mt-2 text-center">
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
            <p className="text-neutral-400 italic">
              Content coming soon.
            </p>
          )}

          <hr className="my-12 border-neutral-200" />

          <Reveal delay={0.1}>
          <div className="text-center">
            <p className="text-neutral-500 text-sm mb-4">
              Interested in owning a plot at Etihad Town?
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent-dark transition-all"
            >
              View Available Plots
            </Link>
          </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
