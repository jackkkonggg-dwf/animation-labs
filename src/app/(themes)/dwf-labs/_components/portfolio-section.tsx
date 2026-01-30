/**
 * Portfolio Section
 *
 * Section 4: Staggered Reveal with Premium Hover Effects
 * Features:
 * - US-014: Portfolio cards animate in when section enters viewport
 * - Premium multi-stage hover reveal with corner expansion, glow, and content slide
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PortfolioLogo } from './portfolio-logo';
import { portfolioCompanies } from '../_lib/portfolio-logos';

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
    gsap.set(portfolioCards, { y: 60, opacity: 0, scale: 0.95 });

    // Animate cards in when section enters viewport
    gsap.to(portfolioCards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: portfolio,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // Cleanup is automatic with useGSAP
  }, { scope: portfolioRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={portfolioRef}
      id="portfolio"
      className="relative py-24 px-4 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(249, 115, 22, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(249, 115, 22, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4" style={{ textShadow: '0 0 40px rgba(249,115,22,0.3)' }}>
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
              className="portfolio-card group relative aspect-square bg-zinc-900/80 backdrop-blur-sm p-4 flex flex-col items-center justify-center cursor-pointer overflow-hidden"
            >
              {/* Expanding border effect on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/50 transition-all duration-500 ease-out" />

              {/* Corner accents that expand on hover */}
              <div className="corner-accent absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-8 group-hover:h-8" />
              <div className="corner-accent absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-orange-500 transition-all duration-500 ease-out delay-75 group-hover:w-8 group-hover:h-8" />
              <div className="corner-accent absolute bottom-0 left-0 w-0 h-0 border-b-2 border-l-2 border-orange-500 transition-all duration-500 ease-out delay-75 group-hover:w-8 group-hover:h-8" />
              <div className="corner-accent absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-8 group-hover:h-8" />

              {/* Glowing background on hover */}
              <div className="glow-bg absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:via-orange-500/5 group-hover:to-orange-500/10 transition-all duration-500 ease-out" />

              {/* Number badge */}
              <div className="absolute top-3 right-3 text-xs font-mono text-orange-500/30 group-hover:text-orange-500/60 transition-colors duration-300">
                {String(item.num).padStart(2, '0')}
              </div>

              {/* Logo container with reveal effect */}
              <div className="relative w-20 h-20 bg-zinc-800/80 rounded-xl flex items-center justify-center mb-4 transition-all duration-500 ease-out group-hover:bg-zinc-800 group-hover:scale-110 group-hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]">
                {/* Scanning line effect on hover */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="scan-line absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/20 to-transparent h-full w-full -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out" />
                </div>

                {/* Logo with grayscale to color transition */}
                <div className="relative z-10 grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105">
                  <PortfolioLogo id={item.id} name={item.name} className="w-14 h-14" />
                </div>

                {/* Glow ring on hover */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-500/30 transition-all duration-500 ease-out" />
              </div>

              {/* Name with slide reveal effect */}
              <div className="relative overflow-hidden z-10">
                <span className="relative z-10 block text-sm font-medium text-zinc-500 group-hover:text-white transition-colors duration-300 transform translate-y-0 group-hover:-translate-y-1">
                  {item.name}
                </span>
                {/* Underline reveal */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400 group-hover:w-full transition-all duration-500 ease-out delay-100" />
              </div>

              {/* Particle sparkles on hover */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="sparkle absolute top-2 left-2 w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                <div className="sparkle absolute top-2 right-2 w-1 h-1 bg-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150" />
                <div className="sparkle absolute bottom-8 left-3 w-1 h-1 bg-orange-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200" />
                <div className="sparkle absolute bottom-8 right-3 w-1 h-1 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-250" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for additional effects */}
      <style>{`
        .portfolio-card {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
        }

        .portfolio-card:hover {
          box-shadow: 0 20px 40px -10px rgba(249, 115, 22, 0.2), 0 0 30px -5px rgba(249, 115, 22, 0.1);
          transform: translateY(-4px);
        }

        .portfolio-card .scan-line {
          animation: none;
        }

        .portfolio-card:hover .scan-line {
          animation: scan-card 1.5s ease-in-out;
        }

        @keyframes scan-card {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        .portfolio-card:hover .sparkle {
          animation: sparkle-fade 0.6s ease-in-out infinite alternate;
        }

        @keyframes sparkle-fade {
          0% { opacity: 0.5; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}
