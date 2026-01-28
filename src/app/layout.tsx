import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { GSAPProvider } from "@/providers/gsap-provider";
import { Navbar } from "@/components/navigation/navbar";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GSAP Animations Showcase",
  description: "Collection of GSAP-powered animation demos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased`}
      >
        <GSAPProvider />
        <Navbar />
        <div className="pt-[72px]">{children}</div>
      </body>
    </html>
  );
}
