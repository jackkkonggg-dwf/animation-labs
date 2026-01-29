'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { SERVICES_DATA, ZEN_COLORS, ANIMATION_CONFIG } from '../_data';

/**
 * Services Section - 4 service cards with vertical fade-in animations
 */
export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.service-card');
    gsap.set(cards, { opacity: 0, y: 35 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONFIG.scroll.duration,
      stagger: ANIMATION_CONFIG.stagger.cardDelay,
      ease: ANIMATION_CONFIG.scroll.ease,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-section relative py-32 md:py-40 px-6"
      style={{ backgroundColor: ZEN_COLORS.backgroundAlt }}
      aria-labelledby="services-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading with accent */}
        <div className="text-center mb-20 md:mb-28">
          <div
            className="mx-auto mb-6 w-12 h-px"
            style={{ backgroundColor: ZEN_COLORS.accent, opacity: 0.5 }}
            aria-hidden="true"
          />
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-normal tracking-tight"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              color: ZEN_COLORS.primaryText,
              fontWeight: 400,
            }}
          >
            Our Services
          </h2>
        </div>

        {/* Service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES_DATA.map((service) => (
            <article
              key={service.id}
              className="service-card p-10 md:p-12 transition-all duration-700 group"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: `1px solid ${ZEN_COLORS.shadow}`,
                boxShadow: `0 2px 16px ${ZEN_COLORS.shadowSoft}`,
              }}
            >
              <div className="mb-8">
                <h3
                  className="text-2xl md:text-3xl font-normal mb-3 group-hover:tracking-wide transition-all duration-500"
                  style={{
                    fontFamily: "'Noto Serif JP', serif",
                    color: ZEN_COLORS.primaryText,
                    fontWeight: 400,
                  }}
                >
                  {service.title}
                </h3>
                <p
                  className="text-xs uppercase tracking-widest font-light"
                  style={{ color: ZEN_COLORS.accent, letterSpacing: '0.2em' }}
                >
                  {service.subtitle}
                </p>
              </div>

              {/* Service metrics */}
              <div className="grid grid-cols-3 gap-6">
                {service.metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <p
                      className="text-xl md:text-2xl font-normal tabular-nums mb-2"
                      style={{
                        fontFamily: "'Noto Serif JP', serif",
                        color: ZEN_COLORS.primaryText,
                        fontWeight: 400,
                      }}
                    >
                      {metric.value}
                    </p>
                    <p
                      className="text-xs uppercase tracking-wider leading-relaxed"
                      style={{ color: ZEN_COLORS.secondaryText, letterSpacing: '0.1em' }}
                    >
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
