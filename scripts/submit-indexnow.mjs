#!/usr/bin/env node
/**
 * Submit NZ URLs to Bing IndexNow for fast indexing.
 * Usage: node scripts/submit-indexnow.mjs
 */

const INDEXNOW_KEY = '22ffbce37a69481c9841bddef9028097';
const INDEXNOW_URL = 'https://api.indexnow.org/IndexNow';

const URLS = [
  'https://www.quote-core.co.nz/',
  'https://www.quote-core.co.nz/features',
  'https://www.quote-core.co.nz/features/digital-roof-takeoff',
  'https://www.quote-core.co.nz/features/smart-components',
  'https://www.quote-core.co.nz/features/material-ordering',
  'https://www.quote-core.co.nz/features/invoicing',
  'https://www.quote-core.co.nz/features/supplier-resources',
  'https://www.quote-core.co.nz/free-tools',
  'https://www.quote-core.co.nz/free-roofing-takeoff-builder',
  'https://www.quote-core.co.nz/free-quote-generator',
  'https://www.quote-core.co.nz/free-invoice-generator',
  'https://www.quote-core.co.nz/free-purchase-order-generator',
  'https://www.quote-core.co.nz/free-roofing-calculator',
  'https://www.quote-core.co.nz/free-roof-pricing-calculator',
  'https://www.quote-core.co.nz/free-construction-calculator',
  'https://www.quote-core.co.nz/free-concrete-calculator',
  'https://www.quote-core.co.nz/free-landscaping-calculator',
  'https://www.quote-core.co.nz/free-birds-mouth-calculator',
  'https://www.quote-core.co.nz/pricing',
  'https://www.quote-core.co.nz/about',
  'https://www.quote-core.co.nz/contact',
  'https://www.quote-core.co.nz/services',
  'https://www.quote-core.co.nz/free-trial',
  'https://www.quote-core.co.nz/roofing-quoting-software',
  'https://www.quote-core.co.nz/construction-quoting-software',
];

async function submit() {
  const body = {
    host: 'www.quote-core.co.nz',
    key: INDEXNOW_KEY,
    keyLocation: `https://www.quote-core.co.nz/${INDEXNOW_KEY}.txt`,
    urlList: URLS,
  };

  console.log(`Submitting ${URLS.length} NZ URLs to IndexNow...`);
  
  try {
    const res = await fetch(INDEXNOW_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    console.log(`Response: ${res.status} ${res.statusText}`);
    if (res.status === 200) {
      console.log('URLs submitted successfully.');
    } else if (res.status === 202) {
      console.log('Submission accepted. URLs will be indexed soon.');
    } else if (res.status === 422) {
      console.log('Invalid submission. Check key file is accessible.');
    } else {
      const text = await res.text().catch(() => '');
      console.log(`Unexpected response: ${text}`);
    }
  } catch (err) {
    console.error('Error submitting to IndexNow:', err.message);
  }
}

submit();
