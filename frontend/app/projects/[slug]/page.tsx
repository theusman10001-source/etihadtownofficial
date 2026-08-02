import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import type { PaymentPlanGroup, PaymentPlanRow } from "@/lib/projects"
import { projects, getProjectBySlug, getStartingPrice, formatPrice, formatPriceCr } from "@/lib/projects"
import { breadcrumbList, faqPage } from "@/lib/schemas"
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
    title: `${project.name} — Etihad Town Lahore`,
    description: project.description,
  }
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
      <h3 className="text-lg font-semibold text-primary mb-1">
        {title}
      </h3>
      {note && <p className="text-sm text-neutral-400 mb-4">{note}</p>}
      <div className="overflow-x-auto border border-neutral-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-white/90 text-left">
              <th className="px-4 py-3 font-medium">Size</th>
              {hasBlock && <th className="px-4 py-3 font-medium">Block / Plan</th>}
              {hasStatus && <th className="px-4 py-3 font-medium">Status</th>}
              <th className="px-4 py-3 font-medium text-right">Total Price</th>
              <th className="px-4 py-3 font-medium text-right">Down Payment {rows[0]?.downPaymentLabel ? `(${rows[0].downPaymentLabel})` : ""}</th>
              {hasConfirmation && <th className="px-4 py-3 font-medium text-right">Confirmation</th>}
              <th className="px-4 py-3 font-medium text-right">Monthly ({rows[0]?.installments})</th>
              {hasBalloon && <th className="px-4 py-3 font-medium text-right">Balloon</th>}
              {hasAnnual && <th className="px-4 py-3 font-medium text-right">Annual</th>}
              {hasBallot && <th className="px-4 py-3 font-medium text-right">Ballot</th>}
              {hasPossession && <th className="px-4 py-3 font-medium text-right">Possession</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <PriceRow key={i} row={row} c={c} show={[hasBlock, hasStatus, hasConfirmation, hasBalloon, hasAnnual, hasBallot, hasPossession]} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PriceRow({ row, c, show }: { row: PaymentPlanRow; c: string; show: [boolean, boolean, boolean, boolean, boolean, boolean, boolean] }) {
  const [hasBlock, hasStatus, hasConfirmation, hasBalloon, hasAnnual, hasBallot, hasPossession] = show
  return (
    <tr className="border-t border-neutral-100">
      <td className="px-4 py-3 font-medium text-primary">{row.size}</td>
      {hasBlock && <td className="px-4 py-3 text-neutral-500 text-xs">{row.block}</td>}
      {hasStatus && (
        <td className="px-4 py-3">
          <span className={`text-[11px] font-semibold px-2 py-0.5 ${row.status === "Sold Out" ? "bg-neutral-200 text-neutral-500" : "bg-amber-400/20 text-amber-700"}`}>
            {row.status}
          </span>
        </td>
      )}
      <td className="px-4 py-3 text-right font-semibold text-neutral-800">
        {formatPrice(row.price, c)}
      </td>
      <td className="px-4 py-3 text-right text-neutral-600">
        {formatPrice(row.downPayment, c)}
      </td>
      {hasConfirmation && (
        <td className="px-4 py-3 text-right text-neutral-600">
          {row.confirmation ? formatPrice(row.confirmation, c) : "—"}
        </td>
      )}
      <td className="px-4 py-3 text-right text-accent font-semibold">
        {formatPrice(row.monthly, c)}
        <span className="text-neutral-400 font-normal text-xs">/mo</span>
      </td>
      {hasBalloon && (
        <td className="px-4 py-3 text-right text-neutral-600">
          {row.balloons && row.balloonAmount ? `${row.balloons} × ${formatPrice(row.balloonAmount, c)}` : "—"}
        </td>
      )}
      {hasAnnual && (
        <td className="px-4 py-3 text-right text-neutral-600">
          {row.annualPayments && row.annualAmount ? `${row.annualPayments} × ${formatPrice(row.annualAmount, c)}` : "—"}
        </td>
      )}
      {hasBallot && (
        <td className="px-4 py-3 text-right text-neutral-600">
          {row.ballot ? formatPrice(row.ballot, c) : "—"}
        </td>
      )}
      {hasPossession && (
        <td className="px-4 py-3 text-right text-neutral-600">
          {row.possession ? formatPrice(row.possession, c) : "—"}
        </td>
      )}
    </tr>
  )
}

function FeatureList({ features }: { features: string[] }) {
  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold text-primary mb-4">
        Amenities & Features
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-2.5 text-sm text-neutral-600 py-2">
            <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(45deg, #C9A84C 1px, transparent 1px),
                linear-gradient(-45deg, #C9A84C 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 py-20 md:py-28">
          <Reveal>
          <span
            className={`inline-block px-3 py-1 text-xs font-semibold mb-4 ${
              project.status === "Available"
                ? "bg-accent/20 text-accent"
                : project.status === "Limited"
                  ? "bg-amber-400/20 text-amber-300"
                  : project.status === "Waiting List"
                    ? "bg-blue-400/20 text-blue-200"
                    : "bg-white/10 text-white/60"
            }`}
          >
            {project.status}
          </span>
          <h1 className="text-4xl md:text-6xl text-white">
            {project.name}
          </h1>
          {startingPrice > 0 && (
            <p className="text-white/60 text-lg mt-3">
              From {priceLabel} &middot; {project.location}
            </p>
          )}
          </Reveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <Reveal delay={0.1}>
              <p className="text-lg text-neutral-700 leading-relaxed">
                {project.tagline}
              </p>
              {project.longDescription.map((para, i) => (
                <p key={i} className="text-neutral-500 mt-4 leading-relaxed text-sm">
                  {para}
                </p>
              ))}
              </Reveal>

              <Reveal delay={0.15}>
              <FeatureList features={project.features} />
              </Reveal>

              {project.locationHighlights && project.locationHighlights.length > 0 && (
                <Reveal delay={0.2}>
                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-primary mb-4">
                    Location Highlights
                  </h3>
                  <ul className="space-y-2">
                    {project.locationHighlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-neutral-600">
                        <svg className="w-4 h-4 text-accent shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
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

            <div className="space-y-6">
              <Reveal x={30} y={0} delay={0.15}>
              <div className="bg-white border border-neutral-200 p-6">
                <h3 className="text-sm font-semibold text-primary mb-4">
                  Interested in this phase?
                </h3>
                <div className="space-y-3 text-sm">
                  <p className="text-neutral-500">
                    Our team can share current availability, exact pricing, and guide you through the booking process.
                  </p>
                  <a
                    href={`https://wa.me/923204474819?text=${encodeURIComponent(`Hi, I'm interested in ${project.name} at Etihad Town.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#25D366] text-white px-4 py-3 font-semibold text-sm hover:bg-[#20bd5a] transition-all"
                  >
                    Chat on WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="block w-full text-center bg-primary text-white px-4 py-3 font-semibold text-sm hover:bg-primary-light transition-all"
                  >
                    Contact Sales Office
                  </Link>
                </div>
              </div>
              </Reveal>

              <Reveal x={30} y={0} delay={0.25}>
              <div className="bg-white border border-neutral-200 p-6">
                <h3 className="text-sm font-semibold text-primary mb-4">
                  Phase Details
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">Status</dt>
                    <dd className="font-medium text-neutral-700">{project.status}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-neutral-400">Location</dt>
                    <dd className="font-medium text-neutral-700 text-right max-w-[180px]">{project.location}</dd>
                  </div>
                  {startingPrice > 0 && (
                    <div className="flex justify-between">
                      <dt className="text-neutral-400">Starting From</dt>
                      <dd className="font-medium text-accent">{priceLabel}</dd>
                    </div>
                  )}
                </dl>
              </div>
              </Reveal>
            </div>
          </div>

          {project.faqs && project.faqs.length > 0 && (
            <Reveal delay={0.1}>
            <div className="mt-20 max-w-3xl">
              <h3 className="text-lg font-semibold text-primary mb-6">
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {project.faqs.map((faq, i) => (
                  <details
                    key={i}
                    className="bg-white border border-neutral-200 group"
                  >
                    <summary className="px-6 py-4 font-medium text-primary text-sm cursor-pointer list-none flex items-center justify-between">
                      {faq.question}
                      <svg
                        className="w-3.5 h-3.5 text-neutral-400 group-open:rotate-180 transition-transform shrink-0 ml-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-6 pb-4 text-neutral-500 text-sm leading-relaxed border-t border-neutral-100 pt-4">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
          <div className="mt-16 pt-12 border-t border-neutral-200">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors"
            >
              <svg className="w-3.5 h-3.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
