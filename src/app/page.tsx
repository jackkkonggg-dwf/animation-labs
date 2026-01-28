import { Navbar } from "@/components/navigation/navbar";
import { CategoryGrid } from "@/components/navigation/category-grid";
import { DemoGrid } from "@/components/navigation/demo-grid";
import { ThemeVersionsSection } from "@/components/theme-versions-section";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <Suspense fallback={<CategoryGridFallback />}>
        <CategoryGrid />
      </Suspense>
      <Suspense fallback={<DemoGridFallback />}>
        <DemoGrid />
      </Suspense>
      <ThemeVersionsSection />
    </main>
  );
}

// Fallback component for CategoryGrid Suspense
function CategoryGridFallback() {
  return (
    <section className="min-h-screen bg-zinc-950 pt-32 md:pt-40 pb-16 px-4 md:px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] grid-pattern-overlay-xl" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 md:mb-20">
          <div className="flex items-end gap-4 mb-6">
            <div className="h-16 w-1 bg-orange-500" />
            <div>
              <span className="text-[10px] text-orange-500 uppercase tracking-[0.3em] block mb-3">
                Pattern Library
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-none">
                GSAP
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
                  Showcase
                </span>
              </h1>
            </div>
          </div>
        </div>
        <div className="text-center py-20">
          <p className="text-zinc-600 text-sm uppercase tracking-wider">Loading categories...</p>
        </div>
      </div>
    </section>
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
