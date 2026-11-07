import Link from "next/link";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <Ghost className="mb-4 h-16 w-16 animate-float text-indigo-400" aria-hidden />
      <h1 className="font-heading text-6xl font-black gradient-text">404</h1>
      <p className="mt-4 text-xl text-white">Game over. This page doesn&apos;t exist.</p>
      <p className="mt-2 text-gray-400">It may have been moved, or the link is wrong.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">Back home</Link>
        <Link href="/games" className="btn-secondary">Browse games</Link>
      </div>
    </div>
  );
}
