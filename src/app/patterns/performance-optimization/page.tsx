import { Navbar } from '@/components/navigation/navbar';
import { PerformanceOptimizationPattern } from '@/components/patterns/performance-optimization-pattern';

export default function PerformanceOptimizationPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <PerformanceOptimizationPattern />
    </main>
  );
}
