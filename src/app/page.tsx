import { Navbar } from "@/components/navigation/navbar";
import { DemoGrid } from "@/components/navigation/demo-grid";
import { ThemeVersionsSection } from "@/components/theme-versions-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <DemoGrid />
      <ThemeVersionsSection />
    </main>
  );
}
