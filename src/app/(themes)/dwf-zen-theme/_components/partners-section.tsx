'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { EXCHANGES_DATA, DEFI_PROTOCOLS_DATA, ZEN_COLORS, ANIMATION_CONFIG, type Partner } from '../_data';

/**
 * Individual partner card with hover animation
 */
function PartnerCard({ partner, variant }: { partner: Partner; variant: 'grid' | 'list' }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;

    // Kill any existing animations on these elements before starting new ones
    const logo = card.querySelector('.partner-logo');
    const name = card.querySelector('.partner-name');
    const glow = card.querySelector('.glow-effect');
    const arrow = card.querySelector('.arrow-indicator');

    gsap.killTweensOf([logo, name, glow, arrow, card]);

    // Animate logo scale and opacity
    gsap.to(logo, {
      scale: 1.08,
      opacity: 1,
      duration: 0.36,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Animate name fade in
    gsap.to(name, {
      opacity: 1,
      y: 0,
      duration: 0.36,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Animate background, shadow, and border together
    gsap.to(card, {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      boxShadow: `0 8px 32px ${ZEN_COLORS.shadowSoft}`,
      borderColor: ZEN_COLORS.accent,
      y: -2,
      duration: 0.36,
      ease: 'power2.out',
      overwrite: 'auto',
    });

    // Animate arrow indicator for list items
    if (variant === 'list' && arrow) {
      gsap.to(arrow, {
        x: 4,
        opacity: 1,
        duration: 0.36,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    }

    // Subtle glow effect
    gsap.to(glow, {
      opacity: 0.6,
      scale: 1.2,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Kill any existing animations on these elements before starting new ones
    const logo = card.querySelector('.partner-logo');
    const name = card.querySelector('.partner-name');
    const glow = card.querySelector('.glow-effect');
    const arrow = card.querySelector('.arrow-indicator');

    gsap.killTweensOf([logo, name, glow, arrow, card]);

    // Reset all animations
    gsap.to(logo, {
      scale: 1,
      opacity: 0.9,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });

    gsap.to(name, {
      opacity: 0.7,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });

    gsap.to(card, {
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      boxShadow: `0 2px 12px ${ZEN_COLORS.shadowSoft}`,
      borderColor: ZEN_COLORS.shadow,
      y: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });

    if (variant === 'list' && arrow) {
      gsap.to(arrow, {
        x: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
        overwrite: 'auto',
      });
    }

    gsap.to(glow, {
      opacity: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.inOut',
      overwrite: 'auto',
    });
  };

  if (variant === 'grid') {
    return (
      <a
        ref={cardRef}
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        className="exchange-item relative overflow-hidden p-5 flex items-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          border: `1px solid ${ZEN_COLORS.shadow}`,
          boxShadow: `0 2px 12px ${ZEN_COLORS.shadowSoft}`,
          textDecoration: 'none',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Glow effect */}
        <div
          className="glow-effect absolute inset-0 opacity-0"
          style={{
            background: `radial-gradient(circle at center, ${ZEN_COLORS.accent}15 0%, transparent 70%)`,
          }}
        />
        {/* Logo placeholder */}
        <div
          className="partner-logo relative w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
          style={{
            backgroundColor: `${ZEN_COLORS.primaryText}08`,
            border: `1px solid ${ZEN_COLORS.shadow}`,
            opacity: 0.9,
          }}
        >
          <span
            className="text-xs font-semibold tracking-wider"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              color: ZEN_COLORS.accent,
              fontWeight: 600,
            }}
          >
            {partner.logo}
          </span>
        </div>
        {/* Name */}
        <span
          className="partner-name text-sm font-normal relative"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            color: ZEN_COLORS.primaryText,
            fontWeight: 400,
            opacity: 0.7,
          }}
        >
          {partner.name}
        </span>
      </a>
    );
  }

  return (
    <a
      ref={cardRef}
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="protocol-item relative overflow-hidden flex items-center p-5"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        border: `1px solid ${ZEN_COLORS.shadow}`,
        boxShadow: `0 2px 12px ${ZEN_COLORS.shadowSoft}`,
        textDecoration: 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div
        className="glow-effect absolute inset-0 opacity-0"
        style={{
          background: `linear-gradient(90deg, ${ZEN_COLORS.accent}10 0%, transparent 100%)`,
        }}
      />
      {/* Logo */}
      <div
        className="partner-logo relative w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0"
        style={{
          backgroundColor: `${ZEN_COLORS.primaryText}08`,
          border: `1px solid ${ZEN_COLORS.shadow}`,
          opacity: 0.9,
        }}
      >
        <span
          className="text-xs font-semibold tracking-wider"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            color: ZEN_COLORS.accent,
            fontWeight: 600,
          }}
        >
          {partner.logo}
        </span>
      </div>
      {/* Name */}
      <span
        className="partner-name text-sm font-normal flex-1 relative"
        style={{
          fontFamily: "'Noto Serif JP', serif",
          color: ZEN_COLORS.primaryText,
          fontWeight: 400,
          opacity: 0.7,
        }}
      >
        {partner.name}
      </span>
      {/* Arrow indicator */}
      <span
        className="arrow-indicator relative"
        style={{
          color: ZEN_COLORS.accent,
          opacity: 0,
        }}
      >
        →
      </span>
    </a>
  );
}

