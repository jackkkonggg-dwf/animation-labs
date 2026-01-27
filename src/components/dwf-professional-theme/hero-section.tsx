'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PROFESSIONAL_HERO_DATA, PROFESSIONAL_ANIMATION_CONFIG } from '@/data/dwf-professional-data';

/**
 * Hero Section - DWF Professional Theme
 * Finance-inspired professional design with trust and sophistication
 *
 * Design Direction:
 * - Deep navy blue (#0a192f) as primary background
 * - Gold (#d4af37) accents for premium feel
 * - Slate gray scale for refined neutrals
 * - Geometric data visualization patterns
 * - Professional typography with Playfair Display for headlines
 * - Subtle animated grid and data viz elements
 */
export function ProfessionalHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;
    const cta = ctaButtonRef.current;
    const metrics = metricsRef.current;

    if (!section || !title) return;

    // Background grid animation
    if (background) {
      const gridLines = background.querySelectorAll('.grid-line');
      gridLines.forEach((line, index) => {
        gsap.fromTo(
          line,
          { opacity: 0 },
          {
            opacity: 0.15,
            duration: 1.5,
            delay: index * 0.1,
            ease: 'power2.out',
          }
        );
      });

      // Floating geometric shapes
      const shapes = background.querySelectorAll('.geo-shape');
      shapes.forEach((shape, index) => {
        gsap.to(shape, {
          rotation: index % 2 === 0 ? 360 : -360,
          duration: 60 + index * 10,
          repeat: -1,
          ease: 'none',
        });
        gsap.to(shape, {
          y: '+=20',
          duration: 3 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Data flow lines
      const dataLines = background.querySelectorAll('.data-flow-line');
      dataLines.forEach((line, index) => {
        gsap.fromTo(
          line.querySelector('.data-flow-dot'),
          { x: '-100%' },
          {
            x: '100%',
            duration: 3 + index * 0.5,
            repeat: -1,
            delay: index * 0.3,
            ease: 'none',
          }
        );
      });
    }

    // Subtitle fade in with slide
    if (subtitle) {
      gsap.set(subtitle, { opacity: 0, y: 30 });
      gsap.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
      });
    }

    // Title text reveal with character splitting
    const splitTextIntoWords = (element: HTMLElement): HTMLSpanElement[] => {
      const text = element.textContent ?? '';
      const words: HTMLSpanElement[] = [];
      element.innerHTML = '';
      text.split(' ').forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'hero-word';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(40px)';
        if (index < text.split(' ').length - 1) {
          span.innerHTML += ' ';
        }
        element.appendChild(span);
        words.push(span);
      });
      return words;
    };

    const words = splitTextIntoWords(title);

    gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: PROFESSIONAL_ANIMATION_CONFIG.hero.textReveal.duration,
      stagger: PROFESSIONAL_ANIMATION_CONFIG.hero.textReveal.stagger,
      ease: 'power3.out',
      delay: 0.5,
    });

    // Description fade in
    if (description) {
      gsap.set(description, { opacity: 0, y: 20 });
      gsap.to(description, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay: 1.2,
        ease: 'power2.out',
      });
    }

    // CTA button entrance
    if (cta) {
      gsap.set(cta, { opacity: 0, y: 20, scale: 0.95 });
      gsap.to(cta, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        delay: 1.5,
        ease: 'power2.out',
      });
    }

    // Metrics cards staggered entrance
    if (metrics) {
      const metricCards = metrics.querySelectorAll('.metric-card');
      gsap.set(metricCards, { opacity: 0, y: 30 });
      gsap.to(metricCards, {
        opacity: 1,
        y: 0,
        duration: PROFESSIONAL_ANIMATION_CONFIG.hero.metricsFade.duration,
        stagger: PROFESSIONAL_ANIMATION_CONFIG.hero.metricsFade.stagger,
        ease: 'power2.out',
        delay: 1.7,
      });
    }

    // Scroll indicator
    const scrollIndicator = section.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      gsap.set(scrollIndicator, { opacity: 0 });
      gsap.to(scrollIndicator, {
        opacity: 1,
        duration: 0.8,
        delay: 2.2,
        ease: 'power2.out',
      });

      gsap.fromTo(
        scrollIndicator.querySelector('.scroll-arrow'),
        { y: 0, opacity: 0.6 },
        { y: 12, opacity: 1, duration: 1.5, repeat: -1, yoyo: true, ease: 'sine.inOut' }
      );
    }

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(words);
      if (cta) gsap.killTweensOf(cta);
      if (scrollIndicator) gsap.killTweensOf(scrollIndicator);
      gsap.killTweensOf('.grid-line');
      gsap.killTweensOf('.geo-shape');
      gsap.killTweensOf('.data-flow-dot');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="professional-hero relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a192f 0%, #0d1b2a 50%, #0a192f 100%)',
      }}
    >
      {/* Professional Geometric Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Subtle grid overlay */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="professionalGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.08"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#professionalGrid)" />
        </svg>

        {/* Animated grid lines */}
        <div className="grid-line absolute top-[20%] left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="grid-line absolute top-[40%] left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />
        <div className="grid-line absolute top-[60%] left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        <div className="grid-line absolute top-[80%] left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/15 to-transparent" />
        <div className="grid-line absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />
        <div className="grid-line absolute top-0 left-[40%] w-px h-full bg-gradient-to-b from-transparent via-amber-500/15 to-transparent" />
        <div className="grid-line absolute top-0 left-[60%] w-px h-full bg-gradient-to-b from-transparent via-amber-500/10 to-transparent" />
        <div className="grid-line absolute top-0 left-[80%] w-px h-full bg-gradient-to-b from-transparent via-amber-500/15 to-transparent" />

        {/* Floating geometric shapes */}
        <div className="geo-shape absolute top-[15%] left-[10%] w-16 h-16 border border-amber-500/10 rotate-45" />
        <div className="geo-shape absolute top-[25%] right-[15%] w-12 h-12 border border-amber-500/10" />
        <div className="geo-shape absolute bottom-[30%] left-[20%] w-20 h-20 border border-amber-500/10 rotate-12" />
        <div className="geo-shape absolute bottom-[20%] right-[25%] w-14 h-14 border border-amber-500/10 rotate-45" />

        {/* Data flow lines */}
        <div className="data-flow-line absolute top-[35%] left-0 w-full h-px overflow-hidden">
          <div className="data-flow-dot w-20 h-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>
        <div className="data-flow-line absolute top-[65%] left-0 w-full h-px overflow-hidden" style={{ animationDelay: '1s' }}>
          <div className="data-flow-dot w-32 h-full bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
        </div>

        {/* Radial gradient overlays for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl md:max-w-6xl mx-auto">
        {/* Elegant badge */}
        <p
          ref={subtitleRef}
          className="text-amber-400/80 text-xs sm:text-sm font-medium tracking-[0.35em] uppercase mb-8"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {PROFESSIONAL_HERO_DATA.subtext}
        </p>

        {/* Main headline with professional typography */}
        <h1
          ref={titleRef}
          className="text-white mb-8 leading-tight"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 30px rgba(0,0,0,0.3)',
          }}
        >
          {PROFESSIONAL_HERO_DATA.headline}
        </h1>

        {/* Description with refined typography */}
        <p
          ref={descriptionRef}
          className="text-slate-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {PROFESSIONAL_HERO_DATA.description}
        </p>

        {/* CTA Button with professional styling */}
        <button
          ref={ctaButtonRef}
          className="group relative px-10 py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-semibold rounded-sm hover:from-amber-500 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-0.5 text-sm sm:text-base tracking-wide"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <span className="relative z-10 flex items-center gap-3">
            {PROFESSIONAL_HERO_DATA.ctaText}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>

        {/* Metrics Display */}
        <div
          ref={metricsRef}
          className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto"
        >
          {PROFESSIONAL_HERO_DATA.metrics.map((metric, index) => (
            <div key={index} className="metric-card text-center">
              <div
                className="text-xl sm:text-2xl font-semibold text-white mb-1"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer">
        <span className="text-slate-500 text-[10px] sm:text-xs tracking-[0.2em] uppercase" style={{ fontFamily: "Inter, sans-serif" }}>
          Scroll
        </span>
        <div className="scroll-arrow w-4 h-8 sm:w-5 sm:h-9 border border-slate-600/50 rounded flex justify-center pt-2">
          <div className="w-0.5 h-2 bg-slate-500 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
