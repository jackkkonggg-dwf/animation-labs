import { Navbar } from "@/components/navigation/navbar";
import { DemoGrid } from "@/components/navigation/demo-grid";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <DemoGrid />
    </main>
  );
}
