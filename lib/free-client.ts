import { createBrowserClient } from '@supabase/ssr';
import { authCookieOptions } from '@/lib/cookie-config';

/**
 * Browser-side Supabase client for NZ free tools pages.
 * Uses the same Supabase project as the .com site (shared database).
 * Auth is optional - tools work without it (Tier 1 anonymous).
 */
export function createFreeToolsClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const cookieOptions = authCookieOptions(
    typeof window !== 'undefined' ? window.location.hostname : undefined,
  );
  if (!url || !key) {
    if (typeof window !== 'undefined') {
      console.error(
        '[nz-free-tools] Supabase env vars missing - free tools auth is disabled. ' +
        'Add NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY to the Vercel project and redeploy.'
      );
    }
    return createBrowserClient('https://placeholder.supabase.co', 'placeholder-anon-key', { cookieOptions });
  }
  return createBrowserClient(url, key, { cookieOptions });
}
