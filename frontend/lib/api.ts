export async function submitLead(formData: FormData) {
  const { submitLead } = await import("@/app/actions/submit-lead");
  return submitLead(formData);
}

export async function submitBooking(formData: FormData) {
  const { submitBooking } = await import("@/app/actions/submit-booking");
  return submitBooking(formData);
}
