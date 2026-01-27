/**
 * DWF Futuristic Theme Data
 * Cyberpunk/Sci-Fi inspired interface
 */

// ============================================================================
// HERO SECTION DATA
// ============================================================================

export const HERO_DATA = {
  glitchText: 'DWF LABS',
  subtitle: 'NEXT-GEN WEB3 INFRASTRUCTURE',
  description: 'Pioneering the future of decentralized finance through cutting-edge technology and quantum-secure protocols.',
  ctaText: 'INITIALIZE_SEQUENCE',
  secondaryCta: 'EXPLORE_PROTOCOL',
  typingText: [
    'QUANTUM_ENCRYPTED',
    'NEURAL_LINK_ACTIVE',
    'BLOCKCHAIN_SYNCHRONIZED',
    'HIVE_MIND_ENABLED',
  ],
} as const;

// ============================================================================
// SERVICES SECTION DATA
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  specs: string[];
  status: 'OPERATIONAL' | 'OPTIMIZING' | 'EXPERIMENTAL';
  powerLevel: number;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'quantum-trading',
    title: 'QUANTUM TRADING ENGINE',
    subtitle: 'FTL Execution Speed',
    description: 'Leveraging quantum algorithms for sub-millisecond trade execution across infinite liquidity pools.',
    icon: '⚡',
    specs: ['0.001ms LATENCY', 'INFINITE SCALABILITY', 'PREDICTIVE AI'],
    status: 'OPERATIONAL',
    powerLevel: 98,
  },
  {
    id: 'neural-network',
    title: 'NEURAL SENTIMENT ANALYSIS',
    subtitle: 'Deep Learning Core',
    description: 'AI-powered market prediction using 50 billion parameters processing real-time social sentiment.',
    icon: '🧠',
    specs: ['50B PARAMETERS', '99.7% ACCURACY', 'REAL-TIME PROCESSING'],
    status: 'OPTIMIZING',
    powerLevel: 92,
  },
  {
    id: 'holographic-wallet',
    title: 'HOLOGRAPHIC VAULT',
    subtitle: 'Multi-Dimensional Security',
    description: 'Quantum-resistant encryption with biometric authentication and spatial key storage.',
    icon: '🔮',
    specs: ['QUANTUM-RESISTANT', 'BIOMETRIC LOCK', 'SPATIAL KEYS'],
    status: 'OPERATIONAL',
    powerLevel: 95,
  },
  {
    id: 'matrix-bridge',
    title: 'CROSS-CHAIN MATRIX',
    subtitle: 'Interdimensional Bridges',
    description: 'Instant asset teleportation between blockchain dimensions with zero slippage.',
    icon: '🌐',
    specs: ['0 SLIPPAGE', 'INSTANT TELEPORT', 'INFINITE CHAINS'],
    status: 'EXPERIMENTAL',
    powerLevel: 88,
  },
  {
    id: 'plasma-staking',
    title: 'PLASMA YIELD SYNTHESIZER',
    subtitle: 'Fusion Reactor Powered',
    description: 'Generate yields through nuclear fusion-powered liquidity pools and compounding algorithms.',
    icon: '☢️',
    specs: ['FUSION POWERED', '1000% APY', 'AUTO-COMPOUND'],
    status: 'OPERATIONAL',
    powerLevel: 97,
  },
  {
    id: 'dark-pool',
    title: 'DARK MATTER POOLS',
    subtitle: 'Invisible Liquidity',
    description: 'Trade in the shadows with complete privacy. Zero knowledge proofs on every transaction.',
    icon: '🕳️',
    specs: ['ZERO-KNOWLEDGE', 'COMPLETE PRIVACY', 'UNTRACEABLE'],
    status: 'OPTIMIZING',
    powerLevel: 94,
  },
];

// ============================================================================
// STATS SECTION DATA
// ============================================================================

export interface StatItem {
  id: string;
  value: string;
  label: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  graphData: number[];
}

export const STATS_DATA: StatItem[] = [
  {
    id: 'total-value',
    value: '∞',
    label: 'TOTAL VALUE LOCKED',
    unit: 'USD',
    trend: 'up',
    graphData: [45, 62, 78, 91, 87, 95, 102, 115, 128, 142, 158, 175],
  },
  {
    id: 'transactions',
    value: '10.7B',
    label: 'TRANSACTIONS PER SECOND',
    unit: 'TPS',
    trend: 'up',
    graphData: [1000, 2100, 3400, 4800, 6200, 7800, 9100, 10500],
  },
  {
    id: 'network',
    value: '99.99',
    label: 'NETWORK UPTIME',
    unit: '%',
    trend: 'stable',
    graphData: [99.95, 99.97, 99.96, 99.98, 99.99, 99.99, 99.99, 99.99],
  },
  {
    id: 'nodes',
    value: '1.4M',
    label: 'ACTIVE NODES',
    unit: 'NODES',
    trend: 'up',
    graphData: [500000, 680000, 820000, 950000, 1100000, 1250000, 1380000],
  },
];

