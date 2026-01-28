import { HorizontalScroll } from './_components/horizontal-scroll';

export default function HorizontalScrollPage() {
  return (
    <main className="min-h-screen bg-black">
      <HorizontalScroll routeId="horizontal-scroll" />
      <section className="h-screen flex items-center justify-center bg-gradient-to-b from-black to-[#0a0a0f]">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-white mb-4">You've Reached The End</h2>
          <p className="text-xl text-cyan-400">Scroll up to explore again</p>
        </div>
      </section>
    </main>
  );
}
