/**
 * Cross-domain handoff helpers for the NZ free tools.
 * Adapted from .com version - handles .co.nz domain.
 */

export function getAppOrigin(): string {
  if (typeof window === 'undefined') return '';
  const h = window.location.hostname.toLowerCase();
  if (
    h === 'quote-core.com' ||
    h === 'www.quote-core.com' ||
    h === 'quote-core.co.nz' ||
    h === 'www.quote-core.co.nz'
  ) {
    return 'https://app.quote-core.com';
  }
  return '';
}

export function setHandoffCookie(name: string, value: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  if (typeof document === 'undefined') return;
  const h = window.location.hostname.toLowerCase();
  const domain =
    h === 'quote-core.com' || h.endsWith('.quote-core.com') ? '; domain=.quote-core.com' :
    h === 'quote-core.co.nz' || h.endsWith('.quote-core.co.nz') ? '; domain=.quote-core.co.nz' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax${domain}`;
}

export function clearHandoffCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=; path=/; max-age=0`;
  const h = window.location.hostname.toLowerCase();
  if (h === 'quote-core.com' || h.endsWith('.quote-core.com')) {
    document.cookie = `${name}=; path=/; max-age=0; domain=.quote-core.com`;
  }
  if (h === 'quote-core.co.nz' || h.endsWith('.quote-core.co.nz')) {
    document.cookie = `${name}=; path=/; max-age=0; domain=.quote-core.co.nz`;
  }
}
