/**
 * Services Section
 *
 * Section 2: Pinned Sequence with Animated Cards
 * Features:
 * - US-008: Pinned section with progress bar
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

    // US-009: Services staggered card reveal
    const serviceCards = services.querySelectorAll('.service-card');
    gsap.set(serviceCards, { y: 100, opacity: 0, scale: 0.9, force3D: true });

    gsap.to(serviceCards, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.3,
      ease: 'back.out(1.2)',
      force3D: true, // GPU acceleration
      scrollTrigger: {
        trigger: services,
        start: 'top top',
        toggleActions: 'play none none reverse',
      },
    });

    // US-010: Services icon animations with color transform
    const serviceIcons = services.querySelectorAll('.service-icon svg');
    gsap.set(serviceIcons, { color: '#3f3f46' }); // zinc-700

    gsap.to(serviceIcons, {
      scale: 1.2,
      rotation: 360,
      color: '#f97316', // orange-500
      duration: 0.6,
      stagger: 0.2,
      ease: 'back.out(1)',
      force3D: true, // GPU acceleration
      scrollTrigger: {
        trigger: services,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    // Pin the services section for 1000px of scroll
    const pinTrigger = ScrollTrigger.create({
      trigger: services,
      start: 'top top',
      end: '+=1000',
      pin: true,
      scrub: 1,
      // Toggle the PINNED badge state
      onToggle: (self) => {
        const badgeText = services.querySelector('.services-pin-badge span');
        if (badgeText) {
          badgeText.textContent = self.isActive ? 'PINNED' : 'Pinned Section';
        }
      },
    });
    triggers.push(pinTrigger);

    // Animate progress bar from 0% to 100% during pin
    const progressFill = services.querySelector('.services-progress-fill');
    if (progressFill) {
      gsap.to(progressFill, {
        width: '100%',
        ease: 'none',
        force3D: true, // GPU acceleration
        scrollTrigger: {
          trigger: services,
          start: 'top top',
          end: '+=3000',
          scrub: 1,
        },
      });
    }

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
      gsap.killTweensOf(progressFill);
      gsap.killTweensOf(serviceCards);
      gsap.killTweensOf(serviceIcons);
    };
  }, { scope: servicesRef, dependencies: [prefersReducedMotion] });

  return (
    <section
      ref={servicesRef}
      id="services"
      className="services-section relative min-h-screen flex items-center py-24 px-4"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white uppercase tracking-wider mb-4">
            Adding Real Value as <span className="text-orange-500">Partners</span>
          </h2>
          <p className="text-zinc-500 text-sm uppercase tracking-[0.15em]">
            Comprehensive crypto solutions
          </p>
        </div>

        {/* Pin Indicator Badge */}
        <div className="services-pin-badge flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-xs text-zinc-400 uppercase tracking-wider">Pinned Section</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="services-progress-bar max-w-md mx-auto mb-12">
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div className="services-progress-fill h-full bg-orange-500 rounded-full w-0" style={{ willChange: 'width, transform' }} />
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1: Market Making */}
          <div className="service-card group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500/50 transition-colors duration-200" style={{ willChange: 'transform, opacity' }}>
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            {/* Number badge */}
            <div className="service-number text-5xl font-black text-orange-500/20 mb-4">01</div>

            {/* Icon */}
            <div className="service-icon w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-orange-500 group-hover:text-black transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3">Market Making</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Empower your project with innovative crypto market making solutions
            </p>
          </div>

          {/* Card 2: OTC Trading */}
          <div className="service-card group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500/50 transition-colors duration-200" style={{ willChange: 'transform, opacity' }}>
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            {/* Number badge */}
            <div className="service-number text-5xl font-black text-orange-500/20 mb-4">02</div>

            {/* Icon */}
            <div className="service-icon w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-orange-500 group-hover:text-black transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3">OTC Trading</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Tailored OTC crypto trading solutions for the digital asset market
            </p>
          </div>

          {/* Card 3: Ventures */}
          <div className="service-card group relative bg-zinc-900 border border-zinc-800 p-8 hover:border-orange-500/50 transition-colors duration-200" style={{ willChange: 'transform, opacity' }}>
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            {/* Number badge */}
            <div className="service-number text-5xl font-black text-orange-500/20 mb-4">03</div>

            {/* Icon */}
            <div className="service-icon w-16 h-16 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 text-zinc-400 group-hover:bg-orange-500 group-hover:text-black transition-colors duration-300">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-white mb-3">Ventures</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Backing visionary founders with strategic crypto venture investments
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
