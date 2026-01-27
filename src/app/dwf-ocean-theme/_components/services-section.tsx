'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import { SERVICES_DATA, WAVE_ANIMATION_CONFIG } from '../_data';
import type { ServiceItem } from '../_data';

/**
 * Services Section - Ocean Wave Theme
 * DWF = Digital Wave Finance
 *
 * Design Direction: Immersive ocean depths with vibrant cyan/teal gradients
 * - Glassmorphism cards with wave-refraction effects
 * - Animated wave particles rising like bubbles
 * - Shimmer effects mimicking sunlight on water
 * - 3D wave transforms on hover
 */
export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    const background = backgroundRef.current;
    const header = headerRef.current;
    const cards = cardsContainer?.querySelectorAll('.service-card');

    if (!section || !cardsContainer || !cards || cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // Header entry animations
    if (header) {
      const badge = header.querySelector('.header-badge');
      const title = header.querySelector('.header-title');
      const description = header.querySelector('.header-description');

      if (badge) {
        gsap.set(badge, { opacity: 0, y: -20, scale: 0.8 });
        gsap.to(badge, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        });
      }

      if (title) {
        gsap.set(title, { opacity: 0, y: 40 });
        gsap.to(title, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        });
      }

      if (description) {
        gsap.set(description, { opacity: 0, y: 30 });
        gsap.to(description, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: 0.3,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          },
        });
      }
    }

    // Background wave animations
    if (background) {
      const waveRings = background.querySelectorAll('.wave-ring');
      const floatingBubbles = background.querySelectorAll('.bubble');
      const shimmerLines = background.querySelectorAll('.shimmer-line');
      const waveLayers = background.querySelectorAll('.wave-layer');

      // Expanding wave rings
      waveRings.forEach((ring, index) => {
        gsap.to(ring as HTMLElement, {
          scale: 1.5,
          opacity: 0,
          duration: 4,
          repeat: -1,
          delay: index * 1.2,
          ease: 'power1.out',
        });
      });

      // Floating bubbles rising
      floatingBubbles.forEach((bubble, index) => {
        gsap.to(bubble as HTMLElement, {
          y: '-=150',
          x: `+=${Math.sin(index) * 30}`,
          opacity: 0,
          duration: 6 + index * 0.8,
          repeat: -1,
          delay: index * 0.5,
          ease: 'sine.inOut',
        });
      });

      // Shimmer lines sliding
      shimmerLines.forEach((line) => {
        gsap.to(line as HTMLElement, {
          x: '100%',
          duration: 3,
          repeat: -1,
          ease: 'none',
        });
      });

      // Animated wave layers
      waveLayers.forEach((layer, index) => {
        gsap.to(layer as HTMLElement, {
          x: '-=30',
          duration: 8 + index * 2,
          repeat: -1,
          ease: 'none',
        });
      });
    }

    // 3D card fan-out (disable 3D on mobile)
    const isMobile = window.innerWidth < 768;

    if (!isMobile) {
      gsap.set(cards, {
        opacity: 0,
        rotateY: -25,
        rotateX: 10,
        z: -150,
        transformOrigin: 'center center',
      });
      gsap.set(cardsContainer, { perspective: 1200 });
    } else {
      gsap.set(cards, { opacity: 0, y: 60 });
    }

    const fanOutAnim = gsap.to(cards, {
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      z: 0,
      y: 0,
      duration: 1.1,
      stagger: WAVE_ANIMATION_CONFIG.services.cardFan.stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none reverse',
      },
    });
    triggers.push(fanOutAnim.scrollTrigger!);

    // Wave card border animation
    if (!isMobile) {
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const waveBorder = cardElement.querySelector('.wave-border') as SVGElement | null;

        if (waveBorder) {
          const paths = waveBorder.querySelectorAll('path');
          paths.forEach((path, i) => {
            const pathEl = path as SVGPathElement;
            const length = pathEl.getTotalLength();
            gsap.set(pathEl, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });

            cardElement.addEventListener('mouseenter', () => {
              gsap.to(pathEl, {
                strokeDashoffset: 0,
                duration: 1.5 + i * 0.2,
                ease: 'power2.out',
              });
            });

            cardElement.addEventListener('mouseleave', () => {
              gsap.to(pathEl, {
                strokeDashoffset: length,
                duration: 0.8,
                ease: 'power2.in',
              });
            });
          });
        }

        // 3D wave tilt on hover
        const cardInner = cardElement.querySelector('.card-inner');
        if (cardInner) {
          cardElement.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = cardElement.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            gsap.to(cardInner as HTMLElement, {
              rotateY: x * 15,
              rotateX: -y * 15,
              duration: 0.4,
              ease: 'power2.out',
            });
          });

          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardInner as HTMLElement, {
              rotateY: 0,
              rotateX: 0,
              duration: 0.5,
              ease: 'power2.out',
            });
          });
        }
      });
    }

    // Icon wave animation
    const icons = cardsContainer.querySelectorAll('.service-icon svg');
    icons.forEach((icon, index) => {
      gsap.fromTo(
        icon as HTMLElement,
        { rotation: -10 },
        {
          rotation: 10,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }
      );
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(cards);
      gsap.killTweensOf(icons);
      gsap.killTweensOf('.bubble');
      gsap.killTweensOf('.wave-ring');
      gsap.killTweensOf('.shimmer-line');
      gsap.killTweensOf('.wave-layer');
      gsap.killTweensOf('.light-ray');
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-section relative w-full py-24 sm:py-32 md:py-40 px-4 sm:px-6 md:px-12 lg:px-24 bg-gradient-to-b from-cyan-950 via-teal-900 to-cyan-950 overflow-hidden"
    >
      {/* Deep Ocean Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(6,182,212,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(20,184,166,0.12)_0%,transparent_50%)]" />

        {/* Animated wave layers */}
        <svg className="wave-layer absolute bottom-0 left-0 w-full h-64 opacity-20" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,100 Q240,60 480,100 T960,100 T1440,100 V200 H0 Z" fill="url(#wave1)" />
          <defs>
            <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="wave-layer absolute bottom-0 left-0 w-full h-48 opacity-15" style={{ animationDelay: '1s' }} viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path d="M0,75 Q360,40 720,75 T1440,75 V150 H0 Z" fill="#22d3ee" />
        </svg>

        <svg className="wave-layer absolute bottom-0 left-0 w-full h-32 opacity-10" style={{ animationDelay: '2s' }} viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,50 Q180,30 360,50 T720,50 T1080,50 T1440,50 V100 H0 Z" fill="#67e8f9" />
        </svg>

        {/* Rising bubbles */}
        <div className="bubble absolute bottom-[10%] left-[8%] w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-cyan-300/40 to-teal-400/30 rounded-full" style={{ animationDelay: '0s' }} />
        <div className="bubble absolute bottom-[15%] left-[15%] w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-cyan-200/30 to-teal-300/20 rounded-full" style={{ animationDelay: '0.8s' }} />
        <div className="bubble absolute bottom-[20%] right-[12%] w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-cyan-400/35 to-teal-500/25 rounded-full" style={{ animationDelay: '0.3s' }} />
        <div className="bubble absolute bottom-[25%] right-[20%] w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-br from-teal-300/30 to-cyan-400/20 rounded-full" style={{ animationDelay: '1.2s' }} />
        <div className="bubble absolute bottom-[30%] left-[25%] w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-cyan-300/25 to-teal-400/15 rounded-full" style={{ animationDelay: '1.8s' }} />

        {/* Expanding wave rings */}
        <div className="wave-ring absolute top-[20%] left-[15%] w-32 h-32 sm:w-48 sm:h-48 border border-cyan-400/20 rounded-full" />
        <div className="wave-ring absolute top-[40%] right-[10%] w-24 h-24 sm:w-40 sm:h-40 border border-teal-400/15 rounded-full" style={{ animationDelay: '1.5s' }} />
        <div className="wave-ring absolute bottom-[30%] left-[8%] w-20 h-20 sm:w-32 sm:h-32 border border-cyan-300/15 rounded-full" style={{ animationDelay: '0.8s' }} />

        {/* Shimmer lines */}
        <div className="shimmer-line absolute top-[15%] left-0 w-32 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
        <div className="shimmer-line absolute top-[35%] left-0 w-24 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" style={{ animationDelay: '1.5s' }} />
        <div className="shimmer-line absolute top-[55%] left-0 w-40 h-px bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent" style={{ animationDelay: '2.5s' }} />
        <div className="shimmer-line absolute top-[75%] left-0 w-28 h-px bg-gradient-to-r from-transparent via-teal-300/25 to-transparent" style={{ animationDelay: '0.8s' }} />

        {/* Realistic light rays - sunbeams from above */}
        <svg className="light-ray absolute top-0 left-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sray1" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
              <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sray2" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#2dd4bf" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
            </linearGradient>
            <filter id="srayBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
            </filter>
          </defs>
          <path d="M200,-50 L100,750 L450,750 L350,-50 Z" fill="url(#sray1)" filter="url(#srayBlur)" />
          <path d="M1100,-50 L1000,750 L1250,750 L1200,-50 Z" fill="url(#sray2)" filter="url(#srayBlur)" />
        </svg>
      </div>

      {/* Section Header */}
      <div
        ref={headerRef}
        className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 w-full max-w-4xl md:max-w-7xl mx-auto"
      >
        <span className="header-badge inline-block px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-cyan-500/20 via-teal-500/20 to-cyan-500/20 text-cyan-300 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase rounded-full mb-4 sm:mb-6 border border-cyan-400/30 backdrop-blur-sm shadow-[0_0_30px_rgba(6,182,212,0.2)]">
          What We Do
        </span>
        <h2
          className="header-title text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", textShadow: '0 0 60px rgba(6,182,212,0.3)' }}
        >
          Our Services
        </h2>
        <p
          className="header-description text-cyan-100/80 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Comprehensive solutions for the digital asset ecosystem
        </p>
      </div>

      {/* Services Cards Grid */}
      <div
        ref={cardsContainerRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl md:max-w-7xl mx-auto w-full"
      >
        {SERVICES_DATA.map((service, index) => (
          <ServiceCard key={service.id} {...service} colorIndex={index} />
        ))}
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 sm:h-20 md:h-24" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 Q360,80 720,40 T1440,40 V100 H0 Z" fill="rgba(6,182,212,0.1)" />
          <path d="M0,60 Q360,90 720,60 T1440,60 V100 H0 Z" fill="rgba(20,184,166,0.08)" />
        </svg>
      </div>
    </section>
  );
}

