import { DWFCBrutalistThemeClient } from './page-client';

export const metadata = {
  title: 'DWF Brutalist - Raw Yield Analytics',
  description: 'Neo-brutalist yield farming analytics with aggressive data visualization. Acid green aesthetic, zero compromises.',
};

export default function DWFCBrutalistThemePage() {
  return (
    <>
      {/* Google Fonts - Oswald for display, JetBrains Mono for code aesthetic */}
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Oswald:wght@500;700&display=swap"
        rel="stylesheet"
      />
      <DWFCBrutalistThemeClient />
    </>
  );
}
