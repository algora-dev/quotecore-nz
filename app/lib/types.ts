/**
 * NZ free-tools port: standalone subset of the QuoteCore+ app type module.
 * Supabase-generated table types live in the app repo; the NZ marketing site
 * only needs the pricing-engine and takeoff-tool types. QuoteRow is used by
 * the free takeoff tools as a cast target only (no field access on this site).
 */

export type ComponentType = 'main' | 'extra';

export type MeasurementType =
  | 'area'
  | 'lineal'
  | 'linear'
  | 'quantity'
  | 'fixed'
  | 'length_x_height'
  | 'volume'
  | 'hours_days'
  | 'count'
  | 'curved_line'
  | 'irregular_area'
  | 'multi_lineal'
  | 'multi_lineal_lxh'
  | 'volume_3d'
  | 'length_x_height_freestyle'
  | 'multi_lineal_lxh_freestyle';

export type PricingStrategy =
  | 'per_unit'
  | 'per_pack_length'
  | 'per_pack_area'
  | 'per_pack_coverage'
  | 'per_pack_volume';

export type WasteUnit = 'percent' | 'flat' | 'flat_per_segment';

export type Trade = 'roofing' | 'generic';

export type MeasurementSystem = 'metric' | 'imperial_ft' | 'imperial_rs' | 'imperial';

/** Narrow a possibly-legacy MeasurementSystem to the canonical set. */
export function normalizeMeasurementSystem(
  system: MeasurementSystem | null | undefined
): 'metric' | 'imperial_ft' | 'imperial_rs' {
  if (system === 'imperial_ft') return 'imperial_ft';
  if (system === 'imperial' || system === 'imperial_rs') return 'imperial_rs';
  return 'metric';
}

export type InputMode = 'final' | 'calculated';
export type WasteType = 'percent' | 'fixed' | 'fixed_per_segment' | 'none';
export type PitchType = 'none' | 'rafter' | 'valley_hip';
export type QuoteStatus = 'draft' | 'confirmed' | 'sent' | 'accepted' | 'declined' | 'expired' | 'archived';
export type LineType = 'component' | 'custom' | 'roof_area_header';

/** Cast-target-only stand-in for the app repo's quotes table row. */
export type QuoteRow = { id: string } & Record<string, unknown>;
