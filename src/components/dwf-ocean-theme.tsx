'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/lib/gsap-config';
import { HeroSection } from '@/components/dwf-ocean-theme/hero-section';
import { ServicesSection } from '@/components/dwf-ocean-theme/services-section';
import { StatsSection } from '@/components/dwf-ocean-theme/stats-section';
import { PortfolioSection } from '@/components/dwf-ocean-theme/portfolio-section';
import { FooterSection } from '@/components/dwf-ocean-theme/footer-section';
import { WaveCursor } from '@/components/dwf-ocean-theme/wave-cursor';

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

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="dwf-ocean-theme relative min-h-screen overflow-x-hidden"
    >
      {/* Global Wave Cursor Effect */}
      <WaveCursor />

      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Stats Section */}
      <StatsSection />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}
