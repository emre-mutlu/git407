# CSS Katmanlama · Tasarım (Spec)

- **Tarih:** 2026-06-20
- **Durum:** brainstorming tamam · tasarım onaylandı (3 bölüm) · uygulamaya hazır
- **Bağlam notu:** [../notes/2026-06-20-css-katmanlama-context.md](../notes/2026-06-20-css-katmanlama-context.md) (RESUME + repo uyarısı + file:line haritaları)

## 1. Amaç + kapsam

İki canlı deck sitesinin (git407 · git423-ders) GERÇEKTEN ortak, motor-bağlı, token-free CSS mekaniğini tek bir `styles/engine.css`'e al. Motor (`scripts/main.js`) zaten byte-identical paylaşılıyor; CSS'in motor-bağlı mekanik kısmı da aynı modelle paylaşılsın (DRY), iki sitenin kimliği + canlı görünümü bozulmadan.

**Dar kapsam (motor-bağlı).** Animasyon stratejisi · grid/flex layout · slide yapısı · nav · atmosfer/chrome · `.vcd-*` · view-transition · reveal · presenter-panel GÖRÜNÜMÜ birleştirilmez (iki sitede kasıtlı farklı; birleştirmek kimliği değiştirir).

### engine.css'e girme testi (üç koşul, AND)
Bir kural ancak üçü birden doğruysa engine.css'e girer:
1. İki sitede mekanik olarak birebir özdeş.
2. Motor-bağlı / yapısal (kuralı kaldırınca motor bozulur; sadece görünüm değişmiyor).
3. Aynılaştırmak hiçbir sitenin kimliğini/hissini değiştirmiyor.

Biri bile "hayır" ise kural `main.css` temasında kalır.

## 2. engine.css içeriği (kanonik: git407; ~20 satır; sıfır `var(--...)`)

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

Token-free doğrulandı: dört blok da `var(--...)` içermez. Görünüm/token kullanan her property (background · border · color · font-family · box-shadow · radius · padding · genişlik) temada kalır.

## 3. main.css'lerden silinecek (tam satırlar)

| Blok | git407 `styles/main.css` | git423-ders `styles/main.css` |
|---|---|---|
| reset | 52 | 39-43 |
| `.sr-only` | 68-71 | 62-71 |
| `.presenter-thumb__slide` | 368-375 | 1053-1059 |
| `@media print {.presenter-panel}` | 376 | 1061 |

Not: git423-ders `.sr-only`'sinde `white-space:nowrap` yoktu; engine kanonik formu nowrap içerdiği için git423 bu davranışı kazanır (görünmez içerik, zararsız + doğru). git407 `.sr-only` `clip: rect(0 0 0 0)` boşluklu formu kanoniktir (git423'ün virgüllü formu eşdeğer, engine boşluklu forma birler).

## 4. Yükleme (iki index.html), engine ÖNCE

```html
<link rel="stylesheet" href="styles/engine.css?v=1.3.0">
<link rel="stylesheet" href="styles/main.css">
```

- git407: mevcut `main.css` link'inden (satır 13) önce engine.css eklenir.
- git423-ders: mevcut `main.css` link'inden (satır 14) önce engine.css eklenir; `playgrounds.css` (satır 15) en sonda kalır.
- **Sıra:** engine (yapısal temel) → main (tema) → playgrounds. Tema engine'i override edebilsin.
- **Cache-bust:** `?v=ENGINE_VERSION` (mevcut `scripts/main.js?v=1.3.0` deseninin aynısı). `main.css`'e dokunulmaz.

## 5. Altyapı

### sync-engine.sh genişletmesi
- Tek-dosya mantığı dosya listesine çevrilir: `scripts/main.js` + `styles/engine.css`. Her ikisi için diff + drift raporu + kopyalama (mevcut `--check` / `--force` / sor davranışı korunur, iki dosyayı kapsar).
- Version stamp yine `ENGINE_VERSION`'dan (motor + engine.css tek sürüm; engine.css'in ayrı versiyonu yok).
- Hedef yine `../git423-ders` (Astro `git423` DEĞİL).

### Sürüm kuralı
engine.css veya motor değişirse `ENGINE_VERSION` bump edilir (3 yer elle: `main.js` sabiti · `main.js?v=` · `engine.css?v=`). Sebep: cache-bust + drift görünürlüğü. `sync-engine.sh --check` engine.css drift'ini de yakalar (pre-push güvenlik).

### Etkilenmeyen
`bin/lint-deck.mjs` CSS'e bakmaz (doğrulandı) → etkilenmez.

## 6. Geçiş (site-site ritmi)

1. git407'de `styles/engine.css` oluştur (§2).
2. git407 `main.css`'ten 4 bloğu sil (§3).
3. git407 `index.html`'e engine.css `<link>` ekle (§4).
4. **git407 doğrula:** headless `_capture` 3 çözünürlük + `?presenter=1` (thumb + panel render) + reset/sr-only sonrası layout sağlam. Görsel kanıt üret, Emre gözle onaylar.
5. `sync-engine.sh` ile engine.css'i git423-ders'e kopyala.
6. git423-ders `main.css`'ten 4 bloğu sil (§3).
7. git423-ders `index.html`'e `<link>` ekle (§4).
8. **git423-ders doğrula:** aynı kontroller + sr-only nowrap kazanımı zarar vermiyor.
9. İki repo ayrı commit + push (push=canlı; Emre onayından sonra).

## 7. Riskler + değişmezler

- İki canlı site (push=canlı) → regresyon = canlı bozulma. Her adımda iki çözünürlükte önce/sonra görsel doğrulama. Emre'de son söz ("test yapma ben kontrol ediyorum").
- reset engine'de ilk yüklenir (sıra: engine→main) → global layout korunur.
- Build-siz felsefe korunur (sade `<link>`, derleme yok).
- Em-dash yasak (· : ; , kullan).
- İlgili memory: css-katmanlama-bekliyor · git407-git423-css-ayri-sistem · headless-chrome-dogrulama-git407.

## 8. Doğrulama kriterleri (definition of done)

- [ ] `engine.css` iki repoda byte-identical (`sync-engine.sh --check` temiz).
- [ ] İki sitede de presenter modu (`?presenter=1`) thumb önizleme + panel çalışıyor.
- [ ] reset/sr-only silindikten sonra iki sitede genel layout regresyonsuz (3 çözünürlük).
- [ ] `@media print` görünümü korunuyor (presenter gizli).
- [ ] `lint-deck.mjs` iki sitede temiz.
- [ ] Emre gözle onay (push öncesi).
</content>
</invoke>
