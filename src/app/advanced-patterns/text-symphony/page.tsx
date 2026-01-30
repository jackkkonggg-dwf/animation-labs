import { HeroSection } from './_components/hero-section';
import { CharacterCascadeSection } from './_components/character-cascade-section';
import { WordRevealSection } from './_components/word-reveal-section';
import { LineByLineSection } from './_components/line-by-line-section';
import { ScrollScrubSection } from './_components/scroll-scrub-section';
import { GradientBlendSection } from './_components/gradient-blend-section';

// CSS for reduced motion
const reducedMotionStyles = `
  @media (prefers-reduced-motion: reduce) {
    .split-text-reduced * {
      transition: none !important;
      animation: none !important;
      transform: none !important;
      opacity: 1 !important;
    }
  }
`;

export default function TextSymphonyPage() {
  return (
    <>
      <style>{reducedMotionStyles}</style>
      <main className="min-h-screen">

        {/* Text symphony sections */}
        <HeroSection />
        <CharacterCascadeSection />
        <WordRevealSection />
        <LineByLineSection />
        <ScrollScrubSection />
        <GradientBlendSection />

        {/* Footer */}
        <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-zinc-500 text-sm font-mono mb-4">
              Featuring: SplitText, character/word/line splits, stagger animations, scroll scrub
            </p>
            <p className="text-zinc-600 text-xs">
              Supports prefers-reduced-motion for accessibility
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
