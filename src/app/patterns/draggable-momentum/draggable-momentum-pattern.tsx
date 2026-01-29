'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { loadDraggable, gsap } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';
import Link from 'next/link';

// ============================================================================
// MOMENTUM DRAGGABLE HOOK
// ============================================================================

function useMomentumDraggable(
  elementRef: React.RefObject<HTMLDivElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null> | null,
  options: {
    enabled?: boolean;
    resistance?: number;
    duration?: number;
    easing?: string;
  } = {}
) {
  const { enabled = true, resistance = 0.8, duration = 1.5, easing = 'power2.out' } = options;

  useGSAP(async () => {
    const element = elementRef.current;
    const container = containerRef?.current;
    if (!element || !enabled) return;

    // Load Draggable plugin dynamically
    const Draggable = await loadDraggable();

    // Velocity tracking
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();
    let velocityX = 0;
    let velocityY = 0;
    const velocitySamples: { vx: number; vy: number }[] = [];
    const MAX_SAMPLES = 5;

    // Create draggable with momentum
    Draggable.create(element, {
      type: 'x,y',
      bounds: container || undefined,
      edgeResistance: resistance,
      cursor: 'grab',
      activeCursor: 'grabbing',

      onDragStart: function() {
        // Kill any ongoing momentum animation
        gsap.killTweensOf(element);

        // Reset velocity tracking
        lastX = this.x;
        lastY = this.y;
        lastTime = Date.now();
        velocityX = 0;
        velocityY = 0;
        velocitySamples.length = 0;
      },

      onDrag: function() {
        const now = Date.now();
        const dt = now - lastTime;

        // Calculate velocity (pixels per millisecond)
        if (dt > 0) {
          const vx = (this.x - lastX) / dt;
          const vy = (this.y - lastY) / dt;

          // Store velocity samples
          velocitySamples.push({ vx, vy });
          if (velocitySamples.length > MAX_SAMPLES) {
            velocitySamples.shift();
          }

          // Calculate average velocity from samples
          velocityX = velocitySamples.reduce((sum, s) => sum + s.vx, 0) / velocitySamples.length;
          velocityY = velocitySamples.reduce((sum, s) => sum + s.vy, 0) / velocitySamples.length;
        }

        lastX = this.x;
        lastY = this.y;
        lastTime = now;
      },

      onDragEnd: function() {
        // Convert velocity to pixels per second and apply momentum
        const targetX = this.x + velocityX * 1000 * duration * 0.5;
        const targetY = this.y + velocityY * 1000 * duration * 0.5;

        // Get bounds if container exists
        let bounds: { minX?: number; maxX?: number; minY?: number; maxY?: number } | undefined;
        if (container) {
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();

          bounds = {
            minX: 0,
            maxX: containerRect.width - elementRect.width,
            minY: 0,
            maxY: containerRect.height - elementRect.height,
          };
        }

        // Constrain target to bounds
        const constrainedX = bounds ? Math.max(bounds.minX || 0, Math.min(bounds.maxX || 0, targetX)) : targetX;
        const constrainedY = bounds ? Math.max(bounds.minY || 0, Math.min(bounds.maxY || 0, targetY)) : targetY;

        // Only animate if velocity is significant
        const totalVelocity = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        if (totalVelocity > 0.01) {
          // Apply momentum animation - Draggable reads element transform on next drag
          gsap.to(element, {
            x: constrainedX,
            y: constrainedY,
            duration: duration * Math.min(totalVelocity * 20, 1), // Scale duration by velocity
            ease: easing,
          });
        }
      },
    });

    return () => {
      Draggable.get(element)?.kill();
      gsap.killTweensOf(element);
    };
  }, [elementRef, containerRef, enabled, resistance, duration, easing]);
}

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { loadDraggable, gsap } from '@/lib/gsap-config';

