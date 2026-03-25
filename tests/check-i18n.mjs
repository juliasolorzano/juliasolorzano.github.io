import { readFileSync } from 'fs';
import { parse } from 'smol-toml';

const en = parse(readFileSync('i18n/en.toml', 'utf-8'));
const es = parse(readFileSync('i18n/es.toml', 'utf-8'));

const enKeys = new Set(Object.keys(en));
const esKeys = new Set(Object.keys(es));

let failed = false;

// Keys in EN but missing from ES
const missingInEs = [...enKeys].filter(k => !esKeys.has(k));
if (missingInEs.length > 0) {
  console.error('Keys in en.toml missing from es.toml:', missingInEs);
  failed = true;
}

// Keys in ES but missing from EN
const missingInEn = [...esKeys].filter(k => !enKeys.has(k));
if (missingInEn.length > 0) {
  console.error('Keys in es.toml missing from en.toml:', missingInEn);
  failed = true;
}

// Check for empty "other" values
for (const [key, val] of Object.entries(en)) {
  if (!val.other || val.other.trim() === '') {
    console.error(`en.toml: "${key}" has an empty "other" value`);
    failed = true;
  }
}
for (const [key, val] of Object.entries(es)) {
  if (!val.other || val.other.trim() === '') {
    console.error(`es.toml: "${key}" has an empty "other" value`);
    failed = true;
  }
}

if (failed) {
  process.exit(1);
} else {
  console.log(`i18n parity check passed (${enKeys.size} keys in each file)`);
}
