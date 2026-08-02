"use client";

import { motion } from "./motion";

const reasons = [
  {
    title: "Best Quality Infrastructure",
    description:
      "Built to the highest industry standards with modern planning, reliable utilities, and quality construction that ensures long-term value.",
    icon: "/images/why-icon-01.png",
  },
  {
    title: "Delivery Before Time",
    description:
      "At Etihad Town, timely delivery is our promise. We proudly deliver every project before time, setting new standards of reliability and customer satisfaction.",
    icon: "/images/why-icon-02.png",
  },
  {
    title: "Approved Projects",
    description:
      "Experience a secure, well-planned community with green spaces, modern amenities, and an environment designed for comfortable family living.",
    icon: "/images/why-icon-03.png",
  },
  {
    title: "High Returns",
    description:
      "Strategically located developments with strong growth potential make Etihad Town a smart choice for long-term investment and excellent returns.",
    icon: "/images/why-icon-04.png",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-soft">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-accent font-semibold text-sm tracking-[0.15em] uppercase">
            Why Etihad Town
          </span>
          <h2 className="text-[32px] md:text-4xl mt-2 max-w-2xl">
            A community built on more than just roads and bricks
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              className="bg-white rounded-2xl p-8 border border-neutral-100 hover:border-accent/30 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(7,30,69,0.1)] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-16 h-16 bg-soft rounded-2xl flex items-center justify-center mb-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={reason.icon} alt={reason.title} className="w-11 h-11 object-contain" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-3">
                {reason.title}
              </h3>
              <p className="text-neutral-500 text-sm leading-[1.7]">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
