import { Navbar } from '@/components/navigation/navbar';
import { BasicDraggablePattern } from './basic-draggable-pattern';

export default function BasicDraggablePage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <BasicDraggablePattern />
    </main>
  );
}
