/**
 * ==========================================================================
 * WEEK 3 · Graph Editor: Hareketin Karakteri (H3)
 * ==========================================================================
 * Plan: weeks/week3.plan.md · reçete: DESTE_KILAVUZU.md
 * 21 slayt: oku (value/speed graph) -> şekillendir (kollar, overshoot) -> his sözlüğü.
 * 06-18 revizyon: motion-path + canlı widget'lar çıktı, anlatım güçlendirildi.
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
                    <h4>Hafta sonunda</h4>
                    <p>Aynı basit hareket alınır, ona istenen <strong>karakter</strong> verilir: yumuşak iniş, sert duruş ya da zıplayan bir enerji. Hepsi tek bir eğriyle.</p>
                </div>
            `,
            notes: "İki saat, çoğu AE'de. Geçen hafta Easy Ease tek tıktı; bu hafta o tıkın altındaki eğriyi açıyoruz. Akış: oku, şekillendir, karşılaştır.",
        },
        {
            id: "spacing",
            category: "Temel",
            title: "Ara Kareler ve Spacing",
            html: `
                <p class="mg-intro">İki keyframe arası boş değildir: aradaki kareleri <strong>After Effects üretir</strong>. O karelerin <strong>aralığı</strong> hareketin hızını belirler. Bu aralık dağılımına <strong>spacing</strong> (aralık) denir; graph editor tam olarak bunu çizer.</p>
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
            id: "ornek-iki-top",
            category: "Örnek",
            title: "İki Top, Bir Fark",
            className: "slide-fill",
            html: `
                <p class="mg-sub" style="max-width:700px; margin:0 auto;">Aynı sürede inen iki top: keyframe'leri aynı, ama biri <strong>cansız</strong> biri <strong>canlı</strong>. Fark, ara karelerin <strong>aralığında</strong> (spacing): eşit aralık mekanik, gittikçe açılan aralık hızlanma ve can verir. TED-Ed bunu kare kare gösterir.</p>
                <div style="position:relative; width:min(640px,90%); margin:16px auto 0; aspect-ratio:16/9; border-radius:14px; overflow:hidden; border:1px solid var(--line-2); box-shadow:0 10px 34px -14px rgba(0,0,0,0.65);">
                    <iframe src="https://www.youtube.com/embed/KRVhtMxQWRs" title="Animation Basics: The Art of Timing and Spacing · TED-Ed" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position:absolute; inset:0; width:100%; height:100%; border:0;"></iframe>
                </div>
            `,
            notes: "Spacing'i videoda göster (TED-Ed · Alan Becker): aynı top, farklı ara-kare dağılımı = farklı his. Sınıfta aç, izlet, sonra graph editor'e geç. Eşit aralık = mekanik; açılan aralık = hızlanma ve can.",
        },
        {
            id: "graph-ac",
            category: "Eğriyi Okuma",
            title: "Graph Editor: Eğrinin Açıldığı Yer",
            html: `
                <p class="mg-intro">Easy Ease bir tuştu ama altında bir <strong>eğri</strong> var. <strong>Graph editor</strong> (grafik düzenleyici) o eğriyi gösterir: keyframe'ler arasını After Effects'in nasıl doldurduğunu çizen grafik. Timeline keyframe'in <em>yerini</em>, graph editor <em>karakterini</em> gösterir.</p>
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
                <p class="mg-intro"><strong>Value graph</strong> (değer grafiği) bir <strong>harita</strong> gibidir: nesnenin her an <em>nerede</em> olduğunu, yani değerini çizer. Dikey eksen değer, yatay eksen zaman; konum 0'dan 500'e gidiyorsa çizgi 0'dan 500'e tırmanır.</p>
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
                <p class="mg-intro"><strong>Speed graph</strong> (hız grafiği) bir araba <strong>hız göstergesi</strong> gibidir: değeri değil, nesnenin <em>ne kadar hızlı</em> gittiğini çizer. Eğrinin <strong>yüksekliği</strong> o anki hızdır; tepe en hızlı an, dipteki düz çizgi durağan (hız sıfır).</p>
                <div class="mg-callout" style="margin-bottom:14px;">
                    <h4>Tuzak: aynı şekil, farklı anlam</h4>
                    <p>Value graph'ta düz çizgi "sabit değer" (duruyor) demek. Speed graph'ta <strong>dipteki</strong> düz çizgi "duruyor", <strong>yukarıdaki</strong> düz çizgi "sabit hızla gidiyor" demek.</p>
                </div>
                <p class="mg-sub">Easy Ease'in speed graph'ı bir <strong>tümsektir</strong>: dipten başlar (yavaş), tepeye çıkar (hızlı), dibe iner (yavaş). Slow in, slow out.</p>
                <p class="mg-foot">Position'da value graph X ve Y için <strong>iki ayrı çizgi</strong> gösterir; speed graph ikisini <strong>tek çizgide</strong> birleştirir, bu yüzden hareketin easing'i speed graph'ta daha kolay kurulur.</p>
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
                    <div class="mg-term"><span class="mg-term__k" lang="en">Bezier <small>· kum saati</small></span><p class="mg-term__d">Yumuşak; iki kol elle şekillenir. Easy Ease (<span class="ae-kbd">F9</span>) bunun hazır hâlidir.</p></div>
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
            title: "Eğriyi Şekillendirmek: Kollar ve Influence",
            html: `
                <p class="mg-intro">Easy Ease hazır bir eğriydi. Graph editor'da her keyframe'in iki <strong>kolu</strong> (bezier handle) vardır; bunlar çekilerek eğri elle şekillenir. Kolu <strong>uzatmak</strong> o yöndeki yavaşlamayı artırır.</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card mg-card--cyan"><div class="mg-card__title">Slow in</div><p class="mg-card__text">Giriş kolu uzun: nesne hedefe <strong>yumuşak</strong> yaklaşır, yavaşlayarak durur.</p></div>
                    <div class="mg-card mg-card--magenta"><div class="mg-card__title">Slow out</div><p class="mg-card__text">Çıkış kolu uzun: nesne <strong>tembel</strong> başlar, yavaşça hızlanır.</p></div>
                </div>
                <p class="mg-foot"><strong>Influence</strong> (%) = kolun uzunluğu. Kısa kol keskin, uzun kol yayvan geçiş.</p>
                <div style="margin-top:16px;"><span class="mg-trace" lang="en">slow in / slow out</span></div>
            `,
            notes: "Easy Ease'in elle hâli. Kol uzunluğu = influence = yavaşlama miktarı. Uzun kol yumuşak, kısa sert. Speed graph'ta tümseğin şekli buna göre değişir.",
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
                    <p class="ae-demo-note">Kural basit: bir kol oynatılır, <span class="ae-kbd">Space</span> ile izlenir, tekrar oynatılır. Eğri ezbere değil, gözle kurulur.</p>
                </div>
            `,
            notes: "Eller üstünde. Sarı kollar = bezier handle. Çek, önizle, çek, önizle.",
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
            title: "Bu Haftanın Ödevi: Top Sektirme",
            html: `
                <div class="mg-task">
                    <p class="mg-task__brief">Bir top yere düşüp <strong>sekiyor</strong>: en az <strong>5 kez</strong> seksin, her keresinde bir öncekinden alçak. Hareketin tüm karakteri <strong>graph editor'daki eğride</strong> kurulacak. Tek MP4.</p>
                    <ul class="mg-list">
                        <li>Düşüşte <strong>hızlanma</strong>, tepede <strong>yavaşlama</strong>: eğri <strong>graph editor'da elle</strong> şekillenmeli (hazır preset değil).</li>
                        <li>Her seferinde biraz daha alçak: <strong>enerji kaybı</strong> görünsün.</li>
                        <li><strong>Speed graph</strong> ya da <strong>value graph</strong> kullan; tercih sana bağlı.</li>
                        <li><strong>H.264 / MP4</strong>, en fazla 5 sn.</li>
                    </ul>
                    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:18px;">
                        <span class="mg-links__label">teslim</span>
                        <span class="mg-chip mg-chip--magenta">MP4 (H.264)</span>
                        <span class="mg-chip mg-chip--cyan">UZAK'a yükle</span>
                        <span class="mg-chip">gelecek haftaya kadar</span>
                    </div>
                </div>
                <div class="mg-callout" style="margin-top:18px;">
                    <h4>İpucu</h4>
                    <p>Önce sadece dikey konumu (Position Y) keyframe'le, zıplamaları kabaca kur; sonra <strong>graph editor</strong>'da eğriyi şekillendir. İsteğe bağlı: topa bir kişilik ver, ağır bowling mi yoksa zıpır pinpon mu?</p>
                </div>
            `,
            notes: "Ödev: top sektirme, MP4 olarak UZAK'a gelecek haftaya kadar. En az 5 kez seksin, her seferinde alçalsın (enerji kaybı). Karakter graph editor eğrisinde; düşüşte hızlan, tepede yavaşla. Speed ya da value graph, öğrenciye bağlı. Squash & stretch YOK, sadece sektirme. Sıra önerisi: önce Position Y, sonra eğri. Bonus: kişilik (bowling vs pinpon).",
        },
        {
            id: "odev-kaynaklar",
            category: "Kaynak",
            title: "Ödev İçin Kaynaklar",
            html: `
                <p class="mg-intro">Top sektirme, animasyonun klasik ilk egzersizidir: spacing, easing ve ağırlık hissini bir arada çalıştırır. Aşağıdaki iki video da graph editor üzerinden ilerliyor; biri doğrudan top sektirme, diğeri eğri okumayı derinleştiriyor.</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card mg-card--cyan">
                        <div class="mg-links__label" style="margin-bottom:10px;">Video · School of Motion</div>
                        <div class="mg-card__title">Graph Editor → Perfect Ball Bounce</div>
                        <p class="mg-card__text">Tam ödevin konusu: graph editor'la top sektirme, adım adım. En yakın referans.</p>
                        <a class="mg-link" href="https://youtu.be/mEmRHw4p4_A" target="_blank" rel="noopener" style="margin-top:14px;">YouTube'da izle</a>
                    </div>
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-links__label" style="margin-bottom:10px;">Video · Jake In Motion</div>
                        <div class="mg-card__title">The LAST Graph Editor Tutorial</div>
                        <p class="mg-card__text">Eğri okumayı ve graph editor'ı derinleştiren kapsamlı anlatım; ödevdeki "elle eğri" kısmı için.</p>
                        <a class="mg-link" href="https://youtu.be/7pOCtlrrE3Y" target="_blank" rel="noopener" style="margin-top:14px;">YouTube'da izle</a>
                    </div>
                </div>
                <div class="mg-callout" style="margin-top:18px;">
                    <h4>Başka kaynaklar: kendin araştır</h4>
                    <p>Şu terimleri YouTube ya da Google'da aratarak çok daha fazla anlatıma ulaşabilirsin:</p>
                    <div style="display:flex; flex-wrap:wrap; gap:8px; margin-top:12px;">
                        <span class="mg-chip" lang="en">bouncing ball after effects</span>
                        <span class="mg-chip" lang="en">graph editor ball bounce</span>
                        <span class="mg-chip" lang="en">ease in out after effects</span>
                        <span class="mg-chip" lang="en">bouncing ball timing spacing</span>
                        <span class="mg-chip">after effects top sektirme</span>
                    </div>
                </div>
            `,
            notes: "Ödev kaynakları: 2 video + arama terimleri (öğrenci kendi araştırması için). SoM: graph editor'la top sektirme (birebir). Jake In Motion: graph editor derinleştirme (elle eğri). Teslim: MP4, UZAK'a gelecek haftaya kadar.",
        },
    ],
};
