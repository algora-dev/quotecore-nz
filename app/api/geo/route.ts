import { NextResponse } from 'next/server';

/**
 * Returns the visitor's country code from Vercel's x-vercel-ip-country header.
 * Falls back to 'NZ' when the header is absent (local dev, non-Vercel hosting).
 */
export function GET(req: Request) {
  const country = req.headers.get('x-vercel-ip-country') || 'NZ';
  return NextResponse.json({ country });
}
