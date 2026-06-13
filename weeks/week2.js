/**
 * ==========================================================================
 * WEEK 2 MODULE: After Effects'e Giriş — Arayüzden İlk Çıktıya
 * Hareketli Grafik Tasarımı · 2. Hafta — ilk animasyondan ilk MP4'e
 * ==========================================================================
 *
 * Şema week<N> = { title, slides: [ { id, title, category, type, html } ] }
 * paylaşılan motordan (scripts/main.js) gelir. Tasarım dili: styles/main.css.
 *
 * Yapı: her teknik konu önce KAVRAM slaytı, sonra ayrı bir AE DEMO slaytı.
 * Demolar TEK sürekli proji kurar: basit bir logo giriş animasyonu →
 * proje → arayüz → comp → timeline → transform → keyframe → preview →
 * Easy Ease → export. Aralara: acemi hataları, cheatsheet, ilham, ödev.
 *
 * AE referansları AE 2025'e göre doğrulandı (helpx.adobe.com):
 *   H.264 doğrudan Render Queue'da · Shift+F3 Graph Editor · J/K keyframe
 *   gezinme · Ctrl+Alt+M Media Encoder kuyruğu.
 *
 * Editöryel: terim İngilizce-önce (ilk geçişte TR parantez), em-dash yok,
 * AE menüleri İngilizce (.ae-menu) + TR açıklama, kısayollar .ae-kbd.
 * İngilizce uppercase chip/iz'lere lang="en".
 */

