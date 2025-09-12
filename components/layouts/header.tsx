"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { useAuth } from "@/lib/providers/auth-provider";
import NavLink from "../ui/NavLink";
import { link } from "fs";
import { useCart } from "@/lib/providers/cart-provider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Games", href: "/games" },
  { name: "Store", href: "/store" },
  { name: "News", href: "/news" },
  { name: "About", href: "/about" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { loading, user } = useAuth();
  const { cart } = useCart();



  return (
    <header className="sticky top-0 z-50 bg-neutral-900/70 backdrop-blur-md border-b border-neutral-800">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#ec4899]">
          GameHive
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.name}</NavLink>
          ))}
          {!loading &&
            <>
              {user ? (
                <>
                  <NavLink href="/cart">
                    <div className="relative">
                      <ShoppingCart size={20} />
                      <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-pink-400 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">
                        {cart.length}
                      </div>
                    </div>
                  </NavLink>
                  <NavLink href="/account/profile"><User size={20} /></NavLink>
                </>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 rounded text-white border-2 border-purple-400 hover:bg-purple-400 transition">
                    Login
                  </Link>
                  <Link href="/signup" className="px-4 py-2 rounded bg-purple-400 text-white hover:bg-purple-600 transition">
                    Signup
                  </Link>
                </>
              )}
            </>

          }

        </nav>

        {/* Mobile Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-neutral-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden bg-neutral-900 border-t border-neutral-800">
          <nav className="flex flex-col p-4 gap-3">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href}>{link.name}</NavLink>
            ))}
            <div className="flex gap-4 mt-4">
              {!loading &&
                <>
                  {user ? (
                    <>
                      <NavLink href="/cart">
                        <div className="relative">
                          <ShoppingCart size={20} />
                          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-pink-400 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">
                            {cart.length}
                          </div>
                        </div>
                      </NavLink>
                      <NavLink href="/account/profile"><User size={20} /></NavLink>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition">
                        Login
                      </Link>
                      <Link href="/signup" className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600 transition">
                        Signup
                      </Link>
                    </>
                  )}
                </>

              }
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
