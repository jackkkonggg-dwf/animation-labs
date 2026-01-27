import { Hero } from '@/components/hero';
import { HorizontalScrollWrapper } from '@/components/horizontal-scroll-wrapper';
import { ArtistCard } from '@/components/artist-card';
import { ARTIST_CARDS } from '@/components/artist-cards-data';

export function HorizontalScroll() {
  return (
    <>
      <Hero />
      <HorizontalScrollWrapper sectionId="collection">
        {ARTIST_CARDS.map((card) => (
          <ArtistCard key={card.id} {...card} />
        ))}
      </HorizontalScrollWrapper>
    </>
  );
}
