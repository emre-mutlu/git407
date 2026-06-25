# Week 4 · Ağırlık & Canlılık — Tasarım Spec'i

**Ders:** H4 · "Ağırlık & Canlılık" · 2 saat · ~20 slayt
**Reçete:** `DESTE_KILAVUZU.md` (şema · dil/ton · editöryal · lint kapısı · §6 medya · §9 motor)
**Çıktı:** `weeks/week4.js` + `manifest.js` satırı `{ key: 'week4', label: '04 · Ağırlık ve Canlılık' }`
**Durum:** brainstorm onaylı (2026-06-24) — **canlı JS/interaktif YOK** + **harici medya (YouTube/görsel) ile öğretim** → yazım bekliyor

---

## Sabitlenen kararlar (brainstorm 2026-06-24)
- **Kapsam = sıkı/odaklı (~20 slayt).** week3 yoğunluğu; 4 ilke + tek klasik egzersiz (bouncing ball). 2 saate rahat sığar.
- **İçerik akışı git423 ile ortak** (kavram → referans → recap; sonda hatalar/cheatsheet/ilham/ödev). Reçete zaten ortak ve git407'de yaşıyor.
- **CANLI JS / İNTERAKTİF YOK.** Ne bounce demo, ne `MotionDemo` widget, ne `reveal` (tıkla→cevap) slaytı. Tüm öğretim **statik slayt + harici medya** üzerinden. (Önceki `_bounce-spike.html` prototipi iptal → silinir.)
- **Motora DOKUNULMAZ** → `scripts/main.js` değişmez, `ENGINE_VERSION` bump YOK, `sync-engine.sh` YOK, **git423'e sızma yok**. (W4'ün hiçbir parçası motor gerektirmiyor.)
- **Harici medya = YouTube embed + görsel.** Telif/lisans **takılmıyor** (Emre: "sadece derste kullanacağım" — sınıf-içi gösterim). Yine de her link **teknik olarak doğrulanmış** (oEmbed HTTP 200 + embed açık); ölü/embed-kapalı link girmez.
- **Omurga:** W3'te *graph editor* (eğrinin karakteri) öğrenildi → W4 bunu **tek egzersize** uygular: klasik bouncing ball. Top boyunca 4 ilke katmanlanır; kapanış codası **ödeve (logo noktası)** köprü.
- **"Rig" hafif:** klasik bouncing-ball + basit kuyruk uzantısı; gerçek rig/parenting = H7 (çakışma yok).

## İlkeler (ilke izi `mg-trace`, W1 12-ilke slaytını kümülatif doldurur)
`squash & stretch` · `anticipation` · `follow-through / overlapping` · `arcs` (W3'ten W4'e taşındı)

---

## Doğrulanmış medya (oEmbed HTTP 200 · 2026-06-24)
**Alan Becker · 12 Principles of Animation** (AlanBeckerTutorials — her ilkeyi animasyonla gösterir):
| ilke | video ID | başlık |
|---|---|---|
| Squash & Stretch | `haa7n3UGyDc` | 1. Squash & Stretch |
| Anticipation | `F8OtE60T8yU` | 2. Anticipation |
| Follow Through & Overlapping | `4OxphYV8W3E` | 5. Follow Through & Overlapping Action |
| Arcs | `I1_tZ9LhJD4` | 7. Arcs |
| Timing | `BarOk2p38LQ` | 9. Timing |
| Full Series (ilham/recap) | `uDqjIdI4bF4` | 12 Principles of Animation (Official Full Series) |

**AE-spesifik bouncing ball** (graph editor = W3 köprüsü):
| konu | video ID | başlık · kanal |
|---|---|---|
| Bouncing ball + graph editor | `fKnwxQVedbs` | Realistic Bouncing Ball Using Graph Editor · Motion Made |
| Bouncing ball (alternatif) | `ufnVabtMcIo` | Tutorial - Bouncing Ball After Effects · Arthur Siqueira |
| AE'de Squash & Stretch | `3RqoUMz3-8I` | Squash and Stretch in After Effects · Motifize |

