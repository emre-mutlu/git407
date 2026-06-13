/**
 * ==========================================================================
 * DECK MANIFEST — git407 (Hareketli Grafik Tasarımı)
 * ==========================================================================
 *
 * Per-site list of decks. The shared engine (scripts/main.js) reads this to
 * build the week dropdown and pick the default — so the engine stays
 * byte-identical across git407 / git423 and only THIS file differs per site.
 *
 * Add a deck:  drop weeks/weekN.js  +  add one line below.
 *   key      = module name in weeks/ (weekN.js exports `const weekN`)
 *   label    = dropdown text (editorial: number-prefixed, "01 · …")
 *   default  = optional; the deck shown on first load (exactly one)
 *
 * Naming convention: weekN.js === N. hafta. (git423 currently carries a
 * deliberate offset — see DESTE_KILAVUZU.md → "Adlandırma" — to be resolved in
 * the surface-migration step, not here.)
 */

export const manifest = [
    { key: 'week1', label: '01 · Hareketli Grafiğe Giriş', default: true },
    { key: 'week2', label: "02 · After Effects'e Giriş" },
];
