/**
 * Portfolio Section
 *
 * Section 4: Staggered Reveal
 * Features:
 * - US-014: Portfolio cards animate in when section enters viewport
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PortfolioLogo } from './PortfolioLogo';
import { portfolioCompanies } from '../lib/portfolio-logos';

interface PortfolioSectionProps {
  prefersReducedMotion: boolean;
}

export function PortfolioSection({ prefersReducedMotion }: PortfolioSectionProps) {
  const portfolioRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // US-026: Skip all animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    const portfolio = portfolioRef.current;
    if (!portfolio) return;

    // Get all portfolio cards
    const portfolioCards = portfolio.querySelectorAll('.portfolio-card');

    // Set initial state - cards hidden and offset
    gsap.set(portfolioCards, { y: 60, opacity: 0, scale: 0.95, force3D: true });

    // Animate cards in when section enters viewport
    gsap.to(portfolioCards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.2)',
      force3D: true,
      scrollTrigger: {
        trigger: portfolio,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      gsap.killTweensOf(portfolioCards);
    };
  }, { scope: portfolioRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={portfolioRef}
      id="portfolio"
      className="relative py-24 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            <span className="text-orange-500">Portfolio</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto">
            With a portfolio of 1000+, we proudly support over 20% of CMC&apos;s Top 100 projects and 35% of CMC&apos;s Top 1000 crypto projects.
          </p>
        </div>

        {/* Portfolio Grid - 1 col mobile, 2 col tablet, 3 col desktop, 5 col wide */}
        <div className="portfolio-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {portfolioCompanies.map((item) => (
            <div
              key={item.name}
              className="portfolio-card group relative aspect-square bg-zinc-900 border border-zinc-800 p-4 flex flex-col items-center justify-center hover:border-orange-500 hover:scale-105 transition-all duration-200 cursor-pointer"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Corner accent */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

              {/* Number badge */}
              <div className="absolute top-3 right-3 text-xs font-mono text-orange-500/40">{item.num}</div>

              {/* Logo - grayscale to orange-500 on hover */}
              <div className="relative w-16 h-16 bg-zinc-800 rounded-lg flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-200">
                <PortfolioLogo id={item.id} name={item.name} className="w-12 h-12" />
              </div>

              {/* Name */}
              <span className="mt-3 text-sm font-medium text-zinc-400 group-hover:text-white transition-colors duration-200">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
