// ============================================================================
// TEXT EFFECTS DATA
// ============================================================================

export type AnimationType = 'slide' | 'scale' | 'blur' | 'char-stagger' | 'word-reveal';
export type LayoutType = 'text-left' | 'text-right' | 'centered' | 'full-width';

export interface TextSection {
  id: string;
  title: string;
  animationType: AnimationType;
  layout: LayoutType;
  lines: string[];
  imageUrl: string;
  imageAlt: string;
}

export const TEXT_SECTIONS: TextSection[] = [
  {
    id: 'slide',
    title: 'Slide Gallery',
    animationType: 'slide',
    layout: 'text-left',
    lines: [
      'David Hockney is',
      'one of the most influential',
      'British artists of the 20th century.',
      'His work explores',
      'the nature of perception,',
      'vision, and representation.',
      'Born in Bradford in 1937,',
      'he changed the course of art history.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
    imageAlt: 'Abstract art composition',
  },
  {
    id: 'scale',
    title: 'Scale Gallery',
    animationType: 'scale',
    layout: 'text-right',
    lines: [
      'Contemporary art challenges',
      'our perception of reality.',
      'Each brushstroke captures',
      'a moment of truth.',
      'The canvas becomes',
      'a window into consciousness.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    imageAlt: 'Modern sculpture',
  },
  {
    id: 'blur',
    title: 'Blur Gallery',
    animationType: 'blur',
    layout: 'full-width',
    lines: [
      'Vision is not passive.',
      'It is an active construction',
      'of meaning from chaos.',
      'To see is to understand.',
      'To understand is to transform.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
    imageAlt: 'Portrait painting',
  },
  {
    id: 'char-stagger',
    title: 'Character Stagger',
    animationType: 'char-stagger',
    layout: 'text-right',
    lines: ['KINETIC', 'TYPOGRAPHY'],
    imageUrl: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    imageAlt: 'Typography poster',
  },
  {
    id: 'word-reveal',
    title: 'Word Reveal',
    animationType: 'word-reveal',
    layout: 'text-left',
    lines: [
      'Visual language speaks',
      'where words fall silent.',
      'Color becomes emotion.',
      'Form becomes meaning.',
      'Movement becomes memory.',
    ],
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=800&q=80',
    imageAlt: 'Color field painting',
  },
];
