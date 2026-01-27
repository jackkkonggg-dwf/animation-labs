export interface ArtistCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  yOffset: number;
  rotation: number;
  zIndex: number;
}

// Card data with organic randomness baked in
export const ARTIST_CARDS: ArtistCardProps[] = [
  {
    id: 1,
    name: 'NEON DREAMS',
    description: 'Electronic soundscapes that transport you to digital realms. Creating sonic experiences since 2019.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    yOffset: -40,
    rotation: -3,
    zIndex: 1,
  },
  {
    id: 2,
    name: 'CYBERPULSE',
    description: 'Futuristic beats and synthwave rhythms. The pulse of tomorrow\'s music scene today.',
    image: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80',
    yOffset: 25,
    rotation: 2.5,
    zIndex: 3,
  },
  {
    id: 3,
    name: 'MIDNIGHT WAVE',
    description: 'Dark electronic atmospheres meets infectious melodies. Soundtracking your late night drives.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    yOffset: -15,
    rotation: -1.5,
    zIndex: 2,
  },
  {
    id: 4,
    name: 'DIGITAL ECHO',
    description: 'Ambient textures and glitch-influenced production. Where nature meets technology.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    yOffset: 35,
    rotation: 4,
    zIndex: 4,
  },
  {
    id: 5,
    name: 'VOLTAGE',
    description: 'High-energy electronic ensemble pushing boundaries of live performance and production.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
    yOffset: -25,
    rotation: -2,
    zIndex: 2,
  },
  {
    id: 6,
    name: 'SYNTH HORIZON',
    description: 'Retro-futuristic sounds with modern production. The past reimagined for the future.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    yOffset: 10,
    rotation: 1,
    zIndex: 3,
  },
  {
    id: 7,
    name: 'QUANTUM BEATS',
    description: 'Experimental electronic music exploring the intersection of science and sound.',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&q=80',
    yOffset: -30,
    rotation: 3.5,
    zIndex: 1,
  },
];
