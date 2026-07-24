/**
 * Canonical production URL for the NZ site.
 *
 * Always uses the canonical marketing domain www.quote-core.co.nz in
 * production so Google indexes the right URLs.
 */
export const PRODUCTION_URL = 'https://www.quote-core.co.nz';

export const SITE_URL =
  process.env.VERCEL_ENV === 'production'
    ? PRODUCTION_URL
    : process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || PRODUCTION_URL;
