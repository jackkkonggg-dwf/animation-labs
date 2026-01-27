'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/app/lib/gsap-config';
import { SERVICES_DATA, NEON_COLORS } from '../_data';
import type { ServiceItem } from '../_data';

/**
 * Services Section - Holographic Service Cards
 * Features: 3D transforms, parallax effects, holographic shimmer
 */
export function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsRef.current;
    if (!section || !cardsContainer) return;

    const cards = cardsContainer.querySelectorAll('.service-card');

    // Staggered card entrance
    gsap.set(cards, {
      opacity: 0,
      y: 100,
      rotationX: -20,
      scale: 0.8,
    });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      scale: 1,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Floating animation for cards
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: '+=20',
        duration: 2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="services-section relative w-full py-32 px-4 md:px-12 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)', backgroundSize: '100px 100px', transform: 'perspective(500px) rotateX(60deg) scale(2)', transformOrigin: 'center' }} />

      {/* Section header */}
      <div className="relative z-10 text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: '"Courier New", monospace', textShadow: `0 0 20px ${NEON_COLORS.cyan}` }}>
          <span className="text-cyan-400">&lt;</span>
          CORE_SYSTEMS
          <span className="text-cyan-400"> /&gt;</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Advanced neural modules powered by quantum computing
        </p>
      </div>

      {/* Cards grid */}
      <div ref={cardsRef} className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" style={{ perspective: '1000px' }}>
        {SERVICES_DATA.map((service, index) => (
          <ServiceCard key={service.id} {...service} index={index} />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// SERVICE CARD COMPONENT
// ============================================================================

interface ServiceCardProps extends ServiceItem {
  index: number;
}

function ServiceCard({ index, ...service }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(card, {
      rotationX: -rotateX,
      rotationY: rotateY,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const statusColors = {
    OPERATIONAL: '#00ff00',
    OPTIMIZING: '#ffaa00',
    EXPERIMENTAL: '#ff0080',
  };

  return (
    <div ref={cardRef} className="service-card relative group cursor-pointer" style={{ transformStyle: 'preserve-3d' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Card container */}
      <div className="relative p-6 border-2 border-cyan-500/30 bg-black/80 backdrop-blur-sm rounded-lg overflow-hidden" style={{ boxShadow: `0 0 30px rgba(0, 255, 255, 0.2)`, transformStyle: 'preserve-3d' }}>
        {/* Holographic overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(255, 0, 255, 0.1) 100%)`, mixBlendMode: 'overlay' }} />

        {/* Scanning line effect */}
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="scan-line absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" style={{ animation: 'cardScan 2s linear infinite' }} />
        </div>

        {/* Icon */}
        <div className="relative z-10 text-6xl mb-6 text-center" style={{ textShadow: `0 0 30px ${NEON_COLORS.cyan}`, transform: 'translateZ(30px)' }}>
          {service.icon}
        </div>

        {/* Title */}
        <h3 className="relative z-10 text-xl font-bold text-cyan-400 mb-2 text-center" style={{ fontFamily: '"Courier New", monospace', textShadow: `0 0 10px ${NEON_COLORS.cyan}`, transform: 'translateZ(20px)' }}>
          {service.title}
        </h3>

        {/* Subtitle */}
        <p className="relative z-10 text-sm text-fuchsia-400 mb-4 text-center" style={{ transform: 'translateZ(15px)' }}>
          {service.subtitle}
        </p>

        {/* Description */}
        <p className="relative z-10 text-gray-400 text-sm mb-6 leading-relaxed" style={{ transform: 'translateZ(10px)' }}>
          {service.description}
        </p>

        {/* Specs */}
        <div className="relative z-10 space-y-2 mb-6" style={{ transform: 'translateZ(10px)' }}>
          {service.specs.map((spec, i) => (
            <div key={i} className="flex items-center text-xs">
              <span className="w-2 h-2 bg-cyan-400 mr-2" style={{ boxShadow: `0 0 10px ${NEON_COLORS.cyan}` }} />
              <span className="text-gray-300">{spec}</span>
            </div>
          ))}
        </div>

        {/* Status indicator */}
        <div className="relative z-10 flex items-center justify-between mb-4" style={{ transform: 'translateZ(10px)' }}>
          <span className="text-xs text-gray-500">STATUS</span>
          <span className="text-xs font-bold px-3 py-1 rounded" style={{ color: statusColors[service.status], textShadow: `0 0 10px ${statusColors[service.status]}`, border: `1px solid ${statusColors[service.status]}` }}>
            {service.status}
          </span>
        </div>

        {/* Power level bar */}
        <div className="relative z-10" style={{ transform: 'translateZ(10px)' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">POWER_LEVEL</span>
            <span className="text-xs text-cyan-400">{service.powerLevel}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-1000" style={{ width: `${service.powerLevel}%`, boxShadow: `0 0 10px ${NEON_COLORS.cyan}` }} />
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-fuchsia-500" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-fuchsia-500" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-cyan-400" />
      </div>

      <style jsx>{`
        @keyframes cardScan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