// ============================================================================
// SERVICE CARD - OCEAN WAVE THEME
// ============================================================================

interface ServiceCardProps extends ServiceItem {
  colorIndex: number;
}

const CARD_COLORS = [
  {
    gradient: 'from-cyan-500/20 via-teal-500/10 to-cyan-600/20',
    borderGradient: 'from-cyan-400/50 via-teal-400/50 to-cyan-500/50',
    iconGlow: 'rgba(6,182,212,0.5)',
    iconBg: 'from-cyan-400/30 to-teal-500/30',
    stroke: '#06b6d4',
  },
  {
    gradient: 'from-teal-500/20 via-cyan-500/10 to-teal-600/20',
    borderGradient: 'from-teal-400/50 via-cyan-400/50 to-teal-500/50',
    iconGlow: 'rgba(20,184,166,0.5)',
    iconBg: 'from-teal-400/30 to-cyan-500/30',
    stroke: '#14b8a6',
  },
  {
    gradient: 'from-cyan-600/20 via-teal-500/15 to-cyan-500/20',
    borderGradient: 'from-cyan-400/40 via-teal-300/40 to-cyan-500/40',
    iconGlow: 'rgba(8,145,178,0.5)',
    iconBg: 'from-cyan-500/30 to-teal-400/30',
    stroke: '#0891b2',
  },
];

