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

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({ from, to, subject, html, text });

  // Resend reports send failures on the resolved `error` field rather than by
  // throwing (e.g. unverified `from` domain, sandbox recipient restriction,
  // invalid key). Previously both this and every caller swallowed failures, so
  // a rejected send looked identical to a delivered one. Surface the real
  // reason and throw so the failure is detectable instead of silent.
  if (error) {
    console.error(
      `sendEmail: Resend rejected send to ${to} (from ${from}, subject "${subject}"):`,
      error,
    );
    throw new Error(`Resend send failed: ${error.name}: ${error.message}`);
  }

  if (!data?.id) {
    console.error(`sendEmail: Resend returned no message id for send to ${to}`);
    throw new Error("Resend send failed: no message id returned");
  }
}
