import { sendEmail } from "@/lib/email/sendEmail";
import {
  accountDeletedEmail,
  passwordChangedEmail,
  resetPasswordEmail,
  verificationEmail,
} from "@/lib/email/templates";

export async function sendVerificationEmailFn(data: {
  user: { email: string; name: string };
  url: string;
  token: string;
}): Promise<void> {
  try {
    const { subject, html, text } = verificationEmail({ name: data.user.name, url: data.url });
    await sendEmail({ to: data.user.email, subject, html, text });
  } catch (error) {
    console.error("sendVerificationEmailFn: failed to send", error);
  }
}

export async function sendResetPasswordEmail(data: {
  user: { email: string; name: string };
  url: string;
  token: string;
}): Promise<void> {
  try {
    const { subject, html, text } = resetPasswordEmail({ name: data.user.name, url: data.url });
    await sendEmail({ to: data.user.email, subject, html, text });
  } catch (error) {
    console.error("sendResetPasswordEmail: failed to send", error);
  }
}

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
