import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { breadcrumbList } from "@/lib/schemas";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact Us — Etihad Town Lahore",
  description:
    "Visit our sales office at Etihad Town Phase II, call +92 42 111 99 88 77, or send us a message.",
};

const contactInfo = [
  {
    label: "Corporate Office",
    lines: ["Etihad Town Phase II", "4km Off Ferozpur Road, Lahore"],
  },
  {
    label: "Phone",
    lines: ["+92 42 111 99 88 77"],
  },
  {
    label: "Email",
    lines: ["info@etihadtown.com.pk"],
  },
  {
    label: "WhatsApp",
    lines: ["+92 42 111 99 88 77"],
  },
];

const offices = [
  {
    city: "Lahore",
    address: "Etihad Town Phase II, 4km Off Ferozpur Road, Lahore",
  },
  {
    city: "Sialkot",
    address: "2 KM Daska Road, Motra Stop, Sialkot",
  },
  {
    city: "London",
    address: "Unit 10, 210 Ilford Lane, Ilford, IG1 2LW, London, UK",
  },
  {
    city: "Dubai",
    address: "Office 20, Austria Business Center, The H Hotel Office Tower, 14th Floor, Sheikh Zayed Road",
  },
  {
    city: "Riyadh",
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
      <section className="py-24 bg-neutral-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Reveal className="max-w-2xl mb-16">
            <span className="text-accent font-semibold text-sm tracking-[0.2em] uppercase">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl mt-3">
              Get in Touch
            </h1>
            <p className="text-neutral-500 text-lg mt-4">
              Visit our sales office, call us, or send a message. 
              Our team is here to help you find the right plot.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <Reveal x={-30} y={0} className="lg:col-span-3">
              <ContactForm />
            </Reveal>

            <Reveal x={30} y={0} className="lg:col-span-2 space-y-6">
              {contactInfo.map((item) => (
                <div key={item.label} className="border-b border-neutral-200 pb-6">
                  <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase mb-2">
                    {item.label}
                  </h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-primary font-medium">
                      {line}
                    </p>
                  ))}
                </div>
              ))}

              <div className="pt-2">
                <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase mb-3">
                  Office Hours
                </h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-neutral-600">
                    <span>Monday — Saturday</span>
                    <span className="font-medium">9:00 AM — 8:00 PM</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Sunday</span>
                    <span className="font-medium">10:00 AM — 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase mb-3">
                  International Offices
                </h3>
                <div className="space-y-3">
                  {offices.map((office) => (
                    <div key={office.city}>
                      <p className="text-sm font-semibold text-primary">{office.city}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">{office.address}</p>
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
