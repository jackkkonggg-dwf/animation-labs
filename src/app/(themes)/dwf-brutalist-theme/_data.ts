/**
 * DWF Brutalist Theme Content Data
 * Neo-brutalist design for DWF Labs - Crypto Market Maker & VC Firm
 *
 * DWF Labs is a prominent crypto market maker and venture capital firm:
 * - Market making across 30+ exchanges
 * - OTC trading desk for large block execution
 * - VC portfolio: 700+ projects invested
 * - Daily trading volume: $500M+
 * - Total portfolio value: $3.2B+
 */

// ============================================================================
// BRUTALIST COLOR PALETTE
// ============================================================================

export const BRUTALIST_COLORS = {
  // Primary Colors
  background: '#050505',
  foreground: '#f0f0f0',
  accent: '#ccff00', // Acid Green

  // Supporting Colors
  secondary: '#888888',
  warning: '#ff6600',
  success: '#00ff41',
  error: '#ff003c',
  info: '#00d4ff',

  // Borders
  borderLight: '#f0f0f0',
  borderDark: '#050505',
  borderAccent: '#ccff00',
} as const;

// ============================================================================
// BRUTALIST TYPOGRAPHY
// ============================================================================

export const BRUTALIST_FONTS = {
  display: "'Oswald', 'Impact', 'Arial Black', sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
  body: "'Oswald', sans-serif",
} as const;

// ============================================================================
// HERO SECTION DATA
// ============================================================================

export const BRUTALIST_HERO_DATA = {
  headline: 'DWF_LABS',
  subtext: '[ CRYPTO_MARKET_MAKER // VENTURE_CAPITAL ]',
  description: 'ALGORITHMIC_TRADING_ACROSS_30+_EXCHANGES. $500M+_DAILY_VOLUME. 700+_PORTFOLIO_COMPANIES. INSTITUTIONAL_GRADE_LIQUIDITY_PROVISION.',
  ctaText: 'PARTNER_WITH_US',
  heroStats: [
    { value: '$3.2B+', label: 'PORTFOLIO_VALUE' },
    { value: '$500M+', label: 'DAILY_VOLUME' },
    { value: '700+', label: 'PORTFOLIO_COMPANIES' },
    { value: '30+', label: 'EXCHANGES' },
  ],
} as const;

// ============================================================================
// MARQUEE TEXT DATA
// ============================================================================

export const BRUTALIST_MARQUEE_TEXT = [
  '/// BTC_USD_SPREAD: 0.5bps',
  '>>> NEW_OTC_DESK_CAPACITY: $100M',
  '/// PORTFOLIO_EXIT: +340%_ROI',
  '>>> TOP_TIER_EXCHANGE_PARTNERSHIPS',
  '/// 24H_VOLUME: $547M',
  '>>> SEED_FUNDING: 50+_PROJECTS',
  '/// DEFI_INFRA_FUND: $100M',
  '>>> GLOBAL_TRADING_DESKS',
  '/// INSTITUTIONAL_CLIENTS: 150+',
] as const;

// ============================================================================
// SERVICES SECTION DATA
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  shortCode: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  features: string[];
}

