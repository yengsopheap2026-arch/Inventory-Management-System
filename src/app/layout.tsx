import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SP Co., LTD. - Inventory Management System",
  description: "Central Inventory Intelligence and Stock Control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className={`${inter.variable} font-sans h-full bg-slate-50 text-slate-800 antialiased flex flex-col md:flex-row overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
