import Link from "next/link"
import type { Metadata } from "next"
import { projects, getStartingPrice, formatPriceCr } from "@/lib/projects"
import { breadcrumbList } from "@/lib/schemas"
import { Reveal } from "@/components/reveal"

const imageMap: Record<string, string> = {
  "phase-4": "/images/phase-4.webp",
  "phase-3": "/images/phase-3.webp",
  "premier-enclave": "/images/premier-enclave.webp",
  sialkot: "/images/sialkot.webp",
  "phase-2": "/images/phase-2.webp",
  "phase-1": "/images/phase-1.webp",
}

export const metadata: Metadata = {
  title: "Projects, Payment Plans & Availability",
  description:
    "Explore all Etihad Town Lahore projects — Phase I, II, III, IV, Premier Enclave, and Sialkot. View payment plans, sizes, and availability.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Etihad Town Projects, Payment Plans & Availability",
    description:
      "Compare Etihad Town projects, plot sizes, payment plans, and current availability.",
    url: "/projects",
    images: [{ url: "/images/project-image.webp", alt: "Etihad Town projects in Lahore and Sialkot" }],
  },
}

const heroStats = [
  { value: "6", label: "Projects" },
  { value: "3", label: "Cities" },
  { value: "50,000+", label: "Kanals Planned" },
  { value: "LDA", label: "Approved" },
]

const statusStyle: Record<string, string> = {
  Available: "bg-accent/15 text-accent border-accent/30",
  Limited: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  "Waiting List": "bg-blue-400/15 text-blue-200 border-blue-400/30",
  "Sold Out": "bg-white/10 text-white/60 border-white/15",
}

export default function ProjectsPage() {
  const breadcrumb = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ])

  const [featured, ...rest] = projects

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/project-image.webp)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.97] via-primary/88 to-primary/55" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/95 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 md:py-32 lg:px-12">
          <Reveal y={24}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Our Projects
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] text-white md:text-6xl">
              Every phase, planned for{" "}
              <span className="text-accent">a better tomorrow</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-white/80 md:text-lg">
              From Phase I to our latest Phase IV and the expansion into Sialkot —
              six projects, each with its own character, location, and payment plan.
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
          <Reveal className="mb-14">
            <span className="text-accent font-semibold text-sm tracking-[0.2em] uppercase">
              Featured
            </span>
            <h2 className="mt-3 text-[32px] md:text-4xl">
              Explore current availability
            </h2>
          </Reveal>

          <div className="space-y-10">
            <Reveal delay={0.05}>
              <Link
                href={`/projects/${featured.slug}`}
                className="group relative block min-h-[420px] overflow-hidden rounded-3xl bg-primary lg:min-h-[480px]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${imageMap[featured.slug]})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/55 to-primary/15" />

                <div className="relative flex h-full flex-col justify-between p-8 lg:p-14">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
                      Best Seller
                    </span>
                    <span
                      className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm ${statusStyle[featured.status]}`}
                    >
                      {featured.status}
                    </span>
                  </div>

                  <div className="max-w-2xl">
                    <h2 className="text-3xl font-extrabold text-white md:text-5xl">
                      Etihad Town {featured.name}
                    </h2>
                    <p className="mt-3 max-w-xl text-base text-white/85 md:text-lg">
                      {featured.tagline}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                      <span className="text-xl font-bold text-accent md:text-2xl">
                        From {formatPriceCr(getStartingPrice(featured))}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-white/80 transition-all group-hover:gap-3">
                        View payment plan
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((project, i) => (
                <Reveal key={project.slug} delay={(i % 3) * 0.08}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_25px_60px_rgba(7,30,69,0.14)]"
                  >
                    <div className="relative h-56 overflow-hidden bg-primary">
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                        style={{ backgroundImage: `url(${imageMap[project.slug]})` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-primary/15" />
                      <div className="absolute left-4 top-4">
                        <span
                          className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider backdrop-blur-sm ${statusStyle[project.status]}`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-extrabold text-white">
                          Etihad Town {project.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-white/70">
                          {project.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <p className="text-sm leading-relaxed text-neutral-500">
                        {project.tagline}
                      </p>
                      <div className="mt-auto flex items-center justify-between border-t border-neutral-100 pt-5">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                            Starting from
                          </p>
                          <p className="mt-1 text-base font-bold text-accent">
                            {formatPriceCr(getStartingPrice(project))}
                          </p>
                        </div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-soft text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
