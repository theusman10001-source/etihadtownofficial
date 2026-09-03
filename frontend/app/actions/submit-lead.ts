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

export type LeadPayload = {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: string;
  plotInterest?: string;
};

export async function submitLead(input: FormData | Record<string, unknown>) {
  let name = "";
  let phone = "";
  let email = "";
  let message = "";
  let source = "website";
  let plotInterest = "";

  if (input instanceof FormData) {
    name = (input.get("name")?.toString() || "").trim();
    phone = (input.get("phone")?.toString() || "").trim();
    email = (input.get("email")?.toString() || "").trim();
    message = (input.get("message")?.toString() || "").trim();
    source = (input.get("source")?.toString() || "website").trim();
    plotInterest = (input.get("plotInterest")?.toString() || "").trim();
  } else if (input && typeof input === "object") {
    name = String(input.name || "").trim();
    phone = String(input.phone || "").trim();
    email = String(input.email || "").trim();
    message = String(input.message || "").trim();
    source = String(input.source || "website").trim();
    plotInterest = String(input.plotInterest || "").trim();
  }

  const raw = {
    name,
    phone,
    email: email || undefined,
    message: message || undefined,
    source: source || "website",
    plotInterest: plotInterest || undefined,
  };

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid input";
    console.error("submitLead validation error:", errorMsg, raw);
    return { error: errorMsg };
  }

  try {
    console.log(`[Lead Action] Sending lead for ${parsed.data.name} from ${parsed.data.source}...`);
    const res = await sendLeadNotification(parsed.data);
    
    if (res?.error) {
      console.error("[Lead Action] Resend API error:", res.error);
      return { error: res.error.message || "Failed to send email." };
    }
    
    console.log(`[Lead Action] Resend email delivered successfully! Email ID: ${res?.data?.id}`);
    return { success: true, message: "Thank you! We'll get back to you shortly." };
  } catch (error) {
    console.error("[Lead Action] Exception sending lead notification:", error);
    return { error: "Something went wrong. Please try again or contact us on WhatsApp." };
  }
}
