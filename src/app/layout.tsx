import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { GSAPProvider } from "@/providers/gsap-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GSAP Animations Showcase",
  description: "Horizontal scroll animation with neon aesthetic",
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
        {children}
      </body>
    </html>
  );
}
