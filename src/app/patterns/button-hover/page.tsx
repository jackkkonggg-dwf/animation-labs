import { Navbar } from '@/components/navigation/navbar';
import { ButtonHoverPattern } from './button-hover-pattern';

export default function ButtonHoverPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <ButtonHoverPattern />
    </main>
  );
}
