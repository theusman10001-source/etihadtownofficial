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
  title: "Projects — Etihad Town Lahore",
  description:
    "Explore all Etihad Town Lahore projects — Phase I, II, III, IV, Premier Enclave, and Sialkot. View payment plans, sizes, and availability.",
}

export default function ProjectsPage() {
  const breadcrumb = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <section className="py-24 bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Reveal className="max-w-2xl mb-16">
            <span className="text-accent font-semibold text-sm tracking-[0.2em] uppercase">
              Our Projects
            </span>
            <h1 className="text-4xl md:text-5xl mt-3">
              All Etihad Town Projects
            </h1>
            <p className="text-neutral-500 text-lg mt-4">
              From Phase I to our latest Phase IV and expansion into Sialkot — 
              six projects, each with its own character and payment plan.
            </p>
          </Reveal>

          <div className="space-y-6">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <Link
                  href={`/projects/${project.slug}`}
                  className={`group block bg-white border border-neutral-200 hover:border-accent/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ${
                    i === 0 ? "lg:flex" : ""
                  }`}
                >
                <div className={`${i === 0 ? "lg:w-1/3" : ""} relative overflow-hidden bg-primary`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${imageMap[project.slug]})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-primary/20" />
                  <div className="relative p-6 lg:p-8 min-h-[220px] flex flex-col justify-end">
                    <span
                      className={`inline-block self-start px-2.5 py-0.5 text-xs font-semibold mb-3 ${
                        project.status === "Available"
                          ? "bg-accent/25 text-accent"
                          : project.status === "Limited"
                            ? "bg-amber-400/20 text-amber-300"
                            : project.status === "Waiting List"
                              ? "bg-blue-400/20 text-blue-200"
                              : "bg-white/10 text-white/60"
                      }`}
                    >
                      {project.status}
                    </span>
                    <h2 className="text-2xl md:text-3xl text-white">
                      {project.name}
                    </h2>
                    <p className="text-white/60 text-xs mt-1">{project.location}</p>
                  </div>
                </div>
                <div className={`${i === 0 ? "lg:w-2/3" : ""} p-6 lg:p-8 flex flex-col justify-between`}>
                  <div>
                    <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                      {project.tagline}
                    </p>
                    {project.paymentPlans?.[0]?.rows?.[0] && (
                      <p className="text-xs text-neutral-400">
                        From <span className="text-accent font-semibold">{formatPriceCr(getStartingPrice(project))}</span>
                        {project.paymentPlans[0].rows[0].installments && (
                          <> &middot; {project.paymentPlans[0].rows[0].installments}-month plan</>
                        )}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm font-medium text-primary group-hover:text-accent transition-colors">
                    View details
                    <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
