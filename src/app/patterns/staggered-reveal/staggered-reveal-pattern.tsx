'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer, ReplayButton } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `// ============================================================================
// SCROLLTRIGGER STAGGERED REVEAL PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function StaggeredRevealComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select elements to animate
    const elements = container.querySelectorAll('.animate-item');

    // Set initial state - offset from left and invisible
    gsap.set(elements, { x: -100, opacity: 0 });

    // Create staggered slide-in animation
    gsap.to(elements, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,  // 150ms delay between each element
      ease: 'power2.out',  // Smooth deceleration
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
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Item 1</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Item 2</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Item 3</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded-lg">
        <h3>Item 4</h3>
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
    title: 'STAGGER DELAY',
    description: 'The stagger option adds a delay between each element, creating a cascade effect',
    icon: '⏱️',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 2,
    title: 'SEQUENCE ORDER',
    description: 'Elements animate in DOM order by default - first to last, left to right',
    icon: '🔢',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 3,
    title: 'SLIDE DIRECTION',
    description: 'x-axis movement creates a slide-in effect from the left side',
    icon: '➡️',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 4,
    title: 'FADE COMBINATION',
    description: 'Combining x-movement with opacity creates depth and smoothness',
    icon: '👁️',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 5,
    title: 'EASING CHOICE',
    description: 'Power2.out provides a smooth deceleration that feels natural',
    icon: '📈',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 6,
    title: 'GRID LAYOUTS',
    description: 'Stagger works perfectly with CSS Grid for responsive card layouts',
    icon: '📐',
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 7,
    title: 'TIMING CONTROL',
    description: 'Adjust stagger value for faster (0.1s) or slower (0.3s) cascade effects',
    icon: '⚙️',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 8,
    title: 'LARGE COLLECTIONS',
    description: 'Stagger efficiently handles dozens of elements with consistent timing',
    icon: '📦',
    color: 'from-teal-500 to-cyan-500',
  },
];

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReplay = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.demo-card');

    // Reset to initial state
    gsap.set(cards, { x: -100, opacity: 0 });

    // Replay the animation
    gsap.to(cards, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    });
  };

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.demo-card');

    // Set initial state - offset from left and invisible
    gsap.set(cards, { x: -100, opacity: 0 });

    // Create staggered slide-in animation
    gsap.to(cards, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
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
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to see the staggered reveal animation</p>
      </div>

      {/* Demo cards grid */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
      title: 'STAGGER VALUE',
      description: 'The stagger: 0.15 option adds 150ms delay between each element. Lower values (0.1) create faster cascades, higher values (0.3) create slower, more dramatic sequences.',
    },
    {
      title: 'DIRECTION CONTROL',
      description: 'Use x: -100 to slide from left, x: 100 to slide from right, or y for vertical movement. Positive values push elements away from their starting position.',
    },
    {
      title: 'GRID LAYOUTS',
      description: 'Stagger works naturally with CSS Grid. Elements animate in DOM order - left to right, top to bottom. For different patterns, use stagger\'s object form with "from" property.',
    },
    {
      title: 'ADVANCED STAGGER',
      description: 'For complex patterns, use stagger: { each: 0.15, from: "center" } or { from: "edges", grid: [rows, cols] } to control animation origin and grid-based staggering.',
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

export function StaggeredRevealPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="ScrollTrigger Basics"
        difficulty="Beginner"
        title="Reveal"
        titleHighlight="Staggered"
        description="Elements animate in sequence with cascading delays, creating a rhythmic and polished entrance effect. Perfect for grids, lists, or any collection of items that need to appear one after another."
        features={[
          { label: 'x: -100 → 0' },
          { label: 'opacity: 0 → 1' },
          { label: 'stagger: 0.15s' },
        ]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="staggered-reveal" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="staggered-reveal" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Animate</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            This is just the beginning. Explore 50+ GSAP animation patterns in our complete collection.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-4 bg-orange-500 text-black font-black text-sm uppercase tracking-wider rounded hover:bg-orange-400 transition-colors duration-300"
          >
            View All Patterns
          </a>
        </div>
      </section>
    </div>
  );
}
