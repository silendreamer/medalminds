import type { Metadata } from "next";
import { AuthCard } from "@/components/auth/AuthCard";
import { SignupForm } from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Sign up | Medal Minds",
  description: "Create a free Medal Minds account to track Science Bowl practice.",
  robots: { index: false, follow: false },
};

export default function SignupPage() {
  return (
    <AuthCard title="Create your account" subtitle="Free access to Science Bowl practice, lessons, and tests.">
      <SignupForm />
    </AuthCard>
  );
}
