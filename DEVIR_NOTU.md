# GIT 407 · Devir Notu

## Durum
**Hareketli Grafik Tasarımı** ders sunum sitesi. Build'siz statik SPA. Sunum motoru
(`scripts/main.js`) GİT423 ile **ORTAK / birebir** (aynı sistem, kasıtlı); tasarım bu derse
özgü ("Motion Studio"). Week 1 hazır ve headless Chrome ile görsel olarak doğrulandı.

**CANLI:** https://emre-mutlu.github.io/git407/ — GitHub Pages, `main`/kök (06-05).

## Kaldığın yer
- **13 slayt** (weeks/week1.js): giriş(hero) → ne yapacağız → motion nedir → neden →
  mg/animation/VFX ayrımı → kullanım alanları → tarihçe → **TEZ (Film Jenerikleri)** →
  sözlük → keyframe/interpolation → easing+bezier → 12 ilke → araç kutusu.
  (06-05: görev/"Hafta Arası Görevin" slaytı kaldırıldı → son slayt artık araç kutusu.)
- **Tasarım sistemi** (styles/main.css): Archivo + Hanken Grotesk + Martian Mono;
  oklch gradient (gri orta yok); sol-accent-bar kartlar; sağda playhead'li timeline nav;
  altta timecode transport + üstte scrubber; chromatic-split hero başlık.
- **Easing slaytı:** 3 bezier eğrisi (linear/ease-out/overshoot) + easings.net &
  cubic-bezier.com linkleri (canlı demo balonları kullanıcı isteğiyle kaldırıldı).
- **Tarihçe:** isimler en önemli işlerine link (Art of the Title /designer/saul-bass,
  /pablo-ferro, /title/se7en; MTV→YouTube ident; Bugün→Motionographer).
- **Tez slaytı:** "Film Jeneriklerinde Hareketli Grafik Kullanımı" · Emre Mutlu ·
  Gazi Üniv. Güzel Sanatlar Enstitüsü · 2018 · YÖK **tezNo 498917**. Link 06-05'te ana
  sayfadan → YÖK Ulusal Tez Merkezi girişine alındı (tez.yok.gov.tr/UlusalTezMerkezi/,
  HTTP 200); etiket "YÖK Ulusal Tez Merkezi · Tez No 498917". Doğrudan id'li detay linki
  hâlâ opsiyonel (aşağı bkz).
- **Çalıştırma:** `npm run dev` → `python3 -m http.server 4173` (ES module file:// ile açılmaz).

## Sıradaki
- **Tez slaytı:** ana link YÖK Ulusal Tez Merkezi girişine bağlandı (alternatif, 06-05).
  Opsiyonel iyileştirme: doğrudan id'li detay linki (`tezDetay.jsp?id=…&no=…`) — yalnız
  tarayıcıda tezi açınca görünür, tezNo'dan üretilemez; Emre URL'yi verince tek satırda
  değişir. İstenirse özet/ana bulgular kartın altına. Gazi/2018 künyesi web'den, Emre teyit edecek.
- **KARAR (06-11): araç yönü = After Effects ağırlıklı.** Kalan dönem bu haftadan
  itibaren **7 oturum (H2–H8)** · plan aşağıda. Çıktı alma: temel H2, detay H8.
- **Deploy: ✅ TAMAM (06-05).** CANLI → https://emre-mutlu.github.io/git407/ (GitHub Pages,
  `main`/kök; index+css+js+week1.js HTTP 200, JS MIME ok, build ~12 sn). git423 de GitHub
  Pages'te. **Sıra (farklı proje):** okul-portali → git423+git407 link kartları.
- **Week 2 destesi** (sıradaki iş): AE'ye giriş + temel çıktı alma (plan H2).

## Dönem planı (06-11, Emre ile kararlaştırıldı)
- **H2 · AE'ye Giriş: Arayüzden İlk Çıktıya** — arayüz/comp/timeline, comp settings
  (fps·çözünürlük·süre), transform beşlisi + anchor point, ilk keyframe + Easy Ease,
  **temel çıktı alma** (H.264 quick export). Uygulama: logo giriş animasyonu → MP4.
- **H3 · Graph Editor: Hareketin Karakteri** — value/speed graph, ease ve overshoot'u
  elle kurma, motion path. Uygulama: aynı hareket × 3 easing.
- **H4 · Animasyon Prensipleri Uygulamada** — 12 ilkenin AE pratiği (timing&spacing,
  squash&stretch, anticipation, follow-through, arcs…). Uygulama: bouncing ball + UI overshoot.
- **H5 · Shape Layer ve Vektör Animasyon** — path/fill/stroke, trim paths, repeater,
  AI'dan içe alma, line-draw. Uygulama: ikon seti. **Final proje brief'i** (15-20 sn parça).
- **H6 · Kinetik Tipografi** — text animator + range selector, title sequence bağlamı
  (tarihçe + tez bağlantısı). Uygulama: kısa replik. Ara teslim: styleframe/moodboard.
- **H7 · Katmanlı Kompozisyon ve Ses** — parenting/null, precompose, mask, track matte,
  adjustment layer, sese senkron (waveform/marker). Ara teslim: animatik/WIP.
- **H8 · Çıktı Derinleşme + Final Kritik** — Render Queue vs Media Encoder, codec/format
  (H.264·ProRes·alpha), sosyal formatlar (9:16/1:1), GIF/Lottie bakışı; final teslim + kritik.

## Notlar
- Editöryel çizgi git423 ile ortak: terim İngilizce-önce (ilk geçişte TR parantez),
  em-dash yalnız kod yorumunda, düz başlık. İngilizce uppercase chip'lere `lang="en"`
  (yoksa Türkçe locale "EASING"→"EASİNG" yapıyor).
- **`main`=CANLI (06-05):** branch `master→main`; Pages `main`/kök → **her push canlıyı
  yeniden build eder** (~12 sn; git423 modeli). Artık "serbest commit" DEĞİL → dikkatli.

## Görevler
- [x] GitHub remote + statik deploy → CANLI (GitHub Pages, main/kök, 06-05)
- [x] Tez linki → YÖK Ulusal Tez Merkezi girişi (alternatif, 06-05); görev slaytı kaldırıldı
- [ ] (ops.) Tez doğrudan id'li detay linki + özet
- [x] Araç yönü kararı → **AE ağırlıklı** (06-11) + 7 oturumluk dönem planı (H2–H8)
- [ ] Week 2 destesi (AE giriş + temel çıktı)

⚓ Anchor onboard EDİLDİ (06-05) · ilişki: GİT423'ün sunum motorunu paylaşır (ortak-sistem / kardeş varyant), git423 ile kardeş eğitim projesi; ikisi de GitHub Pages'te canlı · kova: eğitim

*Son güncelleme: 2026-06-11 (araç kararı AE + H2–H8 dönem planı eklendi; sıradaki: Week 2 destesi) · 2026-06-05 · DEPLOY: emre-mutlu/git407 (public) + master→main + GitHub Pages (main/kök) → CANLI https://emre-mutlu.github.io/git407/ doğrulandı. **main=CANLI** artık geçerli. · 06-05 (2): görev slaytı kaldırıldı (14→13 slayt), tez linki YÖK Ulusal Tez Merkezi girişine alındı (HTTP 200) — push canlıyı yeniden build eder.*
