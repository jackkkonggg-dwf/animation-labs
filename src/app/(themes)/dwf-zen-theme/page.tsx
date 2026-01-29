import { Navbar } from '@/app/components/navigation/navbar';
import { DWFZenThemeClient } from './page-client';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DWF Zen Theme | Japanese-Inspired Minimalist Design',
  description: 'A minimalist Japanese-inspired design system for DWF Labs featuring zen aesthetics, cherry blossom particles, elegant data visualizations, and meditative animations.',
};

export default function ZenThemePage() {
  return (
    <main className="min-h-screen bg-[#f5f5f0]">
      <Navbar />
      <DWFZenThemeClient />
    </main>
  );
}
