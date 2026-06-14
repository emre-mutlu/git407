#!/usr/bin/env node
// ==========================================================================
// lint-deck.mjs — validate presentation decks against DESTE_KILAVUZU
// ==========================================================================
// Decks are ES modules (weeks/weekN.js exports `const weekN = {title,slides}`).
// This imports each deck listed in weeks/manifest.js and checks the slide
// schema (§2), the notes rule (§3) and a subset of the editorial rules (§4)
// deterministically — no browser, no build, no network, no claude.
//
//   lint-deck.mjs                 # lint decks in THIS repo (manifest-driven)
//   lint-deck.mjs ../git423-ders  # lint a sibling site's decks (cross-repo)
//   lint-deck.mjs --strict        # warnings also fail (exit 1) — pre-push gate
//   lint-deck.mjs --quiet         # show errors only
//   lint-deck.mjs --help
//
// exit 0 = no errors (warnings ok) · 1 = errors (or warnings under --strict)
//        · 2 = setup problem (no manifest / not importable)
// ==========================================================================

import { readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// --- args ---
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`lint-deck — deste şema + editoryal denetimi (DESTE_KILAVUZU §2/§3/§4)

  bin/lint-deck.mjs [repo-yolu] [--strict] [--quiet]

  repo-yolu   denetlenecek repo (varsayılan: bu repo). örn: ../git423-ders
  --strict    uyarılar da hata sayılır (exit 1) — push-öncesi kapı
  --quiet     yalnız hataları göster

  exit: 0 temiz · 1 hata (veya --strict'te uyarı) · 2 kurulum sorunu`);
  process.exit(0);
}
const strict  = args.includes('--strict');
const quiet   = args.includes('--quiet');
const repoArg = args.find(a => !a.startsWith('-'));
const REPO  = repoArg ? resolve(repoArg) : resolve(__dirname, '..');
const WEEKS = join(REPO, 'weeks');

const VALID_TYPES = new Set(['hero', 'standard', 'reveal']);
const KEBAB  = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const EMDASH = /—/;
// student-visible string fields; em-dash here is the §4 violation. (notes is
// private presenter prose → not checked, to keep noise down.)
const VISIBLE_FIELDS = ['title', 'subtitle', 'category', 'question', 'html'];
// NOTE: §4 also wants lang="en" on uppercased English chips/traces. Not
// auto-checked: distinguishing English from Turkish text is unreliable and
// false-positives on e.g. `<span class="mg-chip">12 ilke</span>` (Turkish,
// correctly no lang). Stays a manual checklist item (§8) until done right.

// --- collectors ---
let errors = 0, warns = 0;
const lines = [];
const err  = (deck, msg) => { errors++; lines.push({ deck, sev: 'E', msg }); };
const warn = (deck, msg) => { warns++;  lines.push({ deck, sev: 'W', msg }); };

// --- load manifest ---
const manifestPath = join(WEEKS, 'manifest.js');
if (!existsSync(manifestPath)) {
  console.error(`✗ manifest yok: ${manifestPath}\n  (doğru repo mu? örn: bin/lint-deck.mjs ../git423-ders)`);
  process.exit(2);
}
let manifest;
try {
  ({ manifest } = await import(pathToFileURL(manifestPath).href));
} catch (e) {
  console.error(`✗ manifest import edilemedi: ${e.message}`);
  process.exit(2);
}
if (!Array.isArray(manifest)) {
  console.error('✗ manifest bir dizi (array) değil');
  process.exit(2);
}

// --- manifest-level checks ---
const keys = manifest.map(d => d.key);
const defaults = manifest.filter(d => d.default).length;
if (defaults !== 1) warn('manifest', `default: true sayısı ${defaults} (tam 1 olmalı)`);
manifest.forEach((d, i) => {
  if (!d.key)   err('manifest', `entry[${i}] key eksik`);
  if (!d.label) warn('manifest', `entry[${i}] (${d.key || '?'}) label eksik`);
});
const dups = [...new Set(keys.filter((k, i) => k && keys.indexOf(k) !== i))];
if (dups.length) err('manifest', `tekrar eden key: ${dups.join(', ')}`);

