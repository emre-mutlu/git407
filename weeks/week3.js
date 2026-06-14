/**
 * ==========================================================================
 * WEEK 3 — Graph Editor: Hareketin Karakteri (H3)
 * ==========================================================================
 * Plan: weeks/week3.plan.md · reçete: DESTE_KILAVUZU.md
 * Yapım sürüyor — şu an iskelet (hero + 2 etkileşimli slayt) MotionDemo
 * doğrulaması için; kalan slaytlar week3.tasks.md Task 5-9 ile eklenecek.
 */

export const week3 = {
    title: "03 · Graph Editor",
    slides: [
        {
            id: "acilis",
            title: "Hareketin Karakteri",
            subtitle: "Hareketli Grafik Tasarımı · 3. Hafta · Graph Editor",
            type: "hero",
            html: `<p class="mg-sub">Easy Ease bir tıktı. Bu hafta eğriyi elle şekillendirmek var.</p>`,
            notes: "W2'de Easy Ease tek tıkla yumuşatıldı. Bu hafta o eğrinin altına inilip karakteri elle kuruluyor: value/speed graph, elle ease/overshoot, motion path.",
        },
        {
            id: "bu-hafta",
            category: "Yol Haritası",
            title: "Bu Hafta: Oku, Şekillendir, Karşılaştır",
            html: `
                <p class="mg-intro">Geçen hafta Easy Ease tek tuştu (<span class="ae-kbd">F9</span>). Bu hafta o tuşun altındaki <strong>eğri</strong> açılır: hareketin karakteri oradan gelir. Önce eğri okunur, sonra elle şekillendirilir, sonunda aynı hareket farklı eğrilerle karşılaştırılır.</p>
                <div class="ae-flow" style="margin:22px 0 18px;">
                    <span class="ae-flow__step">Oku</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step">Şekillendir</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step">Karşılaştır</span>
                </div>
                <div class="mg-callout">
                    <h4>Çıkış kapısı</h4>
                    <p>Basit bir nesne üç farklı easing'le hareket eder; fark <strong>hissedilir</strong>. Aynı teknik sonra kendi logo animasyonuna taşınır.</p>
                </div>
            `,
            notes: "İki saat, çoğu AE'de. Geçen hafta Easy Ease tek tıktı; bu hafta o tıkın altındaki eğriyi açıyoruz. Akış: oku, şekillendir, karşılaştır.",
        },
        {
            id: "spacing",
            category: "Temel",
            title: "Ara Kareler ve Spacing",
            html: `
                <p class="mg-intro">İki keyframe arası boş değildir: aradaki kareleri <strong>motor üretir</strong>. O karelerin <strong>aralığı</strong> hareketin hızını belirler. Bu aralık dağılımına <strong>spacing</strong> (aralık) denir; graph editor tam olarak bunu çizer.</p>
                <svg viewBox="0 0 230 86" role="img" aria-label="linear ve ease spacing karşılaştırması" style="width:min(440px,82%); height:auto; display:block; margin:6px auto 14px;">
                    <text x="2" y="20" style="font-family:var(--font-mono); font-size:9px; fill:var(--text-mute);" lang="en">LINEAR</text>
                    <circle cx="62" cy="16" r="5" style="fill:var(--cyan);"/><circle cx="86" cy="16" r="5" style="fill:var(--cyan);"/><circle cx="110" cy="16" r="5" style="fill:var(--cyan);"/><circle cx="134" cy="16" r="5" style="fill:var(--cyan);"/><circle cx="158" cy="16" r="5" style="fill:var(--cyan);"/><circle cx="182" cy="16" r="5" style="fill:var(--cyan);"/><circle cx="206" cy="16" r="5" style="fill:var(--cyan);"/>
                    <text x="2" y="64" style="font-family:var(--font-mono); font-size:9px; fill:var(--text-mute);" lang="en">EASE</text>
                    <circle cx="62" cy="60" r="5" style="fill:var(--magenta);"/><circle cx="69" cy="60" r="5" style="fill:var(--magenta);"/><circle cx="81" cy="60" r="5" style="fill:var(--magenta);"/><circle cx="101" cy="60" r="5" style="fill:var(--magenta);"/><circle cx="167" cy="60" r="5" style="fill:var(--magenta);"/><circle cx="187" cy="60" r="5" style="fill:var(--magenta);"/><circle cx="199" cy="60" r="5" style="fill:var(--magenta);"/><circle cx="206" cy="60" r="5" style="fill:var(--magenta);"/>
                </svg>
                <p class="mg-sub"><strong>Timing</strong> (zamanlama) kaç karede gidildiğidir; <strong>spacing</strong> o karelerin nasıl dağıldığıdır. Aynı timing, farklı spacing tamamen başka bir his verir.</p>
                <div style="margin-top:18px;"><span class="mg-trace" lang="en">timing &amp; spacing</span></div>
            `,
            notes: "Disney'nin ilk ilkesi. Tahtada aynı iki keyframe, farklı ara-kare dağılımı = bambaşka his. Spacing = eğrinin kendisi; haftanın omurgası.",
        },
        {
            id: "reveal-spacing",
            category: "Soru ve Tartışma",
            type: "reveal",
            title: "İki Top, Bir Fark",
            question: "Aynı sürede A'dan B'ye giden iki top: biri canlı, biri cansız hissettiriyor. Keyframe'leri aynı. Tek fark ne olabilir?",
            html: `
                <p class="mg-intro">Fark <strong>spacing</strong>'te. Cansız topun ara kareleri eşit aralıklı (sabit hız, linear); canlı topunki uçlarda sıklaşıp ortada seyrekleşiyor (yavaş başla, hızlan, yavaşla).</p>
                <p class="mg-sub">Keyframe'in <em>nerede</em> olduğu değil, aralarının <em>nasıl doldurulduğu</em> karakteri verir. Bu hafta o doldurmayı elle kuruyoruz.</p>
            `,
            notes: "Sınıfa sor, tahmin aldır. Çoğu 'hız' der; asıl cevap spacing/easing. Buradan graph editor'e geçiş doğal.",
        },
        {
            id: "graph-ac",
            category: "Eğriyi Okuma",
            title: "Graph Editor: Eğrinin Açıldığı Yer",
            html: `
                <p class="mg-intro">Easy Ease bir tuştu ama altında bir <strong>eğri</strong> var. <strong>Graph editor</strong> (grafik düzenleyici) o eğriyi gösterir: keyframe'ler arasını motorun nasıl doldurduğunu çizen grafik. Timeline keyframe'in <em>yerini</em>, graph editor <em>karakterini</em> gösterir.</p>
                <div class="mg-grid-2-1">
                    <div class="mg-callout">
                        <h4>İki ayrı okuma</h4>
                        <p>Timeline: keyframe ne zaman. Graph editor: aralar nasıl. Aynı keyframe'ler, iki farklı bakış.</p>
                    </div>
                    <div class="mg-card mg-card--cyan">
                        <div class="mg-card__title">Aç / kapat</div>
                        <p class="mg-card__text"><span class="ae-kbd">Shift</span> <span class="ae-kbd">F3</span>, ya da timeline üstündeki grafik ikonu.</p>
                    </div>
                </div>
            `,
            notes: "W2'de Easy Ease'i yapıp 'detayı 3. hafta' demiştik. İşte 3. hafta. Graph editor = eğriyi gördüğün ve şekillendirdiğin yer.",
        },
        {
            id: "value-graph",
            category: "Eğriyi Okuma",
            title: "Value Graph: Değer Ne Yapıyor",
            html: `
                <p class="mg-intro"><strong>Value graph</strong> (değer grafiği) özelliğin değerini doğrudan çizer: dikey eksen değer, yatay eksen zaman. Konum 0'dan 500'e gidiyorsa çizgi 0'dan 500'e tırmanır.</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card mg-card--cyan"><div class="mg-card__title">Tırmanan çizgi</div><p class="mg-card__text">Değer artıyor: nesne ilerliyor, büyüyor ya da beliriyor.</p></div>
                    <div class="mg-card"><div class="mg-card__title">Düz çizgi</div><p class="mg-card__text">Değer sabit: o aralıkta <strong>hiç değişim yok</strong> (hareketsiz).</p></div>
                </div>
                <p class="mg-foot">Eğrinin <strong>dikliği</strong> = değişim hızı. Dik bölge hızlı, yatık bölge yavaş değişir.</p>
            `,
            notes: "En sezgisel grafik: değer neyse o çizilir. Düz çizgi = sabit değer = durağan. Diklik = hız. Speed graph'a köprü buradan.",
        },
        {
            id: "speed-graph",
            category: "Eğriyi Okuma",
            title: "Speed Graph: Ne Kadar Hızlı",
            html: `
                <p class="mg-intro"><strong>Speed graph</strong> (hız grafiği) değeri değil <strong>hızı</strong> çizer: eğrinin <strong>yüksekliği</strong> o anki hızdır. Tepe en hızlı an; dipteki düz çizgi durağan (hız sıfır).</p>
                <div class="mg-callout" style="margin-bottom:14px;">
                    <h4>Tuzak: aynı şekil, farklı anlam</h4>
                    <p>Value graph'ta düz çizgi "sabit değer" (duruyor) demek. Speed graph'ta <strong>dipteki</strong> düz çizgi "duruyor", <strong>yukarıdaki</strong> düz çizgi "sabit hızla gidiyor" demek.</p>
                </div>
                <p class="mg-sub">Easy Ease'in speed graph'ı bir <strong>tümsektir</strong>: dipten başlar (yavaş), tepeye çıkar (hızlı), dibe iner (yavaş). Slow in, slow out.</p>
            `,
            notes: "En çok karıştırılan grafik. Vurgu: yükseklik = hız. Dipte düz = durağan, yukarıda düz = sabit hız. Easy Ease = tümsek. Yavaş ve dikkatli anlat.",
        },
        {
            id: "demo-graph-oku",
            category: "AE Demo",
            title: "Demo · İki Grafikte Okumak",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>W2'nin logo animasyonu açılır; keyframe'ler seçilip Graph Editor açılır (<span class="ae-kbd">Shift</span> <span class="ae-kbd">F3</span>).</li>
                        <li>Alt çubuktaki <span class="ae-menu" lang="en">Choose graph type and options</span> ile <span class="ae-menu" lang="en">Edit Value Graph</span> ve <span class="ae-menu" lang="en">Edit Speed Graph</span> arasında geçilir.</li>
                        <li>Aynı hareket iki grafikte okunur: value tırmanırken speed bir tümsek çizer. Easy Ease öncesi ve sonrası karşılaştırılır.</li>
                    </ol>
                    <p class="ae-demo-note">Eğri çerçeveye sığmıyorsa sağ alttaki <span class="ae-menu" lang="en">Fit selection to view</span> kullanılır.</p>
                </div>
            `,
            notes: "Gerçek W2 projesi üstünde. Kritik an: value/speed toggle. Öğrenci kendi gözüyle 'tümsek = yavaş-hızlı-yavaş' görsün.",
        },
        {
            id: "reveal-speed",
            category: "Soru ve Tartışma",
            type: "reveal",
            title: "Bu Hız Eğrisi Kimin?",
            question: "Bir speed graph dipten başlıyor, ortada keskin bir tepe yapıp tekrar dibe iniyor. Bu nasıl bir hareket? Nerede görülür?",
            html: `
                <p class="mg-intro">Yavaş başlayıp hızlanan, sonra yavaşlayıp duran bir hareket: klasik <strong>ease-in-out</strong>. Bir nesnenin yumuşak girip yumuşak durması; arayüz geçişlerinin ve logo açılışlarının çoğu böyle.</p>
                <p class="mg-sub">Tepe ne kadar <strong>sivri</strong>yse orta hız o kadar yüksek, giriş ve çıkış o kadar serttir. Yayvan bir tepe daha yumuşak bir his verir.</p>
            `,
            notes: "Grafiği okumayı kontrol et. Cevap: ease-in-out. Sivri tepe = snappy, yayvan = yumuşak. Overshoot'a köprü.",
        },
        {
            id: "keyframe-tipleri",
            category: "Eğriyi Okuma",
            title: "Keyframe Tipleri ve İkonları",
            html: `
                <p class="mg-intro">Bir keyframe'in <strong>şekli</strong> tipini söyler; tip de eğrinin nasıl davranacağını belirler. Dört temel tip:</p>
                <div class="mg-grid-2 stagger" style="margin-bottom:14px;">
                    <div class="mg-term"><span class="mg-term__k" lang="en">Linear <small>· elmas ◆</small></span><p class="mg-term__d">Sabit hız, keskin geçiş. Robotik.</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">Bezier / Ease <small>· kum saati</small></span><p class="mg-term__d">Yumuşak; kollarla elle şekillenir.</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">Auto Bezier <small>· yuvarlak ●</small></span><p class="mg-term__d">AE otomatik yumuşatır; çoğu yere yeter.</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">Hold <small>· kare ▪</small></span><p class="mg-term__d">Ara doldurma yok: değer <strong>sıçrar</strong> (stepped).</p></div>
                </div>
                <p class="mg-foot"><strong>Hold</strong>, snappy hareketin gizli silahı: ani kesme, stop-motion hissi, ritmik sıçrama.</p>
            `,
            notes: "İkon okuma şart: öğrenci keyframe'e bakıp tipini anlamalı. Hold'u vurgula; snappy MG'de çok kullanılır.",
        },
        {
            id: "demo-keyframe-tipleri",
            category: "AE Demo",
            title: "Demo · Tipleri Değiştirmek",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>Keyframe'e sağ tık → <span class="ae-menu" lang="en">Keyframe Interpolation</span>; Temporal'da Linear / Bezier / Auto / Hold denenir.</li>
                        <li>Hızlı yol: keyframe'e <span class="ae-kbd">Ctrl</span> klik (mac: <span class="ae-kbd">⌘</span>) lineer ile auto bezier arasında geçirir.</li>
                        <li>Hold: keyframe'e <span class="ae-kbd">Ctrl</span> <span class="ae-kbd">Alt</span> klik (mac: <span class="ae-kbd">⌘</span> <span class="ae-kbd">⌥</span>); değer sıçrar, ara doldurma kalkar.</li>
                    </ol>
                    <p class="ae-demo-note">Aynı animasyona Hold uygulanıp önizlenir: akıcı hareket stop-motion ritmine döner.</p>
                </div>
            `,
            notes: "Eller üstünde tip değişimi. Hold demosu en çarpıcı: akıcı → sıçramalı. Ctrl-klik hızlı yolunu hatırlat.",
        },
        {
            id: "oyna-playground",
            title: "Oyna: Eğriyi Elle Şekillendir",
            category: "Etkileşim",
            className: "slide-fill",
            html: `
                <p class="mg-sub">Kollar (handle) sürüklenir; nokta o eğriyle hareket eder. Aşağı çekildiğinde yavaş başlar, yukarı atıldığında fırlar.</p>
                <div data-motion-demo="playground" data-bezier="0.34,1.56,0.64,1"></div>
            `,
            notes: "Sınıfça bir kol aşağı, bir yukarı. Aynı süre, bambaşka his. Overshoot için ikinci kontrol noktası 1'in üstüne çekilir.",
        },
        {
            id: "uc-easing-yaris",
            title: "Aynı Hareket, Üç Easing",
            category: "Karşılaştırma",
            className: "slide-fill",
            html: `
                <p class="mg-sub">Aynı mesafe, aynı süre. Tek fark: eğri. Yarıştır ile üçü aynı anda gider.</p>
                <div data-motion-demo="race" data-easings="linear,ease,overshoot"></div>
            `,
            notes: "linear = mekanik/robotik. ease = doğal. overshoot = enerjik/snappy. Hangisi canlı? Bağlama göre değişir.",
        },
    ],
};
