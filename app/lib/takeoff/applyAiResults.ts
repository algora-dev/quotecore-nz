/** NZ free-tools port: type-only subset of the .com applyAiResults module.
 *  The full takeoff pipeline lives in the QuoteCore+ app repo; the NZ free
 *  tools only need the validated AI scan shape for demo data typing. */

export interface CanvasPoint { x: number; y: number }

export interface AiLineEntry { points: CanvasPoint[] }

export interface AiRoofArea {
  name: string;
  points: CanvasPoint[];
  pitch_degrees: number | null;
}

/** The validated AI result shape (from the API response). */
export interface AiScanData {
  scale: {
    detected: boolean;
    ratio: string | null;
    dimension_line: {
      p1: CanvasPoint; p2: CanvasPoint;
      real_length: number; unit: string;
    } | null;
  };
  pitch: { detected: boolean; global_degrees: number | null };
  roof_areas: AiRoofArea[];
  components: {
    ridges: AiLineEntry[];
    hips: AiLineEntry[];
    valleys: AiLineEntry[];
    broken_hips: AiLineEntry[];
    barges: AiLineEntry[];
    spouting: AiLineEntry[];
    uncertain: AiLineEntry[];
  };
  notes: string[];
  error?: string;
}
