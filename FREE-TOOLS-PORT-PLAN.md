# Plan: Port Free Tools to quote-core.co.nz (NZ-Localised)

## Objective

Port all free tools from `quote-core.com` (quotecore-plus project) to `quote-core.co.nz` (quotecore-nz project) with fully NZ-localised content. The .co.nz site must NOT redirect users to .com for any free tool. Every tool page must have NZ-specific content that is genuinely different from the .com version to avoid duplicate content penalties.

## Background

- **.com** (`quotecore-plus`): Main app with all free tools, calculators, generators, takeoff builder, API endpoints. Already has full SEO.
- **.co.nz** (`quotecore-nz`): NZ marketing site with ~12 pages (home, about, contact, pricing, etc.). No free tools. Currently redirects `/free-tools` to .com.
- **The problem:** .com is a generic global domain. Bing/Google don't prioritise it for NZ-specific queries. ChatGPT uses Bing for web browsing, so it doesn't find us when Kiwis ask about roof takeoffs.
- **The solution:** Put NZ-localised versions of all free tools on .co.nz so the NZ domain ranks for NZ searches.

## Critical Rule: No Duplicate Content

Google and Bing penalise sites that publish identical content across multiple domains. Every page on .co.nz must be **genuinely different** from its .com counterpart. This is NOT copying and tweaking a few words - it's writing NZ-first content from scratch.

### What makes .co.nz content "genuinely different":
- NZ-first language and examples (Auckland, Wellington, Christchurch, Hamilton)
- NZD pricing defaults (NZ$ not US$)
- NZ building code references (E2/AS1, NZS 3604, NZS 4214)
- NZ trade terminology (spouting not gutter, long-run not corrugated iron, CLR not Gable)
- NZ supplier names and context
- NZ-specific FAQ content
- Different title tags, meta descriptions, H1s
- `hreflang` tags declaring `en-NZ` for .co.nz and `en-US`/`x-default` for .com
- Different internal linking structure (links to .co.nz pages, not .com)

Google explicitly supports this - localised versions of the same tool are not duplicate content when properly marked up with `hreflang`.

---

## Source Project Reference

**Source:** `C:\Users\Jimmy\.openclaw\workspace-gavin\projects\quotecore-plus`
**Target:** `C:\Users\Jimmy\.openclaw\workspace-gavin\projects\quotecore-nz`

### Source directory: `app/(public)/`
This contains all the free tool routes:
- `free-tools/` - Free tools hub page
- `free-roofing-takeoff-builder/` - Roof takeoff builder (standalone tool)
- `free-calculators/` - Shared calculator engine + config files (roofing, concrete, construction, landscaping)
- `free-quote-generator/` - Quote generator
- `free-purchase-order-generator/` - PO generator
- `free-invoice-generator/` - Invoice generator
- `free-roofing-calculator/` - Roofing calculator (uses shared calculator engine)
- `free-construction-calculator/` - Construction calculator
- `free-concrete-calculator/` - Concrete calculator
- `free-landscaping-calculator/` - Landscaping calculator
- `free-birds-mouth-calculator/` - Bird's mouth calculator
- `_components/` - Shared free tools components (auth, header, signup banner)

### Source directory: `app/api/public/`
- `roof-takeoff/calculate/route.ts` - POST API for takeoff calculations
- `roof-takeoff/schema/route.ts` - GET schema endpoint
- `roof-takeoff/openapi/route.ts` - GET OpenAPI spec
- `suppliers/search/route.ts` - GET supplier search

### Source files: `public/`
- `llms.txt` - AI discovery file

### 42 SEO slug calculator pages
The .com site has 42 individual SEO calculator pages (e.g. `/free-roof-pitch-calculator`, `/free-rafter-length-calculator`, etc.) driven by config files in `app/(public)/free-calculators/configs/`. These are generated from slug registry files.

---

## Phase 1: Free Tools Hub Page (`/free-tools`)

### What to build
Create `app/free-tools/page.tsx` and `app/free-tools/layout.tsx` in the quotecore-nz project.

