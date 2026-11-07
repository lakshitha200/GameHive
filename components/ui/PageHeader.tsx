import { ReactNode } from "react";

export default function PageHeader({
  title,
  subtitle,
  children,
  center = false,
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`animate-fade-up mb-10 ${center ? "text-center" : ""}`}>
      <h1 className="font-heading text-3xl font-bold text-white md:text-4xl">
        <span className="gradient-text">{title}</span>
      </h1>
      {subtitle && <p className={`mt-3 max-w-2xl text-gray-400 ${center ? "mx-auto" : ""}`}>{subtitle}</p>}
      {children}
    </div>
  );
}
