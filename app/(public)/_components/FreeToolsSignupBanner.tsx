'use client';

import { useFreeToolsAuth } from './FreeToolsAuthProvider';

/**
 * Notification-style signup banner for NZ free tool generator pages.
 * Must be rendered INSIDE <FreeToolsAuthProvider>.
 */
export function FreeToolsSignupBanner() {
  const { user, signOut, openAuthModal, tierInfo } = useFreeToolsAuth();

  if (user) {
    return (
      <div className="rounded-xl border border-orange-200 bg-orange-50/60 p-4 mb-6 print:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-700">✓ {user.email}</p>
            <p className="mt-1 text-xs text-slate-500">
              {tierInfo?.hasAppAccount ? 'App account' : 'Logged in'}
            </p>
          </div>
          <button
            onClick={() => void signOut()}
            className="text-xs font-medium text-slate-400 hover:text-slate-600 transition"
          >
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-orange-200 bg-orange-50/60 p-4 mb-6 print:hidden">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-700">
          Sign up with 1 click for higher daily limits and branding removal for all tools
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openAuthModal('signup')}
            className="rounded-full bg-[#FF6B35] px-4 py-2 text-xs font-semibold text-white hover:bg-[#ff5722] transition whitespace-nowrap"
          >
            Sign up free
          </button>
          <button
            onClick={() => openAuthModal('signin')}
            className="text-xs font-medium text-slate-500 hover:text-slate-900 transition whitespace-nowrap"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
}
