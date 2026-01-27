'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import {
  PORTFOLIO_INVESTMENTS_DATA,
  PORTFOLIO_DISTRIBUTION_DATA,
  STAGE_DISTRIBUTION_DATA,
  ZEN_COLORS,
  ANIMATION_CONFIG,
} from '../_data';

/**
 * Portfolio Section - Featured investments with gauge/donut charts
 */
export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const investmentCards = section.querySelectorAll('.investment-card');
    const chartContainer = chartsRef.current;

    gsap.set(investmentCards, { opacity: 0, y: 35 });

    gsap.to(investmentCards, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONFIG.scroll.duration,
      stagger: 0.09,
      ease: ANIMATION_CONFIG.scroll.ease,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate gauge charts when visible
    if (chartContainer) {
      const charts = chartContainer.querySelectorAll('.gauge-chart');
      gsap.fromTo(charts,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.18,
          ease: ANIMATION_CONFIG.scroll.ease,
          scrollTrigger: {
            trigger: chartContainer,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf(investmentCards);
    };
  }, []);

  // Gauge chart component with SVG stroke-dasharray animation
  const GaugeChart = ({
    value,
    size = 120,
    strokeWidth = 32,
    color = ZEN_COLORS.accent,
  }: {
    value: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="gauge-chart flex flex-col items-center">
        <svg width={size} height={size} className="transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(74, 74, 74, 0.08)"
            strokeWidth={strokeWidth}
          />
          {/* Value circle - NO rounded corners */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="butt"
            style={{
              transition: 'stroke-dashoffset 2s ease-out',
            }}
          />
        </svg>
        <span
          className="text-lg font-normal mt-3 tabular-nums"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            color: ZEN_COLORS.primaryText,
            fontWeight: 400,
          }}
        >
          {value}%
        </span>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="portfolio-section relative py-32 md:py-40 px-6"
      style={{ backgroundColor: ZEN_COLORS.backgroundAlt }}
      aria-labelledby="portfolio-heading"
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
            id="portfolio-heading"
            className="text-3xl md:text-4xl font-normal tracking-tight"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              color: ZEN_COLORS.primaryText,
              fontWeight: 400,
            }}
          >
            Featured Investments
          </h2>
        </div>

        {/* Investment cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {PORTFOLIO_INVESTMENTS_DATA.map((investment) => (
            <article
              key={investment.id}
              className="investment-card p-7 transition-all duration-700 group"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                border: `1px solid ${ZEN_COLORS.shadow}`,
                boxShadow: `0 2px 16px ${ZEN_COLORS.shadowSoft}`,
              }}
            >
              <div className="mb-6">
                <h3
                  className="text-xl font-normal mb-2 group-hover:tracking-wide transition-all duration-500"
                  style={{
                    fontFamily: "'Noto Serif JP', serif",
                    color: ZEN_COLORS.primaryText,
                    fontWeight: 400,
                  }}
                >
                  {investment.name}
                </h3>
                <p
                  className="text-xs uppercase tracking-widest font-light"
                  style={{ color: investment.color, letterSpacing: '0.15em' }}
                >
                  {investment.category}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div
                  className="px-3 py-1.5"
                  style={{ backgroundColor: `${investment.color}12` }}
                >
                  <span
                    className="text-sm font-normal"
                    style={{ color: investment.color, fontWeight: 400 }}
                  >
                    {investment.investment}
                  </span>
                </div>
                <span
                  className="text-lg font-normal tabular-nums text-green-700"
                  style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}
                >
                  {investment.roi}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Charts section */}
        <div ref={chartsRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Portfolio distribution by category */}
          <div className="p-10" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            border: `1px solid ${ZEN_COLORS.shadow}`,
            boxShadow: `0 2px 16px ${ZEN_COLORS.shadowSoft}`,
          }}>
            <h3
              className="text-xl font-normal mb-10 text-center tracking-tight"
              style={{
                fontFamily: "'Noto Serif JP', serif",
                color: ZEN_COLORS.primaryText,
                fontWeight: 400,
              }}
            >
              Portfolio Distribution
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {PORTFOLIO_DISTRIBUTION_DATA.map((item) => (
                <div key={item.category} className="text-center">
                  <GaugeChart value={item.percentage} color={item.color} />
                  <p
                    className="text-xs mt-3 uppercase tracking-wider font-light"
                    style={{ color: ZEN_COLORS.secondaryText, letterSpacing: '0.12em' }}
                  >
                    {item.category}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Investment stage distribution */}
          <div className="p-10" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            border: `1px solid ${ZEN_COLORS.shadow}`,
            boxShadow: `0 2px 16px ${ZEN_COLORS.shadowSoft}`,
          }}>
            <h3
              className="text-xl font-normal mb-10 text-center tracking-tight"
              style={{
                fontFamily: "'Noto Serif JP', serif",
                color: ZEN_COLORS.primaryText,
                fontWeight: 400,
              }}
            >
              Investment Stage
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {STAGE_DISTRIBUTION_DATA.map((item) => (
                <div key={item.stage} className="text-center">
                  <GaugeChart value={item.percentage} color={ZEN_COLORS.chart.infrastructure} />
                  <p
                    className="text-xs mt-3 uppercase tracking-wider font-light"
                    style={{ color: ZEN_COLORS.secondaryText, letterSpacing: '0.12em' }}
                  >
                    {item.stage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
