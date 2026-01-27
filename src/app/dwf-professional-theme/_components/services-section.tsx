'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import { PROFESSIONAL_SERVICES_DATA, PROFESSIONAL_ANIMATION_CONFIG } from '../_data';

/**
 * Services Section - DWF Professional Theme
 * Finance-inspired service cards with elegant, professional design
 */
export function ProfessionalServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.querySelectorAll('.service-card');
    const header = headerRef.current;

    if (!section || !cards || cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // Header animation
    if (header) {
      const badge = header.querySelector('.section-badge');
      const title = header.querySelector('.section-title');
      const subtitle = header.querySelector('.section-subtitle');

      gsap.set([badge, title, subtitle], { opacity: 0, y: 30 });

      triggers.push(
        ScrollTrigger.create({
          trigger: header,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(badge, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
            gsap.to(title, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' });
            gsap.to(subtitle, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power2.out' });
          },
        })
      );
    }

    // Cards reveal
    gsap.set(cards, {
      opacity: 0,
      y: 60,
      rotationX: 5,
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: PROFESSIONAL_ANIMATION_CONFIG.services.cardReveal.duration,
      stagger: PROFESSIONAL_ANIMATION_CONFIG.services.cardReveal.stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a192f 0%, #0d1b2a 50%, #0a192f 100%)',
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #d4af37 1px, transparent 1px), linear-gradient(-45deg, #d4af37 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <div className="section-badge inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="text-xs md:text-sm text-amber-500/80 uppercase tracking-[0.35em] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
              Our Expertise
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl text-white mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 500, letterSpacing: '-0.02em' }}>
            Institutional Services
          </h2>

          <p className="section-subtitle text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Comprehensive digital asset solutions designed for institutional investors and transformative projects.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {PROFESSIONAL_SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              className="service-card group relative bg-slate-900/30 backdrop-blur-sm border border-slate-700/30 p-8 hover:border-amber-500/30 transition-all duration-500"
              style={{
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-300" />

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-xl text-white mb-3 group-hover:text-amber-400 transition-colors duration-300"
                style={{ fontFamily: "Playfair Display, serif", fontWeight: 500 }}
              >
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
                {service.description}
              </p>

              {/* Metrics highlight */}
              {service.metrics && (
                <div className="mb-6 pb-6 border-b border-slate-700/30">
                  <div className="text-2xl font-semibold text-amber-400" style={{ fontFamily: "Playfair Display, serif" }}>
                    {service.metrics}
                  </div>
                </div>
              )}

              {/* Capabilities */}
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-slate-500 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                  Capabilities
                </div>
                {service.capabilities.map((capability, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1 h-1 bg-amber-500/50 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-slate-400 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                      {capability}
                    </span>
                  </div>
                ))}
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:via-amber-500/0 group-hover:to-amber-500/5 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
