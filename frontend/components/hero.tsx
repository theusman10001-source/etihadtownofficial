"use client";

import Link from "next/link";
import { contactPhone, contactPhoneE164 } from "@/lib/contact";
import { formatPriceCr, getStartingPrice, projects } from "@/lib/projects";
import { motion } from "./motion";

const stats = [
  { value: "2005", label: "Established" },
  { value: "6", label: "Active Projects" },
  { value: "50,000+", label: "Kanals Planned" },
  { value: "LDA", label: "Approved" },
];

export function Hero() {
  const phaseFour = projects.find((project) => project.slug === "phase-4");

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-primary">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-banner.webp)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.97] via-primary/[0.84] to-primary/35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_30%,rgba(140,198,63,0.2),transparent_24rem)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-primary/95 to-transparent" />
      <div className="absolute left-[8%] top-24 hidden h-28 w-px bg-gradient-to-b from-accent/0 via-accent to-accent/0 lg:block" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-24 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:gap-16">
          <div className="max-w-2xl">
            <motion.span
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-md"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Premium Plots in Lahore &amp; Sialkot
            </motion.span>

            <motion.h1
              className="mb-6 text-4xl font-extrabold leading-[1.08] text-white md:text-6xl lg:text-[64px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Etihad Town Lahore.
              <br />
              <span className="text-accent">Live beyond</span>
              <br />
              ordinary.
            </motion.h1>

            <motion.p
              className="mb-10 max-w-xl text-base leading-[1.7] text-white/85 md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Discover residential and commercial plots across Etihad Town&apos;s most
              sought-after communities, with payment plans shaped around your next move.
            </motion.p>

            <motion.div
              className="flex flex-col gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                href="/projects/phase-4"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 font-semibold text-white shadow-[0_10px_30px_rgba(140,198,63,0.35)] transition-all duration-200 hover:scale-[1.02] hover:bg-accent-dark"
              >
                Explore current availability
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-3.5 font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
              >
                Schedule a private visit
              </Link>
            </motion.div>

            <motion.div
              className="mt-16 grid grid-cols-2 gap-6 border-t border-white/15 pt-8 sm:grid-cols-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                >
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {phaseFour && (
            <motion.aside
              className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-1 shadow-[0_30px_90px_rgba(1,14,36,0.45)] backdrop-blur-xl"
              initial={{ opacity: 0, x: 30, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.75, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25"
                style={{ backgroundImage: "url(/images/phase-4.webp)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/75 to-primary/90" />
              <div className="relative p-7 sm:p-8">
                <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Priority inventory</span>
                  <span className="rounded-full border border-accent/40 bg-accent/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    {phaseFour.status}
                  </span>
                </div>
                <p className="mt-7 text-xs font-medium uppercase tracking-[0.18em] text-white/55">Featured opportunity</p>
                <h2 className="mt-2 text-3xl font-extrabold text-white">Etihad Town {phaseFour.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{phaseFour.location}</p>

                <div className="mt-7 grid grid-cols-2 gap-3 border-y border-white/15 py-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">Starting from</p>
                    <p className="mt-1 text-lg font-bold text-accent">{formatPriceCr(getStartingPrice(phaseFour))}</p>
                  </div>
                  <div className="border-l border-white/15 pl-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">Consultation</p>
                    <a href={`tel:${contactPhoneE164}`} className="mt-1 block text-sm font-semibold text-white transition-colors hover:text-accent">
                      {contactPhone}
                    </a>
                  </div>
                </div>

                <Link
                  href="/projects/phase-4"
                  className="mt-7 flex items-center justify-between rounded-2xl bg-white px-5 py-4 text-sm font-bold text-primary transition-transform duration-200 hover:scale-[1.02]"
                >
                  View payment plan
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </motion.aside>
          )}
        </div>
      </div>
    </section>
  );
}
