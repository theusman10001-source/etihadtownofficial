"use client";

import { useRef, useState } from "react";
import { submitLead } from "@/app/actions/submit-lead";

export function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    if (!formData.get("source")) formData.set("source", "contact-page");

    const result = await submitLead(formData);

    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage(result.message || "");
      ref.current?.reset();
    }
  }

  return (
    <div className="bg-white border border-neutral-200 p-8 lg:p-10">
      {status === "success" ? (
        <div className="text-center py-12">
          <div className="w-14 h-14 bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl text-primary mb-2">
            Message Sent
          </h3>
          <p className="text-neutral-500">{message}</p>
        </div>
      ) : (
        <form ref={ref} onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full px-4 py-3 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-primary transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1.5">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full px-4 py-3 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-primary transition-all"
                placeholder="0300-1234567"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-3 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-primary transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="plotInterest" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Interested In
            </label>
            <select
              id="plotInterest"
              name="plotInterest"
              className="w-full px-4 py-3 border border-neutral-200 text-neutral-900 focus:outline-none focus:border-primary transition-all"
            >
              <option value="">Select a phase</option>
              <option value="phase-4">Phase IV</option>
              <option value="phase-3">Phase III</option>
              <option value="premier-enclave">Premier Enclave</option>
              <option value="sialkot">Sialkot</option>
              <option value="not-sure">Need guidance</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-3 border border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-primary transition-all resize-none"
              placeholder="Tell us about your requirements..."
            />
          </div>

          {status === "error" && (
            <div className="text-sm text-red-600 bg-red-50 px-4 py-3">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full py-3.5 bg-primary text-white font-semibold hover:bg-primary-light transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}
