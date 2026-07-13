export type EmailTemplate = {
  subject: string;
  html: string;
  text: string;
};

const INK = "#1a2745";
const ACCENT = "#5a92f0";
const BORDER = "#e7e9ee";
const FONT_STACK =
  "'Poppins', 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrapEmail(bodyHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f5f6fa;font-family:${FONT_STACK};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background:#ffffff;border:1px solid ${BORDER};border-radius:12px;padding:32px;">
            <tr>
              <td>
                <div style="font-size:18px;font-weight:700;color:${INK};margin-bottom:24px;">MedalMinds</div>
                ${bodyHtml}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buttonHtml(url: string, label: string): string {
  return `<a href="${escapeHtml(url)}" style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;font-weight:600;padding:12px 24px;border-radius:8px;margin:16px 0;">${escapeHtml(label)}</a>`;
}

function urlFallbackHtml(url: string): string {
  return `<p style="color:${INK};font-size:13px;line-height:1.5;word-break:break-all;">If the button above doesn't work, copy and paste this link into your browser:<br /><a href="${escapeHtml(url)}" style="color:${ACCENT};">${escapeHtml(url)}</a></p>`;
}

function ignoreLineHtml(): string {
  return `<p style="color:#6b7280;font-size:13px;line-height:1.5;margin-top:24px;">If you didn't request this, you can safely ignore this email.</p>`;
}

export function verificationEmail(data: { name: string; url: string }): EmailTemplate {
  const name = escapeHtml(data.name);
  const { url } = data;
  const subject = "Verify your MedalMinds email address";
  const html = wrapEmail(`
    <p style="color:${INK};font-size:15px;line-height:1.6;">Hi ${name},</p>
    <p style="color:${INK};font-size:15px;line-height:1.6;">Thanks for signing up for MedalMinds. Please verify your email address to activate your account.</p>
    ${buttonHtml(url, "Verify email")}
    ${urlFallbackHtml(url)}
    ${ignoreLineHtml()}
  `);
  const text = [
    `Hi ${data.name},`,
    "",
    "Thanks for signing up for MedalMinds. Please verify your email address to activate your account.",
    "",
    `Verify your email: ${url}`,
    "",
    "If you didn't request this, you can safely ignore this email.",
  ].join("\n");
  return { subject, html, text };
}

export function resetPasswordEmail(data: { name: string; url: string }): EmailTemplate {
  const name = escapeHtml(data.name);
  const { url } = data;
  const subject = "Reset your MedalMinds password";
  const html = wrapEmail(`
    <p style="color:${INK};font-size:15px;line-height:1.6;">Hi ${name},</p>
    <p style="color:${INK};font-size:15px;line-height:1.6;">We received a request to reset your MedalMinds password. This link expires in 1 hour.</p>
    ${buttonHtml(url, "Reset password")}
    ${urlFallbackHtml(url)}
    ${ignoreLineHtml()}
  `);
  const text = [
    `Hi ${data.name},`,
    "",
    "We received a request to reset your MedalMinds password. This link expires in 1 hour.",
    "",
    `Reset your password: ${url}`,
    "",
    "If you didn't request this, you can safely ignore this email.",
  ].join("\n");
  return { subject, html, text };
}

export function passwordChangedEmail(data: { name: string }): EmailTemplate {
  const name = escapeHtml(data.name);
  const subject = "Your MedalMinds password was changed";
  const html = wrapEmail(`
    <p style="color:${INK};font-size:15px;line-height:1.6;">Hi ${name},</p>
    <p style="color:${INK};font-size:15px;line-height:1.6;">This is a confirmation that your MedalMinds account password was just changed.</p>
    <p style="color:#6b7280;font-size:13px;line-height:1.5;margin-top:24px;">If you didn't make this change, please reset your password immediately and contact support.</p>
  `);
  const text = [
    `Hi ${data.name},`,
    "",
    "This is a confirmation that your MedalMinds account password was just changed.",
    "",
    "If you didn't make this change, please reset your password immediately and contact support.",
  ].join("\n");
  return { subject, html, text };
}

export function accountDeletedEmail(data: { name: string }): EmailTemplate {
  const name = escapeHtml(data.name);
  const subject = "Your MedalMinds account has been deleted";
  const html = wrapEmail(`
    <p style="color:${INK};font-size:15px;line-height:1.6;">Hi ${name},</p>
    <p style="color:${INK};font-size:15px;line-height:1.6;">Your MedalMinds account and all associated data have been deleted, as requested.</p>
    <p style="color:#6b7280;font-size:13px;line-height:1.5;margin-top:24px;">If you didn't request this, please contact support immediately.</p>
  `);
  const text = [
    `Hi ${data.name},`,
    "",
    "Your MedalMinds account and all associated data have been deleted, as requested.",
    "",
    "If you didn't request this, please contact support immediately.",
  ].join("\n");
  return { subject, html, text };
}
