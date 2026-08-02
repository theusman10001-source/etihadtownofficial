"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  to: number;
  suffix?: string;
  duration?: number;
}

function Counter({ to, suffix = "", duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - elapsed, 3);
      setValue(Math.round(to * eased));
      if (elapsed < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-PK")}
      {suffix}
    </span>
  );
}

const stats = [
  { to: 50000, suffix: "+", label: "Kanals Successfully Planned" },
  { to: 9, suffix: "", label: "Projects in 9 years" },
  { to: 120, suffix: "%", label: "Avg. Appreciation Rate per Anum" },
  { to: 20000, suffix: "+", label: "Satisfied Clients" },
];

export function StatsSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-primary overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50"
        style={{ backgroundImage: "url(/images/trust-bg.webp)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/95" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm tracking-[0.15em] uppercase">
            Why Trust Us
          </span>
          <h2 className="text-[32px] md:text-4xl text-white mt-2 max-w-xl mx-auto">
            Your Trust, Through Our Numbers
          </h2>
          <p className="text-white/70 text-sm mt-3 max-w-xl mx-auto">
            Every milestone reflects the confidence our customers place in us — from
            successful project deliveries to a growing community of homeowners and
            investors.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="text-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-extrabold text-accent mb-3">
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="text-xs md:text-sm text-white/70 uppercase tracking-wide">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
