'use client';

import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, Draggable, InertiaPlugin } from '@/lib/gsap-config';

// ============================================================================
// PHYSICS BOX COMPONENT
// ============================================================================

interface PhysicsBoxProps {
  id: string;
  index: number;
  color: string;
  gridSize: number;
  onCollision: (id: string, isColliding: boolean) => void;
}

function PhysicsBox({ id, index, color, gridSize, onCollision }: PhysicsBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  useGSAP(() => {
    const box = boxRef.current;
    if (!box) return;

    // Create draggable with inertia for momentum physics
    const draggable = Draggable.create(box, {
      type: 'x,y',
      edgeResistance: 0.65,
      bounds: '#playground-boundary',

      // Snap to grid with liveSnap for immediate feedback during drag
      liveSnap: {
        x: (value) => Math.round(value / gridSize) * gridSize,
        y: (value) => Math.round(value / gridSize) * gridSize,
      },

      // Inertia plugin config for momentum after release with snap
      // Note: snap.x/y is supported at runtime, use type assertion for TS
      inertia: {
        snap: {
          x: (value: number) => Math.round(value / gridSize) * gridSize,
          y: (value: number) => Math.round(value / gridSize) * gridSize,
        } as any,
        resistance: 1000,
      } as any,

      // Track velocity during drag
      onDrag: function() {
        const v = this.velocity();
        if (v) {
          setVelocity({ x: Math.round(v.x), y: Math.round(v.y) });
        }
        checkCollisions();
      },

      onDragEnd: function() {
        setVelocity({ x: 0, y: 0 });
        checkCollisions();
      },

      onThrowUpdate: function() {
        checkCollisions();
      },

      onThrowComplete: function() {
        setVelocity({ x: 0, y: 0 });
        checkCollisions();
      },
    })[0];

    // Collision detection using Draggable.hitTest
    const checkCollisions = () => {
      if (!box) return;
      let isColliding = false;

      // Get all other boxes
      const allBoxes = document.querySelectorAll('.physics-box');
      allBoxes.forEach((otherBox) => {
        if (otherBox === box) return;
        if (Draggable.hitTest(box, otherBox, '50%')) {
          isColliding = true;
        }
      });

      onCollision(id, isColliding);
    };

    return () => {
      draggable.kill();
    };
  }, [id, gridSize, onCollision]);

  return (
    <div
      ref={boxRef}
      className="physics-box absolute w-24 h-24 cursor-grab active:cursor-grabbing select-none"
      style={{
        backgroundColor: color,
        left: 50 + (index * 130),
        top: 50 + (index * 30),
      }}
      data-id={id}
    >
      {/* Box content */}
      <div className="w-full h-full flex flex-col items-center justify-center text-white">
        <span className="text-xs font-mono opacity-70">ID: {id}</span>
        <span className="text-xs font-mono opacity-70">
          V: {Math.abs(velocity.x) + Math.abs(velocity.y)}
        </span>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/30" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/30" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/30" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/30" />
    </div>
  );
}

// ============================================================================
// ROTATION DRAGGABLE COMPONENT
// ============================================================================

interface RotationSpinnerProps {
  gridSize: number;
}

