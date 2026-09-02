"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/app/actions/submit-lead";

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10";

export function ContactForm() {
  const router = useRouter();
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
      router.push("/thank-you");
    }
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_25px_70px_rgba(7,30,69,0.1)]">
      <div className="bg-gradient-to-r from-primary to-primary-light px-8 py-6">
        <h3 className="flex items-center gap-3 text-lg font-bold text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/20 text-accent">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </span>
          Send us a message
        </h3>
        <p className="mt-1 text-sm text-white/70">
          Fill the form below — our team responds within a few hours.
        </p>
      </div>

      {status === "success" ? (
        <div className="px-8 py-16 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
            <svg className="h-8 w-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="mt-6 text-2xl font-extrabold text-primary">
            Message Sent
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-neutral-500">
            {message || "Thank you for reaching out. Our sales team will contact you shortly."}
          </p>
        </div>
      ) : (
        <form ref={ref} onSubmit={handleSubmit} className="space-y-5 p-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-700">
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-neutral-700">
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className={inputClass}
                placeholder="0300-1234567"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="plotInterest" className="mb-1.5 block text-sm font-medium text-neutral-700">
              Interested In
            </label>
            <select
              id="plotInterest"
              name="plotInterest"
              className={inputClass}
            >
              <option value="">Select a phase</option>
              <option value="phase-4">Etihad Town Phase IV</option>
              <option value="phase-3">Etihad Town Phase III</option>
              <option value="phase-2">Etihad Town Phase II</option>
              <option value="phase-1">Etihad Town Phase I</option>
              <option value="premier-enclave">Premier Enclave</option>
              <option value="sialkot">Etihad Town Sialkot</option>
              <option value="not-sure">Need guidance</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-neutral-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Tell us about your requirements..."
            />
          </div>

          {status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-primary-light disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0-4 4m4-4H3" />
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
