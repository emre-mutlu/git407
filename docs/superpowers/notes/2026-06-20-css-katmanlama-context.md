# CSS Katmanlama — Bağlam Notu (RESUME dokümanı)

- **Tarih:** 2026-06-20 (güncellendi: keşif + kapsam kararı sonrası)
- **Durum:** ✅ TAMAMLANDI + CANLI (06-20, iki repo push'landı). engine.css uygulandı; spec (`../specs/2026-06-20-css-katmanlama-design.md`) + plan (`../plans/2026-06-20-css-katmanlama.md`) commit'li. Bu dosya artık tarihsel kayıt + repo uyarısı için tutulur.
- **Bu dosya = /clear sonrası tek otorite.** Aşağıdaki file:line referansları sayesinde 727+1062 satırlık iki CSS'i baştan okumaya GEREK YOK. "katmanlama" / "devam" denince buradan sürdür.
- **⚠ REPO UYARISI (06-20 doğrulandı):** İkinci deck = yerel **`../git423-ders`** klasörü (remote `emre-mutlu/git423`; motor git407 ile byte-identical; `styles/main.css` 1062 satır, presenter CSS 1009-1061 VAR). **KARIŞTIRMA:** ayrı bir `../git423` klasörü daha var = Astro ders-platformu (`platform/public/ders/...`, presenter YOK, motor farklı/478 satır). CSS katmanlama işinin ikinci sitesi = **`git423-ders`**, Astro `git423` DEĞİL. `sync-engine.sh` hedefi de `../git423-ders`. Bu file:line haritaları `git423-ders` içindir.

---

## 0. KARAR: Dar kapsam (motor-bağlı)  ← Emre seçti, 2026-06-20

Üç seçenek sunuldu (dar kapsam / tam yapısal birleştirme / sadece token sözleşmesi). Emre **"Dar kapsam (motor-bağlı)"** seçti.

**Anlamı:** Yalnız GERÇEKTEN ortak + motor-bağlı mekanikleri küçük bir `styles/engine.css`'e al (sync edilir, byte-identical). Her sitenin slayt/nav/layout GÖRÜNÜMÜ ve ANİMASYON STRATEJİSİ kendi `main.css` temasında kalır. Amaç: presenter gibi motor-bağlı özellikleri tek yerde yazmak (DRY), kimlik + iki canlı siteyi bozmadan.

**Tam birleştirme DEĞİL.** Animasyon stratejisi / grid-flex / slide-inner yapısı BİRLEŞTİRİLMEYECEK (bunlar iki sitede kasıtlı farklı, birleştirmek hissi değiştirir + regresyon riski).

---

## 1. Brainstorming NEREDE KALDI + sıradaki adımlar

Tamamlanan: (1) proje bağlamı keşfi [iki CSS derinlemesine okundu], (2) kritik bulgu çıkarıldı [bkz. §2], (3) ilk clarifying soru = KAPSAM → "dar kapsam" yanıtlandı.

**Sıradaki (brainstorming devam):**
1. Kalan clarifying sorular (§6 açık kararlar) — birer birer.
2. 2-3 yaklaşım sun (dar kapsam içinde: ne kadar çıkaralım, dosya yapısı, token gerek var mı).
3. Tasarımı bölüm bölüm sun → Emre onayı.
4. Spec yaz: `docs/superpowers/specs/2026-06-20-css-katmanlama-design.md` + commit.
5. Spec self-review → Emre spec'i gözden geçirir.
6. `superpowers:writing-plans` ile uygulama planı. (Terminal state = writing-plans; başka implementation skill ÇAĞIRMA.)

HARD-GATE: tasarım onaylanmadan kod/implementation YOK.

---

## 2. BULGU: ortak yüzey küçük + mekanik olarak farklı (keşifle doğrulandı)

İki sitenin "ortak görünen" sınıfları yalnız renk/font değil, **mekanik olarak da** farklı. Bu, kapsamı belirledi.

| Ortak görünen | git407 | git423 |
|---|---|---|
| `.slide` geçişi | opacity+visibility ANINDA takas; **transition YOK**; giriş çocuk keyframe'lerle (`enter-up`/`enter-soft`, kademeli) | tüm slayt `translateY(20px) scale(.98)` + `transition .6s`; ayrı `@supports view-transition` bloğu |
| `.slide-inner` | `max-width:1080px`, düz blok | `flex column`, `will-change`, max-width YOK (max-width `.slide-header`'da) |
| `.app-main-layout` | **GRID** (`1fr 58px`) | **FLEX** |
| nav | timeline/playhead (frame counter, üçgen, dikey çizgi) | daha sade dot listesi |
| chrome (DOM+CSS, per-site, index.html'ler FARKLI) | `.scrubber`/`.stage-glow`/`.stage-grain`/`.timecode`/`.transport`/`.hud-fps`/`.rec-dot`/`.logo-text`/`.logo-accent` | `.ambient-bg`/`.keyboard-hints`/`.slide-progress`/`.logo-dot` |
| içerik bileşenleri | `.split` (chromatic) + stage dekoru | `.vcd-*` kütüphanesi (grid/card/stats/bullet/code/badge/table) |

Sonuç: büyük iskeleti ortak yapmak = animasyon+layout'u tek tipe indirmek = bir sitenin hissini değiştirmek. Bu yüzden dar kapsam.

---

## 3. GERÇEKTEN ortak + motor-bağlı envanter (engine.css adayları, risk sıralı)

**A. Trivial / birebir aynı** → engine.css'e al, risksiz:
- Reset `* { box-sizing:border-box; margin:0; padding:0 }` (git407:52 / git423:39)
- `.sr-only` (git407:68-71 / git423:62-71)

**B. Token-FREE saf mekanik / birebir aynı** → engine.css'e al, en net kazanç:
- `.presenter-thumb__slide` (git407:368 / git423:1053): `position/inset/opacity/visibility/pointer-events/transform-origin` hepsi `!important`; cloneNode + scale küçük-önizleme mekaniği. Token içermez.

**C. Ortak iskelet mekaniği, GÖRÜNÜM per-site kalır** → mekanik kısmı engine.css, look kısmı temada:
- `.presenter-panel*` (git407:324-376 / git423:1009-1061). Ortak mekanik: flex-column; `__note { flex:1; overflow-y:auto }`; `__preview` kutu oranı; `__bar/__count/__next` iskeleti; `@media print { display:none }`.
  Per-site kalan: bg/border/radius/shadow/renk/font; `__tag` aksan (git407 `--cyan` / git423 `--color-primary`).
  DİKKAT: git407 ek olarak `.presenter-on .app-main-layout { grid-template-columns: 1fr minmax(300px,28vw) 58px }` (git407:321) GRID'e özgü → git407 temasında KALIR. git423 flex olduğu için panel flex-item, override yok.

**D. Ortak ruh ama NAZİK (muhtemelen per-site bırak / brainstorm'da karar):**
- reveal aç/kapa: git407:628-635 (sade) vs git423:388-470 (`.reveal-trigger::before` + `.reveal-trigger-icon` ek markup, farklı değerler). Mekanik ortak (`.reveal-content { max-height:0; overflow:hidden; opacity:0 }` → `.revealed` açar) ama markup/değer farkı çıkarmayı kırılgan yapar. Öneri: ilk turda DOKUNMA, sadece A+B+C-mekanik çıkar.
- view-transition: ikisinde de var ama farklı isim (git407 `stage` :648-656 / git423 `slide-container` :627-707) + farklı animasyon. Ortak DEĞİL, per-site kalır.

**İlk tur engine.css ≈ A + B + C-mekanik.** Küçük, temiz, düşük risk; "presenter tek yerde" motivasyonunu birebir karşılar.

---

## 4. ÖNEMLİ sadeleşme: token sözleşmesi gerekmeyebilir

Dar kapsamda paylaşılan kısım neredeyse tamamen **token-free saf mekanik** (A+B+C-mekanik). Görünüm her sitenin kendi temasında kaldığı için, engine.css **hiç token referansı içermeyebilir** → büyük token-yeniden-adlandırma (eski→yeni eşleme) İŞİ MUHTEMELEN GEREKMEZ. Her site mevcut token'larını (git407 36 var "Motion Studio" / git423 21 var "Neural Expressive") aynen korur.

Açık kalan: bir shared mekanik kuralı kaçınılmaz olarak temalı bir değere değerse (örn. easing), onu hardcode mu, küçük bir token mı? Brainstorm'da karar. Eğilim: engine.css token-free; tema dosyaları rename'siz.

---

## 5. Per-site KALACAKLAR (engine.css'e GİRMEZ)

Atmosfer/chrome (stage-glow/grain/scrubber/ambient-bg/timecode/transport/hud/keyboard-hints/slide-progress/logo-*); `.split`; `.vcd-*`; nav görünümü; `.slide`/`.slide.active`/`.slide-inner` (animasyon stratejisi + yapı farklı); `.app-main-layout` (grid vs flex); slide-header/category/title/subtitle/body görünümü; hero; entrance keyframe'leri; view-transition; reveal görünümü (+ ilk turda mekaniği de).

---

## 6. Açık kararlar (brainstorming gündemi — dar kapsama göre güncel)

1. **Çıkarım sınırı:** ilk tur sadece A+B+C-mekanik mi? reveal (D) dahil mi, sonraya mı?
2. **Dosya yapısı:** ayrı `styles/engine.css` (link sırası: engine ÖNCE, main.css SONRA ki tema override edebilsin) — build-siz, `@import` yerine ikinci `<link>`. Onayla.
3. **Token:** engine.css token-free mi (eğilim evet) yoksa minik ortak sözleşme mi?
4. **Geçiş:** iki CANLI siteyi bozmadan; her adımda görsel doğrulama; site site mi, kural kural mı?
5. **Altyapı:** `bin/sync-engine.sh` engine.css'i de kopyalasın (şu an yalnız scripts/main.js); `index.html` (iki site) yeni `<link>` + cache-bust (?v=); `bin/lint-deck.mjs` etkilenmiyor olmalı (deck verisi linti, CSS değil — doğrula).

---

## 7. Mevcut altyapı (sabit gerçekler)

- Motor `scripts/main.js` ORTAK, byte-identical, `bin/sync-engine.sh` dağıtır (şu an v1.3.0, YALNIZ main.js kopyalar; CSS/index.html per-site).
- İki site GitHub Pages, **push = canlı** (~12s). git407 remote `emre-mutlu/git407`, git423 `emre-mutlu/git423`.
- `index.html` per-site, DOM chrome'u FARKLI (ortak iskelet: `#slide-container`/`.app-main-layout`/`.sidebar-nav`/`#nav-dots`/`#week-select`/`#current-slide-num`/`#total-slides-num`).
- git407 `styles/main.css` 727 satır; git423 `styles/main.css` 1062 satır.

### git407 file:line haritası
:root 8-50 · reset 52 · sr-only 68-71 · atmosphere 76-110 · header/hud/select 115-169 · app-main-layout(GRID) 172 · slide 198-204 · slide-inner 206 · header/cat/title/body 212-228 · .split 231-236 · hero 239-247 · entrance keyframes 252-266 · nav 271-303 · footer/timecode 306-314 · PRESENTER 321-376 (grid-override 321, panel 324, __tag cyan 343, thumb 368, print 376) · reveal 628-635 · view-transition(stage) 648-656 · reduced-motion 725-726

### git423 file:line haritası
:root 6-36 · reset 39 · html font-clamp 45-48 · sr-only 62-71 · ambient-bg 76 · header/logo-dot/select 92-172 · slide 198-216 · slide-inner 220-226 · slide-fill-inner 236 · slide.active 241-246 · @supports view-transition disable 249-258 · header/cat/title 260-284 · center-composite 286-318 · slide-body+scrollbar 320-351 · slide-fill 353-362 · hero 364-383 · reveal 388-470 · app-main-layout(FLEX) 475 · nav 482-553 · footer/keyboard-hints/progress 557-595 · #slide-container view-transition 627-707 · vcd-* 714-930 · PRESENTER 1005-1061 (panel 1009, __tag color-primary 1029, thumb 1053, print 1061)

---

## 8. Riskler + değişmezler

- İki CANLI site (push=canlı) → regresyon = canlı bozulma. Her adım iki sitede görsel doğrulama (headless [[headless-chrome-dogrulama-git407]] _capture deseni + Emre gözle "test yapma ben kontrol ediyorum" demişti, son söz onda).
- Build-siz felsefe korunur (SASS/derleme yok, sade `<link>`).
- Em-dash YASAK [[em-dash-yazim-tercihi]] (· : ; , kullan).
- Headless Claude yasağı sürer (script/CI'ya claude gömme).
- İlgili memory: [[css-katmanlama-bekliyor]] · [[git407-git423-css-ayri-sistem]]
