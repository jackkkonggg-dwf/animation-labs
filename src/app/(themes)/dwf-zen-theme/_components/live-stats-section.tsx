'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { LIVE_STATS_DATA, TRADING_PAIRS_DATA, ZEN_COLORS, ANIMATION_CONFIG } from '../_data';

/**
 * Live Stats Section - Live stats with sparkline charts (SVG)
 */
export function LiveStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const statCards = section.querySelectorAll('.stat-card');
    const tableRows = section.querySelectorAll('.table-row');

    gsap.set(statCards, { opacity: 0, y: 30 });
    gsap.set(tableRows, { opacity: 0, x: -20 });

    gsap.to(statCards, {
      opacity: 1,
      y: 0,
      duration: ANIMATION_CONFIG.scroll.duration,
      stagger: 0.12,
      ease: ANIMATION_CONFIG.scroll.ease,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.to(tableRows, {
      opacity: 1,
      x: 0,
      duration: ANIMATION_CONFIG.scroll.duration,
      stagger: 0.06,
      delay: 0.18,
      ease: ANIMATION_CONFIG.scroll.ease,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf([...statCards, ...tableRows]);
    };
  }, []);

  // Generate SVG sparkline path
  const generateSparklinePath = (data: number[]): string => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 100;
    const height = 40;

    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <section
      ref={sectionRef}
      className="live-stats-section relative py-32 md:py-40 px-6"
      style={{ backgroundColor: ZEN_COLORS.background }}
      aria-labelledby="live-stats-heading"
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
            id="live-stats-heading"
            className="text-3xl md:text-4xl font-normal tracking-tight"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              color: ZEN_COLORS.primaryText,
              fontWeight: 400,
            }}
          >
            Live Statistics
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {LIVE_STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className="stat-card p-7 transition-all duration-700"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                border: `1px solid ${ZEN_COLORS.shadow}`,
                boxShadow: `0 2px 16px ${ZEN_COLORS.shadowSoft}`,
              }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-4 font-light"
                style={{ color: ZEN_COLORS.secondaryText, letterSpacing: '0.15em' }}
              >
                {stat.label}
              </p>

              {/* Sparkline chart */}
              <svg
                width="100"
                height="40"
                className="mb-4"
                viewBox="0 0 100 40"
                aria-hidden="true"
              >
                <path
                  d={generateSparklinePath(stat.sparklineData)}
                  fill="none"
                  stroke={stat.trend === 'up' ? ZEN_COLORS.accent : ZEN_COLORS.chart.cefi}
                  strokeWidth="2"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                />
              </svg>

              <p
                className="text-2xl font-normal tabular-nums mb-2"
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  color: ZEN_COLORS.primaryText,
                  fontWeight: 400,
                }}
              >
                {stat.value}
              </p>
              <p
                className={`text-sm font-light ${stat.trend === 'up' ? 'text-green-700' : 'text-red-700'}`}
                style={{ fontWeight: 300 }}
              >
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Trading pairs table */}
        <div className="overflow-hidden">
          <table
            className="w-full"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              border: `1px solid ${ZEN_COLORS.shadow}`,
              boxShadow: `0 2px 16px ${ZEN_COLORS.shadowSoft}`,
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom: `1px solid ${ZEN_COLORS.shadow}`,
                  backgroundColor: 'rgba(200, 85, 61, 0.06)',
                }}
              >
                <th className="text-left p-5 text-xs uppercase tracking-widest font-light" style={{ color: ZEN_COLORS.secondaryText, letterSpacing: '0.15em' }}>
                  Trading Pair
                </th>
                <th className="text-right p-5 text-xs uppercase tracking-widest font-light" style={{ color: ZEN_COLORS.secondaryText, letterSpacing: '0.15em' }}>
                  24H Volume
                </th>
                <th className="text-right p-5 text-xs uppercase tracking-widest font-light" style={{ color: ZEN_COLORS.secondaryText, letterSpacing: '0.15em' }}>
                  Spread
                </th>
              </tr>
            </thead>
            <tbody>
              {TRADING_PAIRS_DATA.map((pair) => (
                <tr
                  key={pair.id}
                  className="table-row"
                  style={{
                    borderBottom: `1px solid ${ZEN_COLORS.shadow}`,
                  }}
                >
                  <td
                    className="p-5 font-medium"
                    style={{
                      fontFamily: "'Noto Serif JP', serif",
                      color: ZEN_COLORS.primaryText,
                      fontWeight: 400,
                    }}
                  >
                    {pair.pair}
                  </td>
                  <td className="p-5 text-right tabular-nums" style={{ color: ZEN_COLORS.secondaryText }}>
                    {pair.volume}
                  </td>
                  <td className="p-5 text-right tabular-nums" style={{ color: ZEN_COLORS.secondaryText }}>
                    {pair.spread}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
