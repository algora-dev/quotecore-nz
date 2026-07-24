'use client';

import { useEffect } from 'react';

/**
 * One-shot controller for the `.pill-shimmer` orange-sheen hover animation.
 * Ported from .com to support pill-shimmer buttons on the NZ marketing site.
 */
export function PillShimmerScript() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const PLAYING_CLASS = 'pill-shimmer--playing';

    function onEnter(e: PointerEvent) {
      const target = e.target as Element | null;
      if (!target) return;
      const pill = target.closest?.('.pill-shimmer');
      if (!pill || pill.classList.contains(PLAYING_CLASS)) return;
      pill.classList.add(PLAYING_CLASS);
    }

    function onAnimationEnd(e: AnimationEvent) {
      if (e.animationName !== 'shimmer') return;
      const target = e.target as Element | null;
      if (!target || !(target instanceof Element)) return;
      if (target.classList.contains(PLAYING_CLASS)) {
        target.classList.remove(PLAYING_CLASS);
      }
    }

    document.addEventListener('pointerover', onEnter);
    document.addEventListener('animationend', onAnimationEnd, true);
    return () => {
      document.removeEventListener('pointerover', onEnter);
      document.removeEventListener('animationend', onAnimationEnd, true);
    };
  }, []);

  return null;
}