### NZ-localised content requirements
- **H1:** "Free Tools for Kiwi Trades" (not "Free Tools for Trades")
- **Page description:** NZ-focused - mention "New Zealand trades", "Kiwi roofers", NZD pricing
- **Tool descriptions:** Rewrite every tool description with NZ context
  - Example: Roof Takeoff Builder description should mention "long-run roofing", "NZ roof types", "spouting"
  - Example: Roofing Calculator should mention "NZ pitch ratios", "E2/AS1 compliance"
- **"Why are these free?" section:** NZ-focused - mention "built by a Kiwi roofer"
- **CTA:** Link to `/free-trial` (not `/signup`)
- **Footer:** Use .co.nz SiteFooter, not .com

### Technical
- Use the .co.nz `NzHeader` and `SiteFooter` components, not the .com `BlogHeader`
- Use .co.nz `nzMarket` config for domain/currency references
- Add to .co.nz sitemap
- Add hreflang tags pointing to .com equivalent
- Meta tags: NZ-specific title and description
- JSON-LD: `WebApplication` schema with NZ domain

### Tool directory
List ALL tools (same as .com) but:
- Tools that are self-hosted on .co.nz link to `/{slug}` on .co.nz
- If any tool is NOT yet ported, link to it on .com with `target="_blank"` and a small "opens in new tab" indicator
- **Goal:** All tools self-hosted on .co.nz, but if some aren't ready yet, the hub still works

---

## Phase 2: Roof Takeoff Builder (`/free-roofing-takeoff-builder`)

This is the highest-value tool for NZ search. Port it fully.

### Files to port from .com
From `app/(public)/free-roofing-takeoff-builder/`:
- `engine.ts` - Pure calculation logic (port as-is, no changes needed)
- `public-contract.ts` - Input parsing and validation (port as-is)
- `public-contract.test.ts` - Tests (port as-is)
- `calc.ts` - Calculation helpers (port as-is)
- `types.ts` - Type definitions (port as-is)
- `result-token.ts` - HMAC token signing (port as-is, but use a .co.nz-specific secret env var)
- `result-token.test.ts` - Tests (port as-is)
- `schema.ts` - AI-facing schema (port and NZ-localise the descriptions/examples)
- `helpers.tsx` - UI helpers (port and adapt to .co.nz styling)
- `ComponentGuideBox.tsx` - Info component (port and NZ-localise text)
- `EntryComponents.tsx` - Entry UI components (port and NZ-localise)
- `RoofTakeoffBuilder.tsx` - Main UI component (port and NZ-localise)
- `ResultsModal.tsx` - Results display (port and NZ-localise)
- `layout.tsx` - SEO layout (rewrite with NZ-specific meta, JSON-LD, FAQ)
- `page.tsx` - Main page (rewrite with NZ-specific content)
- `calculate/page.tsx` - GET calculation redirect (port, update URLs to .co.nz)
- `result/[id]/page.tsx` - Server-rendered result page (port, update URLs to .co.nz)

### API routes to port
From `app/api/public/roof-takeoff/`:
- `calculate/route.ts` - POST API (port, update CORS/origin refs to .co.nz)
- `schema/route.ts` - GET schema (port, update URLs to .co.nz)
- `openapi/route.ts` - GET OpenAPI spec (port, update server URL to .co.nz)

From `app/api/public/suppliers/`:
- `search/route.ts` - Supplier search (port as-is, supplier data is shared)

### NZ localisation changes
- **SITE_URL** constant: `https://www.quote-core.co.nz` (not `https://quote-core.com`)
- **Default currency:** NZD
- **Examples in UI:** Use NZ cities, NZ roof types, NZ measurements
  - "126m2 Auckland roof, 25 degree pitch, four 5m hips..."
  - Reference NZ roof types: long-run, corrugated, tile, shingle
- **FAQ section:** NZ-specific questions
  - "How do I calculate roof area for a NZ long-run roof?"
  - "What pitch factors apply to NZ roofing?"
  - "How does this work with NZ spouting sizes?"
- **Meta title:** "Free Roof Takeoff Calculator NZ | QuoteCore+"
- **Meta description:** NZ-focused - mention "New Zealand roofers", "NZ roof types", "spouting"
- **JSON-LD:** `WebApplication` schema with .co.nz URL, NZD pricing
- **llms.txt:** Create a .co.nz version pointing to .co.nz endpoints
- **hreflang:** Point `en-NZ` to .co.nz, `en-US`/`x-default` to .com

