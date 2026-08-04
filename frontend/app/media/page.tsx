import type { Metadata } from "next";
import Image from "next/image";
import { getMedia } from "@/lib/sanity.queries";
import { breadcrumbList } from "@/lib/schemas";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Photos & Videos Gallery",
  description:
    "Browse photos and videos of Etihad Town Lahore — aerial views, development progress, infrastructure, and community spaces.",
  alternates: { canonical: "/media" },
  openGraph: {
    title: "Etihad Town Photos & Videos Gallery",
    description:
      "Aerial views, development progress, infrastructure, and community spaces across Etihad Town Lahore.",
    url: "/media",
    images: [{ url: "/images/about-bg.webp", alt: "Etihad Town Lahore photo and video gallery" }],
  },
};

type MediaItem = {
  _id: string;
  title: string;
  mediaType: string;
  image?: string;
  imageAlt?: string;
  videoUrl?: string;
  description?: string;
  tags?: string[];
};

const heroStats = [
  { value: "Photos", label: "& Videos" },
  { value: "6", label: "Projects" },
  { value: "LDA", label: "Approved" },
  { value: "24/7", label: "Secure" },
];

function MediaCard({ item, index }: { item: MediaItem; index: number }) {
  const isVideo = item.mediaType === "video" && item.videoUrl;
  const featured = index % 5 === 0;

  return (
    <Reveal delay={(index % 3) * 0.08}>
      <article
        className={`group relative overflow-hidden rounded-3xl bg-primary transition-shadow hover:shadow-[0_25px_60px_rgba(7,30,69,0.25)] ${
          featured ? "md:col-span-2 md:row-span-2" : ""
        }`}
      >
        <div className={`relative ${featured ? "h-full min-h-[420px]" : "aspect-[4/3]"} overflow-hidden`}>
          {item.image ? (
            <Image
              src={item.image}
              alt={item.imageAlt || item.title}
              fill
              sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-primary-light">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                Etihad Town
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

          {isVideo && (
            <a
              href={item.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch ${item.title}`}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-primary shadow-xl transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                <svg className="ml-0.5 h-6 w-6 md:h-7 md:w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </a>
          )}

          <div className="absolute inset-x-0 bottom-0 z-10 p-6">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                  isVideo ? "bg-accent text-white" : "border border-white/25 bg-white/10 text-white/85 backdrop-blur-sm"
                }`}
              >
                {isVideo ? "Video" : "Photo"}
              </span>
              {item.tags?.slice(0, 2).map((tag) => (
                <span key={tag} className="text-[11px] text-white/70">
                  #{tag.replace(/-/g, " ")}
                </span>
              ))}
            </div>
            <h2 className={`mt-2 font-bold leading-snug text-white ${featured ? "text-xl md:text-2xl" : "text-base"}`}>
              {item.title}
            </h2>
            {item.description && (
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-white/70">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

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

      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/about-bg.webp)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.96] via-primary/85 to-primary/50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/95 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 md:py-32 lg:px-12">
          <Reveal y={24}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Gallery
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] text-white md:text-6xl">
              See Etihad Town{" "}
              <span className="text-accent">taking shape</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-white/80 md:text-lg">
              Aerial views, development progress, and community spaces across all
              phases of Etihad Town, Lahore.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-white md:text-3xl">
                    {stat.value}
                  </div>
                  <div
                    className="mt-1 text-[11px] uppercase tracking-wide text-white/60"
                    dangerouslySetInnerHTML={{ __html: stat.label }}
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          {media && media.length > 0 ? (
            <div className="grid auto-rows-[minmax(0,auto)] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {media.map((item: MediaItem, index: number) => (
                <MediaCard key={item._id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-neutral-200 bg-white py-24 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
                <svg className="h-7 w-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="mt-6 text-lg font-semibold text-primary">
                Media gallery coming soon
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                Add images and videos via Sanity Studio at /studio.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
