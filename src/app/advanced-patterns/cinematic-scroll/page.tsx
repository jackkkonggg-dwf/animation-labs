import { HeroSection } from './_components/hero-section';
import { TextRevealSection } from './_components/text-reveal-section';
import { HorizontalCarouselSection } from './_components/horizontal-carousel-section';
import { ImageRevealSection } from './_components/image-reveal-section';
import { FinaleSection } from './_components/finale-section';

export default function CinematicScrollPage() {
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
            <span className="text-zinc-400 text-sm">Scroll to experience</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-zinc-500 text-xs font-mono">5 PINNED SECTIONS</span>
          </div>
        </div>
      </div>

      {/* Cinematic sections */}
      <HeroSection />
      <TextRevealSection />
      <HorizontalCarouselSection />
      <ImageRevealSection />
      <FinaleSection />

      {/* Footer */}
      <footer className="bg-zinc-900/50 border-t border-zinc-800 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm font-mono">
            Featuring: pin: true, nested timelines, back.out, elastic.out, expo.inOut, horizontal scroll
          </p>
        </div>
      </footer>
    </main>
  );
}
