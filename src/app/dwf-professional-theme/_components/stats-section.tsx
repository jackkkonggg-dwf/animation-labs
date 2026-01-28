'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PROFESSIONAL_STATS_DATA, PROFESSIONAL_ANIMATION_CONFIG } from '../_data';

/**
 * Stats Section - DWF Professional Theme
 * Animated counters with professional data visualization
 */
export function ProfessionalStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersComplete, setCountersComplete] = useState(false);

  useGSAP(() => {
    const section = sectionRef.current;
    const stats = statsRef.current?.querySelectorAll('.stat-card');
    const header = headerRef.current;

    if (!section || !stats || stats.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // Header animation
    if (header) {
      const title = header.querySelector('.section-title');
      const subtitle = header.querySelector('.section-subtitle');

      gsap.set([title, subtitle], { opacity: 0, y: 30 });

      triggers.push(
        ScrollTrigger.create({
          trigger: header,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(title, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
            gsap.to(subtitle, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' });
          },
        })
      );
    }

    // Stats cards reveal
    gsap.set(stats, { opacity: 0, scale: 0.95 });

    gsap.to(stats, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: statsRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
        onEnter: () => {
          // Trigger counter animations
          stats.forEach((statCard, index) => {
            const counterElement = statCard.querySelector('.stat-counter');
            const data = PROFESSIONAL_STATS_DATA[index];
            if (counterElement && data) {
              animateCounter(counterElement as HTMLElement, data, index);
            }
          });
        },
      },
    });

    // Animated trend lines
    stats.forEach((stat) => {
      const trendLine = stat.querySelector('.trend-line');
      if (trendLine) {
        gsap.fromTo(
          trendLine,
          { width: 0 },
          {
            width: '100%',
            duration: PROFESSIONAL_ANIMATION_CONFIG.stats.trendLine.duration,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stat,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(stats);
    };
  }, []);

  const animateCounter = (element: HTMLElement, data: typeof PROFESSIONAL_STATS_DATA[0], _index: number) => {
    const { value, suffix, prefix } = data;
    const duration = PROFESSIONAL_ANIMATION_CONFIG.stats.counter.duration * 1000;
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      const currentValue = startValue + (value - startValue) * easedProgress;

      // Format based on value type
      let displayValue: string;
      if (value >= 1) {
        displayValue = Math.floor(currentValue).toLocaleString();
      } else {
        displayValue = currentValue.toFixed(1);
      }

      element.textContent = `${prefix || ''}${displayValue}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCountersComplete(true);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden"
      style={{
        background: '#0a192f',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl text-white mb-6" style={{ fontFamily: "Playfair Display, serif", fontWeight: 500, letterSpacing: '-0.02em' }}>
            By The Numbers
          </h2>
          <p className="section-subtitle text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            Measurable impact delivered through disciplined execution and strategic partnerships.
          </p>
        </div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PROFESSIONAL_STATS_DATA.map((stat, _index) => (
            <div
              key={stat.id}
              className="stat-card relative bg-slate-900/20 border border-slate-700/30 p-8 text-center hover:border-amber-500/30 transition-all duration-300"
            >
              {/* Trend indicator */}
              {stat.trend === 'up' && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-emerald-500">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              )}

              {/* Counter */}
              <div className="mb-4">
                <div
                  className="stat-counter text-4xl md:text-5xl font-semibold text-white"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {stat.prefix || ''}{0}{stat.suffix}
                </div>
              </div>

              {/* Label */}
              <div className="text-sm text-slate-400 mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-xs text-slate-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                {stat.description}
              </div>

              {/* Animated line */}
              <div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-amber-500 to-amber-600 trend-line" />

              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-amber-500/20" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
