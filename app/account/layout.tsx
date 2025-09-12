import NavLink from "@/components/ui/NavLink";
import Link from "next/link";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  const tabs = [
    { name: "Profile", href: "/account/profile" },
    { name: "Library", href: "/account/library" },
    { name: "Wishlist", href: "/account/wishlist" },
  ];

  return (
    <main className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Account</h1>

      <nav className="flex gap-4 mb-12 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <NavLink key={tab.href} href={tab.href}>{tab.name}</NavLink>
          
  
        ))}
      </nav>

      {children}
    </main>
  );
}
