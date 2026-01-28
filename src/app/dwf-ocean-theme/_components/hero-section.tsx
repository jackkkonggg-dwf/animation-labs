'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import { HERO_DATA, WAVE_ANIMATION_CONFIG } from '../_data';
import { calculateWaveYOffset } from '@/app/lib/wave-utils';
import { splitElementToChars } from '@/app/lib/text-split-utils';

/**
 * Hero Section - Ocean Wave Theme
 * DWF = Digital Wave Finance
 *
 * Design Direction: Immersive underwater experience
 * - Dramatic light rays penetrating from surface
 * - Floating bubbles and particles
 * - Animated wave layers at bottom
 * - Shimmer effects and caustic light patterns
 * - Wave text reveal animation
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const background = backgroundRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const description = descriptionRef.current;
    const cta = ctaButtonRef.current;

    if (!section || !title) return;

    const triggers: ScrollTrigger[] = [];

    // Background animations
    if (background) {
      const waveLayers = background.querySelectorAll('.wave-layer');
      const particles = background.querySelectorAll('.wave-particle');
      const bubbles = background.querySelectorAll('.bubble');
      const lightRays = background.querySelectorAll('.light-ray');
      const caustics = background.querySelectorAll('.caustic');

      // Animate wave layers
      waveLayers.forEach((layer, index) => {
        gsap.to(layer as HTMLElement, {
          x: index % 2 === 0 ? '-=40' : '+=40',
          duration: 10 + index * 3,
          repeat: -1,
          ease: 'none',
        });
      });

      // Floating particles
      particles.forEach((particle, index) => {
        gsap.to(particle as HTMLElement, {
          y: '-=40',
          x: `+=${Math.sin(index) * 20}`,
          opacity: 0.8,
          duration: 4 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Rising bubbles
      bubbles.forEach((bubble, index) => {
        gsap.to(bubble as HTMLElement, {
          y: '-=300',
          x: `+=${Math.sin(index) * 50}`,
          opacity: 0,
          scale: 0.3,
          duration: 10 + index * 1.5,
          repeat: -1,
          delay: index * 0.8,
          ease: 'sine.inOut',
        });
      });

      // Light rays gentle sway
      lightRays.forEach((ray, index) => {
        gsap.to(ray as HTMLElement, {
          rotation: index % 2 === 0 ? 3 : -3,
          duration: 8 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Caustic light patterns
      caustics.forEach((caustic, index) => {
        gsap.to(caustic as HTMLElement, {
          scale: 1.2,
          duration: 2.5 + index,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }

    // Subtitle fade in
    if (subtitle) {
      gsap.set(subtitle, { opacity: 0, y: 20 });
      gsap.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
      });
    }

    // Text splitting for wave reveal
    const chars = splitElementToChars(title);

    gsap.set(chars, (i: number) => {
      const yOffset = calculateWaveYOffset(
        i,
        chars.length,
        WAVE_ANIMATION_CONFIG.hero.textReveal.amplitude,
        WAVE_ANIMATION_CONFIG.hero.textReveal.frequency
      );
      return {
        y: yOffset + 60,
        rotationX: -60,
        opacity: 0,
      };
    });

    gsap.to(chars, {
      y: 0,
      rotationX: 0,
      opacity: 1,
      duration: WAVE_ANIMATION_CONFIG.hero.textReveal.duration,
      stagger: {
        each: WAVE_ANIMATION_CONFIG.hero.textReveal.stagger,
        from: 'center',
      },
      ease: 'power3.out',
      delay: 0.5,
    });

    // Description fade in
    if (description) {
      gsap.set(description, { opacity: 0, y: 30 });
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
      gsap.set(cta, { opacity: 0, y: 30, scale: 0.9 });
      gsap.to(cta, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: 1.5,
        ease: 'back.out(1.7)',
      });
    }

    // Magnetic button (desktop only)
    if (cta && window.innerWidth > 768) {
      const magneticRadius = 80;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = cta.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

        if (distance < magneticRadius) {
          const moveX = (deltaX / magneticRadius) * 20;
          const moveY = (deltaY / magneticRadius) * 20;
          gsap.to(cta, { x: moveX, y: moveY, duration: 0.3, ease: 'power2.out' });
        } else {
          gsap.to(cta, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(cta, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      };

      cta.addEventListener('mousemove', handleMouseMove);
      cta.addEventListener('mouseleave', handleMouseLeave);
    }

    // Scroll indicator
    const scrollIndicator = section.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      gsap.set(scrollIndicator, { opacity: 0 });
      gsap.to(scrollIndicator, {
        opacity: 1,
        duration: 0.8,
        delay: 2,
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
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(chars);
      if (cta) gsap.killTweensOf(cta);
      if (scrollIndicator) gsap.killTweensOf(scrollIndicator);
      gsap.killTweensOf('.wave-particle');
      gsap.killTweensOf('.bubble');
      gsap.killTweensOf('.light-ray');
      gsap.killTweensOf('.caustic');
      gsap.killTweensOf('.wave-layer');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-950 via-blue-950 to-cyan-950"
    >
      {/* Immersive Underwater Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Deep ocean gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(20,184,166,0.08)_0%,transparent_50%)]" />

        {/* Dramatic light rays from surface */}
        <svg className="light-ray absolute top-0 left-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hray1" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.5" />
              <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hray2" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#0ea5e9" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hray3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
            </linearGradient>
            <filter id="hrayBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
            </filter>
          </defs>
          {/* Main central ray */}
          <path d="M600,-100 L450,900 L850,900 L750,-100 Z" fill="url(#hray1)" filter="url(#hrayBlur)" />
          {/* Left ray */}
          <path d="M150,-100 L50,900 L400,900 L300,-100 Z" fill="url(#hray2)" filter="url(#hrayBlur)" />
          {/* Right ray */}
          <path d="M1250,-100 L1100,900 L1400,900 L1350,-100 Z" fill="url(#hray3)" filter="url(#hrayBlur)" />
        </svg>

        {/* Secondary softer rays */}
        <svg className="light-ray absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hray4" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#a5f3fc" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0" />
            </linearGradient>
            <filter id="hrayBlur2">
              <feGaussianBlur in="SourceGraphic" stdDeviation="35" />
            </filter>
          </defs>
          <path d="M900,-100 L800,900 L1100,900 L1000,-100 Z" fill="url(#hray4)" filter="url(#hrayBlur2)" />
        </svg>

        {/* Caustic light patterns */}
        <div className="caustic absolute top-[15%] left-[20%] w-48 h-48 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="caustic absolute top-[25%] right-[25%] w-64 h-64 bg-blue-400/8 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="caustic absolute bottom-[30%] left-[15%] w-56 h-56 bg-teal-400/8 rounded-full blur-3xl" style={{ animationDelay: '2s' }} />

        {/* Rising bubbles */}
        <div className="bubble absolute bottom-[5%] left-[10%] w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-cyan-300/50 to-blue-400/40 rounded-full blur-[1px]" />
        <div className="bubble absolute bottom-[10%] left-[25%] w-3 h-3 sm:w-5 sm:h-5 bg-gradient-to-br from-cyan-200/40 to-teal-300/30 rounded-full blur-[1px]" style={{ animationDelay: '0.5s' }} />
        <div className="bubble absolute bottom-[8%] right-[15%] w-5 h-5 sm:w-7 sm:h-7 bg-gradient-to-br from-blue-300/45 to-cyan-400/35 rounded-full blur-[1px]" style={{ animationDelay: '1s' }} />
        <div className="bubble absolute bottom-[15%] right-[25%] w-3 h-3 sm:w-5 sm:h-5 bg-gradient-to-br from-teal-300/35 to-cyan-400/25 rounded-full blur-[1px]" style={{ animationDelay: '1.5s' }} />
        <div className="bubble absolute bottom-[20%] left-[40%] w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-cyan-400/40 to-blue-500/30 rounded-full blur-[1px]" style={{ animationDelay: '0.8s' }} />
        <div className="bubble absolute bottom-[12%] right-[8%] w-2 h-2 sm:w-4 sm:h-4 bg-gradient-to-br from-cyan-300/30 to-teal-400/20 rounded-full blur-[1px]" style={{ animationDelay: '2s' }} />

        {/* Floating wave particles */}
        <div className="wave-particle absolute top-[20%] left-[8%] w-2 h-2 bg-cyan-400/40 rounded-full blur-[0.5px]" />
        <div className="wave-particle absolute top-[35%] right-[12%] w-1.5 h-1.5 bg-blue-400/35 rounded-full blur-[0.5px]" style={{ animationDelay: '0.5s' }} />
        <div className="wave-particle absolute top-[50%] left-[18%] w-2.5 h-2.5 bg-teal-400/35 rounded-full blur-[0.5px]" style={{ animationDelay: '1s' }} />
        <div className="wave-particle absolute top-[65%] right-[8%] w-1.5 h-1.5 bg-cyan-300/40 rounded-full blur-[0.5px]" style={{ animationDelay: '1.5s' }} />
        <div className="wave-particle absolute top-[45%] right-[25%] w-2 h-2 bg-blue-300/35 rounded-full blur-[0.5px]" style={{ animationDelay: '2s' }} />
        <div className="wave-particle absolute top-[75%] left-[30%] w-1.5 h-1.5 bg-teal-300/40 rounded-full blur-[0.5px]" style={{ animationDelay: '2.5s' }} />

        {/* Animated wave layers at bottom */}
        <svg className="wave-layer absolute bottom-0 left-0 w-full h-48 opacity-20" viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path d="M0,75 Q360,40 720,75 T1440,75 V150 H0 Z" fill="url(#hwave1)" />
          <defs>
            <linearGradient id="hwave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="wave-layer absolute bottom-0 left-0 w-full h-32 opacity-12" style={{ animationDelay: '1s' }} viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 Q240,30 480,50 T960,50 T1440,50 V100 H0 Z" fill="#22d3ee" />
        </svg>

        <svg className="wave-layer absolute bottom-0 left-0 w-full h-24 opacity-8" style={{ animationDelay: '2s' }} viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 Q180,25 360,40 T720,40 T1080,40 T1440,40 V80 H0 Z" fill="#67e8f9" />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-4xl md:max-w-6xl mx-auto">
        <p
          ref={subtitleRef}
          className="text-cyan-400 text-xs sm:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] uppercase mb-6 sm:mb-8"
        >
          {HERO_DATA.subtext}
        </p>

        <h1
          ref={titleRef}
          className="hero-title text-white mb-8 sm:mb-10 leading-[0.95] sm:leading-[0.9]"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(2.5rem, 9vw, 5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            perspective: '800px',
            textShadow: '0 0 80px rgba(6,182,212,0.4), 0 0 120px rgba(59,130,246,0.2)',
          }}
        >
          {HERO_DATA.headline}
        </h1>

        <p
          ref={descriptionRef}
          className="text-cyan-100/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {HERO_DATA.description}
        </p>

        <button
          ref={ctaButtonRef}
          className="group relative px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all duration-500 shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:scale-105 text-sm sm:text-base tracking-wide"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="relative z-10">{HERO_DATA.ctaText}</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-blue-400/50 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer">
        <span className="text-cyan-400/70 text-[10px] sm:text-xs tracking-[0.2em] uppercase">Scroll</span>
        <div className="scroll-arrow w-5 h-9 sm:w-6 sm:h-10 border-2 border-cyan-400/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
