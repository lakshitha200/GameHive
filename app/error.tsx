"use client";

import { TriangleAlert } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <TriangleAlert className="mb-4 h-14 w-14 text-amber-400" aria-hidden />
      <h1 className="text-2xl font-bold text-white">Something went wrong</h1>
      <p className="mt-2 text-gray-400">An unexpected error occurred. Please try again.</p>
      <button onClick={reset} className="btn-primary mt-6">Try again</button>
    </div>
  );
}
