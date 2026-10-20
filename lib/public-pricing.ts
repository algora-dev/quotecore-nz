import { PREVIEW_CATALOG } from '@/app/components/pricing/calculator/calculatorConfig';

function centsToWhole(cents: number) {
  return Math.round(cents / 100);
}

const minMonthlyCents = PREVIEW_CATALOG.baseMonthlyCents + PREVIEW_CATALOG.core.low.capacityCents;
const maxMonthlyCents =
  PREVIEW_CATALOG.baseMonthlyCents +
  PREVIEW_CATALOG.core.high.capacityCents +
  PREVIEW_CATALOG.digital.monthlyCents +
  PREVIEW_CATALOG.scan.high.monthlyCents +
  PREVIEW_CATALOG.offcuts.high.monthlyCents +
  PREVIEW_CATALOG.assistant.heavy.monthlyCents;

export const publicPricing = {
  currency: 'NZD',
  monthlyMin: centsToWhole(minMonthlyCents),
  monthlyMax: centsToWhole(maxMonthlyCents),
  doneForYouStarting: 899,
  doneForYouCurrency: 'NZD',
  hasFullAppTrial: false,
  hasMoneyBackGuarantee: false,
} as const;

export function publicPricingRange() {
  return `from NZ$${publicPricing.monthlyMin}/month`;
}

export function doneForYouStartsFrom() {
  return `NZ$${publicPricing.doneForYouStarting}`;
}