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
