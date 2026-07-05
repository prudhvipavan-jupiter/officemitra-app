import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/site/settings-store";

export async function sendEmail(opts: { to: string; subject: string; html: string }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL ?? `OfficeMitra <noreply@${new URL(SITE_URL).hostname}>`;

  if (!key) {
    console.info("[email] skipped (no RESEND_API_KEY):", opts.subject);
    return { sent: false };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: opts.to, subject: opts.subject, html: opts.html }),
  });

  if (!res.ok) {
    console.error("[email] failed:", await res.text());
    return { sent: false };
  }
  return { sent: true };
}

export async function notifyAdminNewContact(input: {
  name: string;
  email: string;
  subject: string;
  request_type: string;
}) {
  const settings = await getSiteSettings();
  if (!settings.email_notifications) return;

  await sendEmail({
    to: CONTACT_EMAIL,
    subject: `[OfficeMitra] New ${input.request_type} enquiry: ${input.subject}`,
    html: `<p><strong>${input.name}</strong> (${input.email}) submitted a ${input.request_type} request.</p>
           <p><strong>Subject:</strong> ${input.subject}</p>
           <p><a href="${SITE_URL}/admin/contact">Open contact inbox</a></p>`,
  });
}

export async function sendContactConfirmation(input: { name: string; email: string; subject: string }) {
  const settings = await getSiteSettings();
  if (!settings.email_notifications) return;

  await sendEmail({
    to: input.email,
    subject: `We received your message — ${SITE_NAME}`,
    html: `<p>Dear ${input.name},</p>
           <p>Thank you for contacting ${SITE_NAME}. We received your message regarding <strong>${input.subject}</strong>.</p>
           <p>We typically respond within 2–3 working days. This is guidance only — not legal advice or an official government response.</p>
           <p>— ${SITE_NAME} Team</p>`,
  });
}

export async function notifyAdminNewCommunity(input: { title: string; author_name: string }) {
  const settings = await getSiteSettings();
  if (!settings.email_notifications) return;

  await sendEmail({
    to: CONTACT_EMAIL,
    subject: `[OfficeMitra] New community question: ${input.title}`,
    html: `<p><strong>${input.author_name}</strong> submitted a community question.</p>
           <p><strong>${input.title}</strong></p>
           <p><a href="${SITE_URL}/admin/community">Moderate in admin</a></p>`,
  });
}
