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
// SCROLLTRIGGER FADE REVEAL PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function FadeRevealComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select elements to animate
    const elements = container.querySelectorAll('.animate-item');

    // Set initial state - invisible and offset
    gsap.set(elements, { opacity: 0, y: 60 });

    // Create staggered fade reveal animation
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,  // 150ms delay between each element
      ease: 'power2.out',
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
    <div ref={containerRef} className="space-y-4">
      <div className="animate-item bg-zinc-800 p-6 rounded">
        <h3>Card 1</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded">
        <h3>Card 2</h3>
      </div>
      <div className="animate-item bg-zinc-800 p-6 rounded">
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
    title: 'TRIGGER',
    description: 'Element that triggers the animation when scrolled into view',
    icon: '🎯',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 2,
    title: 'START POSITION',
    description: 'The scroll position where animation begins (top: 80%)',
    icon: '📍',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 3,
    title: 'TOGGLE ACTIONS',
    description: 'Controls play behavior: play, reverse, resume, none',
    icon: '🎬',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 4,
    title: 'SCRUB',
    description: 'Optional: Link animation directly to scroll bar position',
    icon: '🎚️',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 5,
    title: 'EASING',
    description: 'Timing function: power2.out, power3.out, back.out',
    icon: '〰️',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 6,
    title: 'DURATION',
    description: 'Animation length in seconds (0.6s is snappy and smooth)',
    icon: '⏱️',
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
    gsap.set(cards, { opacity: 0, y: 60 });

    // Replay the animation
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
    });
  };

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.demo-card');

    // Set initial state - invisible and offset downward
    gsap.set(cards, { opacity: 0, y: 60 });

    // Create staggered fade reveal animation
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    });

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
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to see the fade reveal animation in action</p>
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
      title: 'INITIAL STATE',
      description: 'Use gsap.set() before animating to establish starting positions. This prevents "flash of unstyled content" and ensures animations play correctly.',
    },
    {
      title: 'START POSITION',
      description: 'The "top 80%" value means the animation triggers when the top of the container reaches 80% down the viewport. Adjust for earlier/later triggers.',
    },
    {
      title: 'TOGGLE ACTIONS',
      description: 'The "play none none reverse" pattern means: play on enter, do nothing on leave, do nothing on enter back, reverse on leave back.',
    },
    {
      title: 'CLEANUP',
      description: 'Always return a cleanup function from useGSAP to kill tweens and triggers. Critical for Next.js SPA navigation to prevent memory leaks.',
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

export function FadeRevealPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="ScrollTrigger Basics"
        difficulty="Beginner"
        title="Reveal"
        titleHighlight="Fade"
        description="The most fundamental scroll animation pattern. Elements fade in and move upward as they enter the viewport, creating a smooth, natural reveal effect that guides user attention through content."
        features={[
          { label: 'opacity: 0 → 1' },
          { label: 'y: 60 → 0' },
          { label: 'stagger: 0.15s' },
        ]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="fade-reveal" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="fade-reveal" />

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
