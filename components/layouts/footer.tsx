import Link from "next/link";
import { Facebook, Instagram, MessageCircle, Twitter } from "lucide-react";

const columns = [
  {
    title: "Explore",
    links: [
      { name: "All Games", href: "/games" },
      { name: "Store", href: "/store" },
      { name: "Latest News", href: "/news" },
      { name: "Wishlist", href: "/account/wishlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/about#faq" },
      { name: "My Account", href: "/account/profile" },
    ],
  },
];

const socials = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: MessageCircle, label: "Discord" },
  { icon: Instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-white/5 bg-surface">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="font-heading text-3xl font-bold gradient-text">GameHive</span>
            <p className="mt-4 max-w-sm text-gray-400">The ultimate platform for gamers to discover, play, and connect.</p>
            <div className="mt-6 flex gap-3">
              {socials.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gray-400 transition duration-200 hover:-translate-y-1 hover:text-[#ec4899]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="mb-4 font-heading text-lg font-bold">{c.title}</h3>
              <ul className="space-y-2">
                {c.links.map((l) => (
                  <li key={l.name}>
                    <Link href={l.href} className="text-gray-400 transition-colors hover:text-[#ec4899]">
                      {l.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} GameHive. All rights reserved. All trademarks are property of their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}
