# Week 3 Graph Editor + MotionDemo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build the W3 "Graph Editor" deck (~27 interactive slides) plus a reusable `MotionDemo` engine component, live in git407 and synced to git423.

**Architecture:** Two phases. **Phase 1** adds a `MotionDemo` class to the shared engine (`scripts/main.js`), hydrating `[data-motion-demo]` elements during `renderSlides()` (mirrors `Lightbox`) — modes `playground` (draggable cubic-bezier + animated dot) and `race` (N easings side-by-side). **Phase 2** authors `weeks/week3.js` per `week3.plan.md` + `DESTE_KILAVUZU.md`, using `reveal` slides, external media, and `[data-motion-demo]` instances.

**Tech Stack:** Build-less ES modules · vanilla JS + SVG/CSS · no bundler, no test runner.

**Verification (this project's "tests" — no pytest):** `node bin/lint-deck.mjs` (schema/notes/em-dash gate) · headless Chrome probe (console-clean, renders; `_capture.html` deseni, 3 çözünürlük) · `bin/screenshot.sh week3` (kontak föy) · `python3 -m http.server 4173` yerel fit. Each task ends with the relevant gate.

---

## File structure
- **Modify** `scripts/main.js` — add `MotionDemo` class (after `Lightbox`, ~L501); hydrate call in `renderSlides()` after the `onRender` block (~L269); bump `ENGINE_VERSION` (L12 `'1.1.0'`→`'1.2.0'`).
- **Modify** `index.html` (git407) — `main.js?v=` cache-bust → `1.2.0`.
- **Modify** `styles/main.css` — `.motion-demo`, `.md-curve`, `.md-handle`, `.md-dot`, `.md-race` (Motion Studio paleti; `oklch` accent, `.mg-bezier` ile uyum).
- **Create** `weeks/week3.js` — deck (~27 slides; `export const week3 = { title, slides:[] }`).
- **Modify** `weeks/manifest.js` — append `{ key: 'week3', label: '03 · Graph Editor' }`.
- **Cross-repo** `bin/sync-engine.sh` → git423-ders `scripts/main.js` + git423 `index.html` `?v=`.
- **Reference (read, don't edit):** `weeks/week3.plan.md` (spec), `DESTE_KILAVUZU.md` (recipe §2 şema, §4 editöryal, §9 motor), `weeks/week2.js` (`.ae-demo`/`.ae-menu`/`.cheat-*` örnekleri), `weeks/week1.js` (`.mg-bezier` SVG).

---

## Phase 1 — `MotionDemo` engine component

### Task 1: MotionDemo class + hydration + version bump

**Files:** Modify `scripts/main.js`, `styles/main.css`

- [ ] **Step 1 — Add `MotionDemo` class** after `Lightbox` (before `DOMContentLoaded`, ~L501). Skeleton + shared cubic-bezier evaluator:

```js
// ==========================================================================
// MOTION DEMO — interactive easing widgets (declarative: [data-motion-demo])
// playground = draggable bezier + dot · race = N easings side-by-side
// ==========================================================================
class MotionDemo {
    constructor(el) {
        this.el = el;
        this.mode = el.dataset.motionDemo || 'playground';
        // bezier presets used by both modes (P1x,P1y,P2x,P2y in 0..1, y may exceed for overshoot)
        this.presets = {
            linear:    [0, 0, 1, 1],
            ease:      [0.25, 0.1, 0.25, 1],
            overshoot: [0.34, 1.56, 0.64, 1],
        };
        this.duration = parseInt(el.dataset.duration || '1100', 10);
        if (this.mode === 'race') this._buildRace(); else this._buildPlayground();
    }

    // cubic-bezier(t) → eased progress. Newton-free: sample param via x, return y.
    static bezierY(p, t) {
        const [x1, y1, x2, y2] = p;
        // solve for parametric u where Bx(u)=t (bisection, 18 iters = plenty)
        let lo = 0, hi = 1, u = t;
        const bx = (u) => 3*(1-u)*(1-u)*u*x1 + 3*(1-u)*u*u*x2 + u*u*u;
        for (let i = 0; i < 18; i++) { u = (lo+hi)/2; (bx(u) < t) ? lo = u : hi = u; }
        return 3*(1-u)*(1-u)*u*y1 + 3*(1-u)*u*u*y2 + u*u*u;
    }

    _buildPlayground() { /* SVG curve + 2 draggable handles + dot + ▶ replay; drag → recompute curve + dot path. See Task 2. */ }
    _buildRace()       { /* N rows, one dot each; ▶ runs all simultaneously via bezierY. See Task 3. */ }
}
```

- [ ] **Step 2 — Hydrate in `renderSlides()`** inside the `forEach`, immediately after the `onRender` block (`scripts/main.js` ~L269, before the closing `});`):

```js
            // Hydrate interactive motion demos in this slide.
            slideEl.querySelectorAll('[data-motion-demo]').forEach((el) => {
                try { new MotionDemo(el); }
                catch (err) { console.error(`MotionDemo init [${slideData.id}]:`, err); }
            });
```

- [ ] **Step 3 — Bump `ENGINE_VERSION`** `scripts/main.js` L12: `'1.1.0'` → `'1.2.0'`. Update `index.html` `<script ... src="scripts/main.js?v=1.1.0">` → `?v=1.2.0`.

- [ ] **Step 4 — Headless verify (git407):** start `python3 -m http.server 4173`; headless Chrome load a probe with `<div data-motion-demo="race" data-easings="linear,ease,overshoot"></div>` + `<div data-motion-demo="playground"></div>`. Expect: console shows `Sunum motoru v1.2.0`, **no errors**, both `.motion-demo` roots present in DOM. (Use the `_capture.html` headless pattern.)

- [ ] **Step 5 — Commit** (git407 only):
```bash
git add scripts/main.js styles/main.css index.html
git commit -m "engine: MotionDemo widget skeleton + hydration (v1.2.0)"
```

### Task 2: `playground` mode (draggable bezier + animated dot)

**Files:** Modify `scripts/main.js` (`_buildPlayground`), `styles/main.css`

- [ ] **Step 1 — Implement `_buildPlayground`:** render an SVG (≈320×320 unit box) with: the bezier curve `path` from current control points; two draggable `circle.md-handle` at P1/P2 (pointer events update points, redraw path, clamp x∈[0,1], y free for overshoot); a `circle.md-dot` that, on ▶ click, animates left→right over `duration` using `MotionDemo.bezierY(points, tNorm)` for its vertical position (so the dot literally traces the eased motion). Show live `cubic-bezier(...)` numbers.
- [ ] **Step 2 — Style** `.md-curve`/`.md-handle`/`.md-dot` (Motion Studio accent, grab cursor on handles).
- [ ] **Step 3 — Headless verify:** probe slide; assert SVG path present, two handles present; simulate a handle drag (set pointer) → path `d` attribute changes; console clean.
- [ ] **Step 4 — Commit:** `git commit -m "engine: MotionDemo playground (drag bezier + dot)"`

### Task 3: `race` mode (N easings simultaneous)

**Files:** Modify `scripts/main.js` (`_buildRace`), `styles/main.css`

- [ ] **Step 1 — Implement `_buildRace`:** read `data-easings` (comma list of preset names) → one labelled row each with a `.md-dot`; a single ▶ runs all dots left→right simultaneously, each positioned by `MotionDemo.bezierY(preset, t)` over `duration` via `requestAnimationFrame`; a faint per-row track. Re-run on click.
- [ ] **Step 2 — Style** `.md-race` rows + labels.
- [ ] **Step 3 — Headless verify:** probe with `data-easings="linear,ease,overshoot"` → 3 rows + 3 dots present; click ▶ → dots' `transform` changes within 1 frame; console clean.
- [ ] **Step 4 — Commit:** `git commit -m "engine: MotionDemo race (N easings side-by-side)"`

### Task 4: Cross-repo sync + parity (reçete §9)

**Files:** git423-ders `scripts/main.js`, git423 `index.html`

- [ ] **Step 1 — Distribute:** run `bin/sync-engine.sh` (git407 → git423-ders). Update git423 `index.html` `main.js?v=` → `1.2.0`.
- [ ] **Step 2 — Parity verify (git423):** headless load an EXISTING git423 deck → console `v1.2.0`, **eski desteler bozulmadı** (slaytlar fit, reveal/lightbox çalışır), no new errors. Confirm `[data-motion-demo]` hydration is inert when absent.
- [ ] **Step 3 — Commit BOTH repos separately** (push = canlı; iki ayrı commit):
```bash
# git407
git -C <git407> commit -am "engine: bump v1.2.0 (MotionDemo) — synced"
# git423-ders
git -C <git423> commit -am "engine sync: MotionDemo v1.2.0 (git407 kanonik)"
```
(Push'u Faz 2 sonunda deste hazır olunca, birlikte — yarım iş canlıya gitmesin.)

---

## Phase 2 — `weeks/week3.js` deck

> Her görev: ilgili slaytları **reçeteye göre** yaz (id/title/type/teaching-point/component/notes verildi) → `node bin/lint-deck.mjs` 0-hata → commit. Tam Türkçe gövde-prose yazımda üretilir (dil/ton **hitapsız-passive**, terim **EN-önce**, em-dash YOK, `lang="en"` chip).

### Task 5: Scaffold + manifest + Section A (slides 1-4)

**Files:** Create `weeks/week3.js`; Modify `weeks/manifest.js`

- [ ] **Step 1 — AE 2025 ön-doğrulama** (helpx.adobe.com, web): Graph Editor toggle (Shift+F3) · value↔speed graph değiştirme düğmesi · keyframe interpolation (sağ-tık/menü) · Hold keyframe · Separate Dimensions · Convert Vertex · Easy Ease (F9). Doğrulanan kısayolları not düş (B/C demolarında kullanılacak).
- [ ] **Step 2 — Scaffold:** `export const week3 = { title: "03 · Graph Editor", slides: [...] }`. Manifest'e `{ key: 'week3', label: '03 · Graph Editor' }` ekle.
- [ ] **Step 3 — Section A slaytları:**
  - `1 acilis` (hero) — "Hareketin Karakteri", subtitle "Hareketli Grafik Tasarımı · 3. Hafta · Graph Editor". notes: W2'de Easy Ease tek tık → bu hafta eğriyi elle.
  - `2 bu-hafta` (standard) — yol haritası: oku → şekillendir → karşılaştır. notes: 2 saat, çok AE.
  - `3 spacing` (standard) — ara kareler motorun ürettiği; eğri = "nasıl"ın reçetesi; *timing* (ne zaman) vs *spacing* (aradaki mesafe). İlke izi tohumu: timing & spacing. notes.
  - `4 reveal-spacing` (reveal) — question: "Aynı sürede A→B giden iki top — biri canlı, biri ölü hissettiriyor. Fark ne?"; html (cevap): spacing/easing. notes.
- [ ] **Step 4 — Lint:** `node bin/lint-deck.mjs` → 0 hata (manifest→dosya, id benzersiz, notes var). Commit: `git commit -m "week3: scaffold + manifest + Section A"`

### Task 6: Section B — Eğriyi okuma (slides 5-11)

**Files:** Modify `weeks/week3.js`

- [ ] **Step 1 — Slaytlar:**
  - `5 graph-ac` (standard) + `6 demo-graph-ac` (standard, `.ae-demo`) — graph editörü aç (Shift+F3), W2'nin Easy Ease'inin eğrisini GÖR. notes: köprü.
  - `7 value-graph` (standard) — değer doğrudan; düz çizgi = sabit değer.
  - `8 speed-graph` (standard) — yükseklik = hız; dipte düz = durağan. (value vs speed kontrastı net.)
  - `9 reveal-speed` (reveal) — "Bu speed graph hangi harekete ait?" → cevap.
  - `10 keyframe-tipleri` (standard) + `11 demo-keyframe-tipleri` (standard, `.ae-menu`/`.ae-kbd`) — Linear/Bezier/Auto/Hold + ikon okuma; Hold = sıçrama/stepped.
- [ ] **Step 2 — Lint** 0 hata. **Kontak föy** ara-bakış: `bin/screenshot.sh week3` → `_contact/contact-week3.png` (B slaytları fit mi). Commit: `git commit -m "week3: Section B (eğriyi okuma)"`

### Task 7: Section C — Şekillendirme + ilk MotionDemo (slides 12-18)

**Files:** Modify `weeks/week3.js`

- [ ] **Step 1 — Slaytlar:**
  - `12 elle-egri` (standard) + `13 demo-elle-egri` (standard, `.ae-demo`) — bezier handle, slow in/out, influence%.
  - `14 oyna-playground` (standard, `className: 'slide-fill'`) — `html` içinde `<div data-motion-demo="playground" data-bezier="0.25,0.1,0.25,1"></div>` + tek satır yönerge. notes: sınıfça handle çek, hissi izle.
  - `15 overshoot` (standard) + `16 demo-overshoot` (standard, `.ae-demo`) — %100 ötesi = snappy; exaggeration ilke izi.
  - `17 reveal-overshoot` (reveal) — "Overshoot her işe uygun mu?" → bağlama göre (UI evet; kurumsal dikkat).
  - `18 his-sozlugu` (standard) — eğri şekli ↔ his: linear=mekanik · ease-out=iner · ease-in=yaylanır · overshoot=enerjik. (Katman 2 medya: varsa YouTube embed/link.)
- [ ] **Step 2 — Verify:** lint 0; kontak föy → slayt 14 `slide-fill` playground render + etkileşim (headless: handle drag path değişir). Commit: `git commit -m "week3: Section C (şekillendirme + playground)"`

### Task 8: Section D — Uzamsal + sentez (slides 19-23)

**Files:** Modify `weeks/week3.js`

- [ ] **Step 1 — Slaytlar:**
  - `19 motion-path` (standard) + `20 demo-motion-path` (standard, `.ae-demo`) — uzamsal eğri = arcs; Convert Vertex.
  - `21 uc-easing-yaris` (standard, `className: 'slide-fill'`) — `<div data-motion-demo="race" data-easings="linear,ease,overshoot"></div>` + W1 `.mg-bezier` üç eğri yanında. notes: "aynı A→B, üç his".
  - `22 demo-uc-easing` (standard, `.ae-demo`) — AE'de aynı hareketi 3 easing'le kur.
  - `23 logoya-uygula` (standard) — coda: kurulan eğriyi W2 logosuna taşı. notes: W2 yapmayan için "basit objeyle de olur".
- [ ] **Step 2 — Verify:** lint 0; kontak föy → slayt 21 race 3 nokta + ▶ koşuyor. Commit: `git commit -m "week3: Section D (uzamsal + 3-easing yarışı)"`

### Task 9: Section E + ilke izi (slides 24-27)

**Files:** Modify `weeks/week3.js`; Modify `weeks/week1.js` (ilke izi)

- [ ] **Step 1 — Slaytlar:**
  - `24 hatalar` (standard, `.mg-trace`) — linear bırakmak · aşırı-overshoot · speed graph'ı görmezden gelmek.
  - `25 cheatsheet` (standard, `.cheat-*`) — Shift+F3 · handle tipleri · Convert Vertex · Separate Dimensions · F9.
  - `26 ilham` (standard) — snappy motion design (Katman 2: YouTube embed/link, W2 ilham deseni).
  - `27 odev` (standard, `.mg-task`) — aynı hareket × 3 easing → MP4 (+ops. logoya uygula).
- [ ] **Step 2 — İlke izi:** `weeks/week1.js`'in 12-ilke slaytında W3 ilkelerini kümülatif işaretle: `slow in/out · timing & spacing · arcs · exaggeration` (W1 şablonunu izle; lint 0 kalsın).
- [ ] **Step 3 — Verify:** lint 0. Commit: `git commit -m "week3: Section E + ilke izi (W1)"`

### Task 10: Final doğrulama + yayım

- [ ] **Step 1 — Tam lint:** `node bin/lint-deck.mjs` ve `node bin/lint-deck.mjs ../git423-ders` → 0 hata.
- [ ] **Step 2 — Kontak föy:** `bin/screenshot.sh week3` → 27 slayt tek grid, hepsi fit, görsel temiz.
- [ ] **Step 3 — Yerel fit (3 çözünürlük):** `python3 -m http.server 4173`; headless probe 1366×768 · 1280×720 · 1920×1080 → tüm slaytlar scale≈1/fit, konsol temiz, dropdown'da week3 + reveal/playground/race çalışıyor.
- [ ] **Step 4 — Spec başarı ölçütü** (`week3.plan.md`) tek tek geçir: MotionDemo iki repoda · git423 parite · cache-bust · notes hepsinde · ilke izi · ödev+reveal+canlı demo.
- [ ] **Step 5 — Yayım (push = canlı, AYRI):** git407 + git423-ders ayrı push. PDF handout ops: `bin/pdf.sh week3`. (Planlama dosyaları `week3.plan.md`/`week3.tasks.md` bu push'a dahil.)

---

## Self-review (writing-plans)
- **Spec coverage:** omurga(T5-8 obje+coda) · ~27 slayt(T5-9) · motion path(T8) · interaktiflik K1 reveal(T5/6/7) K2 medya(T7/9) K3 MotionDemo(T1-3,7,8) · motor bileşeni(T1-4) · ilke izi(T9) · reçete kuralları(her T lint) · cross-repo parite(T4,10). ✓ boşluk yok.
- **Placeholder:** MotionDemo iç-render (`_buildPlayground`/`_buildRace`) Task 2/3'te davranış+formül verildi, tam SVG/drag kodu yazımda (build-less içerik = deliverable). Slayt prose = yazımda (dil/ton kuralıyla). Bunlar placeholder değil, içerik-üretim adımı.
- **Tutarlılık:** `MotionDemo` · `data-motion-demo` · `bezierY` · `playground`/`race` her görevde aynı. ENGINE_VERSION `1.2.0` her yerde.
