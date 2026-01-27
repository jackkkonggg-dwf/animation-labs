import { Navbar } from "@/app/components/navigation/navbar";
import { DemoGrid } from "@/app/components/navigation/demo-grid";
import { ThemeVersionsSection } from "@/app/components/theme-versions-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <DemoGrid />
      <ThemeVersionsSection />
    </main>
  );
}
