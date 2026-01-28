import { Navbar } from '@/components/navigation/navbar';
import { SvgDrawPattern } from '@/components/patterns/svg-draw-pattern';

export default function SvgDrawPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <SvgDrawPattern />
    </main>
  );
}
