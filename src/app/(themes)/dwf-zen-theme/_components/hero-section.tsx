'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { HERO_DATA, ZEN_COLORS, ANIMATION_CONFIG } from '../_data';

interface CherryBlossomParticle {
  element: HTMLDivElement;
  x: number;
  y: number;
  speed: number;
  size: number;
  swayOffset: number;
  swayPhase: number;
  color: string;
}

/**
 * Hero Section - Japanese-inspired minimalist hero
 * Features: Cherry blossom particle system, metric cards with staggered fade-ins
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // Cherry blossom particle system
  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = particlesRef.current;
    if (!container) return;

    const particles: CherryBlossomParticle[] = [];
    const colors = ZEN_COLORS.cherryBlossoms;
    const config = ANIMATION_CONFIG.cherryBlossom;

    // Create particles
    for (let i = 0; i < config.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'cherry-blossom-particle';
      particle.setAttribute('aria-hidden', 'true');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * (config.maxSize - config.minSize) + config.minSize}px;
        height: ${Math.random() * (config.maxSize - config.minSize) + config.minSize}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50% 0 50% 50%;
        opacity: ${Math.random() * 0.3 + 0.15};
        pointer-events: none;
        z-index: 1;
        filter: blur(0.5px);
      `;
      container.appendChild(particle);

      particles.push({
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speed: Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed,
        size: parseFloat(particle.style.width),
        swayOffset: Math.random() * config.swayAmplitude,
        swayPhase: Math.random() * Math.PI * 2,
        color: particle.style.background,
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      particles.forEach(p => {
        p.x += p.speed;
        p.swayPhase += config.swayFrequency;
        const sway = Math.sin(p.swayPhase) * config.swayAmplitude;

        // Wrap around screen
        if (p.x > window.innerWidth + 50) {
          p.x = -50;
          p.y = Math.random() * window.innerHeight;
        }

        p.element.style.transform = `translate(${p.x + sway}px, ${p.y}px) rotate(${p.swayPhase * 20}deg)`;
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      particles.forEach(p => p.element.remove());
    };
  }, [prefersReducedMotion]);

  // GSAP animations
  useGSAP(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const metricsContainer = metricsRef.current;

    if (!section) return;

    // Title animation - slow fade from top
    if (title) {
      gsap.set(title, { opacity: 0, y: -30 });
      gsap.to(title, {
        opacity: 1,
        y: 0,
        duration: 1.32,
        ease: ANIMATION_CONFIG.scroll.ease,
      });
    }

    // Subtitle animation
    if (subtitle) {
      gsap.set(subtitle, { opacity: 0, y: 15 });
      gsap.to(subtitle, {
        opacity: 1,
        y: 0,
        duration: 1.08,
        delay: 0.24,
        ease: ANIMATION_CONFIG.scroll.ease,
      });
    }

    // Metric cards - staggered fade-in
    if (metricsContainer) {
      const cards = metricsContainer.querySelectorAll('.metric-card');
      gsap.set(cards, { opacity: 0, y: 25 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.84,
        stagger: (index) => HERO_DATA.metrics[index].delay / 2000,
        ease: ANIMATION_CONFIG.scroll.ease,
      });
    }

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative min-h-screen w-full flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: ZEN_COLORS.background }}
      aria-label="Hero section"
    >
      {/* Cherry blossom particles container */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" aria-hidden="true" />

      {/* Subtle gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(200, 85, 61, 0.03) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Vertical accent line */}
        <div
          className="mx-auto mb-8 w-px"
          style={{ height: '60px', backgroundColor: ZEN_COLORS.accent, opacity: 0.4 }}
          aria-hidden="true"
        />

        {/* Title */}
        <h1
          ref={titleRef}
          className="title text-5xl md:text-7xl lg:text-8xl font-medium mb-8 tracking-tight"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            color: ZEN_COLORS.primaryText,
            fontWeight: 400,
          }}
        >
          {HERO_DATA.title}
        </h1>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          className="subtitle mb-20"
        >
          <p
            className="text-lg md:text-xl tracking-[0.3em] uppercase mb-5 font-light"
            style={{
              fontFamily: "'Noto Serif JP', serif",
              color: ZEN_COLORS.accent,
              letterSpacing: '0.35em',
              fontWeight: 300,
            }}
          >
            {HERO_DATA.subtitle}
          </p>
          <p
            className="text-sm md:text-base max-w-xl mx-auto leading-relaxed"
            style={{
              color: ZEN_COLORS.secondaryText,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {HERO_DATA.description}
          </p>
        </div>

        {/* Metric cards */}
        <div
          ref={metricsRef}
          className="metrics-grid grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto"
        >
          {HERO_DATA.metrics.map((metric) => (
            <div
              key={metric.id}
              className="metric-card p-7 md:p-9 transition-all duration-700"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                border: `1px solid ${ZEN_COLORS.shadow}`,
                boxShadow: `0 2px 16px ${ZEN_COLORS.shadowSoft}`,
                backdropFilter: 'blur(8px)',
              }}
            >
              <p
                className="text-xl md:text-2xl lg:text-3xl font-normal mb-3 tabular-nums"
                style={{
                  fontFamily: "'Noto Serif JP', serif",
                  color: ZEN_COLORS.primaryText,
                  fontWeight: 400,
                }}
              >
                {metric.value}
              </p>
              <p
                className="text-xs uppercase tracking-widest leading-relaxed"
                style={{
                  color: ZEN_COLORS.secondaryText,
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '0.15em',
                }}
              >
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative corner elements - more refined */}
      <div
        className="absolute top-16 left-16 w-12 h-12 border-l border-t opacity-15 hidden md:block"
        style={{ borderColor: ZEN_COLORS.accent }}
        aria-hidden="true"
      />
      <div
        className="absolute top-16 right-16 w-12 h-12 border-r border-t opacity-15 hidden md:block"
        style={{ borderColor: ZEN_COLORS.accent }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 left-16 w-12 h-12 border-l border-b opacity-15 hidden md:block"
        style={{ borderColor: ZEN_COLORS.accent }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-16 right-16 w-12 h-12 border-r border-b opacity-15 hidden md:block"
        style={{ borderColor: ZEN_COLORS.accent }}
        aria-hidden="true"
      />
    </section>
  );
}
