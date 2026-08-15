// NZ site: scan all pages for mixed section/container widths.
const fs = require("fs");
const path = require("path");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name === "page.tsx") out.push(full);
  }
  return out;
}

for (const page of walk("app")) {
  const src = fs.readFileSync(page, "utf8");
  const widths = new Set();
  for (const m of src.matchAll(/<section[^>]*max-w-(\S+?)(?=["\s])/g)) widths.add(m[1]);
  for (const m of src.matchAll(/<div[^>]*mx-auto[^>]*max-w-(\S+?)(?=["\s])/g)) widths.add(m[1]);
  if (widths.size > 1) {
    console.log(`MIXED ${[...widths].sort().join("+").padEnd(18)} ${page.replace(/\\/g, "/")}`);
  }
}
console.log("scan complete");
