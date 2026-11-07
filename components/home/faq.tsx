import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data/testimonials";

export default function Faq() {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqs.map((f) => (
        <details key={f.q} className="surface group overflow-hidden transition open:border-indigo-500/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-medium marker:hidden [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-indigo-400 transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <p className="animate-fade-in px-5 pb-5 text-gray-400">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
