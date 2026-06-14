# DESTE KILAVUZU — sunum sistemi (git407 + git423)

> Kanonik ev: **git407**. Motor (`scripts/main.js`) iki sitede **birebir aynı**;
> `bin/sync-engine.sh` git407 → git423-ders dağıtır. Bu kılavuz da git407'de
> yaşar (referans). **Motoru deste için DÜZENLEME** — derse-özgü her şey
> derse-özgü CSS/hook/`html`'de durur; çekirdek şema ortak kalır.
>
> İki sitede de **push = canlı** (GitHub Pages `main`/kök). Yarım deste push'lanmaz.

---

## 1. Bir deste = bir dosya + bir manifest satırı

```
weeks/week3.js          # desteyi yaz (aşağıdaki şema)
weeks/manifest.js       # 1 satır ekle:  { key: 'week3', label: '03 · …' }
```

`weekN.js` şu kalıbı export eder — motor `module[weekN]` ile okur:

```js
export const week3 = {
    title: "03 · Deste Başlığı",
    slides: [ /* slayt nesneleri (sıra = sunum sırası) */ ],
};
```

Manifest = motorun import ettiği **tek siteye-özgü** dosya (dropdown + varsayılan
oradan gelir). `default: true` olan deste ilk açılışta gösterilir (tam bir tane).

---

## 2. Slayt şeması (motorun okuduğu alanlar)

| alan | zorunlu | açıklama |
|---|---|---|
| `id` | ✓ | benzersiz; `id="slide-<id>"` ve nav noktası anahtarı olur. kebab-case. |
| `title` | ✓ | slayt başlığı (`<h2 class="slide-title">`). |
| `type` | — | `hero` · `standard` (varsayılan) · `reveal`. yoksa `standard`. |
| `category` | standard/reveal | başlık üstü küçük etiket (`.slide-category`). varsayılan "Konu". |
| `subtitle` | hero | hero alt başlığı (`.slide-subtitle`). |
| `question` | reveal | tıkla/Space ile cevap açılmadan önce gösterilen soru. |
| `html` | ✓ (çoğu) | gövde içeriği. hero'da başlık altı, reveal'de açılan içerik, standard'da gövde. |
| `className` | — | ekstra sınıf(lar). örn. `slide-fill` = etkileşimli/tam-alan slayt (scale-to-fit uygulanmaz). |
| `notes` | — | **sunucu notları** (bkz. §3) — presenter modu için; içeriği ekranda görünmez. |
| `onRender` | — | `(slideEl) => {}` slayt DOM'a basıldıktan sonra çalışır (etkileşim bağla). |
| `onReveal` | — | `(slideEl) => {}` reveal slaytı açıldığında çalışır. |

**type davranışları:**
- `hero` — büyük açılış; `title` + `subtitle?` + `html?`.
- `standard` — `category` + `title` + `html` (başlık bloğu + gövde).
- `reveal` — `category` + `title` + `question` görünür; tıkla/Space → `html` (cevap) açılır + `onReveal` çalışır. Soru-tartışma slaytları için.

**Motor kuralı:** motor `html`'i olduğu gibi basar (kaçışsız) — içerik güvenilir
(senin yazdığın deste). Slaytlar **dikeyde ortalı + scale-to-fit** (asla scroll);
çok uzun içeriği `slide-fill` ile değil, **böl** (iki slayt). Mobilde (≤820px)
CSS scroll moduna düşer.

---

## 3. `notes` — sunucu notları (BAŞTAN yaz)

Her slayta `notes` ekle; presenter modu (yol haritası Faz 1) bunu yan pencerede
gösterecek. **15 desteye sonradan not eklemek pahalı** → desteler baştan notlu
yazılsın.

```js
{
    id: "keyframe",
    title: "Keyframe Nedir",
    category: "Temeller",
    html: `…`,
    notes: "Zaman + değer çifti. Tahtada 2 keyframe arası 'ara kareler motoru üretir' vurgusu. Easy Ease'e köprü.",
}
```

Notlar kısa, anlatım-tetikleyici (slaytı okuma — slaytın *etrafını* söyle).

---

## 4. Editoryal çizgi (git407 + git423 ORTAK)