### Environment variables needed on .co.nz Vercel project
- `RESULT_TOKEN_SECRET` - HMAC signing secret for result tokens (generate a new one for .co.nz)
- `SUPABASE_URL` - Same Supabase project (shared database)
- `SUPABASE_SERVICE_ROLE_KEY` - Same service role key
- `STRIPE_SECRET_KEY` - If pricing is shown (same Stripe account)

---

## Phase 3: Roofing Calculator (`/free-roofing-calculator`)

### What to build
Port the shared calculator engine and roofing config to .co.nz.

### Files to port from .com
From `app/(public)/free-calculators/`:
- `_shared/` directory - ALL files (TradeCalculator.tsx, TradeLayoutShell.tsx, TradePage.tsx, types.ts, all tab components, CalcResultPopup.tsx, CalculatorHubClient.tsx, AngleDiagram.tsx)
- `configs/` directory - ALL config files (roofing.ts, concrete.ts, construction.ts, landscaping.ts, registry.ts, all slug registries)
- `layout.tsx` and `page.tsx` - Adapt for .co.nz

From `app/(public)/free-roofing-calculator/`:
- This is a route that uses the shared calculator with roofing config
- Port the route, NZ-localise the content

### NZ localisation changes
- **Default units:** Metric (same as .com)
- **Default currency:** NZD (not USD)
- **NZ-specific calculator tabs:** Add NZ-relevant calculations if applicable
  - NZ batten spacing (NZS 3604)
  - NZ roof pitch ratios (common NZ pitches: 15deg, 22.5deg, 30deg, 45deg)
  - Long-run sheet coverage calculations
- **Examples:** NZ roof dimensions, NZ material names
- **FAQ:** NZ-specific roofing questions
- **Meta tags:** "Free Roofing Calculator NZ | QuoteCore+"
- **JSON-LD:** NZ-localised WebApplication schema
- **hreflang:** `en-NZ` for .co.nz

### The 42 SEO slug pages
The .com site has 42 individual calculator pages driven by slug config files (e.g. `/free-roof-pitch-calculator`, `/free-rafter-length-calculator`, etc.). These are generated from:
- `configs/roofingSlugs1.ts` through `roofingSlugs4.ts`
- `configs/concreteSlugs.ts`
- `configs/constructionSlugs.ts`
- `configs/slopeSlugs.ts`

**Port ALL of these to .co.nz.** Each slug page needs:
- NZ-localised meta title and description
- NZ-specific examples in the calculator config
- NZ-focused FAQ content
- hreflang tags
- Entry in .co.nz sitemap

This is the bulk of the work but the config files are data-driven, so the localisation is mostly in the metadata/examples, not the calculation logic.

---

## Phase 4: Construction Calculator (`/free-construction-calculator`)

Port using the shared calculator engine with construction config.

### NZ localisation
- NZ timber sizes (90x45, 140x45, 190x45 - NZ standard framing)
- NZ stud spacing (usually 600mm or 400mm centres per NZS 3604)
- NZ wall heights (standard 2.4m ceiling height)
- NZ-specific material names
- NZD pricing
- Meta: "Free Construction Calculator NZ | QuoteCore+"

---

## Phase 5: Concrete Calculator (`/free-concrete-calculator`)

Port using the shared calculator engine with concrete config.

### NZ localisation
- NZ concrete grades (standard 20MPa, 25MPa, 30MPa)
- NZ ready-mix pricing in NZD per m3
- NZ footing dimensions per NZS 3604
- NZ slab thickness standards (100mm residential)
- Meta: "Free Concrete Calculator NZ | QuoteCore+"

---

## Phase 6: Landscaping Calculator (`/free-landscaping-calculator`)

Port using the shared calculator engine with landscaping config.

### NZ localisation
- NZ plant spacing
- NZ turf varieties (fescue, rye, kikuyu)
- NZ topsoil pricing in NZD
- Meta: "Free Landscaping Calculator NZ | QuoteCore+"

