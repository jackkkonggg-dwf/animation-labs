/**
 * DWF Professional Theme Content Data
 * Finance-inspired, professional design with trust and sophistication
 */

// ============================================================================
// HERO SECTION DATA
// ============================================================================

export const PROFESSIONAL_HERO_DATA = {
  headline: 'Institutional-Grade Digital Asset Solutions',
  subtext: 'Excellence in Digital Finance',
  description: 'We deliver sophisticated market infrastructure and strategic capital deployment for the digital asset economy, backed by deep expertise and institutional discipline.',
  ctaText: 'Partner With Us',
  ctaLink: '#contact',
  scrollArrowAlt: 'Explore further',
  metrics: [
    { value: '$3.2B+', label: 'Trading Volume' },
    { value: '150+', label: 'Exchange Partners' },
    { value: '24/7', label: 'Global Coverage' },
  ],
} as const;

// ============================================================================
// SERVICES SECTION DATA
// ============================================================================

export interface ProfessionalServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  capabilities: string[];
  metrics?: string;
}

export const PROFESSIONAL_SERVICES_DATA: ProfessionalServiceItem[] = [
  {
    id: 'market-making',
    title: 'Institutional Market Making',
    description: 'Sophisticated liquidity provision across global venues with algorithmic precision.',
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    capabilities: [
      'Continuous two-way liquidity',
      'Multi-exchange arbitrage',
      'Inventory risk management',
      'Regulatory compliance framework',
    ],
    metrics: '$500M+ daily volume',
  },
  {
    id: 'otc-trading',
    title: 'Principal Trading & OTC',
    description: 'Large-block execution with minimal market impact and competitive pricing.',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    capabilities: [
      'Block trades $100K-$100M+',
      'Firm pricing with rapid settlement',
      'Counterparty diversity',
      'Discreet execution',
    ],
    metrics: '98% client retention',
  },
  {
    id: 'ventures',
    title: 'Strategic Ventures & Advisory',
    description: 'Capital deployment and strategic guidance for transformative projects.',
    icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
    capabilities: [
      'Early-stage to growth equity',
      'Tokenomics design & structuring',
      'Exchange introduction support',
      'Post-investment advisory',
    ],
    metrics: '700+ portfolio companies',
  },
];

// ============================================================================
// STATS SECTION DATA
// ============================================================================

export interface ProfessionalStatItem {
  id: string;
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  trend?: 'up' | 'neutral';
}

export const PROFESSIONAL_STATS_DATA: ProfessionalStatItem[] = [
  {
    id: 'portfolio-value',
    value: 3.2,
    suffix: 'B+',
    prefix: '$',
    label: 'Assets Under Management',
    description: 'Total portfolio value across all strategies',
    trend: 'up',
  },
  {
    id: 'portfolio-companies',
    value: 700,
    suffix: '+',
    label: 'Portfolio Companies',
    description: 'Projects supported globally',
    trend: 'up',
  },
  {
    id: 'top-projects',
    value: 20,
    suffix: '%',
    label: 'Top 100 CMC Projects',
    description: 'Portfolio representation in top-tier projects',
    trend: 'up',
  },
  {
    id: 'global-presence',
    value: 45,
    suffix: '+',
    label: 'Countries Reached',
    description: 'Global operational footprint',
  },
];

// ============================================================================
// PORTFOLIO SECTION DATA
// ============================================================================

export interface ProfessionalPortfolioItem {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  link: string;
  tags: string[];
}