// ============================================================================
// PROTOCOLS SECTION DATA
// ============================================================================

export interface ProtocolItem {
  id: string;
  name: string;
  version: string;
  category: string;
  description: string;
  hashrate: string;
  security: string;
  launchDate: string;
  tags: string[];
}

export const PROTOCOLS_DATA: ProtocolItem[] = [
  {
    id: 'proto-1',
    name: 'OMEGA_CHAIN',
    version: 'v4.2.0',
    category: 'L1 BLOCKCHAIN',
    description: 'Self-healing blockchain with quantum-resistant encryption and automatic governance.',
    hashrate: '950 EH/s',
    security: 'POST-QUANTUM',
    launchDate: 'CYCLE 2025',
    tags: ['QUANTUM', 'AI-GOVERNED', 'SELF-HEALING'],
  },
  {
    id: 'proto-2',
    name: 'VOID PROTOCOL',
    version: 'v2.8.1',
    category: 'PRIVACY LAYER',
    description: 'Zero-knowledge proof system with bulletproof transaction privacy.',
    hashrate: 'N/A',
    security: 'MILITARY-GRADE',
    launchDate: 'CYCLE 2024',
    tags: ['ZK-PROOFS', 'PRIVATE', 'ANONYMOUS'],
  },
  {
    id: 'proto-3',
    name: 'NEXUS BRIDGE',
    version: 'v7.5.3',
    category: 'CROSS-CHAIN',
    description: 'Dimensional bridge for instant asset transfer between parallel universes.',
    hashrate: '720 EH/s',
    security: 'FAULT-TOLERANT',
    launchDate: 'CYCLE 2025',
    tags: ['BRIDGE', 'MULTI-CHAIN', 'INSTANT'],
  },
  {
    id: 'proto-4',
    name: 'SYNAPSE DAO',
    version: 'v3.1.0',
    category: 'GOVERNANCE',
    description: 'Neural network-powered decentralized autonomous organization.',
    hashrate: 'N/A',
    security: 'CONSENSUS-DRIVEN',
    launchDate: 'CYCLE 2024',
    tags: ['DAO', 'AI-POWERED', 'DEMOCRATIC'],
  },
];

// ============================================================================
// TERMINAL SECTION DATA
// ============================================================================

export const TERMINAL_DATA = {
  commands: [
    '> INITIALIZING QUANTUM CONNECTION...',
    '> ESTABLISHING NEURAL LINK...',
    '> LOADING ENCRYPTION KEYS...',
    '> SYNCHRONIZING BLOCKCHAIN...',
    '> ACTIVATING PLASMA SHIELDS...',
    '> DECRYPTING ASSETS...',
    '> MOUNTING HOLOGRAPHIC DISPLAY...',
    '> SYSTEM READY.',
  ],
  systemStatus: {
    cpu: 47,
    memory: 62,
    network: 89,
    temperature: 42,
    power: 97,
  },
} as const;

// ============================================================================
// ANIMATION CONFIGURATION
// ============================================================================

export const ANIMATION_CONFIG = {
  glitch: {
    intensity: 0.3,
    speed: 50,
    duration: 2000,
  },
  typing: {
    speed: 50,
    deleteSpeed: 30,
    delay: 2000,
  },
  matrix: {
    fontSize: 14,
    columnSpeed: 50,
    fadeSpeed: 0.05,
  },
  scanline: {
    speed: 8,
    opacity: 0.1,
    height: 4,
  },
  particle: {
    count: 100,
    speed: 2,
    size: 2,
    connectionDistance: 150,
  },
  hologram: {
    flickerSpeed: 100,
    shimmerSpeed: 2000,
    scanIntensity: 0.5,
  },
} as const;

// ============================================================================
// COLOR PALETTE
// ============================================================================

export const NEON_COLORS = {
  cyan: '#00ffff',
  magenta: '#ff00ff',
  electric: '#7b00ff',
  lime: '#00ff00',
  orange: '#ff6600',
  pink: '#ff0080',
  blue: '#0080ff',
  purple: '#8000ff',
} as const;
