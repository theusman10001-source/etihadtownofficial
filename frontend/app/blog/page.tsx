import Link from "next/link";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/sanity.queries";
import { breadcrumbList } from "@/lib/schemas";
import { parsePostDate } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Property Blog, Updates & Investment Guides",
  description:
    "Latest updates on Etihad Town Lahore — payment plans, development progress, investment tips, and community news.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Etihad Town Property Blog & Investment Guides",
    description:
      "Payment plans, development updates, and real-estate investment guides from Etihad Town Lahore.",
    url: "/blog",
  },
};

const heroStats = [
  { value: "6", label: "Live Projects" },
  { value: "50,000+", label: "Kanals Planned" },
  { value: "LDA", label: "Approved" },
  { value: "2005", label: "Established" },
];

export default async function BlogPage() {
  const posts = await getBlogPosts();

  const breadcrumb = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);

  const [lead, ...rest] = posts ?? [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/home-banner.webp)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.96] via-primary/86 to-primary/50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/95 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 md:py-32 lg:px-12">
          <Reveal y={24}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Insights &amp; Updates
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] text-white md:text-6xl">
              News that helps you{" "}
              <span className="text-accent">invest smarter</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-white/80 md:text-lg">
              Payment plan changes, development progress, investment guides, and
              community news from Etihad Town.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-white md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-white/60">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {posts && posts.length > 0 ? (
            <>
              {lead && (
                <Reveal delay={0.05}>
                  <Link
                    href={`/blog/${lead.slug.current}`}
                    className="group relative block min-h-[380px] overflow-hidden rounded-3xl bg-primary lg:min-h-[460px]"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{
                        backgroundImage: lead.image
                          ? `url(${lead.image})`
                          : "url(/images/home-banner.webp)",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/15" />

                    <div className="relative flex h-full flex-col justify-end p-8 lg:p-14">
                      <div className="flex flex-wrap gap-2">
                        {lead.categories?.slice(0, 2).map((cat: string) => (
                          <span
                            key={cat}
                            className="rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white"
                          >
                            {cat.replace(/-/g, " ")}
                          </span>
                        ))}
                        {lead.publishedAt && (
                          <span className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/85 backdrop-blur-sm">
                            {parsePostDate(lead.publishedAt).toLocaleDateString("en-PK", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                      </div>
                      <h2 className="mt-4 max-w-2xl text-2xl font-extrabold leading-snug text-white transition-colors group-hover:text-accent-light md:text-4xl">
                        {lead.title}
                      </h2>
                      {lead.excerpt && (
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/75 md:text-base">
                          {lead.excerpt}
                        </p>
                      )}
                      <div className="mt-6 flex items-center gap-3">
                        {lead.author && (
                          <span className="flex items-center gap-2 text-xs font-medium text-white/85">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                              {lead.author.charAt(0).toUpperCase()}
                            </span>
                            {lead.author}
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-3">
                          Read article
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              )}

              <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map(
                  (
                    post: {
                      _id: string;
                      title: string;
                      slug: { current: string };
                      excerpt: string;
                      publishedAt: string;
                      categories?: string[];
                      author?: string;
                      image?: string;
                    },
                    pi: number
                  ) => (
                    <Reveal key={post._id} delay={(pi % 3) * 0.08}>
                      <Link
                        href={`/blog/${post.slug.current}`}
                        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_25px_60px_rgba(7,30,69,0.12)]"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-soft">
                          {post.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={post.image}
                              alt={post.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary-light">
                              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                                Etihad Town
                              </span>
                            </div>
                          )}
                          {post.categories?.[0] && (
                            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                              {post.categories[0].replace(/-/g, " ")}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-7">
                          <h3 className="text-lg font-bold leading-snug text-primary transition-colors group-hover:text-accent">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="mt-3 text-sm leading-relaxed text-neutral-500 line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}

                          <div className="mt-auto flex items-center justify-between pt-5">
                            <div className="flex items-center gap-2.5">
                              {post.author ? (
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                  {post.author.charAt(0).toUpperCase()}
                                </span>
                              ) : (
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                                  ET
                                </span>
                              )}
                              <div>
                                {post.author && (
                                  <p className="text-xs font-semibold text-neutral-700">
                                    {post.author}
                                  </p>
                                )}
                                {post.publishedAt && (
                                  <time className="text-[11px] text-neutral-400">
                                    {parsePostDate(post.publishedAt).toLocaleDateString("en-PK", {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    })}
                                  </time>
                                )}
                              </div>
                            </div>
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-soft text-primary transition-all group-hover:bg-accent group-hover:text-white">
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </Reveal>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="rounded-3xl border border-neutral-200 bg-white py-24 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v4H7z" />
                </svg>
              </div>
              <p className="mt-6 text-lg font-semibold text-primary">
                Blog posts coming soon
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                Add content via Sanity Studio at /studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
