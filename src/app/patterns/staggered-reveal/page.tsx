import { Navbar } from '@/components/navigation/navbar';
import { StaggeredRevealPattern } from './staggered-reveal-pattern';

export default function StaggeredRevealPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <StaggeredRevealPattern />
    </main>
  );
}
