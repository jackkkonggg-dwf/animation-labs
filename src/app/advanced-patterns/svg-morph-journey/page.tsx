import { MorphingJourneySection } from './_components/morphing-journey-section';
import { MotionPathJourneySection } from './_components/motion-path-section';
import { InteractiveMorphSection } from './_components/interactive-morph-section';
import { CombinedShowcaseSection } from './_components/combined-showcase-section';

export default function SVGMorphJourneyPage() {
  return (
    <main className="min-h-screen">
      {/* Info banner */}
      <div className="sticky top-[72px] z-40 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-orange-500 text-xs font-black tracking-[0.2em] uppercase">
              Advanced Pattern
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400 text-sm">SVG Morph & MotionPath</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 text-xs font-mono">MORPHSVG + MOTIONPATH</span>
          </div>
        </div>
      </div>

      {/* Journey sections */}
      <MorphingJourneySection />
      <MotionPathJourneySection />
      <InteractiveMorphSection />
      <CombinedShowcaseSection />

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            Featuring: MorphSVGPlugin, MotionPathPlugin, DrawSVGPlugin, SVG filters, scroll-triggered morphing
          </p>
        </div>
      </footer>
    </main>
  );
}
