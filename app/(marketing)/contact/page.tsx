"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Mail, MessageSquare, User } from "lucide-react";
import toast from "react-hot-toast";
import FormField from "@/components/ui/FormField";
import PageHeader from "@/components/ui/PageHeader";
import { Errors, validateContact } from "@/lib/validation";

type Key = "name" | "email" | "subject" | "message";
const topics = ["Order or payment", "Technical issue", "Feedback", "Partnership", "Other"];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Errors<Key>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const change = (k: Key, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateContact(form);
    setErrors(errs);
    if (Object.keys(errs).length) return toast.error("Please fix the highlighted fields");
    setSending(true);
    await new Promise((r) => setTimeout(r, 1000)); // demo: no backend
    setSending(false);
    setSent(true);
    toast.success("Message sent!");
  };

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-2xl">
        <PageHeader title="Contact Us" subtitle="Have questions or feedback? Send us a message and we'll reply within one business day." center />

        {sent ? (
          <div className="surface animate-fade-up px-6 py-14 text-center">
            <CheckCircle2 className="animate-pop mx-auto h-16 w-16 text-emerald-400" />
            <h2 className="mt-5 text-2xl font-bold">Thanks, {form.name.split(" ")[0]}!</h2>
            <p className="mt-2 text-gray-400">We&apos;ve received your message and will reply to {form.email}.</p>
            <button
              className="btn-secondary mt-6"
              onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
            >
              Send another
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="surface animate-fade-up space-y-5 p-6 sm:p-8">
            <FormField label="Your name" icon={User} autoComplete="name" placeholder="John Doe" maxLength={50} value={form.name} error={errors.name} onChange={(e) => change("name", e.target.value)} />
            <FormField label="Email" icon={Mail} type="email" autoComplete="email" placeholder="you@example.com" value={form.email} error={errors.email} onChange={(e) => change("email", e.target.value)} />

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-gray-300">Topic</label>
              <select id="subject" className="field" aria-invalid={!!errors.subject} value={form.subject} onChange={(e) => change("subject", e.target.value)}>
                <option value="">Select a topic…</option>
                {topics.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.subject && <p role="alert" className="field-error">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-gray-300">Message</label>
              <div className="relative">
                <MessageSquare className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                <textarea id="message" rows={5} className="field" aria-invalid={!!errors.message} placeholder="How can we help?" value={form.message} onChange={(e) => change("message", e.target.value)} />
              </div>
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-red-400">{errors.message}</span>
                <span className={form.message.length > 500 ? "text-red-400" : "text-gray-500"}>{form.message.length}/500</span>
              </div>
            </div>

            <button type="submit" disabled={sending} className="btn-primary w-full sm:w-auto">
              {sending ? (<><span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" /> Sending…</>) : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
