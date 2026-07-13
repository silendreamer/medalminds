"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { sanitizeNextPath } from "@/lib/redirects";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { FormMessage } from "@/components/auth/FormMessage";

const GENERIC_LOGIN_ERROR = "Incorrect email or password. Please try again.";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [pending, setPending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [unverified, setUnverified] = useState(false);
  const [resendPending, setResendPending] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setUnverified(false);
    setResendMessage(null);
    setPending(true);

    const { error } = await authClient.signIn.email({
      email: email.trim(),
      password,
      rememberMe,
    });

    setPending(false);

    if (!error) {
      router.push(sanitizeNextPath(searchParams.get("next")));
      router.refresh();
      return;
    }

    if (error.code === "EMAIL_NOT_VERIFIED") {
      setUnverified(true);
      return;
    }

    // Anti-enumeration: bad password and unknown email must read identically.
    setFormError(GENERIC_LOGIN_ERROR);
  }

  async function handleResend() {
    setResendPending(true);
    setResendMessage(null);
    const { error } = await authClient.sendVerificationEmail({
      email: email.trim(),
      callbackURL: "/verify-email?status=success",
    });
    setResendPending(false);
    setResendMessage(
      error
        ? (error.message ?? "Could not resend the email. Please try again shortly.")
        : "Verification email sent. Check your inbox."
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {formError ? <FormMessage kind="error">{formError}</FormMessage> : null}
      {unverified ? (
        <FormMessage kind="info">
          Your email isn&apos;t verified yet. Check your inbox for the verification link, or{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendPending}
            style={{ color: "#5a92f0", fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}
          >
            {resendPending ? "sending…" : "resend it"}
          </button>
          .
        </FormMessage>
      ) : null}
      {resendMessage ? <FormMessage kind="info">{resendMessage}</FormMessage> : null}
      <FormField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        autoComplete="email"
        required
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        autoComplete="current-password"
        required
      />
      <label className="auth-checkbox-row">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) => setRememberMe(event.target.checked)}
        />
        Remember me
      </label>
      <SubmitButton pending={pending}>Log in</SubmitButton>
      <div className="auth-footer-links">
        <Link href="/forgot-password">Forgot password?</Link>
        <Link href="/signup">Create an account</Link>
      </div>
    </form>
  );
}
