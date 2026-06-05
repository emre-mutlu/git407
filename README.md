# GIT 407 · Hareketli Grafik Tasarımı

Ders sunum destesi. **Build'siz, vanilla-JS bir SPA** · backend yok, statik dosyalar.
Motor (`scripts/main.js`) GİT423 sunum sistemiyle aynıdır; tasarım bu derse özgüdür
("Motion Studio": kinetik karanlık sahne, chromatic-split başlık, playhead'li zaman
çizelgesi navigasyonu, timecode transport bar, eased kademeli giriş, bezier easing motifleri).

## Çalıştırma

ES module'ler `file://` üzerinden yüklenmez, bir statik sunucu gerekir:

```bash
npm run dev        # python3 -m http.server 4173  →  http://localhost:4173
# veya
npm run serve      # npx serve -l 4173
```

## Yapı

```
index.html            kabuk: header, sahne, zaman çizelgesi nav, transport bar + scrubber
scripts/main.js       paylaşılan motor (DEĞİŞTİRME — sistem ortak)
styles/main.css       bu derse özgü tasarım sistemi (.mg-* içerik kiti dâhil)
weeks/week1.js         1. hafta içeriği:  export const week1 = { title, slides: [...] }
```

## Yeni hafta ekleme

1. `weeks/weekN.js` oluştur → `export const weekN = { title, slides: [ ... ] }`.
2. `index.html` içindeki `#week-select`'e bir `<option value="weekN">…</option>` ekle.
   (Motor seçili haftayı dinamik `import('../weeks/weekN.js')` ile yükler.)

## Slayt şeması

```js
{
  id: "benzersiz",
  type: "hero" | "reveal" | undefined,   // undefined = standart
  category: "Eyebrow",                    // standart/reveal
  title: "Düz, açıklayıcı başlık",
  subtitle: "...",                        // hero
  question: "...",                         // reveal: tıklanınca açılır
  html: `... .mg-* sınıflarıyla içerik ...`
}
```

Grid'lere `class="... stagger"` eklersen çocukları kademeli (eased) girer.

## İçerik kuralları

Terim İngilizce-önce (ilk geçişte parantezde TR), em-dash yok, düz başlık,
kırılgan ders-no referansı yok. (GİT423 ile ortak editöryel çizgi.)
