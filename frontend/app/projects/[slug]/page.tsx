import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { PaymentPlanGroup, PaymentPlanRow } from "@/lib/projects"
import { projects, getProjectBySlug, getStartingPrice, formatPrice, formatPriceCr } from "@/lib/projects"
import { breadcrumbList, faqPage, projectListingSchema } from "@/lib/schemas"
import { absoluteUrl } from "@/lib/site"
import { Reveal } from "@/components/reveal"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}
  return {
    title: `${project.name} Payment Plan & Availability`,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.name} | Etihad Town Lahore`,
      description: project.description,
      url: `/projects/${slug}`,
      images: [{
        url: `/images/${slug}.webp`,
        alt: `${project.name} at Etihad Town`,
      }],
    },
  }
}

const statusStyle: Record<string, string> = {
  Available: "bg-accent/15 text-accent border-accent/30",
  Limited: "bg-amber-400/15 text-amber-300 border-amber-400/30",
  "Waiting List": "bg-blue-400/15 text-blue-200 border-blue-400/30",
  "Sold Out": "bg-white/10 text-white/60 border-white/15",
}

const rowStatusStyle: Record<string, string> = {
  "Sold Out": "bg-neutral-200 text-neutral-500",
  Limited: "bg-amber-400/20 text-amber-700",
}

function PriceTable({ group }: { group: PaymentPlanGroup }) {
  const { rows, title, note } = group
  const c = rows[0]?.currency || "PKR"
  const hasBlock = rows.some((r) => r.block)
  const hasStatus = rows.some((r) => r.status)
  const hasBalloon = rows.some((r) => r.balloons && r.balloonAmount)
  const hasAnnual = rows.some((r) => r.annualPayments && r.annualAmount)
  const hasBallot = rows.some((r) => r.ballot)
  const hasConfirmation = rows.some((r) => r.confirmation)
  const hasPossession = rows.some((r) => r.possession)
  return (
    <div className="mt-10">
      <div className="mb-5">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        {note && <p className="mt-1 text-sm text-neutral-400">{note}</p>}
      </div>
      <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white shadow-[0_10px_40px_rgba(7,30,69,0.06)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gradient-to-r from-primary to-primary-light text-left text-white">
              <th className="px-4 py-4 font-semibold">Size</th>
              {hasBlock && <th className="px-4 py-4 font-semibold">Block / Plan</th>}
              {hasStatus && <th className="px-4 py-4 font-semibold">Status</th>}
              <th className="px-4 py-4 text-right font-semibold">Total Price</th>
              <th className="px-4 py-4 text-right font-semibold">Down Payment {rows[0]?.downPaymentLabel ? `(${rows[0].downPaymentLabel})` : ""}</th>
              {hasConfirmation && <th className="px-4 py-4 text-right font-semibold">Confirmation</th>}
              <th className="px-4 py-4 text-right font-semibold">Monthly ({rows[0]?.installments})</th>
              {hasBalloon && <th className="px-4 py-4 text-right font-semibold">Balloon</th>}
              {hasAnnual && <th className="px-4 py-4 text-right font-semibold">Annual</th>}
              {hasBallot && <th className="px-4 py-4 text-right font-semibold">Ballot</th>}
              {hasPossession && <th className="px-4 py-4 text-right font-semibold">Possession</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <PriceRow key={i} row={row} c={c} last={i === rows.length - 1} show={[hasBlock, hasStatus, hasConfirmation, hasBalloon, hasAnnual, hasBallot, hasPossession]} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PriceRow({ row, c, last, show }: { row: PaymentPlanRow; c: string; last: boolean; show: [boolean, boolean, boolean, boolean, boolean, boolean, boolean] }) {
  const [hasBlock, hasStatus, hasConfirmation, hasBalloon, hasAnnual, hasBallot, hasPossession] = show
  return (
    <tr className={`bg-white ${last ? "" : "border-b border-neutral-100"} hover:bg-soft/60 transition-colors`}>
      <td className="px-4 py-3.5 font-semibold text-primary">{row.size}</td>
      {hasBlock && <td className="px-4 py-3.5 text-xs text-neutral-500">{row.block}</td>}
      {hasStatus && (
        <td className="px-4 py-3.5">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${rowStatusStyle[row.status ?? ""] ?? "bg-accent/10 text-accent-dark"}`}>
            {row.status}
          </span>
        </td>
      )}
      <td className="px-4 py-3.5 text-right font-bold text-neutral-800">
        {formatPrice(row.price, c)}
      </td>
      <td className="px-4 py-3.5 text-right text-neutral-600">
        {formatPrice(row.downPayment, c)}
      </td>
      {hasConfirmation && (
        <td className="px-4 py-3.5 text-right text-neutral-600">
          {row.confirmation ? formatPrice(row.confirmation, c) : "—"}
        </td>
      )}
      <td className="px-4 py-3.5 text-right font-semibold text-accent">
        {formatPrice(row.monthly, c)}
        <span className="text-xs font-normal text-neutral-400">/mo</span>
      </td>
      {hasBalloon && (
        <td className="px-4 py-3.5 text-right text-neutral-600">
          {row.balloons && row.balloonAmount ? `${row.balloons} × ${formatPrice(row.balloonAmount, c)}` : "—"}
        </td>
      )}
      {hasAnnual && (
        <td className="px-4 py-3.5 text-right text-neutral-600">
          {row.annualPayments && row.annualAmount ? `${row.annualPayments} × ${formatPrice(row.annualAmount, c)}` : "—"}
        </td>
      )}
      {hasBallot && (
        <td className="px-4 py-3.5 text-right text-neutral-600">
          {row.ballot ? formatPrice(row.ballot, c) : "—"}
        </td>
      )}
      {hasPossession && (
        <td className="px-4 py-3.5 text-right text-neutral-600">
          {row.possession ? formatPrice(row.possession, c) : "—"}
        </td>
      )}
    </tr>
  )
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="mt-12">
      <h3 className="text-xl font-bold text-primary">Amenities &amp; Features</h3>
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-white px-4 py-3 text-sm text-neutral-600 transition-colors hover:border-accent/30">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10">
              <svg className="h-3 w-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {f}
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const breadcrumb = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
    { name: project.name, url: `/projects/${slug}` },
  ])

  const faqSchema = project.faqs ? faqPage(project.faqs) : null

  const startingPrice = getStartingPrice(project)

  const priceLabel = formatPriceCr(startingPrice)
  const projectSchema = projectListingSchema({
    name: `Etihad Town ${project.name}`,
    description: project.description,
    url: absoluteUrl(`/projects/${slug}`),
    image: absoluteUrl(`/images/${slug}.webp`),
    location: project.location,
    status: project.status,
    startingPrice,
    currency: project.paymentPlans?.[0]?.rows?.[0]?.currency || "PKR",
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/${slug}.webp)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.96] via-primary/85 to-primary/50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/95 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 md:py-32 lg:px-12">
          <Reveal>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] backdrop-blur-md ${statusStyle[project.status]}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {project.status}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] text-white md:text-6xl">
              Etihad Town {project.name}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {project.tagline}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
              {startingPrice > 0 && (
                <div>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-white/55">
                    Starting from
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-accent md:text-3xl">
                    {priceLabel}
                  </p>
                </div>
              )}
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/55">
                  Location
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-white/90 md:text-base">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`https://wa.me/923204474819?text=${encodeURIComponent(`Hi, I'm interested in ${project.name} at Etihad Town.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(140,198,63,0.35)] transition-all hover:scale-[1.02] hover:bg-accent-dark"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  Book a visit
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Reveal delay={0.05}>
                <p className="text-lg font-medium leading-relaxed text-neutral-700">
                  {project.tagline}
                </p>
                {project.longDescription.map((para, i) => (
                  <p key={i} className="mt-4 text-sm leading-[1.8] text-neutral-500">
                    {para}
                  </p>
                ))}
              </Reveal>

              <Reveal delay={0.1}>
                <FeatureList features={project.features} />
              </Reveal>

              {project.locationHighlights && project.locationHighlights.length > 0 && (
                <Reveal delay={0.15}>
                  <div className="mt-12">
                    <h3 className="text-xl font-bold text-primary">Location Highlights</h3>
                    <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {project.locationHighlights.map((h) => (
                        <li key={h} className="flex items-start gap-2.5 rounded-xl border border-neutral-100 bg-white px-4 py-3 text-sm text-neutral-600">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}

              {project.paymentPlans?.map((group, i) => (
                <Reveal key={i} delay={0.1 + i * 0.05}>
                  <PriceTable group={group} />
                </Reveal>
              ))}
            </div>

            <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <Reveal x={30} y={0} delay={0.1}>
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-primary shadow-[0_30px_80px_rgba(7,30,69,0.35)]">
                  <div className="bg-gradient-to-r from-accent to-accent-dark px-7 py-5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Interested in this phase?
                    </h3>
                  </div>
                  <div className="p-7">
                    <p className="text-sm leading-relaxed text-white/75">
                      Our team can share current availability, exact pricing, and guide
                      you through the booking process — all in a single conversation.
                    </p>
                    <a
                      href={`https://wa.me/923204474819?text=${encodeURIComponent(`Hi, I'm interested in ${project.name} at Etihad Town.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-[#20bd5a]"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      Chat on WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="mt-3 flex w-full items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-white/20"
                    >
                      Contact Sales Office
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal x={30} y={0} delay={0.2}>
                <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-[0_15px_50px_rgba(7,30,69,0.08)]">
                  <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                    <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    Phase Details
                  </h3>
                  <dl className="mt-5 space-y-4 text-sm">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <dt className="text-neutral-400">Status</dt>
                      <dd className="font-medium text-neutral-700">{project.status}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-3">
                      <dt className="shrink-0 text-neutral-400">Location</dt>
                      <dd className="text-right font-medium text-neutral-700">{project.location}</dd>
                    </div>
                    {startingPrice > 0 && (
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                        <dt className="text-neutral-400">Starting From</dt>
                        <dd className="font-bold text-accent">{priceLabel}</dd>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <dt className="text-neutral-400">Developer</dt>
                      <dd className="font-medium text-neutral-700">Etihad Group</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>

          {project.faqs && project.faqs.length > 0 && (
            <Reveal delay={0.1}>
              <div className="mx-auto mt-20 max-w-3xl">
                <div className="mb-8 text-center">
                  <span className="text-accent font-semibold text-sm tracking-[0.2em] uppercase">
                    Got Questions?
                  </span>
                  <h3 className="mt-2 text-3xl font-extrabold text-primary">
                    Frequently Asked Questions
                  </h3>
                </div>
                <div className="space-y-4">
                  {project.faqs.map((faq, i) => (
                    <details
                      key={i}
                      className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_30px_rgba(7,30,69,0.05)] transition-colors open:border-accent/40"
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-7 py-5 text-sm font-semibold text-primary">
                        {faq.question}
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-soft text-primary transition-all group-open:rotate-45 group-open:bg-accent group-open:text-white">
                          <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </span>
                      </summary>
                      <div className="border-t border-neutral-100 px-7 pb-6 pt-4 text-sm leading-relaxed text-neutral-500">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.05}>
            <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-6 sm:flex-row sm:p-8">
              <div>
                <h3 className="text-lg font-bold text-primary">
                  Can&apos;t decide which phase fits you?
                </h3>
                <p className="mt-1 text-sm text-neutral-500">
                  Talk to our sales team and compare plans side by side.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-primary-light"
              >
                Get free consultation
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 pt-8">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                <svg className="h-3.5 w-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
                Back to all projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
