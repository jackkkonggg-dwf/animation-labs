'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import {
  BRUTALIST_EXCHANGE_PARTNERS,
  BRUTALIST_PROTOCOL_PARTNERS,
  BRUTALIST_COLORS,
  BRUTALIST_FONTS,
  BRUTALIST_ANIMATION_CONFIG,
} from '../_data';

/**
 * Partners Section - DWF Labs Brutalist Theme
 * Exchange partnerships and protocol collaborations
 */
export function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    const triggers: ScrollTrigger[] = [];

    // Header animation
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

    // Exchange logos - aggressive fade
    const exchangeLogos = section.querySelectorAll('.exchange-logo');
    gsap.set(exchangeLogos, { opacity: 0, scale: 0.9 });
    gsap.to(exchangeLogos, {
      opacity: 1,
      scale: 1,
      duration: BRUTALIST_ANIMATION_CONFIG.partners.logoFade.duration,
      stagger: BRUTALIST_ANIMATION_CONFIG.partners.logoFade.stagger,
      ease: BRUTALIST_ANIMATION_CONFIG.partners.logoFade.ease,
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: BRUTALIST_ANIMATION_CONFIG.scrollTrigger.toggleActions,
      },
    });

    // Protocol logos
    const protocolLogos = section.querySelectorAll('.protocol-logo');
    gsap.set(protocolLogos, { opacity: 0, y: 20 });
    gsap.to(protocolLogos, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      if (title) gsap.killTweensOf(title);
      if (divider) gsap.killTweensOf(divider);
      if (subtitle) gsap.killTweensOf(subtitle);
      gsap.killTweensOf(exchangeLogos);
      gsap.killTweensOf(protocolLogos);
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
            PARTNERS
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
            [ EXCHANGE_PARTNERSHIPS // PROTOCOL_INTEGRATIONS ]
          </p>
        </div>

        {/* Exchange Partners */}
        <div className="mb-16">
          <h3
            className="mb-6 uppercase flex items-center gap-4"
            style={{
              fontFamily: BRUTALIST_FONTS.display,
              fontWeight: 700,
              fontSize: '20px',
              letterSpacing: '0.05em',
              color: BRUTALIST_COLORS.foreground,
            }}
          >
            <span className="w-2 h-2" style={{ background: BRUTALIST_COLORS.accent }} />
            EXCHANGES
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {BRUTALIST_EXCHANGE_PARTNERS.map((partner, index) => (
              <div
                key={partner.name}
                className="exchange-logo relative p-4 border-2 group hover:bg-white hover:text-black transition-all duration-150 cursor-pointer"
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  borderColor: partner.tier === 'TIER_1' ? BRUTALIST_COLORS.accent : `${BRUTALIST_COLORS.foreground}40`,
                  background: BRUTALIST_COLORS.background,
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 calc(100% - 8px), 0 8px)',
                }}
              >
                <div
                  className="text-center text-sm font-bold uppercase"
                  style={{
                    color: partner.tier === 'TIER_1' ? BRUTALIST_COLORS.accent : BRUTALIST_COLORS.foreground,
                    letterSpacing: '0.05em',
                  }}
                >
                  {partner.name}
                </div>
                {/* Tier badge */}
                <div
                  className="text-[10px] uppercase text-center mt-2 opacity-60"
                  style={{ letterSpacing: '0.1em' }}
                >
                  {partner.tier.replace('_', ' ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Protocol Partners */}
        <div>
          <h3
            className="mb-6 uppercase flex items-center gap-4"
            style={{
              fontFamily: BRUTALIST_FONTS.display,
              fontWeight: 700,
              fontSize: '20px',
              letterSpacing: '0.05em',
              color: BRUTALIST_COLORS.foreground,
            }}
          >
            <span className="w-2 h-2" style={{ background: BRUTALIST_COLORS.info }} />
            DEFI_PROTOCOLS
          </h3>
          <div className="flex flex-wrap gap-4">
            {BRUTALIST_PROTOCOL_PARTNERS.map((partner, index) => (
              <div
                key={partner.name}
                className="protocol-logo relative px-6 py-3 border-2 group hover:bg-white hover:text-black transition-all duration-150 cursor-pointer"
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  borderColor: BRUTALIST_COLORS.foreground,
                  background: BRUTALIST_COLORS.background,
                }}
              >
                <span
                  className="text-sm font-bold uppercase"
                  style={{
                    color: BRUTALIST_COLORS.foreground,
                    letterSpacing: '0.05em',
                  }}
                >
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12">
          <div
            className="p-6 border-2 text-center"
            style={{
              borderColor: BRUTALIST_COLORS.foreground,
              background: `${BRUTALIST_COLORS.foreground}05`,
              clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), 0 100%, 0 12px)',
            }}
          >
            <div
              className="text-4xl font-black uppercase mb-2"
              style={{
                fontFamily: BRUTALIST_FONTS.display,
                color: BRUTALIST_COLORS.accent,
                letterSpacing: '-0.02em',
              }}
            >
              30+
            </div>
            <div
              className="text-xs uppercase"
              style={{
                fontFamily: BRUTALIST_FONTS.mono,
                color: BRUTALIST_COLORS.secondary,
                letterSpacing: '0.1em',
              }}
            >
              EXCHANGE_PARTNERS
            </div>
          </div>
          <div
            className="p-6 border-2 text-center"
            style={{
              borderColor: BRUTALIST_COLORS.foreground,
              background: `${BRUTALIST_COLORS.foreground}05`,
              clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), 0 100%, 0 12px)',
            }}
          >
            <div
              className="text-4xl font-black uppercase mb-2"
              style={{
                fontFamily: BRUTALIST_FONTS.display,
                color: BRUTALIST_COLORS.info,
                letterSpacing: '-0.02em',
              }}
            >
              120+
            </div>
            <div
              className="text-xs uppercase"
              style={{
                fontFamily: BRUTALIST_FONTS.mono,
                color: BRUTALIST_COLORS.secondary,
                letterSpacing: '0.1em',
              }}
            >
              PROTOCOL_INTEGRATIONS
            </div>
          </div>
          <div
            className="p-6 border-2 text-center"
            style={{
              borderColor: BRUTALIST_COLORS.foreground,
              background: `${BRUTALIST_COLORS.foreground}05`,
              clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), 0 100%, 0 12px)',
            }}
          >
            <div
              className="text-4xl font-black uppercase mb-2"
              style={{
                fontFamily: BRUTALIST_FONTS.display,
                color: BRUTALIST_COLORS.foreground,
                letterSpacing: '-0.02em',
              }}
            >
              GLOBAL
            </div>
            <div
              className="text-xs uppercase"
              style={{
                fontFamily: BRUTALIST_FONTS.mono,
                color: BRUTALIST_COLORS.secondary,
                letterSpacing: '0.1em',
              }}
            >
              TRADING_PRESENCE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
