/**
 * ==========================================================================
 * WEEK 4 · Ağırlık & Canlılık (H4)
 * ==========================================================================
 * Plan: weeks/week4.plan.md · tasks: weeks/week4.tasks.md · reçete: DESTE_KILAVUZU.md
 * ~19 slayt: ağırlık (spacing + squash & stretch) -> bouncing ball -> canlılık
 * (anticipation · follow-through/overlapping · arcs) -> sentez + ödev.
 * Motorsuz: canlı JS yok, öğretim statik slayt + doğrulanmış YouTube embed üzerinden.
 * İlke izi (mg-trace) deste-içi inline işaretlenir (week3 pratiği; week1.js değişmez).
 */

export const week4 = {
    title: "04 · Ağırlık ve Canlılık",
    slides: [
        /* ── A · KANCA ─────────────────────────────────────────────────── */
        {
            id: "acilis",
            title: "Ağırlık ve Canlılık",
            subtitle: "Hareketli Grafik Tasarımı · 4. Hafta · Ağırlık & Canlılık",
            type: "hero",
            html: `<p class="mg-sub">Graph editor eğrinin karakterini verdi. Bu hafta o karakter tek bir cisme taşınır: yere düşüp seken bir top. Top boyunca dört ilke katmanlanır, ölü bir hareket canlanır.</p>`,
            notes: "W3'te eğrinin karakteri (graph editor) öğrenildi. Bu hafta tek egzersiz: klasik bouncing ball. Top boyunca squash & stretch, anticipation, follow-through, arcs katmanlanır. Sonda ödev = logo noktasıyla aynı egzersiz.",
        },
        {
            id: "bu-hafta",
            category: "Yol Haritası",
            title: "Bu Hafta: Ağırlık, Sonra Canlılık",
            html: `
                <p class="mg-intro">Geçen hafta eğri <strong>graph editor</strong>'da okundu ve şekillendirildi. Bu hafta o eğri tek bir cisme uygulanır: <strong>bouncing ball</strong> (zıplayan top). Önce <strong>ağırlık</strong> kurulur (spacing ve squash &amp; stretch), sonra dört <strong>principle</strong> (ilke) ile <strong>canlılık</strong> eklenir.</p>
                <div class="ae-flow" style="margin:22px 0 18px;">
                    <span class="ae-flow__step">Spacing</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step" lang="en">Squash &amp; stretch</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step" lang="en">Bouncing ball</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step">Canlılık</span>
                </div>
                <div class="mg-callout">
                    <h4>Hafta sonunda</h4>
                    <p>Basit bir daire, ağırlığı ve canlılığı olan bir topa dönüşür: yere çarpınca ezilir, zıplarken gerilir, peşindeki kuyruk savrulur. Hepsi keyframe ve eğriyle.</p>
                </div>
            `,
            notes: "İki saat, çoğu AE'de. Akış: önce ağırlık (spacing + squash & stretch), sonra dört ilkeyle canlılık. Omurga tek egzersiz: bouncing ball. Sonda ödeve köprü.",
        },
        {
            id: "ayni-dusus-iki-his",
            category: "Kanca",
            title: "Aynı Düşüş, İki His",
            className: "slide-fill",
            html: `
                <p class="mg-sub" style="max-width:720px; margin:0 auto;">İki top aynı yükseklikten, aynı sürede düşer. Biri <strong>cansız</strong> bir taş gibi iner, diğeri ağırlığı olan <strong>canlı</strong> bir lastik gibi. Keyframe sayısı aynı: fark, çarpışmadaki <strong>squash &amp; stretch</strong> (ezilme ve gerilme) ile spacing'tedir. Alan Becker bunu kare kare gösterir.</p>
                <div class="yt-embed"><iframe src="https://www.youtube.com/embed/haa7n3UGyDc" title="Squash and Stretch · Alan Becker" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            `,
            notes: "Hook: aynı düşüş, iki his. Videoyu (Alan Becker · Squash & Stretch) sınıfta aç, sonra 'fark = ağırlık + ezilme/gerilme + spacing' vurgusu. Haftanın sözü: bu topu birlikte canlandıracağız.",
        },

    ]
};
