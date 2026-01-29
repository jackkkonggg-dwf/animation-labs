'use client';

import { CursorTrailSection } from './components/CursorTrailSection';
import { VelocityScrollSection } from './components/VelocityScrollSection';
import { DirectionScrollSection } from './components/DirectionScrollSection';
import { SwipeGestureSection } from './components/SwipeGestureSection';
import { PinchZoomSection } from './components/PinchZoomSection';
import { HoverInterruptSection } from './components/HoverInterruptSection';
import { ObserverSection } from './components/ObserverSection';

export default function GestureScrollPage() {
  return (
    <main className="min-h-screen" style={{ overscrollBehavior: 'none' }}>
      {/* Info banner */}
      <div className="sticky top-[72px] z-40 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
              Advanced Pattern
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm">Gesture + Scroll Hybrid</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 text-xs font-mono">7 SECTIONS</span>
          </div>
        </div>
      </div>

      {/* Gesture scroll sections */}
      <CursorTrailSection />
      <VelocityScrollSection />
      <DirectionScrollSection />
      <SwipeGestureSection />
      <PinchZoomSection />
      <HoverInterruptSection />
      <ObserverSection />

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            Featuring: quickTo(), useScrollVelocity(), useSwipeCallback(), Observer, hover interrupt
          </p>
        </div>
      </footer>
    </main>
  );
}
