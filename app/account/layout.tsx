import NavLink from "@/components/ui/NavLink";
import AccountGuard from "@/components/account/account-guard";
import PageHeader from "@/components/ui/PageHeader";
import { ReactNode } from "react";

const tabs = [
  { name: "Profile", href: "/account/profile" },
  { name: "Library", href: "/account/library" },
  { name: "Wishlist", href: "/account/wishlist" },
];

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container py-12">
      <PageHeader title="My Account" />
      <nav aria-label="Account" className="mb-10 flex gap-8 border-b border-white/10 pb-3">
        {tabs.map((tab) => (
          <NavLink key={tab.href} href={tab.href} className="!text-base">
            {tab.name}
          </NavLink>
        ))}
      </nav>
      <AccountGuard>{children}</AccountGuard>
    </div>
  );
}
