"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/app/actions/submit-lead";
import { motion } from "./motion";

export function LeadForm() {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (!formData.get("source")) formData.set("source", "homepage-form");
    const result = await submitLead(formData);
    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage(result.message || "");
      ref.current?.reset();
      router.push("/thank-you");
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-primary relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url(/images/trust-bg.webp)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/95" />

      <div className="relative max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 lg:p-12 shadow-[0_25px_60px_0_rgba(7,30,69,0.25)]">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-accent font-semibold text-sm tracking-[0.15em] uppercase">
              Get Started
            </span>
            <h2 className="text-[28px] md:text-3xl mt-2">
              Book Your Plot Today
            </h2>
            <p className="text-neutral-500 text-sm mt-3">
              Send us your details and our team will share current prices,
              payment plans, and available inventory.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {status === "success" ? (
              <div className="text-center py-12">
                <motion.div
                  className="w-14 h-14 bg-accent/15 flex items-center justify-center mx-auto mb-6 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl text-primary mb-2">Thank You</h3>
                <p className="text-neutral-500">{message}</p>
              </div>
            ) : (
              <form ref={ref} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-neutral-600 text-sm font-medium mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="name" name="name" type="text" required
                      className="w-full px-4 py-3 bg-soft border border-transparent text-neutral-700 placeholder-neutral-400 rounded-lg focus:outline-none focus:border-accent focus:bg-white transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-neutral-600 text-sm font-medium mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      id="phone" name="phone" type="tel" required
                      className="w-full px-4 py-3 bg-soft border border-transparent text-neutral-700 placeholder-neutral-400 rounded-lg focus:outline-none focus:border-accent focus:bg-white transition-all"
                      placeholder="0300-1234567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-neutral-600 text-sm font-medium mb-1.5">
                    Email
                  </label>
                  <input
                    id="email" name="email" type="email"
                    className="w-full px-4 py-3 bg-soft border border-transparent text-neutral-700 placeholder-neutral-400 rounded-lg focus:outline-none focus:border-accent focus:bg-white transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="plotInterest" className="block text-neutral-600 text-sm font-medium mb-1.5">
                    Interested In
                  </label>
                  <div className="relative">
                    <select
                      id="plotInterest" name="plotInterest"
                      className="w-full px-4 py-3 pr-10 bg-soft border border-transparent text-neutral-700 rounded-lg appearance-none cursor-pointer focus:outline-none focus:border-accent focus:bg-white transition-all"
                    >
                      <option value="">Select a phase</option>
                      <option value="phase-4">Phase IV</option>
                      <option value="phase-3">Phase III</option>
                      <option value="premier-enclave">Premier Enclave</option>
                      <option value="sialkot">Sialkot</option>
                      <option value="not-sure">Need guidance</option>
                    </select>
                    <svg
                      className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-neutral-600 text-sm font-medium mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message" name="message" rows={3}
                    className="w-full px-4 py-3 bg-soft border border-transparent text-neutral-700 placeholder-neutral-400 rounded-lg focus:outline-none focus:border-accent focus:bg-white transition-all resize-none"
                    placeholder="Your requirements..."
                  />
                </div>

                {status === "error" && (
                  <motion.div
                    className="text-red-600 text-sm text-center bg-red-50 px-4 py-3 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {message}
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3.5 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-all duration-200 disabled:opacity-50"
                >
                  {status === "loading" ? "Sending..." : "Send Inquiry"}
                </button>

                <p className="text-neutral-400 text-xs text-center">
                  We&apos;ll respond within 24 hours
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
