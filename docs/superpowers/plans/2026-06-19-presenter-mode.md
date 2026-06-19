# Presenter Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eğitmen `?presenter=1` URL'i ile her slaytın konuşmacı notunu görür; öğrenci normal linkte hiçbir not görmez.

**Architecture:** Paylaşılan motor (`scripts/main.js`) açılışta URL'yi okur; `?presenter=1` varsa `.app-shell` içine footer'dan önce tek bir `aside.presenter-panel` ekler ve `goToSlide()` her çağrıldığında paneli aktif slaytın notu + sayaç + sıradaki başlıkla günceller. Panel yoksa tüm mantık no-op. Mod localStorage'a yazılmaz.

**Tech Stack:** Vanilla ES module JS (build yok), CSS custom properties, GitHub Pages (statik). Test altyapısı yok; doğrulama yerel `python3 -m http.server 4173` + tarayıcı ile yapılır.

## Global Constraints

- Build yok, framework yok, bağımlılık eklenmez (build-siz SPA korunur).
- Em-dash (—) yazılmaz; yerine `·` / iki nokta / virgül (kod yorumları dahil).
- `scripts/main.js` paylaşılan motor: değişince `ENGINE_VERSION` bump + `bin/sync-engine.sh` ile `git423-ders`'e dağıt + iki `index.html`'de `main.js?v=…` güncelle + iki repo ayrı commit/push (ikisinde de push = canlı).
- Pre-push gate: `node bin/lint-deck.mjs` → 0 hata.
- İçerik dosyaları (`weekN.js`) bu işte DEĞİŞMEZ.
- Pratik gizlilik: `notes` public kalır; cevap anahtarı/kişisel veri yazılmaz.
- Yeni `notes` üretilmez; var olan alanlar kullanılır.

---

### Task 1: Presenter bayrağı + boş panel iskeleti + sürüm bump

**Files:**
- Modify: `scripts/main.js:12` (ENGINE_VERSION), `scripts/main.js:24-38` (constructor), `scripts/main.js:40-44` (init), yeni metod `setupPresenterPanel()`
- Modify: `index.html:65-66` (cache-bust)

**Interfaces:**
- Produces: `this.presenterMode` (boolean), `this.presenterPanel` (HTMLElement|null), `setupPresenterPanel()` metodu. `.presenter-panel` DOM iskeleti: `.presenter-panel__tag`, `.presenter-panel__count`, `.presenter-panel__note`, `.presenter-panel__next`.

- [ ] **Step 1: ENGINE_VERSION'ı bump et**

`scripts/main.js:12` satırını değiştir:

```js
const ENGINE_VERSION = '1.3.0';
```

- [ ] **Step 2: Constructor'a presenter bayrağını ekle**

`scripts/main.js` constructor'ında `this.weekSelect = document.getElementById('week-select');` satırından sonra, `this.init();` çağrısından önce ekle:

```js
        // Presenter mode: ?presenter=1 reveals speaker notes. URL-only, never
        // persisted, so the live link shared with students stays clean.
        this.presenterMode = new URLSearchParams(location.search).get('presenter') === '1';
        this.presenterPanel = null;
```

- [ ] **Step 3: setupPresenterPanel() metodunu ekle**

`scripts/main.js`'de `populateWeeks()` metodundan hemen önce (satır 46 civarı) yeni metod ekle:

```js
    /**
     * Presenter panel: speaker-only notes strip below the stage. Built once,
     * only when ?presenter=1 is present. For students there is no DOM, no
     * toggle, nothing persisted. Per-slide content is filled by
     * updatePresenterPanel() from goToSlide().
     */
    setupPresenterPanel() {
        if (!this.presenterMode) return;
        const shell = document.querySelector('.app-shell');
        if (!shell) return;
        const footer = shell.querySelector('.app-footer');
        const panel = document.createElement('aside');
        panel.className = 'presenter-panel';
        panel.innerHTML = `
            <div class="presenter-panel__bar">
                <span class="presenter-panel__tag">◍ PRESENTER · yalnızca sen</span>
                <span class="presenter-panel__count"></span>
            </div>
            <p class="presenter-panel__note"></p>
            <div class="presenter-panel__next"></div>
        `;
        shell.insertBefore(panel, footer);
        this.presenterPanel = panel;
    }
```

- [ ] **Step 4: init()'te setupPresenterPanel() çağır**

`scripts/main.js:40-44` init() metodunu değiştir:

