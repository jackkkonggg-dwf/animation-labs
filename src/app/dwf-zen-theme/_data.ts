/**
 * DWF Zen Theme Data
 * Minimalist Japanese-inspired interface
 */

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const ZEN_COLORS = {
  background: '#f5f5f0',      // washi paper tone - primary
  backgroundAlt: '#ebe8e3',   // darker washi - alternating sections
  backgroundRose: '#f0e8e6',  // rose-tinted washi
  primaryText: '#1a1a1a',     // sumi ink
  secondaryText: '#4a4a4a',   // faded ink
  accent: '#c8553d',          // muted red (torii gate)
  accentGold: '#b8956f',      // aged gold
  cherryBlossoms: ['#ffd1dc', '#ffb7c5', '#ffdcd2'],
  shadow: 'rgba(74, 74, 74, 0.08)',
  shadowSoft: 'rgba(74, 74, 74, 0.04)',
  chart: {
    defi: '#c8553d',
    infrastructure: '#4a4a4a',
    gaming: '#7a8b7a',
    cefi: '#8b7355',
    nft: '#d4c4a8',
  },
} as const;

// ============================================================================
// HERO SECTION DATA
// ============================================================================

export const HERO_DATA = {
  title: 'DWF LABS',
  subtitle: 'Digital Wave Finance',
  description: 'Market Making | OTC Trading | Venture Capital | Liquidity Services',
  metrics: [
    {
      id: 'portfolio',
      value: '$3.2B+',
      label: 'Portfolio Value',
      delay: 400,
    },
    {
      id: 'volume',
      value: '$500M+',
      label: 'Daily Trading Volume',
      delay: 800,
    },
    {
      id: 'companies',
      value: '700+',
      label: 'Portfolio Companies',
      delay: 1200,
    },
    {
      id: 'exchanges',
      value: '30+',
      label: 'Active Exchanges',
      delay: 1600,
    },
  ],
} as const;

// ============================================================================
// SERVICES SECTION DATA
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'market-making',
    title: 'Market Making',
    subtitle: 'Providing liquidity across markets',
    metrics: [
      { label: 'Daily Volume', value: '$500M+' },
      { label: 'Trading Pairs', value: '250+' },
      { label: 'Exchanges', value: '30+' },
    ],
  },
  {
    id: 'otc-trading',
    title: 'OTC Trading',
    subtitle: 'Large block trade execution',
    metrics: [
      { label: 'Desk Capacity', value: '$100M/Day' },
      { label: 'Min Trade Size', value: '$100K' },
      { label: 'Clients', value: '150+' },
    ],
  },
  {
    id: 'venture-capital',
    title: 'Venture Capital',
    subtitle: 'Strategic blockchain investments',
    metrics: [
      { label: 'Portfolio', value: '700+' },
      { label: 'Invested', value: '$1.2B' },
      { label: 'Exits', value: '45+' },
    ],
  },
  {
    id: 'liquidity-services',
    title: 'Liquidity Services',
    subtitle: 'DeFi protocol support',
    metrics: [
      { label: 'AUM', value: '$3.2B' },
      { label: 'Protocols', value: '120+' },
      { label: 'Chains', value: '15+' },
    ],
  },
];

// ============================================================================
// LIVE STATS SECTION DATA
// ============================================================================

export interface LiveStatItem {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  sparklineData: number[];
}

export const LIVE_STATS_DATA: LiveStatItem[] = [
  {
    id: 'trading-volume',
    label: '24H Trading Volume',
    value: '$547.2M',
    change: '+12.4%',
    trend: 'up',
    sparklineData: [450, 480, 465, 490, 510, 495, 520, 547],
  },
  {
    id: 'aum',
    label: 'Portfolio AUM',
    value: '$3.24B',
    change: '+8.7%',
    trend: 'up',
    sparklineData: [2.8, 2.9, 2.85, 3.0, 3.1, 3.05, 3.2, 3.24],
  },
  {
    id: 'exchanges',
    label: 'Active Exchanges',
    value: '34',
    change: '+2',
    trend: 'up',
    sparklineData: [28, 30, 30, 31, 32, 32, 33, 34],
  },
  {
    id: 'order-depth',
    label: 'Avg Order Book Depth',
    value: '$8.4M',
    change: '-2.1%',
    trend: 'down',
    sparklineData: [9.2, 8.8, 8.5, 8.6, 8.4, 8.5, 8.3, 8.4],
  },
];

// ============================================================================
// TRADING PAIRS DATA
// ============================================================================

export interface TradingPair {
  id: string;
  pair: string;
  volume: string;
  spread: string;
}

export const TRADING_PAIRS_DATA: TradingPair[] = [
  { id: 'btc-usd', pair: 'BTC/USD', volume: '$127.4M', spread: '0.3bps' },
  { id: 'eth-usd', pair: 'ETH/USD', volume: '$89.2M', spread: '0.5bps' },
  { id: 'sol-usd', pair: 'SOL/USD', volume: '$67.8M', spread: '0.8bps' },
  { id: 'link-eth', pair: 'LINK/ETH', volume: '$23.4M', spread: '1.2bps' },
  { id: 'avax-usd', pair: 'AVAX/USD', volume: '$18.9M', spread: '1.5bps' },
];

// ============================================================================
// PORTFOLIO SECTION DATA
// ============================================================================

export interface PortfolioInvestment {
  id: string;
  name: string;
  category: string;
  investment: string;
  roi: string;
  color: string;
}

