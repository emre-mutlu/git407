# GIT 407 · Devir Notu

## Durum
**Hareketli Grafik Tasarımı** ders sunum sitesi. Build'siz statik SPA. Sunum motoru
(`scripts/main.js`) GİT423 ile **ORTAK / birebir** (aynı sistem, kasıtlı); tasarım bu derse
özgü ("Motion Studio"). Week 1 hazır ve headless Chrome ile görsel olarak doğrulandı.

## Kaldığın yer
- **14 slayt** (weeks/week1.js): giriş(hero) → ne yapacağız → motion nedir → neden →
  mg/animation/VFX ayrımı → kullanım alanları → tarihçe → **TEZ (Film Jenerikleri)** →
  sözlük → keyframe/interpolation → easing+bezier → 12 ilke → araç kutusu → görev.
- **Tasarım sistemi** (styles/main.css): Archivo + Hanken Grotesk + Martian Mono;
  oklch gradient (gri orta yok); sol-accent-bar kartlar; sağda playhead'li timeline nav;
  altta timecode transport + üstte scrubber; chromatic-split hero başlık.
- **Easing slaytı:** 3 bezier eğrisi (linear/ease-out/overshoot) + easings.net &
  cubic-bezier.com linkleri (canlı demo balonları kullanıcı isteğiyle kaldırıldı).
- **Tarihçe:** isimler en önemli işlerine link (Art of the Title /designer/saul-bass,
  /pablo-ferro, /title/se7en; MTV→YouTube ident; Bugün→Motionographer).
- **Tez slaytı:** "Film Jeneriklerinde Hareketli Grafik Kullanımı" · Emre Mutlu ·
  Gazi Üniv. Güzel Sanatlar Enstitüsü · 2018 · YÖK **tezNo 498917** → tez.yok.gov.tr.
- **Çalıştırma:** `npm run dev` → `python3 -m http.server 4173` (ES module file:// ile açılmaz).

## Sıradaki
- **Tez slaytı:** doğrudan YÖK detay linki (Emre tarayıcıdan id'li URL'yi verince eklenecek);
  istenirse özet/ana bulgular kartın altına. Gazi/2018 künyesi web'den, Emre teyit edecek.
- **AÇIK KARAR — dersin araç yönü:** After Effects (klasik) mi, web/kod-tabanlı motion mu?
  Week 1 araç-bağımsız tutuldu; week 2+ için netleşmeli.
- **Deploy:** yok. Statik → Cloudflare Pages / GitHub Pages kolay. **Remote yok**
  (git init yapıldı, origin eklenmedi); GitHub repo + Pages kurulabilir.
- Week 2 içeriği.

## Notlar
- Editöryel çizgi git423 ile ortak: terim İngilizce-önce (ilk geçişte TR parantez),
  em-dash yalnız kod yorumunda, düz başlık. İngilizce uppercase chip'lere `lang="en"`
  (yoksa Türkçe locale "EASING"→"EASİNG" yapıyor).
- master=CANLI mantığı git407'de henüz yok (deploy kurulmadı), serbest commit güvenli.

## Görevler
- [ ] Tez doğrudan linki + (ops.) özet
- [ ] Araç yönü kararı → Week 2
- [ ] (ops.) GitHub remote + statik deploy

⚓ Anchor onboarding bekliyor · sezilen ilişki: GİT423'ün sunum motorunu paylaşır (ortak-sistem / kardeş varyant), git423 ile kardeş eğitim projesi · kova: eğitim

*Son güncelleme: 2026-06-05*