```js
    async init() {
        const defaultWeek = this.populateWeeks();
        this.setupPresenterPanel();
        this.setupEventListeners();
        await this.loadWeek(defaultWeek);
    }
```

- [ ] **Step 5: index.html cache-bust'ı güncelle**

`index.html:65-66` iki satırı değiştir:

```html
    <!-- Engine: shared system (v1.3.0 adds presenter mode; synced via bin/sync-engine.sh) -->
    <script type="module" src="scripts/main.js?v=1.3.0"></script>
```

- [ ] **Step 6: Doğrula (panel var/yok)**

Yerel server'ı başlat: `python3 -m http.server 4173`
Tarayıcıda kontrol (ya da Playwright `browser_evaluate` ile `document.querySelector('.presenter-panel')`):
- `http://localhost:4173/?presenter=1` → `.presenter-panel` DOM'da VAR (içi henüz boş, stilsiz olabilir).
- `http://localhost:4173/` (parametresiz) → `.presenter-panel` DOM'da YOK. Öğrenci görünümü değişmemiş.
- `node bin/lint-deck.mjs` → 0 hata.

- [ ] **Step 7: Commit**

```bash
git add scripts/main.js index.html
git commit -m "feat(engine): presenter bayrağı + boş panel iskeleti (v1.3.0)"
```

---

### Task 2: Panel içeriği (not + sayaç + sıradaki) + goToSlide entegrasyonu

**Files:**
- Modify: `scripts/main.js` (yeni `updatePresenterPanel()` metodu + `goToSlide` `updateDOM` içine çağrı, satır 329 civarı)

**Interfaces:**
- Consumes: `this.presenterPanel`, `this.slides`, `this.currentSlideIndex` (Task 1 + mevcut motor).
- Produces: `updatePresenterPanel()` metodu; `goToSlide` her geçişte paneli günceller.

- [ ] **Step 1: updatePresenterPanel() metodunu ekle**

`scripts/main.js`'de `goToSlide(index)` metodundan hemen önce ekle:

```js
    /**
     * Refresh the presenter panel for the active slide: its notes, the slide
     * counter, and the next slide's title. No-op when the panel is off.
     */
    updatePresenterPanel() {
        if (!this.presenterPanel) return;
        const slide = this.slides[this.currentSlideIndex];
        const note = (slide && slide.notes) ? slide.notes : '';
        const next = this.slides[this.currentSlideIndex + 1];

        this.presenterPanel.querySelector('.presenter-panel__count').textContent =
            `${this.currentSlideIndex + 1} / ${this.slides.length}`;

        const noteEl = this.presenterPanel.querySelector('.presenter-panel__note');
        noteEl.textContent = note || 'Bu slayt için not yok.';
        noteEl.classList.toggle('is-empty', !note);

        this.presenterPanel.querySelector('.presenter-panel__next').textContent =
            next ? `Sıradaki ▸ ${next.title}` : 'Son slayt';
    }
```

- [ ] **Step 2: goToSlide'ın updateDOM bloğunda çağır**

`scripts/main.js` `goToSlide` içindeki `updateDOM` fonksiyonunda, footer sayaç güncellemesinden (`this.currentSlideNum.textContent = this.currentSlideIndex + 1;`) hemen sonra ekle:

```js
            // Refresh presenter notes (no-op unless ?presenter=1)
            this.updatePresenterPanel();
```

- [ ] **Step 3: Doğrula (içerik + geçiş)**

`http://localhost:4173/?presenter=1`, week3'e geç:
- Slayt 21/22 (Ödev): panelde notun metni görünür, sayaç `21 / 22`, "Sıradaki ▸ Ödev İçin Kaynaklar".
- Slayt 22/22 (son): "Son slayt" yazar.
- Ok tuşuyla geçişte panel anında güncellenir.
- week1'e geç (notes yok): panelde "Bu slayt için not yok."
- Parametresiz URL: panel yok, hata yok (konsol temiz).

- [ ] **Step 4: Commit**

```bash
git add scripts/main.js
git commit -m "feat(engine): presenter paneli not + sayaç + sıradaki başlıkla doldur"
```

---

### Task 3: Panel stili (CSS)

**Files:**
- Modify: `styles/main.css` (footer bloğundan sonra, ~satır 314 civarına `.presenter-panel` kuralları)

**Interfaces:**
- Consumes: Task 1'in DOM sınıfları (`.presenter-panel`, `__bar`, `__tag`, `__count`, `__note`, `__next`), mevcut `:root` değişkenleri.

- [ ] **Step 1: .presenter-panel kurallarını ekle**

