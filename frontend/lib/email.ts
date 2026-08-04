import { Resend } from "resend";

const NOTIFY_EMAIL = "contact.etihadtown@gmail.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Etihad Town <leads@etihadtownofficial.com>";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured. Set it in the deployment environment variables."
    );
  }
  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">${escapeHtml(
    label
  )}</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(value)}</td></tr>`;
}

export async function sendLeadNotification(data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: string;
  plotInterest?: string;
}) {
  return getResendClient().emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    subject: `New Inquiry: ${data.name} — ${data.source}`,
    html: `
      <h2>New Inquiry Received</h2>
      <table style="border-collapse:collapse;width:100%">
        ${row("Name", data.name)}
        ${row("Phone", data.phone)}
        ${data.email ? row("Email", data.email) : ""}
        ${data.message ? row("Message", data.message) : ""}
        ${data.plotInterest ? row("Plot Interest", data.plotInterest) : ""}
        ${row("Source", data.source)}
      </table>
    `,
  });
}

export async function sendBookingNotification(data: {
  name: string;
  phone: string;
  email?: string;
  type: string;
  preferredDate?: string;
  plotInterest?: string;
}) {
  return getResendClient().emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    subject: `New ${data.type === "site_visit" ? "Site Visit" : "Booking"} Request: ${data.name}`,
    html: `
      <h2>New ${data.type === "site_visit" ? "Site Visit" : "Booking"} Request</h2>
      <table style="border-collapse:collapse;width:100%">
        ${row("Name", data.name)}
        ${row("Phone", data.phone)}
        ${data.email ? row("Email", data.email) : ""}
        ${data.preferredDate ? row("Preferred Date", data.preferredDate) : ""}
        ${data.plotInterest ? row("Plot Interest", data.plotInterest) : ""}
      </table>
    `,
  });
}
