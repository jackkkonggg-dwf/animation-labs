import { Navbar } from '@/components/navigation/navbar';
import { CardTiltPattern } from '@/components/patterns/card-tilt-pattern';

export default function CardTiltPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <CardTiltPattern />
    </main>
  );
}
