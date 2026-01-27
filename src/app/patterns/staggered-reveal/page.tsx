import { Navbar } from '@/components/navigation/navbar';
import { StaggeredRevealPattern } from '@/components/patterns/staggered-reveal-pattern';

export default function StaggeredRevealPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <StaggeredRevealPattern />
    </main>
  );
}