export const BRUTALIST_SERVICES: ServiceItem[] = [
  {
    id: 'market-making',
    title: 'MARKET_MAKING',
    shortCode: 'MM',
    description: 'ALGORITHMIC_LIQUIDITY_PROVISION_ACROSS_SPOT, PERPETUALS, AND_OPTIONS MARKETS. TIGHT_SPREADS. DEEP_ORDER_BOOKS.',
    metrics: [
      { label: 'DAILY_VOLUME', value: '$500M+' },
      { label: 'PAIRS', value: '250+' },
      { label: 'EXCHANGES', value: '30+' },
    ],
    features: [
      'TWO-WAY_QUOTATION',
      'INVENTORY_RISK_MANAGEMENT',
      'CROSS_EXCHANGE_ARBITRAGE',
      'PERPETUAL_FUNDING_RATE_OPTIMIZATION',
    ],
  },
  {
    id: 'otc-trading',
    title: 'OTC_TRADING',
    shortCode: 'OTC',
    description: 'LARGE_BLOCK_EXECUTION_WITH_MINIMAL_SLIPPAGE. INSTITUTIONAL_CLIENTS. DISCRETE_ORDER_FLOW.',
    metrics: [
      { label: 'DESK_CAPACITY', value: '$100M/DAY' },
      { label: 'MIN_TRADE', value: '$100K' },
      { label: 'CLIENTS', value: '150+' },
    ],
    features: [
      'FIRM_PRICING',
      'RAPID_SETTLEMENT',
      'COUNTERPARTY_DIVERSITY',
      'REGULATORY_COMPLIANCE',
    ],
  },
  {
    id: 'venture-capital',
    title: 'VENTURE_CAPITAL',
    shortCode: 'VC',
    description: 'EARLY_STAGE_TO_GROWTH_EQUITY. TOKENOMICS_DESIGN. EXCHANGE_INTRODUCTIONS. POST_INVESTMENT_SUPPORT.',
    metrics: [
      { label: 'PORTFOLIO', value: '700+' },
      { label: 'INVESTED', value: '$1.2B' },
      { label: 'EXITS', value: '45+' },
    ],
    features: [
      'SEED_TO_SERIES_C',
      'TOKEN_LAUNCH_SUPPORT',
      'LIQUIDITY_MINING_DESIGN',
      'EXCHANGE_LISTING_SUPPORT',
    ],
  },
  {
    id: 'liquidity',
    title: 'LIQUIDITY_SERVICES',
    shortCode: 'LIQ',
    description: 'MULTI-ASSET_LIQUIDITY_MANAGEMENT. YIELD_OPTIMIZATION. STAKING_SERVICES. PROTOCOL_TREASURY_MANAGEMENT.',
    metrics: [
      { label: 'ASSETS_UNDER_MANAGEMENT', value: '$3.2B' },
      { label: 'PROTOCOLS', value: '120+' },
      { label: 'CHAINS', value: '15+' },
    ],
    features: [
      'AUTOMATED_MARKET_MAKING',
      'YIELD_FARMING_STRATEGIES',
      'LST_LIQUIDITY_PROVISION',
      'CROSS-CHAIN_YIELD_ARBITRAGE',
    ],
  },
] as const;

// ============================================================================
// LIVE STATS SECTION DATA
// ============================================================================

export interface LiveStatMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  changePositive: boolean;
  sparkline: number[];
  live: boolean;
}

export const BRUTALIST_LIVE_STATS: LiveStatMetric[] = [
  {
    id: 'daily-volume',
    label: '24H_TRADING_VOLUME',
    value: '$547.2M',
    change: '+12.4%',
    changePositive: true,
    sparkline: [420, 450, 480, 460, 510, 490, 520, 540, 530, 547],
    live: true,
  },
  {
    id: 'portfolio-value',
    label: 'PORTFOLIO_AUM',
    value: '$3.24B',
    change: '+8.7%',
    changePositive: true,
    sparkline: [2.8, 2.9, 2.85, 3.0, 3.1, 3.05, 3.15, 3.2, 3.22, 3.24],
    live: false,
  },
  {
    id: 'active-exchanges',
    label: 'ACTIVE_EXCHANGES',
    value: '34',
    change: '+2',
    changePositive: true,
    sparkline: [28, 29, 30, 30, 31, 31, 32, 32, 33, 34],
    live: false,
  },
  {
    id: 'order-book-depth',
    label: 'AVG_ORDER_BOOK_DEPTH',
    value: '$8.4M',
    change: '-2.1%',
    changePositive: false,
    sparkline: [9.2, 9.0, 8.8, 8.6, 8.7, 8.5, 8.4, 8.5, 8.6, 8.4],
    live: true,
  },
];

export const BRUTALIST_TRADING_PAIRS = [
  { pair: 'BTC/USD', volume: '$127.4M', spread: '0.3bps' },
  { pair: 'ETH/USD', volume: '$89.2M', spread: '0.5bps' },
  { pair: 'SOL/USD', volume: '$67.8M', spread: '0.8bps' },
  { pair: 'LINK/ETH', volume: '$23.4M', spread: '1.2bps' },
  { pair: 'AVAX/USD', volume: '$18.9M', spread: '1.5bps' },
];

// ============================================================================
// PORTFOLIO SECTION DATA
// ============================================================================

export interface PortfolioInvestment {
  id: string;
  name: string;
  category: 'DeFi' | 'Infrastructure' | 'Gaming' | 'CeFi' | 'NFT';
  stage: 'Seed' | 'Series A' | 'Series B' | 'Growth' | 'Public';
  investment: string;
  currentValuation?: string;
  roi?: string;
  logo?: string;
}