export const PORTFOLIO_INVESTMENTS_DATA: PortfolioInvestment[] = [
  {
    id: 'l1-blockchain',
    name: 'Layer 1 Blockchain',
    category: 'DeFi',
    investment: '$25M',
    roi: '+8,200%',
    color: ZEN_COLORS.chart.defi,
  },
  {
    id: 'defi-protocol',
    name: 'DeFi Protocol',
    category: 'DeFi',
    investment: '$12M',
    roi: '+6,900%',
    color: ZEN_COLORS.chart.defi,
  },
  {
    id: 'gaming-platform',
    name: 'Gaming Platform',
    category: 'Gaming',
    investment: '$18M',
    roi: '+3,900%',
    color: ZEN_COLORS.chart.gaming,
  },
  {
    id: 'cfxi-exchange',
    name: 'CeFi Exchange',
    category: 'CeFi',
    investment: '$8M',
    roi: '+2,400%',
    color: ZEN_COLORS.chart.cefi,
  },
  {
    id: 'nft-marketplace',
    name: 'NFT Marketplace',
    category: 'NFT',
    investment: '$3M',
    roi: '+5,900%',
    color: ZEN_COLORS.chart.nft,
  },
  {
    id: 'lending-protocol',
    name: 'Lending Protocol',
    category: 'DeFi',
    investment: '$15M',
    roi: '+4,200%',
    color: ZEN_COLORS.chart.defi,
  },
];

export interface PortfolioDistribution {
  category: string;
  percentage: number;
  color: string;
}

export const PORTFOLIO_DISTRIBUTION_DATA: PortfolioDistribution[] = [
  { category: 'DeFi', percentage: 42, color: ZEN_COLORS.chart.defi },
  { category: 'Infrastructure', percentage: 28, color: ZEN_COLORS.chart.infrastructure },
  { category: 'Gaming', percentage: 15, color: ZEN_COLORS.chart.gaming },
  { category: 'CeFi', percentage: 10, color: ZEN_COLORS.chart.cefi },
  { category: 'NFT', percentage: 5, color: ZEN_COLORS.chart.nft },
];

export interface StageDistribution {
  stage: string;
  percentage: number;
}

export const STAGE_DISTRIBUTION_DATA: StageDistribution[] = [
  { stage: 'Seed', percentage: 35 },
  { stage: 'Series A', percentage: 28 },
  { stage: 'Series B', percentage: 20 },
  { stage: 'Growth', percentage: 12 },
  { stage: 'Public', percentage: 5 },
];

// ============================================================================
// PARTNERS SECTION DATA
// ============================================================================

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
}

export const EXCHANGES_DATA: Partner[] = [
  { id: 'binance', name: 'Binance', logo: 'BN', url: 'https://www.binance.com' },
  { id: 'coinbase', name: 'Coinbase', logo: 'CB', url: 'https://www.coinbase.com' },
  { id: 'okx', name: 'OKX', logo: 'OK', url: 'https://www.okx.com' },
  { id: 'bybit', name: 'Bybit', logo: 'BB', url: 'https://www.bybit.com' },
  { id: 'kraken', name: 'Kraken', logo: 'KR', url: 'https://www.kraken.com' },
  { id: 'kucoin', name: 'KuCoin', logo: 'KC', url: 'https://www.kucoin.com' },
  { id: 'gate-io', name: 'Gate.io', logo: 'GT', url: 'https://www.gate.io' },
  { id: 'bitget', name: 'Bitget', logo: 'BG', url: 'https://www.bitget.com' },
  { id: 'crypto-com', name: 'Crypto.com', logo: 'CC', url: 'https://crypto.com' },
  { id: 'huobi', name: 'Huobi', logo: 'HB', url: 'https://www.huobi.com' },
];

export const DEFI_PROTOCOLS_DATA: Partner[] = [
  { id: 'uniswap', name: 'Uniswap', logo: 'UN', url: 'https://uniswap.org' },
  { id: 'curve', name: 'Curve', logo: 'CV', url: 'https://curve.fi' },
  { id: 'aave', name: 'Aave', logo: 'AA', url: 'https://aave.com' },
  { id: 'lido', name: 'Lido', logo: 'LD', url: 'https://lido.fi' },
  { id: 'compound', name: 'Compound', logo: 'CP', url: 'https://compound.finance' },
  { id: 'makerdao', name: 'MakerDAO', logo: 'MK', url: 'https://makerdao.com' },
];

// ============================================================================
// FOOTER SECTION DATA
// ============================================================================

export const FOOTER_DATA = {
  links: [
    { label: 'About', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Portfolio', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  social: [
    { label: 'Twitter', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Discord', href: '#' },
  ],
  disclaimer: '© 2024 DWF Labs. All rights reserved. Trading digital assets involves significant risk.',
} as const;

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

export const ANIMATION_CONFIG = {
  cherryBlossom: {
    count: 25,
    minSpeed: 0.28,
    maxSpeed: 0.7,
    swayAmplitude: 30,
    swayFrequency: 0.001,
    minSize: 6,
    maxSize: 14,
  },
  inkDrop: {
    duration: 0.42,
    maxScale: 50,
    startOpacity: 0.4,
  },
  scroll: {
    triggerPoint: 0.85, // 85% viewport visibility
    duration: 1.08,
    ease: 'power2.out' as const,
  },
  stagger: {
    cardDelay: 0.24,
  },
  chart: {
    drawDuration: 1.2,
  },
} as const;
