import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset password | Medal Minds",
  description: "Choose a new password for your Medal Minds account.",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return (
    <AuthCard title="Choose a new password" subtitle="Pick a strong password you haven't used before.">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}
