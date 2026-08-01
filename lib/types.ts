/**
 * Shared types for NZ free calculators.
 * Copied from quotecore-plus app/lib/types.ts (only the types used by free tools).
 */

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

export type WasteType = 'percent' | 'fixed' | 'fixed_per_segment' | 'none';
export type PitchType = 'none' | 'rafter' | 'valley_hip';
