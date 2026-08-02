"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { submitLead } from "@/app/actions/submit-lead";

const POPUP_DELAY = 2500;

type Status = "idle" | "loading" | "success" | "error";

export function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), POPUP_DELAY);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const formData = new FormData(form);
    if (!formData.get("source")) formData.set("source", "homepage-popup");
    const result = await submitLead(formData);
    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage(result.message || "");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          <motion.div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_30px_80px_rgba(7,30,69,0.4)] overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          >
            <div className="h-1.5 bg-gradient-to-r from-accent via-accent-light to-accent" />

            <button
              onClick={() => setOpen(false)}
              aria-label="Close popup"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-soft hover:bg-neutral-200 text-neutral-500 hover:text-primary flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {status === "success" ? (
              <div className="p-8 sm:p-10 text-center">
                <motion.div
                  className="w-16 h-16 bg-accent/15 flex items-center justify-center mx-auto mb-5 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="text-2xl text-primary font-bold mb-2">Thank You!</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{message}</p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-full hover:bg-accent-dark transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="text-xl text-primary font-bold">Book Your Plot</h3>
                    <p className="text-neutral-400 text-xs">Get current prices &amp; available inventory</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                  <div>
                    <label htmlFor="popup-name" className="block text-neutral-600 text-xs font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      id="popup-name" name="name" type="text" required
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 bg-soft border border-transparent text-neutral-700 placeholder-neutral-400 rounded-xl focus:outline-none focus:border-accent focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="popup-phone" className="block text-neutral-600 text-xs font-medium mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="popup-phone" name="phone" type="tel" required
                      placeholder="0300-1234567"
                      className="w-full px-4 py-2.5 bg-soft border border-transparent text-neutral-700 placeholder-neutral-400 rounded-xl focus:outline-none focus:border-accent focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="popup-email" className="block text-neutral-600 text-xs font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="popup-email" name="email" type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 bg-soft border border-transparent text-neutral-700 placeholder-neutral-400 rounded-xl focus:outline-none focus:border-accent focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="popup-interest" className="block text-neutral-600 text-xs font-medium mb-1">
                      Interested In
                    </label>
                    <div className="relative">
                      <select
                        id="popup-interest" name="plotInterest"
                        className="w-full px-4 py-2.5 pr-10 bg-soft border border-transparent text-neutral-700 rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-accent focus:bg-white transition-all"
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

                  {status === "error" && (
                    <p className="text-red-600 text-xs text-center bg-red-50 px-4 py-2.5 rounded-lg">
                      {message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-dark transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending..." : "Request Call Back"}
                  </button>

                  <p className="text-neutral-400 text-[11px] text-center">
                    We&apos;ll respond within 24 hours. No spam, ever.
                  </p>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
