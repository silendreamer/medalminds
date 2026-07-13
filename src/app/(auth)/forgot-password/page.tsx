import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot password | Medal Minds",
  description: "Reset the password for your Medal Minds account.",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard title="Reset your password" subtitle="Enter your email and we'll send you a reset link.">
      <ForgotPasswordForm />
    </AuthCard>
  );
}
