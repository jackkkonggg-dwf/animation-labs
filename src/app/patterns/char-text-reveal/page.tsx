import { Navbar } from '@/components/navigation/navbar';
import { CharTextRevealPattern } from '@/components/patterns/char-text-reveal-pattern';

export default function CharTextRevealPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <CharTextRevealPattern />
    </main>
  );
}
