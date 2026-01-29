'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

interface ThemeVersion {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  path: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const THEMES: ThemeVersion[] = [
  {
    id: 'professional',
    title: 'Professional',
    subtitle: '01',
    description: 'Finance-inspired design with trust, sophistication, and institutional elegance',
    path: '/dwf-professional-theme',
    accentColor: '#d4af37',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-slate-900',
  },
  {
    id: 'ocean',
    title: 'Ocean',
    subtitle: '02',
    description: 'Wave-inspired animations with fluid motion and deep blue gradients',
    path: '/dwf-ocean-theme',
    accentColor: '#0ea5e9',
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-blue-900',
  },
  {
    id: 'futuristic',
    title: 'Futuristic',
    subtitle: '03',
    description: 'Cyberpunk theme with glitch effects, matrix rain, and holographic UI',
    path: '/dwf-futuristic-theme',
    accentColor: '#00ffff',
    gradientFrom: 'from-cyan-400',
    gradientTo: 'to-purple-900',
  },
  {
    id: 'brutalist',
    title: 'Brutalist',
    subtitle: '04',
    description: 'Industrial design with raw aesthetics, bold typography, and acid green accents',
    path: '/dwf-brutalist-theme',
    accentColor: '#ccff00',
    gradientFrom: 'from-lime-400',
    gradientTo: 'to-zinc-900',
  },
  {
    id: 'zen',
    title: 'Zen',
    subtitle: '05',
    description: 'Minimalist harmony with serene washi paper tones and balanced spatial design',
    path: '/dwf-zen-theme',
    accentColor: '#f5f5f0',
    gradientFrom: 'from-stone-200',
    gradientTo: 'to-stone-400',
  },
];

export function ThemeVersionsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const cards = cardsRef.current?.querySelectorAll('.theme-card');

    if (!container || !cards || cards.length === 0) return;

