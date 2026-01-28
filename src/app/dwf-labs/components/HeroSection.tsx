/**
 * Hero Section
 *
 * Section 1: Kinetic Text Reveal + Multi-Layer Parallax
 * Features:
 * - US-004: Character reveal animation
 * - US-005: Word reveal animation
 * - US-006: Multi-layer parallax background
 * - US-007: SVG corner accents drawing animation
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface HeroSectionProps {
  prefersReducedMotion: boolean;
  setFinalStateIfReducedMotion: () => boolean;
}

export function HeroSection({ prefersReducedMotion, setFinalStateIfReducedMotion }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // US-026: Skip all animations if reduced motion is preferred
    if (setFinalStateIfReducedMotion()) return;

    const hero = heroRef.current;
    if (!hero) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // US-004: Hero character text reveal animation
    const titleChars = hero.querySelectorAll('.hero-title span');
    gsap.set(titleChars, { y: 100, opacity: 0, rotation: -5, force3D: true });

    gsap.to(titleChars, {
      y: 0,
      opacity: 1,
      rotation: 0,
      duration: 0.8,
      stagger: 0.03,
      ease: 'back.out(1.7)',
      delay: 0.2,
      force3D: true, // GPU acceleration
    });

    // US-005: Hero tagline word reveal animation
    const taglineWords = hero.querySelectorAll('.hero-tagline span');
    gsap.set(taglineWords, { y: 50, opacity: 0, force3D: true });

    gsap.to(taglineWords, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.3, // Delay after character reveal
      force3D: true, // GPU acceleration
    });

    // US-006: Hero multi-layer parallax background
    const layer1 = hero.querySelector('.parallax-layer-1');
    const layer2 = hero.querySelector('.parallax-layer-2');
    const layer3 = hero.querySelector('.parallax-layer-3');
    const layer4 = hero.querySelector('.parallax-layer-4');

    // Layer 1: Grid pattern - slowest (speed: 0.2)
    if (layer1) {
      gsap.to(layer1, {
        y: 100,
        ease: 'none',
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Layer 2: Crypto symbols (circles, hexagons, lines) - slow (speed: 0.5)
    if (layer2) {
      gsap.to(layer2, {
        y: 250,
        ease: 'none',
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: hero,
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
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Layer 4: Text/content - fastest (speed: 1.0)
    if (layer4) {
      gsap.to(layer4, {
        y: 500,
        ease: 'none',
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // US-007: Hero SVG corner accents drawing animation
    const cornerPaths = hero.querySelectorAll('.corner-draw-path');
    cornerPaths.forEach((path) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    gsap.to(cornerPaths, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.out',
      delay: 0.5,
      force3D: true, // GPU acceleration
    });

    // Collect ScrollTriggers for cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === hero || hero.contains(trigger.trigger as Element)) {
        triggers.push(trigger);
      }
    });

    return () => {
      gsap.killTweensOf(titleChars);
      gsap.killTweensOf(taglineWords);
      gsap.killTweensOf(cornerPaths);
      triggers.forEach((t) => t.kill());
    };
  }, { scope: heroRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base gradient mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />

        {/* Animated orange gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-[128px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '4s' }} />

        {/* Radial gradient vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba_9,9,11,0.8)_100%)]" />

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />

        {/* Grid pattern overlay */}
        <div className="parallax-layer-1 absolute inset-0 opacity-20" style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />

        {/* Floating Geometric Shapes */}
        <div className="parallax-layer-2 absolute inset-0" aria-hidden="true">
          {/* Glowing circles representing coins */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-orange-500/30 opacity-40 shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]" />
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full border border-orange-500/20 opacity-30 shadow-[0_0_30px_-10px_rgba(249,115,22,0.2)]" />
          <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full border border-orange-500/20 opacity-30" />

          {/* Hexagons representing blocks with glow */}
          <svg className="absolute top-1/3 right-1/4 w-20 h-20 opacity-20 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]" viewBox="0 0 100 100">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="rgba(249,115,22,0.5)" strokeWidth="2" />
          </svg>
          <svg className="absolute bottom-1/4 left-1/3 w-16 h-16 opacity-15 drop-shadow-[0_0_8px_rgba(249,115,22,0.2)]" viewBox="0 0 100 100">
            <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" fill="none" stroke="rgba(249,115,22,0.4)" strokeWidth="2" />
          </svg>

          {/* Animated chart line */}
          <svg className="absolute top-1/2 left-1/4 w-48 h-24 opacity-20" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(249,115,22,0.3)" />
                <stop offset="100%" stopColor="rgba(249,115,22,0.8)" />
              </linearGradient>
            </defs>
            <polyline points="0,80 40,60 80,70 120,30 160,40 200,10" fill="none" stroke="url(#chartGradient)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="200" cy="10" r="4" fill="rgb(249,115,22)" className="animate-pulse" />
          </svg>

          {/* Scan line effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent h-[20%] animate-[scan_4s_linear_infinite]" />
        </div>

        {/* Layer 3: Enhanced Data Particles with glow */}
        <div className="parallax-layer-3 absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-50 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" />
          <div className="absolute top-1/3 left-1/3 w-1 h-1 bg-orange-400 rounded-full opacity-40 shadow-[0_0_6px_rgba(251,146,60,0.5)] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-orange-300 rounded-full opacity-40 shadow-[0_0_6px_rgba(253,186,116,0.5)] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full opacity-50 shadow-[0_0_8px_rgba(249,115,22,0.6)] animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-orange-400 rounded-full opacity-30 shadow-[0_0_6px_rgba(251,146,60,0.4)] animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-orange-300 rounded-full opacity-30 shadow-[0_0_6px_rgba(253,186,116,0.4)] animate-pulse" style={{ animationDelay: '2.5s' }} />
        </div>
      </div>

      {/* Content Layer */}
      <div className="parallax-layer-4 relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Character reveal: DWF LABS */}
        <h1 className="hero-title text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter uppercase mb-6" style={{ textShadow: '0 0 80px rgba(249,115,22,0.3)' }}>
          <span className="inline-block" style={{ willChange: 'transform, opacity' }}>D</span>
          <span className="inline-block" style={{ willChange: 'transform, opacity' }}>W</span>
          <span className="inline-block" style={{ willChange: 'transform, opacity' }}>F</span>
          <span className="inline-block" style={{ willChange: 'transform, opacity' }}>&nbsp;</span>
          <span className="inline-block text-orange-500" style={{ textShadow: '0 0 60px rgba(249,115,22,0.5), 0 0 100px rgba(249,115,22,0.3)', willChange: 'transform, opacity' }}>L</span>
          <span className="inline-block text-orange-500" style={{ textShadow: '0 0 60px rgba(249,115,22,0.5), 0 0 100px rgba(249,115,22,0.3)', willChange: 'transform, opacity' }}>A</span>
          <span className="inline-block text-orange-500" style={{ textShadow: '0 0 60px rgba(249,115,22,0.5), 0 0 100px rgba(249,115,22,0.3)', willChange: 'transform, opacity' }}>B</span>
          <span className="inline-block text-orange-500" style={{ textShadow: '0 0 60px rgba(249,115,22,0.5), 0 0 100px rgba(249,115,22,0.3)', willChange: 'transform, opacity' }}>S</span>
        </h1>

        {/* Word reveal: Tagline */}
        <p className="hero-tagline text-lg md:text-xl lg:text-2xl text-zinc-400 uppercase tracking-[0.2em] mb-4">
          <span className="inline-block mr-3" style={{ willChange: 'transform, opacity' }}>New</span>
          <span className="inline-block mr-3" style={{ willChange: 'transform, opacity' }}>Generation</span>
          <span className="inline-block mr-3" style={{ willChange: 'transform, opacity' }}>Web3</span>
          <span className="inline-block mr-3" style={{ willChange: 'transform, opacity' }}>Investor</span>
          <span className="inline-block mr-3" style={{ willChange: 'transform, opacity' }}>&</span>
          <span className="inline-block mr-3" style={{ willChange: 'transform, opacity' }}>Market</span>
          <span className="inline-block" style={{ willChange: 'transform, opacity' }}>Maker</span>
        </p>

        {/* Description */}
        <p className="hero-description text-sm md:text-base text-zinc-500 max-w-2xl mx-auto">
          One of the world&apos;s largest high-frequency cryptocurrency trading entities
        </p>

        {/* SVG Corner Accents - smaller on mobile */}
        <svg className="absolute top-4 left-4 w-10 h-10 sm:top-8 sm:left-8 sm:w-16 sm:h-16 text-orange-500 opacity-60 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" viewBox="0 0 60 60">
          <path className="corner-draw-path" style={{ willChange: 'stroke-dashoffset' }} d="M5,5 L55,5 L55,55" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="absolute top-4 right-4 w-10 h-10 sm:top-8 sm:right-8 sm:w-16 sm:h-16 text-orange-500 opacity-60 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" viewBox="0 0 60 60">
          <path className="corner-draw-path" style={{ willChange: 'stroke-dashoffset' }} d="M55,5 L5,5 L5,55" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="absolute bottom-4 left-4 w-10 h-10 sm:bottom-8 sm:left-8 sm:w-16 sm:h-16 text-orange-500 opacity-60 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" viewBox="0 0 60 60">
          <path className="corner-draw-path" style={{ willChange: 'stroke-dashoffset' }} d="M5,55 L55,55 L55,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg className="absolute bottom-4 right-4 w-10 h-10 sm:bottom-8 sm:right-8 sm:w-16 sm:h-16 text-orange-500 opacity-60 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" viewBox="0 0 60 60">
          <path className="corner-draw-path" style={{ willChange: 'stroke-dashoffset' }} d="M55,55 L5,55 L5,5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
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
