"use server";

import { z } from "zod";
import { sendBookingNotification } from "@/lib/email";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  type: z.enum(["site_visit", "booking"]),
  preferredDate: z.string().optional(),
  plotInterest: z.string().optional(),
});

export async function submitBooking(formData: FormData) {
  const raw = {
    name: formData.get("name") ?? undefined,
    phone: formData.get("phone") ?? undefined,
    email: formData.get("email") ?? undefined,
    type: formData.get("type") ?? undefined,
    preferredDate: formData.get("preferredDate") ?? undefined,
    plotInterest: formData.get("plotInterest") ?? undefined,
  };

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message || "Invalid input" };
  }

  try {
    await sendBookingNotification(parsed.data);
    return { success: true, message: "We've received your request. Our team will confirm shortly." };
  } catch (error) {
    console.error("Failed to send booking notification:", error);
    return { error: "Something went wrong. Please try again or call us." };
  }
}
