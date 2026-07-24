export const CONSENT_KEY = "qc_cookie_consent";
export const CONSENT_VERSION = "1.0";

export interface ConsentPrefs {
  strictlyNecessary: true;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  version: string;
}

export function getConsent(): ConsentPrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentPrefs) : null;
  } catch {
    return null;
  }
}

export function saveConsent(analytics: boolean, marketing: boolean): ConsentPrefs {
  const prefs: ConsentPrefs = {
    strictlyNecessary: true,
    analytics,
    marketing,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
  return prefs;
}

export function hasConsented(): boolean {
  return getConsent() !== null;
}
