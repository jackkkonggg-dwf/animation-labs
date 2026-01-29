/**
 * News Article Data
 *
 * News articles from DWF Labs with placeholder thumbnail info.
 * Since DWF website has Cloudflare protection, we use styled placeholders
 * that match the Animation Labs design system.
 */

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  badge: string;
  thumbnail?: string; // Optional external URL if available
  gradient: string; // CSS gradient for placeholder
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'oct-2025-recap',
    title: 'October 2025 Recap: New Partnerships, Conferences, and Community Events',
    date: 'Oct 31, 2025',
    badge: 'Recap',
    gradient: 'from-orange-900/30 to-zinc-900',
  },
  {
    id: 'block-street',
    title: "DWF Labs Participates in Block Street's Funding Round",
    date: 'Oct 12, 2025',
    badge: 'Investment',
    gradient: 'from-zinc-800 to-zinc-900',
  },
  {
    id: 'sep-2025-highlights',
    title: 'September 2025 Highlights: Partnerships, Events, and Research',
    date: 'Oct 01, 2025',
    badge: 'Monthly',
    gradient: 'from-orange-900/20 to-zinc-900',
  },
  {
    id: 'memecore',
    title: 'DWF Labs Backs MemeCore: Building the First Blockchain for Meme 2.0',
    date: 'Sep 18, 2025',
    badge: 'Ventures',
    gradient: 'from-orange-800/30 to-zinc-900',
  },
  {
    id: 'coincall',
    title: "DWF Labs Joins as Strategic Crypto Liquidity Provider in Coincall's Enhanced Market Ecosystem",
    date: 'Sep 07, 2025',
    badge: 'Partnership',
    gradient: 'from-zinc-800 to-orange-900/20',
  },
  {
    id: 'rice-ai',
    title: 'RICE AI Secures Series A Funding with Support from DWF Labs',
    date: 'Aug 18, 2025',
    badge: 'Ventures',
    gradient: 'from-orange-900/30 to-zinc-800',
  },
];
