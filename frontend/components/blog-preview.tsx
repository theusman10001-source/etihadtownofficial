import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/sanity.queries";
import { parsePostDate } from "@/lib/utils";

export async function BlogPreview() {
  let posts;
  try {
    posts = await getBlogPosts();
  } catch {
    return null;
  }

  if (!posts || posts.length === 0) return null;

  const latest = posts.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Insights
            </span>
            <h2 className="text-4xl md:text-5xl mt-3">
              Latest from Our Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden md:inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
          >
            View all posts
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latest.map(
            (post: {
              _id: string;
              title: string;
              slug: { current: string };
              excerpt: string;
              publishedAt: string;
              categories?: string[];
              image?: string;
            }) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group block"
              >
                <article>
                  <div className="relative aspect-[16/10] rounded-xl bg-gradient-to-br from-neutral-100 to-neutral-200 mb-4 overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-200 group-hover:scale-105 transition-transform duration-500" />
                    )}
                  </div>
                  <div className="flex gap-2 mb-3">
                    {post.categories?.slice(0, 2).map((cat) => (
                      <span
                        key={cat}
                        className="text-xs font-medium text-accent bg-accent/5 px-2.5 py-1 rounded-full"
                      >
                        {cat.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-[family-name:var(--font-heading)] text-primary group-hover:text-accent transition-colors mb-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  {post.publishedAt && (
                    <time className="text-xs text-neutral-400 mt-3 block">
                      {parsePostDate(post.publishedAt).toLocaleDateString("en-PK", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                </article>
              </Link>
            )
          )}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
          >
            View all posts
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
