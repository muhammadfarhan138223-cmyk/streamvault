import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import MobileNav from '@/components/MobileNav';

const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "StreamVault",
  description: "Browse trending, popular, and top-rated movies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-void text-parchment antialiased min-h-screen flex flex-col justify-between pb-16 md:pb-0">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <MobileNav />
        <Footer />
      </body>
    </html>
  );
}
