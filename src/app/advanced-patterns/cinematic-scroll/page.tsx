import { HeroSection } from './_components/hero-section';
import { TextRevealSection } from './_components/text-reveal-section';
import { HorizontalCarouselSection } from './_components/horizontal-carousel-section';
import { ImageRevealSection } from './_components/image-reveal-section';
import { FinaleSection } from './_components/finale-section';

export default function CinematicScrollPage() {
  return (
    <main className="min-h-screen">

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
