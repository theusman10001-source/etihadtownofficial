import type { Metadata } from "next";
import Link from "next/link";
import { ThankYouTracker } from "@/components/thank-you-tracker";
import { contactPhone, contactPhoneE164, whatsappNumber } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Thank You | Etihad Town Lahore",
  description:
    "Thank you for contacting Etihad Town. Our official sales team will get back to you shortly with project details and pricing.",
  robots: {
    index: false,
    follow: false,
  },
};

const phases = [
  {
    name: "Etihad Town Phase IV",
    desc: "Main Raiwind Road — High-growth residential & commercial investment with flexible installments.",
    href: "/projects/phase-4",
    tag: "Hot Launch",
  },
  {
    name: "Etihad Town Phase III",
    desc: "Strategic location near Ferozepur Road with modern master-planned amenities.",
    href: "/projects/phase-3",
    tag: "Fast Development",
  },
  {
    name: "Premier Enclave",
    desc: "Luxury residential enclave featuring upscale architectural layouts and community parks.",
    href: "/projects/premier-enclave",
    tag: "Exclusive",
  },
  {
    name: "Etihad Town Sialkot",
    desc: "LDA-standard luxury living brought to the heart of Sialkot on Daska Road.",
    href: "/projects/sialkot",
    tag: "Sialkot Project",
  },
];

export default function ThankYouPage() {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Etihad Town, I just submitted an inquiry on your website and would like immediate assistance with plot details and payment plans."
  )}`;

  return (
    <>
      {/* Fires Google Analytics & Google Ads Conversion Tags */}
      <ThankYouTracker />

      {/* Hero / Confirmation Section */}
      <section className="relative overflow-hidden bg-primary py-20 md:py-28">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/images/hero-banner.webp)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/90 to-primary" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
          {/* Animated Success Check Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 border-2 border-accent text-accent shadow-[0_0_50px_rgba(140,198,63,0.4)]">
            <svg
              className="h-10 w-10 animate-bounce text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Inquiry Received
          </span>

          <h1 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-5xl">
            Thank You for Reaching Out!
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Your request has been received by the official Etihad Town sales desk.
            One of our senior property consultants will get in touch with you shortly
            with verified inventory, official payment plans, and site visit arrangements.
          </p>

          {/* Quick Immediate Contact CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#20ba59]"
            >
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp Now
            </a>

            <a
              href={`tel:${contactPhoneE164}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
            >
              <svg className="h-5 w-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us: {contactPhone}
            </a>
          </div>
        </div>
      </section>

      {/* What Happens Next Steps */}
      <section className="bg-neutral-50 py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              What Happens Next?
            </h2>
            <p className="mt-2 text-sm text-neutral-500">
              Here is what you can expect from our sales team.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent font-bold text-lg">
                1
              </div>
              <h3 className="mt-4 text-base font-bold text-primary">
                Inquiry Verification
              </h3>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                Our team reviews your plot preferences, budget, and phase requirements.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent font-bold text-lg">
                2
              </div>
              <h3 className="mt-4 text-base font-bold text-primary">
                Official Plan & Pricing
              </h3>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                We share official payment schedules, plot layouts, and current availability via WhatsApp or Call.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent font-bold text-lg">
                3
              </div>
              <h3 className="mt-4 text-base font-bold text-primary">
                VIP Site Visit & Booking
              </h3>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed">
                Schedule a guided site tour with our property advisors and complete your hassle-free booking.
              </p>
            </div>
          </div>

          {/* Explore Other Projects */}
          <div className="mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-200 pb-4">
              <div>
                <h3 className="text-xl font-bold text-primary">
                  Explore Active Etihad Town Projects
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Discover our residential & commercial opportunities across Lahore and Sialkot.
                </p>
              </div>
              <Link
                href="/projects"
                className="text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
              >
                View All Projects &rarr;
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {phases.map((phase) => (
                <Link
                  key={phase.name}
                  href={phase.href}
                  className="group block rounded-2xl border border-neutral-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md"
                >
                  <span className="inline-block rounded-md bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                    {phase.tag}
                  </span>
                  <h4 className="mt-2 text-sm font-bold text-primary group-hover:text-accent transition-colors">
                    {phase.name}
                  </h4>
                  <p className="mt-1.5 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {phase.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Return Home Button */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 transition-colors hover:text-primary"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
