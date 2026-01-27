import { Navbar } from '@/app/components/navigation/navbar';
import { DWFFuturisticThemeClient } from './page-client';

export default function FuturisticThemePage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <DWFFuturisticThemeClient />
    </main>
  );
}
