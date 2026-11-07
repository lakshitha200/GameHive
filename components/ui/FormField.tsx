"use client";

import { AlertCircle, LucideIcon } from "lucide-react";
import { InputHTMLAttributes, ReactNode, useId } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: LucideIcon;
  error?: string;
  hint?: ReactNode;
  right?: ReactNode;
};

/** Labelled input with icon + animated, accessible error message. */
export default function FormField({ label, icon: Icon, error, hint, right, className = "", ...rest }: Props) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className={`relative ${error ? "animate-shake" : ""}`} key={error ? "err" : "ok"}>
        {Icon && <Icon className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-gray-500" aria-hidden />}
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`field ${Icon ? "" : "!pl-3"} ${right ? "pr-11" : ""} ${className}`}
          {...rest}
        />
        {right && <div className="absolute right-2 top-1.5">{right}</div>}
      </div>
      {error ? (
        <p id={`${id}-err`} role="alert" className="field-error">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden /> {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
      )}
    </div>
  );
}
