import { Navbar } from '@/components/navigation/navbar';
import { ScaleRevealPattern } from './scale-reveal-pattern';

export default function ScaleRevealPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <ScaleRevealPattern />
    </main>
  );
}
