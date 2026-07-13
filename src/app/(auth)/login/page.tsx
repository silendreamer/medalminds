import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in | Medal Minds",
  description: "Log in to your Medal Minds account.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" subtitle="Log in to continue your Science Bowl practice.">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
