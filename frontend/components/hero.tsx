"use client";

import Link from "next/link";
import { motion } from "./motion";

const stats = [
  { value: "2005", label: "Established" },
  { value: "6", label: "Active Projects" },
  { value: "50,000+", label: "Kanals Planned" },
  { value: "LDA", label: "Approved" },
];

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-primary">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/images/hero-banner.webp)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/80 to-transparent" />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <motion.span
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium tracking-wide rounded-full border border-white/20 mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="w-1.5 h-1.5 bg-accent rounded-full" />
            LDA Approved Housing Society
          </motion.span>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-[64px] text-white leading-[1.08] mb-6 font-extrabold"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Most Trustworthy
            <br />
            <span className="text-accent">Real Estate Brand</span>
            <br />
            of Pakistan
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-white/85 max-w-xl mb-10 leading-[1.7]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Etihad Town is redefining urban living through premium residential and
            commercial developments built on quality, trust, and timely delivery.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <Link
              href="/projects/phase-4"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark hover:scale-[1.02] transition-all duration-200 shadow-[0_10px_30px_rgba(140,198,63,0.35)]"
            >
              Explore Available Plots
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-full hover:bg-white/20 transition-all duration-200"
            >
              Schedule a Visit
            </Link>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/15 pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
              >
                <div className="text-2xl font-extrabold text-white">{s.value}</div>
                <div className="text-[11px] text-white/60 tracking-wide uppercase mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
