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

        /* ── B · SPACING + SQUASH & STRETCH ────────────────────────────── */
        {
            id: "spacing-agirlik",
            category: "Spacing",
            title: "Spacing: Ağırlığın Dili",
            html: `
                <p class="mg-intro">Geçen hafta <strong>spacing</strong> (aralık) hareketin hızını çiziyordu. Bu hafta o aralık <strong>ağırlığı</strong> anlatır: yere düşen cisim hızlanır, tepede yavaşlar. Ara kareler <strong>tepede sıkışır</strong>, <strong>dipte açılır</strong>. Sekerken yukarı çıkış girişten kısadır: aradaki fark <strong>enerji kaybıdır</strong>.</p>
                <svg viewBox="0 0 220 118" role="img" aria-label="düşüş ve sekmede spacing: tepede dar, dipte geniş aralık, sekme girişten kısa" style="width:min(440px,82%); height:auto; display:block; margin:6px auto 14px;">
                    <line x1="28" y1="106" x2="192" y2="106" style="stroke:var(--line-2); stroke-width:1.5;"/>
                    <path d="M72 103 Q110 117 148 103" fill="none" style="stroke:var(--line); stroke-width:1; stroke-dasharray:2 3;"/>
                    <text x="72" y="12" text-anchor="middle" style="font-family:var(--font-mono); font-size:8px; fill:var(--cyan);">DÜŞÜŞ</text>
                    <text x="148" y="12" text-anchor="middle" style="font-family:var(--font-mono); font-size:8px; fill:var(--magenta);">SEKME</text>
                    <circle cx="72" cy="20" r="4.5" style="fill:var(--cyan);"/><circle cx="72" cy="25" r="4.5" style="fill:var(--cyan);"/><circle cx="72" cy="33" r="4.5" style="fill:var(--cyan);"/><circle cx="72" cy="45" r="4.5" style="fill:var(--cyan);"/><circle cx="72" cy="61" r="4.5" style="fill:var(--cyan);"/><circle cx="72" cy="81" r="4.5" style="fill:var(--cyan);"/><circle cx="72" cy="103" r="4.5" style="fill:var(--cyan);"/>
                    <circle cx="148" cy="103" r="4.5" style="fill:var(--magenta);"/><circle cx="148" cy="84" r="4.5" style="fill:var(--magenta);"/><circle cx="148" cy="69" r="4.5" style="fill:var(--magenta);"/><circle cx="148" cy="58" r="4.5" style="fill:var(--magenta);"/><circle cx="148" cy="51" r="4.5" style="fill:var(--magenta);"/><circle cx="148" cy="47" r="4.5" style="fill:var(--magenta);"/><circle cx="148" cy="45" r="4.5" style="fill:var(--magenta);"/>
                </svg>
                <p class="mg-sub">Aynı top, iki yön: aralığın dağılımı tek başına <strong>ağırlığı ve enerjiyi</strong> anlatır. Squash &amp; stretch eklenmeden önce his çoktan spacing'tedir.</p>
            `,
            notes: "W3 spacing'i ağırlığa bağla: yerçekimi = dibe hızlanma = açılan aralık. Tahtada düşüş kolonu (tepede sık, dipte seyrek) ile sekme kolonunu (alçalan tepe = enerji kaybı) göster. Bouncing ball'un yarısı burada, henüz S&S yok.",
        },
        {
            id: "squash-stretch",
            category: "İlke",
            title: "Squash & Stretch: Hacim Korunur",
            html: `
                <p class="mg-intro"><strong>Squash &amp; stretch</strong> (ezilme ve gerilme) animasyonun ilk ve en güçlü ilkesidir. Cisim hızlanınca hareket yönünde <strong>uzar</strong> (stretch), bir yüzeye çarpınca <strong>yassılır</strong> (squash). Tek kural: <strong>hacim sabit kalır</strong>. Genişledikçe kısalır, uzadıkça incelir; aksi halde top ya şişer ya erir.</p>
                <svg viewBox="0 0 240 116" role="img" aria-label="normal, ezilmiş ve gerilmiş top: hacim korunur" style="width:min(440px,82%); height:auto; display:block; margin:6px auto 12px;">
                    <line x1="22" y1="94" x2="218" y2="94" style="stroke:var(--line-2); stroke-width:1.5;"/>
                    <circle cx="55" cy="72" r="22" style="fill:var(--cyan); fill-opacity:0.9;"/>
                    <ellipse cx="120" cy="80" rx="31" ry="14" style="fill:var(--magenta); fill-opacity:0.9;"/>
                    <ellipse cx="188" cy="62" rx="13" ry="32" style="fill:var(--amber); fill-opacity:0.9;"/>
                    <text x="55" y="110" text-anchor="middle" lang="en" style="font-family:var(--font-mono); font-size:8.5px; fill:var(--text-mute);">NORMAL</text>
                    <text x="120" y="110" text-anchor="middle" lang="en" style="font-family:var(--font-mono); font-size:8.5px; fill:var(--text-mute);">SQUASH</text>
                    <text x="188" y="110" text-anchor="middle" lang="en" style="font-family:var(--font-mono); font-size:8.5px; fill:var(--text-mute);">STRETCH</text>
                </svg>
                <p class="mg-sub">Ağırlık ve esneklik buradan gelir: lastik top çok ezilir, bowling topu neredeyse hiç. Ezilme miktarı <strong>malzemeyi</strong> anlatır.</p>
                <div style="margin-top:16px;"><span class="mg-trace" lang="en">squash &amp; stretch</span></div>
            `,
            notes: "İlk ilke. Vurgu: hacim sabit (en × boy korunur), en sık acemi hatası hacim kaçağı. Ezilme miktarı malzemeyi anlatır: pinpon az ezilir mi çok mu? (çok). Bowling? (neredeyse hiç). Bir sonraki slaytta AE'de nasıl yapıldığı.",
        },
        {
            id: "ae-squash-stretch",
            category: "After Effects",
            title: "AE'de Squash & Stretch",
            html: `
                <p class="mg-intro">After Effects'te ezilme ve gerilme <strong>Scale</strong> (ölçek) ile yapılır. İki ön hazırlık şart: ölçeğin eni ve boyu ayrı oynayabilmeli, bir de ezilme doğru yerden olmalı.</p>
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li><strong>Anchor Point</strong> (sabit nokta) tabana taşınır: ezilme zeminden olsun diye çapa noktası alt kenara alınır (<span class="ae-kbd">Y</span> ile <span class="ae-menu" lang="en">Pan Behind</span> aracı).</li>
                        <li><strong>Scale</strong> üzerinde sağ tık → <span class="ae-menu" lang="en">Separate Dimensions</span>: en (X) ve boy (Y) artık ayrı keyframe'lenir.</li>
                        <li>Çarpışma karesinde boy <strong>kısaltılır</strong>, en <strong>genişletilir</strong> (hacim sabit); bir iki kare sonra normale, ardından hızlanırken hafif <strong>stretch</strong>.</li>
                    </ol>
                    <p class="ae-demo-note">Separate Dimensions olmadan Scale eni ve boyu birlikte ölçekler; ezilme yapılamaz.</p>
                </div>
                <div class="mg-links" style="justify-content:center; margin-top:16px;">
                    <span class="mg-links__label">izle</span>
                    <a class="mg-link" href="https://youtu.be/3RqoUMz3-8I" target="_blank" rel="noopener">Squash &amp; Stretch · After Effects (Motifize)</a>
                </div>
            `,
            notes: "AE pratiği: Anchor Point'i tabana (Y · Pan Behind), Scale → Separate Dimensions, sonra çarpışma karesinde boy kısa en geniş. Hacim korunsun: boy %80 ise en ~%120. Video link, sınıfta vakit varsa aç. Sonraki bölüm: tam bouncing ball kurulumu.",
        },

        /* ── C · AE'DE BOUNCING BALL ───────────────────────────────────── */
        {
            id: "bouncing-kurulum",
            category: "After Effects",
            title: "Bouncing Ball: Kurulum",
            html: `
                <p class="mg-intro">Klasik egzersiz adım adım kurulur. Önce iskelet: bir top, bir zemin ve düşüşün <strong>Position</strong> (konum) keyframe'leri. Easing henüz yok, hareket şimdilik mekanik.</p>
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>Bir <strong>Shape Layer</strong> ile daire (top) çizilir, altına ince bir solid ile <strong>zemin</strong> konur.</li>
                        <li>Topun <strong>Position</strong> özelliği açılır (<span class="ae-kbd">P</span>); tepe ve zemin için iki keyframe ile düşüş kurulur.</li>
                        <li>Sekmeler dizilir: her tepe bir öncekinden <strong>alçak</strong> olacak şekilde Position keyframe'leri eklenir.</li>
                    </ol>
                    <p class="ae-demo-note">Şimdilik düz (linear) hareket; karakter bir sonraki adımda graph editor'da gelir.</p>
                </div>
            `,
            notes: "İskelet kurulum: top + zemin + Position (P) keyframe'leri, sekmeler her seferinde alçalarak. Henüz easing yok, mekanik. W3 keyframe köprüsü. Vurgu: önce kaba hareket, karakter graph editor'da gelecek.",
        },
        {
            id: "graph-agirlik",
            category: "Graph Editor",
            title: "Graph'la Ağırlık",
            html: `
                <p class="mg-intro">Ağırlık <strong>graph editor</strong>'da kurulur (<span class="ae-kbd">Shift</span> <span class="ae-kbd">F3</span>). Düşüşte hareket dibe doğru <strong>hızlanır</strong> (ease-in), tepeye doğru <strong>yavaşlar</strong> (ease-out). Her sekme bir öncekinden <strong>alçak</strong>: enerji kaybı tepeleri giderek düşürür.</p>
                <svg viewBox="0 0 228 104" role="img" aria-label="bouncing ball value graph: gittikçe alçalan yaylar" style="width:min(460px,84%); height:auto; display:block; margin:6px auto 12px;">
                    <line x1="10" y1="92" x2="218" y2="92" style="stroke:var(--line-2); stroke-width:1.5;"/>
                    <path d="M10,30 Q38,86 50,92 Q82,4 114,92 Q140,32 166,92 Q186,56 206,92" fill="none" style="stroke:var(--cyan); stroke-width:2;"/>
                    <text x="214" y="102" text-anchor="end" style="font-family:var(--font-mono); font-size:8px; fill:var(--text-mute);">zaman →</text>
                </svg>
                <p class="mg-sub">Value graph yüksekliğin kendisini çizer (yukarıdaki yay dizisi); <strong>speed graph</strong> aynı hareketin hızını verir, orada her çarpışma <strong>sivri bir tepe</strong> olur. İkisi de aynı şeyi söyler: sert dip, yumuşak tepe.</p>
            `,
            notes: "Graph editor (Shift+F3): düşüşte ease-in (dibe hızlanma), tepede ease-out (yavaşlama). Alçalan yaylar = enerji kaybı. Value graph = yükseklik (yaylar); speed graph = hız (çarpışmada sivri tepe). Öğrenci ikisinden birini seçebilir (W3'teki tercih).",
        },
        {
            id: "ss-carpisma",
            category: "Sentez",
            title: "Squash'ı Çarpışmaya Ekle",
            className: "slide-fill",
            html: `
                <p class="mg-sub" style="max-width:720px; margin:0 auto;">Ağırlık kurulduktan sonra <strong>squash &amp; stretch</strong> çarpışma anına eklenir: temas karesinde top bir iki kare <strong>yatay ezilir</strong>, hemen sonra düşüş ve çıkışta hafifçe <strong>uzar</strong>. Az miktarı bile cansız sekmeyi diriltir. Aşağıdaki video graph editor ile S&amp;S'i birlikte kurar.</p>
                <div class="yt-embed"><iframe src="https://www.youtube.com/embed/fKnwxQVedbs" title="Bouncing Ball + Graph Editor · Motion Made" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            `,
            notes: "Sentez: ağırlık (graph) + squash (temas karesi). Ezilme sadece 1-2 kare, çarpışma anında, yatay; çıkışta hafif stretch. Az miktar yeter. Videoyu (Motion Made) izlet: graph + S&S birlikte. Vurgu: önce ağırlık doğru olsun, S&S süs değil tuz.",
        },

    ]
};
