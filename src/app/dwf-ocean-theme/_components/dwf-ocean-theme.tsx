'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/lib/gsap-config';
import { HeroSection } from './hero-section';
import dynamic from 'next/dynamic';

// Lazy load sections below the fold for better initial load performance
const ServicesSection = dynamic(
  () => import('./services-section').then(mod => ({ default: mod.ServicesSection })),
  {
    loading: () => <div className="h-screen animate-pulse bg-cyan-950/50" />,
  }
);

const StatsSection = dynamic(
  () => import('./stats-section').then(mod => ({ default: mod.StatsSection })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-800/50" />,
  }
);

const PortfolioSection = dynamic(
  () => import('./portfolio-section').then(mod => ({ default: mod.PortfolioSection })),
  {
    loading: () => <div className="h-screen animate-pulse bg-blue-950/50" />,
  }
);

const FooterSection = dynamic(
  () => import('./footer-section').then(mod => ({ default: mod.FooterSection })),
  {
    loading: () => <div className="h-64 animate-pulse bg-cyan-900/50" />,
  }
);

const WaveCursor = dynamic(
  () => import('./wave-cursor').then(mod => ({ default: mod.WaveCursor })),
  {
    ssr: false,
  }
);

/**
 * DWF Ocean Theme - Main Orchestration Component
 * DWF = Digital Wave Finance
 *
 * Showcases extensive GSAP wave-themed animations including:
 * - Sine wave text reveals
 * - Wave SVG backgrounds with MotionPathPlugin
 * - Wave hover ripple effects
 * - Oscillating counter animations
 * - Wave wipe image reveals
 * - Cursor trail wave effects
 */
export function DWFOceanTheme() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Refresh ScrollTrigger after all sections are mounted
    ScrollTrigger.refresh();

    // Note: Each section handles its own ScrollTrigger cleanup
    // We don't need to kill triggers here as that would affect other pages
  }, []);

  return (
    <div
      ref={containerRef}
      className="dwf-ocean-theme relative min-h-screen overflow-x-hidden"
    >
      {/* Global Wave Cursor Effect */}
      <WaveCursor />

      {/* Hero Section - Loaded immediately for above-the-fold content */}
      <HeroSection />

      {/* Lazy-loaded sections below the fold */}
      <ServicesSection />
      <StatsSection />
      <PortfolioSection />
      <FooterSection />
    </div>
  );
}
