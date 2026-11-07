"use client";

import { FormEvent, useState } from "react";
import { Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/providers/auth-provider";
import { Errors, passwordStrength, validateSignup } from "@/lib/validation";
import FormField from "../ui/FormField";
import PasswordInput from "./password-input";

type Key = "name" | "email" | "password" | "confirm";
const labels = ["Too weak", "Weak", "Okay", "Good", "Strong"];
const colors = ["bg-red-500", "bg-red-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"];

export default function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Errors<Key>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const bind = (k: Key) => ({
    value: form[k],
    error: errors[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [k]: e.target.value }));
      setErrors((x) => ({ ...x, [k]: undefined }));
    },
  });

  const strength = passwordStrength(form.password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");
    const errs = validateSignup(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    const r = await signup(form.name.trim(), form.email.trim(), form.password);
    setSubmitting(false);
    if (r.ok) router.push("/login");
    else {
      if (r.errors) setErrors(r.errors as Errors<Key>);
      setFormError(r.message ?? "Signup failed");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {formError && (
        <div role="alert" key={formError} className="animate-shake rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {formError}
        </div>
      )}
      <FormField label="Full name" icon={User} autoComplete="name" placeholder="John Doe" maxLength={50} {...bind("name")} />
      <FormField label="Email" icon={Mail} type="email" autoComplete="email" placeholder="you@example.com" {...bind("email")} />
      <div>
        <PasswordInput label="Password" autoComplete="new-password" placeholder="At least 8 characters" {...bind("password")} />
        {form.password && (
          <div className="mt-2 animate-fade-in" aria-live="polite">
            <div className="flex gap-1">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i < strength ? colors[strength] : "bg-gray-700"}`} />
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-400">{labels[strength]}</p>
          </div>
        )}
      </div>
      <PasswordInput label="Confirm password" autoComplete="new-password" placeholder="Repeat your password" {...bind("confirm")} />
      <button type="submit" disabled={submitting} className="btn-primary w-full">
        {submitting ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Creating account…</>) : "Create account"}
      </button>
    </form>
  );
}
