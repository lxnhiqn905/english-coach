import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "English Coach",
  description: "Practice English with Speech Recognition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0e1a] text-slate-200 antialiased">
        <Navigation />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
