import { Navbar } from '@/components/navigation/navbar';
import { ReducedMotionPattern } from './reduced-motion-pattern';

export default function ReducedMotionPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <ReducedMotionPattern />
    </main>
  );
}
