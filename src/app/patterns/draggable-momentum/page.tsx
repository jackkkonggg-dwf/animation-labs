import { Navbar } from '@/components/navigation/navbar';
import { DraggableMomentumPattern } from '@/components/patterns/draggable-momentum-pattern';

export default function DraggableMomentumPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <DraggableMomentumPattern />
    </main>
  );
}
