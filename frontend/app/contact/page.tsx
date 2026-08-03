import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { breadcrumbList } from "@/lib/schemas";
import { Reveal } from "@/components/reveal";
import { contactEmail, contactPhone, contactPhoneE164 } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact Us & Book a Visit",
  description:
    "Contact Etihad Town for current availability, payment plans, and a personalised site-visit consultation.",
  alternates: { canonical: "/contact" },
};

const quickCards = [
  {
    label: "Phone",
    value: contactPhone,
    href: `tel:${contactPhoneE164}`,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: "Email",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    value: "Chat with sales team",
    href: `https://wa.me/${contactPhoneE164.slice(1)}`,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: "Corporate Office",
    value: "Etihad Town Phase II, 4km Off Ferozpur Road, Lahore",
    href: undefined,
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const offices = [
  {
    city: "Lahore",
    flag: "🇵🇰",
    address: "Etihad Town Phase II, 4km Off Ferozpur Road, Lahore",
  },
  {
    city: "Sialkot",
    flag: "🇵🇰",
    address: "2 KM Daska Road, Motra Stop, Sialkot",
  },
  {
    city: "London",
    flag: "🇬🇧",
    address: "Unit 10, 210 Ilford Lane, Ilford, IG1 2LW, London, UK",
  },
  {
    city: "Dubai",
    flag: "🇦🇪",
    address: "Office 20, Austria Business Center, The H Hotel Office Tower, 14th Floor, Sheikh Zayed Road",
  },
  {
    city: "Riyadh",
    flag: "🇸🇦",
    address: "COLABS, Uthman Ibn Affan Road, An Narjis, Riyadh 13324, Saudi Arabia",
  },
];

export default function ContactPage() {
  const breadcrumb = breadcrumbList([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" },
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
          style={{ backgroundImage: "url(/images/hero-banner.webp)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.96] via-primary/85 to-primary/50" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/95 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-24 md:py-32 lg:px-12">
          <Reveal y={24}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Contact Us
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.1] text-white md:text-6xl">
              Let&apos;s find the plot{" "}
              <span className="text-accent">that&apos;s right for you</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-white/80 md:text-lg">
              Visit our sales office, call us, or send a message. Our team is here to
              help you with availability, pricing, and site visits.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-neutral-50 py-20 lg:py-28">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {quickCards.map((card, i) => {
              const inner = (
                <div className="group flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_20px_50px_rgba(7,30,69,0.1)]">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                    {card.icon}
                  </span>
                  <h3 className="mt-5 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    {card.label}
                  </h3>
                  <p className="mt-2 text-sm font-semibold leading-relaxed text-primary">
                    {card.value}
                  </p>
                </div>
              );
              return (
                <Reveal key={card.label} delay={i * 0.06}>
                  {card.href ? (
                    <a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined} className="block h-full">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-5">
            <Reveal x={-30} y={0} className="lg:col-span-3">
              <ContactForm />
            </Reveal>

            <Reveal x={30} y={0} className="space-y-6 lg:col-span-2">
              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_15px_50px_rgba(7,30,69,0.08)]">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Office Hours
                </h3>
                <div className="mt-5 space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded-xl bg-soft/70 px-4 py-3">
                    <span className="font-medium text-neutral-600">Monday — Saturday</span>
                    <span className="font-semibold text-primary">9:00 AM — 8:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-soft/70 px-4 py-3">
                    <span className="font-medium text-neutral-600">Sunday</span>
                    <span className="font-semibold text-primary">10:00 AM — 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-[0_15px_50px_rgba(7,30,69,0.08)]">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary">
                  <svg className="h-4 w-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  International Offices
                </h3>
                <div className="mt-5 space-y-4">
                  {offices.map((office) => (
                    <div key={office.city} className="flex items-start gap-3 border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                      <span className="text-xl leading-none">{office.flag}</span>
                      <div>
                        <p className="text-sm font-bold text-primary">{office.city}</p>
                        <p className="mt-0.5 text-xs leading-relaxed text-neutral-500">
                          {office.address}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
