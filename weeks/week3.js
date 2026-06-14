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
