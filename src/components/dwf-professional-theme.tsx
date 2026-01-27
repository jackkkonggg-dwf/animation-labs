'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/lib/gsap-config';
import { ProfessionalHeroSection } from '@/components/dwf-professional-theme/hero-section';
import { ProfessionalServicesSection } from '@/components/dwf-professional-theme/services-section';
import { ProfessionalStatsSection } from '@/components/dwf-professional-theme/stats-section';
import { ProfessionalPortfolioSection } from '@/components/dwf-professional-theme/portfolio-section';
import { ProfessionalFooterSection } from '@/components/dwf-professional-theme/footer-section';

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

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="dwf-professional-theme relative min-h-screen overflow-x-hidden"
      style={{
        background: '#0a192f',
      }}
    >
      {/* Hero Section */}
      <ProfessionalHeroSection />

      {/* Services Section */}
      <ProfessionalServicesSection />

      {/* Stats Section */}
      <ProfessionalStatsSection />

      {/* Portfolio Section */}
      <ProfessionalPortfolioSection />

      {/* Footer Section */}
      <ProfessionalFooterSection />
    </div>
  );
}
