# CSS Katmanlama — Bağlam Notu (compact öncesi)

- **Tarih:** 2026-06-20
- **Durum:** Yaklaşım onaylandı (Emre: "katmanlama işini halledelim"), brainstorming bekliyor.
- **Devam:** Compact sonrası "katmanlama" denince → `superpowers:brainstorming` ile aç (aşağıdaki açık kararlar) → spec → plan → execute. Başlangıç bağlamı bu dosya + memory [[git407-git423-css-ayri-sistem]].

## Amaç

git407 + git423-ders CSS'lerini **tam birleştirme DEĞİL**, **katmanlama**: ortak yapısal/motor CSS (paylaşılan) + per-site tema (kimlik korunur). Böylece motora görsel özellik eklerken (presenter mode gibi) CSS tek yerde yazılır (DRY), kimlik + verimlilik korunur.

## Neden tam birleştirme değil (bu oturumda karara bağlandı)

- Tek görünüm = iki sitenin kasıtlı farklı kimliğini bozar.
- Tek dev dosya = her site diğerinin temasını da indirir → verimlilik düşer.
- CSS zaten küçük (git407 42KB, git423 26KB; gzip ~6-8KB) → performans sorunu yok; tek gerçek sıkıntı DRY (motor-görsel CSS iki yerde).

## Mevcut durum (keşfedildi)

- **Motor** `scripts/main.js` ORTAK (byte-identical, `bin/sync-engine.sh` dağıtır, şu an v1.3.0). `sync-engine.sh` YALNIZ main.js kopyalar; CSS/index.html per-site, dokunmaz.
- **git407** `styles/main.css`: 42KB, 36 `:root` değişkeni, "Motion Studio". Token'lar: `--bg`/`--bg-2`/`--surface`/`--surface-2/3`/`--line`/`--line-2`/`--text`/`--text-dim`/`--text-mute`/`--magenta`/`--cyan`/`--violet`/`--amber`/`--radius`/`--radius-sm`/`--shadow`; font `--font-display`(Archivo)/`--font-body`(Hanken Grotesk)/`--font-mono`(Martian Mono). Layout `.app-main-layout` **GRID** (`1fr 58px`; presenter modda `body.presenter-on` ile `1fr minmax(300px,28vw) 58px`).
- **git423-ders** `styles/main.css`: 26KB, 21 `:root` değişkeni, "Neural Expressive". Token'lar: `--color-bg-base/-surface/-card/-code`, `--color-primary`(lime #d4ff00)/`-secondary`(cyan)/`-accent`(violet)/`-success`/`-warning`, `--color-text-primary/-secondary/-muted`, `--border-glow/-light/-hover`, `--shadow-card/-glow`, `--card-radius`; font CSS değişkeni YOK (`'Geist'` + `'JetBrains Mono'` doğrudan). Layout `.app-main-layout` **FLEX** (`.slide-container` flex:1, `.sidebar-nav` 48px; presenter paneli flex-item `flex:0 0 clamp(300px,28vw,460px)`).
- **Ortak motor class'ları** (iki dosyada da stilli, değerleri farklı): `.slide`, `.slide-inner`, `.slide-header`, `.slide-title`, `.slide-category`, `.slide-body`, `.nav-dot(-item)`, `.app-shell`, `.app-main-layout`, `.app-footer`, `.reveal-trigger/-wrapper/-content`, `.slide-fill`, hero/reveal/standard tipleri, `.presenter-panel*` (yeni).
- **DOM iskelet ortak** (motor üretir, iki sitede de var): `#slide-container`, `.app-main-layout`, `.sidebar-nav`, `#nav-dots`, `#week-select`, `#current-slide-num`, `#total-slides-num`, `.app-shell`, `.app-header`, `.app-footer`.

## Önerilen yaklaşım (brainstorming'de netleştir)

1. **Ortak token sözleşmesi**: nötr isimler (örn. `--bg`, `--surface`, `--accent`, `--text`, `--text-muted`, `--line`, `--radius`, `--shadow`, `--font-ui`, `--font-mono`). İki site bu isimlere KENDİ değerlerini verir.
2. **engine.css** (paylaşılan, sync edilir): layout iskeleti + motor class'ları + presenter, ortak token İSİMLERİYLE yazılı.
3. **theme-<site>.css** (per-site): `:root` token DEĞERLERİ + kimlik bileşenleri (logo, atmosfer, dekor).
4. **index.html**: iki link (engine + theme) + cache-bust.
5. **sync-engine.sh**: main.js + engine.css dağıtsın (şu an yalnız main.js).

## Açık kararlar (brainstorming gündemi)

1. Token isim sözleşmesi (tam liste + iki sitenin eski→yeni eşlemesi).
2. Layout uzlaşması: engine `.app-main-layout` GRID mi FLEX mi (git407 grid, git423 flex)? Tek model mi, token/class ile parametrik mi?
3. Dosya yapısı: ayrı engine.css + theme.css mı, yoksa tek dosya + `@import` mı (build-siz korunmalı, SASS yok)?
4. Geçiş stratejisi: iki CANLI siteyi (push=canlı) bozmadan adım adım; her adımda görsel regresyon doğrulaması.
5. `sync-engine.sh` + `lint-deck.mjs` güncellemeleri.

## Riskler

- İki CANLI site (push=canlı) → regresyon = canlı bozulma. Her adım iki sitede görsel doğrulama (headless [[headless-chrome-dogrulama-git407]] + Emre gözle).
- Build-siz felsefe korunmalı.
- Em-dash yasağı [[em-dash-yazim-tercihi]] sürüyor.