export function MomentumDraggable() {
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(async () => {
    const box = boxRef.current;
    const container = containerRef.current;
    if (!box || !container) return;

    // Load Draggable plugin dynamically
    const Draggable = await loadDraggable();

    // Velocity tracking variables
    let lastX = 0;
    let lastY = 0;
    let lastTime = Date.now();
    let velocityX = 0;
    let velocityY = 0;
    const velocitySamples: { vx: number; vy: number }[] = [];
    const MAX_SAMPLES = 5;

    Draggable.create(box, {
      type: 'x,y',
      bounds: container,
      edgeResistance: 0.8,
      cursor: 'grab',
      activeCursor: 'grabbing',

      onDragStart: function() {
        // Kill any ongoing momentum animation
        gsap.killTweensOf(box);

        // Reset velocity tracking
        lastX = this.x;
        lastY = this.y;
        lastTime = Date.now();
        velocitySamples.length = 0;
      },

      onDrag: function() {
        const now = Date.now();
        const dt = now - lastTime;

        // Calculate and store velocity
        if (dt > 0) {
          const vx = (this.x - lastX) / dt;
          const vy = (this.y - lastY) / dt;

          velocitySamples.push({ vx, vy });
          if (velocitySamples.length > MAX_SAMPLES) {
            velocitySamples.shift();
          }

          // Average velocity for smoothness
          velocityX = velocitySamples.reduce(
            (sum, s) => sum + s.vx, 0
          ) / velocitySamples.length;
          velocityY = velocitySamples.reduce(
            (sum, s) => sum + s.vy, 0
          ) / velocitySamples.length;
        }

        lastX = this.x;
        lastY = this.y;
        lastTime = now;
      },

      onDragEnd: function() {
        // Calculate target position based on velocity
        const duration = 1.5;
        const targetX = this.x + velocityX * 1000 * duration * 0.5;
        const targetY = this.y + velocityY * 1000 * duration * 0.5;

        // Get bounds
        const containerRect = container.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();

        // Constrain to bounds
        const constrainedX = Math.max(
          0,
          Math.min(containerRect.width - boxRect.width, targetX)
        );
        const constrainedY = Math.max(
          0,
          Math.min(containerRect.height - boxRect.height, targetY)
        );

        // Apply momentum animation
        const totalVelocity = Math.sqrt(
          velocityX * velocityX + velocityY * velocityY
        );

        if (totalVelocity > 0.01) {
          gsap.to(box, {
            x: constrainedX,
            y: constrainedY,
            duration: duration * Math.min(totalVelocity * 20, 1),
            ease: 'power2.out',
            onUpdate: function() {
              // Sync Draggable's internal position
              const draggable = Draggable.get(box);
              if (draggable) {
                draggable.x = gsap.getProperty(box, 'x') as number;
                draggable.y = gsap.getProperty(box, 'y') as number;
              }
            },
          });
        }
      },
    });

    return () => {
      Draggable.get(box)?.kill();
      gsap.killTweensOf(box);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[300px]">
      <div
        ref={boxRef}
        className="w-24 h-24 bg-orange-500 rounded cursor-grab absolute"
      >
        Throw me!
      </div>
    </div>
  );
}`;

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const container2Ref = useRef<HTMLDivElement>(null);
  const container3Ref = useRef<HTMLDivElement>(null);

  // Free throw with momentum
  useMomentumDraggable(box1Ref, { current: null });

  // Bounded throw with bounce
  useMomentumDraggable(box2Ref, container2Ref, { resistance: 0.9 });

  // Snappy throw (shorter duration, snappier feel)
  useMomentumDraggable(box3Ref, container3Ref, { duration: 0.8, easing: 'back.out(1.2)' });

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
        <p className="text-zinc-500 mt-3 ml-7">Throw the boxes and watch them glide</p>
      </div>

      {/* Demo draggable boxes */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* Free throw - unlimited momentum */}
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden mb-8">
          <div className="relative p-12 h-[250px] flex items-center justify-center">
            {/* Velocity indicator */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-800/80 border border-zinc-700 rounded text-xs font-mono text-orange-500">
              VELOCITY TRACKED
            </div>

            <div
              ref={box1Ref}
              className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center select-none absolute"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="text-center">
                <div className="text-3xl mb-1">🚀</div>
                <div className="text-black text-xs font-black uppercase tracking-wider">Free Throw</div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-4">
            <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-1">
              UNBOUNDED MOMENTUM
            </div>
            <div className="text-zinc-400 text-sm">
              Throw anywhere - glides with physics-based deceleration
            </div>
          </div>
        </div>

        {/* Bounded throw with bounce */}
        <div
          ref={container2Ref}
          className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden mb-8 relative"
        >
          <div className="relative p-12 h-[300px]">
            {/* Corner accents to show bounds */}
            <div className="absolute top-8 left-8 w-4 h-4 border-l border-b border-cyan-500/30" />
            <div className="absolute top-8 right-8 w-4 h-4 border-r border-b border-cyan-500/30" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-t border-cyan-500/30" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-t border-cyan-500/30" />

            <div
              ref={box2Ref}
              className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center select-none absolute"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="text-center">
                <div className="text-3xl mb-1">🎳</div>
                <div className="text-black text-xs font-black uppercase tracking-wider">Bounded</div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-4">
            <div className="text-cyan-500 text-xs font-black tracking-[0.2em] uppercase mb-1">
              BOUNDED + EDGE RESISTANCE
            </div>
            <div className="text-zinc-400 text-sm">
              Throws stop at edges - velocity-based continuation
            </div>
          </div>
        </div>

        {/* Snappy throw */}
        <div
          ref={container3Ref}
          className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden relative"
        >
          <div className="relative p-12 h-[300px]">
            {/* Corner accents to show bounds */}
            <div className="absolute top-8 left-8 w-4 h-4 border-l border-b border-green-500/30" />
            <div className="absolute top-8 right-8 w-4 h-4 border-r border-b border-green-500/30" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-t border-green-500/30" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-t border-green-500/30" />

            <div
              ref={box3Ref}
              className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center select-none absolute"
              style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
            >
              <div className="text-center">
                <div className="text-3xl mb-1">⚡</div>
                <div className="text-black text-xs font-black uppercase tracking-wider">Snappy</div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-4">
            <div className="text-green-500 text-xs font-black tracking-[0.2em] uppercase mb-1">
              SNAP BACK EASING
            </div>
            <div className="text-zinc-400 text-sm">
              Quick momentum with playful bounce-back effect
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DraggableMomentumPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Draggable"
        difficulty="Intermediate"
        title="Momentum"
        titleHighlight="Draggable"
        description="Add natural momentum and inertia to draggable elements. Creates smooth, physics-based interactions."
        features={[
          { label: 'momentum: true' },
          { label: 'resistance' },
          { label: 'LiveSnap' }]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="draggable-momentum" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="draggable-momentum" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Throw</span>?
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
