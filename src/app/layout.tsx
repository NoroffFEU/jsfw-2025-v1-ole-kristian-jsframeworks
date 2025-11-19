import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./cart-provider";
import CartCount from "@/components/cart-count";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Shop",
  description: "JS Frameworks Course Assignment",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}>
        <CartProvider>
          <header className="sticky top-0 z-50">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
              <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-4">
                <Link href="/" className="font-extrabold text-2xl tracking-tight">
                  Noroff Shop
                </Link>

                <div className="hidden sm:block text-sm opacity-90">
                  Quality products
                </div>

                <nav className="ml-auto flex items-center gap-4">
                  <Link
                    href="/contact"
                    className="px-3 py-2 rounded hover:bg-white/10 transition text-sm"
                  >
                    Contact
                  </Link>

                  <Link
                    href="/cart"
                    className="inline-flex items-center gap-2 rounded px-3 py-2 hover:bg-white/10 transition text-sm"
                    aria-label="View cart"
                  >
                    Cart
                    <CartCount />
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-6 min-h-screen">
            {children}
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              
              duration: 3000,
              style: {
                zIndex: 99999, 
                borderRadius: 8,
                padding: "10px 14px",
                fontWeight: 600,
              },
              success: {
                duration: 3000,
              },
              error: {
                duration: 4000,
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}

