'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import {
  BRUTALIST_PORTFOLIO_INVESTMENTS,
  BRUTALIST_PORTFOLIO_BREAKDOWN,
  BRUTALIST_STAGE_BREAKDOWN,
  BRUTALIST_COLORS,
  BRUTALIST_FONTS,
  BRUTALIST_ANIMATION_CONFIG,
} from '../_data';
import { GaugeChart } from './gauge-chart';

/**
 * Portfolio Section - DWF Labs Brutalist Theme
 * VC portfolio with investments, category breakdown, and stage analysis
 */
export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [hoveredInvestment, setHoveredInvestment] = useState<string | null>(null);

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

    // Investment cards - aggressive slide
    const cards = section.querySelectorAll('.investment-card');
    gsap.set(cards, { opacity: 0, x: -100 });
    gsap.to(cards, {
      opacity: 1,
      x: 0,
      duration: BRUTALIST_ANIMATION_CONFIG.portfolio.cardSlide.duration,
      stagger: BRUTALIST_ANIMATION_CONFIG.portfolio.cardSlide.stagger,
      ease: BRUTALIST_ANIMATION_CONFIG.portfolio.cardSlide.ease,
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

  // Prepare gauge data for category breakdown
  const categoryGaugeData = Object.values(BRUTALIST_PORTFOLIO_BREAKDOWN).map(item => ({
    label: item.label,
    value: item.value,
    color: item.label === 'DeFi' ? BRUTALIST_COLORS.accent :
            item.label === 'Infrastructure' ? BRUTALIST_COLORS.info :
            item.label === 'Gaming' ? BRUTALIST_COLORS.warning :
            item.label === 'CeFi' ? BRUTALIST_COLORS.foreground :
            BRUTALIST_COLORS.secondary,
  }));

  const stageGaugeData = Object.values(BRUTALIST_STAGE_BREAKDOWN).map(item => ({
    label: item.label,
    value: item.value,
    color: item.label === 'Seed' ? BRUTALIST_COLORS.accent :
            item.label === 'Series A' ? BRUTALIST_COLORS.foreground :
            item.label === 'Series B' ? BRUTALIST_COLORS.info :
            item.label === 'Growth' ? BRUTALIST_COLORS.warning :
            BRUTALIST_COLORS.success,
  }));

  const categoryColors: Record<string, string> = {
    'DeFi': BRUTALIST_COLORS.accent,
    'Infrastructure': BRUTALIST_COLORS.info,
    'Gaming': BRUTALIST_COLORS.warning,
    'CeFi': BRUTALIST_COLORS.foreground,
    'NFT': BRUTALIST_COLORS.secondary,
  };

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
            PORTFOLIO
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
            [ 700+_PORTFOLIO_COMPANIES // $3.2B+_AUM ]
          </p>
        </div>

        {/* Featured Investments */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {BRUTALIST_PORTFOLIO_INVESTMENTS.map((investment) => (
            <div
              key={investment.id}
              className="investment-card relative p-6 border-2 group overflow-hidden"
              onMouseEnter={() => setHoveredInvestment(investment.id)}
              onMouseLeave={() => setHoveredInvestment(null)}
              style={{
                borderColor: BRUTALIST_COLORS.foreground,
                background: BRUTALIST_COLORS.background,
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)',
              }}
            >
              {/* Category Badge */}
              <div
                className="absolute top-4 right-4 px-3 py-1 text-xs font-bold uppercase"
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  color: BRUTALIST_COLORS.background,
                  background: categoryColors[investment.category],
                  letterSpacing: '0.1em',
                }}
              >
                {investment.category}
              </div>

              {/* Stage Badge */}
              <div
                className="inline-block px-2 py-1 text-xs font-bold uppercase border mb-4"
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  color: BRUTALIST_COLORS.foreground,
                  borderColor: BRUTALIST_COLORS.foreground,
                  background: 'transparent',
                  letterSpacing: '0.1em',
                }}
              >
                {investment.stage}
              </div>

              {/* Name */}
              <h3
                className="mb-4 uppercase"
                style={{
                  fontFamily: BRUTALIST_FONTS.display,
                  fontWeight: 700,
                  fontSize: '18px',
                  letterSpacing: '-0.02em',
                  color: BRUTALIST_COLORS.foreground,
                  lineHeight: '1.3',
                }}
              >
                {investment.name}
              </h3>

              {/* Investment Amount */}
              <div
                className="mb-3"
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  fontSize: '13px',
                  color: BRUTALIST_COLORS.secondary,
                }}
              >
                <span className="uppercase">INVESTMENT:</span>{' '}
                <span className="font-bold" style={{ color: BRUTALIST_COLORS.foreground }}>
                  {investment.investment}
                </span>
              </div>

              {/* Current Valuation & ROI */}
              {investment.currentValuation && (
                <div
                  className="mb-3"
                  style={{
                    fontFamily: BRUTALIST_FONTS.mono,
                    fontSize: '13px',
                    color: BRUTALIST_COLORS.secondary,
                  }}
                >
                  <span className="uppercase">VALUATION:</span>{' '}
                  <span className="font-bold" style={{ color: BRUTALIST_COLORS.foreground }}>
                    {investment.currentValuation}
                  </span>
                </div>
              )}

              {investment.roi && (
                <div
                  className="inline-flex items-center gap-2 px-3 py-1"
                  style={{
                    fontFamily: BRUTALIST_FONTS.mono,
                    fontSize: '12px',
                    fontWeight: 700,
                    color: BRUTALIST_COLORS.background,
                    background: BRUTALIST_COLORS.success,
                    letterSpacing: '0.05em',
                  }}
                >
                  <span>ROI:</span>
                  <span>{investment.roi}</span>
                </div>
              )}

              {/* Hover Accent */}
              <div
                className="absolute bottom-0 left-0 w-full h-1 group-hover:h-full transition-all duration-300"
                style={{
                  background: categoryColors[investment.category],
                  opacity: 0.1,
                }}
              />
            </div>
          ))}
        </div>

        {/* Portfolio Breakdown Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Category Breakdown */}
          <div className="flex justify-center">
            <GaugeChart
              data={categoryGaugeData}
              title="PORTFOLIO_BY_CATEGORY"
              size={280}
            />
          </div>

          {/* Stage Breakdown */}
          <div className="flex justify-center">
            <GaugeChart
              data={stageGaugeData}
              title="PORTFOLIO_BY_STAGE"
              size={280}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
