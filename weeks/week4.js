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

        /* ── D · CANLILIK KATMANI ──────────────────────────────────────── */
        {
            id: "anticipation",
            category: "İlke",
            title: "Anticipation: Hazırlık",
            html: `
                <p class="mg-intro"><strong>Anticipation</strong> (hazırlık), büyük bir hareketten önce gelen küçük ters jesttir. Top zıplamadan önce hafifçe <strong>çömelir</strong>, bir yay gibi gerilir; göz bu hazırlıkla hareketi bekler. Hazırlık olmadan hareket aniden başlar, sahte ve mekanik durur.</p>
                <div class="ae-flow" style="margin:20px 0 16px; justify-content:center;">
                    <span class="ae-flow__step">Çömel (ters)</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step is-now">Zıpla (asıl)</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step">Yerleş</span>
                </div>
                <div class="mg-links" style="justify-content:center;">
                    <span class="mg-links__label">izle</span>
                    <a class="mg-link" href="https://youtu.be/F8OtE60T8yU" target="_blank" rel="noopener">Anticipation · Alan Becker</a>
                </div>
                <div style="margin-top:16px; text-align:center;"><span class="mg-trace" lang="en">anticipation</span></div>
            `,
            notes: "Hazırlık = asıl hareketten önce küçük ters jest. Zıplamadan önce çömelme, yumruktan önce kolu geri çekme. Göz hareketi önceden okur. Bouncing ball'a uygulaması: tepe noktasında minik bir bekleme/ezilme. Video link (Alan Becker).",
        },
        {
            id: "follow-through",
            category: "İlke",
            title: "Follow-through ve Overlapping",
            html: `
                <p class="mg-intro"><strong>Follow-through</strong> (savrulma) ve <strong>overlapping action</strong> (üst üste binme): bir cisim durduğunda ona bağlı yumuşak parçalar hemen durmaz, biraz sonra yerleşir. Topun peşindeki kuyruk, bir saç tutamı ya da kumaş, ana gövde durduktan birkaç kare sonra savrulup oturur.</p>
                <p class="mg-sub">AE'de pratik teknik: kuyruğun keyframe'lerini ana gövdeden birkaç kare <strong>geciktirmek</strong> (offset). Gecikme ne kadar büyükse parça o kadar yumuşak ve ağır görünür.</p>
                <div class="mg-links" style="justify-content:center; margin-top:16px;">
                    <span class="mg-links__label">izle</span>
                    <a class="mg-link" href="https://youtu.be/4OxphYV8W3E" target="_blank" rel="noopener">Follow Through &amp; Overlapping · Alan Becker</a>
                </div>
                <div style="margin-top:16px; text-align:center;"><span class="mg-trace" lang="en">follow through / overlapping</span></div>
            `,
            notes: "Savrulma + üst üste binme: ana gövde durunca uzantı (kuyruk/saç/kumaş) birkaç kare sonra durur. AE tekniği = kuyruk keyframe'lerini offset'le (geciktir). Bu hafta ödevde 'savrulan kuyruk' bu. Video link (Alan Becker).",
        },
        {
            id: "arcs",
            category: "İlke",
            title: "Arcs: Doğal Hareket Yay Çizer",
            html: `
                <p class="mg-sub" style="max-width:720px; margin:0 auto;"><strong>Arcs</strong> (yaylar): doğadaki hemen her hareket düz çizgi değil, bir <strong>yay</strong> çizer. Sekleyen topun tepe noktaları, savrulan kuyruğun ucu, hepsi yay izler. W3'teki <strong>motion path</strong> tam da bu yayı çizmek içindi: düz çizgi robotik, yay canlı durur.</p>
                <div class="yt-embed"><iframe src="https://www.youtube.com/embed/I1_tZ9LhJD4" title="Arcs · Alan Becker" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
                <div style="margin-top:14px; text-align:center;"><span class="mg-trace" lang="en">arcs</span></div>
            `,
            notes: "Yaylar: doğal hareket düz değil eğridir. Bouncing ball'un tepe-tepe yolu zaten bir yay; kuyruğun ucu da yay çizer. W3 motion path köprüsü. Video (Alan Becker) izlet. Düz çizgi = robotik kontrast.",
        },
        {
            id: "abarti-dengesi",
            category: "Denge",
            title: "Abartı Dengesi",
            html: `
                <p class="mg-intro"><strong>Exaggeration</strong> (abartı) dengesi: her harekete squash, stretch ve overshoot uygun mudur? Cevap bağlama bağlı. Bir karakterde ya da oyunda abartı cömertçe kullanılır; kurumsal bir logoda ya da arayüz geçişinde ölçülü kalır. Ölçü kaçınca hareket ucuzlar.</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-card__title">Cömert abartı</div>
                        <p class="mg-card__text">Karakter, oyun, esprili mikro animasyon: belirgin squash, yüksek overshoot, geniş yaylar.</p>
                    </div>
                    <div class="mg-card mg-card--cyan">
                        <div class="mg-card__title">Ölçülü abartı</div>
                        <p class="mg-card__text">Kurumsal logo, arayüz, bilgi grafiği: hafif ezilme, küçük overshoot, sakin his.</p>
                    </div>
                </div>
                <p class="mg-foot">Soru "ne kadar abartı" değil, "bu işe ne yakışır": abartı bir <strong>ton</strong> seçimidir.</p>
            `,
            notes: "Abartı bağlama göre ayarlanır: karakter/oyun cömert, kurumsal/arayüz ölçülü. Aşırı S&S = ucuz his. W3'teki 'bu işe ne yakışır' sorusunun ağırlık/canlılık versiyonu. Köprü: recap'e geçiş.",
        },

        /* ── E · SENTEZ + KAPANIŞ ──────────────────────────────────────── */
        {
            id: "his-sozlugu",
            category: "Sentez",
            title: "His Sözlüğü: Dört İlke",
            html: `
                <p class="mg-intro">Bu hafta topa dört ilke eklendi. Hepsi tek amaca hizmet eder: <strong>ağırlığı ve canlılığı</strong> hissettirmek. Tek bakışta his sözlüğü:</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card mg-card--cyan">
                        <div class="mg-card__title" lang="en">Squash &amp; Stretch</div>
                        <p class="mg-card__text">Ezilme ve gerilme: ağırlık, esneklik, malzeme. Hacim sabit kalır.</p>
                    </div>
                    <div class="mg-card mg-card--amber">
                        <div class="mg-card__title" lang="en">Anticipation</div>
                        <p class="mg-card__text">Hazırlık: asıl hareketten önce küçük ters jest. Göz hareketi bekler.</p>
                    </div>
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-card__title" lang="en">Follow-through</div>
                        <p class="mg-card__text">Savrulma: uzantı ana gövdeden sonra durur. Gecikmeli yumuşaklık.</p>
                    </div>
                    <div class="mg-card">
                        <div class="mg-card__title" lang="en">Arcs</div>
                        <p class="mg-card__text">Yaylar: doğal hareket düz değil, eğri çizer.</p>
                    </div>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-top:18px;">
                    <span class="mg-trace" lang="en">squash &amp; stretch</span>
                    <span class="mg-trace" lang="en">anticipation</span>
                    <span class="mg-trace" lang="en">follow through / overlapping</span>
                    <span class="mg-trace" lang="en">arcs</span>
                </div>
            `,
            notes: "Haftanın dört ilkesi tek bakışta. İlke izi tamam: squash & stretch, anticipation, follow-through, arcs. W1'in 12 ilkesinden bu hafta dördü işlendi. Recap: her birini bir cümleyle bağla, sonra hatalar.",
        },
        {
            id: "hatalar",
            category: "Acemi Hataları",
            title: "Sık Yapılan Dört Hata",
            html: `
                <p class="mg-intro">Çoğu "ölü" sonucun arkasında şu dört hatadan biri vardır:</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-card__title">Hacim kaçağı</div>
                        <p class="mg-card__text">Ezilirken genişlemeyi (ya da gerilirken incelmeyi) unutmak: top şişer veya erir. Hacim sabit kalmalı.</p>
                    </div>
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-card__title">Linear düşüş</div>
                        <p class="mg-card__text">Düşüşe easing vermemek: top yerçekimi yokmuş gibi sabit hızla iner, ağırlık kaybolur.</p>
                    </div>
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-card__title">Simetrik sekme</div>
                        <p class="mg-card__text">Her sekmenin aynı yükseklikte olması: enerji kaybı görünmez, hareket mekanik döngüye düşer.</p>
                    </div>
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-card__title">Aşırı squash</div>
                        <p class="mg-card__text">Çok fazla ezilme: top lastikten çok balona döner, his ucuzlar. Az çoktur.</p>
                    </div>
                </div>
            `,
            notes: "Dört yaygın hata = dört 'ölü' sebebi. Hacim kaçağı (en sık), linear düşüş (ağırlık yok), simetrik sekme (enerji kaybı yok), aşırı squash (ucuz). Öğrencinin ödevinde bunları ara.",
        },
        {
            id: "cheatsheet",
            category: "Referans",
            title: "Ağırlık & Canlılık Cheatsheet",
            html: `
                <div class="cheat-grid stagger">
                    <div class="cheat-group">
                        <h4>Squash &amp; Stretch</h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">Y</span></span> <span lang="en">Pan Behind</span> (Anchor Point taşı)</li>
                            <li>Scale sağ tık → <span lang="en">Separate Dimensions</span></li>
                            <li>hacim sabit: boy kısalırsa en uzar</li>
                        </ul>
                    </div>
                    <div class="cheat-group">
                        <h4><span lang="en">Graph Editor</span></h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">Shift</span> <span class="ae-kbd">F3</span></span> editörü aç / kapat</li>
                            <li><span class="keys"><span class="ae-kbd">F9</span></span> Easy Ease (yumuşat)</li>
                            <li><span lang="en">Choose graph type</span> value / speed</li>
                        </ul>
                    </div>
                    <div class="cheat-group">
                        <h4>Keyframe &amp; savrulma</h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">P</span></span> Position (konum)</li>
                            <li><span class="keys"><span class="ae-kbd">U</span></span> animasyonlu özellikler</li>
                            <li>kuyruk keyframe'lerini geciktir (offset)</li>
                        </ul>
                    </div>
                    <div class="cheat-group">
                        <h4>Gezinme &amp; önizleme</h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">J</span> <span class="ae-kbd">K</span></span> önceki / sonraki keyframe</li>
                            <li><span class="keys"><span class="ae-kbd">Space</span></span> önizleme</li>
                            <li>her tepe bir öncekinden alçak</li>
                        </ul>
                    </div>
                </div>
            `,
            notes: "Referans slaytı. En kritik: Y (Anchor Point), Separate Dimensions, Shift+F3, offset keyframe (savrulma). Öğrenci fotoğraf çeksin.",
        },
        {
            id: "ilham",
            category: "İlham",
            title: "Büyük Resim: On İki İlke",
            className: "slide-fill",
            html: `
                <p class="mg-sub" style="max-width:720px; margin:0 auto;">Bu haftanın dört ilkesi, on iki ilkenin tamamının parçası. Aşağıdaki seri hepsini bir arada gösterir: izlerken "hangi ilke nerede" diye bakmak en iyi pekiştirmedir.</p>
                <div class="yt-embed"><iframe src="https://www.youtube.com/embed/uDqjIdI4bF4" title="12 Principles of Animation · Full Series" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
            `,
            notes: "İlham + recap: 12 ilkenin tamamı tek videoda. Bu hafta öğrenilen 4'ünü büyük resme bağla. Sınıfta aç ya da ödev önerisi olarak ver. 'Hangi ilke nerede' egzersizi.",
        },
        {
            id: "odev",
            category: "Haftalık Ödev",
            title: "Bu Haftanın Ödevi: Canlı Sekme",
            html: `
                <div class="mg-task">
                    <p class="mg-task__brief">Geçen hafta top <strong>sekiyordu</strong>; bu hafta ona <strong>kişilik</strong> verilir. Bir <strong>logo noktası</strong> ya da basit bir ikon sekecek: ağırlık (spacing + graph), çarpışmada <strong>squash &amp; stretch</strong> ve peşinde <strong>savrulan bir kuyruk</strong> (follow-through). Tek MP4.</p>
                    <ul class="mg-list">
                        <li>Düşüşte hızlanma, tepede yavaşlama: ağırlık <strong>graph editor</strong>'da kurulur (<span class="ae-kbd">Shift</span> <span class="ae-kbd">F3</span>).</li>
                        <li>Çarpışma karesinde <strong>squash</strong> (hacim sabit), çıkışta hafif <strong>stretch</strong>.</li>
                        <li>Bir <strong>kuyruk/uzantı</strong> eklenip keyframe'leri <strong>geciktirilir</strong> (offset): savrulsun.</li>
                        <li>Her sekme bir öncekinden alçak (enerji kaybı). <strong>H.264 / MP4</strong>, en fazla 5 sn.</li>
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
                    <p>Önce sadece sektirmeyi kur (geçen haftanın işi), sonra üstüne squash, stretch ve kuyruğu ekle. Topa bir kişilik seç: tembel bir bowling topu mu, zıpır bir pinpon mu?</p>
                </div>
            `,
            notes: "Ödev: canlı sekme, MP4 olarak UZAK'a gelecek haftaya kadar. W3 sektirmesinin üstüne kişilik: squash & stretch + savrulan kuyruk (offset). Logo noktası/ikon. Sıra: önce sektirme, sonra ilkeler. Bonus: kişilik seçimi (bowling vs pinpon). En az 5 sekme, alçalan.",
        },
        {
            id: "odev-kaynaklar",
            category: "Kaynak",
            title: "Ödev İçin Kaynaklar",
            html: `
                <p class="mg-intro">Canlı sekme, animasyonun klasik ilk egzersizidir: ağırlık, squash &amp; stretch ve canlılığı bir arada çalıştırır. Aşağıdaki kaynaklar hem ilkeleri hem AE pratiğini derinleştirir.</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card mg-card--cyan">
                        <div class="mg-links__label" style="margin-bottom:10px;">Seri · Alan Becker</div>
                        <div class="mg-card__title">12 Principles of Animation</div>
                        <p class="mg-card__text">Her ilkeyi tek tek, animasyonla anlatan kısa bölümler. Squash &amp; stretch, anticipation, follow-through, arcs için en net kaynak.</p>
                        <a class="mg-link" href="https://youtu.be/uDqjIdI4bF4" target="_blank" rel="noopener">YouTube'da izle</a>
                    </div>
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-links__label" style="margin-bottom:10px;">Video · Motion Made</div>
                        <div class="mg-card__title">Bouncing Ball · Graph Editor</div>
                        <p class="mg-card__text">Tam ödevin konusu: graph editor ve squash &amp; stretch ile gerçekçi top sektirme, adım adım.</p>
                        <a class="mg-link" href="https://youtu.be/fKnwxQVedbs" target="_blank" rel="noopener">YouTube'da izle</a>
                    </div>
                </div>
                <div class="mg-links" style="justify-content:center; margin-top:16px;">
                    <span class="mg-links__label">ara</span>
                    <span class="mg-chip" lang="en">bouncing ball after effects</span>
                    <span class="mg-chip" lang="en">squash and stretch tutorial</span>
                </div>
            `,
            notes: "Kaynak slaytı (ops, pacing kısıtlıysa kırpılabilir). Alan Becker serisi (ilkeler) + Motion Made (AE bouncing ball). Arama terimleri öğrenciyi daha fazlasına yönlendirir. Telif: sınıf-içi/öğrenci kaynağı.",
        },

    ]
};