function ServiceCard({ title, description, icon, colorIndex }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const colors = CARD_COLORS[colorIndex % CARD_COLORS.length];

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    // Wave ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'wave-ripple';
    ripple.style.cssText = `
      position: absolute;
      width: 100px;
      height: 100px;
      background: radial-gradient(circle, ${colors.iconGlow} 0%, transparent 70%);
      border-radius: 50%;
      pointer-events: none;
      transform: translate(-50%, -50%);
    `;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    card.appendChild(ripple);

    gsap.fromTo(
      ripple,
      { scale: 0, opacity: 0.8 },
      {
        scale: 5,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => ripple.remove(),
      }
    );
  };

  return (
    <div
      ref={cardRef}
      className="service-card relative rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 border border-white/10 overflow-hidden group cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
      onMouseEnter={handleMouseEnter}
    >
      {/* Wave Border SVG - desktop only */}
      <svg
        className="hidden md:block wave-border absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 350"
      >
        <path
          d="M30,30 Q200,10 370,30 Q390,175 370,320 Q200,340 30,320 Q10,175 30,30"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="2"
          opacity="0"
          className="transition-opacity duration-300"
          style={{ opacity: 'var(--wave-opacity, 0)' }}
        />
        <path
          d="M40,40 Q200,20 360,40 Q380,175 360,310 Q200,330 40,310 Q20,175 40,40"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="1.5"
          opacity="0"
          className="transition-opacity duration-300"
          style={{ opacity: 'var(--wave-opacity, 0)' }}
        />
      </svg>

      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Shimmer effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl sm:rounded-[2rem]">
        <div className="shimmer absolute -top-full left-0 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent group-hover:translate-y-full transition-transform duration-1000 ease-in-out" />
      </div>

      {/* Card inner for 3D transform */}
      <div className="card-inner relative h-full">
        {/* Service Icon */}
        <div className="service-icon relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mb-6 sm:mb-8">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${colors.iconBg} rounded-2xl sm:rounded-3xl blur-xl`}
            style={{ boxShadow: `0 0 40px ${colors.iconGlow}` }}
          />
          <svg
            className="relative w-full h-full p-3 sm:p-4"
            style={{ color: '#22d3ee' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={icon} />
          </svg>
        </div>

        {/* Service Title */}
        <h3
          className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 tracking-tight group-hover:text-cyan-300 transition-colors duration-300"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {title}
        </h3>

        {/* Service Description */}
        <p
          className="text-cyan-100/70 text-sm sm:text-base leading-relaxed group-hover:text-cyan-50/90 transition-colors duration-300"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {description}
        </p>

        {/* Hover indicator */}
        <div className="mt-6 sm:mt-8 flex items-center gap-2 text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300">
          <span className="text-xs sm:text-sm font-medium tracking-wider uppercase">Learn More</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-bl ${colors.borderGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-bl-full`} />
    </div>
  );
}
