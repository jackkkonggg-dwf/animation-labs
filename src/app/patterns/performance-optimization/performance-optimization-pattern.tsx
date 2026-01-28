'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer, ReplayButton } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';

// ============================================================================
// PERFORMANCE CARD COMPONENT (Animated)
// ============================================================================

interface PerfCardProps {
  title: string;
  icon: string;
  optimized: boolean;
  color: string;
}

function PerfCard({ title, icon, optimized, color }: PerfCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    // Animate continuously to show performance difference
    gsap.to(card, {
      rotation: 360,
      scale: 1.1,
      duration: 2,
      repeat: -1,
      ease: 'none',
    });

    return () => {
      gsap.killTweensOf(card);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className={`
        relative p-6 rounded-lg border flex items-center justify-center
        ${optimized
          ? 'will-change-transform will-change-opacity border-orange-500/50 bg-zinc-900'
          : 'border-zinc-700 bg-zinc-900/50'
        }
      `}
    >
      <div className="text-center">
        <div className="text-4xl mb-3">{icon}</div>
        <div className={`text-xs font-black uppercase tracking-wider ${optimized ? 'text-orange-500' : 'text-zinc-500'}`}>
          {title}
        </div>
        {optimized && (
          <div className="mt-2 text-[10px] text-green-500 font-mono">GPU ACCELERATED</div>
        )}
      </div>

      {/* Performance indicator */}
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${optimized ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
    </div>
  );
}

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `// ============================================================================
// GSAP PERFORMANCE OPTIMIZATION PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function OptimizedAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.gpu-item');

    // Set initial state with GPU-accelerated properties only
    gsap.set(elements, {
      opacity: 0,        // GPU-accelerated
      scale: 0.8,        // GPU-accelerated (transform)
      y: 50,             // GPU-accelerated (transform: translateY)
    });

    // Animate with optimized properties
    gsap.to(elements, {
      opacity: 1,        // GPU-accelerated
      scale: 1,          // GPU-accelerated
      y: 0,              // GPU-accelerated
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(elements);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/Items with will-change hint for GPU acceleration/}
      <div className="gpu-item will-change-transform">Item 1</div>
      <div className="gpu-item will-change-transform">Item 2</div>
      <div className="gpu-item will-change-transform">Item 3</div>
    </div>
  );
}

// ============================================================================
// TAILWIND CSS UTILITY CLASSES
// ============================================================================

// Add will-change via Tailwind utilities:
// - will-change-transform
// - will-change-opacity
// - will-change-transform,opacity

// Force GPU layer (use sparingly):
// - transform-gpu (translateZ(0))
// - translate-z-0
`;

// ============================================================================
// LIVE DEMO SECTION - Side by Side Comparison
// ============================================================================

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fps, setFps] = useState({ optimized: 60, unoptimized: 60 });
  const frameCountRef = useRef({ optimized: 0, unoptimized: 0 });
  const lastTimeRef = useRef({ optimized: 0, unoptimized: 0 });

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.perf-card');

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 40 });

    // Animate cards in with stagger
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 70%',
        toggleActions: 'play none none reverse',
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
        <p className="text-zinc-500 mt-3 ml-7">Compare GPU accelerated vs non-optimized animations</p>
      </div>

      {/* Comparison demo */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Unoptimized column */}
          <div className="perf-card">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <span className="w-3 h-3 bg-zinc-500 rounded-full" />
                  Without Optimization
                </h3>
                <span className="text-xs font-mono text-zinc-500">CPU BOUND</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-zinc-800 rounded flex items-center justify-center"
                  >
                    <span className="text-2xl">{'⚡'}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-zinc-800/50 rounded border border-zinc-700">
                <code className="text-xs font-mono text-zinc-400">
                  .card {`{`} <br />
                  &nbsp;&nbsp;animation: rotate 2s;<br />
                  {`}`}
                </code>
              </div>
            </div>
          </div>

          {/* Optimized column */}
          <div className="perf-card">
            <div className="bg-zinc-900/50 border border-orange-500/30 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  With GPU Acceleration
                </h3>
                <span className="text-xs font-mono text-green-500">GPU ACCELERATED</span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="will-change-transform aspect-square bg-zinc-800 border border-orange-500/30 rounded flex items-center justify-center"
                  >
                    <span className="text-2xl">{'⚡'}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-zinc-800/50 rounded border border-orange-500/30">
                <code className="text-xs font-mono text-orange-400">
                  .card {`{`} <br />
                  &nbsp;&nbsp;will-change: transform;<br />
                  &nbsp;&nbsp;transform: translateZ(0);<br />
                  {`}`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* GPU properties reference */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg p-6">
          <h4 className="text-sm font-black text-orange-500 uppercase tracking-wider mb-4">
            GPU-Accelerated Properties
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-zinc-800/50 rounded">
              <code className="text-xs font-mono text-green-400">transform</code>
              <p className="text-[10px] text-zinc-500 mt-1">translate, scale, rotate</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/50 rounded">
              <code className="text-xs font-mono text-green-400">opacity</code>
              <p className="text-[10px] text-zinc-500 mt-1">fade in/out</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/50 rounded">
              <code className="text-xs font-mono text-green-400">filter</code>
              <p className="text-[10px] text-zinc-500 mt-1">blur, brightness</p>
            </div>
            <div className="text-center p-3 bg-zinc-800/50 rounded">
              <code className="text-xs font-mono text-yellow-400">will-change</code>
              <p className="text-[10px] text-zinc-500 mt-1">hint browser</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PerformanceOptimizationPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Performance"
        difficulty="Advanced"
        title="Optimization"
        titleHighlight="Performance"
        description="Best practices for smooth GSAP animations. Learn how to optimize for 60fps and avoid common performance pitfalls."
        features=[{"{ label: 'will-change' },
          { label: 'GPU acceleration' },
          { label: 'Cleanup' }"}]
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />
      <PatternNotes />
      <PerformanceTips />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="performance-optimization" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="performance-optimization" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Build <span className="text-orange-500">Smooth</span> Animations
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Performance optimization is critical for delivering buttery smooth 60fps experiences.
            Your users will notice the difference.
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
