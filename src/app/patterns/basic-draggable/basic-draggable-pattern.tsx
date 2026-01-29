'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { Draggable } from '@/lib/gsap-config';
import { PatternHeader, CodeViewer } from '@/components/patterns';
import { RelatedPatterns } from '@/components/patterns/related-patterns';
import { PatternNavigation } from '@/components/patterns/pattern-navigation';
import Link from 'next/link';

// ============================================================================
// CODE EXAMPLE
// ============================================================================

const CODE_EXAMPLE = `
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Draggable } from '@/lib/gsap-config';

export function BasicDraggableComponent() {
  const boxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const box = boxRef.current;
    if (!box) return;

    // Make element draggable
    Draggable.create(box, {
      type: 'x,y',           // 'x', 'y', 'x,y', or 'rotation'
      inertia: false,        // Add inertia with InertiaPlugin
      edgeResistance: 0.65,  // Resistance when hitting bounds
      bounds: containerRef.current,  // Constrain to element
      cursor: 'grab',        // Cursor when not dragging
      activeCursor: 'grabbing',      // Cursor when dragging

      // Event callbacks
      onDragStart: function() {
        console.log('Drag started');
      },
      onDrag: function() {
        console.log('Dragging...', this.x, this.y);
      },
      onDragEnd: function() {
        console.log('Drag ended');
      },
    });

    return () => {
      Draggable.get(box)?.kill();
    };
  }, []);

  return (
    <div ref={boxRef} className="w-32 h-32 bg-orange-500 rounded cursor-grab">
      Drag me!
    </div>
  );
}`;

// ============================================================================
// LIVE DEMO SECTION
// ============================================================================

function LiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);
  const [draggableLoaded, setDraggableLoaded] = useState(false);

  useGSAP(() => {
    const box1 = box1Ref.current;
    const box2 = box2Ref.current;
    const box3 = box3Ref.current;

    if (!box1 || !box2 || !box3) return;

    setDraggableLoaded(true);

    // Free drag - no constraints
    Draggable.create(box1, {
      type: 'x,y',
      inertia: false,
      edgeResistance: 0.65,
      cursor: 'grab',
      activeCursor: 'grabbing',
    });

    // Horizontal drag only
    Draggable.create(box2, {
      type: 'x',
      edgeResistance: 0.65,
      bounds: containerRef.current,
      cursor: 'grab',
      activeCursor: 'grabbing',
    });

    // Constrained drag within container
    Draggable.create(box3, {
      type: 'x,y',
      edgeResistance: 0.65,
      bounds: containerRef.current,
      cursor: 'grab',
      activeCursor: 'grabbing',
    });

    return () => {
      Draggable.get(box1)?.kill();
      Draggable.get(box2)?.kill();
      Draggable.get(box3)?.kill();
    };
  }, []);

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
        <p className="text-zinc-500 mt-3 ml-7">Drag the boxes around to interact</p>
      </div>

      {/* Demo draggable boxes */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        {/* Unconstrained drag */}
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden mb-8">
          <div className="relative p-12 h-[200px] flex items-center justify-center">
            <div
              ref={box1Ref}
              className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
            >
              <div className="text-center">
                <div className="text-3xl mb-1">🎯</div>
                <div className="text-black text-xs font-black uppercase tracking-wider">Free Drag</div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-4">
            <div className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase mb-1">
              TYPE: X,Y
            </div>
            <div className="text-zinc-400 text-sm">
              Drag anywhere - no constraints
            </div>
          </div>
        </div>

        {/* Horizontal only */}
        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden mb-8">
          <div className="relative p-12 h-[200px]">
            <div
              ref={box2Ref}
              className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center select-none absolute left-12 top-1/2 -translate-y-1/2"
            >
              <div className="text-center">
                <div className="text-3xl mb-1">↔️</div>
                <div className="text-black text-xs font-black uppercase tracking-wider">Horizontal</div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-4">
            <div className="text-cyan-500 text-xs font-black tracking-[0.2em] uppercase mb-1">
              TYPE: X
            </div>
            <div className="text-zinc-400 text-sm">
              Drag left or right only
            </div>
          </div>
        </div>

        {/* Bounded drag */}
        <div
          ref={containerRef}
          className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg overflow-hidden relative"
        >
          <div className="relative p-12 h-[300px]">
            {/* Corner accents to show bounds */}
            <div className="absolute top-8 left-8 w-4 h-4 border-l border-b border-orange-500/30" />
            <div className="absolute top-8 right-8 w-4 h-4 border-r border-b border-orange-500/30" />
            <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-t border-orange-500/30" />
            <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-t border-orange-500/30" />

            <div
              ref={box3Ref}
              className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="text-center">
                <div className="text-3xl mb-1">📦</div>
                <div className="text-black text-xs font-black uppercase tracking-wider">Bounded</div>
              </div>
            </div>
          </div>
          <div className="px-6 pb-4">
            <div className="text-green-500 text-xs font-black tracking-[0.2em] uppercase mb-1">
              BOUNDS: CONTAINER
            </div>
            <div className="text-zinc-400 text-sm">
              Drag anywhere - stays within box
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BasicDraggablePattern() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <PatternHeader
        category="Draggable"
        difficulty="Beginner"
        title="Draggable"
        titleHighlight="Basic"
        description="Make any element draggable with user input. Perfect for sliders, sortable lists, and interactive components."
        features={[
          { label: 'Draggable.create' },
          { label: 'type: "x"' },
          { label: 'edgeResistance' },
        ]}
      />
      <LiveDemo />
      <CodeViewer code={CODE_EXAMPLE} language="tsx" filename="tsx" />

      {/* Related Patterns */}
      <RelatedPatterns currentPatternId="basic-draggable" />

      {/* Pattern Navigation */}
      <PatternNavigation currentPatternId="basic-draggable" />

      {/* Footer CTA */}
      <section className="relative border-t border-orange-500/20 bg-zinc-900/30">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-6">
            Ready to <span className="text-orange-500">Drag</span>?
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
