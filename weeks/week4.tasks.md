# Week 4 · Ağırlık & Canlılık — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the W4 "Ağırlık & Canlılık" deck (~18-19 static slides) — bouncing ball + 4 ilke (squash & stretch · anticipation · follow-through/overlapping · arcs) — taught via static slides + verified YouTube embeds, live in git407 only.

**Architecture:** No engine work (W4 needs no motor feature). One week-only CSS addition (`.yt-embed` responsive 16:9 wrapper extracted from week3's proven inline embed) + the `weeks/week4.js` deck authored per `week4.plan.md` + `DESTE_KILAVUZU.md`, plus its `manifest.js` line. Teaching is **static slide + external media** only — no live JS, no `MotionDemo`, no `reveal`.

**Tech Stack:** Build-less ES modules · vanilla JS deck objects + CSS · no bundler, no test runner. YouTube `<iframe>` embeds (motor prints `html` unescaped).

## Global Constraints

- **Motor DEĞİŞMEZ.** `scripts/main.js` untouched · **no `ENGINE_VERSION` bump** · `index.html` `?v=` unchanged (both `engine.css?v=1.3.0` and `main.js?v=1.3.0` stay) · `bin/sync-engine.sh` NOT run · **git423-ders NOT touched** (zero cross-repo change). The only shared-file edit is `.yt-embed` in `styles/main.css` (week-only deck CSS, recipe §7 — `main.css` is per-site and loads without a `?v=`, so the change ships without an index.html edit).
- **Editöryal (recipe §4):** dil/ton **hitapsız-passive** ("işaretlenir, açılır, seçilir" + mastar) · terim **EN-önce** (ilk geçişte TR parantez, sonra EN) · em-dash (—) **yalnız** kod yorumunda, gövde metninde ASLA (use ·/iki nokta/virgül) · `lang="en"` İngilizce büyük-harf chip/iz/etiketlerde ŞART (TR locale `i→İ`).
- **Her slaytta `notes`** (presenter modu — baştan yaz, recipe §3).
- **lint 0-hata:** `node bin/lint-deck.mjs` clean before each commit.
- **push = canlı** (GitHub Pages `main`/kök) → yarım deste push'lanmaz; final push Emre onayıyla.
- **İlke izi (resolved):** week3'ün canlı pratiği = ilkeyi **kendi destesinde inline `<span class="mg-trace" lang="en">…</span>` chip** ile işaretlemek; `week1.js`'in 12-ilke slaytına DOKUNULMADI (son commit week2 dönemi). W4 bu pratiği izler → **`week1.js` değişmez**, ilke izi week4 slaytlarına inline gömülür. (Plan §spec'teki "W1 12-ilke slaytı güncellenir" ifadesi bu canlı gerçeğe göre çözüldü.)
- **Görsel (resolved · Emre 2026-06-25):** 🖼️ harici görsel indirme **serbest** (güvenilir kaynak; telif sorun değil — sınıf-içi gösterim). Mekanik: URL **HTTP 200** doğrula → `images/`'e indir → `<img src="images/…">` (**hotlink YOK** = ders günü kırılmasın, git423-ders deseni). Basit şematik için inline SVG/CSS (week1 `.mg-bezier` deseni) da uygun — slayt bazında "gerçek referans görsel mi, inline şema mı daha net" kararı yazımda. Her iki yolda da deste self-contained (repo-içi).

---

## File structure
- **Modify** `styles/main.css` — append `.yt-embed` + `.yt-embed iframe` (week4-only block, after the `.ae-demo` cluster ~L583). Responsive 16:9 wrapper, week3 inline embed'inden çıkarıldı.
- **Create** `weeks/week4.js` — deck (~18-19 slides; `export const week4 = { title: "04 · Ağırlık ve Canlılık", slides: [...] }`).
- **Modify** `weeks/manifest.js` — append `{ key: 'week4', label: '04 · Ağırlık ve Canlılık' }`.
- **Create (if needed)** `images/` — 🖼️ slaytlar için indirilen harici görseller (HTTP 200 doğrulanmış, hotlink yok).
- **Delete** `_bounce-spike.html`, `_bounce-spike.png` (canlı bounce demo iptal · untracked → `rm`).
- **NOT touched:** `scripts/main.js`, `styles/engine.css`, `index.html`, `weeks/week1.js`, git423-ders, `bin/sync-engine.sh`.
- **Reference (read, don't edit):** `weeks/week4.plan.md` (spec) · `DESTE_KILAVUZU.md` (§2 şema, §3 notes, §4 editöryal, §6 medya, §7 kod-blok) · `weeks/week3.js` (`.yt-embed` kaynağı L65-66, `.mg-trace`/`.cheat-*`/`.mg-task` örnekleri) · `weeks/week2.js` (`.ae-menu`/`.ae-kbd`/`.cheat-*`) · `weeks/week1.js` (inline SVG, `.mg-task`).

**Verification (this project's "tests" — no pytest):** `node bin/lint-deck.mjs` (schema/notes/em-dash gate) · `bin/screenshot.sh week4` (kontak föy) · headless Chrome `_capture.html` probe (console-clean, renders, embeds load; 3 çözünürlük) · `python3 -m http.server 4173` yerel fit. Each task ends with the relevant gate.

---

## Slide map (sıra = sunum sırası) — 📹 YouTube embed · 🖼️ inline SVG diyagram · 🔗 izle-link

Doğrulanmış video ID'leri (oEmbed 200 · plan 2026-06-24, Task 2'de yeniden teyit):

| # | id | type | media | ilke izi |
|---|---|---|---|---|
| 1 | `acilis` | hero | — | — |
| 2 | `bu-hafta` | standard | — | — |
| 3 | `ayni-dusus-iki-his` | standard | 📹 `haa7n3UGyDc` (Alan Becker · Squash & Stretch) | — |
| 4 | `spacing-agirlik` | standard | 🖼️ spacing chart (inline SVG) | — |
| 5 | `squash-stretch` | standard | 🖼️ S&S poz dizisi (inline SVG/CSS) | `squash & stretch` |
| 6 | `ae-squash-stretch` | standard | 🔗 `3RqoUMz3-8I` (Motifize · S&S in AE) | — |
| 7 | `bouncing-kurulum` | standard | — (`.ae-demo`) | — |
| 8 | `graph-agirlik` | standard | 🖼️ value/speed graph (inline SVG) | — |
| 9 | `ss-carpisma` | standard | 📹 `fKnwxQVedbs` (Motion Made · bouncing ball + graph editor) | — |
| 10 | `anticipation` | standard | 📹 `F8OtE60T8yU` (Alan Becker · Anticipation) | `anticipation` |
| 11 | `follow-through` | standard | 🔗 `4OxphYV8W3E` (Alan Becker · Follow Through & Overlapping) | `follow through / overlapping` |
| 12 | `arcs` | standard | 📹 `I1_tZ9LhJD4` (Alan Becker · Arcs) | `arcs` |
| 13 | `abarti-dengesi` | standard | — | — |
| 14 | `his-sozlugu` | standard | — (4-ilke recap) | tüm 4 ilke toplu |
| 15 | `hatalar` | standard | — | — |
| 16 | `cheatsheet` | standard | — (`.cheat-*`) | — |
| 17 | `ilham` | standard | 📹 `uDqjIdI4bF4` (12 Principles · Full Series) | — |
| 18 | `odev` | standard | — (`.mg-task`) | — |
| 19 | `odev-kaynaklar` | standard (ops.) | 🔗 linkli kaynak şeridi | — |

**Embed pacing kararı (resolved):** ~7 video 2 saatlik derste fazla → **4 tam embed** (yüksek-değerli kilit slaytlar: 3 · 9 · 12 · 17), **3 link** (🔗 "izle ▶" chip: 6 · 11; ops. timing `BarOk2p38LQ` slide 4'te link). Kontak föy bakışında pacing izin verirse executor bir link'i embed'e yükseltebilir. Bu, deterministik pacing-güvenli taban.

---

## Phase 1 — `.yt-embed` CSS

### Task 1: `.yt-embed` responsive embed wrapper

**Files:** Modify `styles/main.css`

**Interfaces:**
- Produces: `.yt-embed` (wrapper div) + `.yt-embed iframe` — deck slaytları şu markup'ı kullanır:
  `<div class="yt-embed"><iframe src="https://www.youtube.com/embed/<ID>" title="…" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`

- [ ] **Step 1 — Append the week4-only block** to `styles/main.css` after the `.ae-demo` cluster (~L583, before the responsive `@media` section ~L665). Bu, week3 `week3.js:65-66` inline stilinin sınıfa çıkarılmış hali (kanıtlanmış):

```css
/* ── week4 · responsive 16:9 YouTube embed wrapper (deck-only, motor değişmez) */
.yt-embed {
    position: relative;
    width: min(640px, 90%);
    margin: 16px auto 0;
    aspect-ratio: 16 / 9;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid var(--line-2);
    box-shadow: 0 10px 34px -14px rgba(0, 0, 0, 0.65);
}
.yt-embed iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
```

- [ ] **Step 2 — Motor-değişmez teyidi:** `git status --short` yalnız `styles/main.css` (+ untracked plan/tasks) göstersin. `scripts/main.js`, `styles/engine.css`, `index.html` listede OLMAMALI.

Run: `git status --short`
Expected: `M styles/main.css` var · `scripts/main.js` / `engine.css` / `index.html` YOK.

- [ ] **Step 3 — Headless verify (git407):** start `python3 -m http.server 4173`; headless Chrome `_capture.html` deseniyle bir probe slaytı yükle: `<div class="yt-embed"><iframe src="https://www.youtube.com/embed/haa7n3UGyDc" title="probe"></iframe></div>`. Beklenen: konsol `Sunum motoru v1.3.0` (değişmedi), **hata yok**, `.yt-embed` 16:9 oranında render (taşma yok). (Memory: 500px-altı pencere tuzağına düşme — ≥1280px genişlik kullan.)

- [ ] **Step 4 — Commit** (git407 only):
```bash
git add styles/main.css
git commit -m "feat(css): week4 .yt-embed responsive 16:9 sarmalayıcı (deck-only, motor değişmez)"
```

---

## Phase 2 — `weeks/week4.js` deck

> Her görev: ilgili bölümün slaytlarını **reçeteye göre** yaz (id/title/type/teaching-point/media/notes verildi) → `node bin/lint-deck.mjs` 0-hata → commit. Tam Türkçe gövde-prose yazımda üretilir (dil/ton **hitapsız-passive**, terim **EN-önce**, em-dash YOK gövdede, `lang="en"` chip). Embed markup'ı Task 1'in `.yt-embed` kontratını kullanır; link 🔗 = `.mg-links` şeridinde "izle ▶" chip (week3 ilham deseni).

### Task 2: Medya yeniden-doğrulama + scaffold + manifest + Section A (slides 1-3)

**Files:** Create `weeks/week4.js`; Modify `weeks/manifest.js`

**Interfaces:**
- Produces: `export const week4 = { title: "04 · Ağırlık ve Canlılık", slides: [...] }` · manifest line `{ key: 'week4', label: '04 · Ağırlık ve Canlılık' }`.

- [ ] **Step 1 — Medya yeniden-teyit (oEmbed 200):** plan'daki ID'ler 2026-06-24'te doğrulandı; embed'lenecek ID'leri yeniden teyit et (link verilenler dahil):

```bash
for id in haa7n3UGyDc fKnwxQVedbs I1_tZ9LhJD4 uDqjIdI4bF4 3RqoUMz3-8I 4OxphYV8W3E; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$id&format=json")
  echo "$id → $code"
done
```
Expected: her satır `→ 200`. 200 değilse (401/404 = embed kapalı/silinmiş) → plan'daki alternatifi kullan (`fKnwxQVedbs`→`ufnVabtMcIo`; Alan Becker'da ölü ID olursa Full Series `uDqjIdI4bF4` o ilkeyi de kapsar) ve sapmayı not düş.

- [ ] **Step 2 — AE 2025 ön-doğrulama** (helpx.adobe.com, web — C/cheatsheet slaytlarında kullanılacak): Scale → **Separate Dimensions** · **Anchor Point** (Y) konumu · **Graph Editor** toggle (Shift+F3) · **Easy Ease** (F9) · keyframe **offset/gecikme** ("savrulan kuyruk" pratik tekniği = kuyruk keyframe'lerini birkaç kare geciktir). Doğrulanan kısayolları not düş.

- [ ] **Step 3 — Scaffold + manifest:** `weeks/week4.js` oluştur (`export const week4 = { title: "04 · Ağırlık ve Canlılık", slides: [] }`). `weeks/manifest.js`'e satır ekle: `{ key: 'week4', label: '04 · Ağırlık ve Canlılık' }` (week3 satırından sonra, `default` EKLEME — week1 default kalır).

- [ ] **Step 4 — Section A · Kanca slaytları:**
  - `1 acilis` (hero) — title "Ağırlık ve Canlılık", subtitle "Hareketli Grafik Tasarımı · 4. Hafta · Ağırlık & Canlılık". notes: W3'te eğrinin karakteri öğrenildi → bu hafta eğriyi tek cisme (bouncing ball) uygulayıp 4 ilkeyle canlandırmak.
  - `2 bu-hafta` (standard, category "Yol Haritası") — yol haritası: graph'ı bir cisme uygula + 4 ilke (squash & stretch · anticipation · follow-through · arcs). notes: 2 saat, klasik bouncing ball egzersizi, sonda ödev köprüsü.
  - `3 ayni-dusus-iki-his` (standard, category "Kanca") — mekanik vs canlı düşüş: neden biri ölü biri canlı. `.yt-embed` 📹 `haa7n3UGyDc`. notes: videoyu sınıfta aç (S&S animasyonla), sonra "fark = ağırlık + S&S" vurgusu.
- [ ] **Step 5 — Lint + commit:** `node bin/lint-deck.mjs` → 0 hata (manifest→dosya, id benzersiz, her slaytta notes). Commit:
```bash
git add weeks/week4.js weeks/manifest.js
git commit -m "week4: scaffold + manifest + Section A (kanca)"
```

### Task 3: Section B — Spacing + Squash & Stretch (slides 4-6)

**Files:** Modify `weeks/week4.js`

- [ ] **Step 1 — Slaytlar:**
  - `4 spacing-agirlik` (standard, category "Spacing") — spacing = ağırlığın dili: dipte seyrek/tepede sık, çarpışmaya giriş > çıkış (W3 köprüsü). 🖼️ inline SVG spacing chart (top dizisi, aralıklar tepede sık dipte açık). Ops. 🔗 timing `BarOk2p38LQ`. notes: W3 spacing'i hatırlat, ağırlığa bağla.
  - `5 squash-stretch` (standard, category "İlke") — hacim korunur (volume conservation): ezilince yayılır, hızlanınca uzar. 🖼️ inline SVG/CSS S&S poz dizisi (normal → squash → stretch). İlke izi: `<span class="mg-trace" lang="en">squash &amp; stretch</span>`. notes: top hacmi sabit, en sık acemi hatası = hacim kaçağı.
  - `6 ae-squash-stretch` (standard, category "After Effects", `.ae-demo`) — AE'de S&S: Scale → **Separate Dimensions** + **Anchor Point** (temas noktasına). 🔗 "izle ▶" `3RqoUMz3-8I`. notes: Anchor Point'i tabana al ki ezilme zeminden olsun.
- [ ] **Step 2 — Lint + kontak föy ara-bakış:** `node bin/lint-deck.mjs` → 0 hata. `bin/screenshot.sh week4` → `_contact/contact-week4.png` (B slaytları fit + inline SVG'ler net mi). Commit:
```bash
git add weeks/week4.js && git commit -m "week4: Section B (spacing + squash & stretch)"
```

### Task 4: Section C — AE'de bouncing ball (slides 7-9)

**Files:** Modify `weeks/week4.js`

- [ ] **Step 1 — Slaytlar:**
  - `7 bouncing-kurulum` (standard, category "After Effects", `.ae-demo`) — kurulum: top + zemin + düşüş Position keyframe (W3 keyframe köprüsü). `.ae-demo__steps` adımları (Anchor Point, Position keyframe, zemin solid). notes: en yalın hal, easing yok daha.
  - `8 graph-agirlik` (standard, category "Graph Editor") — graph'la ağırlık: dibe hızlanma (ease-in) + her sekmede enerji kaybı = alçalan tepe. 🖼️ inline SVG value/speed graph şeması (alçalan tepeler). notes: W3 graph editor'ü hatırlat (Shift+F3), ağırlık = dibe sertleşen eğri.
  - `9 ss-carpisma` (standard, category "Sentez") — S&S'i çarpışmaya ekle: temas karesinde yatay ezilme flash (1-2 kare). `.yt-embed` 📹 `fKnwxQVedbs` (bouncing ball + graph editor). notes: ezilme yalnız temas anında, sonra geri stretch; videoda graph + S&S birlikte.
- [ ] **Step 2 — Verify:** lint 0; `bin/screenshot.sh week4` → slayt 9 embed + 7/8 `.ae-demo`/SVG fit. Commit:
```bash
git add weeks/week4.js && git commit -m "week4: Section C (AE bouncing ball)"
```

### Task 5: Section D — Canlılık katmanı (slides 10-13)

**Files:** Modify `weeks/week4.js`

- [ ] **Step 1 — Slaytlar:**
  - `10 anticipation` (standard, category "İlke") — hareketten önce ters yön (yaylanma/hazırlık). `.yt-embed` 📹 `F8OtE60T8yU`. İlke izi: `<span class="mg-trace" lang="en">anticipation</span>`. notes: zıplamadan önce hafif çömelme = anticipation; izleyiciyi hazırlar.
  - `11 follow-through` (standard, category "İlke") — savrulan kuyruk/uzantı gecikmeli durur (overlapping action); AE pratiği = kuyruk keyframe'lerini birkaç kare **offset**. 🔗 "izle ▶" `4OxphYV8W3E`. İlke izi: `<span class="mg-trace" lang="en">follow through / overlapping</span>`. notes: ana cisim durunca uzantı bir-iki kare sonra durur; offset keyframe tekniği.
  - `12 arcs` (standard, category "İlke") — doğal hareket yay çizer (W3 motion path köprüsü). `.yt-embed` 📹 `I1_tZ9LhJD4`. İlke izi: `<span class="mg-trace" lang="en">arcs</span>`. notes: düz çizgi = robotik; yay = doğal; W3 motion path'i hatırlat.
  - `13 abarti-dengesi` (standard, category "Denge") — abartı dengesi (exaggeration balance): "her harekete S&S/abartı uygun mu?" — bağlam ve ölçü. notes: UI'da az, karakter/MG'de cömert; aşırı abartı = ucuz his.
- [ ] **Step 2 — Verify:** lint 0; kontak föy → D slaytları fit, embed'ler + mg-trace chip'leri görünür. Commit:
```bash
git add weeks/week4.js && git commit -m "week4: Section D (canlılık: anticipation · follow-through · arcs)"
```

### Task 6: Section E — Sentez + kapanış (slides 14-19)

**Files:** Modify `weeks/week4.js`

- [ ] **Step 1 — Slaytlar:**
  - `14 his-sozlugu` (standard, category "Sentez") — 4 ilke recap tek bakışta (his sözlüğü). Dört ilkenin toplu `mg-trace` izi (kümülatif harita): `squash & stretch · anticipation · follow through / overlapping · arcs` (her biri `<span class="mg-trace" lang="en">…</span>`). notes: bu hafta eklenen 4 ilke; W1 12-ilke haritasının dolan kısmı.
  - `15 hatalar` (standard, category "Acemi Hataları") — hacim kaçağı · linear düşüş · simetrik sekme · aşırı S&S. notes: en sık 4 hata, her birinin "neden ölü" sebebi.
  - `16 cheatsheet` (standard, category "Cheatsheet", `.cheat-grid`/`.cheat-group`) — **Anchor Point** (Y) · Scale → **Separate Dimensions** · **Graph Editor** (Shift+F3) · **Easy Ease** (F9) · **offset keyframe** (savrulan kuyruk). week3 `cheat-*` desenini izle (L308). notes: ders sonu hızlı referans.
  - `17 ilham` (standard, category "İlham") — character/MG motion ilhamı. `.yt-embed` 📹 `uDqjIdI4bF4` (Full Series, recap/ilham). notes: tüm 12 ilkeyi tek videoda topla, W4'ün 4'ünü bağla.
  - `18 odev` (standard, category "Haftalık Ödev", `.mg-task`/`.mg-list`) — logo noktası/ikonla bouncing ball + savrulan kuyruk → MP4. week1/week3 `.mg-task` desenini izle, teslim chip'leri. notes: W2-W3 logosu sürekliliği; basit objeyle de olur.
  - `19 odev-kaynaklar` (standard, category "Kaynaklar", ops.) — linkli kaynak şeridi (Alan Becker serisi, AE bouncing ball tutorial'ları). week3 `odev-kaynaklar` desenini izle. notes: pacing kısıtlıysa bu slayt kırpılabilir (üst sınır ~20).
- [ ] **Step 2 — Verify:** lint 0 (notes hepsinde, em-dash gövdede yok). `bin/screenshot.sh week4` → 18-19 slayt tek grid, hepsi fit. Commit:
```bash
git add weeks/week4.js && git commit -m "week4: Section E (sentez + ödev + ilke izi recap)"
```

---

## Phase 3 — Doğrulama + temizlik + yayım

### Task 7: Final doğrulama + temizlik + yayım

**Files:** Delete `_bounce-spike.html`, `_bounce-spike.png`

- [ ] **Step 1 — Tam lint:** `node bin/lint-deck.mjs` → 0 hata (4 deste). git423 DEĞİŞMEDİĞİ için cross-repo lint gereksiz; teyit: `git -C ../git423-ders status --short` boş (W4 sızmadı).
- [ ] **Step 2 — Editöryal elle-geçiş** (lint kapsamaz): her slaytta `lang="en"` İngilizce büyük-harf chip/iz'lerde · terim EN-önce · gövdede em-dash yok · `mg-trace` chip'leri lang="en".
- [ ] **Step 3 — Kontak föy:** `bin/screenshot.sh week4` → tüm slaytlar tek grid, hepsi fit (scroll yok), görsel temiz, inline SVG'ler net.
- [ ] **Step 4 — Yerel fit (3 çözünürlük):** `python3 -m http.server 4173`; headless `_capture.html` probe 1366×768 · 1280×720 · 1920×1080 → tüm slaytlar scale≈1/fit, konsol temiz (`v1.3.0`, hata yok), dropdown'da week4 görünür, **tüm `.yt-embed` iframe'leri yükleniyor** (4 embed) + 🔗 link chip'leri tıklanır. (Memory: ≥1280px pencere — 500px tuzağı.)
- [ ] **Step 5 — Spec başarı ölçütü** (`week4.plan.md` §Başarı ölçütü) tek tek geçir: motor + git423 etkilenmez (git status temiz) · lint 0 · tüm slaytlar fit · her slaytta notes · ilke izi (4 chip + recap) · ödev slaytı · tüm embed'ler yüklenir (doğrulanmış ID) · görseller inline SVG (hotlink yok) · manifest satırı doğru.
- [ ] **Step 6 — Temizlik:** `_bounce-spike.*` sil (untracked → git geçmişi etkilenmez):
```bash
git status --short    # _bounce-spike.* untracked teyit
rm _bounce-spike.html _bounce-spike.png
```
- [ ] **Step 7 — Yayım (push = canlı · git407 only · Emre onayıyla):**
```bash
git add weeks/week4.js weeks/manifest.js styles/main.css weeks/week4.plan.md weeks/week4.tasks.md
git commit -m "week4: Ağırlık & Canlılık destesi canlı (~19 slayt, motorsuz)"
git push    # push = canlı rebuild ~12 sn — Emre onayı bekle
```
PDF handout (ops.): `bin/pdf.sh week4` → `_pdf/deck-week4.pdf`.

---

## Self-review (writing-plans)

**1. Spec coverage:** kanca A(T2) · spacing+S&S B(T3) · bouncing ball C(T4) · canlılık D(T5) · sentez+ödev E(T6) · `.yt-embed` CSS(T1) · medya doğrulama(T2.1) · AE doğrulama(T2.2) · ilke izi 4 inline chip + recap(T3/T5/T6) · `_bounce-spike.*` temizlik(T7.6) · motor/git423 değişmez(Global + T1.2/T7.1) · lint(her T) · görsel=inline SVG(T3/T4) · pacing 4-embed kararı(slide map). ✓ boşluk yok.

**2. Placeholder scan:** slayt prose (Türkçe gövde) yazımda üretilir = içerik-üretim adımı, placeholder değil (build-less deste = deliverable; her slaytın id/type/teaching-point/media/notes-yönü verildi). `.yt-embed` CSS tam kod (T1). Inline SVG diyagramlar (spacing/S&S/graph) week1 `.mg-bezier` SVG desenini izler — şekil yazımda çizilir. Embed markup kontratı T1'de tam verildi.

**3. Type/isim tutarlılığı:** `.yt-embed` + `.yt-embed iframe` her görevde aynı · `week4` key/export/manifest hizalı (`04 · Ağırlık ve Canlılık`) · `mg-trace` chip 4 ilke için tutarlı string (`squash & stretch` · `anticipation` · `follow through / overlapping` · `arcs`) · video ID'leri slide map ↔ task'larda aynı · ENGINE_VERSION dokunulmaz (1.3.0) her yerde.