function RotationSpinner({ gridSize }: RotationSpinnerProps) {
  const spinnerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useGSAP(() => {
    const spinner = spinnerRef.current;
    if (!spinner) return;

    const draggable = Draggable.create(spinner, {
      type: 'rotation',
      edgeResistance: 0.65,

      // Snap to 45-degree increments
      snap: (value) => Math.round(value / 45) * 45,

      // Inertia plugin config for momentum after release with snap
      inertia: {
        snap: (value: number) => Math.round(value / 45) * 45,
        resistance: 1000,
      } as any,

      onDrag: function() {
        setRotation(Math.round(this.rotation));
      },

      onDragEnd: function() {
        setRotation(Math.round(this.rotation));
      },

      onThrowUpdate: function() {
        setRotation(Math.round(this.rotation));
      },

      onThrowComplete: function() {
        setRotation(Math.round(this.rotation));
      },
    })[0];

    return () => {
      draggable.kill();
    };
  }, [gridSize]);

  return (
    <div
      ref={spinnerRef}
      className="absolute w-32 h-32 cursor-grab active:cursor-grabbing select-none rounded-full"
      style={{
        background: 'conic-gradient(from 0deg, #f97316, #ea580c, #c2410c, #f97316)',
        left: '50%',
        bottom: '80px',
        transform: 'translateX(-50%)',
      }}
    >
      {/* Rotation indicator */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center">
          <span className="text-white font-mono text-sm">{rotation}°</span>
        </div>
      </div>

      {/* Direction indicator */}
      <div
        className="absolute top-0 left-1/2 w-1 h-4 bg-white -translate-x-1/2 origin-bottom"
        style={{ transform: `translateX(-50%) rotate(${-rotation}deg)` }}
      />
    </div>
  );
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

const BOX_COLORS = [
  'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
  'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
  'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
];

export default function PhysicsPlaygroundPage() {
  const [gridSize, setGridSize] = useState(50);
  const [collisions, setCollisions] = useState<Record<string, boolean>>({});
  const [showGrid, setShowGrid] = useState(true);

  const handleCollision = useCallback((id: string, isColliding: boolean) => {
    setCollisions((prev) => ({ ...prev, [id]: isColliding }));

    // Visual feedback on collision - scale bounce and color shift
    const box = document.querySelector(`[data-id="${id}"]`) as HTMLElement;
    if (!box) return;

    if (isColliding) {
      gsap.to(box, {
        scale: 1.15,
        filter: 'brightness(1.3)',
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });

      gsap.to(box, {
        rotation: '+=10',
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut',
      });
    } else {
      gsap.to(box, {
        scale: 1,
        filter: 'brightness(1)',
        rotation: 0,
        duration: 0.3,
        ease: 'elastic.out(1, 0.5)',
      });
    }
  }, []);

  const toggleGrid = () => setShowGrid((prev) => !prev);

  const changeGridSize = (size: number) => {
    setGridSize(size);
  };

  const resetPositions = () => {
    const boxes = document.querySelectorAll('.physics-box');
    boxes.forEach((box, index) => {
      gsap.to(box, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
      });
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Info banner */}
      <div className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
              Advanced Pattern
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm">Drag elements with physics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 text-xs font-mono">DRAGGABLE + INERTIA</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-zinc-900/50 border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-6">
          {/* Grid toggle */}
          <button
            onClick={toggleGrid}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded text-sm font-mono text-zinc-300 hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            {showGrid ? 'Hide Grid' : 'Show Grid'}
          </button>

          {/* Grid size selector */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-500 text-xs font-mono uppercase">Grid Size:</span>
            {[25, 50, 100].map((size) => (
              <button
                key={size}
                onClick={() => changeGridSize(size)}
                className={`px-3 py-1 border rounded text-xs font-mono transition-colors ${
                  gridSize === size
                    ? 'bg-orange-500 border-orange-500 text-black'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-orange-500'
                }`}
              >
                {size}px
              </button>
            ))}
          </div>

          {/* Reset button */}
          <button
            onClick={resetPositions}
            className="px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded text-sm font-mono text-orange-500 hover:bg-orange-500/20 transition-colors"
          >
            Reset Positions
          </button>

          {/* Collision status */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-zinc-500 text-xs font-mono uppercase">Collisions:</span>
            <span className={`text-sm font-mono ${Object.values(collisions).some((v) => v) ? 'text-red-500' : 'text-green-500'}`}>
              {Object.values(collisions).filter((v) => v).length}
            </span>
          </div>
        </div>
      </div>

      {/* Playground */}
      <div className="relative">
        <div
          id="playground-boundary"
          className="relative mx-auto max-w-6xl h-[700px] border-x border-zinc-800 overflow-hidden"
          style={{
            backgroundImage: showGrid
              ? `
                  linear-gradient(to right, #27272a 1px, transparent 1px),
                  linear-gradient(to bottom, #27272a 1px, transparent 1px)
                `
              : 'none',
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, #f97316 1px, transparent 0)
            `,
            backgroundSize: '40px 40px'
          }} />

          {/* Draggable boxes */}
          {BOX_COLORS.map((color, index) => (
            <PhysicsBox
              key={`box-${index}`}
              id={`box-${index}`}
              index={index}
              color={color}
              gridSize={gridSize}
              onCollision={handleCollision}
            />
          ))}

          {/* Collision indicator overlays */}
          {Object.entries(collisions).map(([id, isColliding]) =>
            isColliding ? (
              <div
                key={`collision-${id}`}
                className="absolute pointer-events-none"
                style={{
                  left: `calc(50px + ${parseInt(id.split('-')[1]) * 130}px)`,
                  top: `calc(50px + ${parseInt(id.split('-')[1]) * 30}px)`,
                  width: '96px',
                  height: '96px',
                  border: '2px solid #ef4444',
                  borderRadius: '8px',
                  animation: 'collision-pulse 0.3s ease-in-out infinite',
                }}
              />
            ) : null
          )}

          {/* Rotation spinner */}
          <RotationSpinner gridSize={gridSize} />

          {/* Info overlay */}
          <div className="absolute bottom-4 left-4 bg-zinc-900/90 backdrop-blur border border-zinc-700 rounded-lg p-4 max-w-xs">
            <h3 className="text-orange-500 text-xs font-black uppercase tracking-wider mb-2">
              Physics Features
            </h3>
            <ul className="space-y-1 text-xs text-zinc-400 font-mono">
              <li>• Drag with momentum (InertiaPlugin)</li>
              <li>• Snap-to-grid alignment</li>
              <li>• Collision detection</li>
              <li>• Rotation spinner (45° snaps)</li>
              <li>• Visual feedback on collision</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            Featuring: Draggable, InertiaPlugin, liveSnap, hitTest(), edgeResistance
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes collision-pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
      `}</style>
    </main>
  );
}
