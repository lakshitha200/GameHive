"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NavLink = ({
  href,
  children,
  label,
  onClick,
  className = "",
}: {
  href: string;
  children: ReactNode;
  label?: string;
  onClick?: () => void;
  className?: string;
}) => {
  const path = usePathname();
  const isActive = href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={`group relative text-sm font-medium transition-colors hover:text-pink-400 ${
        isActive ? "text-pink-400" : "text-neutral-300"
      } ${className}`}
    >
      {children}
      <span
        className={`absolute -bottom-1.5 left-0 h-0.5 rounded bg-gradient-to-r from-[#6366f1] to-[#ec4899] transition-all duration-300 ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
};

export default NavLink;
