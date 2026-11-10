"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { submitLead } from "@/app/actions/submit-lead";

interface PriorityRegistrationFormProps {
  projectName: string;
  projectSlug: string;
}

const inputClass =
  "w-full rounded-xl border border-neutral-200 bg-neutral-50/60 px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 transition-all focus:border-accent focus:bg-white focus:outline-none focus:ring-4 focus:ring-accent/10";

export function PriorityRegistrationForm({
  projectName,
  projectSlug,
}: PriorityRegistrationFormProps) {
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set("source", `priority-eoi-${projectSlug}`);
    formData.set("plotInterest", projectSlug);

    const preferredSize = formData.get("preferredSize")?.toString() || "";
    const userNotes = formData.get("message")?.toString() || "";
    if (preferredSize) {
      formData.set(
        "message",
        `[Priority EOI - Preferred Size: ${preferredSize}] ${userNotes}`.trim(),
      );
    }

    const result = await submitLead(formData);
    if (result.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage(
        result.message ||
          "Your priority interest has been registered. Our sales team will share pre-launch details first.",
      );
      ref.current?.reset();
      router.push("/thank-you");
    }
  }

  return (
    <div
      id="register-interest"
      className="mt-12 overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(7,30,69,0.08)]"
    >
      <div className="bg-gradient-to-r from-primary to-primary-light px-7 py-6 sm:px-9">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Pre-Launch Priority Access
            </span>
            <h3 className="mt-2 text-xl font-extrabold text-white sm:text-2xl">
              Register Expression of Interest (EOI) — {projectName}
            </h3>
            <p className="mt-1 text-xs text-white/75 sm:text-sm">
              Be the first to receive official pre-launch payment plans, master plan updates, and early-bird booking priority.
            </p>
          </div>
        </div>
      </div>

      {status === "success" ? (
        <div className="px-8 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
            <svg
              className="h-7 w-7 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h4 className="mt-4 text-xl font-bold text-primary">
            Priority Interest Registered
          </h4>
          <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
            {message}
          </p>
        </div>
      ) : (
        <form ref={ref} onSubmit={handleSubmit} className="space-y-4 p-7 sm:p-9">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="eoi-name"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-600"
              >
                Full Name *
              </label>
              <input
                id="eoi-name"
                name="name"
                type="text"
                required
                placeholder="Your full name"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="eoi-phone"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-600"
              >
                Phone / WhatsApp Number *
              </label>
              <input
                id="eoi-phone"
                name="phone"
                type="tel"
                required
                placeholder="0300-1234567"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="eoi-email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-600"
              >
                Email Address
              </label>
              <input
                id="eoi-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label
                htmlFor="eoi-size"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-600"
              >
                Preferred Plot Category
              </label>
              <select
                id="eoi-size"
                name="preferredSize"
                className={inputClass}
              >
                <option value="">Select preferred plot size</option>
                <option value="5 Marla Residential">5 Marla Residential</option>
                <option value="10 Marla Residential">10 Marla Residential</option>
                <option value="1 Kanal Residential">1 Kanal (20 Marla) Residential</option>
                <option value="2 Kanal Residential">2 Kanal (40 Marla) Residential</option>
                <option value="4 Marla Commercial">4 Marla Commercial</option>
                <option value="5.33 Marla Commercial">5.33 Marla Commercial</option>
                <option value="8 Marla Commercial">8 Marla Commercial</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="eoi-message"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-neutral-600"
            >
              Notes / Requirements (Optional)
            </label>
            <textarea
              id="eoi-message"
              name="message"
              rows={3}
              placeholder="Any specific block preference, investment budget, or questions..."
              className={`${inputClass} resize-none`}
            />
          </div>

          {status === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {message}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-neutral-400">
              Priority registrants receive pre-launch pricing &amp; inventory alerts first.
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(140,198,63,0.3)] transition-all hover:scale-[1.02] hover:bg-accent-dark disabled:opacity-50"
            >
              {status === "loading" ? "Submitting..." : "Register Priority Interest"}
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
