'use client';

import { useRef, useEffect, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import { HeroSection } from './hero-section';
import { ZEN_COLORS, ANIMATION_CONFIG } from '../_data';
import dynamic from 'next/dynamic';

// Lazy load sections below the fold for performance
const ServicesSection = dynamic(
  () => import('./services-section').then(mod => ({ default: mod.ServicesSection })),
  {
    loading: () => <div className="h-screen bg-[#f5f5f0] flex items-center justify-center" aria-live="polite"><span className="text-[#4a4a4a] text-lg">Loading...</span></div>,
  }
);

const LiveStatsSection = dynamic(
  () => import('./live-stats-section').then(mod => ({ default: mod.LiveStatsSection })),
  {
    loading: () => <div className="h-screen bg-[#f5f5f0] flex items-center justify-center" aria-live="polite"><span className="text-[#4a4a4a] text-lg">Loading...</span></div>,
  }
);

const PortfolioSection = dynamic(
  () => import('./portfolio-section').then(mod => ({ default: mod.PortfolioSection })),
  {
    loading: () => <div className="h-screen bg-[#f5f5f0] flex items-center justify-center" aria-live="polite"><span className="text-[#4a4a4a] text-lg">Loading...</span></div>,
  }
);

const PartnersSection = dynamic(
  () => import('./partners-section').then(mod => ({ default: mod.PartnersSection })),
  {
    loading: () => <div className="h-screen bg-[#f5f5f0] flex items-center justify-center" aria-live="polite"><span className="text-[#4a4a4a] text-lg">Loading...</span></div>,
  }
);

const FooterSection = dynamic(
  () => import('./footer-section').then(mod => ({ default: mod.FooterSection })),
  {
    loading: () => <div className="h-64 bg-[#f5f5f0] flex items-center justify-center" aria-live="polite"><span className="text-[#4a4a4a] text-lg">Loading...</span></div>,
  }
);

/**
 * DWF Zen Theme - Main Orchestration Component
 * Minimalist Japanese-inspired interface with cherry blossom particles and ink drop effects
 */
export function DWFZenTheme() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const prefersReducedMotion = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Ink drop effect on click
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const handleclick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, [data-no-ink]')) return;

      const ripple = document.createElement('div');
      ripple.className = 'ink-drop';
      ripple.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 10px;
        height: 10px;
        background: ${ZEN_COLORS.primaryText};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        opacity: ${ANIMATION_CONFIG.inkDrop.startOpacity};
      `;
      document.body.appendChild(ripple);

      gsap.to(ripple, {
        scale: ANIMATION_CONFIG.inkDrop.maxScale,
        opacity: 0,
        duration: ANIMATION_CONFIG.inkDrop.duration,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      });
    };

    window.addEventListener('click', handleclick);
    return () => window.removeEventListener('click', handleclick);
  }, [prefersReducedMotion]);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Refresh ScrollTrigger after all sections are mounted
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="dwf-zen-theme relative min-h-screen overflow-x-hidden"
      style={{
        backgroundColor: ZEN_COLORS.background,
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Lazy-loaded sections */}
      <ServicesSection />
      <LiveStatsSection />
      <PortfolioSection />
      <PartnersSection />
      <FooterSection />

      {/* Global typography */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .dwf-zen-theme {
          --zen-background: ${ZEN_COLORS.background};
          --zen-primary-text: ${ZEN_COLORS.primaryText};
          --zen-secondary-text: ${ZEN_COLORS.secondaryText};
          --zen-accent: ${ZEN_COLORS.accent};
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduce-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