    // Animate header with diagonal slide
    gsap.fromTo(
      headerRef.current,
      { x: -100, opacity: 0, rotationY: -15 },
      {
        x: 0,
        opacity: 1,
        rotationY: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Staggered card entrance with perspective
    gsap.set(cards, {
      opacity: 0,
      y: 80,
      rotationX: 15,
      transformPerspective: 1000,
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardsRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // CRITICAL: Cleanup is automatic with useGSAP - all tweens and triggers
    // in this context are reverted when component unmounts
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-zinc-950 py-24 md:py-32 px-4 md:px-6 overflow-hidden"
    >
      {/* Diagonal background layers */}
      <div className="absolute inset-0">
        {/* Ocean gradient mesh - subtle */}
        <div className="absolute top-0 right-0 w-3/4 h-1/2 bg-gradient-to-bl from-blue-950/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/3 bg-gradient-to-tr from-cyan-950/10 via-transparent to-transparent" />
      </div>

      {/* Animated wave lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-20 left-0 w-full h-32 opacity-10" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 V120 H0 Z"
            fill="url(#wave-gradient)"
          >
            <animate
              attributeName="d"
              dur="8s"
              repeatCount="indefinite"
              values="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 V120 H0 Z;M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 V120 H0 Z;M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 V120 H0 Z"
            />
          </path>
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] noise-texture pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Striking diagonal header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          {/* Diagonal badge */}
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500" />
            <span className="text-xs md:text-sm text-cyan-500 uppercase tracking-[0.4em] font-medium">
              Visual Identities
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500" />
          </div>

          {/* Large typography with perspective */}
          <div className="relative">
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-zinc-100 tracking-tighter leading-none">
              Theme
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600">
                Versions
              </span>
            </h2>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 left-0 w-32 h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
            <div className="absolute top-4 right-0 flex gap-1">
              <div className="w-2 h-2 bg-cyan-500/50 rotate-45" />
              <div className="w-2 h-2 bg-cyan-500/30 rotate-45" />
              <div className="w-2 h-2 bg-cyan-500/20 rotate-45" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="mt-8 text-lg md:text-xl text-zinc-500 max-w-2xl font-light leading-relaxed">
            Distinct visual experiences crafted for different moments. Each theme transforms the
            interface with its own atmosphere and motion language.
          </p>
        </div>

        {/* Theme cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {THEMES.map((theme) => (
            <Link key={theme.id} href={theme.path} scroll={true}>
              <div
                className="theme-card group relative h-[420px] bg-zinc-900/40 backdrop-blur-sm
                  border border-white/5 overflow-hidden cursor-pointer transition-all duration-500"
                style={
                  {
                    '--theme-accent': theme.accentColor,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${theme.accentColor}30`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                {/* Animated gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} opacity-0 group-hover:opacity-20 transition-opacity duration-700`} />

                {/* Preview area with thematic visual */}
                <div className="relative h-56 overflow-hidden">
                  {/* Animated wave visualization for each theme */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`gradient-${theme.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor={theme.accentColor} stopOpacity="0.6" />
                          <stop offset="100%" stopColor={theme.accentColor} stopOpacity="0.1" />
                        </linearGradient>
                      </defs>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <path
                          key={i}
                          d={`M0,${100 + i * 15} Q100,${80 + i * 10} 200,${100 + i * 15} T400,${100 + i * 15} V200 H0 Z`}
                          fill={`url(#gradient-${theme.id})`}
                          opacity={0.4 - i * 0.05}
                          className="transition-all duration-700 group-hover:translate-y-[-10px]"
                          style={{
                            animationDelay: `${i * 0.2}s`,
                          }}
                        >
                          <animate
                            attributeName="d"
                            dur={`${4 + i}s`}
                            repeatCount="indefinite"
                            values={`M0,${100 + i * 15} Q100,${80 + i * 10} 200,${100 + i * 15} T400,${100 + i * 15} V200 H0 Z;M0,${100 + i * 15} Q100,${120 + i * 10} 200,${100 + i * 15} T400,${100 + i * 15} V200 H0 Z;M0,${100 + i * 15} Q100,${80 + i * 10} 200,${100 + i * 15} T400,${100 + i * 15} V200 H0 Z`}
                          />
                        </path>
                      ))}
                    </svg>
                  </div>

                  {/* Floating number */}
                  <div className="absolute top-4 left-4 text-[72px] font-black text-white/5 group-hover:text-white/80 transition-colors duration-500 leading-none">
                    {theme.subtitle}
                  </div>

                  {/* Theme status badge */}
                  {theme.id === 'futuristic' && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30">
                      <span className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">Live</span>
                    </div>
                  )}
                </div>

                {/* Card content */}
                <div className="relative p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3
                    className="text-3xl font-black mb-2 uppercase tracking-tight"
                  >
                    <span
                      style={
                        {
                          color: 'rgb(244 244 245)',
                          backgroundImage: 'transparent',
                          backgroundClip: 'initial',
                          WebkitBackgroundClip: 'initial',
                          transition: 'all 0.3s ease',
                        } as React.CSSProperties
                      }
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, {
                          color: 'transparent',
                          backgroundImage: `linear-gradient(to right, ${theme.accentColor}66, ${theme.accentColor}33)`,
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                        });
                      }}
                      onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, {
                          color: 'rgb(244 244 245)',
                          backgroundImage: 'transparent',
                          backgroundClip: 'initial',
                          WebkitBackgroundClip: 'initial',
                        });
                      }}
                    >
                      {theme.title}
                    </span>
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-500 text-sm leading-relaxed flex-1">
                    {theme.description}
                  </p>

                  {/* Explore indicator */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                    <span className="text-xs text-zinc-600 uppercase tracking-widest font-medium">
                      Explore Theme
                    </span>
                    <div
                      className="w-10 h-10 flex items-center justify-center bg-zinc-900"
                      style={
                        {
                          '--theme-accent': `${theme.accentColor}a0`,
                        } as React.CSSProperties
                      }>
                      <svg
                        className="w-4 h-4 text-zinc-500 group-hover:text-(--theme-accent) transition-colors duration-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16">
                  <div
                    className="absolute top-0 right-0 h-0.5 transition-all duration-500 group-hover:w-16"
                    style={
                      {
                        width: '2rem',
                        background: `linear-gradient(to left, ${theme.accentColor}80, transparent)`,
                      } as React.CSSProperties
                    }
                  />
                  <div
                    className="absolute top-0 right-0 w-0.5 transition-all duration-500 group-hover:h-16"
                    style={
                      {
                        height: '2rem',
                        background: `linear-gradient(to bottom, ${theme.accentColor}80, transparent)`,
                      } as React.CSSProperties
                    }
                  />
                </div>

                {/* Ripple effect on hover */}
                <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div
                    className="absolute top-1/2 left-1/2 rounded-full transition-all duration-700 ease-out group-hover:w-[600px] group-hover:h-[600px] group-hover:-translate-x-1/2 group-hover:-translate-y-1/2"
                    style={
                      {
                        width: 0,
                        height: 0,
                        backgroundColor: `${theme.accentColor}1a`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* More coming indicator */}
        <div className="mt-16 flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-zinc-700" />
          <div className="flex items-center gap-2 text-zinc-600">
            <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em]">More themes coming soon</span>
          </div>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-zinc-700" />
        </div>
      </div>
    </section>
  );
}
