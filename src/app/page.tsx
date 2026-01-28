import { Suspense } from "react";
import { DemoGrid } from "@/app/components/navigation/demo-grid";
import { ThemeVersionsSection } from "@/app/components/theme-versions-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Suspense fallback={<DemoGridFallback />}>
        <DemoGrid />
      </Suspense>
      <ThemeVersionsSection />
    </main>
  );
}

// Fallback component for Suspense
function DemoGridFallback() {
  return (
    <section className="min-h-screen bg-zinc-950 pt-32 md:pt-40 pb-16 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] grid-pattern-overlay-lg" />
      <div className="absolute top-0 right-0 w-[1px] h-96 bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 md:mb-16">
          <div className="flex items-end gap-4 mb-4">
            <div className="h-12 w-1 bg-orange-500" />
            <div>
              <span className="text-[10px] text-orange-500 uppercase tracking-[0.3em] block mb-2">
                Experiments
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-none">
                Animation
                <span className="block text-orange-500">Labs</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="text-center py-20">
          <p className="text-zinc-600 text-sm uppercase tracking-wider">Loading...</p>
        </div>
      </div>
    </section>
  );
}
