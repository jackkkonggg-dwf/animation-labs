/**
 * Services Section
 *
 * Section 2: Multi-Layer Parallax + Staggered Card Reveal
 * Features:
 * - US-006: Multi-layer parallax background
 * - US-009: Staggered card reveal
 * - US-010: Icon animations with color transform
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface ServicesSectionProps {
  prefersReducedMotion: boolean;
}

export function ServicesSection({ prefersReducedMotion }: ServicesSectionProps) {
  const servicesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // US-026: Skip all animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    const services = servicesRef.current;
    if (!services) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // US-006: Multi-layer parallax background
    const layer1 = services.querySelector('.parallax-layer-1');
    const layer2 = services.querySelector('.parallax-layer-2');
    const layer3 = services.querySelector('.parallax-layer-3');
    const layer4 = services.querySelector('.parallax-layer-4');

    // Layer 1: Grid pattern - slowest (speed: 0.2)
    if (layer1) {
      gsap.to(layer1, {
        y: 100,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: services,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Layer 2: Glowing shapes - slow (speed: 0.5)
    if (layer2) {
      gsap.to(layer2, {
        y: 250,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: services,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Layer 3: Data particles - medium (speed: 0.8)
    if (layer3) {
      gsap.to(layer3, {
        y: 400,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: services,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Layer 4: Content - fastest (speed: 1.0)
    if (layer4) {
      gsap.to(layer4, {
        y: 500,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: services,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // US-009: Services staggered card reveal
    const serviceCards = services.querySelectorAll('.service-card');
    gsap.set(serviceCards, { y: 100, opacity: 0, scale: 0.9, force3D: true });

    gsap.to(serviceCards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.2)',
      force3D: true,
      scrollTrigger: {
        trigger: services,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // US-010: Services icon animations with color transform
    const serviceIcons = services.querySelectorAll('.service-icon svg');
    gsap.set(serviceIcons, { color: '#3f3f46' });

    gsap.to(serviceIcons, {
      scale: 1.15,
      rotation: 360,
      color: '#f97316',
      duration: 0.6,
      stagger: 0.15,
      ease: 'back.out(1)',
      force3D: true,
      scrollTrigger: {
        trigger: services,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // Collect ScrollTriggers for cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === services || services.contains(trigger.trigger as Element)) {
        if (!triggers.includes(trigger)) {
          triggers.push(trigger);
        }
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(serviceCards);
      gsap.killTweensOf(serviceIcons);
    };
  }, { scope: servicesRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={servicesRef}
      id="services"
      className="services-section relative min-h-screen flex items-center py-24 px-4 overflow-hidden"
    >
      {/* Multi-layer parallax background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/80 to-zinc-950" />

        {/* Layer 1: Grid pattern - slowest */}
        <div className="parallax-layer-1 absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />

        {/* Layer 2: Glowing geometric shapes */}
        <div className="parallax-layer-2 absolute inset-0" aria-hidden="true">
          {/* Glowing circles */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border-2 border-orange-500/30 opacity-40 shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]" />
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full border-2 border-orange-500/20 opacity-30 shadow-[0_0_30px_-10px_rgba(249,115,22,0.2)]" />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full border-2 border-orange-500/20 opacity-30" />

          {/* Hexagons with glow */}
          <svg className="absolute top-1/3 right-1/4 w-20 h-20 opacity-20 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]" viewBox="0 0 100 100">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="rgba(249,115,22,0.5)" strokeWidth="2" />
          </svg>
          <svg className="absolute bottom-1/4 left-1/3 w-16 h-16 opacity-15 drop-shadow-[0_0_8px_rgba(249,115,22,0.2)]" viewBox="0 0 100 100">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="rgba(249,115,22,0.4)" strokeWidth="2" />
          </svg>

          {/* Animated chart line */}
          <svg className="absolute top-1/2 left-1/4 w-48 h-24 opacity-20" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="servicesChartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(249,115,22,0.3)" />
                <stop offset="100%" stopColor="rgba(249,115,22,0.8)" />
              </linearGradient>
            </defs>
            <polyline points="0,80 40,60 80,70 120,30 160,40 200,10" fill="none" stroke="url(#servicesChartGradient)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="200" cy="10" r="4" fill="rgb(249,115,22)" className="animate-pulse" />
          </svg>

          {/* Scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent h-[20%] animate-[scan_4s_linear_infinite]" />
        </div>

        {/* Layer 3: Enhanced data particles with glow */}
        <div className="parallax-layer-3 absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-50 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-orange-400 rounded-full opacity-40 shadow-[0_0_6px_rgba(251,146,60,0.5)] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-orange-300 rounded-full opacity-40 shadow-[0_0_6px_rgba(253,186,116,0.5)] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-50 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-orange-400 rounded-full opacity-30 shadow-[0_0_6px_rgba(251,146,60,0.4)] animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-orange-300 rounded-full opacity-30 shadow-[0_0_6px_rgba(253,186,116,0.4)] animate-pulse" style={{ animationDelay: '2.5s' }} />
        </div>

        {/* Ambient glow orbs */}
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-orange-600/8 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '3s' }} />

        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Content Layer */}
      <div className="parallax-layer-4 max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4" style={{ textShadow: '0 0 40px rgba(249,115,22,0.3)' }}>
            Adding Real Value as <span className="text-orange-500" style={{ textShadow: '0 0 50px rgba(249,115,22,0.5)' }}>Partners</span>
          </h2>
          <p className="text-zinc-500 text-sm uppercase tracking-[0.15em]">
            Comprehensive crypto solutions
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1: Market Making */}
          <div className="service-card group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 p-8 hover:border-orange-500/50 transition-all duration-300" style={{ willChange: 'transform, opacity' }}>
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-10 group-hover:h-10" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-10 group-hover:h-10" />

            {/* Number badge */}
            <div className="service-number text-6xl font-black text-orange-500/15 mb-4 transition-all duration-300 group-hover:text-orange-500/25">01</div>

            {/* Icon */}
            <div className="service-icon relative w-16 h-16 bg-zinc-800/80 rounded-xl flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-[0_0_30px_-8px_rgba(249,115,22,0.4)]">
              <svg className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-orange-500">Market Making</h3>
            <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
              Empower your project with innovative crypto market making solutions
            </p>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 rounded-lg transition-all duration-500 group-hover:from-orange-500/5 group-hover:to-orange-500/0 pointer-events-none" />
          </div>

          {/* Card 2: OTC Trading */}
          <div className="service-card group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 p-8 hover:border-orange-500/50 transition-all duration-300" style={{ willChange: 'transform, opacity' }}>
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-10 group-hover:h-10" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-10 group-hover:h-10" />

            {/* Number badge */}
            <div className="service-number text-6xl font-black text-orange-500/15 mb-4 transition-all duration-300 group-hover:text-orange-500/25">02</div>

            {/* Icon */}
            <div className="service-icon relative w-16 h-16 bg-zinc-800/80 rounded-xl flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-[0_0_30px_-8px_rgba(249,115,22,0.4)]">
              <svg className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-orange-500">OTC Trading</h3>
            <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
              Tailored OTC crypto trading solutions for the digital asset market
            </p>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 rounded-lg transition-all duration-500 group-hover:from-orange-500/5 group-hover:to-orange-500/0 pointer-events-none" />
          </div>

          {/* Card 3: Ventures */}
          <div className="service-card group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 p-8 hover:border-orange-500/50 transition-all duration-300" style={{ willChange: 'transform, opacity' }}>
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-10 group-hover:h-10" />
            <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-orange-500 transition-all duration-500 ease-out group-hover:w-10 group-hover:h-10" />

            {/* Number badge */}
            <div className="service-number text-6xl font-black text-orange-500/15 mb-4 transition-all duration-300 group-hover:text-orange-500/25">03</div>

            {/* Icon */}
            <div className="service-icon relative w-16 h-16 bg-zinc-800/80 rounded-xl flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-orange-500 group-hover:text-black transition-all duration-500 ease-out group-hover:scale-110 group-hover:shadow-[0_0_30px_-8px_rgba(249,115,22,0.4)]">
              <svg className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3 transition-colors duration-300 group-hover:text-orange-500">Ventures</h3>
            <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
              Backing visionary founders with strategic crypto venture investments
            </p>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 rounded-lg transition-all duration-500 group-hover:from-orange-500/5 group-hover:to-orange-500/0 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Scan line animation keyframes */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}</style>
    </section>
  );
}