**Görseller (🖼️):** statik diyagram gereken yerde (bouncing-ball spacing chart, S&S poz dizisi, arc şeması). İmplementasyonda internetten indirilip `images/`'e konur (git423-ders deseni) **veya** Alan Becker videosu zaten o ilkeyi animasyonla gösterdiği için atlanır. Her görsel URL'si yazım sırasında HTTP 200 doğrulanır.

---

## İskelet (sıra = sunum sırası) — 📹 YouTube embed · 🖼️ görsel
### A · Kanca
1. **Ağırlık & Canlılık** — `hero`
2. **Bu hafta** (yol haritası: graph'ı bir cisme uygula + 4 ilke) — `standard`
3. **Aynı düşüş, iki his** (mekanik vs canlı — neden biri ölü biri canlı) — `standard` · 📹 `haa7n3UGyDc`

### B · Spacing + Squash & Stretch (W3 graph köprüsü)
4. **Spacing = ağırlığın dili** (dipte seyrek/tepede sık; çarpışmaya giriş > çıkış) — `standard` · 🖼️ spacing chart (ops. 📹 `BarOk2p38LQ`)
5. **Squash & stretch** (hacim korunur: ezilince yayılır, hızlanınca uzar) — `standard` · 🖼️ S&S poz
6. **AE'de S&S** (Scale → Separate Dimensions + Anchor Point) — `standard` · 📹 `3RqoUMz3-8I`

### C · AE'de bouncing ball
7. **Kurulum** (top + zemin + düşüş Position keyframe) — `standard`
8. **Graph'la ağırlık** (dibe hızlanma/ease-in + her sekmede enerji kaybı = alçalan tepe) — `standard` · 🖼️ value/speed graph şeması
9. **S&S'i çarpışmaya ekle** (temas karesinde yatay ezilme flash) — `standard` · 📹 `fKnwxQVedbs`

### D · Canlılık katmanı
10. **Anticipation** (hareketten önce ters yön = yaylanma) — `standard` · 📹 `F8OtE60T8yU`
11. **Follow-through / overlapping** (savrulan kuyruk/uzantı gecikmeli durur) — `standard` · 📹 `4OxphYV8W3E`
12. **Arcs** (doğal hareket yay çizer — W3 motion path köprüsü) — `standard` · 📹 `I1_tZ9LhJD4`
13. **Abartı dengesi** ("her harekete S&S/abartı uygun mu?" — bağlam/ölçü) — `standard`

### E · Sentez + kapanış
14. **His sözlüğü / 4 ilke recap** (tek bakışta; ilke izi `mg-trace` güncellenir) — `standard`
15. **Acemi hataları** (hacim kaçağı · linear düşüş · simetrik sekme · aşırı S&S) — `standard`
16. **Cheatsheet** (Anchor Point · Scale Separate Dimensions · Graph Editor · offset keyframe) — `standard` · `.cheat-*`
17. **İlham** (character/MG motion) — `standard` · 📹 `uDqjIdI4bF4`
18. **Haftalık Ödev** (logo noktası/ikonla bouncing ball + savrulan kuyruk → MP4) — `.mg-task`
19. (ops.) **Ödev kaynakları** — `standard` (week3 deseni: linkli kaynak şeridi)

> ~18-19 slayt; üst sınır ~20. Pacing'e göre slide 4'teki görsel + 📹, ya da slide 13 kırpılabilir.

---

## Medya embed mekaniği (motor DEĞİŞMEZ — yalnız CSS + html)
- **YouTube:** `html` içinde `<iframe src="https://www.youtube.com/embed/<ID>" ...>` (motor html'i kaçışsız basar). Responsive 16:9 sarmalayıcı için **week4-only `.yt-embed` sınıfı** `styles/main.css`'e eklenir (derse-özgü CSS, reçete kuralına uygun; motor + git423 dokunulmaz).
- Video slaytı sığması: gerekirse `className: "slide-fill"` (scale-to-fit uygulanmaz, tam alan) — DESTE_KILAVUZU §2.
- **Görsel:** repo-içi `images/` + lightbox (`data-lightbox`, resim-only bugün destekli — §6/§9). İnternet görseli indirilip `images/`'e konur (hotlink yok = ders günü kırılmasın).
- **Medya kuralı §6:** video repoya konmaz (YouTube embed); görsel `images/` altında.

## Uyulacak kurallar (reçeteden)
- dil/ton **hitapsız-passive** ("işaretlenir, açılır, seçilir" + mastar); terim **EN-önce** (ilk geçişte TR parantez); em-dash **yalnız** kod yorumunda; `lang="en"` İngilizce büyük-harf chip/iz'lerde
- her slaytta **`notes`** (baştan — presenter modu)
- **ilke izi:** W1'in 12-ilke slaytında `squash & stretch · anticipation · follow-through/overlapping · arcs` işaretlenir
- **lint 0-hata** (`node bin/lint-deck.mjs`) + yerel fit doğrulaması push öncesi · **push = canlı** → yarım deste push'lanmaz

## Reuse
- W2 `.ae-menu`/`.ae-kbd`/`.ae-flow`/`.cheat-*` (AE arayüz/cheatsheet) · `.mg-trace` (ilke izi) · `.mg-task` (ödev) · `.mg-sub`/`.mg-foot`
- **Yeni:** `.yt-embed` responsive video sarmalayıcı (week4-only CSS, `styles/main.css`)

## Temizlik
- **`_bounce-spike.html` + `_bounce-spike.png` SİL** (karar: canlı bounce demo iptal). Untracked → `rm` yeterli, git geçmişi etkilenmez.

## Yapım sırası (fazlar — writing-plans bunu açar)
1. **Faz 1 — `.yt-embed` CSS:** responsive 16:9 embed sınıfı `styles/main.css`'e (week4-only). Motor/git423 dokunulmaz.
2. **Faz 2 — `week4.js` deste:** ~20 slayt içerik (kavram + AE adımları + notes + ilke izi + doğrulanmış YouTube embed + görseller) · `manifest.js` satırı · görsel URL'leri indir+doğrula.
3. **Faz 3 — doğrulama + temizlik:** lint 0 · yerel serve'de tüm slaytlar fit + embed'ler yükleniyor · `_bounce-spike.*` sil · commit (push = canlı, Emre onayıyla).

## Açık kalemler (yazımdan önce / sırasında)
- **AE 2025 doğrulama** (helpx): Scale Separate Dimensions · Anchor Point · Graph Editor (Shift+F3) · keyframe interpolation/Easy Ease (F9) · offset/gecikmeli keyframe ("savrulan kuyruk" için pratik teknik)
- **Görsel ihtiyacı netleşmesi:** her 🖼️ slaytı gerçekten görsel mi istiyor yoksa ilgili Alan Becker videosu yeterli mi (video-ağırlıklı pacing) — yazım sırasında karar.
- **Embed sayısı/pacing:** ~7 video 2 saatlik derste fazla gelirse, bazıları "link" (CTA) olarak verilir, embed yalnız kilit slaytlarda kalır.
- **Ödev codası:** logo noktası/ikon örneğinin tonu (W2-W3 sürekliliği).

## Başarı ölçütü
- Motor + git423 **etkilenmez** (sıfır motor değişikliği; ENGINE_VERSION/sync gerekmez)
- lint 0 hata · tüm slaytlar fit (scroll yok) · her slaytta `notes` · ilke izi güncel · ödev slaytı var
- tüm YouTube embed'leri yüklenir (doğrulanmış ID) · görseller `images/`'ten yüklenir (hotlink yok) · manifest satırı doğru
- `_bounce-spike.*` temizlendi
