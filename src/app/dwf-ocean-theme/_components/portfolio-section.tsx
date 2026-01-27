'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import { PORTFOLIO_DATA, WAVE_ANIMATION_CONFIG } from '../_data';
import type { PortfolioItem } from '../_data';

/**
 * Portfolio Section - Ocean Wave Theme
 * DWF = Digital Wave Finance
 *
 * Design Direction: Vibrant ocean surface with dynamic wave animations
 * - Glassmorphism cards with iridescent borders
 * - Wave-staggered grid reveal animations
 * - Floating particles and light rays
 * - Shimmer effects on hover
 */
export function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const background = backgroundRef.current;
    const cards = grid?.querySelectorAll('.portfolio-card');

    if (!section || !grid || !cards || cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // Background animations
    if (background) {
      const floatingBubbles = background.querySelectorAll('.bubble');
      const lightRays = background.querySelectorAll('.light-ray');
      const waveParticles = background.querySelectorAll('.wave-particle');
      const waveLayers = background.querySelectorAll('.wave-layer');

      // Floating bubbles rising
      floatingBubbles.forEach((bubble, index) => {
        gsap.to(bubble as HTMLElement, {
          y: '-=200',
          x: `+=${Math.sin(index) * 40}`,
          opacity: 0,
          scale: 0.5,
          duration: 8 + index * 1,
          repeat: -1,
          delay: index * 0.7,
          ease: 'sine.inOut',
          startAt: { opacity: 0.6, scale: 1 },
        });
      });

      // Light rays rotating
      lightRays.forEach((ray, index) => {
        gsap.to(ray as HTMLElement, {
          rotation: index % 2 === 0 ? 15 : -15,
          duration: 10 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Wave particles oscillating
      waveParticles.forEach((particle, index) => {
        gsap.to(particle as HTMLElement, {
          y: '+=20',
          x: `+=${Math.sin(index) * 15}`,
          duration: 3 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Animated wave layers
      waveLayers.forEach((layer, index) => {
        gsap.to(layer as HTMLElement, {
          x: index % 2 === 0 ? '-=40' : '+=40',
          duration: 12 + index * 3,
          repeat: -1,
          ease: 'none',
        });
      });
    }

    // Wave stagger grid reveal
    const getWaveDelay = (index: number): number => {
      const cols = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
      const row = Math.floor(index / cols);
      const col = index % cols;
      return (row + col) * WAVE_ANIMATION_CONFIG.portfolio.gridReveal.waveDelay;
    };

    gsap.set(cards, (index: number) => {
      const delay = getWaveDelay(index);
      return {
        opacity: 0,
        y: 60 + delay * 20,
        scale: 0.9,
        rotateY: window.innerWidth >= 768 ? 15 : 0,
      };
    });

    if (window.innerWidth >= 768) {
      gsap.set(grid, { perspective: 1000 });
    }

    const revealAnim = gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      duration: 0.8,
      stagger: {
        each: WAVE_ANIMATION_CONFIG.portfolio.gridReveal.stagger,
        from: 'start',
      },
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });
    triggers.push(revealAnim.scrollTrigger!);

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(cards);
      gsap.killTweensOf('.bubble');
      gsap.killTweensOf('.light-ray');
      gsap.killTweensOf('.wave-particle');
      gsap.killTweensOf('.wave-layer');
    };
  }, []);

  // Ocean-themed images for portfolio/news
  const PORTFOLIO_IMAGES = [
    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&auto=format&fit=crop&q=80', // Ocean wave
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&auto=format&fit=crop&q=80', // Deep blue water
    'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format&fit=crop&q=80', // Ocean horizon
    'https://images.unsplash.com/photo-1468581264429-2548ef9eb732?w=800&auto=format&fit=crop&q=80', // Water surface
    'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&auto=format&fit=crop&q=80', // Turquoise water
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80', // Waves crashing
  ];

  return (
    <section
      ref={sectionRef}
      className="portfolio-section relative min-h-screen w-full py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-cyan-950 via-blue-950 to-cyan-950 overflow-hidden"
    >
      {/* Ocean Surface Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(6,182,212,0.12)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(59,130,246,0.1)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(20,184,166,0.08)_0%,transparent_60%)]" />

        {/* Animated wave layers */}
        <svg className="wave-layer absolute top-0 left-0 w-full h-48 opacity-15" viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path d="M0,75 Q360,40 720,75 T1440,75 V0 H0 Z" fill="url(#waveTop1)" />
          <defs>
            <linearGradient id="waveTop1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="wave-layer absolute top-0 left-0 w-full h-32 opacity-10" style={{ animationDelay: '1s' }} viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 Q240,30 480,50 T960,50 T1440,50 V0 H0 Z" fill="#22d3ee" />
        </svg>

        {/* Rising bubbles */}
        <div className="bubble absolute bottom-[5%] left-[5%] w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-cyan-300/50 to-blue-400/40 rounded-full blur-[1px]" />
        <div className="bubble absolute bottom-[10%] left-[12%] w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-cyan-200/40 to-teal-300/30 rounded-full blur-[1px]" style={{ animationDelay: '0.5s' }} />
        <div className="bubble absolute bottom-[8%] right-[8%] w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-300/45 to-cyan-400/35 rounded-full blur-[1px]" style={{ animationDelay: '1s' }} />
        <div className="bubble absolute bottom-[15%] right-[15%] w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-teal-300/35 to-cyan-400/25 rounded-full blur-[1px]" style={{ animationDelay: '1.5s' }} />
        <div className="bubble absolute bottom-[20%] left-[20%] w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-cyan-400/40 to-blue-500/30 rounded-full blur-[1px]" style={{ animationDelay: '0.8s' }} />

        {/* Light rays - realistic sunbeams penetrating water */}
        <svg className="light-ray absolute top-0 left-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ray1" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ray2" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="ray3" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </linearGradient>
            <filter id="rayBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
            </filter>
          </defs>
          {/* Main light ray from top left */}
          <path d="M100,-50 L300,850 L550,850 L200,-50 Z" fill="url(#ray1)" filter="url(#rayBlur)" />
          {/* Secondary ray from top right */}
          <path d="M1200,-50 L1050,850 L1300,850 L1400,-50 Z" fill="url(#ray2)" filter="url(#rayBlur)" />
          {/* Smaller ray from center */}
          <path d="M650,-50 L580,850 L750,850 L750,-50 Z" fill="url(#ray3)" filter="url(#rayBlur)" />
        </svg>

        {/* Secondary light rays for depth */}
        <svg className="light-ray absolute top-0 left-0 w-full h-full pointer-events-none opacity-15" style={{ animationDelay: '2s' }} viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="ray4" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
            </linearGradient>
            <filter id="rayBlur2">
              <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
            </filter>
          </defs>
          <path d="M400,-50 L200,800 L600,800 L550,-50 Z" fill="url(#ray4)" filter="url(#rayBlur2)" />
          <path d="M900,-50 L800,800 L1100,800 L1050,-50 Z" fill="url(#ray4)" filter="url(#rayBlur2)" />
        </svg>

        {/* Wave particles */}
        <div className="wave-particle absolute top-[20%] left-[8%] w-2 h-2 bg-cyan-400/30 rounded-full" />
        <div className="wave-particle absolute top-[35%] right-[12%] w-1.5 h-1.5 bg-blue-400/25 rounded-full" style={{ animationDelay: '0.5s' }} />
        <div className="wave-particle absolute top-[50%] left-[18%] w-2.5 h-2.5 bg-teal-400/25 rounded-full" style={{ animationDelay: '1s' }} />
        <div className="wave-particle absolute top-[65%] right-[8%] w-1.5 h-1.5 bg-cyan-300/30 rounded-full" style={{ animationDelay: '1.5s' }} />
        <div className="wave-particle absolute top-[80%] left-[25%] w-2 h-2 bg-blue-300/25 rounded-full" style={{ animationDelay: '2s' }} />
        <div className="wave-particle absolute top-[45%] right-[25%] w-1.5 h-1.5 bg-teal-300/30 rounded-full" style={{ animationDelay: '2.5s' }} />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 w-full max-w-4xl md:max-w-7xl mx-auto">
        <span className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-4 sm:mb-6 border border-cyan-400/30 backdrop-blur-sm shadow-[0_0_30px_rgba(6,182,212,0.2)]">
          Latest Updates
        </span>
        <h2
          className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: '0 0 60px rgba(6,182,212,0.3)' }}
        >
          News & Insights
        </h2>
        <p
          className="text-cyan-100/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Stay updated with our latest announcements and achievements
        </p>
      </div>

      {/* Portfolio Grid */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-4xl md:max-w-7xl mx-auto w-full"
      >
        {PORTFOLIO_DATA.map((item, index) => (
          <PortfolioCard
            key={item.id}
            {...item}
            imageUrl={PORTFOLIO_IMAGES[index % PORTFOLIO_IMAGES.length]}
          />
        ))}
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,30 Q360,70 720,30 T1440,30 V100 H0 Z" fill="rgba(6,182,212,0.08)" />
          <path d="M0,50 Q360,85 720,50 T1440,50 V100 H0 Z" fill="rgba(59,130,246,0.06)" />
          <path d="M0,70 Q360,95 720,70 T1440,70 V100 H0 Z" fill="rgba(20,184,166,0.04)" />
        </svg>
      </div>
    </section>
  );
}

// ============================================================================
// PORTFOLIO CARD - OCEAN WAVE THEME
// ============================================================================

interface PortfolioCardProps extends PortfolioItem {
  imageUrl: string;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Partnership: { bg: 'from-cyan-500/30 to-blue-500/30', text: 'text-cyan-200', border: 'border-cyan-400/40' },
  Product: { bg: 'from-teal-500/30 to-cyan-500/30', text: 'text-teal-200', border: 'border-teal-400/40' },
  Investment: { bg: 'from-blue-500/30 to-indigo-500/30', text: 'text-blue-200', border: 'border-blue-400/40' },
  Expansion: { bg: 'from-cyan-500/30 to-teal-500/30', text: 'text-cyan-200', border: 'border-cyan-400/40' },
  Achievement: { bg: 'from-amber-500/30 to-orange-500/30', text: 'text-amber-200', border: 'border-amber-400/40' },
  Initiative: { bg: 'from-emerald-500/30 to-cyan-500/30', text: 'text-emerald-200', border: 'border-emerald-400/40' },
};

function PortfolioCard({
  title,
  category,
  date,
  excerpt,
  tags,
  imageUrl,
}: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.Partnership;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = imageContainerRef.current;
    if (!container) return;

    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    gsap.to(container, {
      x: percentX * -8,
      y: percentY * -8,
      scale: 1.05,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const container = imageContainerRef.current;
    if (!container) return;

    gsap.to(container, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div
      ref={cardRef}
      className="portfolio-card relative group rounded-3xl sm:rounded-[2rem] overflow-hidden border border-white/10"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div
        ref={imageContainerRef}
        className="portfolio-image relative h-52 sm:h-56 md:h-64 overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/95 via-cyan-950/60 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-4 sm:top-5 left-4 sm:left-5 z-20">
          <span
            className={`px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r ${colors.bg} ${colors.text} text-[10px] sm:text-xs font-bold rounded-full border ${colors.border} backdrop-blur-sm shadow-lg`}
          >
            {category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 z-20">
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-md text-cyan-100 text-[10px] sm:text-xs font-semibold rounded-full border border-white/20">
            {date}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 md:p-7 relative">
        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl sm:rounded-[2rem] pointer-events-none">
          <div className="shimmer absolute -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent group-hover:translate-y-full transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-bl from-cyan-400/20 to-transparent rounded-bl-3xl sm:rounded-bl-[2rem]" />

        <h3
          className="text-white text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 line-clamp-2 group-hover:text-cyan-300 transition-colors duration-300"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </h3>

        <p
          className="text-cyan-100/70 text-xs sm:text-sm mb-4 sm:mb-5 line-clamp-2 leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-cyan-500/20 text-cyan-200 text-[10px] sm:text-xs font-medium rounded-md border border-cyan-400/20 hover:bg-cyan-500/30 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500 pointer-events-none rounded-3xl sm:rounded-[2rem]" />

      {/* Iridescent border on hover */}
      <div className="absolute inset-0 rounded-3xl sm:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl sm:rounded-[2rem]" style={{
          background: 'linear-gradient(135deg, rgba(6,182,212,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(20,184,166,0.3) 100%)',
          padding: '1px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }} />
      </div>
    </div>
  );
}
