# Week 3 · Graph Editor — Tasarım Spec'i

**Ders:** H3 · "Hareketin Karakteri" · 2 saat · ~27 slayt
**Reçete:** `DESTE_KILAVUZU.md` (şema · dil/ton · editöryal · lint kapısı · §9 motor)
**Çıktı:** (1) motor bileşeni `MotionDemo` (`scripts/main.js`) · (2) `weeks/week3.js` + `manifest.js` satırı `{ key: 'week3', label: '03 · Graph Editor' }`
**Durum:** brainstorm onaylı (2026-06-15) — interaktiflik **tam paket** + **motor bileşeni** dahil → yazım bekliyor

---

## Sabitlenen kararlar
- **Omurga = hibrit:** öğretim **taze basit obje** üzerinde (bir daire/nokta, sol→sağ; W4'te "top" olur), kapanış **coda**'da öğrencinin **W2 logosuna** uygulanır.
- **Doluluk = beat-güdümlü ~27 slayt** (derinlik + interaktiflik). Sayı hedef değil.
- **Motion path dahil** (hafif — arcs).
- **Pedagoji:** saf-kavram + birleşik-demo (katı 1:1 değil).
- **İnteraktiflik = tam paket** (Katman 1 reveal + 2 dış medya + 3 canlı demo).
- **Canlı demolar = motor bileşeni** (`MotionDemo`), week3-özgü içerik `week3.js`'te.
- **Ferahlık kuralı:** interaktiflik **ayrı temiz slaytlarda** (inline kalabalık DEĞİL — W1'de easing balonları bu yüzden kaldırılmıştı; hiza/okunabilirlik/ferahlık önce).

## Motor bileşeni — `MotionDemo` (cross-repo, reçete §9)
- **Konum:** `scripts/main.js` (PresentationEngine + Lightbox yanına). **Deklaratif**, `Lightbox` desenini izler: her slayt render'ından sonra `[data-motion-demo]` elemanlarını **hydrate** eder.
- **İki mod** (`data-motion-demo="playground|race"`):
  - `playground` — sürüklenebilir cubic-bezier handle'ları + eğriyle hareket eden nokta + replay; `data-bezier="x1,y1,x2,y2"` başlangıç.
  - `race` — N easing aynı anda yan yana nokta yarışı; `data-easings="linear,ease,overshoot"` (ya da bezier listesi), tıkla/loop.
- **Build'siz** (vanilla JS + SVG/CSS, bağımlılık yok). **Generic** (animasyon dersi geneli → git423 de kullanabilir).
- **Yayım:** `ENGINE_VERSION` bump → `bin/sync-engine.sh` git423'e dağıt → iki `index.html`'de `main.js?v=` cache-bust. **git423 paritesi korunur** (yeni modül opsiyonel; eski desteler etkilenmez).

## İskelet (sıra = sunum sırası) — 🔵 reveal · 🟢 MotionDemo
### A · Kavrayış zemini
1. **Hareketin Karakteri** — `hero`
2. **Bu hafta** (yol haritası) — —
3. **Ara kareler & spacing** (timing vs spacing) — `kavram`
4. 🔵 **Tartışma:** "Aynı sürede A→B giden iki top — biri canlı, biri ölü. Fark ne?" — `reveal`

### B · Eğriyi OKUMA
5-6. **Graph'ı aç + Easy Ease eğrisini gör** (W2 köprüsü) — `kavram→demo`
7. **Value graph oku** (değer doğrudan; düz = sabit) — `kavram`
8. **Speed graph oku** (yükseklik = hız; dipte düz = durağan) — `kavram`
9. 🔵 **Tartışma:** "Bu speed graph hangi harekete ait?" — `reveal`
10-11. **Keyframe tipleri + ikonlar** (Linear/Bezier/Auto/**Hold**) — `kavram→demo`

### C · Eğriyi ŞEKİLLENDİRME
12-13. **Eğriyi elle** (slow in/out + bezier handle + influence%) — `kavram→demo`
14. 🟢 **OYNA — bezier playground** (handle çek → nokta canlı; `MotionDemo playground`) — `kavram` · `slide-fill`
15-16. **Overshoot** (%100 ötesi = snappy/exaggeration) — `kavram→demo`
17. 🔵 **Tartışma:** "Overshoot her işe uygun mu?" — `reveal`
18. **Eğri → his sözlüğü** (linear=mekanik · ease-out=iner · ease-in=yaylanır · overshoot=enerjik) + Katman 2 medya — `kavram`

### D · Uzamsal + sentez
19-20. **Motion path = arcs** (uzamsal eğri) — `kavram→demo`
21. 🟢 **CANLI 3-easing yarışı** (linear/Easy Ease/overshoot; `MotionDemo race` + W1 bezier SVG) — `karşılaştırma` · `slide-fill`
22. **demo:** aynı hareketi AE'de 3 easing'le kur — `demo`
23. **Kendi logona uygula** — coda

### E · Kapanış
24. **Acemi hataları** (linear bırakmak · aşırı-overshoot · speed graph'ı görmezden gelmek) — `standard`
25. **Cheatsheet** (Shift+F3 · handle tipleri · convert vertex · X/Y separate) — `standard`
26. **İlham** (snappy motion design — Katman 2: YouTube embed/link) — `standard`
27. **Haftalık Ödev** (aynı hareket × 3 easing → MP4) — `mg-task`

## Uyulacak kurallar (reçeteden)
- dil/ton **hitapsız-passive**; terim **EN-önce**; em-dash **yalnız** kod yorumunda; `lang="en"` İngilizce büyük-harf chip/iz'lerde
- her slaytta **`notes`** (baştan)
- **ilke izi:** W1'in 12-ilke slaytında `slow in/out · timing & spacing · arcs · exaggeration` işaretlenir
- **lint 0-hata** + **kontak föy** doğrulaması push öncesi · **push = canlı** → yarım deste push'lanmaz

## Reuse
- Motor: **yeni `MotionDemo`** (playground + race) · W1 `.mg-bezier` SVG · W2 `.ae-demo`/`.ae-menu`/`.ae-kbd`/`.cheat-*`/`.mg-trace`

## Yapım sırası (fazlar — writing-plans bunu açar)
1. **Faz 1 — `MotionDemo` motor bileşeni:** yaz · ENGINE_VERSION bump · iki repoda headless doğrula · `sync-engine.sh` + cache-bust · git423 paritesi.
2. **Faz 2 — `week3.js` deste:** 27 slayt içerik (kavram + AE demo + notes + ilke izi + reveal Q/A + MotionDemo örnekleri + medya) · manifest satırı · lint + kontak-föy + yerel fit doğrulaması.

## Açık kalemler (yazımdan önce / sırasında)
- **AE 2025 doğrulama** (helpx): Graph Editor (Shift+F3) · value↔speed graph · keyframe interpolation menüsü · Hold (Ctrl/Cmd+Alt+klik) · Separate Dimensions · Convert Vertex · Easy Ease (F9)
- **Dış medya gerçekliği:** "dışarıdan görüntü" pratikte = YouTube embed/link (mevcut işler) + birkaç saf-CSS mikro demo; **özel mp4 loop = AE render gerektirir** (sen üretirsin / sonraya). Lightbox şimdilik resim-only (video = Faz 1).
- "Daire/nokta" obje seçiminin onayı (W4 topuna köprü)
- `MotionDemo` görsel dili (Motion Studio paletine uyum) — Faz 1'de netleşir

## Başarı ölçütü
- `MotionDemo` iki repoda da çalışır · git423 eski desteleri **etkilenmez** (parite) · cache-bust + ENGINE_VERSION güncel
- lint 0 hata · tüm slaytlar fit (scroll yok) · kontak föy temiz · her slaytta `notes` · ilke izi güncel · ödev + reveal + canlı demo slaytları çalışır · manifest satırı doğru
