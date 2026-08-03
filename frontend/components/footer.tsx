import Link from "next/link";
import { contactEmail, contactPhone, contactPhoneE164, whatsappNumber } from "@/lib/contact";

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/19AzuzCw8h/",
    path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/etihadtownofficial",
    path: "M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zm-4 13a4 4 0 110-8 4 4 0 010 8zm0-10.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/etihadrealestate/",
    path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4V8h4v2a6 6 0 012-2zM6 8H2v13h4V8zM4 6a2 2 0 100-4 2 2 0 000 4z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@etihadtown",
    path: "M22.54 6.42a2.78 2.78 0 00-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 00-1.95 2A29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 001.95-2A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
  },
];

export function Footer() {
  return (
    <footer className="bg-primary-dark text-neutral-500">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/etihad-logo.png"
                alt="Etihad Town"
                className="h-9 lg:h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-neutral-500">
              A master-planned community by the Etihad Group — built on trust, 
              transparency, and quality. Residential and commercial plots 
              available with flexible payment plans.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <p className="text-neutral-500">
                <span className="text-neutral-400">Corporate Office:</span>
                <br />
                Etihad Town Phase II, 4km Off Ferozpur Road, Lahore
              </p>
              <p>
                <span className="text-neutral-400">Phone:</span>{" "}
                <a href={`tel:${contactPhoneE164}`} className="text-neutral-500 hover:text-accent transition-colors">
                  {contactPhone}
                </a>
              </p>
              <p>
                <span className="text-neutral-400">Email:</span>{" "}
                <a href={`mailto:${contactEmail}`} className="text-neutral-500 hover:text-accent transition-colors">
                  {contactEmail}
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Projects
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/projects/phase-4" className="text-neutral-500 hover:text-accent transition-colors">Phase IV</Link></li>
              <li><Link href="/projects/phase-3" className="text-neutral-500 hover:text-accent transition-colors">Phase III</Link></li>
              <li><Link href="/projects/phase-2" className="text-neutral-500 hover:text-accent transition-colors">Phase II</Link></li>
              <li><Link href="/projects/phase-1" className="text-neutral-500 hover:text-accent transition-colors">Phase I</Link></li>
              <li><Link href="/projects/premier-enclave" className="text-neutral-500 hover:text-accent transition-colors">Premier Enclave</Link></li>
              <li><Link href="/projects/sialkot" className="text-neutral-500 hover:text-accent transition-colors">Sialkot</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog" className="text-neutral-500 hover:text-accent transition-colors">Blog</Link></li>
              <li><Link href="/media" className="text-neutral-500 hover:text-accent transition-colors">Media</Link></li>
              <li><Link href="/contact" className="text-neutral-500 hover:text-accent transition-colors">Contact</Link></li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-500 hover:text-accent transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">
                Follow Us On
              </h4>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-neutral-400 hover:bg-accent hover:text-white hover:border-accent transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-neutral-500">
            <p><span className="text-neutral-400 font-medium">Pakistan:</span> {contactPhone}</p>
            <p><span className="text-neutral-400 font-medium">UAE:</span> +971 52 744 6451</p>
            <p><span className="text-neutral-400 font-medium">UK:</span> +44 (0) 203 1500 958</p>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
          <span>&copy; {new Date().getFullYear()} Etihad Town. All rights reserved.</span>
          <span>Etihad Town Phase II, 4km Off Ferozpur Road, Lahore</span>
        </div>
      </div>
    </footer>
  );
}
