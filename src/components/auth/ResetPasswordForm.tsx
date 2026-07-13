"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/authClient";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { FormMessage } from "@/components/auth/FormMessage";

type FieldErrors = {
  newPassword?: string;
  confirmPassword?: string;
};

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!token) {
    return (
      <div className="auth-form">
        <FormMessage kind="error">
          This reset link is missing or invalid. Request a new one below.
        </FormMessage>
        <Link href="/forgot-password" className="button button-lg auth-submit-btn">
          Request a new link
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="auth-form">
        <FormMessage kind="success">
          Your password has been reset. All other sessions have been signed out.
        </FormMessage>
        <Link href="/login" className="button button-lg auth-submit-btn">
          Log in
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const errors: FieldErrors = {};
    if (newPassword.length < 10) {
      errors.newPassword = "Password must be at least 10 characters.";
    }
    if (confirmPassword !== newPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setPending(true);
    const { error } = await authClient.resetPassword({
      newPassword,
      token: token as string,
    });
    setPending(false);

    if (!error) {
      setSubmitted(true);
      return;
    }

    if (error.code === "INVALID_TOKEN") {
      setFormError("This reset link is invalid or has expired. Request a new one from the forgot password page.");
      return;
    }

    setFormError(error.message ?? "Something went wrong. Please try again.");
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {formError ? <FormMessage kind="error">{formError}</FormMessage> : null}
      <FormField
        label="New password"
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={(event) => setNewPassword(event.target.value)}
        error={fieldErrors.newPassword}
        hint="At least 10 characters."
        autoComplete="new-password"
        required
        minLength={10}
      />
      <FormField
        label="Confirm new password"
        type="password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        error={fieldErrors.confirmPassword}
        autoComplete="new-password"
        required
        minLength={10}
      />
      <SubmitButton pending={pending}>Reset password</SubmitButton>
    </form>
  );
}