`styles/main.css`'de `.timecode` kurallarından sonra (satır 314 civarı) ekle:

```css
/* --------------------------------------------------------------------------
   PRESENTER PANEL (konuşmacı notları · yalnız ?presenter=1 · yalnız ekran)
   -------------------------------------------------------------------------- */
.presenter-panel {
    flex: 0 0 auto;
    margin-top: 8px;
    padding: 12px 16px;
    background: var(--surface);
    border: 1px solid var(--line-2);
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow);
}
.presenter-panel__bar {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 8px;
    font-family: var(--font-mono);
    font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase;
}
.presenter-panel__tag { color: var(--cyan); }
.presenter-panel__count { color: var(--text-mute); }
.presenter-panel__note {
    font-family: var(--font-body); font-size: 1rem; line-height: 1.5;
    color: var(--text); white-space: pre-wrap;
}
.presenter-panel__note.is-empty { color: var(--text-mute); font-style: italic; }
.presenter-panel__next {
    margin-top: 8px;
    font-family: var(--font-mono);
    font-size: 0.8rem; letter-spacing: 0.04em; color: var(--text-mute);
}
@media print { .presenter-panel { display: none !important; } }
```

- [ ] **Step 2: Doğrula (görünüm)**

`http://localhost:4173/?presenter=1`:
- Panel slayt ile transport (footer) arasında, okunaklı, slaytı taşırmıyor.
- Tag cyan, not gövde fontunda okunur, sıradaki başlık soluk.
- Slayt fit (scale) bozulmamış; panel slayt alanını ezmiyor.

- [ ] **Step 3: Commit**

```bash
git add styles/main.css
git commit -m "style: presenter paneli görünümü (screen-only)"
```

---

### Task 4: Motor senkronu + iki repo deploy (operasyonel)

**Files:**
- Run: `bin/sync-engine.sh`
- Modify: `../git423-ders/index.html` (cache-bust `?v=1.3.0`)

**Interfaces:**
- Consumes: Task 1-3'ün son `scripts/main.js` + `styles/main.css` hali.

- [ ] **Step 1: Motoru git423-ders'e dağıt**

```bash
bin/sync-engine.sh
```
Beklenen: `scripts/main.js` (ve sync kapsamındaki dosyalar) `../git423-ders`'e kopyalanır. Çıktıda kopyalanan dosyalar listelenir.

- [ ] **Step 2: git423-ders index.html cache-bust'ını güncelle**

`../git423-ders/index.html` içinde `main.js?v=1.2.0` → `main.js?v=1.3.0` (ve varsa sürüm yorumu). git407 ile birebir aynı olmalı.

- [ ] **Step 3: Lint (iki repo)**

```bash
node bin/lint-deck.mjs
node bin/lint-deck.mjs ../git423-ders
```
Beklenen: ikisinde de 0 hata.

- [ ] **Step 4: Son doğrulama (iki site)**

Her iki repoda yerel server + `?presenter=1`: panel çalışır; parametresiz: temiz. `styles/main.css` git423'te de güncel mi (sync kapsamında değilse elle kopyala) kontrol et.

- [ ] **Step 5: İki repo ayrı commit + push**

```bash
# git407
git add scripts/main.js styles/main.css index.html
git commit -m "feat: presenter mode (konuşmacı notları, ?presenter=1) · engine v1.3.0"
git push origin main

# git423-ders (ayrı repo)
cd ../git423-ders
git add -A
git commit -m "engine: sync v1.3.0 (presenter mode)"
git push origin main
```
NOT: push = canlı (her iki Pages sitesi ~12 sn içinde rebuild). Push öncesi kullanıcı onayı al.

---

## Self-Review

- **Spec coverage:** R1 (öğrenci görmez) → T1 Step 6. R2 (?presenter=1) → T1. R3 (not+sayaç+sıradaki) → T2. R4 (persist yok) → T1 Step 2 (URL-only, localStorage'a yazılmaz). R5 (print etkilenmez) → T3 (@media print) + `_print.html` ayrı dosya. R6 (notu yok zarif) → T2 ("Bu slayt için not yok" + `.is-empty`). Kapsam tam.
- **Placeholder:** Yok; tüm adımlar gerçek kod/komut içeriyor.
- **Type tutarlılığı:** `presenterMode`, `presenterPanel`, `setupPresenterPanel()`, `updatePresenterPanel()`, `.presenter-panel__{bar,tag,count,note,next}` tüm task'larda aynı adlandırma.
