import { Resend } from "resend";

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendEmail({ to, subject, html, text }: SendEmailInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM ?? "MedalMinds <no-reply@medalminds.com>";

  if (!apiKey) {
    console.log(
      [
        "----- EMAIL (console fallback, RESEND_API_KEY not set) -----",
        `To: ${to}`,
        `Subject: ${subject}`,
        "",
        text,
        "--------------------------------------------------------------",
      ].join("\n"),
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({ from, to, subject, html, text });
  } catch (error) {
    console.error("sendEmail: failed to send via Resend", error);
  }
}
