/**
 * ==========================================================================
 * WEEK 1 MODULE: Hareketli Grafik Tasarımına Giriş
 * Görsel İletişim Tasarımı · 1. Hafta — harekete ilk bakış
 * ==========================================================================
 *
 * Şema week<N> = { title, slides: [ { id, title, category, type, html, ... } ] }
 * paylaşılan motordan (scripts/main.js) gelir. Tasarım dili: styles/main.css
 * (.mg-* içerik kiti, .stagger ile kademeli giriş, .split chromatic başlık).
 *
 * Editöryel: terim İngilizce-önce (ilk geçişte TR parantez), em-dash yok,
 * düz başlık, kırılgan ders-no yok.
 */

export const week1 = {
    title: "01 · Hareketli Grafiğe Giriş",
    slides: [

        /* 01 — HERO ----------------------------------------------------- */
        {
            id: "acilis",
            title: "Hareketli Grafik Tasarımı",
            subtitle: "Görsel İletişim Tasarımı · 1. Hafta · Harekete ilk bakış",
            type: "hero",
            html: `
                <div style="margin-top:32px; display:flex; flex-direction:column; align-items:center; gap:20px;">
                    <p class="u-mono" style="font-size:0.84rem; color:var(--text-dim); letter-spacing:0.06em;">grafik tasarım <span class="u-magenta">+</span> zaman <span class="u-cyan">=</span> hareket</p>
                    <div style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center;">
                        <span class="mg-chip mg-chip--magenta" lang="en">keyframe</span>
                        <span class="mg-chip mg-chip--cyan" lang="en">easing</span>
                        <span class="mg-chip" lang="en">timeline</span>
                        <span class="mg-chip mg-chip--amber">12 ilke</span>
                    </div>
                </div>
            `
        },

        /* 02 — NE YAPACAĞIZ --------------------------------------------- */
        {
            id: "ne-yapacagiz",
            category: "Giriş",
            title: "Bu Dersin Kapsamı",
            html: `
                <p class="mg-intro">Bu dönemin konusu, durağan (static) tasarımı <strong>zamana</strong> taşımak. Sayfada duran bir kompozisyon değil, saniyeler boyunca <strong>akan, ivmelenen, anlatan</strong> bir görsel tasarlamak.</p>
                <div class="mg-grid-3 stagger">
                    <div class="mg-card mg-card--magenta">
                        <span class="mg-card__icon">◷</span>
                        <div class="mg-card__title">Zamanı tasarlamak</div>
                        <p class="mg-card__text">Bir elemanın <strong>ne zaman</strong>, <strong>ne hızla</strong> ve <strong>hangi sırayla</strong> hareket ettiğine karar vermek.</p>
                    </div>
                    <div class="mg-card mg-card--cyan">
                        <span class="mg-card__icon">⌖</span>
                        <div class="mg-card__title">Dilini öğrenmek</div>
                        <p class="mg-card__text">keyframe, easing, timeline, composition · sektörün gerçekte kullandığı <strong>terimler</strong>.</p>
                    </div>
                    <div class="mg-card mg-card--amber">
                        <span class="mg-card__icon">▶</span>
                        <div class="mg-card__title">Üretmek</div>
                        <p class="mg-card__text">Dönem sonunda ortaya <strong>kişisel bir kısa motion parçası</strong> çıkar: tasarlanmış ve canlandırılmış.</p>
                    </div>
                </div>
            `
        },

        /* 03 — TANIM ---------------------------------------------------- */
        {
            id: "nedir",
            category: "Tanım",
            title: "Motion Graphics Nedir",
            html: `
                <div class="mg-grid-2-1">
                    <div>
                        <p class="mg-intro" style="margin-bottom:14px;"><strong>Motion graphics (hareketli grafik)</strong>, grafik tasarımın <strong>zamanla</strong> birleşmesidir. Tipografi, şekil, renk, ikon gibi tasarım elemanlarını alır ve onlara <strong>hareket</strong> kazandırır.</p>
                        <p class="mg-sub">Anahtar fark şu: bir poster <em>tek bir an</em> anlatır, motion graphics ise bir <strong>süre boyunca</strong> anlatır. İzleyicinin gözünü zaman içinde yönlendirir, bilgiyi sıraya koyar, bir ritim kurar. Bu yüzden <span class="u-grad">motion design</span> da denir: hareketin kendisi tasarlanır.</p>
                    </div>
                    <div class="mg-callout">
                        <h4>Kısa tanım</h4>
                        <p><strong>Tasarım + zaman.</strong> Elemanların zaman içindeki davranışını planlamak. Çoğunlukla soyut, tipografik ve bilgi odaklıdır · bir karakteri canlandırmaktan farklıdır.</p>
                    </div>
                </div>
            `
        },

        /* 04 — NEDEN ---------------------------------------------------- */
        {
            id: "neden",
            category: "Neden",
            title: "Hareket Neden İşe Yarar",
            html: `
                <p class="mg-intro">Hareket dekoratif bir süs değil, bir <strong>iletişim aracıdır</strong>. Doğru kullanıldığında izleyicinin beynine durağan tasarımın yapamadığı şeyleri söyler.</p>
                <div class="mg-grid-2 stagger">
                    <ul class="mg-list">
                        <li><strong>Dikkat:</strong> Göz, hareket eden şeye refleksle döner · vurgu zamanla kurulur.</li>
                        <li><strong>Hiyerarşi:</strong> Neyin önce, neyin sonra görüneceğini sıralamak bilgiyi yönetir.</li>
                    </ul>
                    <ul class="mg-list">
                        <li><strong>Anlatı:</strong> Bir geçiş, iki durum arasındaki <em>ilişkiyi</em> gösterir · neden-sonuç kurar.</li>
                        <li><strong>Duygu:</strong> Hızlı ve sert mi, yumuşak ve ağır mı · hareketin karakteri bir ton taşır.</li>
                    </ul>
                </div>
                <div class="mg-callout" style="margin-top:16px;">
                    <h4>Özetle</h4>
                    <p>İyi motion graphics, hareketi <strong>bir amaç için</strong> kullanır. Amacı olmayan hareket gürültüdür · izleyiciyi yorar.</p>
                </div>
            `
        },

        /* 05 — AYRIM ---------------------------------------------------- */
        {
            id: "ayrim",
            category: "Ayrım",
            title: "Motion Graphics, Animation ve VFX",
            html: `
                <p class="mg-intro">Üçü de "hareketli görüntü" üretir ama farklı işler. Bu ayrım, dönem boyunca odağın nerede olduğunu netleştirir.</p>
                <div class="mg-grid-3 stagger">
                    <div class="mg-card mg-card--magenta">
                        <span class="mg-card__icon">◳</span>
                        <div class="mg-card__title">Motion Graphics</div>
                        <p class="mg-card__text"><strong>Tasarım elemanları</strong> hareket eder: tipografi, şekil, ikon, grafik. Genelde soyut ve bilgi odaklı. <span class="u-magenta">Bu dersin alanı.</span></p>
                    </div>
                    <div class="mg-card mg-card--cyan">
                        <span class="mg-card__icon">✦</span>
                        <div class="mg-card__title">Character Animation</div>
                        <p class="mg-card__text"><strong>Karakter ve oyunculuk</strong>: bir figürün canlanması, jest, ifade, ağırlık. Hikâye anlatımı ve performans işidir.</p>
                    </div>
                    <div class="mg-card mg-card--amber">
                        <span class="mg-card__icon">▦</span>
                        <div class="mg-card__title">VFX</div>
                        <p class="mg-card__text"><strong>Visual effects (görsel efekt)</strong>: çekilmiş gerçek görüntüye dijital katman eklemek · patlama, simülasyon, kompozit.</p>
                    </div>
                </div>
                <p class="mg-foot">Sınırlar bulanıktır ve sık sık birlikte kullanılırlar · bu dersin odağı <span class="u-strong">motion graphics</span>.</p>
            `
        },

        /* 06 — KULLANIM ALANLARI ---------------------------------------- */
        {
            id: "nerede",
            category: "Kullanım Alanları",
            title: "Nerede Karşımıza Çıkar",
            html: `
                <p class="mg-intro">Aslında günde onlarca kez göz önünden geçer. Bir kez fark edildiğinde her yerde görünür hale gelir.</p>
                <div class="mg-grid-3 stagger">
                    <div class="mg-card mg-card--magenta"><span class="mg-card__icon">▤</span><div class="mg-card__title">Title sequence</div><p class="mg-card__text">Film ve dizi <strong>jeneriği</strong>. Türün ilk doğduğu yer.</p></div>
                    <div class="mg-card mg-card--cyan"><span class="mg-card__icon">◉</span><div class="mg-card__title">Broadcast</div><p class="mg-card__text">Kanal kimliği, alt bant, <strong>bumper</strong> ve geçişler.</p></div>
                    <div class="mg-card mg-card--amber"><span class="mg-card__icon">◰</span><div class="mg-card__title">UI motion</div><p class="mg-card__text">Uygulama geçişleri, <strong>micro-interaction</strong>, yüklenme.</p></div>
                    <div class="mg-card mg-card--cyan"><span class="mg-card__icon">▣</span><div class="mg-card__title">Social</div><p class="mg-card__text">Reels, story, <strong>kinetic typography</strong>, sticker.</p></div>
                    <div class="mg-card mg-card--amber"><span class="mg-card__icon">▷</span><div class="mg-card__title">Explainer</div><p class="mg-card__text">Bir ürünü veya fikri anlatan <strong>kısa animasyonlu video</strong>.</p></div>
                    <div class="mg-card mg-card--magenta"><span class="mg-card__icon">▥</span><div class="mg-card__title">Data viz</div><p class="mg-card__text">Hareketle anlatılan <strong>grafik ve veri</strong>.</p></div>
                </div>
            `
        },

        /* 07 — TARİHÇE -------------------------------------------------- */
        {
            id: "tarih",
            category: "Tarihçe",
            title: "Kısa Bir Tarih",
            html: `
                <p class="mg-intro">Motion graphics bir gecede doğmadı. Kökleri sinema jeneriklerine uzanır · isimler en önemli işlerine bağlı:</p>
                <div class="mg-timeline stagger">
                    <div class="mg-timeline__item"><div class="mg-timeline__year">1950'ler</div><p class="mg-timeline__label"><a class="mg-tl-a" href="https://www.artofthetitle.com/designer/saul-bass/" target="_blank" rel="noopener">Saul Bass</a>tipografik jeneriğin babası</p></div>
                    <div class="mg-timeline__item"><div class="mg-timeline__year">1960'lar</div><p class="mg-timeline__label"><a class="mg-tl-a" href="https://www.artofthetitle.com/designer/pablo-ferro/" target="_blank" rel="noopener">Pablo Ferro</a>hızlı kesişler, elle tipografi</p></div>
                    <div class="mg-timeline__item"><div class="mg-timeline__year">1980'ler</div><p class="mg-timeline__label"><a class="mg-tl-a" href="https://www.youtube.com/results?search_query=mtv+1981+moon+landing+ident" target="_blank" rel="noopener">MTV</a>kanal kimliği patlaması</p></div>
                    <div class="mg-timeline__item"><div class="mg-timeline__year">1995</div><p class="mg-timeline__label"><a class="mg-tl-a" href="https://www.artofthetitle.com/title/se7en/" target="_blank" rel="noopener">Kyle Cooper</a>Se7en jeneriği, dijital çağ</p></div>
                    <div class="mg-timeline__item"><div class="mg-timeline__year">Bugün</div><p class="mg-timeline__label"><a class="mg-tl-a" href="https://motionographer.com" target="_blank" rel="noopener">Her ekran</a>sosyal, UI, yayın, web</p></div>
                </div>
            `
        },

        /* + TEZ · Film Jenerikleri (kaynak) ----------------------------- */
        {
            id: "tez",
            category: "Kaynak · Derinleşme",
            title: "Daha Derine: Film Jenerikleri",
            html: `
                <div class="mg-grid-2-1">
                    <div>
                        <p class="mg-intro" style="margin-bottom:16px;">Az önce gördüğümüz jenerik (title sequence) tarihi, başlı başına bir araştırma alanı. Dersin yürütücüsünün <strong>yüksek lisans tezi</strong> tam da bunu inceliyor: jeneriklerde hareketli grafiğin nasıl kullanıldığını.</p>
                        <p class="mg-sub">İsteyen daha derine inebilir · tipografi, ritim, teknik ve anlatının jenerikte nasıl buluştuğunu örneklerle ele alıyor.</p>
                    </div>
                    <div class="mg-card mg-card--magenta" style="padding:26px;">
                        <div class="mg-links__label" style="margin-bottom:12px;">Yüksek Lisans Tezi · 2018</div>
                        <div style="font-family:var(--font-display); font-weight:700; font-size:1.4rem; line-height:1.2; color:var(--text); margin-bottom:10px;">Film Jeneriklerinde Hareketli Grafik Kullanımı</div>
                        <div style="font-size:0.98rem; color:var(--text-dim); margin-bottom:18px;">Emre Mutlu · Gazi Üniversitesi, Güzel Sanatlar Enstitüsü</div>
                        <div style="display:flex; flex-wrap:wrap; gap:7px; margin-bottom:20px;">
                            <span class="mg-chip mg-chip--magenta">jenerik tarihi</span>
                            <span class="mg-chip mg-chip--cyan" lang="en">kinetic typography</span>
                            <span class="mg-chip">tasarım teknikleri</span>
                        </div>
                        <a class="mg-link" href="https://tez.yok.gov.tr/UlusalTezMerkezi/" target="_blank" rel="noopener">YÖK Ulusal Tez Merkezi · Tez No 498917</a>
                    </div>
                </div>
            `
        },

        /* 08 — SÖZLÜK --------------------------------------------------- */
        {
            id: "yapi-taslari",
            category: "Sözlük",
            title: "Hareketin Yapı Taşları",
            html: `
                <p class="mg-intro">Bu altı terim dönem boyunca sürekli kullanılır. Bugün tanışma · derinleşmesi ilerleyen haftalarda.</p>
                <div class="mg-grid-3 stagger">
                    <div class="mg-term"><span class="mg-term__k">frame <small>· kare</small></span><p class="mg-term__d">Hareketin tek bir durağan görüntüsü. Film, art arda gösterilen frame'lerden oluşur.</p></div>
                    <div class="mg-term"><span class="mg-term__k">frame rate <small>· kare hızı</small></span><p class="mg-term__d">Saniyedeki frame sayısı (fps). 24, 30, 60 · akıcılığı belirler.</p></div>
                    <div class="mg-term"><span class="mg-term__k">timeline <small>· zaman çizelgesi</small></span><p class="mg-term__d">Olayların zamana dizildiği alan. Motion yazılımlarının kalbi.</p></div>
                    <div class="mg-term"><span class="mg-term__k">keyframe <small>· anahtar kare</small></span><p class="mg-term__d">Bir özelliğin belirli bir andaki değerinin sabitlendiği nokta.</p></div>
                    <div class="mg-term"><span class="mg-term__k">easing <small>· ivmelenme</small></span><p class="mg-term__d">Hareketin nasıl hızlanıp yavaşladığı · karakterini verir.</p></div>
                    <div class="mg-term"><span class="mg-term__k">composition <small>· kompozisyon</small></span><p class="mg-term__d">Katmanların bir araya geldiği sahne · üzerinde çalışılan tuval.</p></div>
                </div>
            `
        },

        /* 09 — KEYFRAME & INTERPOLATION --------------------------------- */
        {
            id: "keyframe",
            category: "Çekirdek Kavram",
            title: "Keyframe ve Interpolation",
            html: `
                <div class="mg-grid-2-1">
                    <div>
                        <p class="mg-intro" style="margin-bottom:14px;">Her frame tek tek çizilmez. Yalnızca <strong>önemli anlar</strong> (keyframe) işaretlenir: "burada solda, şurada sağda". Yazılım aradaki tüm frame'leri kendisi doldurur.</p>
                        <p class="mg-sub">Bu doldurma işine <strong>interpolation (ara değerleme)</strong> denir. İki keyframe arasını yazılımın hesaplaması · işte motion'ın temel mekaniği budur. Asıl iş, <span class="u-strong">doğru anları</span> ve aralarındaki <span class="u-grad">geçişin karakterini</span> seçmek.</p>
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
                        <p class="mg-card__text" style="margin-top:14px;"><strong>İki uç</strong> konur · yazılım arasını canlandırır.</p>
                    </div>
                </div>
            `
        },

        /* 10 — EASING & BEZIER ------------------------------------------ */
        {
            id: "easing",
            category: "Çekirdek Kavram",
            title: "Easing ve Bezier Eğrileri",
            html: `
                <p class="mg-intro">Aynı mesafe, aynı süre · ama hareketin <strong>hissi</strong> bambaşka olabilir. Farkı yaratan easing'dir: hızın zaman içinde nasıl değiştiği. Bir <strong>bezier eğrisi</strong> ile çizilir:</p>
                <div class="mg-grid-3 stagger">
                    <div class="mg-bezier">
                        <svg viewBox="-8 -26 116 134" role="img" aria-label="linear easing eğrisi">
                            <defs><linearGradient id="mg-grad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ff2d6b"/><stop offset="0.5" stop-color="#b14bff"/><stop offset="1" stop-color="#19e3ff"/></linearGradient></defs>
                            <rect class="mg-curve-box" x="0" y="0" width="100" height="100"/>
                            <path class="mg-curve-guide" d="M0,100 L100,0"/>
                            <path class="mg-curve-path" d="M0,100 L100,0"/>
                            <circle class="mg-curve-dot" cx="0" cy="100" r="4.5"/>
                            <circle class="mg-curve-dot c2" cx="100" cy="0" r="4.5"/>
                        </svg>
                        <div class="mg-bezier__name">linear</div>
                        <div class="mg-bezier__val">robotik, mekanik</div>
                    </div>
                    <div class="mg-bezier">
                        <svg viewBox="-8 -26 116 134" role="img" aria-label="ease-out eğrisi">
                            <rect class="mg-curve-box" x="0" y="0" width="100" height="100"/>
                            <path class="mg-curve-guide" d="M0,100 L100,0"/>
                            <path class="mg-curve-path" d="M0,100 C16,0 40,0 100,0"/>
                            <circle class="mg-curve-dot" cx="0" cy="100" r="4.5"/>
                            <circle class="mg-curve-dot c2" cx="100" cy="0" r="4.5"/>
                        </svg>
                        <div class="mg-bezier__name">ease-out</div>
                        <div class="mg-bezier__val">doğal, yumuşak</div>
                    </div>
                    <div class="mg-bezier">
                        <svg viewBox="-8 -26 116 134" role="img" aria-label="overshoot eğrisi">
                            <rect class="mg-curve-box" x="0" y="0" width="100" height="100"/>
                            <path class="mg-curve-guide" d="M0,100 L100,0"/>
                            <path class="mg-curve-path" d="M0,100 C30,-16 55,4 100,0"/>
                            <circle class="mg-curve-dot" cx="0" cy="100" r="4.5"/>
                            <circle class="mg-curve-dot c2" cx="100" cy="0" r="4.5"/>
                        </svg>
                        <div class="mg-bezier__name">overshoot</div>
                        <div class="mg-bezier__val">canlı, oyuncu</div>
                    </div>
                </div>
                <div class="mg-links" style="margin-top:24px; justify-content:center;">
                    <span class="mg-links__label">canlı araçlar</span>
                    <a class="mg-link" href="https://easings.net" target="_blank" rel="noopener">easings.net</a>
                    <a class="mg-link" href="https://cubic-bezier.com" target="_blank" rel="noopener">cubic-bezier.com</a>
                </div>
            `
        },

        /* 11 — 12 İLKE -------------------------------------------------- */
        {
            id: "ilkeler",
            category: "İlkeler",
            title: "Animasyonun On İki İlkesi",
            html: `
                <p class="mg-intro">1930'larda Disney animatörlerinin damıttığı <strong>12 ilke</strong>, inandırıcı hareketin dilbilgisidir. Hepsi motion graphics'e de uygular. En sık kullanılan altısı:</p>
                <div class="mg-grid-3 stagger">
                    <div class="mg-card mg-card--magenta"><div class="mg-card__title">Timing &amp; spacing</div><p class="mg-card__text">Zamanlama ve aralıklama · hareketin <strong>en temel</strong> ikilisi.</p></div>
                    <div class="mg-card mg-card--cyan"><div class="mg-card__title">Ease in / out</div><p class="mg-card__text">Yavaş başlar, yavaş biter · gerçek nesneler böyle hareket eder.</p></div>
                    <div class="mg-card mg-card--amber"><div class="mg-card__title">Anticipation</div><p class="mg-card__text">Hazırlık · büyük hareketten önce küçük bir ters jest.</p></div>
                    <div class="mg-card"><div class="mg-card__title">Follow-through</div><p class="mg-card__text">Savrulma · duran nesnenin parçaları biraz sonra durur.</p></div>
                    <div class="mg-card"><div class="mg-card__title">Squash &amp; stretch</div><p class="mg-card__text">Ezilme ve gerilme · ağırlık ve esneklik hissi.</p></div>
                    <div class="mg-card"><div class="mg-card__title">Staging</div><p class="mg-card__text">Sahneleme · gözü doğru yere, doğru anda yönlendirmek.</p></div>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; justify-content:center; margin-top:18px;">
                    <span class="mg-links__label">diğer ilkeler</span>
                    <span class="mg-chip" lang="en">arcs</span>
                    <span class="mg-chip" lang="en">secondary action</span>
                    <span class="mg-chip" lang="en">exaggeration</span>
                    <span class="mg-chip" lang="en">straight ahead</span>
                    <span class="mg-chip" lang="en">solid drawing</span>
                    <span class="mg-chip" lang="en">appeal</span>
                </div>
            `
        },

        /* 12 — ARAÇ KUTUSU ---------------------------------------------- */
        {
            id: "arac",
            category: "Üretim",
            title: "Araç Kutusu",
            html: `
                <div class="mg-grid-2-1">
                    <div>
                        <p class="mg-intro" style="margin-bottom:14px;">Sektörün fiili standardı <strong>Adobe After Effects</strong>: timeline tabanlı, keyframe ve easing üzerine kurulu bir compositing yazılımı. Dönem boyunca ortak dil bu.</p>
                        <p class="mg-sub">Ama temel şu: araç değişir, <span class="u-grad">ilke kalır</span>. Aynı keyframe ve easing mantığı kodda (CSS, web), Blender'da, hatta bir sunum yazılımında da geçerlidir. Bu yüzden sıra önce <strong>düşünmekte</strong>, sonra <strong>araçta</strong>.</p>
                    </div>
                    <div style="display:flex; flex-direction:column; align-items:center; gap:14px;">
                        <span class="ae-logo" role="img" aria-label="Adobe After Effects"><b>Ae</b></span>
                        <div style="font-family:var(--font-display); font-weight:700; font-size:1.25rem; color:var(--text);">After Effects</div>
                        <div style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center;">
                            <span class="mg-chip mg-chip--cyan">ana araç</span>
                            <span class="mg-chip" lang="en">timeline · keyframe · easing</span>
                        </div>
                    </div>
                </div>
            `
        },

        /* 13 — HAFTALIK ÖDEV ------------------------------------------- */
        {
            id: "odev",
            category: "Haftalık Ödev",
            title: "Bu Haftanın Ödevi",
            html: `
                <div class="mg-task">
                    <p class="mg-task__brief">Bu hafta <strong>araç yok</strong>, odak gözü eğitmekte. Görev: çevreyi <strong>"motion gözüyle"</strong> izlemek ve <strong>3 hareketli grafik örneği</strong> toplamak. Gelecek hafta After Effects başlıyor.</p>
                    <ul class="mg-list">
                        <li>Günlük hayattan <strong>3 örnek</strong> (story/reels, uygulama geçişi, dizi/film jeneriği, yayın bandı). Link ya da ekran kaydı.</li>
                        <li>Her biri için: bu <strong>motion graphics, animation mı, VFX mi</strong>? Ve hareket <strong>neden işe yarıyor</strong> (dikkat · hiyerarşi · anlatı · duygu)?</li>
                        <li>Isınma: <span class="u-mono">easings.net</span>'te 3 farklı easing denemek, en beğenileni not etmek.</li>
                    </ul>
                    <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-top:18px;">
                        <span class="mg-links__label">teslim</span>
                        <span class="mg-chip mg-chip--magenta">3 örnek + kısa not</span>
                        <span class="mg-chip mg-chip--cyan">link / ekran kaydı</span>
                        <span class="mg-chip">gelecek derse kadar</span>
                    </div>
                </div>
                <div class="mg-callout" style="margin-top:18px;">
                    <h4>İpucu</h4>
                    <p>Bir kez fark edildiğinde <strong>her yerde</strong> görünür. Sözlükteki terimlerle (keyframe, easing, timing) düşünmek iyi bir başlangıç. Bu kelimeler haftaya ekranda canlanıyor.</p>
                </div>
            `
        },

    ]
};
