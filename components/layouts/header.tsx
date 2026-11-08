"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, User, Heart, LogIn } from "lucide-react";
import { useAuth } from "@/lib/providers/auth-provider";
import { useCart } from "@/lib/providers/cart-provider";
import NavLink from "../ui/NavLink";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/games" },
  { name: "Store", href: "/store" },
  { name: "News", href: "/news" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function CartButton({ onClick }: { onClick?: () => void }) {
  const { count, hydrated } = useCart();
  return (
    <NavLink href="/cart" label={`Cart, ${count} items`} onClick={onClick}>
      <span className="relative inline-flex">
        <ShoppingCart size={20} />
        {hydrated && count > 0 && (
          <span
            key={count}
            className="animate-pop absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-500 px-1 text-[10px] font-bold text-white ring-2 ring-neutral-900"
          >
            {count}
          </span>
        )}
      </span>
    </NavLink>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { loading, user } = useAuth();
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${
        scrolled ? "border-neutral-800 bg-neutral-950/85 shadow-lg shadow-black/30" : "border-transparent bg-neutral-950/50"
      }`}
    >
      <div className={`container flex items-center justify-between transition-all duration-300 ${scrolled ? "py-3" : "py-4"}`}>
        <Link href="/" className="font-heading text-2xl font-bold transition-transform hover:scale-105 sm:text-3xl">
          <span className="gradient-text">GameHive</span>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.name}
            </NavLink>
          ))}
          <span className="h-5 w-px bg-neutral-700" aria-hidden />
          {user && (
            <>
              <NavLink href="/account/wishlist" label="Wishlist">
                <Heart size={20} />
              </NavLink>
              <CartButton />
            </>
          )}
          {!loading &&
            (user ? (
              <NavLink href="/account/profile" label="My account">
                <span className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 text-xs font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </span>
              </NavLink>
            ) : (
              <>
                <Link href="/login" className="btn-secondary btn-sm">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary btn-sm">
                  Sign up
                </Link>
              </>
            ))}
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          {user && <CartButton />}
          <button
            className="rounded p-2 transition hover:bg-neutral-800"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-slide-down border-t border-neutral-800 bg-neutral-950/95 md:hidden">
          <nav aria-label="Mobile" className="container flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <NavLink key={l.href} href={l.href} onClick={close} className="rounded-lg px-2 py-3 !text-base hover:bg-white/5">
                {l.name}
              </NavLink>
            ))}
            {user && (
              <NavLink href="/account/wishlist" onClick={close} className="rounded-lg px-2 py-3 !text-base hover:bg-white/5">
                Wishlist
              </NavLink>
            )}
            <div className="mt-3 flex gap-3">
              {!loading &&
                (user ? (
                  <Link href="/account/profile" onClick={close} className="btn-primary btn-sm flex-1">
                    <User size={16} /> My account
                  </Link>
                ) : (
                  <>
                    <Link href="/login" onClick={close} className="btn-secondary btn-sm flex-1">
                      <LogIn size={16} /> Login
                    </Link>
                    <Link href="/signup" onClick={close} className="btn-primary btn-sm flex-1">
                      Sign up
                    </Link>
                  </>
                ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
