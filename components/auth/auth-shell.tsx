import Link from "next/link";
import { ReactNode } from "react";

export default function AuthShell({
  title,
  subtitle,
  footer,
  children,
}: {
  title: string;
  subtitle: string;
  footer: { text: string; link: string; href: string };
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-[calc(100vh-4.5rem)] items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-float rounded-full bg-indigo-600/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 animate-float rounded-full bg-pink-600/20 blur-3xl [animation-delay:-3s]" aria-hidden />

      <div className="surface animate-fade-up relative w-full max-w-md p-8 sm:p-10">
        <h1 className="text-center font-heading text-3xl font-bold">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="mt-2 text-center text-gray-400">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-center text-sm text-gray-400">
          {footer.text}{" "}
          <Link href={footer.href} className="font-semibold text-indigo-400 hover:text-indigo-300">
            {footer.link}
          </Link>
        </p>
      </div>
    </div>
  );
}
