import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Playfair_Display, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { GSAPProvider } from '@/app/providers/gsap-provider';
import { NavigationProvider } from '@/app/providers/navigation-provider';
import { Navbar } from '@/app/components/navigation/navbar';
import { MobileMenu } from '@/app/components/navigation/mobile-menu';

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GSAP Animations Showcase",
  description: "Collection of GSAP-powered animation demos",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${inter.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable}`}
    >
      <body className={`${geistMono.variable} antialiased`}>
        <GSAPProvider />
        <NavigationProvider>
          <Navbar />
          <MobileMenu />
          <div className="relative mt-[72px]">{children}</div>
        </NavigationProvider>
      </body>
    </html>
  );
}
