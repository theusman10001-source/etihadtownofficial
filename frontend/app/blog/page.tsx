import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/sanity.queries";
import { breadcrumbList } from "@/lib/schemas";
import { parsePostDate } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Blog — Etihad Town Lahore",
  description:
    "Latest updates on Etihad Town Lahore — payment plans, development progress, investment tips, and community news.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const breadcrumb = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="py-24 bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Reveal className="max-w-2xl mb-16">
            <span className="text-accent font-semibold text-sm tracking-widest uppercase">
              Blog
            </span>
            <h1 className="text-4xl md:text-5xl mt-3">
              Etihad Town Lahore — Insights & Updates
            </h1>
            <p className="text-neutral-500 text-lg mt-4">
              Payment plan changes, development updates, investment guides, and
              community news from Etihad Town.
            </p>
          </Reveal>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(
                (post: {
                  _id: string;
                  title: string;
                  slug: { current: string };
                  excerpt: string;
                  publishedAt: string;
                  categories?: string[];
                  author?: string;
                  image?: string;
                }, pi: number) => (
                  <Reveal key={post._id} delay={(pi % 3) * 0.1}>
                  <Link
                    href={`/blog/${post.slug.current}`}
                    className="group block"
                  >
                    <article className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-lg hover:border-accent/20 transition-all duration-200">
                      <div className="aspect-[16/9] bg-gradient-to-br from-neutral-100 to-neutral-200 overflow-hidden">
                        {post.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.categories?.slice(0, 2).map((cat) => (
                            <span
                              key={cat}
                              className="text-xs font-medium text-accent bg-accent/5 px-2.5 py-1 rounded-full"
                            >
                              {cat.replace(/-/g, " ")}
                            </span>
                          ))}
                        </div>
                        <h2 className="text-xl font-[family-name:var(--font-heading)] text-primary group-hover:text-accent transition-colors mb-2">
                          {post.title}
                        </h2>
                        {post.excerpt && (
                          <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-4 text-xs text-neutral-400">
                          {post.author && <span>{post.author}</span>}
                          {post.publishedAt && (
                            <time>
                              {parsePostDate(post.publishedAt).toLocaleDateString(
                                "en-PK",
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </time>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                  </Reveal>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100">
              <p className="text-neutral-400 text-lg">
                Blog posts coming soon. Add content via Sanity Studio at
                /studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
