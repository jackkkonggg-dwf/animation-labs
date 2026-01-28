'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { Draggable, gsap } from '@/lib/gsap-config';

// ============================================================================
// PATTERN HEADER COMPONENT
// ============================================================================

function PatternHeader() {
  return (
    <header className="relative border-b border-orange-500/20 bg-zinc-900/50 backdrop-blur-sm">
      {/* Corner accent - top left */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-orange-500" />
      {/* Corner accent - bottom right */}
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-orange-500" />

      {/* Diagonal stripe decoration */}
      <div className="absolute top-0 right-0 w-64 h-1 bg-gradient-to-l from-orange-500 to-transparent opacity-50" />

      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Category badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="text-orange-500 text-xs font-black tracking-[0.3em] uppercase">
            Draggable
          </span>
          <span className="w-8 h-px bg-orange-500/50" />
          <span className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase">
            Intermediate
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight uppercase mb-6">
          Draggable with <span className="text-orange-500">Momentum</span>
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl font-light leading-relaxed">
          Add physics-like momentum to your draggable elements. When users release,
          elements continue moving with deceleration based on throw velocity.
        </p>

        {/* Key features */}
        <div className="flex flex-wrap gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">Velocity Tracking</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">Smooth Deceleration</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 border border-zinc-700/50 rounded">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-300 text-sm font-mono">Bounce at Bounds</span>
          </div>
        </div>
      </div>
    </header>
  );
}

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

  useGSAP(() => {
    const element = elementRef.current;
    const container = containerRef?.current;
    if (!element || !enabled) return;

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

// ============================================================================
// CODE VIEWER SECTION WITH COPY
// ============================================================================

function CodeViewerWithCopy() {
  const [copied, setCopied] = useState(false);

  const code = `// ============================================================================
// DRAGGABLE WITH MOMENTUM PATTERN
// ============================================================================

'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Draggable, gsap } from '@/lib/gsap-config';

export function MomentumDraggable() {
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const box = boxRef.current;
    const container = containerRef.current;
    if (!box || !container) return;

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

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative border-b border-zinc-800 bg-zinc-900/30">
      {/* Diagonal stripe decoration */}
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-4">
              <span className="w-3 h-8 bg-orange-500" />
              Code
            </h2>
            <p className="text-zinc-500 mt-3 ml-7">Copy and paste into your project</p>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="group relative px-6 py-3 bg-zinc-800 border border-zinc-700 hover:border-orange-500 rounded transition-all duration-300 flex items-center gap-3"
          >
            <span className="text-zinc-400 group-hover:text-orange-500 transition-colors text-sm font-bold uppercase tracking-wider">
              {copied ? 'Copied!' : 'Copy Code'}
            </span>
            <svg
              className={`w-5 h-5 text-zinc-500 group-hover:text-orange-500 transition-all duration-300 ${copied ? 'scale-110' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
            {/* Scan line effect */}
            <div className="absolute inset-0 overflow-hidden rounded">
              <div className="w-1 h-full bg-white/10 skew-x-[-12deg] translate-x-[-100%] group-hover:translate-x-[400%] transition-transform duration-700 ease-in-out" />
            </div>
          </button>
        </div>

        {/* Code block with syntax highlighting */}
        <div className="relative bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-orange-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-orange-500" />

          {/* Language badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded text-xs font-mono text-zinc-400 uppercase">
            TSX
          </div>

          {/* Code content */}
          <pre className="p-6 pt-8 overflow-x-auto">
            <code className="text-sm font-mono leading-relaxed">
              <span className="text-zinc-500">{`// ============================================================================`}</span>
              <br />
              <span className="text-zinc-500">{`// DRAGGABLE WITH MOMENTUM PATTERN`}</span>
              <br />
              <span className="text-zinc-500">{`// ============================================================================`}</span>
              <br />
              <br />
              <span className="text-purple-400">{`'use client'`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              <span className="text-purple-400">{`import`}</span>
              <span className="text-white">{` { useRef } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` 'react'`}</span>
              <span className="text-white">;</span>
              <br />
              <span className="text-purple-400">{`import`}</span>
              <span className="text-white">{` { useGSAP } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` '@gsap/react'`}</span>
              <span className="text-white">;</span>
              <br />
              <span className="text-purple-400">{`import`}</span>
              <span className="text-white">{` { Draggable, gsap } `}</span>
              <span className="text-purple-400">{`from`}</span>
              <span className="text-cyan-400">{` '@/lib/gsap-config'`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              <span className="text-purple-400">{`export`}</span>
              <span className="text-purple-400">{` function`}</span>
              <span className="text-yellow-300">{` MomentumDraggable`}</span>
              <span className="text-white">() {`{`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` boxRef `}</span>
              <span className="text-purple-400">{`= useRef`}</span>
              <span className="text-orange-400">{`&lt;HTMLDivElement&gt;`}</span>
              <span className="text-white">(null);</span>
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` containerRef `}</span>
              <span className="text-purple-400">{`= useRef`}</span>
              <span className="text-orange-400">{`&lt;HTMLDivElement&gt;`}</span>
              <span className="text-white">(null);</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-blue-400">{`useGSAP`}</span>
              <span className="text-white">(() {`=>`} {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` box `}</span>
              <span className="text-purple-400">{`= boxRef.current`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` container `}</span>
              <span className="text-purple-400">{`= containerRef.current`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`if`}</span>
              <span className="text-white"> (!box </span>
              <span className="text-purple-400">{`||`}</span>
              <span className="text-white"> !container) </span>
              <span className="text-purple-400">{`return`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Velocity tracking variables`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`let`}</span>
              <span className="text-white">{` lastX `}</span>
              <span className="text-purple-400">{`= 0`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`let`}</span>
              <span className="text-white">{` lastY `}</span>
              <span className="text-purple-400">{`= 0`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`let`}</span>
              <span className="text-white">{` lastTime `}</span>
              <span className="text-purple-400">{`= Date.`}</span>
              <span className="text-blue-400">{`now`}</span>
              <span className="text-white">();</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`let`}</span>
              <span className="text-white">{` velocityX `}</span>
              <span className="text-purple-400">{`= 0`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`let`}</span>
              <span className="text-white">{` velocityY `}</span>
              <span className="text-purple-400">{`= 0`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`Draggable.create`}</span>
              <span className="text-white">(box, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`type: 'x,y',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`bounds: container,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`edgeResistance: 0.8,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`cursor: 'grab',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`activeCursor: 'grabbing',`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`onDragStart: function() {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">(box);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Reset velocity tracking`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`lastX = this.x;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`lastY = this.y;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`},`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`onDrag: function() {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Calculate velocity`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` dt `}</span>
              <span className="text-purple-400">{`= Date.`}</span>
              <span className="text-blue-400">{`now`}</span>
              <span className="text-white">() - lastTime;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`if`}</span>
              <span className="text-white"> (dt </span>
              <span className="text-purple-400">{`>`}</span>
              <span className="text-white"> 0) {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`velocityX = (this.x - lastX) / dt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`velocityY = (this.y - lastY) / dt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`lastX = this.x; lastY = this.y;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`},`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`onDragEnd: function() {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Apply momentum animation`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` targetX `}</span>
              <span className="text-purple-400">{`= this.x + velocityX * 1000 * 1.5 * 0.5`}</span>
              <span className="text-white">;</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` targetY `}</span>
              <span className="text-purple-400">{`= this.y + velocityY * 1000 * 1.5 * 0.5`}</span>
              <span className="text-white">;</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.to`}</span>
              <span className="text-white">(box, {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`x: targetX,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`y: targetY,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`duration: 1.5,`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`ease: 'power2.out',`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`onUpdate: function() {`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-zinc-500">{`// Sync Draggable`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`const`}</span>
              <span className="text-white">{` d `}</span>
              <span className="text-purple-400">{`= Draggable.get`}</span>
              <span className="text-white">(box);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`if`}</span>
              <span className="text-white">{` (d) { d.x = gsap.getProperty`}</span>
              <span className="text-white">{`(box, 'x'); }`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`},`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`});`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`},`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`});`}</span>
              <br />
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> () {`=>`} {`{`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`Draggable.get`}</span>
              <span className="text-white">(box)?.{`kill`}</span>
              <span className="text-white">();</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">{`gsap.killTweensOf`}</span>
              <span className="text-white">(box);</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`}`});</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`}`}</span>, <span className="text-white">{`[]`}</span><span className="text-white">{`);`}</span>
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-purple-400">{`return`}</span>
              <span className="text-white"> (</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` ref={containerRef} `}</span>
              <span className="text-cyan-400">{`className="relative h-[300px]"`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;div`}</span>
              <span className="text-white">{` ref={boxRef} `}</span>
              <span className="text-cyan-400">{`className="w-24 h-24 bg-orange-500"`}</span>
              <span className="text-purple-400">{`&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">{`Throw me!`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/div&gt;`}</span>
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">{`&lt;/div&gt;`}</span>
              <br />
              &nbsp;&nbsp;<span className="text-white">{`);`}</span>
              <br />
              <span className="text-white">{`}`}</span>
            </code>
          </pre>

          {/* Bottom scan line */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
        </div>
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
      title: 'VELOCITY TRACKING',
      description: 'Track position changes during drag to calculate velocity. Store multiple samples and average them for smooth, consistent momentum.',
    },
    {
      title: 'ON DRAG END',
      description: 'Apply the momentum animation when the user releases. Calculate target position by multiplying velocity by duration factor.',
    },
    {
      title: 'SYNC DRAGGABLE',
      description: 'Call gsap.getProperty() in onUpdate to sync Draggable\'s internal position. Without this, subsequent drags may snap incorrectly.',
    },
    {
      title: 'KILL TWEENS',
      description: 'Always call gsap.killTweensOf() in onDragStart to stop any ongoing momentum animation before a new drag begins.',
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

export function DraggableMomentumPattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader />
      <LiveDemo />
      <CodeViewerWithCopy />
      <PatternNotes />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Throw</span>?
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
