'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer, ReplayButton } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';
import Link from 'next/link';

// ============================================================================
// REDUCED MOTION TOGGLE (for demo purposes)
// ============================================================================

function ReducedMotionToggle({ enabled, onToggle }: { enabled: boolean; onToggle: (enabled: boolean) => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-zinc-900 border border-zinc-700 rounded-lg p-4 shadow-2xl">
      <div className="flex items-center gap-3">
        <span className="text-zinc-400 text-sm font-mono uppercase">Simulate:</span>
        <button
          onClick={() => onToggle(!enabled)}
          className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
            enabled ? 'bg-orange-500' : 'bg-zinc-700'
          }`}
        >
          <div
            className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
              enabled ? 'translate-x-8' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm font-bold uppercase ${enabled ? 'text-orange-500' : 'text-zinc-500'}`}>
          {enabled ? 'On' : 'Off'}
        </span>
      </div>
      <p className="text-zinc-500 text-xs mt-2">
        Toggle to see the difference
      </p>
    </div>
  );
}

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

interface DemoCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

const DEMO_CARDS: DemoCard[] = [
  {
    id: 1,
    title: 'ACCESSIBILITY',
    description: 'Respect user preferences by detecting motion settings',
    icon: '♿',
    gradient: 'from-emerald-500 to-green-500',
  },
  {
    id: 2,
    title: 'MATCH MEDIA',
    description: 'Use matchMedia for conditional animation logic',
    icon: '📱',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    id: 3,
    title: 'AUTO DISABLE',
    description: 'Animations automatically skip for reduced motion users',
    icon: '🚫',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: 4,
    title: 'PERFORMANCE',
    description: 'Better battery life and smoother experience for all',
    icon: '⚡',
    gradient: 'from-yellow-500 to-amber-500',
  },
];

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [simulateReducedMotion, setSimulateReducedMotion] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const handleReplay = () => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.demo-card');

    // Check if we should reduce motion (simulation or system preference)
    const systemPrefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldReduceMotion = simulateReducedMotion || systemPrefersReduced;

    if (shouldReduceMotion) {
      // Reduced motion - just set final state immediately
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
    } else {
      // Reset to initial state
      gsap.set(cards, { opacity: 0, y: 80, scale: 0.9 });

      // Replay the animation
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
      });
    }
  };

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.demo-card');

    // Check actual system preference for reduced motion
    const systemPrefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Use simulation state if set, otherwise use system preference
    const shouldReduceMotion = simulateReducedMotion || systemPrefersReduced;

    // Update state for UI indicator
    setIsReducedMotion(shouldReduceMotion);

    if (shouldReduceMotion) {
      // Reduced motion - set final state immediately without animation
      gsap.set(cards, { opacity: 1, y: 0, scale: 1 });
    } else {
      // Full animation
      gsap.set(cards, { opacity: 0, y: 80, scale: 0.9 });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
        },
      });
    }

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(cards);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [simulateReducedMotion]); // Re-run when simulation state changes

  return (
    <>
      <ReducedMotionToggle enabled={simulateReducedMotion} onToggle={setSimulateReducedMotion} />

      <section className="relative border-b border-zinc-800">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 grid-pattern-overlay" />

        {/* Section header */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-16 pb-8">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4">
            <span className="w-3 h-8 bg-orange-500" />
            Live Demo
          </h2>
          <p className="text-zinc-500 mt-3 ml-7">
            Scroll down to see the animation • Use toggle to simulate reduced motion
          </p>
        </div>

        {/* Current mode indicator */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-8">
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg border ${
            isReducedMotion
              ? 'bg-emerald-500/10 border-emerald-500/30'
              : 'bg-orange-500/10 border-orange-500/30'
          }`}>
            <span className={`w-3 h-3 rounded-full ${isReducedMotion ? 'bg-emerald-500' : 'bg-orange-500'} animate-pulse`} />
            <span className={`text-sm font-mono font-bold uppercase ${
              isReducedMotion ? 'text-emerald-400' : 'text-orange-400'
            }`}>
              {isReducedMotion ? 'Reduced Motion Mode' : 'Full Motion Mode'}
            </span>
          </div>
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
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Scan line effect on hover (only in full motion) */}
                {!isReducedMotion && (
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-full h-px bg-white/20 absolute top-1/2 animate-scan" />
                  </div>
                )}

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
    </>
  );
}

// ============================================================================
// CODE VIEWER SECTION
// ============================================================================

const CODE_EXAMPLE = `
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function ReducedMotionComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.animate-item');
    const mm = gsap.matchMedia();

    // Normal animation - full motion for users who prefer it
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Set initial state
      gsap.set(elements, { opacity: 0, y: 60 });

      // Animate with full effects
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 70%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    // Reduced motion - skip animation for users who prefer less motion
    mm.add('(prefers-reduced-motion: reduce)', () => {
      // Set final state immediately without animation
      gsap.set(elements, { opacity: 1, y: 0 });
    });

    // Cleanup
    return () => {
      mm.kill(); // Important: kill matchMedia context
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
}`;

// ============================================================================
// KEY CONCEPTS SECTION
// ============================================================================

function KeyConcepts() {
  const concepts = [
    {
      title: 'MATCHMEDIA()',
      description: 'GSAP\'s matchMedia() creates conditional animation blocks based on CSS media queries. Each condition runs independently, allowing separate logic for different preferences.',
    },
    {
      title: 'PREFERS-REDUCED-MOTION',
      description: 'This CSS media query detects user\'s motion preference setting. Set at the OS level, it affects all websites and is essential for accessibility compliance.',
    },
    {
      title: 'IMMEDIATE STATE',
      description: 'For reduced motion users, skip animations entirely by using gsap.set() to immediately place elements in their final state. Content is visible without triggering vestibular disorders.',
    },
    {
      title: 'CLEANUP',
      description: 'Always call mm.kill() in the cleanup function to properly dispose of matchMedia contexts. This prevents memory leaks and ensures proper unmounting in Next.js.',
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

        {/* Concepts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {concepts.map((concept, index) => (
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
                {concept.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 text-sm leading-relaxed">
                {concept.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// SYSTEM PREFERENCES INFO SECTION
// ============================================================================

function SystemPreferencesInfo() {
  return (
    <section className="relative border-b border-zinc-800 bg-zinc-900/30">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4 mb-12">
          <span className="w-3 h-8 bg-orange-500" />
          How to Enable Reduced Motion
        </h2>

        {/* OS-specific instructions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🪟</span>
              <h3 className="text-lg font-black text-white uppercase">Windows</h3>
            </div>
            <ol className="text-zinc-400 text-sm space-y-2 list-decimal list-inside">
              <li>Open Settings</li>
              <li>Go to Ease of Access</li>
              <li>Select Display</li>
              <li>Enable "Show animations"</li>
            </ol>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🍎</span>
              <h3 className="text-lg font-black text-white uppercase">macOS</h3>
            </div>
            <ol className="text-zinc-400 text-sm space-y-2 list-decimal list-inside">
              <li>Open System Settings</li>
              <li>Go to Accessibility</li>
              <li>Select Display</li>
              <li>Enable "Reduce motion"</li>
            </ol>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">📱</span>
              <h3 className="text-lg font-black text-white uppercase">iOS / Android</h3>
            </div>
            <ol className="text-zinc-400 text-sm space-y-2 list-decimal list-inside">
              <li>Open Settings</li>
              <li>Go to Accessibility</li>
              <li>Select Motion/Display</li>
              <li>Enable "Reduce Motion"</li>
            </ol>
          </div>
        </div>

        {/* Accessibility note */}
        <div className="mt-8 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded">
          <p className="text-emerald-400 text-sm leading-relaxed">
            <strong className="font-black uppercase">Why this matters:</strong> Vestibular disorders affect millions of people worldwide.
            Parallax, zooming, and rapid animations can cause dizziness, nausea, and headaches. By respecting reduced motion preferences,
            you make your site accessible to everyone.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function ReducedMotionPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Performance"
        difficulty="Accessibility"
        title="Motion Support"
        titleHighlight="Reduced"
        description="Respect user preferences with matchMedia. Automatically disable animations for users who prefer reduced motion, ensuring accessibility and a better experience for motion-sensitive users."
        features={[
          { label: 'matchMedia()' },
          { label: 'prefers-reduced-motion' },
          { label: 'Conditional animations' },
        ]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />
      <KeyConcepts />
      <SystemPreferencesInfo />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="reduced-motion" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="reduced-motion" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Build <span className="text-orange-500">Accessible</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Supporting reduced motion is not just about compliance—it's about creating a better experience for all users.
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