---

## Phase 7: Bird's Mouth Calculator (`/free-birds-mouth-calculator`)

Port using the shared calculator engine with birdsmouth config.

### NZ localisation
- NZ rafter sizes (90x45, 140x45, 190x45)
- NZ building code references (NZS 3604 birdsmouth cut limits)
- NZ pitch ratios
- Meta: "Free Bird's Mouth Calculator NZ | QuoteCore+"

---

## Phase 8: Quote Generator (`/free-quote-generator`)

### What to build
Port the quote generator with NZ-localised defaults.

### Files to port from .com
From `app/(public)/free-quote-generator/`:
- `page.tsx` - Main page
- `layout.tsx` - SEO layout
- `ImageUpload.tsx` - AI image upload component
- `PromptBox.tsx` - AI prompt box

### NZ localisation
- **Default tax:** GST 15% (not US sales tax)
- **Default currency:** NZD
- **Business details template:** NZ format (address, GST number, company number)
- **Terms and conditions default:** NZ construction terms
- **Examples:** NZ trade business names, NZ cities
- **Meta:** "Free Quote Generator NZ | QuoteCore+"
- **FAQ:** NZ-specific quoting questions (GST handling, provisional sums, etc.)
- **hreflang tags**

### Dependencies
- PDF generation (jsPDF + html2canvas) - add to .co.nz package.json
- AI image upload - wire to same backend API or create .co.nz API route
- Auth provider (optional) - can use .co.nz's own auth or skip

---

## Phase 9: Purchase Order Generator (`/free-purchase-order-generator`)

### What to build
Port the PO generator with NZ-localised defaults.

### Files to port
From `app/(public)/free-purchase-order-generator/`:
- `page.tsx` - Main page
- `layout.tsx` - SEO layout

### NZ localisation
- **Default currency:** NZD
- **Supplier details:** NZ format
- **Delivery terms:** NZ standard terms
- **Examples:** NZ supplier names (Bunnings NZ, Mitre 10, ITM, Placemakers)
- **Meta:** "Free Purchase Order Generator NZ | QuoteCore+"
- **hreflang tags**

---

## Phase 10: Invoice Generator (`/free-invoice-generator`)

### What to build
Port the invoice generator with NZ-localised defaults.

### Files to port
From `app/(public)/free-invoice-generator/`:
- `page.tsx` - Main page
- `layout.tsx` - SEO layout

### NZ localisation
- **Default tax:** GST 15%
- **Default currency:** NZD
- **Bank details format:** NZ bank account format (XX-XXXX-XXXXXXX-XX)
- **Invoice number format:** NZ-style
- **Payment terms:** NZ standard (7 days, 14 days, 20th of following month)
- **Examples:** NZ trade business names
- **Meta:** "Free Invoice Generator NZ | QuoteCore+"
- **hreflang tags**

---

## Phase 11: Shared Components

### Free Tools Auth Provider
The .com site has `app/(public)/_components/` with:
- `FreeToolsAuthProvider.tsx`
- `FreeToolsAuthButton.tsx`
- `FreeToolsAuthCard.tsx`
- `FreeToolsSignupBanner.tsx`
- `FreeToolsHeader.tsx`
- `useFreeToolsEmail.ts`

**Decision needed:** Should .co.nz free tools have their own auth, or should they be fully standalone (no signup/login)?

**Recommendation:** Port the auth components but adapt them for .co.nz. The "sign up" CTAs should link to .co.nz `/free-trial`, not .com `/signup`. If .co.nz doesn't have its own Supabase auth yet, the tools can work without auth (the .com versions work without auth too - it's optional).

---

## Phase 12: API Routes

Port the public API routes to .co.nz so it has its own endpoints:

### Routes to create
- `app/api/public/roof-takeoff/calculate/route.ts` - POST calculation API
- `app/api/public/roof-takeoff/schema/route.ts` - GET schema
- `app/api/public/roof-takeoff/openapi/route.ts` - GET OpenAPI spec
- `app/api/public/suppliers/search/route.ts` - GET supplier search

