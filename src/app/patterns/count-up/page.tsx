import { Navbar } from '@/components/navigation/navbar';
import { CountUpPattern } from '@/components/patterns/count-up-pattern';

export default function CountUpPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <CountUpPattern />
    </main>
  );
}
