"use client";

import Image from "next/image";
import { useState } from "react";
import { Gamepad2 } from "lucide-react";

/** Fills its (relatively positioned) parent. Falls back to a gradient if the remote image fails. */
export default function GameImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 400px",
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-fuchsia-950">
        <Gamepad2 className="h-10 w-10 text-white/30" aria-hidden />
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}
