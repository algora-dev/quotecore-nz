/**
 * Distributed rate limiter, backed by the `public.consume_rate_limit` RPC.
 *
 * Atomically increments a Postgres-backed counter via SECURITY DEFINER RPC
 * so the budget is shared across replicas and survives cold starts.
 *
 * On RPC failure we fail open (return true) and log a warning, because
 * silently locking real users out is worse than a brief gap in rate-limit
 * coverage. For high-sensitivity paths that should fail closed, pass
 * `{ failClosed: true }` explicitly.
 */

import { createClient as createServiceClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

let cachedClient: ReturnType<typeof createServiceClient> | null = null;

function getClient() {
  if (cachedClient) return cachedClient;
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    throw new Error(
      'rateLimit: missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY'
    );
  }
  cachedClient = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cachedClient;
}

export interface RateLimitOptions {
  /**
   * When true, treat RPC errors as "rate limited" (return false). Default
   * is fail-open (return true) so a transient DB blip doesn't lock real
   * users out. Use this for high-value buckets where lockouts are
   * preferable to leaks.
   */
  failClosed?: boolean;
}

/**
 * Check if a request is within rate limits.
 */
export async function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number,
  opts: RateLimitOptions = {}
): Promise<boolean> {
  try {
    const supabase = getClient();
    const { data, error } = await (supabase.rpc as any)('consume_rate_limit', {
      p_key: key,
      p_max: maxAttempts,
      p_window_ms: windowMs,
    });
    if (error) {
      console.warn('[rateLimit] RPC error:', error.message);
      return opts.failClosed ? false : true;
    }
    return data === true;
  } catch (err) {
    console.warn('[rateLimit] unexpected error:', err);
    return opts.failClosed ? false : true;
  }
}

/**
 * Extract client IP from request headers (works on Vercel + behind proxies).
 */
export function getClientIP(headers: Headers): string {
  return (
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
}
