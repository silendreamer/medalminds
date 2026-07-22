import { sendEmail } from "@/lib/email/sendEmail";
import {
  accountDeletedEmail,
  passwordChangedEmail,
  resetPasswordEmail,
  verificationEmail,
} from "@/lib/email/templates";

// Verification and reset emails are load-bearing: if the send fails, the user
// cannot complete the flow. Let the failure propagate so Better Auth surfaces
// it (and it shows up in logs) rather than a signup/reset that silently never
// delivers mail. The user row / reset token already exist, so the standard
// "resend verification" path still recovers.
export async function sendVerificationEmailFn(data: {
  user: { email: string; name: string };
  url: string;
  token: string;
}): Promise<void> {
  const { subject, html, text } = verificationEmail({ name: data.user.name, url: data.url });
  await sendEmail({ to: data.user.email, subject, html, text });
}

export async function sendResetPasswordEmail(data: {
  user: { email: string; name: string };
  url: string;
  token: string;
}): Promise<void> {
  const { subject, html, text } = resetPasswordEmail({ name: data.user.name, url: data.url });
  await sendEmail({ to: data.user.email, subject, html, text });
}

// Notices below are best-effort: the underlying action (password change,
// account deletion) has already completed, so a failed notice must not throw
// and undo/abort it. Log the real reason but swallow.
export async function sendPasswordChangedNotice(user: { email: string; name: string }): Promise<void> {
  try {
    const { subject, html, text } = passwordChangedEmail({ name: user.name });
    await sendEmail({ to: user.email, subject, html, text });
  } catch (error) {
    console.error("sendPasswordChangedNotice: failed to send", error);
  }
}

export async function sendAccountDeletedNotice(user: { email: string; name: string }): Promise<void> {
  try {
    const { subject, html, text } = accountDeletedEmail({ name: user.name });
    await sendEmail({ to: user.email, subject, html, text });
  } catch (error) {
    console.error("sendAccountDeletedNotice: failed to send", error);
  }
}
