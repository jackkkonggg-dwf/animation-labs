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

import { useSyncExternalStore } from 'react';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { StatsSection } from './components/StatsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { NewsSection } from './components/NewsSection';
import { CtaSection } from './components/CtaSection';
import { setFinalStateIfReducedMotion } from './lib/reduced-motion';

function subscribePrefersReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  mediaQuery.addEventListener('change', onStoreChange);
  return () => mediaQuery.removeEventListener('change', onStoreChange);
}

function getPrefersReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function DWFLabsPage() {
  // US-026: Check for reduced motion preference
  const prefersReducedMotion = useSyncExternalStore(
    subscribePrefersReducedMotion,
    getPrefersReducedMotionSnapshot,
    () => false,
  );

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
