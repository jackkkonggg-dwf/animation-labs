'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import {
  AdvancedDemoIndicator,
  ActivePluginsProvider,
  useActivePlugins,
  type GSAPPlugin,
} from '@/components/AdvancedDemoIndicator';

// ============================================================================
// TEST COMPONENTS FOR DIFFERENT PLUGINS
// ============================================================================

function ScrollTriggerDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerPlugin, unregisterPlugin } = useActivePlugins();

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    registerPlugin('ScrollTrigger');

    const boxes = container.querySelectorAll('.st-box');
    gsap.set(boxes, { opacity: 0, x: -50 });

    gsap.to(boxes, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: container,
        start: 'top center',
        toggleActions: 'play none none reverse',
      },
    });

    ScrollTrigger.refresh();

    return () => {
      unregisterPlugin('ScrollTrigger');
      gsap.killTweensOf(boxes);
    };
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="st-box p-4 bg-zinc-900 border border-zinc-800 rounded">
          <span className="text-zinc-400">ScrollTrigger Box {i + 1}</span>
        </div>
      ))}
    </div>
  );
}

function TimelineDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { registerPlugin, unregisterPlugin } = useActivePlugins();
  const [isPlaying, setIsPlaying] = useState(false);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    registerPlugin('Core');

    const tl = gsap.timeline({ paused: true });

    tl.to('.timeline-box', {
      rotation: 360,
      scale: 1.2,
      duration: 1,
      ease: 'back.out',
    })
      .to('.timeline-box', {
        x: 100,
        duration: 0.5,
        ease: 'power2.out',
      })
      .to('.timeline-box', {
        backgroundColor: '#f97316',
        duration: 0.3,
      });

    // Store timeline for control
    (container as any)._timeline = tl;

    return () => {
      unregisterPlugin('Core');
      tl.kill();
    };
  }, { scope: containerRef });

  const handlePlay = () => {
    const container = containerRef.current;
    if (container) {
      const tl = (container as any)._timeline;
      if (tl) tl.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    const container = containerRef.current;
    if (container) {
      const tl = (container as any)._timeline;
      if (tl) tl.pause();
      setIsPlaying(false);
    }
  };

  const handleReverse = () => {
    const container = containerRef.current;
    if (container) {
      const tl = (container as any)._timeline;
      if (tl) tl.reverse();
      setIsPlaying(true);
    }
  };

  const handleRestart = () => {
    const container = containerRef.current;
    if (container) {
      const tl = (container as any)._timeline;
      if (tl) tl.restart();
      setIsPlaying(true);
    }
  };

  return (
    <div ref={containerRef}>
      <div className="timeline-box w-16 h-16 bg-zinc-800 rounded mb-4 mx-auto" />
      <div className="flex gap-2 justify-center">
        <button
          onClick={handlePlay}
          className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
        >
          Play
        </button>
        <button
          onClick={handlePause}
          className="px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700"
        >
          Pause
        </button>
        <button
          onClick={handleReverse}
          className="px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700"
        >
          Reverse
        </button>
        <button
          onClick={handleRestart}
          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
        >
          Restart
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN TEST PAGE
// ============================================================================

export default function TestAdvancedDemoIndicatorPage() {
  return (
    <ActivePluginsProvider>
      <main className="min-h-screen bg-zinc-950">
        <AdvancedDemoIndicator position="top-left" />

        <div className="max-w-4xl mx-auto px-6 py-20">
          <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-4">
            Advanced <span className="text-orange-500">Demo Indicator</span> Test
          </h1>
          <p className="text-zinc-400 mb-12">
            Test page for the AdvancedDemoIndicator component. The indicator shows active GSAP plugins
            and animation state. Click the indicator in the top-left to expand it.
          </p>

          {/* Demo Sections */}
          <div className="space-y-16">
            {/* Core/Timeline Demo */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-orange-500">1.</span> Core Timeline Demo
              </h2>
              <p className="text-zinc-400 mb-4">
                Use the controls to play, pause, reverse, or restart the animation. Watch the
                indicator show the current state (Playing, Paused, Reversed).
              </p>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                <TimelineDemo />
              </div>
            </section>

            {/* ScrollTrigger Demo */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-orange-500">2.</span> ScrollTrigger Demo
              </h2>
              <p className="text-zinc-400 mb-4">
                Scroll down to see these boxes animate. The indicator will show ScrollTrigger as
                active.
              </p>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                <ScrollTriggerDemo />
              </div>
            </section>

            {/* Multiple Plugins Demo */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-orange-500">3.</span> Plugin Grid
              </h2>
              <p className="text-zinc-400 mb-4">
                The indicator shows all available GSAP plugins. Active plugins are highlighted in
                orange with a border, while inactive plugins are dimmed.
              </p>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {['Core', 'ScrollTrigger', 'Draggable', 'SplitText', 'MorphSVG', 'MotionPath'].map(
                    (plugin) => (
                      <div
                        key={plugin}
                        className="p-3 bg-zinc-800 rounded border border-zinc-700"
                      >
                        <span className="text-xs font-mono text-zinc-400">{plugin}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </section>

            {/* Pattern Types Legend */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-orange-500">4.</span> Pattern Types Legend
              </h2>
              <p className="text-zinc-400 mb-4">
                The indicator includes a legend showing different pattern types with color coding.
              </p>
              <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg">
                <div className="flex flex-wrap gap-3">
                  <div className="px-3 py-2 bg-blue-500/10 border border-blue-500/30 rounded">
                    <span className="text-xs font-black text-blue-400">SCROLL</span>
                  </div>
                  <div className="px-3 py-2 bg-purple-500/10 border border-purple-500/30 rounded">
                    <span className="text-xs font-black text-purple-400">INTERACTIVE</span>
                  </div>
                  <div className="px-3 py-2 bg-orange-500/10 border border-orange-500/30 rounded">
                    <span className="text-xs font-black text-orange-400">TIMELINE</span>
                  </div>
                  <div className="px-3 py-2 bg-green-500/10 border border-green-500/30 rounded">
                    <span className="text-xs font-black text-green-400">TEXT</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Instructions */}
          <div className="mt-12 p-6 bg-zinc-900 border border-orange-500/30 rounded-lg">
            <h3 className="text-lg font-bold text-orange-500 mb-4">How to Test:</h3>
            <ul className="space-y-2 text-zinc-400">
              <li>• Click the indicator in the top-left to expand/collapse it</li>
              <li>• Use the Timeline controls to see Playing, Paused, and Reversed states</li>
              <li>• Scroll to see ScrollTrigger become active</li>
              <li>• Watch the active plugin count update in real-time</li>
              <li>• Notice the pulse animation on active icons</li>
            </ul>
          </div>
        </div>
      </main>
    </ActivePluginsProvider>
  );
}
