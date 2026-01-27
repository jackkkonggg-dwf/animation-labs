'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import { PROFESSIONAL_PORTFOLIO_DATA, PROFESSIONAL_ANIMATION_CONFIG } from '../_data';

/**
 * Portfolio Section - DWF Professional Theme
 * Clean, professional portfolio cards with subtle interactions
 */
export function ProfessionalPortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const cards = gridRef.current?.querySelectorAll('.portfolio-card');
    const header = headerRef.current;

    if (!section || !cards || cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // Header animation
    if (header) {
      const badge = header.querySelector('.section-badge');
      const title = header.querySelector('.section-title');
      const subtitle = header.querySelector('.section-subtitle');

      gsap.set([badge, title, subtitle], { opacity: 0, y: 30 });

      triggers.push(
        ScrollTrigger.create({
          trigger: header,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(badge, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
            gsap.to(title, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' });
            gsap.to(subtitle, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power2.out' });
          },
        })
      );
    }

    // Cards grid reveal
    gsap.set(cards, {
      opacity: 0,
      y: 40,
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: PROFESSIONAL_ANIMATION_CONFIG.portfolio.cardReveal.duration,
      stagger: PROFESSIONAL_ANIMATION_CONFIG.portfolio.cardReveal.stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0a192f 0%, #0d1b2a 50%, #0a192f 100%)',
      }}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #d4af37 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 md:mb-20">
          <div className="section-badge inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="text-xs md:text-sm text-amber-500/80 uppercase tracking-[0.35em] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
              Portfolio Highlights
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          <h2 className="section-title text-4xl md:text-5xl lg:text-6xl text-white mb-6" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500, letterSpacing: '-0.02em' }}>
            Recent Developments
          </h2>

          <p className="section-subtitle text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Strategic investments, partnerships, and initiatives driving digital asset adoption.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROFESSIONAL_PORTFOLIO_DATA.map((item, index) => (
            <div
              key={item.id}
              className="portfolio-card group relative bg-slate-900/30 border border-slate-700/30 p-6 hover:border-amber-500/30 transition-all duration-300 cursor-pointer"
            >
              {/* Category badge */}
              <div className="absolute top-6 left-6">
                <span className="text-xs uppercase tracking-wider text-amber-500/80" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.category}
                </span>
              </div>

              {/* Date */}
              <div className="absolute top-6 right-6 text-xs text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                {item.date}
              </div>

              {/* Content */}
              <div className="pt-8">
                {/* Title */}
                <h3
                  className="text-lg text-white mb-3 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2"
                  style={{ fontFamily: 'Playfair Display, serif', fontWeight: 500 }}
                >
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.excerpt}
                </p>

                {/* Metrics */}
                {item.metrics && item.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-slate-700/30">
                    {item.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="text-lg font-semibold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-slate-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-slate-800/50 text-slate-400 border border-slate-700/30"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/0 transition-all duration-300 pointer-events-none" />

              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-300" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-amber-500/20 group-hover:border-amber-500/40 transition-colors duration-300" />

              {/* Link arrow */}
              <div className="absolute bottom-6 right-6 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-4 h-4 text-amber-500 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            className="group px-8 py-3 bg-transparent border border-amber-500/30 text-amber-500 font-medium rounded-sm hover:bg-amber-500 hover:text-white transition-all duration-300 text-sm tracking-wide"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="flex items-center gap-3">
              View Full Portfolio
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
