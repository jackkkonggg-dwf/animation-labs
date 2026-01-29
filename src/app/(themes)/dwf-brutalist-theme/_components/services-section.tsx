'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { BRUTALIST_SERVICES, BRUTALIST_COLORS, BRUTALIST_FONTS, BRUTALIST_ANIMATION_CONFIG } from '../_data';

/**
 * Services Section - DWF Labs Brutalist Theme
 * Showcases Market Making, OTC Trading, Venture Capital, and Liquidity Services
 */
export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const triggers: ScrollTrigger[] = [];

    // Header animation - aggressive snap
    const title = header.querySelector('.section-title');
    const divider = header.querySelector('.section-divider');
    const subtitle = header.querySelector('.section-subtitle');

    if (title && divider && subtitle) {
      gsap.set([title, divider, subtitle], { opacity: 0, x: -100 });

      triggers.push(
        ScrollTrigger.create({
          trigger: header,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(title, {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: 'power4.inOut',
            });
            gsap.to(divider, {
              opacity: 1,
              x: 0,
              scaleX: 1,
              duration: 0.4,
              delay: 0.15,
              ease: 'power4.inOut',
            });
            gsap.to(subtitle, {
              opacity: 1,
              x: 0,
              duration: 0.3,
              delay: 0.2,
              ease: 'power4.inOut',
            });
          },
        })
      );
    }

    // Service cards - aggressive reveal
    const cards = section.querySelectorAll('.service-card');
    gsap.set(cards, { opacity: 0, y: 100, scale: 0.95 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: BRUTALIST_ANIMATION_CONFIG.services.cardReveal.duration,
      stagger: BRUTALIST_ANIMATION_CONFIG.services.cardReveal.stagger,
      ease: BRUTALIST_ANIMATION_CONFIG.services.cardReveal.ease,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: BRUTALIST_ANIMATION_CONFIG.scrollTrigger.toggleActions,
      },
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      if (title) gsap.killTweensOf(title);
      if (divider) gsap.killTweensOf(divider);
      if (subtitle) gsap.killTweensOf(subtitle);
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-20"
      style={{
        background: BRUTALIST_COLORS.background,
        borderTop: `3px solid ${BRUTALIST_COLORS.foreground}`,
      }}
    >
      <div className="max-w-8xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <h2
            className="section-title uppercase mb-6"
            style={{
              fontFamily: BRUTALIST_FONTS.display,
              fontWeight: 700,
              fontSize: 'clamp(48px, 8vw, 80px)',
              letterSpacing: '-0.03em',
              lineHeight: '1',
              color: BRUTALIST_COLORS.foreground,
            }}
          >
            SERVICES
          </h2>
          <div
            className="section-divider h-2 mb-6"
            style={{
              background: BRUTALIST_COLORS.accent,
              width: 'clamp(150px, 30%, 400px)',
              transformOrigin: 'left',
            }}
          />
          <p
            className="section-subtitle uppercase"
            style={{
              fontFamily: BRUTALIST_FONTS.mono,
              fontWeight: 500,
              fontSize: 'clamp(12px, 2vw, 14px)',
              letterSpacing: '0.15em',
              color: BRUTALIST_COLORS.secondary,
            }}
          >
            [ INSTITUTIONAL_CRYPTO_SERVICES ]
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRUTALIST_SERVICES.map((service, _index) => (
            <div
              key={service.id}
              className="service-card relative overflow-hidden border-2 group"
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              style={{
                borderColor: BRUTALIST_COLORS.foreground,
                background: BRUTALIST_COLORS.background,
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)',
              }}
            >
              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 h-full w-2 transition-all duration-150"
                style={{
                  background: activeService === service.id ? BRUTALIST_COLORS.accent : BRUTALIST_COLORS.foreground,
                }}
              />

              {/* Short Code Badge */}
              <div
                className="absolute top-4 right-4 px-3 py-1 border"
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  fontSize: '11px',
                  fontWeight: 700,
                  color: BRUTALIST_COLORS.accent,
                  borderColor: BRUTALIST_COLORS.accent,
                  background: 'transparent',
                }}
              >
                {service.shortCode}
              </div>

              <div className="p-6 sm:p-8">
                {/* Title */}
                <h3
                  className="mb-4 uppercase"
                  style={{
                    fontFamily: BRUTALIST_FONTS.display,
                    fontWeight: 700,
                    fontSize: 'clamp(24px, 4vw, 36px)',
                    letterSpacing: '-0.02em',
                    color: BRUTALIST_COLORS.foreground,
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-6"
                  style={{
                    fontFamily: BRUTALIST_FONTS.mono,
                    fontSize: '13px',
                    lineHeight: '1.6',
                    color: BRUTALIST_COLORS.secondary,
                    letterSpacing: '0.05em',
                  }}
                >
                  {service.description}
                </p>

                {/* Metrics */}
                <div className="mb-6 grid grid-cols-3 gap-4">
                  {service.metrics.map((metric, i) => (
                    <div key={i} className="border-b pb-2" style={{ borderColor: `${BRUTALIST_COLORS.foreground}30` }}>
                      <div
                        className="text-xs uppercase mb-1"
                        style={{
                          fontFamily: BRUTALIST_FONTS.mono,
                          color: BRUTALIST_COLORS.secondary,
                          letterSpacing: '0.1em',
                        }}
                      >
                        {metric.label}
                      </div>
                      <div
                        className="text-lg font-bold"
                        style={{
                          fontFamily: BRUTALIST_FONTS.display,
                          color: BRUTALIST_COLORS.accent,
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {metric.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Features List */}
                <div className="space-y-2">
                  {service.features.slice(0, activeService === service.id ? 4 : 2).map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm"
                      style={{
                        fontFamily: BRUTALIST_FONTS.mono,
                        color: BRUTALIST_COLORS.foreground,
                        opacity: activeService === service.id ? 1 : 0.7,
                      }}
                    >
                      <span style={{ color: BRUTALIST_COLORS.accent }}>///</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                  {activeService !== service.id && service.features.length > 2 && (
                    <div
                      className="text-xs uppercase mt-4"
                      style={{
                        fontFamily: BRUTALIST_FONTS.mono,
                        color: BRUTALIST_COLORS.secondary,
                        letterSpacing: '0.1em',
                      }}
                    >
                      [+{service.features.length - 2}_MORE]
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Accent */}
              <div
                className="absolute bottom-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: BRUTALIST_COLORS.accent,
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
