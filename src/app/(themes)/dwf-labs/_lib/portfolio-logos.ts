/**
 * Portfolio company logo data
 *
 * Maps company names to their DWF logo API identifiers.
 * Logos are fetched from: https://www.dwf-labs.com/api/media/file/partner-{id}-dark.svg
 */

export const portfolioCompanies = [
  { name: 'TRON', id: 'tron', num: '01' },
  { name: 'Algorand', id: 'algorand', num: '02' },
  { name: 'Notcoin', id: 'notcoin', num: '03' },
  { name: 'Mantle', id: 'mantle', num: '04' },
  { name: 'Jupiter', id: 'jupiter', num: '05' },
  { name: 'TON', id: 'ton', num: '06' },
  { name: 'Gala', id: 'gala', num: '07' },
  { name: 'Celo', id: 'celo', num: '08' },
  { name: 'Fetch.ai', id: 'fetch', num: '09' },
  { name: 'YGG', id: 'ygg', num: '10' },
  { name: 'Beam', id: 'beam', num: '11' },
  { name: 'Sonic', id: 'sonic', num: '12' },
  { name: 'WLFI', id: 'wlfi', num: '13' },
  { name: 'Vaultek', id: 'vaultek', num: '14' },
  { name: 'Floki', id: 'floki', num: '15' },
] as const;

export type PortfolioCompany = typeof portfolioCompanies[number];

// Get the remote URL for a company logo
export function getLogoUrl(id: string): string {
  return `https://www.dwf-labs.com/api/media/file/partner-${id}-dark.svg`;
}

// Get the local cached path for a company logo
export function getCachedLogoPath(id: string): string {
  return `/dwf-logos/${id}.svg`;
}
