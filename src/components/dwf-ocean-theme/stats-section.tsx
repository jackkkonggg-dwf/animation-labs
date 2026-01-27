'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { STATS_DATA, WAVE_ANIMATION_CONFIG } from '@/data/dwf-homepage-data';
import { calculateOscillatingValue, formatCounterValue } from '@/lib/wave-utils';

/**
 * Stats Section - Mobile Responsive
 */
export function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const container = statsContainerRef.current;
    const background = backgroundRef.current;
    const statCards = container?.querySelectorAll('.stat-card');

    if (!section || !container || !statCards || statCards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // Background animations
    if (background) {
      const pulseShapes = background.querySelectorAll('.pulse-shape');
      pulseShapes.forEach((shape, index) => {
        gsap.to(shape as HTMLElement, {
          scale: 1.2,
          opacity: 0.3,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }

    // Wave counter animations
    statCards.forEach((statCard) => {
      const counter = statCard.querySelector('.stat-counter') as HTMLElement;
      const targetValue = counter?.dataset.value;

      if (!counter || !targetValue) return;

      const value = parseFloat(targetValue);
      const suffix = counter.dataset.suffix || '';

      const counterObj = { value: 0, progress: 0 };

      const counterAnim = gsap.to(counterObj, {
        value: value,
        progress: 1,
        duration: WAVE_ANIMATION_CONFIG.stats.counter.duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: statCard,
          start: 'top 85%',
          end: 'top 40%',
          scrub: 1,
          once: true,
        },
        onUpdate: function () {
          const oscillatedValue = calculateOscillatingValue(
            counterObj.value,
            counterObj.progress,
            WAVE_ANIMATION_CONFIG.stats.counter.oscillationAmplitude
          );
          counter.textContent = formatCounterValue(oscillatedValue, suffix);
        },
        onComplete: function () {
          counter.textContent = formatCounterValue(value, suffix);
        },
      });

      triggers.push(counterAnim.scrollTrigger!);
    });

    // Staggered card reveal
    gsap.set(statCards, {
      opacity: 0,
      y: 40,
      scale: 0.95,
    });

    const revealAnim = gsap.to(statCards, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none reverse',
      },
    });
    triggers.push(revealAnim.scrollTrigger!);

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(statCards);
      gsap.killTweensOf('.pulse-shape');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="stats-section relative w-full py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Animated Gradient Blobs */}
        <div className="pulse-shape absolute top-[5%] left-[0%] right-[0%] mx-auto w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-br from-orange-500/15 to-amber-500/8 rounded-full blur-3xl" />
        <div className="pulse-shape absolute bottom-[10%] left-[5%] sm:left-[10%] w-48 h-48 sm:w-72 sm:w-72 bg-gradient-to-br from-amber-500/12 to-orange-400/8 rounded-full blur-3xl" style={{ animationDelay: '0.5s' }} />

        {/* Animated Wave Lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <path d="M0,400 Q360,250 720,400 T1440,400" fill="none" stroke="#ff6b00" strokeWidth="2">
            <animate attributeName="d" dur="10s" repeatCount="indefinite" values="M0,400 Q360,250 720,400 T1440,400;M0,400 Q360,550 720,400 T1440,400;M0,400 Q360,250 720,400 T1440,400" />
          </path>
        </svg>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 107, 0, 0.5) 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Content */}
      <div ref={statsContainerRef} className="relative z-10 w-full max-w-5xl md:max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 bg-orange-500/10 text-orange-400 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-full mb-3 sm:mb-4 border border-orange-500/20">
            Our Impact
          </span>
          <h2
            className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Numbers That Matter
          </h2>
          <p
            className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl sm:max-w-2xl mx-auto"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Measurable results across the blockchain ecosystem
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {STATS_DATA.map((stat) => (
            <div
              key={stat.id}
              className="stat-card relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-700/50 text-center shadow-xl overflow-hidden group"
            >
              {/* Animated Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-transparent to-amber-500/0 group-hover:from-orange-500/10 group-hover:to-amber-500/5 transition-all duration-700" />

              {/* Corner Accent */}
              <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 border-l-2 border-t-2 border-orange-500/30 rounded-tl-xl sm:rounded-tl-2xl" />

              {/* Stat Counter */}
              <div className="relative mb-3 sm:mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 blur-xl sm:blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
                <div
                  className="stat-counter relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  data-value={stat.value.toString()}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>
              </div>

              {/* Stat Label */}
              <h3
                className="text-white text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 relative"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {stat.label}
              </h3>

              {/* Stat Description */}
              <p
                className="text-slate-400 text-xs sm:text-sm relative"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Wave Decoration */}
      <svg
        className="absolute bottom-0 left-0 w-full h-24 sm:h-32 opacity-10"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 Q240,20 480,60 T960,60 T1440,60 L1440,120 L0,120 Z"
          fill="url(#stats-wave-gradient)"
        />
        <defs>
          <linearGradient id="stats-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b00" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff6b00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff6b00" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
