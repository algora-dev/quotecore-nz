import type { CalculatorCatalog } from './types';

/** NZ catalogue - owner-approved NZD conversions 2026-10-20 (rounded per owner table,
 * base 19->33 so min = base + core_low = exactly NZ$50).
 * These 13 codes are logical SKUs, not Stripe Price IDs. Core prices INCLUDE base.
 * NZD Stripe prices + sale-registry entries still needed before NZ checkout (dashboard task).
 */
export const PREVIEW_CATALOG: CalculatorCatalog = {
  id: 'quotecore-nz-monthly', revision: 'nz-owner-nzd-2026-10-20.1',
  stage: 'approved', currency: 'NZD', locale: 'en-NZ',
  baseMonthlyCents: 3300,
  thresholds: { lowMax: 5, mediumMax: 20, maxInput: 10000 },
  core: {
    low: { code: 'core_low', capacityCents: 1700, quotes: 5, storageBytes: 1e9 },
    medium: { code: 'core_medium', capacityCents: 3500, quotes: 20, storageBytes: 3e9 },
    high: { code: 'core_high', capacityCents: 7000, quotes: 100, storageBytes: 10e9 },
  },
  digital: { code: 'digital_takeoff', monthlyCents: 3500 },
  scan: {
    low: { code: 'scan_low', monthlyCents: 1700, tokens: 50 },
    medium: { code: 'scan_medium', monthlyCents: 5200, tokens: 150 },
    high: { code: 'scan_high', monthlyCents: 14000, tokens: 400 },
  },
  offcuts: {
    low: { code: 'offcuts_low', monthlyCents: 1700 },
    medium: { code: 'offcuts_medium', monthlyCents: 3500 },
    high: { code: 'offcuts_high', monthlyCents: 7000 },
  },
  assistant: {
    light: { code: 'assistant_light', monthlyCents: 3500, tasks: 200 },
    regular: { code: 'assistant_regular', monthlyCents: 7000, tasks: 400 },
    heavy: { code: 'assistant_heavy', monthlyCents: 10500, tasks: 1500 },
  },
  shareRule: 'Each new quote counts once, including drafts and copies. Editing, sending or sharing it does not use another quote. Deleting it does not restore the allowance.',
  scanRule: 'Each scan uses 2, 6 or 12 Scan Tokens at Low, Medium or High quality. A full plan uses two scans: roof outline, then components. You can mix quality levels. Extra scans use more tokens.',
  assistantRule: '1 Assistant Task = 1 task or request you send. The Assistant’s reply does not count as another task.',
};
