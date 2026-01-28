/**
 * Stats Section
 *
 * Section 3: Count Up + Scrub Timeline
 * Features:
 * - US-011: Stats count up animation
 * - US-012: Stats scrub timeline and icon transforms
 * - US-013: Circular progress indicators
 */

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface StatsSectionProps {
  prefersReducedMotion: boolean;
}

export function StatsSection({ prefersReducedMotion }: StatsSectionProps) {
  const statsRef = useRef<HTMLDivElement>(null);

  // US-011: Stats count up animation
  useGSAP(() => {
    // US-026: Skip all animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    const stats = statsRef.current;
    if (!stats) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Get all stat value elements with their data-target attributes
    const statValues = stats.querySelectorAll('.stat-value');

    // US-013: Get all stat progress circles for circular animation
    const progressCircles = stats.querySelectorAll('.stat-progress-circle');

    statValues.forEach((statValue, index) => {
      const target = parseInt((statValue as HTMLElement).dataset.target || '0', 10);
      const counterObj = { value: 0 };
      const circle = progressCircles[index] as SVGCircleElement;

      // Count up animation from 0 to target
      gsap.to(counterObj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        snap: { value: 1 }, // Snap to whole integers
        scrollTrigger: {
          trigger: stats,
          start: 'top center',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => {
          // Update the element text with current value
          (statValue as HTMLElement).textContent = Math.round(counterObj.value).toString();
        },
        force3D: true, // GPU acceleration
      });

      // US-013: Animate circular progress indicator
      // Circle circumference = 2 * PI * 56 ≈ 351.86
      const circumference = 351.86;
      if (circle) {
        gsap.to(circle, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          force3D: true, // GPU acceleration
          scrollTrigger: {
            trigger: stats,
            start: 'top center',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    // Collect ScrollTriggers for cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === stats || stats.contains(trigger.trigger as Element)) {
        triggers.push(trigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(statValues);
      gsap.killTweensOf(progressCircles);
    };
  }, { scope: statsRef, dependencies: [prefersReducedMotion] });

  // US-012: Stats scrub timeline and icon transforms
  useGSAP(() => {
    // US-026: Skip all animations if reduced motion is preferred
    if (prefersReducedMotion) return;

    const stats = statsRef.current;
    if (!stats) return;

    // Track all ScrollTriggers for cleanup
    const triggers: ScrollTrigger[] = [];

    // Get all stat icon SVG elements
    const statIcons = stats.querySelectorAll('.stat-icon svg');

    // Create timeline with scrub linked to scroll position
    const iconTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: stats,
        start: 'top center',
        end: 'bottom center',
        scrub: 1, // Smooth catch-up to scroll position
      },
    });

    // Animate icons: scale 1.0 → 1.3, rotation 0deg → 45deg, zinc-700 → orange-500
    iconTimeline.to(statIcons, {
      scale: 1.3,
      rotation: 45,
      color: '#f97316', // orange-500
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out',
      force3D: true, // GPU acceleration
    });

    // Collect ScrollTriggers for cleanup
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.trigger === stats || stats.contains(trigger.trigger as Element)) {
        if (!triggers.includes(trigger)) {
          triggers.push(trigger);
        }
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(statIcons);
    };
  }, { scope: statsRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={statsRef}
      id="stats"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/60 to-zinc-950" />

        {/* Animated glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-500/8 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '14s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/6 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '16s', animationDelay: '4s' }} />

        {/* Tech grid pattern */}
        <div className="absolute inset-0 opacity-8" style={{
          backgroundImage: `
            linear-gradient(rgba(249, 115, 22, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249, 115, 22, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }} />

        {/* Diagonal scan lines */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_35px,rgba(249,115,22,0.03)_35px,rgba(249,115,22,0.03)_70px)]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4" style={{ textShadow: '0 0 40px rgba(249,115,22,0.3)' }}>
            Our <span className="text-orange-500" style={{ textShadow: '0 0 50px rgba(249,115,22,0.5)' }}>Impact</span>
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto">
            With a portfolio of 1000+, we proudly support over 20% of CMC&apos;s Top 100 projects and 35% of CMC&apos;s Top 1000 crypto projects.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Stat 1: 800+ Projects */}
          <div className="stat-item group relative">
            {/* Glow background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 rounded-2xl transition-all duration-500 group-hover:from-orange-500/5 group-hover:to-orange-500/0" />

            <div className="relative text-center p-6 rounded-2xl border border-transparent group-hover:border-orange-500/10 transition-all duration-500">
              {/* Circular progress indicator */}
              <div className="relative inline-flex items-center justify-center mb-6">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <svg className="w-32 h-32 transform -rotate-90 relative z-10">
                  {/* Background circle with glow */}
                  <circle cx="64" cy="64" r="56" fill="none" className="text-zinc-800" strokeWidth="4" />
                  {/* Progress circle with gradient */}
                  <defs>
                    <linearGradient id="progressGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(234, 88, 12)" />
                      <stop offset="100%" stopColor="rgb(249, 115, 22)" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#progressGradient1)"
                    className="stat-progress-circle"
                    strokeWidth="4"
                    strokeDasharray="351.86"
                    strokeDashoffset="351.86"
                    strokeLinecap="round"
                    style={{ willChange: 'stroke-dashoffset, transform', filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.4))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="stat-icon w-12 h-12 bg-zinc-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-zinc-400 border border-zinc-700/50 transition-all duration-500 group-hover:bg-zinc-800 group-hover:scale-110 group-hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.3)]" style={{ willChange: 'transform, color' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div className="stat-counter text-5xl md:text-6xl font-black text-orange-500 mb-2" style={{ textShadow: '0 0 30px rgba(249,115,22,0.4)' }}>
                <span className="stat-value" data-target="800">0</span>+
              </div>
              <p className="text-zinc-400 text-sm uppercase tracking-wider group-hover:text-zinc-300 transition-colors duration-300">Projects in Portfolio</p>
            </div>
          </div>

          {/* Stat 2: 10%+ CMC Top 100 */}
          <div className="stat-item group relative">
            {/* Glow background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 rounded-2xl transition-all duration-500 group-hover:from-orange-500/5 group-hover:to-orange-500/0" />

            <div className="relative text-center p-6 rounded-2xl border border-transparent group-hover:border-orange-500/10 transition-all duration-500">
              {/* Circular progress indicator */}
              <div className="relative inline-flex items-center justify-center mb-6">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <svg className="w-32 h-32 transform -rotate-90 relative z-10">
                  <circle cx="64" cy="64" r="56" fill="none" className="text-zinc-800" strokeWidth="4" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#progressGradient1)"
                    className="stat-progress-circle"
                    strokeWidth="4"
                    strokeDasharray="351.86"
                    strokeDashoffset="351.86"
                    strokeLinecap="round"
                    style={{ willChange: 'stroke-dashoffset, transform', filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.4))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="stat-icon w-12 h-12 bg-zinc-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-zinc-400 border border-zinc-700/50 transition-all duration-500 group-hover:bg-zinc-800 group-hover:scale-110 group-hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.3)]" style={{ willChange: 'transform, color' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div className="stat-counter text-5xl md:text-6xl font-black text-orange-500 mb-2" style={{ textShadow: '0 0 30px rgba(249,115,22,0.4)' }}>
                <span className="stat-value" data-target="10">0</span>%
              </div>
              <p className="text-zinc-400 text-sm uppercase tracking-wider group-hover:text-zinc-300 transition-colors duration-300">CMC Top 100</p>
            </div>
          </div>

          {/* Stat 3: 20%+ CMC Top 1000 */}
          <div className="stat-item group relative">
            {/* Glow background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 rounded-2xl transition-all duration-500 group-hover:from-orange-500/5 group-hover:to-orange-500/0" />

            <div className="relative text-center p-6 rounded-2xl border border-transparent group-hover:border-orange-500/10 transition-all duration-500">
              {/* Circular progress indicator */}
              <div className="relative inline-flex items-center justify-center mb-6">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <svg className="w-32 h-32 transform -rotate-90 relative z-10">
                  <circle cx="64" cy="64" r="56" fill="none" className="text-zinc-800" strokeWidth="4" />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#progressGradient1)"
                    className="stat-progress-circle"
                    strokeWidth="4"
                    strokeDasharray="351.86"
                    strokeDashoffset="351.86"
                    strokeLinecap="round"
                    style={{ willChange: 'stroke-dashoffset, transform', filter: 'drop-shadow(0 0 8px rgba(249,115,22,0.4))' }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="stat-icon w-12 h-12 bg-zinc-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-zinc-400 border border-zinc-700/50 transition-all duration-500 group-hover:bg-zinc-800 group-hover:scale-110 group-hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.3)]" style={{ willChange: 'transform, color' }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Counter */}
              <div className="stat-counter text-5xl md:text-6xl font-black text-orange-500 mb-2" style={{ textShadow: '0 0 30px rgba(249,115,22,0.4)' }}>
                <span className="stat-value" data-target="20">0</span>%
              </div>
              <p className="text-zinc-400 text-sm uppercase tracking-wider group-hover:text-zinc-300 transition-colors duration-300">CMC Top 1000</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
