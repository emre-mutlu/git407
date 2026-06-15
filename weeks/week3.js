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
            id: "elle-egri",
            category: "Şekillendirme",
            title: "Eğriyi Elle: Kollar ve Influence",
            html: `
                <p class="mg-intro">Easy Ease hazır bir eğriydi. Graph editor'da her keyframe'in iki <strong>kolu</strong> (bezier handle) vardır; bunlar çekilerek eğri elle şekillenir. Kolu <strong>uzatmak</strong> o yöndeki yavaşlamayı artırır.</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card mg-card--cyan"><div class="mg-card__title">Slow in</div><p class="mg-card__text">Giriş kolu uzun: nesne hedefe <strong>yumuşak</strong> yaklaşır, yavaşlayarak durur.</p></div>
                    <div class="mg-card mg-card--magenta"><div class="mg-card__title">Slow out</div><p class="mg-card__text">Çıkış kolu uzun: nesne <strong>tembel</strong> başlar, yavaşça hızlanır.</p></div>
                </div>
                <p class="mg-foot"><strong>Influence</strong> (%) = kolun uzunluğu. Kısa kol keskin, uzun kol yayvan geçiş.</p>
                <div style="margin-top:16px;"><span class="mg-trace" lang="en">slow in / slow out</span></div>
            `,
            notes: "Easy Ease'in elle hâli. Kol uzunluğu = influence = yavaşlama miktarı. Uzun kol yumuşak, kısa sert. Yandaki oyna slaytı bunu canlı gösterir.",
        },
        {
            id: "demo-elle-egri",
            category: "AE Demo",
            title: "Demo · Kolları Çekmek",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>Graph Editor'da bir keyframe seçilir; <strong>sarı kollar</strong> belirir. Speed graph'ta çekildikçe tümseğin şekli değişir.</li>
                        <li>Giriş kolu yatay uzatılır: nesnenin <strong>yumuşak indiği</strong> görülür. Kısaltılınca <strong>sert</strong> durur.</li>
                        <li>Çıkış kolu ayarlanır; <span class="ae-kbd">Space</span> ile her ayardan sonra hareket izlenir.</li>
                    </ol>
                    <p class="ae-demo-note">Yandaki canlı playground: aynı kolları çekip etkiyi tarayıcıda anında görmek mümkün.</p>
                </div>
            `,
            notes: "Eller üstünde. Sarı kollar = bezier handle. Çek, önizle, çek, önizle. Playground slaytıyla birebir aynı mantık.",
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
            id: "overshoot",
            category: "Şekillendirme",
            title: "Overshoot: %100'ün Ötesi",
            html: `
                <p class="mg-intro">Bazen hareket hedefi <strong>aşıp geri döner</strong>, bir yay gibi. Buna <strong>overshoot</strong> denir. Value graph'ta eğri hedef değerin <strong>üstüne</strong> çıkıp geri iner; kol kutunun dışına taşar.</p>
                <div class="mg-grid-2-1">
                    <div>
                        <p class="mg-sub">Overshoot harekete <strong>enerji ve canlılık</strong> katar: snappy arayüz geçişleri, zıplayan logolar, esprili mikro animasyonlar. Az miktarı bile cansız bir hareketi diriltir.</p>
                    </div>
                    <div class="mg-callout">
                        <h4>İlke bağı</h4>
                        <p>Overshoot, abartının (<span lang="en">exaggeration</span>) hareketteki hâlidir: gerçeği biraz zorlayıp <strong>daha okunur</strong> kılmak.</p>
                    </div>
                </div>
                <div style="margin-top:16px;"><span class="mg-trace" lang="en">exaggeration</span></div>
            `,
            notes: "Overshoot = hedefi aşıp dönmek = yay/snappy his. Value graph'ta %100 üstüne taşar. Az bile çok katar. Exaggeration ilkesi.",
        },
        {
            id: "demo-overshoot",
            category: "AE Demo",
            title: "Demo · Yayı Kurmak",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>Value Graph'a geçilir. Hedef keyframe'in kolu yukarı, <strong>kutunun üstüne</strong> çekilir: eğri hedefi aşar.</li>
                        <li>Aşan tepe sonra geri iner: nesne hedefi geçip <strong>geri yaslanır</strong>. <span class="ae-kbd">Space</span> ile izlenir.</li>
                        <li>Miktar ayarlanır: hafif overshoot zarif, fazlası komik kaçar. Doz önemli.</li>
                    </ol>
                    <p class="ae-demo-note">Pratik yol: iki keyframe yerine üç; orta keyframe hedefin biraz ötesinde, son keyframe hedefte.</p>
                </div>
            `,
            notes: "Value graph'ta kolu kutu dışına çek = overshoot. Ya da 3 keyframe: ötesine geç, hedefe otur. Doz vurgusu: az = zarif.",
        },
        {
            id: "reveal-overshoot",
            category: "Soru ve Tartışma",
            type: "reveal",
            title: "Overshoot Her Yere Uyar mı?",
            question: "Snappy overshoot harika hissettiriyor. Peki her animasyona konmalı mı? Nerede iyi, nerede ters?",
            html: `
                <p class="mg-intro">Bağlama göre. <strong>İyi durduğu yer:</strong> oyunlaştırılmış arayüz, çocuk içeriği, eğlenceli marka, mikro etkileşim. <strong>Dikkat:</strong> ciddi ve kurumsal kimlik, veri görselleştirme, sık tekrarlayan UI; orada abartı yorucu ve ucuz durur.</p>
                <p class="mg-sub">Soru "snappy mi yumuşak mı" değil, "<strong>bu işe ne yakışır</strong>". Easing bir ton seçimidir; içeriğin sesiyle uyumlu olmalı.</p>
            `,
            notes: "Eleştirel göz kur. Cevap: bağlama göre. Eğlenceli = evet, kurumsal/veri = dikkat. Easing = ton. Tasarım kararı, refleks değil.",
        },
        {
            id: "his-sozlugu",
            category: "Şekillendirme",
            title: "Eğri → His Sözlüğü",
            html: `
                <p class="mg-intro">Her eğri şeklinin bir <strong>hissi</strong>, o hissin bir <strong>yeri</strong> vardır. Teknikten tasarıma geçiş bu eşleştirmeyle olur:</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-term"><span class="mg-term__k" lang="en">linear</span><p class="mg-term__d"><strong>Mekanik, robotik.</strong> Yükleme çubuğu, sabit dönen çark; duygu yok.</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">ease-out</span><p class="mg-term__d"><strong>Yumuşak iniş.</strong> Bir şeyin gelip oturması; en sık, en güvenli seçim.</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">ease-in</span><p class="mg-term__d"><strong>Yaylanıp kalkış.</strong> Bir şeyin gidişi, sahneden çıkışı; anticipation hissi.</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">overshoot</span><p class="mg-term__d"><strong>Enerjik, snappy.</strong> Esprili, dikkat çeken; az dozda imza gibi.</p></div>
                </div>
                <p class="mg-foot">Doğru eğri = doğru his. Yazılım bilgisi burada <strong>tasarım kararına</strong> dönüşür.</p>
            `,
            notes: "Haftanın tasarım slaytı. Eğri = duygu sözlüğü. linear=duygusuz, ease-out=iner, ease-in=kalkar, overshoot=enerjik. Hangisi ne zaman: içerik karar verir.",
        },
        {
            id: "motion-path",
            category: "Uzamsal",
            title: "Motion Path: Uzayda da Eğri Var",
            html: `
                <p class="mg-intro">Şimdiye kadarki eğriler <strong>zaman</strong> içindi (ne zaman, ne kadar hızlı). Ama bir nesne uzayda da düz ya da <strong>eğri</strong> gidebilir. Position keyframe'leri arası comp panelinde bir <strong>motion path</strong> (hareket yolu) çizer.</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card"><div class="mg-card__title">Düz yol</div><p class="mg-card__text">A'dan B'ye doğru çizgi: mekanik, cansız.</p></div>
                    <div class="mg-card mg-card--magenta"><div class="mg-card__title">Yay (arc)</div><p class="mg-card__text">Hafif kavisli yol: doğal, organik. Gerçek hareket nadiren düzdür.</p></div>
                </div>
                <p class="mg-foot">Comp panelinde yol noktalarının kolları çekilir; düz çizgi yaya döner. <span lang="en">Convert Vertex</span> aracı köşeyi yumuşatır.</p>
                <div style="margin-top:16px;"><span class="mg-trace" lang="en">arcs</span></div>
            `,
            notes: "Eğrinin uzamsal yarısı. Zaman eğrisi = graph editor; uzay eğrisi = motion path (comp'ta). Arcs ilkesi: doğada düz hareket yok; kuş, top, el hep yay çizer.",
        },
        {
            id: "demo-motion-path",
            category: "AE Demo",
            title: "Demo · Yolu Eğmek",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>İki position keyframe'li bir katmanda, comp panelinde noktaları birleştiren <strong>kesik çizgi</strong> (motion path) görülür.</li>
                        <li>Bir yol noktası seçilir; çıkan <strong>kolları</strong> çekilir, düz yol <strong>yaya</strong> döner.</li>
                        <li>Köşeli geçiş için <span class="ae-menu" lang="en">Pen tool</span> altındaki <span class="ae-menu" lang="en">Convert Vertex</span> ile nokta yumuşatılır.</li>
                    </ol>
                    <p class="ae-demo-note">Yoldaki noktaların sıklığı spacing'i gösterir: sık noktalar yavaş, seyrek noktalar hızlı bölge.</p>
                </div>
            `,
            notes: "Comp panelinde motion path kolları. Düz → yay. Convert Vertex köşe yumuşatır. Bonus: yol noktaları = spacing'in uzamsal hâli.",
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
        {
            id: "demo-uc-easing",
            category: "AE Demo",
            title: "Demo · Aynı Hareket, Üç Easing",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>Bir nesne A'dan B'ye taşınır (iki position keyframe). Katman iki kez çoğaltılır (<span class="ae-kbd">Ctrl</span> <span class="ae-kbd">D</span>); üç kopya alt alta.</li>
                        <li>Biri <strong>linear</strong> bırakılır, biri <strong>Easy Ease</strong> (<span class="ae-kbd">F9</span>), biri graph'ta <strong>overshoot</strong>'a şekillenir.</li>
                        <li>Üçü aynı anda oynatılır (<span class="ae-kbd">Space</span>): aynı mesafe, aynı süre, üç ayrı his. Yandaki yarış slaytının AE'deki karşılığı.</li>
                    </ol>
                    <p class="ae-demo-note">Haftanın özeti: tek değişken easing, sonuç tamamen farklı. Karar tasarımcınındır.</p>
                </div>
            `,
            notes: "Haftanın doruk demosu. 3 kopya, 3 easing, yan yana oynat. Tarayıcıdaki race slaytının AE hâli. 'Tek fark eğri' net görünsün.",
        },
        {
            id: "logoya-uygula",
            category: "Uygulama",
            title: "Şimdi Kendi Logona",
            html: `
                <p class="mg-intro">Öğrenilen her şey tek bir yerde buluşur: <strong>geçen haftaki logo animasyonu</strong>. Linear keyframe'ler graph editor'da elle şekillenir, bir yere hafif overshoot eklenir, giriş yumuşatılır.</p>
                <div class="ae-flow" style="margin:20px 0 16px;">
                    <span class="ae-flow__step">W2 logosu</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step">graph'ta elle ease</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step">bir dokunuş overshoot</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step">canlı giriş</span>
                </div>
                <div class="mg-callout">
                    <h4>W2'yi yapmadıysan</h4>
                    <p>Sorun değil: basit bir şekil (daire, kare) ile de aynı pratik yapılır. Önemli olan eğriyi elle kurmak.</p>
                </div>
            `,
            notes: "Coda: teknik kendi işine döner. W2 logosu varsa onu canlandır; yoksa basit obje. Süreklilik + 'kendi işini iyileştir' hissi.",
        },
        {
            id: "hatalar",
            category: "Dikkat",
            title: "Graph Editor'da Acemi Hataları",
            html: `
                <p class="mg-intro">Bu üçü graph editor'a yeni geçenin başına gelir:</p>
                <div class="mg-grid-3 stagger">
                    <div class="mg-card mg-card--magenta"><span class="mg-card__icon">▰</span><div class="mg-card__title">Her şeyi linear bırakmak</div><p class="mg-card__text">Keyframe kondu ama eğriye dokunulmadı. Hareket robotik. En sık hata.</p></div>
                    <div class="mg-card mg-card--amber"><span class="mg-card__icon">◭</span><div class="mg-card__title">Aşırı overshoot</div><p class="mg-card__text">Her şey zıplıyorsa hiçbiri özel değildir. Doz kaçınca ucuz durur.</p></div>
                    <div class="mg-card mg-card--cyan"><span class="mg-card__icon">▤</span><div class="mg-card__title">Yanlış grafiği okumak</div><p class="mg-card__text">Speed graph'ı value graph sanmak; dipteki düz çizgiyi "sabit değer" okumak.</p></div>
                </div>
            `,
            notes: "Üç klasik. Linear bırakmak = en yaygın. Aşırı overshoot = doz. Grafik karıştırma = speed vs value. Ödev dönüşünde bunlara bak.",
        },
        {
            id: "cheatsheet",
            category: "Referans",
            title: "Graph Editor Cheatsheet",
            html: `
                <div class="cheat-grid stagger">
                    <div class="cheat-group">
                        <h4><span lang="en">Graph Editor</span></h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">Shift</span> <span class="ae-kbd">F3</span></span> editörü aç / kapat</li>
                            <li><span class="keys"><span class="ae-kbd">F9</span></span> Easy Ease (yumuşat)</li>
                            <li><span class="keys"><span class="ae-kbd">Shift</span> <span class="ae-kbd">F9</span></span> Easy Ease In</li>
                        </ul>
                    </div>
                    <div class="cheat-group">
                        <h4>Keyframe tipi</h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">Ctrl</span> klik</span> linear ile auto bezier arası</li>
                            <li><span class="keys"><span class="ae-kbd">Ctrl</span> <span class="ae-kbd">Alt</span> klik</span> Hold aç / kapat</li>
                            <li>sağ tık → <span lang="en">Keyframe Interpolation</span></li>
                        </ul>
                    </div>
                    <div class="cheat-group">
                        <h4>Grafik &amp; yol</h4>
                        <ul>
                            <li><span lang="en">Choose graph type</span> value ile speed arası</li>
                            <li><span lang="en">Fit selection to view</span> eğriyi sığdır</li>
                            <li><span lang="en">Separate Dimensions</span> X / Y ayrı eğri</li>
                            <li><span lang="en">Convert Vertex</span> yol köşesini yumuşat</li>
                        </ul>
                    </div>
                    <div class="cheat-group">
                        <h4>Gezinme</h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">J</span> <span class="ae-kbd">K</span></span> önceki / sonraki keyframe</li>
                            <li><span class="keys"><span class="ae-kbd">Space</span></span> önizleme</li>
                            <li><span class="keys"><span class="ae-kbd">U</span></span> animasyonlu özellikler</li>
                        </ul>
                    </div>
                </div>
            `,
            notes: "Referans slaytı. Shift+F3 ve F9 en kritik. Separate Dimensions = X/Y bağımsız eğri (pro). Convert Vertex = yol. Öğrenci fotoğraf çeksin.",
        },
        {
            id: "ilham",
            category: "İlham",
            title: "İyi Easing Nerede Görülür",
            html: `
                <p class="mg-intro">Eğri okuma gözü açılınca her yerde görünür: bir uygulamanın açılışı, bir logonun yaylanışı, bir geçişin yumuşaklığı. Hepsi birkaç iyi eğridir. İzlerken "bu hangi easing" diye sormak en iyi egzersiz.</p>
                <div class="mg-grid-2 stagger" style="margin-bottom:16px;">
                    <div class="mg-card mg-card--cyan">
                        <div class="mg-card__title">UI ve arayüz hareketi</div>
                        <p class="mg-card__text">Material Design ve iOS geçişleri easing üstüne kuruludur; standartları incelemeye değer.</p>
                        <a class="mg-link" href="https://m2.material.io/design/motion/the-motion-system.html" target="_blank" rel="noopener" style="margin-top:12px;">Material motion</a>
                    </div>
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-card__title">Motion design topluluğu</div>
                        <p class="mg-card__text">Snappy, overshoot'lu mikro animasyonların günlük akışı; eğri hissi için en iyi besleme.</p>
                        <a class="mg-link" href="https://dribbble.com/tags/motion" target="_blank" rel="noopener" style="margin-top:12px;">Dribbble · motion</a>
                    </div>
                </div>
                <div class="mg-links" style="justify-content:center;">
                    <span class="mg-links__label">eğri kütüphanesi</span>
                    <a class="mg-link" href="https://easings.net" target="_blank" rel="noopener">easings.net</a>
                </div>
            `,
            notes: "Eğri gözünü besle. UI motion (Material/iOS), Dribbble motion, easings.net. Sürekli egzersiz: 'bu hangi easing' diye bakmak.",
        },
        {
            id: "odev",
            category: "Haftalık Ödev",
            title: "Bu Haftanın Ödevi",
            html: `
                <div class="mg-task">
                    <p class="mg-task__brief">Basit bir nesneyle (daire, kare ya da W2 logosu) <strong>aynı A→B hareketinin üç hâli</strong>: <strong>linear</strong>, <strong>Easy Ease</strong> ve <strong>elle overshoot</strong>. Üçü yan yana, tek MP4.</p>
                    <ul class="mg-list">
                        <li>Aynı mesafe, aynı süre; tek değişken <strong>easing</strong>.</li>
                        <li>Overshoot'lu olan <strong>graph editor'da elle</strong> kurulmuş olmalı (hazır preset değil).</li>
                        <li>Üç kopya alt alta, <strong>aynı anda</strong> oynayacak şekilde.</li>
                        <li><strong>H.264 / MP4</strong>, en fazla 5 sn.</li>
                    </ul>
                    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:18px;">
                        <span class="mg-links__label">teslim</span>
                        <span class="mg-chip mg-chip--magenta">MP4 dosyası</span>
                        <span class="mg-chip" lang="en">3 easing yan yana</span>
                        <span class="mg-chip mg-chip--cyan">gelecek derse kadar</span>
                    </div>
                </div>
                <div class="mg-callout" style="margin-top:18px;">
                    <h4>İpucu</h4>
                    <p>Önce bir hareket kurulur, iki kez çoğaltılır (<span class="ae-kbd">Ctrl</span> <span class="ae-kbd">D</span>), sonra her kopyaya farklı easing verilir. İsteğe bağlı: aynı eğri kendi logona uygulanır.</p>
                </div>
            `,
            notes: "Ödev = aynı hareket × 3 easing → MP4. Overshoot elle kurulmalı (öğrenme kanıtı). Bonus: logoya uygula. Gelecek hafta H4: zıplayan top.",
        },
    ],
};
