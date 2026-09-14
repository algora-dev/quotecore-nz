export interface HeroController {
  readonly duration: number;
  readonly currentTime: number;
  readonly playing: boolean;
  play(): void; pause(): void; seek(milliseconds: number): void;
  finish(): void; replay(): void; destroy(): void;
}
export interface HeroScene {
  id: string; start: number; duration: number; title: string;
  rows: string[]; rowDelays: number[]; glowDelays: number[];
}
export interface HeroSequence {
  duration: number;
  scenes: HeroScene[];
  final: HeroScene & { reuseDelay: number; reuse: string };
  motion: { entryDuration: number; exitDuration: number; glowDuration: number };
}
export function mountQuoteCoreHero(root: HTMLElement, sequence: HeroSequence,
  options?: { autoplay?: boolean; observe?: boolean; startPaused?: boolean }): HeroController;
