'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer, ReplayButton } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';
import Link from 'next/link';

// ============================================================================
// COUNT UP CARD COMPONENT
// ============================================================================

interface CountUpCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
  gradient: string;
  decimals?: number;
}

function CountUpCard({ label, value, suffix = '', icon, gradient, decimals = 0 }: CountUpCardProps) {
  const displayRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const animateCount = () => {
    const display = displayRef.current;
    if (!display) return;

    // Create a proxy object to animate
    const proxy = { value: 0 };

    gsap.to(proxy, {
      value: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        display.textContent = proxy.value.toFixed(decimals) + suffix;
      },
    });
  };

  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      onEnter: () => animateCount(),
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, { scope: cardRef });

  return (
    <div ref={cardRef} data-value={value} data-suffix={suffix} data-decimals={decimals} className="count-card relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden hover:border-orange-500/50 transition-colors duration-300">
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 hover:opacity-10 transition-opacity duration-300`} />

      {/* Scan line effect on hover */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500">
        <div className="w-full h-px bg-white/20 absolute top-1/2 animate-scan" />
      </div>

      {/* Card content */}
      <div className="relative p-6">
        {/* Icon */}
        <div className="text-4xl mb-4">{icon}</div>

        {/* Count value */}
        <div className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2">
          <span ref={displayRef} className="count-display tabular-nums">
            0{suffix}
          </span>
        </div>

        {/* Label */}
        <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider">
          {label}
        </p>

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-orange-500/50 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );
}

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function CountUpComponent() {
  const displayRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const display = displayRef.current;
    if (!container || !display) return;

    // Create a proxy object to animate
    const proxy = { value: 0 };

    gsap.to(proxy, {
      value: 1000,  // Target value
      duration: 2,  // Animation duration in seconds
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',  // Trigger when entering viewport
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        // Update display on each frame
        display.textContent = Math.floor(proxy.value).toLocaleString();
      },
    });

    return () => {
      gsap.killTweensOf(proxy);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-zinc-800 p-8 rounded">
      <span ref={displayRef} className="text-5xl font-black tabular-nums">
        0
      </span>
      <p className="text-zinc-400 mt-2">Active Users</p>
    </div>
  );
}`;

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReplay = () => {
    const container = containerRef.current;
    if (!container) return;

    // Reset all displays to 0
    const displays = container.querySelectorAll('.count-display');
    displays.forEach((display) => {
      const card = display.closest('.count-card') as HTMLElement;
      const targetValue = parseFloat(card?.dataset.value || '0');
      const suffix = card?.dataset.suffix || '';
      const decimals = parseInt(card?.dataset.decimals || '0');

      const proxy = { value: 0 };
      gsap.to(proxy, {
        value: targetValue,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          (display as HTMLElement).textContent = proxy.value.toFixed(decimals) + suffix;
        },
      });
    });
  };

  const stats = [
    {
      label: 'Active Users',
      value: 50000,
      suffix: '+',
      icon: '👥',
      gradient: 'from-orange-500 to-red-500',
      decimals: 0,
    },
    {
      label: 'Success Rate',
      value: 98.5,
      suffix: '%',
      icon: '📈',
      gradient: 'from-emerald-500 to-green-500',
      decimals: 1,
    },
    {
      label: 'Projects Completed',
      value: 1250,
      suffix: '',
      icon: '✅',
      gradient: 'from-cyan-500 to-blue-500',
      decimals: 0,
    },
    {
      label: 'Hours Saved',
      value: 7500,
      suffix: '+',
      icon: '⏱️',
      gradient: 'from-purple-500 to-pink-500',
      decimals: 0,
    },
    {
      label: 'Revenue Growth',
      value: 340,
      suffix: '%',
      icon: '💰',
      gradient: 'from-yellow-500 to-orange-500',
      decimals: 0,
    },
    {
      label: 'Countries Served',
      value: 85,
      suffix: '',
      icon: '🌍',
      gradient: 'from-rose-500 to-pink-500',
      decimals: 0,
    },
  ];

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
        <p className="text-zinc-500 mt-3 ml-7">Scroll down to see numbers count up when entering viewport</p>
      </div>

      {/* Demo cards grid */}
      <div ref={containerRef} className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <CountUpCard key={index} {...stat} />
          ))}
        </div>

        {/* Replay button */}
        <ReplayButton onReplay={handleReplay} />
      </div>
    </section>
  );
}

export function CountUpPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Text Effects"
        difficulty="Beginner"
        title="Up"
        titleHighlight="Count"
        description="Animate numbers counting up when they come into view. Perfect for statistics, metrics, and data visualization."
        features={[
          { label: 'onUpdate' },
          { label: 'Math.round' },
          { label: 'ScrollTrigger' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="count-up" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="count-up" />

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