export const PROFESSIONAL_PORTFOLIO_DATA: ProfessionalPortfolioItem[] = [
  {
    id: 'portfolio-1',
    title: 'Strategic Partnership with Layer 1 Blockchain Platform',
    category: 'Partnership',
    date: 'Q1 2025',
    excerpt: 'Comprehensive market infrastructure partnership supporting institutional adoption',
    metrics: [
      { label: 'Volume Increase', value: '+340%' },
      { label: 'Liquidity Depth', value: '$45M' },
    ],
    link: '#',
    tags: ['Infrastructure', 'Institutional', 'DeFi'],
  },
  {
    id: 'portfolio-2',
    title: 'Advanced Market Making Algorithm Deployment',
    category: 'Technology',
    date: 'Q4 2024',
    excerpt: 'Next-generation algorithmic trading system with ML-driven optimization',
    metrics: [
      { label: 'Efficiency', value: '+67%' },
      { label: 'Markets', value: '12' },
    ],
    link: '#',
    tags: ['Technology', 'Trading', 'Innovation'],
  },
  {
    id: 'portfolio-3',
    title: 'DeFi Protocol Strategic Investment',
    category: 'Investment',
    date: 'Q3 2024',
    excerpt: 'Significant investment in institutional-grade decentralized finance infrastructure',
    metrics: [
      { label: 'Investment', value: '$25M' },
      { label: 'TVL Impact', value: '+$180M' },
    ],
    link: '#',
    tags: ['DeFi', 'Investment', 'Protocol'],
  },
  {
    id: 'portfolio-4',
    title: 'APAC Regional Expansion',
    category: 'Expansion',
    date: 'Q2 2024',
    excerpt: 'Established Singapore operational hub serving Asian institutional markets',
    metrics: [
      { label: 'New Markets', value: '8' },
      { label: 'Team Growth', value: '+45' },
    ],
    link: '#',
    tags: ['Expansion', 'APAC', 'Institutional'],
  },
  {
    id: 'portfolio-5',
    title: 'Trading Volume Milestone Achievement',
    category: 'Milestone',
    date: 'Q1 2024',
    excerpt: 'Record quarterly trading volume across all supported exchanges and OTC desks',
    metrics: [
      { label: 'Q1 Volume', value: '$890M' },
      { label: 'Growth', value: '+156%' },
    ],
    link: '#',
    tags: ['Trading', 'Milestone', 'Growth'],
  },
  {
    id: 'portfolio-6',
    title: 'Web3 Infrastructure Fund Initiative',
    category: 'Initiative',
    date: 'Q4 2023',
    excerpt: 'Dedicated capital vehicle for foundational Web3 infrastructure development',
    metrics: [
      { label: 'Fund Size', value: '$100M' },
      { label: 'Deployments', value: '15' },
    ],
    link: '#',
    tags: ['Infrastructure', 'Ventures', 'Web3'],
  },
];

// ============================================================================
// FOOTER SECTION DATA
// ============================================================================

export interface ProfessionalFooterLink {
  label: string;
  href: string;
}

export interface ProfessionalFooterSection {
  title: string;
  links: ProfessionalFooterLink[];
}

export const PROFESSIONAL_FOOTER_DATA = {
  sections: [
    {
      title: 'Institutional Services',
      links: [
        { label: 'Market Making', href: '#services' },
        { label: 'OTC Trading', href: '#services' },
        { label: 'Ventures', href: '#services' },
        { label: 'Advisory', href: '#services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About DWF', href: '#about' },
        { label: 'Portfolio', href: '#portfolio' },
        { label: 'Leadership', href: '#leadership' },
        { label: 'Careers', href: '#careers' },
      ],
    },
    {
      title: 'Insights',
      links: [
        { label: 'Research', href: '#research' },
        { label: 'Market Reports', href: '#reports' },
        { label: 'Press', href: '#press' },
        { label: 'Contact', href: '#contact' },
      ],
    },
  ],
  socialLinks: [
    { label: 'X (Twitter)', href: 'https://twitter.com/dwflabs' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/dwflabs' },
    { label: 'Telegram', href: 'https://t.me/dwflabs' },
    { label: 'Discord', href: 'https://discord.gg/dwflabs' },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Compliance', href: '#compliance' },
  ],
  copyright: '© 2025 DWF Labs. All rights reserved.',
} as const;

// ============================================================================
// PROFESSIONAL ANIMATION CONFIGURATIONS
// ============================================================================

export const PROFESSIONAL_ANIMATION_CONFIG = {
  hero: {
    textReveal: {
      duration: 0.7,
      stagger: 0.02,
    },
    metricsFade: {
      duration: 0.8,
      stagger: 0.1,
    },
  },
  services: {
    cardReveal: {
      stagger: 0.12,
      duration: 0.8,
    },
    capabilitySlide: {
      duration: 0.5,
      stagger: 0.05,
    },
  },
  stats: {
    counter: {
      duration: 2,
      ease: 'power2.out',
    },
    trendLine: {
      duration: 1.5,
    },
  },
  portfolio: {
    cardReveal: {
      stagger: 0.1,
      duration: 0.7,
    },
    metricCount: {
      duration: 1.2,
    },
  },
} as const;
