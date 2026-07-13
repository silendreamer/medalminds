"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/authClient";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { FormMessage } from "@/components/auth/FormMessage";

const VERIFY_CALLBACK_URL = "/verify-email?status=success";
const RESEND_COOLDOWN_MS = 30_000;

type Role = "STUDENT" | "PARENT";

type FieldErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

export function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("STUDENT");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resendPending, setResendPending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim()) {
      errors.name = "Enter your name.";
    }
    if (!email.trim()) {
      errors.email = "Enter your email address.";
    }
    if (password.length < 10) {
      errors.password = "Password must be at least 10 characters.";
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = "Passwords do not match.";
    }
    return errors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setPending(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email: email.trim(),
      password,
      role,
      callbackURL: VERIFY_CALLBACK_URL,
    });
    setPending(false);

    if (!error) {
      setSubmitted(true);
      return;
    }

    // Anti-enumeration: an existing account must produce the exact same
    // outcome as a brand new signup — never reveal that the email is taken.
    if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
      setSubmitted(true);
      return;
    }

    setFormError(error.message ?? "Something went wrong. Please try again.");
  }

  async function handleResend() {
    setResendPending(true);
    setResendMessage(null);
    const { error } = await authClient.sendVerificationEmail({
      email: email.trim(),
      callbackURL: VERIFY_CALLBACK_URL,
    });
    setResendPending(false);

    if (error) {
      setResendMessage(error.message ?? "Could not resend the email. Please try again shortly.");
      return;
    }

    setResendMessage("Verification email sent. Check your inbox.");
    setResendCooldown(true);
    setTimeout(() => setResendCooldown(false), RESEND_COOLDOWN_MS);
  }

  if (submitted) {
    return (
      <div className="auth-form">
        <FormMessage kind="success">
          If this email is new, you&apos;ll receive a verification link. Check your inbox (and spam
          folder) to finish setting up your account.
        </FormMessage>
        <button
          type="button"
          className="button button-lg auth-submit-btn"
          onClick={handleResend}
          disabled={resendPending || resendCooldown}
        >
          {resendPending ? "Sending…" : resendCooldown ? "Sent" : "Resend verification email"}
        </button>
        {resendMessage ? <FormMessage kind="info">{resendMessage}</FormMessage> : null}
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
        label="Name"
        type="text"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={fieldErrors.name}
        autoComplete="name"
        required
      />
      <FormField
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors.email}
        autoComplete="email"
        required
      />
      <FormField
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={fieldErrors.password}
        hint="At least 10 characters."
        autoComplete="new-password"
        required
        minLength={10}
      />
      <FormField
        label="Confirm password"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        error={fieldErrors.confirmPassword}
        autoComplete="new-password"
        required
        minLength={10}
      />
      <div className="auth-radio-group">
        <span>I am a</span>
        <div className="auth-radio-options">
          <label className="auth-radio-option">
            <input
              type="radio"
              name="role"
              value="STUDENT"
              checked={role === "STUDENT"}
              onChange={() => setRole("STUDENT")}
            />
            Student
          </label>
          <label className="auth-radio-option">
            <input
              type="radio"
              name="role"
              value="PARENT"
              checked={role === "PARENT"}
              onChange={() => setRole("PARENT")}
            />
            Parent
          </label>
        </div>
      </div>
      <SubmitButton pending={pending}>Create account</SubmitButton>
      <p className="auth-footer-note">
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </form>
  );
}
