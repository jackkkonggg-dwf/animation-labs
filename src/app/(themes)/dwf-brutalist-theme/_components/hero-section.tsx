'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { BRUTALIST_HERO_DATA, BRUTALIST_COLORS, BRUTALIST_FONTS } from '../_data';
import { MarqueeText } from './marquee-text';

/**
 * Hero Section - DWF Labs Brutalist Theme
 * Aggressive crypto market maker & VC firm branding
 */
export function BrutalistHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const cornerAccentRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Grid lines - aggressive reveal
    if (gridLinesRef.current) {
      const lines = gridLinesRef.current.querySelectorAll('.grid-line');
      gsap.set(lines, { scaleX: 0, transformOrigin: 'left' });
      gsap.to(lines, {
        scaleX: 1,
        duration: 0.2,
        stagger: 0.03,
        ease: 'power4.inOut',
        delay: 0.1,
      });
    }

    // Corner accent - spin in
    if (cornerAccentRef.current) {
      gsap.set(cornerAccentRef.current, { rotation: -180, scale: 0, opacity: 0 });
      gsap.to(cornerAccentRef.current, {
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
        delay: 0.2,
      });
    }

    // Title - aggressive snap from left with scale
    if (titleRef.current) {
      gsap.set(titleRef.current, { x: '-20%', scale: 1.15, opacity: 0 });
      gsap.to(titleRef.current, {
        x: '0%',
        scale: 1,
        opacity: 1,
        duration: 0.25,
        ease: 'power4.inOut',
        delay: 0.3,
      });
    }

    // Subtext - hard snap from right
    if (subtextRef.current) {
      gsap.set(subtextRef.current, { x: '20%', opacity: 0 });
      gsap.to(subtextRef.current, {
        x: '0%',
        opacity: 1,
        duration: 0.2,
        ease: 'power4.inOut',
        delay: 0.4,
      });
    }

    // Description - typewriter effect
    if (descriptionRef.current) {
      const text = descriptionRef.current.textContent || '';
      descriptionRef.current.textContent = '';
      gsap.to({}, {
        duration: 0.04,
        repeat: text.length,
        onRepeat: function() {
          const progress = Math.round(this.ratio);
          descriptionRef.current!.textContent = text.slice(0, progress);
        },
        ease: 'none',
        delay: 0.5,
      });
    }

    // CTA - hard snap with aggressive bounce
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: 100, scale: 0.8, opacity: 0 });
      gsap.to(ctaRef.current, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.6)',
        delay: 1.2,
      });
    }

    // Metrics - aggressive staggered drop
    if (metricsRef.current) {
      const cards = metricsRef.current.querySelectorAll('.metric-card');
      gsap.set(cards, { y: -200, rotation: 5, opacity: 0 });
      gsap.to(cards, {
        y: 0,
        rotation: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'bounce.out',
        delay: 0.8,
      });
    }

    ScrollTrigger.refresh();

    return () => {
      if (titleRef.current) gsap.killTweensOf(titleRef.current);
      if (subtextRef.current) gsap.killTweensOf(subtextRef.current);
      if (descriptionRef.current) gsap.killTweensOf(descriptionRef.current);
      if (ctaRef.current) gsap.killTweensOf(ctaRef.current);
      if (metricsRef.current) gsap.killTweensOf('.metric-card');
      if (cornerAccentRef.current) gsap.killTweensOf(cornerAccentRef.current);
      gsap.killTweensOf('.grid-line');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: BRUTALIST_COLORS.background,
        minHeight: '100vh',
        fontFamily: BRUTALIST_FONTS.body,
      }}
    >
      {/* Aggressive Grid Lines */}
      <div ref={gridLinesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="grid-line absolute top-0 left-0 w-full h-px bg-white opacity-10" />
        <div className="grid-line absolute top-0 left-0 w-px h-full bg-white opacity-10" />
        <div className="grid-line absolute top-1/4 left-0 w-full h-px bg-white opacity-5" />
        <div className="grid-line absolute top-2/4 left-0 w-full h-px bg-white opacity-5" />
        <div className="grid-line absolute top-3/4 left-0 w-full h-px bg-white opacity-5" />
        <div className="grid-line absolute top-0 left-1/4 w-px h-full bg-white opacity-5" />
        <div className="grid-line absolute top-0 left-2/4 w-px h-full bg-white opacity-5" />
        <div className="grid-line absolute top-0 left-3/4 w-px h-full bg-white opacity-5" />
      </div>

      {/* Corner Accent */}
      <div
        ref={cornerAccentRef}
        className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${BRUTALIST_COLORS.accent} 0%, transparent 50%)`,
          clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 px-4 sm:px-8 md:px-12 lg:px-20 py-20 sm:py-28 md:py-32 max-w-8xl mx-auto">
        {/* Subtext Badge - Mono style */}
        <p
          ref={subtextRef}
          className="mb-8 inline-block px-4 py-2 border-2"
          style={{
            fontFamily: BRUTALIST_FONTS.mono,
            fontSize: 'clamp(11px, 2vw, 13px)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: BRUTALIST_COLORS.accent,
            borderColor: BRUTALIST_COLORS.accent,
            background: 'transparent',
          }}
        >
          {BRUTALIST_HERO_DATA.subtext}
        </p>

        {/* Main Headline - Aggressive Oswald */}
        <h1
          ref={titleRef}
          className="mb-8 relative"
          style={{
            fontFamily: BRUTALIST_FONTS.display,
            fontWeight: 700,
            fontSize: 'clamp(72px, 15vw, 160px)',
            lineHeight: '0.85',
            textTransform: 'uppercase',
            color: BRUTALIST_COLORS.foreground,
            letterSpacing: '-0.04em',
          }}
        >
          {BRUTALIST_HERO_DATA.headline}
          {/* Aggressive underline */}
          <div
            className="absolute -bottom-4 left-0 h-4"
            style={{
              background: BRUTALIST_COLORS.accent,
              width: 'clamp(200px, 50%, 500px)',
            }}
          />
        </h1>

        {/* Description - Mono style with aggressive formatting */}
        <p
          ref={descriptionRef}
          className="mb-16 max-w-3xl"
          style={{
            fontFamily: BRUTALIST_FONTS.mono,
            fontSize: 'clamp(13px, 2vw, 16px)',
            lineHeight: '1.6',
            textTransform: 'uppercase',
            color: BRUTALIST_COLORS.secondary,
            letterSpacing: '0.05em',
          }}
        >
          {BRUTALIST_HERO_DATA.description}
        </p>

        {/* CTA Button - Aggressive brutalist style */}
        <button
          ref={ctaRef}
          className="relative mb-24 group overflow-hidden"
          style={{
            fontFamily: BRUTALIST_FONTS.display,
            fontWeight: 700,
            fontSize: 'clamp(16px, 2.5vw, 24px)',
            padding: '20px 60px',
            background: BRUTALIST_COLORS.accent,
            color: BRUTALIST_COLORS.background,
            border: 'none',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            clipPath: 'polygon(0 0, 100% 0, 100% 80%, 95% 100%, 0 100%)',
          }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              x: 5,
              duration: 0.1,
              ease: 'power4.inOut',
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              x: 0,
              duration: 0.1,
              ease: 'power4.inOut',
            });
          }}
        >
          <span className="relative z-10">{BRUTALIST_HERO_DATA.ctaText}</span>
        </button>

        {/* Metrics Grid - Aggressive asymmetric layout */}
        <div
          ref={metricsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{
            borderTop: `3px solid ${BRUTALIST_COLORS.foreground}`,
            borderLeft: `3px solid ${BRUTALIST_COLORS.foreground}`,
            background: BRUTALIST_COLORS.foreground,
          }}
        >
          {BRUTALIST_HERO_DATA.heroStats.map((metric, index) => (
            <div
              key={index}
              className="metric-card relative p-6 sm:p-8 overflow-hidden group"
              style={{
                borderRight: index < 3 ? `3px solid ${BRUTALIST_COLORS.foreground}` : 'none',
                borderBottom: `3px solid ${BRUTALIST_COLORS.foreground}`,
                background: index % 2 === 0 ? BRUTALIST_COLORS.background : BRUTALIST_COLORS.foreground,
                clipPath: index % 2 === 0 ? 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 0 100%)' : 'polygon(5% 0, 100% 0, 100% 100%, 0 100%, 0 5%)',
              }}
            >
              {/* Diagonal accent on hover */}
              <div
                className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: index % 2 === 0 ? BRUTALIST_COLORS.accent : BRUTALIST_COLORS.background,
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
                  transition: 'opacity 0.1s',
                }}
              />

              {/* Metric Value */}
              <div
                className="mb-3 relative"
                style={{
                  fontFamily: BRUTALIST_FONTS.display,
                  fontWeight: 700,
                  fontSize: 'clamp(42px, 6vw, 72px)',
                  lineHeight: '0.9',
                  textTransform: 'uppercase',
                  color: index % 2 === 0 ? BRUTALIST_COLORS.foreground : BRUTALIST_COLORS.background,
                  letterSpacing: '-0.02em',
                }}
              >
                {metric.value}
              </div>

              {/* Metric Label */}
              <div
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  fontSize: 'clamp(10px, 1.5vw, 12px)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: index % 2 === 0 ? BRUTALIST_COLORS.secondary : BRUTALIST_COLORS.background,
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee at bottom */}
      <MarqueeText />
    </section>
  );
}
