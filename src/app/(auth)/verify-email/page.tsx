import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { VerifyEmailPanel } from "@/components/auth/VerifyEmailPanel";

export const metadata: Metadata = {
  title: "Verify email | Medal Minds",
  description: "Verify your email address for your Medal Minds account.",
  robots: { index: false, follow: false },
};

export default function VerifyEmailPage() {
  return (
    <AuthCard title="Verify your email">
      <Suspense fallback={null}>
        <VerifyEmailPanel />
      </Suspense>
    </AuthCard>
  );
}
