'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/app/lib/gsap-config';
import { ProfessionalHeroSection } from './hero-section';
import dynamic from 'next/dynamic';

// Lazy load sections below the fold for better initial load performance
const ProfessionalServicesSection = dynamic(
  () => import('./services-section').then(mod => ({ default: mod.ProfessionalServicesSection })),
  {
    loading: () => <div className="h-screen animate-pulse bg-slate-900/50" />,
  }
);

const ProfessionalStatsSection = dynamic(
  () => import('./stats-section').then(mod => ({ default: mod.ProfessionalStatsSection })),
  {
    loading: () => <div className="h-96 animate-pulse bg-slate-800/50" />,
  }
);

const ProfessionalPortfolioSection = dynamic(
  () => import('./portfolio-section').then(mod => ({ default: mod.ProfessionalPortfolioSection })),
  {
    loading: () => <div className="h-screen animate-pulse bg-slate-900/50" />,
  }
);

const ProfessionalFooterSection = dynamic(
  () => import('./footer-section').then(mod => ({ default: mod.ProfessionalFooterSection })),
  {
    loading: () => <div className="h-64 animate-pulse bg-slate-800/50" />,
  }
);

/**
 * DWF Professional Theme - Main Orchestration Component
 * Finance-inspired professional design with trust and sophistication
 *
 * Design Philosophy:
 * - Deep navy blue (#0a192f) for authoritative presence
 * - Gold (#d4af37) accents for premium, trustworthy feel
 * - Slate gray scale for refined, professional neutrals
 * - Playfair Display for elegant, editorial headlines
 * - Inter for clean, readable body text
 * - Subtle data visualization patterns
 * - Minimal, refined animations that don't distract
 */
export function DWFEProfessionalTheme() {
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
      className="dwf-professional-theme relative min-h-screen overflow-x-hidden"
      style={{
        background: '#0a192f',
      }}
    >
      {/* Hero Section - Loaded immediately for above-the-fold content */}
      <ProfessionalHeroSection />

      {/* Lazy-loaded sections below the fold */}
      <ProfessionalServicesSection />
      <ProfessionalStatsSection />
      <ProfessionalPortfolioSection />
      <ProfessionalFooterSection />
    </div>
  );
}
