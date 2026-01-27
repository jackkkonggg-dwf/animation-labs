import { Navbar } from '@/components/navigation/navbar';
import { FadeRevealPattern } from '@/components/patterns/fade-reveal-pattern';

export default function FadeRevealPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <FadeRevealPattern />
    </main>
  );
}