export const week2 = {
    title: "02 · After Effects'e Giriş",
    slides: [

        /* 01 — HERO ----------------------------------------------------- */
        {
            id: "acilis",
            title: "After Effects'e Giriş",
            subtitle: "Hareketli Grafik Tasarımı · 2. Hafta · Arayüzden ilk çıktıya",
            type: "hero",
            html: `
                <div style="margin-top:32px; display:flex; flex-direction:column; align-items:center; gap:20px;">
                    <p class="u-mono" style="font-size:0.84rem; color:var(--text-dim); letter-spacing:0.06em;">kavram <span class="u-magenta">→</span> AE demo <span class="u-cyan">→</span> uygulama</p>
                    <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center;">
                        <span class="mg-chip mg-chip--cyan" lang="en">interface</span>
                        <span class="mg-chip mg-chip--magenta" lang="en">keyframe</span>
                        <span class="mg-chip" lang="en">easy ease</span>
                        <span class="mg-chip mg-chip--amber">ilk MP4</span>
                    </div>
                </div>
            `
        },

        /* 02 — BU HAFTA / YOL HARİTASI ---------------------------------- */
        {
            id: "bu-hafta",
            category: "Giriş",
            title: "Bu Hafta: İlk Animasyondan İlk MP4'e",
            html: `
                <p class="mg-intro">Bu hafta tek bir proje <strong>baştan sona</strong> kurulur: basit bir <strong>logo giriş animasyonu</strong>. Her konu önce burada anlatılır (kavram), sonra <strong>After Effects'te</strong> aynı projeye eklenir (AE demo). Sonunda dışa aktarılmış bir video ortaya çıkar.</p>
                <div class="ae-flow" style="margin:22px 0 18px;">
                    <span class="ae-flow__step">Proje</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step" lang="en">Composition</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step" lang="en">Timeline</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step" lang="en">Transform</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step" lang="en">Keyframe</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step" lang="en">Easy Ease</span>
                    <span class="ae-flow__arrow">→</span>
                    <span class="ae-flow__step" lang="en">Export</span>
                </div>
                <div class="mg-callout">
                    <h4>Çalışma ritmi</h4>
                    <p>Mor/camgöbeği slaytlar <strong>ne ve neden</strong>; mavi <strong>AE DEMO</strong> slaytları <span class="u-strong">After Effects'te nasıl</span>. Mavi Ae rozeti, ekranın AE'ye döndüğü an demektir.</p>
                </div>
            `
        },

        /* 03 — [A] PROJE KURULUMU --------------------------------------- */
        {
            id: "proje",
            category: "Başlangıç",
            title: "Proje ve Kaydetme",
            html: `
                <div class="mg-grid-2-1">
                    <div>
                        <p class="mg-intro" style="margin-bottom:14px;">İlk açılışta boş bir <strong>project (proje)</strong> gelir. Proje, tüm varlıkları ve sahneleri tutan <strong>.aep</strong> dosyasıdır. Sahneler (composition) bunun içinde yaşar.</p>
                        <p class="mg-sub">Birinci kural: <strong>hemen kaydetmek</strong> ve sık sık tekrarlamak. After Effects bazen çöker; kaydedilmemiş iş geri gelmez. İkincisi: kullanılacak görseller (logo, görüntü) projeye <strong>import</strong> edilir (içe aktarma).</p>
                    </div>
                    <div class="mg-callout">
                        <h4>Dosya türleri</h4>
                        <p><strong>.aep</strong> = AE projesi · içine <strong>import</strong> edilenler: PSD, AI, PNG, JPG, MP4. AE bunları <strong>kopyalamaz</strong>, bağ kurar — kaynak dosya taşınmamalı.</p>
                    </div>
                </div>
            `
        },
        {
            id: "demo-proje",
            category: "AE Demo",
            title: "Demo · Proje Kurulumu ve Kaydetme",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>İlk iş kaydetmek: <span class="ae-menu" lang="en">File ▸ Save</span> &nbsp;(<span class="ae-kbd">Ctrl</span> <span class="ae-kbd">S</span> · mac: <span class="ae-kbd">⌘</span>); projeye anlamlı bir ad verilir.</li>
                        <li>Logo içe aktarılır: <span class="ae-menu" lang="en">File ▸ Import ▸ File</span> ya da dosya doğrudan <strong>Project</strong> paneline sürüklenir.</li>
                        <li>Çalışırken <span class="ae-kbd">Ctrl</span> <span class="ae-kbd">S</span> bir alışkanlık; her büyük adımdan sonra tekrarlanır.</li>
                    </ol>
                    <p class="ae-demo-note">Kaynak görsel sonradan başka klasöre taşınırsa AE "missing footage" der; hepsi tek klasörde tutulur.</p>
                </div>
            `
        },

        /* 04 — ARAYÜZ (yakından, W1 köprüsü) ---------------------------- */
        {
            id: "arayuz",
            category: "Arayüz",
            title: "Arayüze Yakından",
            html: `
                <p class="mg-intro">Geçen haftaki kısa bakışın ardından, şimdi yakından. Panel kalabalığı korkutucu görünse de günlük iş büyük ölçüde <strong>üç panelde</strong> geçer, gerisi yardımcıdır.</p>
                <div class="ae-ui-mock" style="margin-bottom:14px;">
                    <div class="ae-ui-mock__bar">Tools · araç çubuğu</div>
                    <div class="ae-ui-mock__row">
                        <div class="ae-ui-mock__panel" lang="en">Project<small>varlıklar</small></div>
                        <div class="ae-ui-mock__panel ae-ui-mock__panel--stage" lang="en">Composition<small>önizleme / sahne</small></div>
                        <div class="ae-ui-mock__panel" lang="en">Effects &amp; Presets<small>hazır efektler</small></div>
                    </div>
                    <div class="ae-ui-mock__timeline" lang="en">Timeline · katmanlar + zaman <span style="color:var(--text-mute);">(işin kalbi)</span></div>
                </div>
                <p class="mg-foot" style="margin-top:0;"><span class="u-cyan">Composition</span> = ne görünür · <span class="u-magenta">Timeline</span> = ne zaman olur · <span class="u-strong">Project</span> = ne var.</p>
            `
        },
        {
            id: "demo-arayuz",
            category: "AE Demo",
            title: "Demo · Arayüz Turu",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li><span class="ae-menu" lang="en">Window ▸ Workspace ▸ Default</span> ile düzen sıfırlanır. Karışınca her zaman buraya dönülür.</li>
                        <li><strong>Project</strong>, <strong>Composition</strong>, <strong>Timeline</strong> panelleri tek tek tanınır.</li>
                        <li>Panel kenarlarından sürüklenir; bir panel kapatılıp <span class="ae-menu" lang="en">Window</span> menüsünden geri açılır.</li>
                    </ol>
                    <p class="ae-demo-note">Panel kaybolduğunda panik yok: Window menüsünden adıyla geri gelir.</p>
                </div>
            `
        },

        /* 05 — COMPOSITION + SETTINGS ----------------------------------- */
        {
            id: "composition",
            category: "Temel",
            title: "Composition: Çalışma Tuvali",
            html: `
                <div class="mg-grid-2-1">
                    <div>
                        <p class="mg-intro" style="margin-bottom:14px;">Her sahne bir <strong>composition (kompozisyon)</strong> içinde olur: üzerinde çalışılan tuval. Açılışta üç şeye karar verilir.</p>
                        <ul class="mg-list">
                            <li><strong>Çözünürlük:</strong> kare boyutu, ör. 1920×1080 piksel.</li>
                            <li><strong>Frame rate (kare hızı):</strong> saniyedeki kare, ör. 25 fps.</li>
                            <li><strong>Duration (süre):</strong> sahnenin uzunluğu.</li>
                        </ul>
                    </div>
                    <div class="mg-callout">
                        <h4>Bu hafta</h4>
                        <p><strong>1920×1080</strong> · <strong>25 fps</strong> · <strong>5 sn</strong>. Standart yatay HD.</p>
                    </div>
                </div>
            `
        },
        {
            id: "demo-composition",
            category: "AE Demo",
            title: "Demo · Yeni Composition",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li><span class="ae-menu" lang="en">Composition ▸ New Composition</span> &nbsp;(<span class="ae-kbd">Ctrl</span> <span class="ae-kbd">N</span>).</li>
                        <li>Preset <span class="u-mono" lang="en">HDTV 1080 25</span> seçilir → 1920×1080, 25 fps gelir.</li>
                        <li><span class="ae-menu" lang="en">Duration</span> 0:00:05:00 (5 sn) → <strong>OK</strong>. Sonra logo Project'ten timeline'a sürüklenir.</li>
                    </ol>
                    <p class="ae-demo-note">Ayarları sonradan değiştirmek için: <span class="ae-menu" lang="en">Composition ▸ Composition Settings</span> (<span class="ae-kbd">Ctrl</span> <span class="ae-kbd">K</span>).</p>
                </div>
            `
        },

        /* 06 — [B] TIMELINE ANATOMİSİ ----------------------------------- */
        {
            id: "timeline",
            category: "Temel",
            title: "Timeline Anatomisi",
            html: `
                <p class="mg-intro">Timeline işin <strong>kalbi</strong>: katmanlar burada, zaman soldan sağa akar. Keyframe koymadan önce onu <strong>okumayı</strong> bilmek gerekir.</p>
                <div class="mg-grid-2 stagger">
                    <ul class="mg-list">
                        <li><strong>Playhead:</strong> o an hangi karede olunduğunu gösterir. Sürüklenince (scrub) sahne o ana gider.</li>
                        <li><strong>Katman sırası:</strong> listede <strong>üstteki katman önde</strong> görünür.</li>
                    </ul>
                    <ul class="mg-list">
                        <li><strong>In / Out point:</strong> katmanın başladığı ve bittiği an (katman çubuğunun uçları).</li>
                        <li><strong>Work area:</strong> önizleme ve render'ın kapsadığı zaman aralığı.</li>
                    </ul>
                </div>
            `
        },
        {
            id: "demo-timeline",
            category: "AE Demo",
            title: "Demo · Timeline'da Gezinme",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li><strong>Playhead</strong> sürüklenir (scrub); sahnenin değiştiği görülür. <span class="ae-kbd">Home</span> başa, <span class="ae-kbd">End</span> sona gider.</li>
                        <li>Zaman zoom'u: timeline altından yakınlaşıp uzaklaşılır (<span class="ae-kbd">=</span> / <span class="ae-kbd">-</span>).</li>
                        <li>İki katman eklenip listede yerleri değiştirilir; <strong>üsttekinin öne</strong> geçtiği görülür.</li>
                    </ol>
                    <p class="ae-demo-note">Work area'yı kısaltmak için <span class="ae-kbd">B</span> (başlangıç) ve <span class="ae-kbd">N</span> (bitiş) — sadece o aralık önizlenir.</p>
                </div>
            `
        },

        /* 07 — TRANSFORM + ANCHOR --------------------------------------- */
        {
            id: "transform",
            category: "Temel",
            title: "Transform ve Anchor Point",
            html: `
                <p class="mg-intro">Her katmanın <strong>beş temel özelliği</strong> vardır; animasyonun büyük kısmı bunlarla yapılır. Her biri tek tuşla açılır:</p>
                <div class="mg-grid-3 stagger" style="margin-bottom:16px;">
                    <div class="mg-term"><span class="mg-term__k" lang="en">Anchor Point <small>· çapa · <span class="ae-kbd">A</span></small></span><p class="mg-term__d">Dönme ve ölçeklemenin merkezi.</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">Position <small>· konum · <span class="ae-kbd">P</span></small></span><p class="mg-term__d">Sahnedeki yeri (x, y).</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">Scale <small>· ölçek · <span class="ae-kbd">S</span></small></span><p class="mg-term__d">Büyüklük, yüzde.</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">Rotation <small>· dönüş · <span class="ae-kbd">R</span></small></span><p class="mg-term__d">Açısal dönme, derece.</p></div>
                    <div class="mg-term"><span class="mg-term__k" lang="en">Opacity <small>· saydamlık · <span class="ae-kbd">T</span></small></span><p class="mg-term__d">%0 → %100 görünürlük.</p></div>
                    <div class="mg-term" style="border-style:dashed;"><span class="mg-term__k">İpucu</span><p class="mg-term__d"><span class="ae-kbd">U</span> animasyonlu özellikleri açar.</p></div>
                </div>
                <div class="mg-callout">
                    <h4>Anchor point neden önemli</h4>
                    <p>Dönme ve ölçek <strong>anchor point etrafında</strong> olur. Yanlış yerdeyse logo merkezinden değil köşesinden döner. Önce çapa doğru yere konur.</p>
                </div>
            `
        },
        {
            id: "demo-transform",
            category: "AE Demo",
            title: "Demo · Transform ve Çapa",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>Logo katmanı seçilir; <span class="ae-kbd">P</span> <span class="ae-kbd">S</span> <span class="ae-kbd">R</span> <span class="ae-kbd">T</span> ile özellikler, <span class="ae-kbd">A</span> ile anchor açılır.</li>
                        <li>Değerler elle değiştirilir, etkisi sahnede görülür (henüz keyframe yok).</li>
                        <li>Çapa ortalanır: Pan Behind aracı <span class="ae-kbd">Y</span> veya <span class="ae-menu" lang="en">Layer ▸ Transform ▸ Center Anchor Point in Layer Content</span>.</li>
                    </ol>
                    <p class="ae-demo-note">İpucu: Scale %120 yapılıp döndürülür, sonra anchor ortalanır — fark belirginleşir.</p>
                </div>
            `
        },

        /* 08 — KEYFRAME ------------------------------------------------- */
        {
            id: "keyframe",
            category: "Çekirdek",
            title: "Keyframe: İlk Hareket",
            html: `
                <div class="mg-grid-2-1">
                    <div>
                        <p class="mg-intro" style="margin-bottom:14px;">Geçen haftadan: yalnızca <strong>önemli anlar</strong> işaretlenir, arasını AE doldurur. O işarete <strong>keyframe (anahtar kare)</strong> denir.</p>
                        <p class="mg-sub">Bir özelliğin yanındaki <strong>stopwatch</strong>'a basıldığı an ilk keyframe doğar. Playhead ilerleyip değer değişince ikincisi otomatik gelir. İki an = bir hareket.</p>
                    </div>
                    <div class="mg-card mg-card--cyan">
                        <div class="mg-card__title" style="margin-bottom:12px;">İki keyframe</div>
                        <div style="display:flex; align-items:center; gap:12px;">
                            <div style="flex:none; width:36px; height:36px; border-radius:8px; background:var(--magenta);"></div>
                            <div style="flex:1; height:2px; background:linear-gradient(90deg,var(--magenta),var(--cyan)); position:relative;">
                                <span class="u-mono" style="position:absolute; top:-24px; left:50%; transform:translateX(-50%); font-size:0.68rem; color:var(--text-dim);">interpolation</span>
                            </div>
                            <div style="flex:none; width:36px; height:36px; border-radius:8px; background:var(--cyan);"></div>
                        </div>
                        <p class="mg-card__text" style="margin-top:14px;"><strong>İki uç</strong> konur, AE arasını doldurur.</p>
                    </div>
                </div>
                <div style="margin-top:18px;"><span class="mg-trace" lang="en">Timing</span></div>
            `
        },
        {
            id: "demo-keyframe",
            category: "AE Demo",
            title: "Demo · İlk Animasyon",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>Playhead <strong>0 sn</strong>'de; <span class="ae-kbd">P</span> ile Position açılır, <strong>stopwatch</strong>'a basılır → ilk keyframe.</li>
                        <li>Playhead <strong>1 sn</strong>'e alınır; logo yeni konuma taşınır → ikinci keyframe otomatik oluşur.</li>
                        <li>Zenginleştirme: Scale %80→%100 ve Opacity %0→%100 eklenir. <span class="ae-kbd">U</span> hepsini gösterir.</li>
                    </ol>
                    <p class="ae-demo-note">Logo dışarıdan kayarak, büyüyerek ve belirerek giriyor — üç özellik aynı anda.</p>
                </div>
            `
        },

        /* 09 — [D] ÖNİZLEME --------------------------------------------- */
        {
            id: "preview",
            category: "Pratik",
            title: "Preview (Önizleme)",
            html: `
                <p class="mg-intro">Animasyon sürekli <strong>izlenerek</strong> ayarlanır. Ama önizleme bazen takılır; nedenini bilmek zaman kazandırır.</p>
                <div class="mg-grid-3 stagger">
                    <div class="mg-card mg-card--cyan"><div class="mg-card__title"><span lang="en">Spacebar</span></div><p class="mg-card__text">Standart önizleme. AE kareleri belleğe alarak (cache) oynatır.</p></div>
                    <div class="mg-card mg-card--magenta"><div class="mg-card__title">Çözünürlük</div><p class="mg-card__text">Takılırsa Composition'da çözünürlük <strong>Half / Quarter</strong>'a düşürülür; daha akıcı önizlenir.</p></div>
                    <div class="mg-card mg-card--amber"><div class="mg-card__title">Neden takılır</div><p class="mg-card__text">Ağır sahne + tam çözünürlük belleği zorlar; cache dolunca yavaşlar.</p></div>
                </div>
            `
        },
        {
            id: "demo-preview",
            category: "AE Demo",
            title: "Demo · Önizleme Kontrolü",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li><span class="ae-kbd">Space</span> ile oynatılır. Timeline üstündeki <strong>yeşil cache çizgisi</strong> hazır kareleri gösterir.</li>
                        <li>Takılırsa Composition panelinden çözünürlük <strong>Half</strong>'a düşürülüp tekrar oynatılır.</li>
                        <li>Sadece bir aralığı izlemek için <strong>work area</strong> (<span class="ae-kbd">B</span> / <span class="ae-kbd">N</span>) daraltılır.</li>
                    </ol>
                    <p class="ae-demo-note">Çözünürlük düşürmek sadece önizlemeyi etkiler; final render tam çözünürlükte çıkar.</p>
                </div>
            `
        },

        /* 10 — EASY EASE ------------------------------------------------ */
        {
            id: "easy-ease",
            category: "Çekirdek",
            title: "Easy Ease: İlk Yumuşatma",
            html: `
                <p class="mg-intro">Varsayılan keyframe'ler <strong>lineer</strong>dir: sabit hız, robotik his. Geçen haftaki <strong>easing</strong> burada devreye girer: tek bir komut, hareketi anında doğallaştırır.</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-bezier">
                        <svg viewBox="-8 -26 116 134" role="img" aria-label="linear easing eğrisi">
                            <defs><linearGradient id="mg-grad2" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ff2d6b"/><stop offset="0.5" stop-color="#b14bff"/><stop offset="1" stop-color="#19e3ff"/></linearGradient></defs>
                            <rect class="mg-curve-box" x="0" y="0" width="100" height="100"/>
                            <path class="mg-curve-guide" d="M0,100 L100,0"/>
                            <path class="mg-curve-path" style="stroke:url(#mg-grad2)" d="M0,100 L100,0"/>
                            <circle class="mg-curve-dot" cx="0" cy="100" r="4.5"/>
                            <circle class="mg-curve-dot c2" cx="100" cy="0" r="4.5"/>
                        </svg>
                        <div class="mg-bezier__name">linear (varsayılan)</div>
                        <div class="mg-bezier__val">robotik, sabit hız</div>
                    </div>
                    <div class="mg-bezier">
                        <svg viewBox="-8 -26 116 134" role="img" aria-label="easy ease eğrisi">
                            <rect class="mg-curve-box" x="0" y="0" width="100" height="100"/>
                            <path class="mg-curve-guide" d="M0,100 L100,0"/>
                            <path class="mg-curve-path" style="stroke:url(#mg-grad2)" d="M0,100 C40,80 60,20 100,0"/>
                            <circle class="mg-curve-dot" cx="0" cy="100" r="4.5"/>
                            <circle class="mg-curve-dot c2" cx="100" cy="0" r="4.5"/>
                        </svg>
                        <div class="mg-bezier__name">Easy Ease (F9)</div>
                        <div class="mg-bezier__val">yavaş başla, yavaş bit</div>
                    </div>
                </div>
                <div style="margin-top:18px;"><span class="mg-trace" lang="en">slow in / slow out</span></div>
            `
        },
        {
            id: "demo-easy-ease",
            category: "AE Demo",
            title: "Demo · Easy Ease ve Graph",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li>Animasyonun <strong>tüm keyframe'leri</strong> seçilir (sürükleyerek kutulanır).</li>
                        <li><span class="ae-kbd">F9</span> (Easy Ease) ya da sağ tık → <span class="ae-menu" lang="en">Keyframe Assistant ▸ Easy Ease</span>.</li>
                        <li>Graph Editor açılır (<span class="ae-kbd">Shift</span> <span class="ae-kbd">F3</span>); hız eğrisinin yumuşadığı görülür. Detayı <strong>3. hafta</strong>.</li>
                    </ol>
                    <p class="ae-demo-note">Önce/sonra: Easy Ease'ten önce ve sonra <span class="ae-kbd">Space</span> ile karşılaştırılır.</p>
                </div>
            `
        },

        /* 11 — EXPORT --------------------------------------------------- */
        {
            id: "export",
            category: "Çıktı",
            title: "Çıktı: Render Queue mı, Media Encoder mı?",
            html: `
                <p class="mg-intro">Animasyon hazır; sıra paylaşılabilir bir <strong>video dosyasına</strong> çevirmekte. İki yol var; bu hafta en kısası kullanılır.</p>
                <div class="mg-vs">
                    <div class="mg-vs__col">
                        <div class="mg-vs__label" lang="en">Render Queue</div>
                        <h4>AE'nin içinde</h4>
                        <p>Hızlı ve yeterli. Güncel AE'de <strong>H.264</strong> ile doğrudan MP4 verir. Bu haftanın yolu.</p>
                    </div>
                    <div class="mg-vs__divider"><span>vs</span></div>
                    <div class="mg-vs__col">
                        <div class="mg-vs__label" lang="en">Media Encoder</div>
                        <h4>Ayrı uygulama</h4>
                        <p>Daha çok format ve kuyruk yönetimi. Derinleşmesi <strong>8. hafta</strong>.</p>
                    </div>
                </div>
            `
        },
        {
            id: "demo-export",
            category: "AE Demo",
            title: "Demo · MP4 Olarak Dışa Aktarma",
            html: `
                <div class="ae-demo ae-demo--full">
                    <div class="ae-demo__head">
                        <span class="ae-demo__badge"><b>Ae</b></span>
                        <span class="ae-demo__label">Canlı · After Effects</span>
                    </div>
                    <ol class="ae-demo__steps">
                        <li><span class="ae-menu" lang="en">Composition ▸ Add to Render Queue</span> &nbsp;(<span class="ae-kbd">Ctrl</span> <span class="ae-kbd">M</span>).</li>
                        <li><span class="ae-menu" lang="en">Output Module</span> <strong>H.264</strong> seçilir (MP4 verir).</li>
                        <li><span class="ae-menu" lang="en">Output To</span> ile ad/konum belirlenir → <strong>Render</strong>. Bitince MP4 klasörde hazır.</li>
                    </ol>
                    <p class="ae-demo-note">Alternatif: <span class="ae-menu" lang="en">Composition ▸ Add to Adobe Media Encoder Queue</span> (<span class="ae-kbd">Ctrl</span> <span class="ae-kbd">Alt</span> <span class="ae-kbd">M</span>).</p>
                </div>
            `
        },

        /* 12 — [C] ACEMİ HATALARI --------------------------------------- */
        {
            id: "hatalar",
            category: "Dikkat",
            title: "Sık Yapılan Acemi Hataları",
            html: `
                <p class="mg-intro">Bu dördü neredeyse herkesin başına gelir. Şimdiden tanımak vakit kazandırır:</p>
                <div class="mg-grid-2 stagger">
                    <div class="mg-card mg-card--magenta"><span class="mg-card__icon">⌖</span><div class="mg-card__title">Anchor yanlış yerde</div><p class="mg-card__text">Logo köşesinden dönüyorsa çapa ortada değildir. <span class="ae-kbd">Y</span> ile düzeltilir.</p></div>
                    <div class="mg-card mg-card--cyan"><span class="mg-card__icon">▰</span><div class="mg-card__title">Her şey lineer</div><p class="mg-card__text">Hareket robotik mi? Easy Ease (<span class="ae-kbd">F9</span>) unutulmuştur.</p></div>
                    <div class="mg-card mg-card--amber"><span class="mg-card__icon">◷</span><div class="mg-card__title">Süre taşması</div><p class="mg-card__text">Animasyon comp süresinden uzun. Keyframe'ler 5 sn içinde bitmeli.</p></div>
                    <div class="mg-card"><span class="mg-card__icon">⌗</span><div class="mg-card__title">Kaydetmeyi unutmak</div><p class="mg-card__text">AE çökebilir. <span class="ae-kbd">Ctrl</span> <span class="ae-kbd">S</span> bir refleks olmalı.</p></div>
                </div>
            `
        },

        /* 13 — CHEATSHEET ----------------------------------------------- */
        {
            id: "cheatsheet",
            category: "Referans",
            title: "Kısayol Cheatsheet",
            html: `
                <div class="cheat-grid stagger">
                    <div class="cheat-group">
                        <h4><span lang="en">Composition</span> &amp; proje</h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">Ctrl</span> <span class="ae-kbd">N</span></span> yeni composition</li>
                            <li><span class="keys"><span class="ae-kbd">Ctrl</span> <span class="ae-kbd">K</span></span> composition settings</li>
                            <li><span class="keys"><span class="ae-kbd">Ctrl</span> <span class="ae-kbd">I</span></span> import (içe al)</li>
                            <li><span class="keys"><span class="ae-kbd">Ctrl</span> <span class="ae-kbd">S</span></span> kaydet</li>
                        </ul>
                    </div>
                    <div class="cheat-group">
                        <h4><span lang="en">Transform</span> (tek tuş)</h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">A</span> <span class="ae-kbd">P</span> <span class="ae-kbd">S</span> <span class="ae-kbd">R</span> <span class="ae-kbd">T</span></span> anchor/pos/scale/rot/opacity</li>
                            <li><span class="keys"><span class="ae-kbd">U</span></span> animasyonlu özellikler</li>
                            <li><span class="keys"><span class="ae-kbd">U</span> <span class="ae-kbd">U</span></span> tüm değişen özellikler</li>
                            <li><span class="keys"><span class="ae-kbd">Y</span></span> Pan Behind (çapayı taşı)</li>
                        </ul>
                    </div>
                    <div class="cheat-group">
                        <h4><span lang="en">Keyframe</span>, zaman &amp; önizleme</h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">Space</span></span> önizleme</li>
                            <li><span class="keys"><span class="ae-kbd">J</span> <span class="ae-kbd">K</span></span> önceki / sonraki keyframe</li>
                            <li><span class="keys"><span class="ae-kbd">Home</span> <span class="ae-kbd">End</span></span> başa / sona</li>
                            <li><span class="keys"><span class="ae-kbd">B</span> <span class="ae-kbd">N</span></span> work area başı / sonu</li>
                        </ul>
                    </div>
                    <div class="cheat-group">
                        <h4><span lang="en">Easing</span> &amp; çıktı</h4>
                        <ul>
                            <li><span class="keys"><span class="ae-kbd">F9</span></span> Easy Ease</li>
                            <li><span class="keys"><span class="ae-kbd">Shift</span> <span class="ae-kbd">F3</span></span> Graph Editor</li>
                            <li><span class="keys"><span class="ae-kbd">Ctrl</span> <span class="ae-kbd">M</span></span> Render Queue</li>
                            <li><span class="keys"><span class="ae-kbd">Ctrl</span> <span class="ae-kbd">Alt</span> <span class="ae-kbd">M</span></span> Media Encoder kuyruğu</li>
                        </ul>
                    </div>
                </div>
            `
        },

        /* 14 — [I] İLHAM ------------------------------------------------ */
        {
            id: "ilham",
            category: "İlham",
            title: "İlham: 1982'den Bugüne",
            html: `
                <p class="mg-intro">Hareketin kırk yıllık evrimi, üç ikonik işte. Üçü de bu hafta işlenen mantıkla başlar: <strong>transform + keyframe + easing + reveal</strong>. İsimler videolara bağlı:</p>
                <div class="mg-grid-3 stagger" style="margin-bottom:16px;">
                    <div class="mg-card mg-card--magenta">
                        <div class="mg-links__label" style="margin-bottom:10px;">öncü · 1982</div>
                        <div class="mg-card__title">Channel 4 "Blocks"</div>
                        <p class="mg-card__text">Lambie-Nairn. İlk bilgisayar-animasyonlu ident'lerden; <strong>"marka kimliği = hareket"</strong> fikri burada doğdu. Saf position + scale + timing.</p>
                        <a class="mg-link" href="https://www.youtube.com/watch?v=R86_TLuI51w" target="_blank" rel="noopener" style="margin-top:12px;">video</a>
                    </div>
                    <div class="mg-card mg-card--cyan">
                        <div class="mg-links__label" style="margin-bottom:10px;">klasik · 1997</div>
                        <div class="mg-card__title">DreamWorks "ay'da çocuk"</div>
                        <p class="mg-card__text">Robert Hunt'ın tablosu, ILM'de canlandı. Bulutların arasında, hilal aya oltayla oturan bir çocuk; kamera yukarı kayar, olta suya düşer. Durağan bir resmin <strong>multiplane derinlikle</strong> hayata geçişi.</p>
                        <a class="mg-link" href="https://www.youtube.com/watch?v=AC6eZRGNadQ" target="_blank" rel="noopener" style="margin-top:12px;">video</a>
                    </div>
                    <div class="mg-card mg-card--amber">
                        <div class="mg-links__label" style="margin-bottom:10px;">çağdaş · 2015</div>
                        <div class="mg-card__title">Netflix "ta-dum"</div>
                        <p class="mg-card__text">Modern marka kimliğinde <strong>hareket + ses</strong> birliği. Minimal, tek vuruşluk; gezegende en çok izlenen logo animasyonlarından.</p>
                        <a class="mg-link" href="https://www.youtube.com/watch?v=SiTQ0JrIlCg" target="_blank" rel="noopener" style="margin-top:12px;">video</a>
                    </div>
                </div>
                <div class="mg-links" style="justify-content:center;">
                    <span class="mg-links__label">sürekli ilham</span>
                    <a class="mg-link" href="https://dribbble.com/tags/logo-animation" target="_blank" rel="noopener">Dribbble · logo animation</a>
                </div>
            `
        },

        /* 15 — HAFTALIK ÖDEV -------------------------------------------- */
        {
            id: "odev",
            category: "Haftalık Ödev",
            title: "Bu Haftanın Ödevi",
            html: `
                <div class="mg-task">
                    <p class="mg-task__brief">Bir <strong>ad</strong> ya da <strong>logo</strong> ile <strong>5 saniyelik bir giriş animasyonu</strong>: kurmak, Easy Ease uygulamak ve <strong>MP4 olarak dışa aktarmak</strong>.</p>
                    <ul class="mg-list">
                        <li>Composition: <strong>1920×1080 · 25 fps · ≤ 5 sn</strong>.</li>
                        <li>En az <strong>iki transform özelliği</strong> animasyonlu (ör. Position + Opacity).</li>
                        <li>Keyframe'lere en az bir kez <strong>Easy Ease (F9)</strong> uygulanmış olmalı.</li>
                        <li><strong>H.264 / MP4</strong> olarak dışa aktarılmalı.</li>
                    </ul>
                    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:18px;">
                        <span class="mg-links__label">teslim</span>
                        <span class="mg-chip mg-chip--magenta">MP4 dosyası</span>
                        <span class="mg-chip" lang="en">≤ 5 sn</span>
                        <span class="mg-chip mg-chip--cyan">gelecek derse kadar</span>
                    </div>
                </div>
                <div class="mg-callout" style="margin-top:18px;">
                    <h4>İpucu</h4>
                    <p>Önce <strong>anchor point</strong> ortaya alınır. Başlangıç ve bitiş <strong>yavaşlatılır</strong> (Easy Ease) — küçük dokunuş, büyük fark. <span class="ae-kbd">Ctrl</span> <span class="ae-kbd">S</span> ihmal edilmez.</p>
                </div>
            `
        },

    ]
};
