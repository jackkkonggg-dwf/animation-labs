'use client';

import { CursorTrailSection } from './_components/cursor-trail-section';
import { VelocityScrollSection } from './_components/velocity-scroll-section';
import { DirectionScrollSection } from './_components/direction-scroll-section';
import { SwipeGestureSection } from './_components/swipe-gesture-section';
import { PinchZoomSection } from './_components/pinch-zoom-section';
import { HoverInterruptSection } from './_components/hover-interrupt-section';
import { ObserverSection } from './_components/observer-section';

export default function GestureScrollPage() {
  return (
    <main className="min-h-screen" style={{ overscrollBehavior: 'none' }}>
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
