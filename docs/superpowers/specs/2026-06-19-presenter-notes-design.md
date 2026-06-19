# Presenter Mode (Konuşmacı Notları) — Tasarım

- **Tarih:** 2026-06-19
- **Proje:** git407 (+ git423-ders; paylaşılan motor)
- **Durum:** Brainstorming onaylandı, implementasyon planı bekliyor

## Problem

Slaytların kodundaki `notes` alanı motorda (`scripts/main.js`) hiç kullanılmıyor.
Eğitmen sunum sırasında bu notları görmek istiyor, ama site öğrencilerle
paylaşıldığı için öğrenciler notları görmemeli.

## Hedef

Tek site, tek link. Eğitmen gizli bir URL ile "presenter" modunu açınca her
slaytın notunu görür; öğrenci normal linkte hiçbir not görmez.

## Gereksinimler

- **R1** — Normal ziyaretçi (öğrenci) hiçbir presenter içeriği görmez; mevcut
  davranış birebir korunur.
- **R2** — `?presenter=1` query parametresi olan URL presenter modunu açar.
- **R3** — Presenter modda her slaytta: o slaytın `notes` metni + slayt sayacı +
  sıradaki slaytın başlığı görünür (gerçek konuşmacı görünümü hissi).
- **R4** — Mod localStorage'a yazılmaz; yalnızca o sekmenin URL'i belirler
  (kazara kalıcılık yok, paylaşılan link temiz).
- **R5** — Panel yalnızca ekranda; `_print.html` / PDF çıktısı etkilenmez.
- **R6** — Notu olmayan slaytta panel zarif davranır ("not yok" gösterimi).

## Tasarım

### Tetikleme
- Açılışta `new URLSearchParams(location.search).get('presenter') === '1'`
  okunarak `presenterMode` bayrağı belirlenir.
- Bayrak kapalıysa panel DOM'a hiç eklenmez / görünmez.

### Görünüm
Slayt alanının altında sabit bir panel (`.presenter-panel`), yalnızca presenter
modda görünür:

```
┌───────────────────────────────────────────┐
│   [ slayt içeriği — normal, değişmez ]      │
├─ ◍ PRESENTER · yalnızca sen ───────  21/22 ─┤
│  Bu slaytın notu:                           │
│  "Ödev: top sektirme, MP4, UZAK'a gelecek   │
│   haftaya kadar. Squash yok…"               │
│  Sıradaki ▸ Ödev İçin Kaynaklar             │
└───────────────────────────────────────────┘
```

- İçerik: "PRESENTER · yalnızca sen" başlığı + sayaç, bu slaytın `notes` metni
  (düz metin), "Sıradaki ▸ {sonraki slaytın title'ı}" (son slaytta gizli).
- `goToSlide()` her çağrıldığında panel içeriği güncellenir.

### Gizlilik sınırı (kabul edilen)
Pratik gizlilik. `notes` metinleri hâlâ `weekN.js` içinde public; DevTools /
"kaynağı görüntüle" ile **bilerek** bakan biri görebilir. Bu yüzden notlara
cevap anahtarı, kişisel veri veya gerçekten gizli içerik yazılmaz kuralı geçerli.

## Kapsam (dosyalar)

- `scripts/main.js` — presenter bayrağı, panel render, `goToSlide` entegrasyonu.
- `styles/main.css` — `.presenter-panel` stili (screen-only).
- İçerik dosyaları (`weekN.js`) **değişmez**.

## Operasyonel (paylaşılan motor)

`main.js` git407 ve git423-ders'te ortak (kanonik kopya git407'de). Kılavuz §9:

- `ENGINE_VERSION` bump.
- `bin/sync-engine.sh` ile git423-ders'e dağıt.
- İki `index.html`'de `main.js?v=…` cache-bust güncelle.
- İki repo **ayrı** commit + push (ikisinde de push = canlı). Presenter modu her
  iki sitede aynı çalışır.
- `bin/lint-deck.mjs` pre-push gate (0 hata).

## Kapsam dışı (YAGNI)

- Şifreleme / tam gizlilik (notes public kalır).
- Klavye tuşu toggle (yalnız gizli URL).
- Ayrı pencere / dual-screen presenter view.
- Notları DOM'dan tamamen ayırma.

## Doğrulama

- `?presenter=1` ile: panel görünür; not + sayaç + sıradaki başlık doğru; slayt
  geçişinde güncellenir.
- Parametresiz: panel yok, öğrenci görünümü değişmemiş.
- Print / PDF: panel çıktıda yok.
- Notu olmayan slayt (week1 / week2): panel zarif boş gösterim.
