/**
 * Supabase auth cookie configuration for the NZ site (quote-core.co.nz).
 *
 * Adapted from the .com cookie-config. The NZ site is a different domain,
 * so auth cookies are host-only (no cross-domain sharing with .com).
 * Free tools work without auth (Tier 1 anonymous); auth is optional and
 * gives higher daily limits.
 */

export const AUTH_COOKIE_NAME = 'sb-qcp-nz-auth';

export function authCookieDomain(hostname: string | null | undefined): string | undefined {
  if (!hostname) return undefined;
  const h = hostname.toLowerCase().split(':')[0];
  if (h === 'www.quote-core.co.nz' || h === 'quote-core.co.nz') return '.quote-core.co.nz';
  return undefined;
}

export function authCookieOptions(hostname: string | null | undefined): {
  name: string;
  domain?: string;
} {
  const domain = authCookieDomain(hostname);
  return { name: AUTH_COOKIE_NAME, ...(domain ? { domain } : {}) };
}
