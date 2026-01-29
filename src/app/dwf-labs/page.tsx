/**
 * DWF Labs Page
 *
 * Production-ready DWF Labs website featuring advanced GSAP animation patterns
 * with Animation Labs visual theme (industrial orange-500 + dark zinc-950).
 *
 * Preserves all original DWF content (Web3 investor, market maker, portfolio, news).
 *
 * Page is broken down into section components for better maintainability.
 * All components and data are localized to within the dwf-labs directory.
 */

'use client';

import { useEffect, useState } from 'react';
import { ScrollTrigger } from '@/lib/gsap-config';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { StatsSection } from './components/StatsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { NewsSection } from './components/NewsSection';
import { CtaSection } from './components/CtaSection';
import { setFinalStateIfReducedMotion } from './lib/reduced-motion';

export default function DWFLabsPage() {
  // US-026: Check for reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes in preference
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // CRITICAL: Kill all ScrollTriggers when component unmounts/navigates away
  // This prevents memory leaks and high CPU usage on other pages
  useEffect(() => {
    return () => {
      const allTriggers = ScrollTrigger.getAll();
      allTriggers.forEach((trigger) => {
        trigger.kill(true); // true = also remove scroll listeners
      });

      // Also clear any matchMedia listeners
      ScrollTrigger.clearMatchMedia();

      // Debug logging to verify cleanup (remove in production)
      if (process.env.NODE_ENV === 'development') {
        console.log('[DWF Labs] Cleaned up', allTriggers.length, 'ScrollTriggers');
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 overflow-x-hidden">
      {/* Section 1: Hero - Kinetic Text Reveal + Multi-Layer Parallax */}
      <HeroSection
        prefersReducedMotion={prefersReducedMotion}
        setFinalStateIfReducedMotion={setFinalStateIfReducedMotion}
      />

      {/* Section 2: Services - Pinned Sequence with Animated Cards */}
      <ServicesSection prefersReducedMotion={prefersReducedMotion} />

      {/* Section 3: Stats - Count Up + Scrub Timeline */}
      <StatsSection prefersReducedMotion={prefersReducedMotion} />

      {/* Section 4: Portfolio - Batch Reveal + Infinite Marquee */}
      <PortfolioSection prefersReducedMotion={prefersReducedMotion} />

      {/* Section 5: News - Staggered Reveal + Card Tilt */}
      <NewsSection prefersReducedMotion={prefersReducedMotion} />

      {/* Section 6: CTA/Footer - Draggable Pattern Gallery */}
      <CtaSection prefersReducedMotion={prefersReducedMotion} />
    </main>
  );
}
