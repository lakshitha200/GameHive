import type { Metadata, Viewport } from "next";
import { Orbitron, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/providers/auth-provider";
import { CartProvider } from "@/lib/providers/cart-provider";
import { CollectionProvider } from "@/lib/providers/collection-provider";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const orbitron = Orbitron({ subsets: ["latin"], weight: ["400", "700", "900"], variable: "--font-orbitron", display: "swap" });

export const metadata: Metadata = {
  title: { default: "GameHive | Modern game marketplace", template: "%s | GameHive" },
  description: "Discover, buy and play the best games. Deals, news and a community of gamers in one hive.",
};

export const viewport: Viewport = { themeColor: "#020617" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${orbitron.variable}`}>
      <body className="flex min-h-screen flex-col">
        <AuthProvider>
          <CartProvider>
            <CollectionProvider>
              <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-indigo-600 focus:px-4 focus:py-2">
                Skip to content
              </a>
              <Header />
              <main id="main" className="flex-1">
                {children}
              </main>
              <Footer />
              <Toaster
                position="top-center"
                toastOptions={{
                  duration: 2500,
                  style: { background: "#1e293b", color: "#fff", padding: "12px 16px", borderRadius: "12px", fontSize: "14px", border: "1px solid rgba(255,255,255,.08)" },
                  success: { iconTheme: { primary: "#8b5cf6", secondary: "#fff" } },
                }}
              />
            </CollectionProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
