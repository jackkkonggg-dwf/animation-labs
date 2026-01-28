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
// BATCH REVEAL PATTERN - Performance Optimized
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function BatchRevealComponent() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Select all batch items
    const items = container.querySelectorAll('.batch-item');

    // Set initial state - use scale for GPU acceleration
    gsap.set(items, { opacity: 0, scale: 0.9 });

    // Fast batch animation with grid-based stagger
    gsap.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: {
        amount: 0.8,     // Total time for all animations
        from: 'center',  // Start from center of grid
        grid: [4, 6],    // 4 rows, 6 columns
      },
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
      gsap.killTweensOf(items);
    };
  }, { scope: containerRef });

  // Render 24 items in a grid
  return (
    <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="batch-item bg-zinc-900 aspect-square rounded-lg border border-zinc-800">
          {i + 1}
        </div>
      ))}
    </div>
  );
}`;

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemCount] = useState(24);

  // Generate demo items
  const demoItems = Array.from({ length: itemCount }, (_, i) => ({
    id: i + 1,
    number: i + 1,
  }));

  const handleReplay = () => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.batch-item');

    // Reset to initial state
    gsap.set(items, { opacity: 0, scale: 0.9 });

    // Replay the animation
    gsap.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: {
        amount: 0.8,
        from: 'center',
        grid: [4, 6],
      },
      ease: 'power2.out',
    });
  };

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.batch-item');

    // Set initial state - all invisible with slight scale
    gsap.set(items, { opacity: 0, scale: 0.9 });

    // Create fast batch animation with small stagger
    gsap.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      stagger: {
        amount: 0.8,
        from: 'center',
        grid: [4, 6],
      },
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(items);
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
        <p className="text-zinc-500 mt-3 ml-7">
          Scroll to see 24 items animate from center with optimized batch stagger
        </p>
      </div>

      {/* Demo grid */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {demoItems.map((item) => (
            <div
              key={item.id}
              className="batch-item group relative aspect-square bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors duration-300"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Scan line effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-px bg-white/20 absolute top-1/2 animate-scan" />
              </div>

              {/* Content */}
              <div className="relative p-4 h-full flex flex-col items-center justify-center">
                {/* Item number */}
                <span className="text-3xl font-black text-white/20 group-hover:text-orange-500/40 transition-colors duration-300">
                  {item.number.toString().padStart(2, '0')}
                </span>

                {/* Corner accent */}
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-orange-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>

        {/* Replay button */}
        <div className="mt-12 flex justify-center">
          <ReplayButton onReplay={handleReplay} />
      </div>
    </section>;
}

}

// ============================================================================
// PATTERN NOTES SECTION
// ============================================================================

function PatternNotes() {
  const notes = [
    {
      title: 'GRID-BASED STAGGER',
      description: 'The grid: [rows, cols] option tells GSAP about your layout, enabling "from: center" and other spatial stagger patterns that animate outward from a specific point.',
    },
    {
      title: 'AMOUNT VS EACH',
      description: 'stagger: { amount: 0.8 } distributes the total time across all items, ensuring consistent timing regardless of item count. Use "each" for fixed per-item delays.',
    },
    {
      title: 'GPU ACCELERATION',
      description: 'Scale and opacity transforms are GPU-accelerated properties. Using them instead of layout properties like width, height, or margin ensures smooth 60fps animations.',
    },
    {
      title: 'PERFORMANCE TIP',
      description: 'For 50+ items, consider batch animations with smaller amounts (0.3-0.5s). You can also use will-change CSS property or stagger by rows/cols for different effects.',
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

export function BatchRevealPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Performance"
        difficulty="Intermediate"
        title="Reveal"
        titleHighlight="Batch"
        description="Efficiently animate large collections of elements (20+) using batch techniques that optimize performance. Perfect for grids, galleries, and data-heavy interfaces where smooth animation is critical."
        features=[{"{ label: '24 Items' },
          { label: 'fast stagger' },
          { label: 'GPU Accelerated' }"}]
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />
      <PatternNotes />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="batch-reveal" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="batch-reveal" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Optimize</span>?
          </h2>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
            Master performance techniques for smooth, professional animations that scale.
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