/**
 * Partners Section - Exchange partners grid, DeFi protocols list with hover animations
 */
export function PartnersSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const exchangeItems = section.querySelectorAll('.exchange-item');
    const protocolItems = section.querySelectorAll('.protocol-item');
    const headings = section.querySelectorAll('.section-heading');

    gsap.set(headings, { opacity: 0, y: 20 });
    gsap.set(exchangeItems, { opacity: 0, scale: 0.95 });
    gsap.set(protocolItems, { opacity: 0, x: -15 });

    gsap.to(headings, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: ANIMATION_CONFIG.scroll.ease,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.to(exchangeItems, {
      opacity: 1,
      scale: 1,
      duration: 0.72,
      stagger: 0.048,
      delay: 0.12,
      ease: ANIMATION_CONFIG.scroll.ease,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.to(protocolItems, {
      opacity: 1,
      x: 0,
      duration: 0.72,
      stagger: 0.06,
      delay: 0.24,
      ease: ANIMATION_CONFIG.scroll.ease,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf([...exchangeItems, ...protocolItems, ...headings]);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="partners-section relative py-32 md:py-40 px-6"
      style={{ backgroundColor: ZEN_COLORS.background }}
      aria-labelledby="partners-heading"
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
            id="partners-heading"
            className="text-3xl md:text-4xl font-normal tracking-tight"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              color: ZEN_COLORS.primaryText,
              fontWeight: 400,
            }}
          >
            Our Partners
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Exchanges */}
          <div>
            <h3
              className="section-heading text-xl font-normal mb-8 tracking-tight"
              style={{
                fontFamily: "'Noto Serif JP', serif",
                color: ZEN_COLORS.primaryText,
                fontWeight: 400,
              }}
            >
              Exchanges
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {EXCHANGES_DATA.map((exchange) => (
                <PartnerCard key={exchange.id} partner={exchange} variant="grid" />
              ))}
            </div>
          </div>

          {/* DeFi Protocols */}
          <div>
            <h3
              className="section-heading text-xl font-normal mb-8 tracking-tight"
              style={{
                fontFamily: "'Noto Serif JP', serif",
                color: ZEN_COLORS.primaryText,
                fontWeight: 400,
              }}
            >
              DeFi Protocols
            </h3>
            <div className="space-y-3">
              {DEFI_PROTOCOLS_DATA.map((protocol) => (
                <PartnerCard key={protocol.id} partner={protocol} variant="list" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
