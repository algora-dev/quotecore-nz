'use client';

/**
 * NZ free-tools port: minimal stand-in for the .com DemoWorkstation.
 * The full interactive demo workstation is an app-side feature on quote-core.com.
 * This stub preserves the public interface the NZ free takeoff tools compile
 * against: the DemoFinishPayload type and a component that renders a simple
 * fallback when the demo preview is opened.
 */

export interface DemoFinishPayload {
  roofAreas: { id: string; name: string; area: number; pitch: number }[];
  componentGroups: Array<{
    componentId: string;
    name: string;
    isSystem: boolean;
    semantic: string | null;
    count: number;
    total: number;
    measurementType?: string;
    measurements: { value: number; quoteRoofAreaId?: string | null }[];
  }>;
  calibrationUnit: string;
  unitSystem?: 'metric' | 'imperial' | 'squares';
  componentSpecs?: import('@/app/free-roof-takeoff/tradeConfig').TakeoffComponentSpec[];
}

interface DemoWorkstationProps {
  onFinish?: (payload: DemoFinishPayload) => void;
  [key: string]: unknown;
}

export function DemoWorkstation(_props: DemoWorkstationProps) {
  return (
    <div className="p-6 text-sm text-slate-600">
      The interactive demo workstation is available on{' '}
      <a
        href="https://quote-core.com/takeoff-demo"
        className="text-[#BD4A1A] underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        quote-core.com/takeoff-demo
      </a>
      .
    </div>
  );
}
