import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/lib/providers/auth-provider";
import { CartProvider } from "@/lib/providers/cart-provider";

export const metadata: Metadata = {
  title: "GameHive",
  description: "Modern game marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"></link>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet"></link>
      </head>
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">
              {children}
              <Toaster position="top-center" reverseOrder={false}
                toastOptions={{
                  style: {
                    background: "#1e293b", // custom bg
                    color: "#fff",         // text color
                    padding: "16px",
                    borderRadius: "8px",
                    fontSize: "14px",
                  },
                }}
              />
            </main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
