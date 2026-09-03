"use server";

import { z } from "zod";
import { sendBookingNotification } from "@/lib/email";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  phone: z.string().trim().min(7, "Please enter a valid phone number"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  type: z.enum(["site_visit", "booking"]),
  preferredDate: z.string().trim().optional(),
  plotInterest: z.string().trim().optional(),
});

export async function submitBooking(formData: FormData) {
  const rawEmail = (formData.get("email")?.toString() || "").trim();
  const rawPreferredDate = (formData.get("preferredDate")?.toString() || "").trim();
  const rawPlotInterest = (formData.get("plotInterest")?.toString() || "").trim();

  const raw = {
    name: formData.get("name")?.toString()?.trim() || "",
    phone: formData.get("phone")?.toString()?.trim() || "",
    email: rawEmail || undefined,
    type: formData.get("type")?.toString()?.trim() || "booking",
    preferredDate: rawPreferredDate || undefined,
    plotInterest: rawPlotInterest || undefined,
  };

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  try {
    const res = await sendBookingNotification(parsed.data);
    if (res?.error) {
      console.error("Resend API error:", res.error);
      return { error: res.error.message || "Failed to send email." };
    }
    return { success: true, message: "We've received your request. Our team will confirm shortly." };
  } catch (error) {
    console.error("Failed to send booking notification:", error);
    return { error: "Something went wrong. Please try again or call us." };
  }
}
