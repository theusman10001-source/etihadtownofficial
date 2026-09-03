"use server";

import { z } from "zod";
import { sendLeadNotification } from "@/lib/email";

const leadSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z.string().trim().min(7, "Please enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().optional(),
  source: z.string().trim().min(1),
  plotInterest: z.string().trim().optional(),
});

export async function submitLead(formData: FormData) {
  const rawEmail = (formData.get("email")?.toString() || "").trim();
  const rawMessage = (formData.get("message")?.toString() || "").trim();
  const rawPlotInterest = (formData.get("plotInterest")?.toString() || "").trim();

  const raw = {
    name: formData.get("name")?.toString()?.trim() || "",
    phone: formData.get("phone")?.toString()?.trim() || "",
    email: rawEmail || undefined,
    message: rawMessage || undefined,
    source: formData.get("source")?.toString()?.trim() || "website",
    plotInterest: rawPlotInterest || undefined,
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  try {
    const res = await sendLeadNotification(parsed.data);
    if (res?.error) {
      console.error("Resend API error:", res.error);
      return { error: res.error.message || "Failed to send email." };
    }
    return { success: true, message: "Thank you! We'll get back to you shortly." };
  } catch (error) {
    console.error("Failed to send lead notification:", error);
    return { error: "Something went wrong. Please try again or contact us on WhatsApp." };
  }
}
