import { MorphingJourneySection } from './_components/morphing-journey-section';
import { MotionPathJourneySection } from './_components/motion-path-section';
import { InteractiveMorphSection } from './_components/interactive-morph-section';
import { CombinedShowcaseSection } from './_components/combined-showcase-section';

export default function SVGMorphJourneyPage() {
  return (
    <main className="min-h-screen">

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