export const BRUTALIST_PORTFOLIO_INVESTMENTS: PortfolioInvestment[] = [
  {
    id: '1',
    name: 'Layer 1 Blockchain Platform',
    category: 'Infrastructure',
    stage: 'Series B',
    investment: '$25M',
    currentValuation: '$2.1B',
    roi: '+8,200%',
  },
  {
    id: '2',
    name: 'DeFi Protocol',
    category: 'DeFi',
    stage: 'Series A',
    investment: '$12M',
    currentValuation: '$840M',
    roi: '+6,900%',
  },
  {
    id: '3',
    name: 'Gaming Platform',
    category: 'Gaming',
    stage: 'Growth',
    investment: '$18M',
    currentValuation: '$720M',
    roi: '+3,900%',
  },
  {
    id: '4',
    name: 'CeFi Exchange',
    category: 'CeFi',
    stage: 'Public',
    investment: '$8M',
    roi: '+2,400%',
  },
  {
    id: '5',
    name: 'NFT Marketplace',
    category: 'NFT',
    stage: 'Seed',
    investment: '$3M',
    currentValuation: '$180M',
    roi: '+5,900%',
  },
  {
    id: '6',
    name: 'Lending Protocol',
    category: 'DeFi',
    stage: 'Series A',
    investment: '$15M',
    roi: '+4,200%',
  },
];

export const BRUTALIST_PORTFOLIO_BREAKDOWN = {
  defi: { value: 42, label: 'DeFi' },
  infra: { value: 28, label: 'Infrastructure' },
  gaming: { value: 15, label: 'Gaming' },
  cefi: { value: 10, label: 'CeFi' },
  nft: { value: 5, label: 'NFT' },
};

export const BRUTALIST_STAGE_BREAKDOWN = {
  seed: { value: 35, label: 'Seed' },
  seriesA: { value: 28, label: 'Series A' },
  seriesB: { value: 20, label: 'Series B' },
  growth: { value: 12, label: 'Growth' },
  public: { value: 5, label: 'Public' },
};

// ============================================================================
// PARTNERS SECTION DATA
// ============================================================================

export const BRUTALIST_EXCHANGE_PARTNERS = [
  { name: 'Binance', tier: 'TIER_1' },
  { name: 'Coinbase', tier: 'TIER_1' },
  { name: 'OKX', tier: 'TIER_1' },
  { name: 'Bybit', tier: 'TIER_1' },
  { name: 'KuCoin', tier: 'TIER_2' },
  { name: 'Gate.io', tier: 'TIER_2' },
  { name: 'Bitget', tier: 'TIER_2' },
  { name: 'Crypto.com', tier: 'TIER_2' },
  { name: 'Huobi', tier: 'TIER_3' },
  { name: 'Kraken', tier: 'TIER_1' },
];

export const BRUTALIST_PROTOCOL_PARTNERS = [
  { name: 'Uniswap', category: 'DeFi' },
  { name: 'Curve', category: 'DeFi' },
  { name: 'Aave', category: 'DeFi' },
  { name: 'Lido', category: 'DeFi' },
  { name: 'Compound', category: 'DeFi' },
  { name: 'MakerDAO', category: 'DeFi' },
];

// ============================================================================
// BRUTALIST ANIMATION CONFIGURATIONS
// ============================================================================

export const BRUTALIST_ANIMATION_CONFIG = {
  hero: {
    titleSnap: {
      duration: 0.3,
      ease: 'power4.out',
    },
    metricsSnap: {
      duration: 0.5,
      stagger: 0.08,
      ease: 'elastic.out(1, 0.5)',
    },
  },
  services: {
    cardReveal: {
      duration: 0.5,
      stagger: 0.1,
      ease: 'power4.inOut',
    },
  },
  liveStats: {
    counter: {
      duration: 1.5,
      ease: 'power2.out',
    },
    sparkline: {
      duration: 1.2,
      ease: 'power2.out',
    },
  },
  portfolio: {
    cardSlide: {
      duration: 0.4,
      stagger: 0.08,
      ease: 'power4.inOut',
    },
  },
  partners: {
    logoFade: {
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.out',
    },
  },
  marquee: {
    speed: 100,
  },
  scrollTrigger: {
    start: 'top 85%',
    toggleActions: 'play none none reverse' as const,
  },
} as const;

// ============================================================================
// FORMATTING UTILITIES
// ============================================================================

export function formatCurrency(value: number): string {
  if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
  if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (value >= 1e3) return `$${(value / 1e3).toFixed(1)}K`;
  return `$${value.toFixed(0)}`;
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

export function formatAPY(value: number): string {
  return `${value.toFixed(1)}%`;
}
