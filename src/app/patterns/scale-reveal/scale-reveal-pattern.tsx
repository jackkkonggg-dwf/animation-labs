'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PatternHeader } from '@/components/patterns/pattern-header';
import { CodeViewer } from '@/components/patterns/code-viewer';
import { ReplayButton } from '@/components/patterns/replay-button';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';
import Link from 'next/link';

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function ScaleRevealComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select elements to animate
    const elements = container.querySelectorAll('.animate-item');

    // Set initial state - scaled down and invisible
    gsap.set(elements, { scale: 0.8, opacity: 0 });

    // Create staggered scale reveal animation with elastic easing
    gsap.to(elements, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,  // 120ms delay between each element
      ease: 'elastic.out(1, 0.5)',  // Spring-like bounce effect
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',  // Start when top of container hits 80% of viewport
        toggleActions: 'play none none reverse',  // Play on enter, reverse on exit
      },
    });

    // Refresh ScrollTrigger after setup
    ScrollTrigger.refresh();

    // Cleanup - kill tweens and triggers
    return () => {
      gsap.killTweensOf(elements);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Card 1</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Card 2</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Card 3</h3>
      </div>
    </div>
  );
};`;

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

interface DemoCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const DEMO_CARDS: DemoCard[] = [
  {
    id: 1,
    title: 'ELASTIC EASING',
    description: 'Creates a spring-like bounce effect that overshoots slightly before settling',
    icon: '🎯',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 2,
    title: 'SCALE RANGE',
    description: 'Starting at 0.8 creates room for the overshoot effect (up to ~1.05)',
    icon: '📏',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 3,
    title: 'OVERSHOOT',
    description: 'The first number (1) controls how much it grows past the target value',
    icon: '↗️',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 4,
    title: 'OSCILLATION',
    description: 'The second number (0.5) controls how quickly it settles at the final value',
    icon: '〰️',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 5,
    title: 'COMBINE WITH FADE',
    description: 'Add opacity animation alongside scale for enhanced depth perception',
    icon: '👁️',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 6,
    title: 'PERFORMANCE',
    description: 'Scale animations use GPU acceleration and are very performant',
    icon: '⚡',
    color: 'from-rose-500 to-pink-500',
  },
];

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReplay = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.demo-card');

    // Reset to initial state
    gsap.set(cards, { scale: 0.8, opacity: 0 });

    // Replay the animation
    gsap.to(cards, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.demo-card');

    // Set initial state - scaled down and invisible
    gsap.set(cards, { scale: 0.8, opacity: 0 });

    // Create staggered scale reveal animation with elastic easing
    gsap.to(cards, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.12,
      ease: 'elastic.out(1, 0.5)',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(cards);
    };
  }, { scope: containerRef });

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
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to see the scale reveal animation with elastic easing</p>
      </div>

      {/* Demo cards grid */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_CARDS.map((card) => (
            <div
              key={card.id}
              className="demo-card group relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

              {/* Scan line effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-px bg-white/20 absolute top-1/2 animate-scan" />
              </div>

              {/* Card content */}
              <div className="relative p-6">
                {/* Icon */}
                <div className="text-4xl mb-4">{card.icon}</div>

                {/* Title */}
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {card.description}
                </p>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Replay button */}
        <ReplayButton onReplay={handleReplay} />
      </div>
    </section>
  );
}

// ============================================================================
// PATTERN NOTES SECTION
// ============================================================================

function PatternNotes() {
  const notes = [
    {
      title: 'ELASTIC EASING',
      description: 'The elastic.out(1, 0.5) easing creates a spring effect. The first parameter (1) is the amplitude - how much it overshoots. The second (0.5) is the decay - how quickly it settles.',
    },
    {
      title: 'DURATION MATTERS',
      description: 'Elastic easing needs more time (0.8s+) than other easings to complete the bounce animation. Too short and the effect will be cut off mid-bounce.',
    },
    {
      title: 'SCALE START POINT',
      description: 'Starting from 0.8 creates room for the overshoot. If you start at 1, there\'s no "growth" room. Try 0.6 for more dramatic, or 0.9 for subtle effects.',
    },
    {
      title: 'COMBINE ANIMATIONS',
      description: 'Scale works beautifully combined with opacity fade (as shown) and y-axis movement. The combination creates depth and makes the animation feel more natural.',
    },
  ];

  return (
    <section className="relative border-b border-zinc-800">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 grid-pattern-overlay" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4 mb-12">
          <span className="w-3 h-8 bg-orange-500" />
          Key Concepts
        </h2>

        {/* Notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note, index) => (
            <div
              key={index}
              className="relative bg-zinc-900/50 border border-zinc-800 p-6 rounded hover:border-orange-500/30 transition-colors duration-300"
            >
              {/* Number badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-orange-500 text-black font-black text-sm flex items-center justify-center rounded">
                {index + 1}
              </div>

              {/* Title */}
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">
                {note.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed">
                {note.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ScaleRevealPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="ScrollTrigger Basics"
        difficulty="Beginner"
        title="Reveal"
        titleHighlight="Scale"
        description="Elements grow and spring into view with elastic easing, creating a playful and attention-grabbing entrance effect. Perfect for cards, icons, or any content that needs to make a bold impression on scroll."
        features={[
          { label: 'scale: 0.8 → 1' },
          { label: 'ease: elastic.out(1, 0.5)' },
          { label: 'stagger: 0.12s' },
        ]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />
      <PatternNotes />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="scale-reveal" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="scale-reveal" />

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