// --- orphan deck files (on disk, not in manifest) ---
let files = [];
try {
  files = (await readdir(WEEKS)).filter(f => /^week.*\.js$/.test(f) && f !== 'manifest.js');
} catch { /* weeks/ okunamadı → aşağıda dosya-yok hatası çıkar */ }
for (const f of files) {
  const k = f.replace(/\.js$/, '');
  if (!keys.includes(k)) warn(k, `deste dosyası manifest'te yok (orphan: weeks/${f})`);
}

// --- per-deck slide checks ---
for (const entry of manifest) {
  const key = entry.key;
  if (!key) continue; // already flagged above
  const deckPath = join(WEEKS, `${key}.js`);
  if (!existsSync(deckPath)) { err(key, `manifest'te var ama dosya yok: weeks/${key}.js`); continue; }

  let mod;
  try { mod = await import(pathToFileURL(deckPath).href); }
  catch (e) { err(key, `import edilemedi: ${e.message}`); continue; }

  const deck = mod[key];
  if (!deck) { err(key, `export const ${key} bulunamadı (dosya adı ≠ export adı?)`); continue; }
  if (!deck.title) warn(key, 'deck.title eksik');
  if (!Array.isArray(deck.slides)) { err(key, 'deck.slides bir dizi değil'); continue; }
  if (deck.slides.length === 0) { warn(key, 'deck.slides boş'); continue; }

  const seen = new Map(); // id -> first index
  let noNotes = 0;
  const emDash = [];
  deck.slides.forEach((s, i) => {
    const at = `slayt[${i}]${s.id ? ` #${s.id}` : ''}`;

    // id (zorunlu · benzersiz · kebab)
    if (!s.id) err(key, `${at}: id eksik`);
    else {
      if (seen.has(s.id)) err(key, `${at}: id tekrar (ilk: slayt[${seen.get(s.id)}])`);
      else seen.set(s.id, i);
      if (!KEBAB.test(s.id)) warn(key, `${at}: id kebab-case değil`);
    }

    // title (zorunlu)
    if (!s.title) err(key, `${at}: title eksik`);

    // type + bağlı zorunluluklar
    const type = s.type || 'standard';
    if (s.type && !VALID_TYPES.has(s.type)) err(key, `${at}: geçersiz type "${s.type}"`);
    if (type !== 'hero' && !s.html) err(key, `${at}: html eksik (type=${type})`);
    if (type === 'reveal' && !s.question) err(key, `${at}: reveal ama question yok`);
    if ((type === 'standard' || type === 'reveal') && !s.category)
      warn(key, `${at}: category yok (motor "Konu" varsayar)`);

    // notes (§3) — desteye toplu, satır şişmesin
    if (!s.notes) noNotes++;

    // em-dash (§4) — görünür alanlarda; desteye toplu. prose gövdede ihlal AMA
    // gösterilen kod-yorumunda izinli; linter ikisini ayıramaz → tek satır +
    // "gözden geçir" (per-slayt bağırma = göz ardı edilir).
    if (VISIBLE_FIELDS.some(f => typeof s[f] === 'string' && EMDASH.test(s[f])))
      emDash.push(s.id || `[${i}]`);
  });
  if (noNotes) warn(key, `notes yok: ${noNotes}/${deck.slides.length} slayt (kılavuz §3: baştan yaz)`);
  if (emDash.length) warn(key, `em-dash (—): ${emDash.length} slayt [${emDash.map(x => '#' + x).join(' ')}] — §4, kod-yorumu hariç gözden geçir`);
}

// --- report ---
const SEV = { E: 0, W: 1 };
const shown = lines
  .filter(l => !(quiet && l.sev === 'W'))
  .sort((a, b) => a.deck.localeCompare(b.deck) || SEV[a.sev] - SEV[b.sev]);

let cur = null;
for (const l of shown) {
  if (l.deck !== cur) { console.log(`\n  ${l.deck}`); cur = l.deck; }
  console.log(`    ${l.sev === 'E' ? '✗' : '⚠'} ${l.msg}`);
}

console.log();
if (errors === 0 && warns === 0) {
  console.log(`✓ temiz — ${manifest.length} deste, sorun yok  (${REPO})`);
} else {
  console.log(`${errors ? '✗' : '⚠'} ${manifest.length} deste · ${errors} hata · ${warns} uyarı${quiet ? ' (uyarılar gizli)' : ''}  (${REPO})`);
}

process.exit(errors > 0 || (strict && warns > 0) ? 1 : 0);
