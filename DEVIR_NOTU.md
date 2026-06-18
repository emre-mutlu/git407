# GIT 407 · Devir Notu

## Durum
**Hareketli Grafik Tasarımı** ders sunum sitesi. Build'siz statik SPA. Sunum motoru
(`scripts/main.js`) GİT423 ile **ORTAK / birebir** (aynı sistem, kasıtlı); tasarım bu derse
özgü ("Motion Studio"). Week 1 hazır ve headless Chrome ile görsel olarak doğrulandı.

**CANLI:** https://emre-mutlu.github.io/git407/ — GitHub Pages, `main`/kök (06-05).

## Kaldığın yer
- **Deste-lint aracı ✅ (06-14, Janus otonom-tur):** `bin/lint-deck.mjs` (node, build'siz) —
  manifest-güdümlü şema (`id` benzersiz + zorunlu alanlar + type kuralları) + `notes` eksiği +
  em-dash (toplu, kod-yorumu hariç). Cross-repo: `bin/lint-deck.mjs ../git423-ders`. `--strict`
  = push-kapısı, `--quiet` = yalnız hata. İki repo da **0 hata**. `lang="en"` bilinçli kapsam-dışı
  (EN/TR ayrımı güvenilmez → yanlış-pozitif riski). Kılavuz §8 artık lint kapısıyla başlıyor.
- **Kontak-föy aracı ✅ (06-14, Janus otonom-tur):** `bin/screenshot.sh [weekN]` + `_capture.html`
  (build-less, headless Chrome). Desteyi **gerçek motorla** render eder (DOM klonu → şablon kopyası
  yok, tam sadakat), tüm slaytları ölçekli CSS grid'de **tek screenshot** → `_contact/contact-weekN.png`.
  Montaj/puppeteer GEREKMEZ (CSS=grid, Chrome=kamera). Cross-repo `../git423-ders` (geçici harness
  kopyala→sil). `_contact/` gitignore. Doğrulı: git407 14+24, git423-ders 33+27+29 slayt.
- **PDF handout aracı ✅ (06-14, Janus otonom-tur):** `bin/pdf.sh [weekN]` + `_print.html` (build-less,
  headless Chrome). Dağıtılabilir kaynak (dersi kaçırana) — her slayt = bir sayfa, **canlı sunumun aynısı**.
  **Bulgu:** `--print-to-pdf` PRINT-media'da engine'in `vw`-clamp fontlarını büyütüp **kırpıyor** + headless'te
  `beforeprint` fire ETMİYOR → re-fit imkansız. Çözüm: motoru **screen-media'da** chunk'lar (16'lık) halinde
  screenshot → sabit-boyut arka-plan-görselli `_asm.html` → `--print-to-pdf` (görsel = print-reflow'dan muaf).
  Cross-repo geçici-harness. `_pdf/` gitignore. Doğrulı: 5/5 deste (git423 w1 33/3-chunk dahil). Canlıya dokunmaz.
- **UI/UX yenileme ✅ (06-12, Emre talebi "içime sinmedi" → AskUser: hiza+okunabilirlik+chrome
  rötuşu, konsept/renk kalır).** Hepsi `styles/main.css` + week dosyaları; **motor DOKUNULMADI**.
  - **Layout kararı:** sabit-başlık (pinned header, Keynote tarzı) DENENDİ ve GERİ ALINDI —
    Emre başlık ile gövde arasında oluşan boşluğu istemedi: **"başlık+gövde tek blok, dikeyde
    ortalı"** kalıcı tercih. Başlık Y'sinin içerikle doğal değişmesi kabul; yeni layout
    denemelerinde bu boşluğu yeniden üretme.
  - **Scale-to-fit küçülmesi çözüldü:** `.mg-bezier svg` yükseklik clamp'i (W2 easy-ease 0.65→1.0,
    W1 easing 0.83→1.0). + **Kompakt media query** (`min-width:821 and max-height:800`):
    1366×768 ve 720p'de tüm slaytlar ~scale 1 (probe ile 3 çözünürlükte doğrulandı, 38 slayt).
  - **Mobil scroll modu (≤820px):** slayt başına dikey scroll, `transform:none !important`
    (motor inline fit'ini CSS'ten ezer), nav rail gizli, `.ae-menu` wrap, tarih şeridi dikey,
    ae-ui-mock tek kolon. Öğrenci telefonu artık 0.4-scale mikrometin görmüyor.
  - **Chrome rötuşu (kalsın-ama-incelt):** glow/grain/scrubber/rec-pulse/nav-glow dozajı düştü,
    köşe braketleri 1px, hud-fps çerçevesiz sessiz etiket. **Hero:** çift diyagonal gölge →
    yatay-salt RGB split (net "aberasyon" hissi). `.split` keyframe'leri de yatay-salt.
  - **Okunabilirlik:** `--text-dim/mute` bir kademe açıldı; `.mg-sub` (eski inline 0.9rem
    paragraflar) ve `.mg-foot` (eski 0.8rem mute dipnotlar) sınıfları; ae-demo-note 0.88rem dim;
    cheatsheet satırı 0.98; interpolation mikro-etiketi 0.68rem.
  - **İkon dili:** W1 "nerede" emoji'leri (🎬📺…) → geometrik glif seti (▤◉◰▣▷▥) + accent'li
    kartlar; ayrim ⛷→✦; `.mg-card__icon` artık `--card-accent` rengini alır.
  - **Yön bilinçli view transition:** sadece sahne kayar (`view-transition-name: stage`,
    root sabit → chrome zıplamaz); motorun zaten yolladığı `forward/backward` tipleri CSS'te
    ilk kez kullanılıyor (22px push); eski tarayıcı = crossfade; reduced-motion = anında.
- **Week 2 HAZIR ✅ (06-12 v2, headless Chrome fit-doğrulamasıyla) — `weeks/week2.js`, 24 slayt.**
  Yapı: her teknik konu **KAVRAM slaytı + ayrı AE DEMO slaytı** (slayt↔AE ritmi + boyut
  tutarlılığı; tek slayta yığınca scale-to-fit küçültüyordu, bölünce her slayt ~scale 1).
  Akış: hero → bu hafta(yol haritası) → **[A] proje+kaydetme** → demo → arayüz(yakından,
  panel maketi, W1 köprüsü) → demo → composition → demo → **[B] timeline anatomisi** → demo
  → transform+anchor → demo → keyframe → demo → **[D] önizleme** → demo → Easy Ease → demo →
  export → demo → **[C] acemi hataları** → **cheatsheet(gruplu kısayol)** → **[I] ilham
  (linkli)** → **Haftalık Ödev**. Tek sürekli proje (logo giriş animasyonu). AE dili: EN
  menü + TR açıklama. index.html'de `week2` option var.
  - **A/B/C/D/I eklemeleri** (Emre onayı 06-12): A proje-kurulum, B timeline-okuma, C acemi
    hataları, D preview, I ilham. **Çakışma kontrol edildi:** B timeline-temeli ≠ H7
    parenting/precompose; D preview ≠ H8 render; A/C H2'ye özel. I için W1 jenerik-tarihçesiyle
    çakışmamak adına açı = "acemi-hedefi basit logo/ident animasyonları".
  - **İlham slaytı = "1982'den Bugüne" üç ikonik iş** (öncü/klasik/çağdaş · yıl etiketli,
    her birinin önemiyle): Channel 4 "Blocks" ident (1982, Lambie-Nairn) → DreamWorks "ay'da
    çocuk" (1997) → Netflix "ta-dum" (2015); hepsi **izlenebilir YouTube** linki + Dribbble
    footer. (Not: "eski/orta/yeni" Emre'nin tarifiydi, slayta yazılmadı — "orta" garip durdu.)
  - **AE referansları AE 2025'e doğrulandı (helpx.adobe.com):** H.264 doğrudan Render
    Queue'da (2023+) · Shift+F3 Graph Editor · J/K keyframe gezinme · Ctrl+Alt+M ME kuyruğu.
  - **CSS bileşenleri** (`styles/main.css`, hepsi git407-only, **ortak motor DOKUNULMADI**):
    `.ae-demo`(+`--full`), `.ae-menu`, `.ae-kbd`, `.ae-flow`, `.mg-trace`, `.mg-task`,
    `.ae-ui-mock`(panel maketi), `.cheat-*`(cheatsheet), `.ae-demo-note`. git423'e sızma yok.
  - **mg-trace/chip tuzağı:** İngilizce terimler `lang="en"` (TR locale uppercase i→İ yapıyor).
    **mg-trace içeriği + yeri (06-12, Emre):** chip'te "İlke izi" etiketi YAZILMAZ, yalnız ilke
    adı (örn. "TIMING"); chip başlık altında değil **içeriğin ALTINDA** durur (`margin-top:18px`
    div'i, slayt html'inin sonunda); yeni haftalarda da böyle.
- **14 slayt** (weeks/week1.js): giriş(hero) → ne yapacağız → motion nedir → neden →
  mg/animation/VFX ayrımı → kullanım alanları → tarihçe → **TEZ (Film Jenerikleri)** →
  sözlük → keyframe/interpolation → easing+bezier → 12 ilke → araç kutusu → **Haftalık Ödev**.
  (06-05: görev slaytı kaldırılmıştı; **06-12: haftalık ödev kuralı gereği geri eklendi** —
  W1 ödevi AE'siz: motion gözüyle 3 örnek topla + easings.net ısınma, W2'ye köprü.)
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
  Pages'te. **Sıra (farklı proje, 06-11 güncel):** ders link-kartları artık **kampus**'ta
  (okul-portali kümesi 06-09'da greenfield `kampus`'a süpersede oldu; eski "okul-portali →
  link kartları" planı geçersiz — kampus CANLI: kampus-ese.pages.dev).
- ~~Week 2 destesi~~ ✅ · ~~Week 3 destesi (H3 · Graph Editor)~~ ✅ **TAMAM (06-15)** — 27 slayt
  (value/speed graph · elle ease/overshoot · motion path · his sözlüğü); **interaktiflik tam paket**
  (3 reveal tartışma + dış medya + 2 canlı MotionDemo slaytı); ilke izi `.mg-trace` (slow in/out ·
  timing & spacing · arcs · exaggeration). **+ Motor `MotionDemo` v1.2.0** (playground + race,
  deklaratif `[data-motion-demo]`, git423'e sync'li). Playwright etkileşim + 3-çözünürlük fit doğrulı.
- **Sıradaki iş: Week 4 destesi (H4 · Ağırlık & Canlılık)** — graph'ı bir rig'e uygulamak:
  zıplayan top + savrulan kuyruk. İlke (T1): anticipation · follow-through/overlapping · squash & stretch.
  NOT: "rig" hafif tutulacak (klasik bouncing-ball; gerçek rig/parenting = H7). W3'ün MotionDemo
  widget'ı W4'te de kullanılabilir.
- **Haftalık ödev kuralı (06-12):** HER hafta son slayt **Haftalık Ödev** (`.mg-task`).
  W1'e de eklendi ✅ (14 slayt). W2 ödevi: logo giriş animasyonu → MP4.

## Dönem planı (06-11, Emre ile kararlaştırıldı; 06-11 rev: ilkeler haftalara dağıtıldı)
**İlke yaklaşımı (06-11 revizyon):** 12 ilke tek haftada anlatılmıyor; her ilke AE'de
uygulandığı haftaya gömülü. Kapsam MG-öncelikli: T1+T2'deki ~9 ilke derin işlenir, T3
(solid drawing · straight-ahead vs pose-to-pose · saf appeal) yalnız W1'de + final kritikte
anılır. **İlke izi:** her hafta W1'in 12-ilke slaytını kümülatif doldurur.
- T1 (kalp, derin): Timing & Spacing · Slow in/out (easing) · Arcs · Anticipation · Follow-through/Overlapping
- T2 (güçlü, bağlama göre): Exaggeration (overshoot) · Secondary action · Staging · Squash & Stretch

- **H2 · AE'ye Giriş: Arayüzden İlk Çıktıya** — arayüz/comp/timeline, comp settings
  (fps·çözünürlük·süre), transform beşlisi + anchor point, ilk keyframe + Easy Ease,
  **temel çıktı alma** (H.264 quick export). İlke izi: Timing + ilk slow in/out (Easy Ease).
  Uygulama: logo giriş animasyonu → MP4.
- **H3 · Graph Editor: Hareketin Karakteri** — value/speed graph, ease ve overshoot'u
  elle kurma, motion path. İlke (T1): Slow in/out · Timing & Spacing · Arcs · Exaggeration.
  Uygulama: aynı hareket × 3 easing.
- **H4 · Ağırlık & Canlılık (klasik egzersiz)** — graph'ı bir rig'e uygulamak. İlke (T1):
  Anticipation · Follow-through/Overlapping · Squash & Stretch. Uygulama: **logo noktası/ikon
  parçası** ile bouncing-ball + savrulan kuyruk (MG-temalı; brand-motion mikro parçası).
- **H5 · Shape Layer ve Vektör Animasyon** — path/fill/stroke, trim paths, repeater,
  AI'dan içe alma, line-draw, bar/ikon reveal (data viz temeli). İlke (T2): Secondary
  action · Staging. Uygulama: ikon seti. **Final proje brief'i** (Wrapped-style 3'lü set,
  aşağı bkz).
- **H6 · Kinetik Tipografi** — text animator + range selector, **sayı/stat sayacı**
  (slider-expression mikro-tekniği — Wrapped imzası), title sequence bağlamı (tarihçe + tez).
  İlke (T2): Staging (okuma sırası) · Timing-to-rhythm · Appeal. Uygulama: kısa replik.
  Ara teslim: styleframe/moodboard.
- **H7 · Katmanlı Kompozisyon ve Ses** — parenting/null, precompose, mask, track matte,
  adjustment layer, sese senkron (waveform/marker). İlke pekiştirme: Overlapping (parent
  zinciri) · Staging (derinlik) · Secondary. Ara teslim: animatik/WIP.
- **H8 · Çıktı Derinleşme + Son Review (sprint başı)** — Render Queue vs Media Encoder,
  codec/format (H.264·ProRes·alpha), sosyal formatlar (9:16/1:1), GIF/Lottie bakışı;
  kümülatif ilke haritası tamam. Son in-class WIP review; **2 haftalık üretim sprinti
  burada başlar** (polish + ses + render). Final kritik DEĞİL.
- **+2 hafta · Final Teslim & Kritik (ayrı oturum)** — dersler bittikten 2 hafta sonra
  (06-12 kararı: render/polish'e gerçek zaman tanımak için). Audio + final render tamam;
  sunum + kritik. Appeal = kritik ölçütü. Ops: sprint ortasında async geri-bildirim noktası.

**Final proje (06-12 karar): Spotify Wrapped tarzı 3'lü set.** Ortak stil sistemi
(renk/tipo/grid) altında 3 stat kartı; her kart bir beceriyi öne çıkarır: (1) kinetik
tipografi, (2) sayı-sayaç/data, (3) geçiş/staging. Format dikey 9:16 sosyal. Tutarlılık =
değerlendirme ölçütü (tasarım-sistemi disiplini). Verdiği iplikler: kalın tipo (H6) +
sayaç (H6) + bar/ikon reveal (H5) + snappy overshoot (H3) + 9:16 render (H8).
**Üretim hattı (School of Motion iş akışı; haftalara gömülü):** Brief+Concept (H5) →
Design/styleframe (H6) → Animation/WIP animatik (H7) → Render öğretimi + sprint başı (H8)
→ Audio+final render → **Final Teslim & Kritik (+2 hafta)**. Kinetik tipografi H6'da
(ek ağırlık yok — mevcut hâliyle yeterli).

## Notlar
- **Ders formatı (06-12): canlı sunum ↔ AE geçişi.** Deck'ler standalone lecture DEĞİL;
  her konu *kavram (slayt) → "AE'ye geç" (canlı demo) → sonuç/recap (slayt)* olarak örülür.
  Slaytlar az duvar-yazı, çok "ne + neden + demo adımları" (öğrenci AE'de takip ederken
  bakar). **Deck sistemine tekrarlayan "AE DEMO" bileşeni** gömülecek (Ae chip + adım
  checklist'i) → Week 2'den itibaren bu desen. **06-12: CSS-only çözüldü** (`styles/main.css`
  `.ae-demo` + yardımcılar); ortak motor (scripts/main.js) dokunulmadı, git423'e sızma yok.
- Editöryel çizgi git423 ile ortak: terim İngilizce-önce (ilk geçişte TR parantez),
  em-dash yalnız kod yorumunda, düz başlık. İngilizce uppercase chip'lere `lang="en"`
  (yoksa Türkçe locale "EASING"→"EASİNG" yapıyor).
- **Dil/ton kuralı (06-12, W1+W2'ye uygulandı):** sunum dili **anlatan/betimleyen**, nötr
  ama soğuk değil. Hitap YOK → 2. tekil ("yaparsın, verirsin, izle, seç, aç") ve 1. çoğul
  ("yapacağız, öğreneceğiz, dilimiz") kullanılmaz. Yerine impersonal/passive ("işaretlenir,
  açılır, seçilir") + nominal/mastar ("kurmak, seçmek"). AE demo adımları da passive
  (komut değil). Link CTA'ları bile nötr (örn. "video", "izle" değil). **Yeni haftalar bu
  tonu izlemeli.**
- **`main`=CANLI (06-05):** branch `master→main`; Pages `main`/kök → **her push canlıyı
  yeniden build eder** (~12 sn; git423 modeli). Artık "serbest commit" DEĞİL → dikkatli.

## Görevler
- [x] GitHub remote + statik deploy → CANLI (GitHub Pages, main/kök, 06-05)
- [x] Tez linki → YÖK Ulusal Tez Merkezi girişi (alternatif, 06-05); görev slaytı kaldırıldı
- [ ] (ops.) Tez doğrudan id'li detay linki + özet
- [x] Araç yönü kararı → **AE ağırlıklı** (06-11) + 7 oturumluk dönem planı (H2–H8)
- [x] Week 2 destesi (AE giriş + temel çıktı) → 10 slayt, AE DEMO bileşeni, ödev slaytı (06-12)
- [x] Week 3 destesi (H3 · Graph Editor) → 27 slayt + interaktiflik (reveal+MotionDemo) + motor v1.2.0 (06-15)
- [ ] Week 4 destesi (H4 · Ağırlık & Canlılık, hafif bouncing-ball) — sıradaki
- [x] Haftalık ödev kuralı: W1'e de ödev slaytı eklendi (06-12, 14 slayt)
- [x] UI/UX yenileme: sabit başlık + fit/kompakt/mobil + chrome rötuşu + okunabilirlik (06-12)

⚓ Anchor onboard EDİLDİ (06-05) · ilişki: GİT423'ün sunum motorunu paylaşır (ortak-sistem / kardeş varyant), git423 ile kardeş eğitim projesi; ikisi de GitHub Pages'te canlı · kova: eğitim

*Son güncelleme: 2026-06-18 (2) — **W3 revizyon** (Emre): 27→21 slayt. Çıkanlar: playground +
3-easing race (+demoları), motion-path (+demo), logoya-uygula coda. **Slayt 4** reveal→TED-Ed
timing/spacing video embed (gömülü iframe; YouTube `KRVhtMxQWRs`). Düzeltme: "motor"→"After
Effects" · keyframe "Bezier/Ease"→"Bezier" + Easy Ease ayrımı (F9 = hazır bezier) · "Eğriyi Elle"
→"Eğriyi Şekillendirmek" · bu-hafta callout sadeleşti. Güçlendirme: value/speed "harita vs hız
göstergesi" analojisi + X/Y birleştirme. **arcs ilkesi W3'ten düştü → W4'e taşınacak**. MotionDemo
motoru artık W3'te kullanılmıyor (inert; git423 paritesi korunur). lint 0, 21 slayt.
· 2026-06-18 — **housekeeping + not↔git reconcile**: `.playwright-mcp/`
gitignore'landı (MCP geçici çıktısı, `7e520a3`) ve push'landı → yerel↔uzak hizalı. İçerik
DEĞİŞMEDİ — **W3 TAMAM** hâlâ son durum, **W4 sıradaki**. · 2026-06-15 — **Week 3 TAMAM + MotionDemo motoru**: 27 slayt (H3 Graph Editor; kavrayış→okuma→şekillendirme→sentez→kapanış) + interaktiflik tam paket (reveal tartışma + canlı playground/race widget; motor v1.2.0 deklaratif `[data-motion-demo]`, git423'e sync, no-regression week2 temiz); ilke izi `.mg-trace`; Playwright etkileşim + 27/27 scale-1.0 fit (1280×720·1366×768) doğrulı; spec+plan `weeks/week3.plan.md`+`week3.tasks.md`; **main=CANLI push'landı**. Sıradaki: Week 4 (H4, hafif bouncing-ball). · 2026-06-12 (3) — **UI/UX yenileme** (dikey-ortalı blok layout [pinned header
denendi→Emre istemedi→geri alındı], scale-fit fix + kompakt query, mobil scroll modu, chrome
rötuşu, hero yatay RGB split, .mg-sub/.mg-foot, emoji→geometrik ikon, yön bilinçli stage
view-transition; 38 slayt × 3 çözünürlük probe doğrulaması; motor dokunulmadı, push EDİLMEDİ) · 2026-06-12 (Week 2 v2 HAZIR — **24 slayt**: her teknik kavram+AE DEMO ayrı +
A/B/C/D/I eklemeleri + cheatsheet + panel maketi; AE refs AE2025'e doğrulandı; W1'e ödev
slaytı eklendi (14 slayt); **dil/ton geçişi: W1+W2 anlatı registerine çekildi (hitapsız)**; dönem planı revize: ilkeler haftalara dağıtıldı, final = Wrapped
3'lü set +2 hafta teslim, ders formatı slayt↔AE; sıradaki: Week 3/H3) · 2026-06-11 (araç
kararı AE + H2–H8 dönem planı) · 2026-06-05 · DEPLOY: emre-mutlu/git407 (public) + master→main + GitHub Pages (main/kök) → CANLI https://emre-mutlu.github.io/git407/ doğrulandı. **main=CANLI** artık geçerli. · 06-05 (2): görev slaytı kaldırıldı (14→13 slayt), tez linki YÖK Ulusal Tez Merkezi girişine alındı (HTTP 200) — push canlıyı yeniden build eder.*