### Changes from .com
- Update all URL references from `quote-core.com` to `www.quote-core.co.nz`
- Update CORS headers to allow `.co.nz` origin
- Update OpenAPI server URL
- Same Supabase connection (shared database)
- Same supplier data

---

## Phase 13: llms.txt for .co.nz

Create `public/llms.txt` on .co.nz with:
- .co.nz URLs for all endpoints
- NZ-focused description
- Same calculation engine, different domain

### Also create
- `public/llms-full.txt` if .com has one (check)
- Update `app/robots.ts` on .co.nz to allow crawling of `/free-tools`, `/free-roofing-takeoff-builder`, `/free-roofing-calculator`, `/api/public/`

---

## Phase 14: Sitemap Update

Update `app/sitemap.ts` on .co.nz to include ALL new routes:

```typescript
// Add to the routes array:
"/free-tools",
"/free-roofing-takeoff-builder",
"/free-roofing-takeoff-builder/calculate",
"/free-roofing-calculator",
"/free-construction-calculator",
"/free-concrete-calculator",
"/free-landscaping-calculator",
"/free-birds-mouth-calculator",
"/free-quote-generator",
"/free-purchase-order-generator",
"/free-invoice-generator",
// Plus all 42 SEO slug calculator pages
```

---

## Phase 15: hreflang Tags

### On .co.nz (quotecore-nz project)
Update `lib/hreflang.ts` to include the new free tools paths in the shared equivalent paths list:

```typescript
// Add to the shared equivalent paths:
// /free-tools, /free-roofing-takeoff-builder, /free-roofing-calculator,
// /free-construction-calculator, /free-concrete-calculator,
// /free-landscaping-calculator, /free-birds-mouth-calculator,
// /free-quote-generator, /free-purchase-order-generator,
// /free-invoice-generator
```

### On .com (quotecore-plus project)
Update `lib/seo/hreflang.ts` (or `app/lib/seo/hreflang.ts`) to include the same new paths.

**Both files must stay in sync** - they already have a comment noting this.

---

## Phase 16: Navigation Update

### .co.nz header
Update `lib/nz.ts` `nzNav` array to include "Free Tools" pointing to `/free-tools`:
```typescript
{ href: "/free-tools", label: "Free Tools" },
```

### .co.nz footer
Update `components/SiteFooter.tsx` to include a link to `/free-tools`.

### Remove the redirect
The .co.nz `next.config.ts` currently redirects non-www to www. Check if there's a redirect from `/free-tools` to .com anywhere - if so, remove it. The `/free-tools` route should resolve locally on .co.nz.

---

## Phase 17: robots.txt Update

Update `app/robots.ts` on .co.nz to allow crawling of all free tool routes:

```typescript
// Add to allow list:
"/free-tools",
"/free-roofing-takeoff-builder",
"/free-roofing-calculator",
"/free-construction-calculator",
"/free-concrete-calculator",
"/free-landscaping-calculator",
"/free-birds-mouth-calculator",
"/free-quote-generator",
"/free-purchase-order-generator",
"/free-invoice-generator",
"/api/public/",
```

---

## Dependency Checklist

