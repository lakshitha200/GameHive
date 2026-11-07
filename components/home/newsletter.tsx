"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";
import FormField from "../ui/FormField";
import { validateEmail } from "@/lib/validation";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = validateEmail(email);
    setError(err);
    if (!err) setDone(true);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-600/30 via-surface to-pink-600/20 p-8 text-center sm:p-14">
      <h2 className="section-title">Never miss a deal</h2>
      <p className="section-sub">Join the hive newsletter for weekly discounts, new releases and exclusive codes.</p>

      {done ? (
        <p className="animate-pop mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-6 py-3 text-emerald-300">
          <CheckCircle2 size={20} /> You&apos;re in! Check your inbox for a welcome code.
        </p>
      ) : (
        <form onSubmit={submit} noValidate className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left sm:flex-row sm:items-start">
          <div className="flex-1">
            <FormField label="Email address" icon={Mail} type="email" placeholder="you@example.com" autoComplete="email" value={email} error={error}
              onChange={(e) => { setEmail(e.target.value); setError(undefined); }} />
          </div>
          <button className="btn-primary sm:mt-[1.65rem]">Subscribe</button>
        </form>
      )}
    </div>
  );
}
