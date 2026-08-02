import type { Metadata } from "next";
import { getMedia } from "@/lib/sanity.queries";
import { breadcrumbList } from "@/lib/schemas";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Media Gallery — Etihad Town Lahore",
  description:
    "Browse photos and videos of Etihad Town Lahore — aerial views, development progress, infrastructure, and community spaces.",
};

export default async function MediaPage() {
  const media = await getMedia();

  const breadcrumb = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Media", url: "/media" },
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
              Gallery
            </span>
            <h1 className="text-4xl md:text-5xl mt-3">
              Etihad Town in Pictures
            </h1>
            <p className="text-neutral-500 text-lg mt-4">
              Aerial views, development updates, and community spaces across
              all phases of Etihad Town, Lahore.
            </p>
          </Reveal>

          {media && media.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {media.map(
                (item: {
                  _id: string;
                  title: string;
                  mediaType: string;
                  videoUrl?: string;
                  description?: string;
                  tags?: string[];
                }, mi: number) => (
                  <Reveal key={item._id} delay={(mi % 3) * 0.1}>
                  <div
                    className="group relative rounded-2xl overflow-hidden bg-white border border-neutral-100"
                  >
                    {item.mediaType === "video" ? (
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-white/60"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-neutral-200 to-neutral-300 group-hover:scale-105 transition-transform duration-500" />
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-accent bg-accent/5 px-2 py-0.5 rounded-full">
                          {item.mediaType === "video" ? "Video" : "Photo"}
                        </span>
                        {item.tags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-[family-name:var(--font-heading)] text-primary font-semibold">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-neutral-500 text-sm mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                  </Reveal>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100">
              <p className="text-neutral-400 text-lg">
                Media gallery coming soon. Add images and videos via Sanity
                Studio at /studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