Before starting, ensure the .co.nz project has these packages in `package.json` (check what .com has that .co.nz doesn't):

- `jspdf` - PDF generation for quote/PO/invoice generators
- `html2canvas` - HTML-to-canvas for PDF rendering
- `@supabase/supabase-js` - Already present (confirm)
- Any UI libraries used by the calculator components
- Testing utilities if porting tests

Run `npm install` after adding dependencies.

---

## NZ Localisation Checklist (Apply to EVERY Page)

- [ ] Title tag includes "NZ" or "New Zealand"
- [ ] Meta description mentions NZ context
- [ ] H1 is different from .com version
- [ ] First 100 words answer the search question with NZ context
- [ ] Examples use NZ cities (Auckland, Wellington, Christchurch, Hamilton, Tauranga)
- [ ] Currency is NZD (NZ$)
- [ ] Tax is GST 15% where applicable
- [ ] Trade terminology is NZ English (spouting, long-run, CLR, coloursteel, etc.)
- [ ] Building code references are NZ (NZS 3604, E2/AS1, etc.)
- [ ] FAQ content is NZ-specific (different questions from .com)
- [ ] Internal links point to .co.nz pages (not .com)
- [ ] hreflang tags present (`en-NZ` for .co.nz, `en-US`/`x-default` for .com)
- [ ] JSON-LD structured data uses .co.nz URLs
- [ ] Page is in .co.nz sitemap
- [ ] robots.txt allows crawling
- [ ] No content copied verbatim from .com

---

## NZ Trade Terminology Reference

| .com (generic) | .co.nz (NZ) |
|---|---|
| Gutter | Spouting |
| Gable roof | CLR (Closed Long Run) or gable |
| Corrugated iron | Long-run (or corrugated for the specific profile) |
| Roofing square | Not commonly used in NZ - use m2 |
| Downspout | Downpipe |
| Fascia board | Fascia |
| Soffit | Soffit or eaves lining |
| Flashing | Flashing (same) |
| Shingles | Shingles (less common in NZ - tiles and long-run more common) |
| Underlayment | Underlay |
| Ice and water shield | Not applicable to NZ climate |
| Drip edge | Drip edge (same) |
| Ridge vent | Ridge vent (same, but less common in NZ) |

---

## NZ Building Code Reference

Common references to include in NZ-localised content:
- **NZS 3604:** Timber-framed buildings (rafter sizes, stud spacing, birdsmouth limits)
- **E2/AS1:** External moisture - roofing cladding installation
- **NZS 4214:** Methods of determining the total thermal resistance of building elements
- **Building Act 2004:** Consent requirements for re-roofing

---

## Build & Deploy

### Before deploying
1. Run `npm run build` in the quotecore-nz project - must pass
2. Check all new routes return 200
3. Verify hreflang tags render correctly
4. Verify sitemap includes all new routes
5. Verify robots.txt allows crawling of new routes
6. Test the roof takeoff builder calculation end-to-end
7. Test the roofing calculator end-to-end
8. Test PDF generation for quote/PO/invoice generators

### Vercel deployment
- The .co.nz site is a separate Vercel project
- Deploy to preview first, verify, then promote to production
- Ensure environment variables are set on the .co.nz Vercel project:
  - `RESULT_TOKEN_SECRET` (new, for .co.nz)
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `STRIPE_SECRET_KEY` (if pricing shown)
  - `STRIPE_PUBLISHABLE_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_MODE`

### After deploying
1. Submit .co.nz sitemap to Bing Webmaster Tools (Shaun is setting up the account)
2. Submit .co.nz sitemap to Google Search Console
3. Verify hreflang tags are readable by Google's International Targeting report
4. Test with ChatGPT: ask "I need a roof takeoff price in New Zealand, 126m2 plan area, 25 degree pitch" and check if .co.nz appears

---

## Summary: What Gets Ported vs What Stays .com-Only

### Ported to .co.nz (all NZ-localised):
1. Free Tools hub page (`/free-tools`)
2. Roof Takeoff Builder (`/free-roofing-takeoff-builder`) + API routes + result pages
3. Roofing Calculator (`/free-roofing-calculator`)
4. Construction Calculator (`/free-construction-calculator`)
5. Concrete Calculator (`/free-concrete-calculator`)
6. Landscaping Calculator (`/free-landscaping-calculator`)
7. Bird's Mouth Calculator (`/free-birds-mouth-calculator`)
8. Quote Generator (`/free-quote-generator`)
9. Purchase Order Generator (`/free-purchase-order-generator`)
10. Invoice Generator (`/free-invoice-generator`)
11. All 42 SEO slug calculator pages
12. Public API routes (`/api/public/roof-takeoff/*`, `/api/public/suppliers/*`)
13. `llms.txt`
14. Sitemap, robots.txt, hreflang updates

### Stays .com-only (not ported):
- The main app (app.quote-core.com) - auth, quotes, jobs, settings, etc.
- Admin panel
- Blog (already on .com, linked from .co.nz)
- Documentation (already on .com, linked from .co.nz)
- Supplier dashboard
- Component library management

### Shared between both sites:
- Supabase database (same project, same data)
- Stripe account (same account, different price IDs if needed)
- Supplier pricing data (same Supabase tables)
- Calculation engine logic (same code, different domain config)
