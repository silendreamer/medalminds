"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { FormMessage } from "@/components/auth/FormMessage";

export function VerifyEmailPanel() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");
  const success = !errorCode && searchParams.get("status") === "success";

  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleResend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    const { error } = await authClient.sendVerificationEmail({
      email: email.trim(),
      callbackURL: "/verify-email?status=success",
    });

    setPending(false);
    setMessage(
      error
        ? (error.message ?? "Could not resend the email. Please try again shortly.")
        : "If this email is registered, a verification link has been sent."
    );
  }

  if (success) {
    return (
      <div className="auth-form">
        <FormMessage kind="success">Your email is verified and you&apos;re signed in.</FormMessage>
        <Link href="/account" className="button button-lg auth-submit-btn">
          Go to your account
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-form">
      {errorCode ? (
        <FormMessage kind="error">
          This verification link is invalid or has expired. Enter your email below to get a new one.
        </FormMessage>
      ) : (
        <FormMessage kind="info">
          Check your inbox for the verification link we sent you. Didn&apos;t get it? Enter your email
          below to resend it.
        </FormMessage>
      )}
      <form className="auth-form" onSubmit={handleResend} noValidate>
        <FormField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        <SubmitButton pending={pending}>Resend verification email</SubmitButton>
      </form>
      {message ? <FormMessage kind="info">{message}</FormMessage> : null}
      <p className="auth-footer-note">
        <Link href="/login">Back to log in</Link>
      </p>
    </div>
  );
}
