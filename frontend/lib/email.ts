import { Resend } from "resend";

const DEFAULT_NOTIFY_EMAIL = "contact.etihadtown@gmail.com";
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

function getRecipientEmails(): string[] {
  const configured = process.env.LEAD_NOTIFICATION_EMAIL || process.env.NOTIFY_EMAIL || DEFAULT_NOTIFY_EMAIL;
  const emails = configured
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
  
  // Ensure default notification email is included if not already present
  if (!emails.includes(DEFAULT_NOTIFY_EMAIL)) {
    emails.push(DEFAULT_NOTIFY_EMAIL);
  }
  return emails;
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
  return `<tr>
    <td style="padding:10px 14px;border:1px solid #e2e8f0;font-weight:600;color:#081e42;background:#f8fafc;width:35%;">${escapeHtml(label)}</td>
    <td style="padding:10px 14px;border:1px solid #e2e8f0;color:#1e293b;">${escapeHtml(value)}</td>
  </tr>`;
}

export async function sendLeadNotification(data: {
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: string;
  plotInterest?: string;
}) {
  const recipients = getRecipientEmails();
  const cleanPhone = data.phone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("0") ? "92" + cleanPhone.slice(1) : cleanPhone}`;
  
  const sourceLabel =
    data.source === "contact-page"
      ? "Contact Us Page"
      : data.source === "homepage-form"
      ? "Homepage Form"
      : data.source === "homepage-popup"
      ? "Lead Popup"
      : data.source;

  const now = new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" });

  const subject = `[New Lead - ${sourceLabel}] ${data.name} | ${data.phone}`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;">
      <div style="background:#081e42;padding:24px;text-align:center;">
        <h1 style="color:#ffffff;font-size:22px;margin:0 0 6px 0;font-weight:700;">New Lead Inquiry</h1>
        <p style="color:#a2bf3d;font-size:14px;margin:0;font-weight:600;">Etihad Town Official Website</p>
      </div>
      
      <div style="padding:24px;">
        <p style="margin:0 0 16px 0;color:#475569;font-size:14px;">
          A new customer inquiry has been received from <strong>${escapeHtml(sourceLabel)}</strong>.
        </p>

        <table style="border-collapse:collapse;width:100%;font-size:14px;margin-bottom:20px;">
          ${row("Full Name", data.name)}
          ${row("Phone Number", data.phone)}
          ${data.email ? row("Email Address", data.email) : ""}
          ${data.plotInterest ? row("Interested In", data.plotInterest) : ""}
          ${data.message ? row("Message", data.message) : ""}
          ${row("Submission Source", sourceLabel)}
          ${row("Time Received (PKT)", now)}
        </table>

        <div style="text-align:center;margin:24px 0 10px 0;">
          <a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:30px;font-weight:700;font-size:14px;">
            Open in WhatsApp (${data.phone})
          </a>
        </div>
      </div>

      <div style="background:#f8fafc;padding:14px;text-align:center;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;">
        Etihad Town Official Lead Notification System
      </div>
    </div>
  `;

  return getResendClient().emails.send({
    from: FROM_EMAIL,
    to: recipients,
    replyTo: data.email ? data.email : undefined,
    subject,
    html,
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
  const recipients = getRecipientEmails();
  const cleanPhone = data.phone.replace(/[^0-9]/g, "");
  const whatsappUrl = `https://wa.me/${cleanPhone.startsWith("0") ? "92" + cleanPhone.slice(1) : cleanPhone}`;
  const now = new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" });

  const subject = `[New ${data.type === "site_visit" ? "Site Visit" : "Booking"}] ${data.name} | ${data.phone}`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;">
      <div style="background:#081e42;padding:24px;text-align:center;">
        <h1 style="color:#ffffff;font-size:22px;margin:0 0 6px 0;font-weight:700;">${data.type === "site_visit" ? "Site Visit Request" : "Plot Booking Request"}</h1>
        <p style="color:#a2bf3d;font-size:14px;margin:0;font-weight:600;">Etihad Town Official Website</p>
      </div>
      
      <div style="padding:24px;">
        <table style="border-collapse:collapse;width:100%;font-size:14px;margin-bottom:20px;">
          ${row("Full Name", data.name)}
          ${row("Phone Number", data.phone)}
          ${data.email ? row("Email Address", data.email) : ""}
          ${data.plotInterest ? row("Plot Interest", data.plotInterest) : ""}
          ${data.preferredDate ? row("Preferred Date", data.preferredDate) : ""}
          ${row("Request Type", data.type)}
          ${row("Time Received (PKT)", now)}
        </table>

        <div style="text-align:center;margin:24px 0 10px 0;">
          <a href="${whatsappUrl}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:30px;font-weight:700;font-size:14px;">
            Open in WhatsApp (${data.phone})
          </a>
        </div>
      </div>
    </div>
  `;

  return getResendClient().emails.send({
    from: FROM_EMAIL,
    to: recipients,
    replyTo: data.email ? data.email : undefined,
    subject,
    html,
  });
}
