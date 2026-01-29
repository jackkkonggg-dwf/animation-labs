'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import {
  BRUTALIST_LIVE_STATS,
  BRUTALIST_TRADING_PAIRS,
  BRUTALIST_COLORS,
  BRUTALIST_FONTS,
  BRUTALIST_ANIMATION_CONFIG,
} from '../_data';

/**
 * Live Stats Section - DWF Labs Brutalist Theme
 * Real-time trading metrics with sparkline charts and live indicators
 */
export function LiveStatsSection() {
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

    // Stat cards - aggressive reveal
    const cards = section.querySelectorAll('.stat-card');
    gsap.set(cards, { opacity: 0, y: 50 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: BRUTALIST_ANIMATION_CONFIG.scrollTrigger.toggleActions,
      },
    });

    // Sparklines
    const sparklines = section.querySelectorAll('.sparkline-path');
    sparklines.forEach((sparkline) => {
      const path = sparkline as SVGPathElement;
      const length = path.getTotalLength?.() ?? 0;
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: BRUTALIST_ANIMATION_CONFIG.liveStats.sparkline.duration,
        ease: BRUTALIST_ANIMATION_CONFIG.liveStats.sparkline.ease,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        },
      });
    });

    // Trading pairs
    const pairs = section.querySelectorAll('.trading-pair');
    gsap.set(pairs, { opacity: 0, x: -20 });
    gsap.to(pairs, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 65%',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      if (title) gsap.killTweensOf(title);
      if (divider) gsap.killTweensOf(divider);
      if (subtitle) gsap.killTweensOf(subtitle);
      gsap.killTweensOf(cards);
      gsap.killTweensOf(sparklines);
      gsap.killTweensOf(pairs);
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
            LIVE_STATS
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
            [ REAL_TIME_TRADING_METRICS ]
          </p>
        </div>

        {/* Live Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {BRUTALIST_LIVE_STATS.map((stat, index) => (
            <div
              key={stat.id}
              className="stat-card relative p-6 border-2 overflow-hidden group"
              style={{
                borderColor: BRUTALIST_COLORS.foreground,
                background: BRUTALIST_COLORS.background,
                clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)',
              }}
            >
              {/* Live indicator */}
              {stat.live && (
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: BRUTALIST_COLORS.success }}
                  />
                  <span
                    className="text-xs font-bold uppercase"
                    style={{
                      fontFamily: BRUTALIST_FONTS.mono,
                      color: BRUTALIST_COLORS.success,
                      letterSpacing: '0.1em',
                    }}
                  >
                    LIVE
                  </span>
                </div>
              )}

              {/* Label */}
              <div
                className="text-xs uppercase mb-3"
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  color: BRUTALIST_COLORS.secondary,
                  letterSpacing: '0.1em',
                }}
              >
                {stat.label}
              </div>

              {/* Value */}
              <div
                className="mb-3"
                style={{
                  fontFamily: BRUTALIST_FONTS.display,
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  lineHeight: '1',
                  color: BRUTALIST_COLORS.foreground,
                  letterSpacing: '-0.02em',
                }}
              >
                {stat.value}
              </div>

              {/* Change */}
              <div
                className="inline-flex items-center gap-2 px-2 py-1 mb-4"
                style={{
                  fontFamily: BRUTALIST_FONTS.mono,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: stat.changePositive ? BRUTALIST_COLORS.success : BRUTALIST_COLORS.error,
                  background: stat.changePositive ? `${BRUTALIST_COLORS.success}20` : `${BRUTALIST_COLORS.error}20`,
                  border: `1px solid ${stat.changePositive ? BRUTALIST_COLORS.success : BRUTALIST_COLORS.error}`,
                }}
              >
                <span>{stat.changePositive ? '▲' : '▼'}</span>
                <span>{stat.change}</span>
              </div>

              {/* Sparkline */}
              <svg
                width="100%"
                height="40"
                viewBox="0 0 100 40"
                className="overflow-visible"
              >
                <path
                  className="sparkline-path"
                  d={generateSparklinePath(stat.sparkline)}
                  fill="none"
                  stroke={stat.changePositive ? BRUTALIST_COLORS.success : BRUTALIST_COLORS.error}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>

        {/* Trading Pairs Table */}
        <div className="border-2 overflow-hidden" style={{ borderColor: BRUTALIST_COLORS.foreground }}>
          <div className="px-6 py-4 border-b-2" style={{ borderColor: BRUTALIST_COLORS.foreground, background: `${BRUTALIST_COLORS.foreground}10` }}>
            <h3
              className="uppercase"
              style={{
                fontFamily: BRUTALIST_FONTS.display,
                fontWeight: 700,
                fontSize: '18px',
                letterSpacing: '0.05em',
                color: BRUTALIST_COLORS.foreground,
              }}
            >
              TOP_TRADING_PAIRS
            </h3>
          </div>
          <div className="divide-y divide-x divide-gray-800 grid grid-cols-1 sm:grid-cols-5" style={{ borderColor: `${BRUTALIST_COLORS.foreground}20` }}>
            {/* Header */}
            <div className="px-4 py-3 uppercase text-xs font-bold" style={{
              fontFamily: BRUTALIST_FONTS.mono,
              color: BRUTALIST_COLORS.secondary,
              letterSpacing: '0.1em',
            }}>PAIR</div>
            <div className="px-4 py-3 uppercase text-xs font-bold text-right" style={{
              fontFamily: BRUTALIST_FONTS.mono,
              color: BRUTALIST_COLORS.secondary,
              letterSpacing: '0.1em',
            }}>VOLUME_24H</div>
            <div className="px-4 py-3 uppercase text-xs font-bold text-right" style={{
              fontFamily: BRUTALIST_FONTS.mono,
              color: BRUTALIST_COLORS.secondary,
              letterSpacing: '0.1em',
            }}>SPREAD</div>
            <div className="hidden sm:block px-4 py-3 uppercase text-xs font-bold" style={{
              fontFamily: BRUTALIST_FONTS.mono,
              color: BRUTALIST_COLORS.secondary,
              letterSpacing: '0.1em',
            }}>TREND</div>
            <div className="hidden sm:block px-4 py-3 uppercase text-xs font-bold text-center" style={{
              fontFamily: BRUTALIST_FONTS.mono,
              color: BRUTALIST_COLORS.secondary,
              letterSpacing: '0.1em',
            }}>ACTION</div>

            {/* Rows */}
            {BRUTALIST_TRADING_PAIRS.map((pair, index) => (
              <div key={index} className="trading-pair contents sm:contents">
                <div className="px-4 py-4" style={{ fontFamily: BRUTALIST_FONTS.mono, color: BRUTALIST_COLORS.foreground, fontWeight: 700 }}>
                  {pair.pair.replace('/', '_')}
                </div>
                <div className="px-4 py-4 text-right" style={{ fontFamily: BRUTALIST_FONTS.display, color: BRUTALIST_COLORS.accent }}>
                  {pair.volume}
                </div>
                <div className="px-4 py-4 text-right" style={{ fontFamily: BRUTALIST_FONTS.mono, color: BRUTALIST_COLORS.secondary }}>
                  {pair.spread}
                </div>
                <div className="hidden sm:block px-4 py-4">
                  <svg width="80" height="20" className="inline-block">
                    <path
                      d={generateSparklinePath([Math.random() * 20 + 40, Math.random() * 20 + 50, Math.random() * 20 + 45, Math.random() * 20 + 60])}
                      fill="none"
                      stroke={BRUTALIST_COLORS.success}
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="hidden sm:flex justify-center">
                  <button
                    className="px-4 py-2 text-xs font-bold uppercase border transition-all hover:bg-white hover:text-black"
                    style={{
                      fontFamily: BRUTALIST_FONTS.mono,
                      color: BRUTALIST_COLORS.foreground,
                      borderColor: BRUTALIST_COLORS.foreground,
                      background: 'transparent',
                      letterSpacing: '0.1em',
                      cursor: 'pointer',
                    }}
                  >
                    TRADE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper function to generate sparkline SVG path
function generateSparklinePath(data: number[]): string {
  if (data.length < 2) return '';
  const width = 100;
  const height = 40;
  const padding = 4;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  let path = `M ${padding} ${height - padding - ((data[0] - min) / range) * (height - padding * 2)}`;

  for (let i = 1; i < data.length; i++) {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = height - padding - ((data[i] - min) / range) * (height - padding * 2);
    path += ` L ${x} ${y}`;
  }

  return path;
}
