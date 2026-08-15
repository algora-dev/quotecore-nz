// NZ width normalization — mirror of the .com pass.
const fs = require("fs");

function replaceSections(file, from, to) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let n = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("<section") && lines[i].includes(`max-w-${from}`)) {
      lines[i] = lines[i].replaceAll(`max-w-${from}`, `max-w-${to}`);
      n++;
    }
  }
  fs.writeFileSync(file, lines.join("\n"));
  console.log(`${file}: ${n} sections ${from}->${to}`);
}

function replaceExact(file, pairs) {
  let src = fs.readFileSync(file, "utf8");
  let n = 0;
  for (const [from, to] of pairs) {
    while (src.includes(from)) {
      src = src.replace(from, to);
      n++;
    }
  }
  fs.writeFileSync(file, src);
  console.log(`${file}: ${n} container replacements`);
}

const featurePages = [
  "app/features/page.tsx",
  "app/features/ai-scan-assist/page.tsx",
  "app/features/digital-roof-takeoff/page.tsx",
  "app/features/invoicing/page.tsx",
  "app/features/material-ordering/page.tsx",
  "app/features/sending-and-tracking/page.tsx",
  "app/features/smart-components/page.tsx",
  "app/features/supplier-resources/page.tsx",
  "app/free-tools/page.tsx",
  "app/roof-cost-calculator-nz/page.tsx",
];

// 1. Sections 3xl -> 5xl on feature-family pages
for (const f of featurePages) replaceSections(f, "3xl", "5xl");

// 2. Hero / CTA inner containers -> 5xl, left-aligned
for (const f of featurePages) {
  replaceExact(f, [
    ['<div className="relative mx-auto max-w-3xl px-6 lg:px-8">', '<div className="relative mx-auto max-w-5xl px-6 lg:px-8">'],
    ['<div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">', '<div className="relative mx-auto max-w-5xl px-6 lg:px-8">'],
    ['<div className="mx-auto max-w-3xl px-6 text-center lg:px-8">', '<div className="mx-auto max-w-5xl px-6 lg:px-8">'],
    ['<div className="mx-auto max-w-3xl px-6 lg:px-8">', '<div className="mx-auto max-w-5xl px-6 lg:px-8">'],
  ]);
}

// 3. Long-form SEO pages: stray 3xl sections -> 4xl family
replaceSections("app/construction-quoting-software/page.tsx", "3xl", "4xl");
replaceSections("app/roofing-quoting-software/page.tsx", "3xl", "4xl");

// 4. Pricing: FAQ/Related 4xl -> 7xl family
replaceSections("app/pricing/page.tsx", "4xl", "7xl");

// 5. Report remaining container-level 3xl/4xl on feature pages (should be none)
console.log("\nremaining container outliers:");
for (const f of featurePages) {
  const src = fs.readFileSync(f, "utf8");
  src.split("\n").forEach((l, i) => {
    if (/<(section|div)[^>]*mx-auto[^>]*max-w-3xl/.test(l)) console.log(`  ${f}:${i + 1} ${l.trim().slice(0, 90)}`);
  });
}
console.log("done");
