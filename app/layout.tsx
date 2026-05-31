import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/layout/PublicShell";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CosmoLearn — AI/ML Training for Engineering Colleges",
    template: "%s | CosmoLearn",
  },
  description:
    "Industry-aligned AI/ML workshops, FDPs, and bootcamps for BCA, MCA, and BE engineering colleges. Designed by a practitioner — not a textbook author.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://train.cosmoverge.in"
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://train.cosmoverge.in",
    siteName: "CosmoLearn",
    title: "CosmoLearn — AI/ML Training for Engineering Colleges",
    description:
      "Industry-aligned AI/ML workshops, FDPs, and bootcamps for BCA, MCA, and BE engineering colleges.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${jakartaSans.variable} ${inter.variable} antialiased bg-white text-slate-900`}
      >
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
