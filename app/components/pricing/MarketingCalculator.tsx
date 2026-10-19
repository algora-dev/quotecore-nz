'use client';

import { workflowCallHref } from '@/lib/booking';

import type { CSSProperties } from 'react';
import { PricingCalculator, PREVIEW_CATALOG, buildSignupHref } from './calculator';

const CALENDLY = workflowCallHref;
const SHELL_STYLE = { '--qcp-header-offset': '80px' } as CSSProperties;

export function MarketingCalculator({ notice }: { notice?: string } = {}) {
  return (
    <div style={SHELL_STYLE}>
      <PricingCalculator
        catalog={PREVIEW_CATALOG}
        variant="page"
        notice={notice}
        continueHref={(intent) => buildSignupHref('https://app.quote-core.com/signup?utm_source=nz_pricing', intent)}
        resultActions={{
          trade: 'roofing',
          links: {
            demo: 'https://demo.quote-core.com',
            'free-tools': '/free-tools',
            'takeoff-roofing': '/free-roof-takeoff',
            'takeoff-cladding': '/free-cladding-takeoff',
            'takeoff-flooring': '/free-flooring-takeoff',
            'book-demo': `${CALENDLY}?utm_source=quotecore_nz&utm_medium=pricing_page&utm_content=book_demo_20min`,
            'done-for-you': `${CALENDLY}?utm_source=quotecore_nz&utm_medium=pricing_page&utm_content=done_for_you_consultation`,
          },
        }}
      />
    </div>
  );
}
