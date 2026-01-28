'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from '@/lib/gsap-config';
import { BrutalistHeroSection } from './hero-section';
import dynamic from 'next/dynamic';

// Lazy load sections below the fold for better performance
const ServicesSection = dynamic(
  () => import('./services-section').then(mod => ({ default: mod.ServicesSection })),
  {
    loading: () => (
      <div className="w-full py-32 flex items-center justify-center" style={{ background: '#050505' }}>
        <div className="text-center">
          <div
            className="w-16 h-16 mx-auto mb-4 border-4 animate-spin"
            style={{
              borderColor: '#ccff00 transparent',
              borderStyle: 'solid',
            }}
          />
          <p style={{
            color: '#f0f0f0',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            LOADING_SERVICES...
          </p>
        </div>
      </div>
    ),
  }
);

const LiveStatsSection = dynamic(
  () => import('./live-stats-section').then(mod => ({ default: mod.LiveStatsSection })),
  {
    loading: () => (
      <div className="w-full py-32 flex items-center justify-center" style={{ background: '#050505' }}>
        <div className="text-center">
          <div
            className="w-16 h-16 mx-auto mb-4 border-4 animate-spin"
            style={{
              borderColor: '#ccff00 transparent',
              borderStyle: 'solid',
            }}
          />
          <p style={{
            color: '#f0f0f0',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            LOADING_STATS...
          </p>
        </div>
      </div>
    ),
  }
);

const PortfolioSection = dynamic(
  () => import('./portfolio-section').then(mod => ({ default: mod.PortfolioSection })),
  {
    loading: () => (
      <div className="w-full py-32 flex items-center justify-center" style={{ background: '#050505' }}>
        <div className="text-center">
          <div
            className="w-16 h-16 mx-auto mb-4 border-4 animate-spin"
            style={{
              borderColor: '#ccff00 transparent',
              borderStyle: 'solid',
            }}
          />
          <p style={{
            color: '#f0f0f0',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            LOADING_PORTFOLIO...
          </p>
        </div>
      </div>
    ),
  }
);

const PartnersSection = dynamic(
  () => import('./partners-section').then(mod => ({ default: mod.PartnersSection })),
  {
    loading: () => (
      <div className="w-full py-32 flex items-center justify-center" style={{ background: '#050505' }}>
        <div className="text-center">
          <div
            className="w-16 h-16 mx-auto mb-4 border-4 animate-spin"
            style={{
              borderColor: '#ccff00 transparent',
              borderStyle: 'solid',
            }}
          />
          <p style={{
            color: '#f0f0f0',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            LOADING_PARTNERS...
          </p>
        </div>
      </div>
    ),
  }
);

const FooterSection = dynamic(
  () => import('./footer-section').then(mod => ({ default: mod.FooterSection })),
  {
    loading: () => (
      <div className="w-full py-16 flex items-center justify-center" style={{ background: '#050505' }}>
        <div className="text-center">
          <div
            className="w-12 h-12 mx-auto mb-3 border-4 animate-spin"
            style={{
              borderColor: '#ccff00 transparent',
              borderStyle: 'solid',
            }}
          />
          <p style={{
            color: '#f0f0f0',
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            LOADING_FOOTER...
          </p>
        </div>
      </div>
    ),
  }
);

/**
 * DWF Labs Brutalist Theme - Main Orchestration Component
 * Enhanced with 6 sections representing actual DWF Labs business:
 * 1. Hero - Brand positioning as crypto market maker & VC
 * 2. Services - Market Making, OTC, VC, Liquidity Services
 * 3. Live Stats - Real-time trading metrics
 * 4. Portfolio - VC investments with breakdown
 * 5. Partners - Exchange and protocol partnerships
 * 6. Footer - Contact, social links, and legal
 *
 * Design: Neo-brutalist with Oswald + JetBrains Mono, acid green accents
 */
export function DWFCBrutalistTheme() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Refresh ScrollTrigger after all sections are mounted
    ScrollTrigger.refresh();
  }, []);

  return (
    <div
      ref={containerRef}
      className="dwf-brutalist-theme relative w-full"
      style={{
        background: '#050505',
      }}
    >
      {/* Hero Section - Loaded immediately */}
      <BrutalistHeroSection />

      {/* Services Section - Lazy loaded */}
      <ServicesSection />

      {/* Live Stats Section - Lazy loaded */}
      <LiveStatsSection />

      {/* Portfolio Section - Lazy loaded */}
      <PortfolioSection />

      {/* Partners Section - Lazy loaded */}
      <PartnersSection />

      {/* Footer Section - Lazy loaded */}
      <FooterSection />
    </div>
  );
}
