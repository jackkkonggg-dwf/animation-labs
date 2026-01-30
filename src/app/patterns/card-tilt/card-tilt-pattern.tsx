'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';
import { PatternHeader } from '@/components/patterns/pattern-header';
import { CodeViewer } from '@/components/patterns/code-viewer';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';
import Link from 'next/link';

// ============================================================================
// 3D TILT CARD COMPONENT
// ============================================================================

interface TiltCardProps {
  title: string;
  emoji: string;
  gradient: string;
  maxTilt?: number;
}

function TiltCard({ title, emoji, gradient, maxTilt = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    // Calculate tilt based on mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse distance from center (-1 to 1)
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Calculate rotation (inverted for natural tilt)
      const rotateY = deltaX * maxTilt;
      const rotateX = -deltaY * maxTilt;

      // Animate the inner card with 3D transform
      gsap.to(inner, {
        rotateX,
        rotateY,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Animate shine effect based on mouse position
      const shineX = 50 + deltaX * 50;
      const shineY = 50 + deltaY * 50;
      gsap.to(card, {
        background: `radial-gradient(circle at ${shineX}% ${shineY}%, ${gradient} 0%, rgba(0,0,0,0.4) 50%)`,
        duration: 0.2,
        ease: 'power1.out',
      });
    };

    // Reset to flat position
    const handleMouseLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });

      // Reset shine
      gsap.to(card, {
        background: `radial-gradient(circle at 50% 50%, ${gradient} 0%, rgba(0,0,0,0.4) 50%)`,
        duration: 0.5,
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(inner);
      gsap.killTweensOf(card);
    };
  }, { scope: cardRef });

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={cardRef}
        className="relative w-72 h-96 rounded-2xl cursor-pointer"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${gradient} 0%, rgba(0,0,0,0.4) 50%)`,
          perspective: '1000px',
        }}
      >
        {/* Inner card for 3D transform */}
        <div
          ref={innerRef}
          className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm rounded-2xl border border-zinc-700/50 flex flex-col items-center justify-center p-8"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Content with 3D translation */}
          <div className="transform translate-z-[20px]">
            <div className="text-6xl mb-6">{emoji}</div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight text-center">
              {title}
            </h3>
            <div className="mt-4 px-4 py-2 bg-zinc-800/50 rounded-full">
              <span className="text-orange-500 text-xs font-mono">HOVER ME</span>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-orange-500/50" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-orange-500/50" />
        </div>
      </div>
      <span className="text-zinc-500 text-xs font-mono">max tilt: ±{maxTilt}°</span>
    </div>
  );
}

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap-config';

// ============================================================================
// 3D TILT CARD COMPONENT
// ============================================================================

interface TiltCardProps {
  title: string;
  emoji: string;
  maxTilt?: number;
}

export function TiltCard({ title, emoji, maxTilt = 15 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    if (!card || !inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate mouse position from center (-1 to 1)
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // Calculate rotation (inverted for natural tilt)
      const rotateY = deltaX * maxTilt;  // Horizontal rotation
      const rotateX = -deltaY * maxTilt; // Vertical rotation (inverted)

      // Animate with 3D transform
      gsap.to(inner, {
        rotateX,
        rotateY,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(inner, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)', // Bouncy reset
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      gsap.killTweensOf(inner);
    };
  });

  return (
    <div
      ref={cardRef}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={innerRef}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="bg-zinc-900 rounded-2xl p-8"
      >
        {/* Card content */}
        <div className="text-4xl">{emoji}</div>
        <h3 className="text-white font-bold">{title}</h3>
      </div>
    </div>
  );
}`;

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  return (
    <section className="relative border-b border-zinc-800">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 grid-pattern-overlay" />

      {/* Section header */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4">
          <span className="w-3 h-8 bg-orange-500" />
          Live Demo
        </h2>
        <p className="text-zinc-500 mt-3 ml-7">Move your mouse over each card to see the 3D tilt effect</p>
      </div>

      {/* Demo cards grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Card 1: Orange gradient */}
          <TiltCard
            title="Product"
            emoji="📦"
            gradient="rgba(249, 115, 22, 0.15)"
            maxTilt={15}
          />

          {/* Card 2: Cyan gradient */}
          <TiltCard
            title="Profile"
            emoji="👤"
            gradient="rgba(6, 182, 212, 0.15)"
            maxTilt={20}
          />

          {/* Card 3: Purple gradient */}
          <TiltCard
            title="Settings"
            emoji="⚙️"
            gradient="rgba(168, 85, 247, 0.15)"
            maxTilt={10}
          />
        </div>
      </div>
    </section>
  );
}

export function CardTiltPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Interactions"
        difficulty="Intermediate"
        title="Tilt"
        titleHighlight="Card"
        description="Create 3D tilt effects on cards that respond to mouse movement. Adds depth and interactivity to any card-based layout."
        features={[
          { label: '3D transform' },
          { label: 'Mouse follow' },
          { label: 'Smooth easing' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="card-tilt" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="card-tilt" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Animate</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            This is just the beginning. Explore 50+ GSAP animation patterns in our complete collection.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-orange-500 text-black font-black text-sm uppercase tracking-wider rounded hover:bg-orange-400 transition-colors duration-300"
          >
            View All Patterns
          </Link>
        </div>
      </section>
    </div>
  );
}
