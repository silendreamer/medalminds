"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/authClient";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { FormMessage } from "@/components/auth/FormMessage";

const SUCCESS_MESSAGE =
  "If an account exists for that email, we've sent a link to reset your password. Check your inbox (and spam folder).";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setPending(true);

    const { error } = await authClient.requestPasswordReset({
      email: email.trim(),
      redirectTo: "/reset-password",
    });

    setPending(false);

    // Anti-enumeration: existing and non-existing accounts must produce the
    // exact same outcome. Better Auth's request-password-reset endpoint
    // itself never distinguishes the two; only genuine transport/validation
    // failures surface as an error here.
    if (!error) {
      setSubmitted(true);
      return;
    }

    setFormError(error.message ?? "Something went wrong. Please try again.");
  }

  if (submitted) {
    return (
      <div className="auth-form">
        <FormMessage kind="success">{SUCCESS_MESSAGE}</FormMessage>
        <p className="auth-footer-note">
          <Link href="/login">Back to log in</Link>
        </p>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {formError ? <FormMessage kind="error">{formError}</FormMessage> : null}
      <FormField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        required
      />
      <SubmitButton pending={pending}>Send reset link</SubmitButton>
      <p className="auth-footer-note">
        <Link href="/login">Back to log in</Link>
      </p>
    </form>
  );
}
