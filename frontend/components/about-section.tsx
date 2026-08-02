"use client";

import { motion } from "./motion";

const features = [
  {
    title: "Residential Plots",
    description: "From 3 Marla to 1 Kanal with flexible payment plans across all six projects.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="#8CC63F" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
      </svg>
    ),
  },
  {
    title: "Commercial Plots",
    description: "Prime commercial locations designed to maximize visibility and investment potential.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="#8CC63F" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h3m-17 0H2m3 0h5m4 0h5M9 7h1m4 0h1M9 11h1m4 0h1M9 15h1m4 0h1" />
      </svg>
    ),
  },
  {
    title: "Complete Amenities",
    description: "Parks, mosques, schools, and a secure environment for every family.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="#8CC63F" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V4a2 2 0 10-2 2h2zm-4 9a4 4 0 008 0m-8 0a4 4 0 114-4m4 4a4 4 0 01-4-4" />
      </svg>
    ),
  },
  {
    title: "Trusted Developer",
    description: "Developed by the Etihad Group — building Lahore's communities since 2005.",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="#8CC63F" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

export function AboutSection() {
  return (
    <section className="py-20 lg:py-24 bg-soft">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <motion.div
            className="relative min-h-[420px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/about-bg.webp)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 to-primary/45" />
            <div className="relative h-full flex flex-col justify-end p-10">
              <motion.span
                className="text-accent text-xs font-semibold tracking-[0.15em] uppercase mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                About Etihad Town
              </motion.span>
              <motion.h2
                className="text-[28px] text-white font-extrabold mb-4 max-w-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Lahore&apos;s Trusted Master-Planned Community
              </motion.h2>
              <motion.p
                className="text-white/85 text-[12.5px] leading-[1.7] max-w-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                From Phase I to our latest Phase IV and the Sialkot expansion, Etihad Town
                has delivered over two decades of planned communities — wide boulevards,
                underground utilities, and neighborhoods built on trust.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="relative bg-white rounded-2xl shadow-[0_25px_60px_0_rgba(7,30,69,0.18)] p-10 lg:-ml-10 z-10"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-[28px] font-extrabold text-[#0A2A5E] mb-8">
              What We Offer
            </h3>
            <div className="space-y-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1 }}
                >
                  <div className="shrink-0">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-[#0A2A5E] mb-0.5">
                      {f.title}
                    </h4>
                    <p className="text-[11.5px] text-[#6B7A90] leading-[1.55]">
                      {f.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
