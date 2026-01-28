'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { PerformanceMetrics } from '@/components/PerformanceMetrics';

export default function TestPerformanceMetricsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.test-card');

    // Set initial state
    gsap.set(cards, { opacity: 0, y: 50 });

    // Animate cards in with stagger
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      gsap.killTweensOf(cards);
    };
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-zinc-950">
      <PerformanceMetrics position="top-right" />

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-4">
          Performance <span className="text-orange-500">Metrics</span> Test
        </h1>
        <p className="text-zinc-400 mb-12">
          Test page for the PerformanceMetrics component. Scroll down to see the metrics update.
        </p>

        <div ref={containerRef} className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="test-card p-6 bg-zinc-900 border border-zinc-800 rounded-lg"
            >
              <h2 className="text-xl font-bold text-white mb-2">Card {i + 1}</h2>
              <p className="text-zinc-400">
                This card animates in with a stagger effect. Watch the PerformanceMetrics
                panel in the top-right corner to see real-time FPS and GSAP metrics.
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-zinc-900 border border-orange-500/30 rounded-lg">
          <h3 className="text-lg font-bold text-orange-500 mb-4">Expected Metrics:</h3>
          <ul className="space-y-2 text-zinc-400">
            <li>• FPS: Should be green (50-60) on most devices</li>
            <li>• Timelines: Updates as animations run</li>
            <li>• ScrollTriggers: Shows count of active triggers</li>
            <li>• Duration: Total duration of active animations</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
