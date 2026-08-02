#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';

const root = process.cwd();
const appDir = join(root, 'app');
const errors = [];
const warnings = [];

function walk(dir, callback) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const file = join(dir, entry);
    if (statSync(file).isDirectory()) walk(file, callback);
    else if (extname(file) === '.tsx') callback(file);
  }
}

const helperFile = join(root, 'lib', 'seo', 'hreflang.ts');
if (!existsSync(helperFile)) {
  errors.push('Missing lib/seo/hreflang.ts');
} else {
  const helper = readFileSync(helperFile, 'utf8');
  if (!helper.includes('en:')) errors.push('Hreflang helper must expose generic en');
  if (helper.includes('"en-US"') || helper.includes('"en-GB"')) {
    errors.push('Hreflang helper must not duplicate one global URL as en-US and en-GB');
  }
}

walk(appDir, (file) => {
  if (!file.endsWith('page.tsx') && !file.endsWith('layout.tsx')) return;
  const content = readFileSync(file, 'utf8');
  if (/canonical:\s*["']https:\/\/quote-core\.com/.test(content)) {
    errors.push(`NZ page canonicalises to global domain: ${file}`);
  }
  if (/priceCurrency:\s*["']USD["']/.test(content)) {
    errors.push(`NZ public schema uses USD instead of NZD: ${file}`);
  }
});

const reciprocal = [
  ['(home)', 'layout.tsx'],
  ['features', 'page.tsx'],
  ['features/digital-roof-takeoff', 'page.tsx'],
  ['features/smart-components', 'page.tsx'],
  ['features/material-ordering', 'page.tsx'],
  ['features/invoicing', 'page.tsx'],
  ['features/supplier-resources', 'page.tsx'],
  ['roofing-quoting-software', 'page.tsx'],
  ['construction-quoting-software', 'page.tsx'],
  ['about', 'page.tsx'],
  ['contact', 'layout.tsx'],
  ['services', 'page.tsx'],
  ['free-trial', 'page.tsx'],
];
for (const [route, fileName] of reciprocal) {
  const file = join(appDir, route, fileName);
  if (!existsSync(file)) {
    warnings.push(`Reciprocal route missing: ${route}`);
    continue;
  }
  const content = readFileSync(file, 'utf8');
  if (!content.includes('hreflangLanguages')) {
    errors.push(`Reciprocal route missing hreflang: ${route}`);
  }
  if (!content.includes('canonical')) {
    errors.push(`Reciprocal route missing canonical: ${route}`);
  }
}

const sitemap = readFileSync(join(appDir, 'sitemap.ts'), 'utf8');
if (sitemap.includes('lastModified: now') || sitemap.includes('const now = new Date()')) {
  errors.push('Sitemap uses artificial current-time lastModified values');
}

if (warnings.length) {
  console.log('Warnings:');
  for (const warning of warnings) console.log(`- ${warning}`);
}
if (errors.length) {
  console.error('SEO errors:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`SEO checks passed with ${warnings.length} warning(s).`);
