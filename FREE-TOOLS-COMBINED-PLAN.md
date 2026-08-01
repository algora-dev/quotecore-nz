# QuoteCore NZ Free Tools - Combined Build Plan

> **Status:** Draft - pending review
> **Author:** Ron (combined from Gavin's port plan + SEO content plan)
> **Date:** 2026-08-01
> **Goal:** NZ-localised free tools on quote-core.co.nz that rank #1 in NZ search and AI searches

---

## 1. Objective

Build NZ-localised versions of all free tools on quote-core.co.nz so the NZ domain ranks for NZ-specific tool searches. The .co.nz site must NOT redirect users to .com for any free tool. Every page must have NZ-first content that is genuinely different from the .com version to avoid duplicate content penalties.

**Success test:** A fresh AI search for "roofing material price New Zealand 150m2 roof 35 degree pitch" should discover quote-core.co.nz, understand the tool, map the inputs, complete the calculation, return a current NZD price with pricing assumptions explained, and provide a working result URL.

---

## 2. Core Principles

### 2.1 No Duplicate Content
Google and Bing penalise identical content across domains. Every .co.nz page must be genuinely different:
- NZ-first language and examples (Auckland, Wellington, Christchurch, Hamilton, Tauranga)
- NZD pricing defaults (NZ$ not US$/GBP)
- GST 15% (not VAT or US sales tax)
- NZ trade terminology (spouting not gutter, long-run not corrugated iron, CLR not gable)
- NZ building code references (E2/AS1, NZS 3604, NZS 4214)
- NZ supplier names and context
- Different title tags, meta descriptions, H1s
- hreflang tags declaring en-NZ for .co.nz and en-US/x-default for .com
- Different internal linking structure (links to .co.nz pages, not .com)

### 2.2 Result First, Conversion After
Do NOT force a lead form before showing the result. Show the price/result first, then offer:
- Request a better price
- Send the completed takeoff to a supplier
- Email the result
- Ask about delivery
- Request trade pricing

### 2.3 AI and Search Readiness
- The calculator result must be readable without client-side JavaScript (server-rendered result pages)
- Keep the most important content server-rendered
- Include clear machine-readable data: what the tool does, who it's for, which country, currency, whether pricing is current, what measurements are accepted, what the output includes
- Link to calculator schema, API documentation, GET calculation workflow, MCP documentation, AI usage instructions

### 2.4 Calculation Engine: Port As-Is, Localise Content Only
The calculation logic (engine.ts, calc.ts, types.ts, public-contract.ts) ports as-is with zero changes. Only content, metadata, examples, and UI text get NZ-localised. No business logic duplication.

### 2.5 Canonical URLs
Every .co.nz page must have a self-referencing canonical tag pointing to its own .co.nz URL (e.g. `https://www.quote-core.co.nz/free-roofing-takeoff-builder`). Without this, Google may treat .co.nz pages as duplicates of .com even with hreflang tags. Never point .co.nz canonicals to .com.

### 2.6 Core Web Vitals Targets
All pages must meet:
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
Use `next/dynamic` for heavy client components (ResultsModal, ComponentGuideBox, calculator tabs) to keep initial JS bundles small. The 42 slug pages share one calculator engine - ensure code splitting so each page doesn't ship the entire component tree.

### 2.7 OG/Social Meta Tags
Every page needs NZ-specific Open Graph and Twitter Card tags:
- `og:url` pointing to .co.nz URL
- `og:title` and `og:description` NZ-localised
- `og:image` - create a .co.nz-branded OG image (1200x630, NZ-focused)
- `twitter:card` = summary_large_image

### 2.8 Drift Management
When .com calculation engine files are updated, the same changes must be applied to .co.nz. Approach: a sync checklist document (`docs/NZ_SYNC_CHECKLIST.md`) listing every ported file with its .com source path. After any .com update to these files, run a diff and apply changes to .co.nz. Review during each /debrief.

---

## 3. NZ Localisation Reference

### 3.1 Trade Terminology

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

### 3.2 Building Code References
- **NZS 3604:** Timber-framed buildings (rafter sizes, stud spacing, birdsmouth limits)
- **E2/AS1:** External moisture - roofing cladding installation
- **NZS 4214:** Methods of determining total thermal resistance of building elements
- **Building Act 2004:** Consent requirements for re-roofing

### 3.3 Common NZ Roof Pitches
15deg, 22.5deg, 30deg, 45deg

### 3.4 NZ Standard Material Sizes
- Timber framing: 90x45, 140x45, 190x45
- Stud spacing: 600mm or 400mm centres (NZS 3604)
- Standard ceiling height: 2.4m
- Concrete: 20MPa, 25MPa, 30MPa standard grades
- Residential slab: 100mm

### 3.5 NZ Bank Account Format
XX-XXXX-XXXXXXX-XX

### 3.6 NZ Payment Terms
7 days, 14 days, 20th of following month

---

## 4. NZ Localisation Checklist (Apply to EVERY Page)

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
- [ ] Self-referencing canonical tag pointing to .co.nz URL
- [ ] hreflang tags present (en-NZ for .co.nz, en-US/x-default for .com)
- [ ] OG/social tags with .co.nz URLs and NZ-branded OG image
- [ ] JSON-LD structured data uses .co.nz URLs
- [ ] Page is in .co.nz sitemap
- [ ] robots.txt allows crawling
- [ ] No content copied verbatim from .com
- [ ] Calculator visible near the top of the page
- [ ] Complete priced example is crawlable (visible in HTML, not JS-only)
- [ ] Pricing assumptions transparent (currency, GST, source, validity, exclusions)
- [ ] Result appears before any lead form or signup CTA

---

## 5. Content Requirements (Per Tool)

### 5.1 Value Proposition Block
Every tool page must clearly communicate:
- What the tool does
- Who it's for (NZ trades/roofers/builders)
- Which country (New Zealand)
- Which currency (NZD)
- That results are instant (no waiting for a supplier response)
- That a shareable result URL is generated

### 5.2 Pricing Trust Block (for pricing-related tools)
Display clearly:
- Currency: NZD
- GST treatment: GST inclusive or exclusive
- Pricing source: where prices come from
- Products used: what materials/pricing are based on
- Pricing last updated: date
- Price validity: how long prices are current
- Delivery assumptions: what delivery costs assume
- Exclusions: what's NOT included
- Whether the result is indicative or firm

### 5.3 Complete Worked Example
Each calculator page must include one crawlable NZ example containing:
- Roof area (or relevant measurements)
- Pitch
- Hips, valleys, ridges, barges, gutters (for roofing tools)
- Product assumptions
- Calculated quantities
- Final NZD price
- GST status
- Pricing update date
- Working result link (a real URL that loads the calculated result)

### 5.4 Inclusions and Exclusions
State exactly what the price includes and excludes.

**Possible inclusions:** roofing sheets, underlay, fasteners, flashings, hips and ridges, barges, valleys, spouting, waste, GST

**Possible exclusions:** labour, scaffolding, removal of old roofing, structural repairs, site-specific freight, custom fabrication

### 5.5 Conversion Section (After Result)
Show the result first, then offer:
- Request a better price
- Send the completed takeoff to a supplier
- Email the result
- Ask about delivery
- Request trade pricing
- Try QuoteCore+ free trial (links to /free-trial on .co.nz)

### 5.6 Supporting Topic Cluster
Create supporting pages that answer distinct questions and link naturally to the calculator:
- `/how-to-calculate-roof-materials`
- `/roofing-material-prices-new-zealand`
- `/roof-pitch-and-area-calculator`
- `/roof-takeoff-example-new-zealand`
- `/about-our-pricing`

Each page answers a distinct question, links to the calculator, and avoids near-identical location/keyword pages.

### 5.7 Structured Data
Ensure pages include accurate, visible structured data for:
- Organization
- SoftwareApplication
- LocalBusiness (where applicable)
- Product (where real products and pricing are shown)
- FAQPage (NZ-specific FAQs)

Do NOT add structured data that isn't visible on the page.

### 5.8 Authority and Trust Signals
- Real business details
- Contact information
- Product and pricing provenance
- Worked examples
- Demo video (where available)
- Usage explanation
- Supplier or partner references
- Clear pricing update dates
- Transparent limitations

---

## 6. Internal Linking Strategy

Link to the tools from:
- Homepage
- Main navigation
- Free Tools section
- Roofing software page
- Relevant articles
- Documentation
- Footer
- .com website (cross-domain links with hreflang)
- Worked examples

Use descriptive anchor text:
- "New Zealand roof price calculator"
- "Free roof material calculator"
- "Instant roofing material estimate"
- "Roof takeoff calculator NZ"

---

## 7. Build Phases

### Phase 1: Free Tools Hub Page (`/free-tools`)

**What:** Create `app/free-tools/page.tsx` and `app/free-tools/layout.tsx` in quotecore-nz.

**NZ content:**
- H1: "Free Tools for Kiwi Trades"
- NZ-focused page description
- Every tool description rewritten with NZ context
- "Why are these free?" section - mention "built for Kiwi trades"
- CTA links to /free-trial (not /signup)
- Use .co.nz SiteFooter, not .com BlogHeader

**Technical:**
- Use .co.nz NzHeader and SiteFooter components
- Use .co.nz nzMarket config
- Add to .co.nz sitemap
- hreflang tags pointing to .com equivalent
- JSON-LD: WebApplication schema with NZ domain

**Tool directory:** List all tools. Tools self-hosted on .co.nz link locally. If any aren't ported yet, link to .com with target="_blank" and "opens in new tab" indicator.

### Phase 3: Roof Takeoff Builder (`/free-roofing-takeoff-builder`)

**Highest-value tool for NZ search. Port fully.**

**Depends on:** Phase 2 (shared components) must be done first.

**Files to port from .com** (`app/(public)/free-roofing-takeoff-builder/`):
- `engine.ts` - as-is
- `public-contract.ts` - as-is
- `public-contract.test.ts` - as-is
- `calc.ts` - as-is
- `types.ts` - as-is
- `result-token.ts` - as-is (use .co.nz-specific secret env var)
- `result-token.test.ts` - as-is
- `schema.ts` - port and NZ-localise descriptions/examples
- `helpers.tsx` - port and adapt to .co.nz styling
- `ComponentGuideBox.tsx` - port and NZ-localise text
- `EntryComponents.tsx` - port and NZ-localise
- `RoofTakeoffBuilder.tsx` - port and NZ-localise
- `ResultsModal.tsx` - port and NZ-localise
- `layout.tsx` - rewrite with NZ-specific meta, JSON-LD, FAQ
- `page.tsx` - rewrite with NZ-specific content
- `calculate/page.tsx` - port, update URLs to .co.nz
- `result/[id]/page.tsx` - port, update URLs to .co.nz

**API routes to port** (`app/api/public/roof-takeoff/`):
- `calculate/route.ts` - update CORS/origin refs to .co.nz
- `schema/route.ts` - update URLs to .co.nz
- `openapi/route.ts` - update server URL to .co.nz

**Supplier search** (`app/api/public/suppliers/`):
- `search/route.ts` - port as-is (shared database)

**NZ localisation:**
- SITE_URL: https://www.quote-core.co.nz
- Default currency: NZD
- Examples: "126m2 Auckland roof, 25 degree pitch, four 5m hips..."
- NZ roof types: long-run, corrugated, tile, shingle
- FAQ: "How do I calculate roof area for a NZ long-run roof?", "What pitch factors apply to NZ roofing?", "How does this work with NZ spouting sizes?"
- Meta title: "Free Roof Takeoff Calculator NZ | QuoteCore+"
- JSON-LD: WebApplication with .co.nz URL, NZD pricing
- hreflang: en-NZ for .co.nz, en-US/x-default for .com

**Content (from SEO plan):**
- Value proposition block
- Pricing trust block (NZD, GST treatment, pricing source, validity, exclusions)
- Complete worked example with real NZ numbers and a working result URL
- Inclusions/exclusions list
- Conversion section after result
- Authority signals

### Phase 3: Roofing Calculator + Roof Price Calculator

**Port the shared calculator engine + roofing config.**

**Primary URL strategy:** The SEO plan identifies "price" as the primary search intent. Create `/roof-price-calculator` as the primary NZ landing page targeting price-intent searches, with the roofing calculator embedded. Keep `/free-roofing-calculator` as a secondary URL (for consistency with .com) that also serves the calculator. Both share the same engine.

**`/roof-price-calculator` page (NZ primary):**
- Title: "Roof Price Calculator New Zealand - Instant Roofing Material Estimate"
- H1: "Free New Zealand Roof Price and Material Calculator"
- Opening copy: NZ-focused, mentions NZD, instant results, roof measurement and takeoff capability
- Calculator visible near the top
- Complete worked example with real NZ numbers and working result URL
- Pricing trust block (currency, GST, source, validity, exclusions)
- Inclusions/exclusions list
- Conversion section after result

**`/free-roofing-calculator` page (secondary):**
- Standard calculator page, NZ-localised meta and content
- Links to `/roof-price-calculator` as the primary price-intent page

**Files to port from .com** (`app/(public)/free-calculators/`):
- `_shared/` - ALL files (TradeCalculator.tsx, TradeLayoutShell.tsx, TradePage.tsx, types.ts, all tab components, CalcResultPopup.tsx, CalculatorHubClient.tsx, AngleDiagram.tsx)
- `configs/` - ALL config files (roofing.ts, concrete.ts, construction.ts, landscaping.ts, registry.ts, all slug registries)

**Files to port from .com** (`app/(public)/free-roofing-calculator/`):
- Route files - port and NZ-localise content

**NZ localisation:**
- Default currency: NZD
- NZ calculator tabs: NZ batten spacing (NZS 3604), NZ pitch ratios (15deg, 22.5deg, 30deg, 45deg), long-run sheet coverage
- Examples: NZ roof dimensions, NZ material names
- FAQ: NZ-specific roofing questions
- Meta: "Free Roofing Calculator NZ | QuoteCore+"
- hreflang: en-NZ for .co.nz

**The 42 SEO slug pages:** Port ALL. Each needs:
- NZ-localised meta title/description
- NZ examples in the calculator config
- NZ-focused FAQ content
- hreflang tags
- Self-referencing canonical
- Sitemap entry
- A complete crawlable worked example with real NZ numbers and a working result URL (not just the main calculator pages - every slug page gets its own example)
- Config-driven so localisation is in metadata/examples, not calculation logic

**Server-rendered results:** The calculator must produce a GET-based result URL (like the takeoff builder's `result/[id]` route) so that calculation results are crawlable without JavaScript. The client-side calculator interaction is progressive enhancement on top of the server-rendered result page.

**Supporting topic cluster pages:**
- `/how-to-calculate-roof-materials`
- `/roofing-material-prices-new-zealand`
- `/roof-pitch-and-area-calculator`
- `/roof-takeoff-example-new-zealand`
- `/about-our-pricing`

### Phase 4: Construction Calculator (`/free-construction-calculator`)
- NZ timber sizes (90x45, 140x45, 190x45)
- NZ stud spacing (600mm/400mm per NZS 3604)
- NZ wall heights (2.4m standard)
- NZD pricing
- Meta: "Free Construction Calculator NZ | QuoteCore+"

### Phase 5: Concrete Calculator (`/free-concrete-calculator`)
- NZ concrete grades (20MPa, 25MPa, 30MPa)
- NZ ready-mix pricing in NZD per m3
- NZ footing dimensions per NZS 3604
- NZ slab thickness (100mm residential)
- Meta: "Free Concrete Calculator NZ | QuoteCore+"

### Phase 6: Landscaping Calculator (`/free-landscaping-calculator`)
- NZ plant spacing
- NZ turf varieties (fescue, rye, kikuyu)
- NZ topsoil pricing in NZD
- Meta: "Free Landscaping Calculator NZ | QuoteCore+"

### Phase 7: Bird's Mouth Calculator (`/free-birds-mouth-calculator`)
- NZ rafter sizes (90x45, 140x45, 190x45)
- NZ building code references (NZS 3604 birdsmouth cut limits)
- NZ pitch ratios
- Meta: "Free Bird's Mouth Calculator NZ | QuoteCore+"

### Phase 8: Quote Generator (`/free-quote-generator`)
- Default tax: GST 15%
- Default currency: NZD
- Business details template: NZ format (address, GST number, company number)
- Default T&Cs: NZ construction terms
- Examples: NZ trade business names, NZ cities
- Meta: "Free Quote Generator NZ | QuoteCore+"
- FAQ: GST handling, provisional sums, etc.
- Dependencies: jsPDF, html2canvas

### Phase 9: Purchase Order Generator (`/free-purchase-order-generator`)
- Default currency: NZD
- Supplier details: NZ format
- Delivery terms: NZ standard
- Examples: NZ suppliers (Bunnings NZ, Mitre 10, ITM, Placemakers)
- Meta: "Free Purchase Order Generator NZ | QuoteCore+"

### Phase 10: Invoice Generator (`/free-invoice-generator`)
- Default tax: GST 15%
- Default currency: NZD
- Bank details: NZ format (XX-XXXX-XXXXXXX-XX)
- Invoice number: NZ-style
- Payment terms: 7 days, 14 days, 20th of following month
- Meta: "Free Invoice Generator NZ | QuoteCore+"

### Phase 2: Shared Components (do this before takeoff builder)

Port from .com `app/(public)/_components/`:
- FreeToolsAuthProvider.tsx
- FreeToolsAuthButton.tsx
- FreeToolsAuthCard.tsx
- FreeToolsSignupBanner.tsx
- FreeToolsHeader.tsx
- useFreeToolsEmail.ts

Adapt for .co.nz: "sign up" CTAs link to .co.nz /free-trial, not .com /signup. Tools work without auth (same as .com).

### Phase 12: API Routes
Create on .co.nz:
- `app/api/public/roof-takeoff/calculate/route.ts`
- `app/api/public/roof-takeoff/schema/route.ts`
- `app/api/public/roof-takeoff/openapi/route.ts`
- `app/api/public/suppliers/search/route.ts`

Update all URLs to www.quote-core.co.nz, CORS for .co.nz origin, same Supabase connection.

### Phase 13: llms.txt + llms-full.txt
Create `public/llms.txt` on .co.nz with:
- .co.nz URLs for all endpoints
- NZ-focused description
- Same calculation engine, different domain

Also check if .com has a `llms-full.txt` - if so, create a .co.nz equivalent with .co.nz URLs.

### Phase 14: Sitemap Update
Update `app/sitemap.ts` on .co.nz to include ALL new routes:
```
/free-tools
/free-roofing-takeoff-builder
/free-roofing-takeoff-builder/calculate
/free-roofing-calculator
/free-construction-calculator
/free-concrete-calculator
/free-landscaping-calculator
/free-birds-mouth-calculator
/free-quote-generator
/free-purchase-order-generator
/free-invoice-generator
/roof-price-calculator
+ all 42 SEO slug calculator pages
+ supporting topic cluster pages:
  /how-to-calculate-roof-materials
  /roofing-material-prices-new-zealand
  /roof-pitch-and-area-calculator
  /roof-takeoff-example-new-zealand
  /about-our-pricing
```

### Phase 15: hreflang + Canonical Tags
- .co.nz `lib/hreflang.ts`: add all new free tools paths to shared equivalent paths
- .com `lib/seo/hreflang.ts` (or equivalent): add same paths
- Both files must stay in sync
- Every .co.nz page has a self-referencing canonical pointing to its .co.nz URL
- Never point .co.nz canonicals to .com
- `/roof-price-calculator` has no .com equivalent, so no hreflang pair needed (or point x-default to /free-roofing-calculator on .com)

### Phase 16: Navigation Update
- .co.nz header (`lib/nz.ts` nzNav): add "Free Tools" -> /free-tools
- .co.nz footer: add link to /free-tools
- Remove any redirect from /free-tools to .com

### Phase 17: robots.txt Update
Update `app/robots.ts` on .co.nz to allow crawling of all free tool routes and /api/public/.

---

## 8. Dependency Checklist

Before starting, ensure .co.nz package.json has:
- `jspdf` - PDF generation
- `html2canvas` - HTML-to-canvas for PDF rendering
- `@supabase/supabase-js` - already present (confirm)
- Any UI libraries used by calculator components

### NZ-specific assets to create:
- NZ-branded OG image (1200x630, .co.nz branding, NZ-focused)
- Add to `public/og-image-nz.png` and reference in OG tags

### Environment Variables (Vercel .co.nz project)
- `RESULT_TOKEN_SECRET` - new, for .co.nz result token signing
- `SUPABASE_URL` - same Supabase project (shared)
- `SUPABASE_SERVICE_ROLE_KEY` - same key
- `STRIPE_SECRET_KEY` - if pricing shown
- `STRIPE_PUBLISHABLE_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_MODE`

---

## 8.5 Error States and Edge Cases

Every tool must define behaviour for these scenarios:

| Scenario | Behaviour |
|----------|----------|
| Supabase unreachable | Calculator still works with default components (DEFAULT_COMPONENTS fallback in calc.ts). Supplier search shows "try again later" message. |
| Supplier search returns empty | Show "no suppliers found in your area" with a link to request a supplier. Do not show a broken empty state. |
| Result token verification fails | Show "this result link is invalid or expired" with a link to recalculate. Never show partial or corrupt data. |
| API rate limits hit | Return 429 with Retry-After header. Client shows "too many calculations, try again in X seconds". |
| Invalid input values | Return 400 with field-level validation errors. Client highlights invalid fields. |
| Network timeout | 30s timeout on API calls. Show "calculation timed out, try again" with a retry button. |

---

## 9. Build & Deploy

### Before deploying
1. `npm run build` in quotecore-nz - must pass
2. All new routes return 200
3. hreflang tags render correctly
4. Self-referencing canonical tags present on all pages
5. Sitemap includes all new routes
6. robots.txt allows crawling
7. Roof takeoff builder calculation works end-to-end
8. Roofing calculator works end-to-end
9. PDF generation works for quote/PO/invoice generators
10. Complete worked example is visible in page source (not JS-only)
11. Result URL works when copied/shared
12. OG image renders correctly when sharing .co.nz URLs
13. Lighthouse: Performance 90+, Accessibility 90+, SEO 95+, Best Practices 90+
14. Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
15. Error states handled (Supabase down, empty results, invalid tokens, rate limits)

### Vercel deployment
- .co.nz is a separate Vercel project
- Deploy to preview first, verify, then promote to production
- Ensure env vars are set on .co.nz Vercel project

### After deploying
1. Submit .co.nz sitemap to Google Search Console (already done - Aug 1 2026)
2. Submit .co.nz sitemap to Bing Webmaster Tools
3. Verify hreflang tags in Google's International Targeting report
4. Test with ChatGPT: "I need a roof takeoff price in New Zealand, 126m2 plan area, 25 degree pitch"
5. Test with Google: "roof price calculator NZ"
6. Run Lighthouse on all new pages

---

## 10. What Gets Ported vs What Stays .com-Only

### Ported to .co.nz (all NZ-localised):
1. Free Tools hub page
2. Roof Takeoff Builder + API routes + result pages
3. Roofing Calculator
4. Construction Calculator
5. Concrete Calculator
6. Landscaping Calculator
7. Bird's Mouth Calculator
8. Quote Generator
9. Purchase Order Generator
10. Invoice Generator
11. All 42 SEO slug calculator pages
12. Public API routes
13. llms.txt
14. Supporting topic cluster pages
15. Sitemap, robots.txt, hreflang updates

### Stays .com-only (not ported):
- The main app (auth, quotes, jobs, settings, admin)
- Blog
- Documentation
- Supplier dashboard
- Component library management

### Shared between both sites:
- Supabase database (same project, same data)
- Stripe account
- Supplier pricing data
- Calculation engine logic (same code, different domain config)

---

## 11. Final Quality Check

Before launch, confirm:
- Title targets NZ price intent
- H1 clearly states New Zealand relevance
- Opening paragraph matches how Kiwis ask for roof pricing
- Calculator appears near the top
- A complete priced example is visible in HTML source
- Pricing assumptions are transparent
- Result appears instantly
- Result URL works when copied
- Page is unique from .com version
- Internal links are in place
- Supporting pages link back to calculator
- Page works without JavaScript for key content and results
- No thin, duplicated, or keyword-stuffed content
- All NZ localisation checklist items pass

---

## 12. Success Test

A fresh AI search should be able to answer:

> "I need an estimated roofing material price in New Zealand for a 150m2 roof at 35 degrees, with four 4m hips, two 3m valleys, two 2.5m barges and one 5m ridge."

Ideal outcome:
1. QuoteCore NZ is discovered
2. The tool is understood
3. The inputs are mapped correctly
4. The calculation is completed
5. A current NZD price is returned
6. Pricing assumptions are explained
7. A working result URL is provided