- **Terim İngilizce-önce:** ilk geçişte İngilizce + parantez TR (örn. "keyframe
  (anahtar kare)"); sonra İngilizce.
- **Em-dash (—) yalnız kod yorumunda**; gövde metninde kullanma.
- **Düz başlık** (Title Case zorlama yok; cümle düzeni doğal).
- **`lang="en"`** İngilizce büyük-harf chip/iz/etiketlere ŞART — TR locale `i→İ`
  yapar ("EASING" → "EASİNG"). Örn: `<span class="mg-trace" lang="en">TIMING</span>`.
- AE menüleri İngilizce (`.ae-menu`) + TR açıklama; kısayollar `.ae-kbd`.

---

## 5. Adlandırma

**Kural:** `weekN.js` === **N. hafta**. Manifest etiketi numara-önekli ("03 · …").

> ⚠ **git423 bilinçli istisnası (geçici):** git423-ders'te şu an `week1.js` =
> "2. Hafta" (bir kayma var). Hizalama, **portal↔Pages yüzey-geçişi adımında**
> yapılacak (o ana kadar canlı linkleri/kayıtları kırmamak için dosya anahtarları
> korunuyor). git407 kuralına uyar; git423 yeni desteleri de kayma çözülene dek
> mevcut deseni izler.

---

## 6. Medya kuralı

- **Kısa döngü / sessiz gösterim** (≤ ~10 sn, örn. bir AE efekti): repo-içi
  `mp4`/`webm`, **boyut sınırı ~3 MB** (Pages + git şişmesin). `assets/` altında.
- **Uzun / sesli içerik** (eğitim videosu, ilham işi): **YouTube unlisted embed**
  ya da link — repoya koyma.
- **Lightbox** bugün yalnız **resim** açıyor (`data-lightbox` + `<img>`). Video
  lightbox'ı yol haritası Faz 1 (medya kuralının önkoşulu) — gelene dek video =
  embed/link, lightbox'a sokma.

Resim lightbox kullanımı:
```html
<img src="…" alt="…" data-lightbox data-lightbox-caption="açıklama">
```

---

## 7. Kod-blok deseni

Kodu gösteren slaytlarda tutarlı sınıflar (week2 deseni standart):
- **AE arayüzü/akışı (git407):** `.ae-menu` (EN menü) · `.ae-kbd` (kısayol) ·
  `.ae-flow` · `.ae-demo` · `.ae-ui-mock` (panel maketi) · `.cheat-*` (cheatsheet).
- **Kod → çıktı (git423):** `.html-kod` (kaynak) + `.html-cikti` (tarayıcı
  görünümü) yan yana; `vcd-*` + `playgrounds.css` yardımcıları.
- Inline terim izi: `.mg-trace` / chip → İngilizce ise `lang="en"`.

Syntax-highlight: şimdilik **elle** (`<span class="t">` token sınıfları);
otomatik highlighter eklenmez (build'sizlik korunur) — ihtiyaç doğarsa Faz 1.

---

## 8. Deste checklist (push öncesi)

- [ ] **`node bin/lint-deck.mjs`** → 0 hata (sibling: `bin/lint-deck.mjs ../git423-ders`).
      Otomatik kontrol: şema (`id` benzersiz + zorunlu alanlar) · `notes` eksiği ·
      em-dash (gövde, toplu). `--strict` = uyarılar da kapı · `--quiet` = yalnız hata.
- [ ] `weekN.js` şemaya uygun (↑ lint ✓) · her slaytta `notes` (↑ lint uyarır).
- [ ] editoryal **elle**: İngilizce-önce · `lang="en"` chip/iz'lerde (lint *kapsamaz* —
      EN/TR ayrımı güvenilmez, yanlış-pozitif riski) · em-dash yalnız kod-yorumunda.
- [ ] `manifest.js`'e satır eklendi (doğru `label`, gerekiyorsa `default`).
- [ ] medya kuralına uyuldu (boyut/embed).
- [ ] yerel doğrula: `python3 -m http.server 4173` → tüm slaytlar fit, dropdown +
      varsayılan doğru, deep-link/kayıt çalışıyor.
- [ ] motor değiştiyse: `bin/sync-engine.sh` ile git423-ders'e dağıt + iki repoyu
      **ayrı** commit/push (push = canlı).
- [ ] commit dikkatli (push = canlı rebuild ~12 sn).

---

## 9. Motor (paylaşılan — değiştirme dikkatli)

`scripts/main.js` = `PresentationEngine` + `Lightbox`. **Kanonik kopya git407'de.**
- `ENGINE_VERSION` damgası var → değişince **bump et** + `sync-engine.sh` çalıştır
  + iki `index.html`'deki `main.js?v=…` cache-bust'ı güncelle.
- localStorage anahtarı **site-namespace'li** (`<site>_sunum_slide_<week>`,
  `location.pathname`'den) → iki site çakışmaz, sıfır-konfig.
- Dropdown + varsayılan **manifest'ten** üretilir; `index.html`'deki `<select>`
  boştur (motor doldurur).
