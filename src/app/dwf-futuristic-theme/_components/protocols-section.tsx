'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PROTOCOLS_DATA, NEON_COLORS } from '../_data';
import type { ProtocolItem } from '../_data';

/**
 * Protocols Section - Interactive Protocol Cards
 * Features: Hover reveals, expanding details, tag animations
 */
export function ProtocolsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll('.protocol-card');

    // Staggered entrance from sides
    gsap.set(cards, {
      opacity: 0,
      x: (i) => (i % 2 === 0 ? -100 : 100),
      rotationY: (i) => (i % 2 === 0 ? -30 : 30),
    });

    gsap.to(cards, {
      opacity: 1,
      x: 0,
      rotationY: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 30%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="protocols-section relative w-full py-32 px-4 md:px-12 bg-gradient-to-b from-black via-purple-950/20 to-black"
    >
      {/* Hexagonal background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex" x="0" y="0" width="50" height="43.3" patternUnits="userSpaceOnUse">
              <path d="M25 0 L50 12.5 L50 37.5 L25 50 L0 37.5 L0 12.5 Z" fill="none" stroke="rgba(123, 0, 255, 0.5)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>
      </div>

      {/* Section header */}
      <div className="relative z-10 text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{
          fontFamily: "'Courier New', monospace",
          textShadow: `0 0 20px ${NEON_COLORS.purple}`,
        }}>
          <span className="text-purple-500">{`{{`}</span>
          ACTIVE_PROTOCOLS
          <span className="text-purple-500">{`}}`}</span>
        </h2>
        <p className="text-gray-400 text-lg">Deployed blockchain infrastructure modules</p>
      </div>

      {/* Protocols grid */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        style={{ perspective: '1000px' }}
      >
        {PROTOCOLS_DATA.map((protocol) => (
          <ProtocolCard key={protocol.id} {...protocol} />
        ))}
      </div>
    </section>
  );
}

// ============================================================================
// PROTOCOL CARD COMPONENT
// ============================================================================

interface ProtocolCardProps extends ProtocolItem {}

function ProtocolCard({ name, version, category, description, hashrate, security, launchDate, tags }: ProtocolCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const details = detailsRef.current;
    if (!card || !details) return;

    // Hover expand animation
    const handleMouseEnter = () => {
      gsap.to(details, {
        height: 'auto',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(details, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="protocol-card relative group cursor-pointer overflow-hidden"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Main card */}
      <div className="relative p-6 border border-purple-500/50 bg-black/90 backdrop-blur-sm rounded-lg"
        style={{
          boxShadow: `0 0 40px rgba(123, 0, 255, 0.3)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-lg" style={{
          boxShadow: `inset 0 0 20px rgba(123, 0, 255, 0.3)`,
          opacity: 0,
          transition: 'opacity 0.3s',
        }}
        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
        onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-purple-400" style={{
              fontFamily: "'Courier New', monospace",
              textShadow: `0 0 10px ${NEON_COLORS.purple}`,
            }}>
              {name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">{version}</p>
          </div>
          <div className="px-3 py-1 border border-cyan-500/50 rounded">
            <span className="text-xs text-cyan-400">{category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{description}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">HASHRATE</p>
            <p className="text-sm text-cyan-400 font-mono">{hashrate}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">SECURITY</p>
            <p className="text-sm text-fuchsia-400 font-mono">{security}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="tag px-2 py-1 text-xs border border-gray-700 text-gray-400 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Expandable details */}
        <div
          ref={detailsRef}
          className="details overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="pt-4 mt-4 border-t border-gray-800">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">LAUNCH_DATE</p>
                <p className="text-sm text-white font-mono">{launchDate}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">STATUS</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-sm text-green-400 font-mono">ACTIVE</p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">ADOPTION_RATE</span>
                <span className="text-xs text-purple-400">87%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
                  style={{
                    width: '87%',
                    boxShadow: `0 0 10px ${NEON_COLORS.purple}`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-xs text-purple-400 animate-pulse">▼ EXPAND</span>
        </div>

        {/* Animated corner */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full border-r-2 border-t-2 border-purple-400"
            style={{
              transform: 'rotate(45deg) scale(1.5)',
              transformOrigin: 'top right',
            }}
          />
        </div>
      </div>
    </div>
  );
}
