import type { Metadata } from "next";
import AuthShell from "@/components/auth/auth-shell";
import SignupForm from "@/components/auth/signup-form";

export const metadata: Metadata = { title: "Sign up" };

export default function SignupPage() {
  return (
    <AuthShell title="Join GameHive" subtitle="Create your free account and start playing." footer={{ text: "Already have an account?", link: "Login", href: "/login" }}>
      <SignupForm />
    </AuthShell>
  );
}
