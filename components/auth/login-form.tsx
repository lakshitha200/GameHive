"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/providers/auth-provider";
import { Errors, validateLogin } from "@/lib/validation";
import FormField from "../ui/FormField";
import PasswordInput from "./password-input";

type E = Errors<"email" | "password">;

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<E>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    const errs = validateLogin({ email, password });
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    const r = await login(email.trim(), password);
    setSubmitting(false);
    if (r.ok) {
      const next = params.get("next");
      // only allow same-site relative redirects
      router.push(next && next.startsWith("/") && !next.startsWith("//") ? next : "/account/library");
    } else {
      setFormError(r.message ?? "Login failed");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {formError && (
        <div role="alert" key={formError} className="animate-shake rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {formError}
        </div>
      )}
      <FormField
        label="Email"
        icon={Mail}
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: undefined })); }}
        error={errors.email}
      />
      <PasswordInput
        label="Password"
        autoComplete="current-password"
        placeholder="Your password"
        value={password}
        onChange={(e) => { setPassword(e.target.value); setErrors((x) => ({ ...x, password: undefined })); }}
        error={errors.password}
      />
      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Logging in…</>) : "Login"}
      </button>
    </form>
  );
}
