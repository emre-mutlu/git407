# Week 3 · Graph Editor — Tasarım Spec'i

**Ders:** H3 · "Hareketin Karakteri" · 2 saat · ~24 slayt
**Reçete:** `DESTE_KILAVUZU.md` (şema · dil/ton · editöryal · lint kapısı)
**Çıktı:** `weeks/week3.js` + `manifest.js` satırı `{ key: 'week3', label: '03 · Graph Editor' }`
**Durum:** brainstorm onaylı (2026-06-15) → yazım bekliyor

---

## Sabitlenen kararlar
- **Omurga = hibrit:** öğretim **taze basit obje** üzerinde (bir daire/nokta, sol→sağ hareket — eğriyi net okumak için; W4'te aynı obje "top" olur), kapanış **coda**'da öğrencinin **W2 logosuna** uygulanır. → süreklilik korunur, öğretim temiz, W2 ödevini yapmamış öğrenci takılmaz.
- **Doluluk = beat-güdümlü ~24 slayt** (W2 boyutu ama *genişlik* değil *derinlik*). Sayı hedef değil.
- **Motion path dahil** (hafif — arcs ilkesi + uzamsal karakter).
- **Pedagoji:** katı "1 kavram = 1 demo" değil → saf-kavram slaytları (spacing, his sözlüğü) + birleşik demolar (value+speed tek demo).

## İskelet (sıra = sunum sırası)

### A · Kavrayış zemini
1. **Hareketin Karakteri** — `hero`
2. **Bu hafta** (yol haritası: Easy Ease'den elle-eğriye) — yol haritası
3. **Ara kareler & spacing** — keyframe arasını motor üretir; eğri = "nasıl"ın reçetesi; *timing* (ne zaman) vs *spacing* (aradaki mesafe) — `kavram`

### B · Eğriyi OKUMA (en zor kısım — bilerek yavaş)
4-5. **Graph'ı aç + Easy Ease'in eğrisini gör** (W2 köprüsü) — `kavram→demo`
6. **Value graph oku** — değer doğrudan; düz çizgi = sabit değer — `kavram`
7. **Speed graph oku** — yükseklik = hız; dipte düz = durağan — `kavram`
8. **demo:** aynı hareketi iki grafikte oku — `demo`
9-10. **Keyframe tipleri + ikonlar** — Linear/Bezier/Auto/**Hold**; ikon okuma; Hold = sıçrama/stepped — `kavram→demo`

### C · Eğriyi ŞEKİLLENDİRME
11-12. **Eğriyi elle** — slow in/out + bezier handle + influence% — `kavram→demo`
13-14. **Overshoot** — %100 ötesi = snappy (exaggeration) — `kavram→demo`
15. **Eğri → his sözlüğü** — linear=mekanik · ease-out=yere iner · ease-in=yaylanır · overshoot=enerjik; *hangi his ne zaman* — `kavram`

### D · Uzamsal + sentez
16-17. **Motion path** — zamansal değil uzamsal eğri = arcs — `kavram→demo`
18-19. **Aynı hareket × 3 easing** (linear/Easy Ease/overshoot; W1 bezier SVG reuse + his sözlüğüne bağla) — `karşılaştırma→demo`
20. **Kendi logona uygula** — coda (süreklilik)

### E · Kapanış
21. **Acemi hataları** — linear bırakmak · aşırı-overshoot · speed graph'ı görmezden gelmek — `standard`
22. **Cheatsheet** — Shift+F3 · handle tipleri · convert vertex · X/Y separate dimensions — `standard`
23. **İlham** — snappy motion design — `standard`
24. **Haftalık Ödev** — aynı hareket × 3 easing → MP4 (+ops. logoya uygula) — `mg-task`

## Uyulacak kurallar (reçeteden)
- dil/ton **hitapsız-passive** (yaparsın/izle YOK → açılır/seçilir/kurmak)
- terim **EN-önce** (ilk geçişte TR parantez); em-dash **yalnız** kod yorumunda; `lang="en"` İngilizce büyük-harf chip/iz'lerde
- her slaytta **`notes`** (baştan — sonradan eklemek pahalı)
- **ilke izi:** W1'in 12-ilke slaytında `slow in/out · timing & spacing · arcs · exaggeration` işaretlenir
- **lint 0-hata** (`node bin/lint-deck.mjs`) + **kontak föy** (`bin/screenshot.sh week3`) doğrulaması push öncesi
- **push = canlı** (GitHub Pages `main`/kök) → yarım deste push'lanmaz

## Reuse
- W1 **bezier SVG** eğri bileşeni (`.mg-bezier`) → "3 easing" karşılaştırması
- W2 bileşenleri: `.ae-demo` · `.ae-menu` · `.ae-kbd` · `.ae-flow` · `.cheat-*` · `.mg-trace`

## Açık kalemler (yazımdan önce / sırasında)
- **AE 2025 doğrulama** (helpx.adobe.com): Graph Editor toggle (Shift+F3) · value↔speed graph değiştirme · keyframe interpolation menüsü · Hold (Ctrl/Cmd+Alt+klik) · Separate Dimensions · Convert Vertex · Easy Ease (F9)
- "Daire/nokta" obje seçiminin onayı (W4 topuna köprü)

## Başarı ölçütü
lint 0 hata · tüm slaytlar fit (scale-to-fit, scroll yok) · kontak föy temiz · her slaytta `notes` · ilke izi güncel · ödev slaytı var · manifest satırı + (gerekirse) default doğru
