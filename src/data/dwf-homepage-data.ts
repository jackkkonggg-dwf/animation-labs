/**
 * DWF Homepage V2 Content Data
 * DWF = Digital Wave Finance
 */

// ============================================================================
// HERO SECTION DATA
// ============================================================================

export const HERO_DATA = {
  videoUrl: 'https://cdn.dwf-labs.com/video/bg-hero-waves.webm',
  headline: 'New Generation Web3 Investor and Market Maker',
  subtext: 'Adding real value as partners',
  description: 'We provide innovative solutions for the digital asset market, combining cutting-edge technology with deep industry expertise.',
  ctaText: 'WORK WITH US',
  ctaLink: '#contact',
  scrollArrowAlt: 'Scroll down',
} as const;

// ============================================================================
// SERVICES SECTION DATA
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'market-making',
    title: 'Market Making',
    description: 'Empower your project with innovative market-making solutions',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    details: [
      'Deep liquidity provision',
      '24/7 automated trading',
      'Exchange listing support',
      'Price stabilization',
    ],
  },
  {
    id: 'otc-trading',
    title: 'OTC Trading',
    description: 'Tailored OTC crypto trading solutions for the digital asset market',
    icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
    details: [
      'Large block trades',
      'Competitive pricing',
      'Instant settlement',
      'Privacy protection',
    ],
  },
  {
    id: 'ventures',
    title: 'Ventures',
    description: 'Backing visionary founders and making strategic investments',
    icon: 'M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941',
    details: [
      'Early-stage funding',
      'Strategic partnerships',
      'Technical expertise',
      'Global network',
    ],
  },
];

// ============================================================================
// STATS SECTION DATA
// ============================================================================

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const STATS_DATA: StatItem[] = [
  {
    id: 'portfolio',
    value: 700,
    suffix: '+',
    label: 'Projects in Portfolio',
    description: 'Supporting innovative projects across the blockchain ecosystem',
  },
  {
    id: 'cmc-top100',
    value: 20,
    suffix: '%+',
    label: 'CMC Top 100',
    description: 'Of our portfolio projects ranked in CoinMarketCap Top 100',
  },
  {
    id: 'cmc-top1000',
    value: 35,
    suffix: '%+',
    label: 'CMC Top 1000',
    description: 'Of our portfolio projects ranked in CoinMarketCap Top 1000',
  },
];

// ============================================================================
// PORTFOLIO SECTION DATA
// ============================================================================

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  link: string;
  tags: string[];
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'Strategic Partnership with Leading Blockchain Platform',
    category: 'Partnership',
    date: 'January 2025',
    excerpt: 'DWF Labs announces strategic partnership to accelerate blockchain adoption',
    imageUrl: 'https://dwf-labs.com/images/sections/benefits/scroll-arrow.svg',
    imageAlt: 'Partnership announcement',
    link: '#',
    tags: ['Partnership', 'Blockchain', 'Growth'],
  },
  {
    id: 'portfolio-2',
    title: 'New Market Making Services Launched',
    category: 'Product',
    date: 'December 2024',
    excerpt: 'Expanded market making capabilities with advanced algorithmic trading',
    imageUrl: 'https://dwf-labs.com/images/sections/benefits/scroll-arrow.svg',
    imageAlt: 'Market making services',
    link: '#',
    tags: ['Market Making', 'Trading', 'Innovation'],
  },
  {
    id: 'portfolio-3',
    title: 'Investment in DeFi Protocol',
    category: 'Investment',
    date: 'November 2024',
    excerpt: 'Strategic investment in next-generation decentralized finance protocol',
    imageUrl: 'https://dwf-labs.com/images/sections/benefits/scroll-arrow.svg',
    imageAlt: 'DeFi investment',
    link: '#',
    tags: ['Investment', 'DeFi', 'Strategy'],
  },
  {
    id: 'portfolio-4',
    title: 'Global Expansion to Asian Markets',
    category: 'Expansion',
    date: 'October 2024',
    excerpt: 'DWF Labs expands operations with new headquarters in Singapore',
    imageUrl: 'https://dwf-labs.com/images/sections/benefits/scroll-arrow.svg',
    imageAlt: 'Global expansion',
    link: '#',
    tags: ['Expansion', 'Asia', 'Growth'],
  },
  {
    id: 'portfolio-5',
    title: 'Record Trading Volume Milestone',
    category: 'Achievement',
    date: 'September 2024',
    excerpt: 'Achieved record trading volume across all supported exchanges',
    imageUrl: 'https://dwf-labs.com/images/sections/benefits/scroll-arrow.svg',
    imageAlt: 'Trading milestone',
    link: '#',
    tags: ['Trading', 'Milestone', 'Volume'],
  },
  {
    id: 'portfolio-6',
    title: 'Web3 Gaming Initiative',
    category: 'Initiative',
    date: 'August 2024',
    excerpt: 'Launch of dedicated gaming division for Web3 and blockchain gaming',
    imageUrl: 'https://dwf-labs.com/images/sections/benefits/scroll-arrow.svg',
    imageAlt: 'Gaming initiative',
    link: '#',
    tags: ['Gaming', 'Web3', 'Innovation'],
  },
];

// ============================================================================
// FOOTER SECTION DATA
// ============================================================================

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export const FOOTER_DATA = {
  sections: [
    {
      title: 'Services',
      links: [
        { label: 'Market Making', href: '#services' },
        { label: 'OTC Trading', href: '#services' },
        { label: 'Ventures', href: '#services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#about' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Careers', href: '#careers' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '#blog' },
        { label: 'Reports', href: '#reports' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ],
  socialLinks: [
    { label: 'Twitter', href: 'https://twitter.com/dwflabs' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/dwflabs' },
    { label: 'Telegram', href: 'https://t.me/dwflabs' },
  ],
  copyright: '© 2025 DWF Labs. All rights reserved.',
} as const;

// ============================================================================
// WAVE ANIMATION CONFIGURATIONS
// ============================================================================

export const WAVE_ANIMATION_CONFIG = {
  hero: {
    textReveal: {
      duration: 0.8,
      stagger: 0.03,
      amplitude: 30,
      frequency: 0.3,
    },
    waveOverlay: {
      duration: 3,
      repeat: -1,
      ease: 'none',
    },
  },
  services: {
    cardFan: {
      rotateY: 15,
      translateZ: 50,
      stagger: 0.1,
    },
    waveBorder: {
      duration: 2,
      strokeWidth: 2,
    },
  },
  stats: {
    counter: {
      duration: 2,
      oscillationAmplitude: 2,
    },
    waveBackground: {
      duration: 4,
      repeat: -1,
    },
  },
  portfolio: {
    gridReveal: {
      stagger: 0.1,
      waveDelay: 0.05,
    },
    waveWipe: {
      duration: 1,
    },
  },
} as const;
