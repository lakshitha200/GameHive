import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default function EmptyState({
  icon: Icon,
  title,
  text,
  href,
  cta,
  action,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  href?: string;
  cta?: string;
  action?: ReactNode;
}) {
  return (
    <div className="surface animate-fade-up mx-auto flex max-w-lg flex-col items-center px-6 py-14 text-center">
      <div className="mb-5 flex h-20 w-20 animate-float items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
        <Icon className="h-10 w-10" aria-hidden />
      </div>
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mt-2 text-gray-400">{text}</p>
      {href && cta && (
        <Link href={href} className="btn-primary mt-6">
          {cta}
        </Link>
      )}
      {action}
    </div>
  );
}
