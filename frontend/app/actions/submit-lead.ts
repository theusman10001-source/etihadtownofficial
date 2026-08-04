"use server";

import { z } from "zod";
import { sendLeadNotification } from "@/lib/email";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  message: z.string().optional(),
  source: z.string().min(1),
  plotInterest: z.string().optional(),
});

export async function submitLead(formData: FormData) {
  const raw = {
    name: formData.get("name") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    email: formData.get("email") ?? undefined,
    message: formData.get("message") ?? undefined,
    source: formData.get("source") || "website",
    plotInterest: formData.get("plotInterest") ?? undefined,
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await sendLeadNotification(parsed.data);
    return { success: true, message: "Thank you! We'll get back to you shortly." };
  } catch (error) {
    console.error("Failed to send lead notification:", error);
    return { error: "Something went wrong. Please try again or contact us on WhatsApp." };
  }
}
