# CSS Katmanlama Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline, otonom) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** İki deck sitesinin (git407 · git423-ders) ortak motor-bağlı token-free CSS mekaniğini tek bir `styles/engine.css`'e alıp byte-identical dağıtmak; canlı görünüm bozulmadan.

**Architecture:** engine.css yapısal temel olarak main.css'ten ÖNCE yüklenir. 4 blok (reset · sr-only · presenter-thumb__slide · @media print) iki main.css'ten silinip engine.css'e taşınır. `bin/sync-engine.sh` engine.css'i de byte-identical dağıtır. Site-site ritmi: önce git407 (kanonik), doğrula, sonra git423-ders.

**Tech Stack:** Saf CSS, build-siz, `<link>` ile yükleme. Doğrulama: headless Chrome `_capture` (3 çözünürlük + `?presenter=1`), `sync-engine.sh --check`, `bin/lint-deck.mjs`.

## Global Constraints

- engine.css **token-free** (sıfır `var(--...)`); görünüm tema main.css'te kalır.
- Cache-bust `?v=ENGINE_VERSION` (şu an `1.3.0`); `main.css`'e dokunma.
- Link sırası: **engine → main** (→ playgrounds git423-ders'te).
- İkinci deck = `../git423-ders` (Astro `git423` DEĞİL). sync hedefi `../git423-ders`.
- İki canlı site (push=canlı) → push YOK; commit yerel kalır, Emre gözle onaylayıp push eder.
- Em-dash yasak (· : ; , kullan). Build-siz felsefe korunur.

---

### Task 1: git407 engine.css + main.css temizliği + link

**Files:**
- Create: `/Users/emremutlu/Documents/project/git407/styles/engine.css`
- Modify: `/Users/emremutlu/Documents/project/git407/styles/main.css` (sil: 52 · 68-71 · 368-375 · 376)
- Modify: `/Users/emremutlu/Documents/project/git407/index.html` (satır 13'ten önce link)

**Interfaces:**
- Produces: `styles/engine.css` (kanonik kaynak; Task 2 bunu dağıtır).

- [ ] **Step 1: engine.css oluştur**

```css
/* engine.css — paylaşılan motor-bağlı mekanik. git407 kanonik kaynak;
   bin/sync-engine.sh byte-identical dağıtır. Görünüm/tema main.css'te kalır. */

* { box-sizing: border-box; margin: 0; padding: 0; }

.sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

.presenter-thumb__slide {           /* motor cloneNode + scale önizleme */
    position: relative !important;
    inset: auto !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: none !important;
    transform-origin: top left;
}

@media print { .presenter-panel { display: none !important; } }
```

- [ ] **Step 2: main.css'ten 4 bloğu sil**

Sırayla (aşağıdan yukarı, satır kayması olmasın): `@media print {.presenter-panel}` (376) · `.presenter-thumb__slide` (368-375) · `.sr-only` (68-71) · reset `*{...}` (52). Sadece bu kurallar; çevresindeki yorumlar/kurallar kalır.

- [ ] **Step 3: index.html'e engine.css link ekle**

`<link rel="stylesheet" href="styles/main.css">` (satır 13) ÖNCESİNE:
```html
    <link rel="stylesheet" href="styles/engine.css?v=1.3.0">
```

- [ ] **Step 4: Doğrula (headless _capture)**

3 çözünürlükte (1920x1080 · 1366x768 · 1280x720) ilk slayt + `?presenter=1` modunda thumb önizleme + panel render. reset/sr-only sonrası genel layout regresyonsuz. Görsel kanıt PNG üret.

- [ ] **Step 5: lint + commit (push YOK)**

```bash
cd /Users/emremutlu/Documents/project/git407
node bin/lint-deck.mjs        # temiz olmalı
git add styles/engine.css styles/main.css index.html
git commit -m "feat(css): ortak motor-bağlı mekaniği engine.css'e al (git407)"
```

---

### Task 2: sync-engine.sh genişlet + git423-ders'e dağıt

**Files:**
- Modify: `/Users/emremutlu/Documents/project/git407/bin/sync-engine.sh`

**Interfaces:**
- Consumes: `styles/engine.css` (Task 1).
- Produces: `../git423-ders/styles/engine.css` (byte-identical; Task 3 bunu kullanır).

- [ ] **Step 1: sync-engine.sh'i iki dosyaya genişlet**

Tek-dosya (`scripts/main.js`) mantığını dosya listesine çevir: `scripts/main.js` + `styles/engine.css`. Her dosya için: hedef var mı kontrol · diff göster · drift varsa kopyala (mevcut `--check` / `--force` / sor davranışı her dosya için). Version stamp yine `ENGINE_VERSION`'dan (`scripts/main.js`). Hedef repo yine `../git423-ders`.

- [ ] **Step 2: --check ile drift gör (engine.css git423-ders'te yok → drift beklenir)**

```bash
cd /Users/emremutlu/Documents/project/git407
bin/sync-engine.sh --check    # engine.css icin drift raporlamali (exit 1)
```
Expected: main.js senkron, engine.css hedefte yok/drift.

- [ ] **Step 3: engine.css'i git423-ders'e kopyala**

```bash
bin/sync-engine.sh --force    # iki dosyayi da kopyalar
bin/sync-engine.sh --check    # artik TEMIZ (exit 0) olmali
```

- [ ] **Step 4: commit (git407, push YOK)**

```bash
git add bin/sync-engine.sh
git commit -m "feat(sync): sync-engine.sh engine.css'i de dağıtsın"
```

---

### Task 3: git423-ders main.css temizliği + link + doğrulama

**Files:**
- Modify: `/Users/emremutlu/Documents/project/git423-ders/styles/main.css` (sil: 39-43 · 62-71 · 1053-1059 · 1061)
- Modify: `/Users/emremutlu/Documents/project/git423-ders/index.html` (satır 14'ten önce link)

**Interfaces:**
- Consumes: `../git423-ders/styles/engine.css` (Task 2).

- [ ] **Step 1: main.css'ten 4 bloğu sil**

Aşağıdan yukarı: `@media print {.presenter-panel}` (1061) · `.presenter-thumb__slide` (1053-1059) · `.sr-only` (62-71) · reset `*{...}` (39-43).

- [ ] **Step 2: index.html'e engine.css link ekle**

`<link rel="stylesheet" href="styles/main.css">` (satır 14) ÖNCESİNE:
```html
    <link rel="stylesheet" href="styles/engine.css?v=1.3.0">
```
playgrounds.css (satır 15) en sonda kalır.

- [ ] **Step 3: Doğrula (headless _capture)**

3 çözünürlük + `?presenter=1` (thumb + panel) + sr-only nowrap kazanımı zarar vermiyor + reset sonrası layout regresyonsuz. Görsel kanıt PNG.

- [ ] **Step 4: lint + commit (git423-ders, push YOK)**

```bash
cd /Users/emremutlu/Documents/project/git423-ders
node bin/lint-deck.mjs 2>/dev/null || true   # varsa temiz olmali
git add styles/main.css styles/engine.css index.html
git commit -m "feat(css): ortak motor-bağlı mekaniği engine.css'e al (git423-ders)"
```

---

## Definition of Done

- [ ] `bin/sync-engine.sh --check` temiz (engine.css + main.js byte-identical).
- [ ] İki sitede `?presenter=1` thumb önizleme + panel çalışıyor.
- [ ] reset/sr-only silindikten sonra iki sitede layout regresyonsuz (3 çözünürlük).
- [ ] `@media print` presenter'ı gizliyor.
- [ ] `lint-deck.mjs` temiz.
- [ ] Görsel kanıt PNG'ler Emre'ye sunuldu; push Emre onayını bekliyor.
</content>
