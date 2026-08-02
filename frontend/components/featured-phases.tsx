"use client";

import Link from "next/link";
import { motion } from "./motion";
import { projects, getStartingPrice, formatPriceCr } from "@/lib/projects";

const imageMap: Record<string, string> = {
  "phase-4": "/images/phase-4.webp",
  "phase-3": "/images/phase-3.webp",
  "premier-enclave": "/images/premier-enclave.webp",
  sialkot: "/images/sialkot.webp",
  "phase-2": "/images/phase-2.webp",
  "phase-1": "/images/phase-1.webp",
};

const featuredSlug = "phase-4";
const otherSlugs = ["phase-3", "premier-enclave", "sialkot"];

export function FeaturedPhases() {
  const featured = projects.find((p) => p.slug === featuredSlug)!;
  const others = otherSlugs
    .map((slug) => projects.find((p) => p.slug === slug)!)
    .filter(Boolean);

  return (
    <section className="py-20 lg:py-28 bg-soft">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm tracking-[0.15em] uppercase">
            Our Projects
          </span>
          <h2 className="text-[32px] md:text-4xl mt-2 max-w-xl mx-auto">
            Choose the phase that fits your plan
          </h2>
          <p className="text-neutral-500 text-sm mt-3">
            From affordable entry points to premium living — six projects to choose from.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Link
              href={`/projects/${featured.slug}`}
              className="group relative block bg-primary overflow-hidden min-h-[420px] rounded-2xl"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${imageMap[featured.slug]})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-primary/20" />
              <div className="relative h-full p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <span className="inline-block px-4 py-1.5 bg-accent text-white text-xs font-semibold tracking-wide uppercase rounded-full">
                    Best Seller
                  </span>
                  <span className="inline-block px-4 py-1.5 ml-2 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wide uppercase rounded-full">
                    {featured.status}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl text-white font-extrabold mb-2">
                    {featured.name}
                  </h3>
                  <p className="text-white/85 text-base max-w-xl mb-1">
                    {featured.tagline}
                  </p>
                  <p className="text-white/70 text-sm max-w-xl mb-5">
                    {featured.description}
                  </p>
                  <div className="flex items-center gap-6">
                    <span className="text-accent font-bold text-lg">
                      From {formatPriceCr(getStartingPrice(featured))}
                    </span>
                    <span className="text-white/80 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                      View details &rarr;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          <div className="flex flex-col gap-6">
            {others.map((phase, idx) => (
              <motion.div
                key={phase.slug}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.15 + idx * 0.1 }}
              >
                <Link
                  href={`/projects/${phase.slug}`}
                  className="group block bg-white border border-neutral-200 hover:border-accent/40 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-14 h-12 rounded-lg overflow-hidden shrink-0 bg-soft">
                        <span
                          className="block w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundImage: `url(${imageMap[phase.slug]})` }}
                        />
                      </span>
                      <h3 className="text-lg text-primary font-bold">
                        {phase.name}
                      </h3>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                      phase.status === "Available"
                        ? "bg-accent/10 text-accent-dark"
                        : "bg-amber-50 text-amber-700"
                    }`}>
                      {phase.status}
                    </span>
                  </div>
                  <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                    {phase.tagline}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <span className="text-sm font-bold text-accent">
                      From {formatPriceCr(getStartingPrice(phase))}
                    </span>
                    <svg
                      className="w-4 h-4 text-neutral-300 group-hover:text-accent transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-primary-light transition-colors"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
