/**
 * ==========================================================================
 * MAIN PRESENTATION CONTROLLER (Shell Engine)
 * ==========================================================================
 */

import { manifest } from '../weeks/manifest.js';

// Engine version stamp — bump on any shared-engine change so drift between
// git407 and git423 stays visible (bin/sync-engine.sh distributes this file
// verbatim; the stamp tells you which copy a site is actually running).
const ENGINE_VERSION = '1.2.0';

// Per-site localStorage namespace, derived from the first path segment
// (github.io/git407/… → "git407", github.io/git423/… → "git423"). Keeps the
// engine byte-identical across sites while stopping the two decks from
// clobbering each other's "resume slide" key. Falls back to "local" in dev.
const SITE_ID = location.pathname.split('/').filter(Boolean)[0] || 'local';
const slideKey = (weekKey) => `${SITE_ID}_sunum_slide_${weekKey}`;

// Runtime cache for dynamically-loaded week modules.
const weeksData = {};

class PresentationEngine {
    constructor() {
        this.currentSlideIndex = 0;
        this.slides = [];
        this.slideElements = [];
        
        // DOM Elements
        this.container = document.getElementById('slide-container');
        this.navDots = document.getElementById('nav-dots');
        this.currentSlideNum = document.getElementById('current-slide-num');
        this.totalSlidesNum = document.getElementById('total-slides-num');
        this.weekSelect = document.getElementById('week-select');
        
        this.init();
    }

    async init() {
        const defaultWeek = this.populateWeeks();
        this.setupEventListeners();
        await this.loadWeek(defaultWeek);
    }

    /**
     * Build the week dropdown from weeks/manifest.js (per-site content) and
     * return the default week key. "Add a deck = drop weekN.js + one manifest
     * line" — no engine edit, the build-less SPA is preserved. The manifest is
     * the only per-site file the engine imports; the engine itself stays
     * byte-identical across git407 / git423.
     */
    populateWeeks() {
        const first = manifest.length ? manifest[0].key : null;
        if (!this.weekSelect) return first;
        this.weekSelect.innerHTML = '';
        let defaultKey = first;
        manifest.forEach((entry) => {
            const opt = document.createElement('option');
            opt.value = entry.key;
            opt.textContent = entry.label;
            if (entry.default) {
                opt.selected = true;
                defaultKey = entry.key;
            }
            this.weekSelect.appendChild(opt);
        });
        return defaultKey;
    }

    setupEventListeners() {
        // Keyboard Navigation
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Week Selection Dropdown
        this.weekSelect.addEventListener('change', async (e) => {
            await this.loadWeek(e.target.value);
        });

        // Touch Swipe Navigation for mobile/tablets
        let touchStartX = 0;
        let touchStartY = 0;
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        this.container.addEventListener('touchend', (e) => {
            const diffX = e.changedTouches[0].screenX - touchStartX;
            const diffY = e.changedTouches[0].screenY - touchStartY;
            
            // Swipe left -> Next slide, Swipe right -> Prev slide (only if not a vertical scroll swipe)
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX < 0) {
                    this.advance();
                } else {
                    this.prevSlide();
                }
            }
        }, { passive: true });

        // Re-fit slides to the viewport on resize (debounced) and once webfonts
        // finish loading (metrics shift between fallback and Geist/JetBrains).
        window.addEventListener('resize', () => {
            clearTimeout(this._fitTimer);
            this._fitTimer = setTimeout(() => this.fitAll(), 120);
        });
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => this.fitAll());
        }
    }

    /**
     * Scale-to-fit: every slide stays vertically centered and never scrolls.
     * If a slide's content is taller (or wider) than the available area, the
     * inner wrapper is shrunk uniformly so it fits — like Keynote/reveal.js.
     */
    fitAll() {
        this.slideElements.forEach((el) => this.fitSlide(el));
    }

    fitSlide(slideEl) {
        if (!slideEl) return;
        const inner = slideEl.querySelector('.slide-inner');
        if (!inner) return;

        // Fill-type slides (interactive playgrounds) fill the area by design.
        if (slideEl.classList.contains('slide-fill')) {
            inner.style.transform = '';
            return;
        }

        // Measure natural size with any previous scale removed.
        inner.style.transform = '';
        const cs = getComputedStyle(slideEl);
        const availH = slideEl.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        const availW = slideEl.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const needH = inner.scrollHeight;
        const needW = inner.scrollWidth;
        if (needH <= 0 || needW <= 0 || availH <= 0) return;

        let scale = Math.min(availH / needH, availW / needW, 1);
        if (scale < 1) {
            scale = Math.max(scale, 0.4); // floor so text never collapses to nothing
            inner.style.transform = `scale(${scale})`;
        }
    }

    async loadWeek(weekKey) {
        this.currentWeekKey = weekKey;
        let weekData = weeksData[weekKey];
        if (!weekData) {
            this.container.innerHTML = `<div class="loading-slide">Modül yükleniyor: ${weekKey}...</div>`;
            try {
                // Dynamically import future week modules if selected
                const module = await import(`../weeks/${weekKey}.js`);
                weekData = module[weekKey];
                weeksData[weekKey] = weekData;
            } catch (err) {
                console.error(err);
                this.container.innerHTML = `<div class="loading-slide text-error">Hata: Hafta modülü yüklenemedi.</div>`;
                return;
            }
        }
        
        this.slides = weekData.slides || [];
        this.currentSlideIndex = 0;
        this.renderSlides();
    }

    renderSlides() {
        this.container.innerHTML = '';
        this.navDots.innerHTML = '';
        this.slideElements = [];

        if (this.slides.length === 0) {
            this.container.innerHTML = '<div class="loading-slide">Gösterilecek slayt bulunamadı.</div>';
            return;
        }

        this.slides.forEach((slideData, idx) => {
            // Create Slide Element
            const slideEl = document.createElement('section');
            slideEl.className = `slide slide-${slideData.type || 'standard'} ${slideData.className || ''}`;
            slideEl.id = `slide-${slideData.id}`;
            
            // Build inner HTML
            let bodyHTML = '';
            if (slideData.type === 'hero') {
                bodyHTML = `
                    <div class="slide-inner">
                        <h2 class="slide-title">${slideData.title}</h2>
                        ${slideData.subtitle ? `<p class="slide-subtitle">${slideData.subtitle}</p>` : ''}
                        ${slideData.html || ''}
                    </div>
                `;
            } else if (slideData.type === 'reveal') {
                bodyHTML = `
                    <div class="slide-inner">
                        <div class="slide-header">
                            <span class="slide-category">${slideData.category || 'Soru & Tartışma'}</span>
                            <h2 class="slide-title">${slideData.title}</h2>
                        </div>
                        <div class="slide-body">
                            <div class="reveal-wrapper" id="reveal-${slideData.id}">
                                <div class="reveal-trigger">
                                    <h3>${slideData.question}</h3>
                                    <p class="reveal-trigger-hint">Cevabı açmak için tıklayın veya Space tuşuna basın</p>
                                </div>
                                <div class="reveal-content">
                                    ${slideData.html || ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else { // Standard Layout
                bodyHTML = `
                    <div class="slide-inner">
                        <div class="slide-header">
                            <span class="slide-category">${slideData.category || 'Konu'}</span>
                            <h2 class="slide-title">${slideData.title}</h2>
                        </div>
                        <div class="slide-body">
                            ${slideData.html || ''}
                        </div>
                    </div>
                `;
            }

            slideEl.innerHTML = bodyHTML;
            this.container.appendChild(slideEl);
            this.slideElements.push(slideEl);

            // Specific click listener for reveal-trigger
            if (slideData.type === 'reveal') {
                const trigger = slideEl.querySelector('.reveal-trigger');
                const revealWrap = slideEl.querySelector('.reveal-wrapper');
                if (trigger && revealWrap) {
                    trigger.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (!revealWrap.classList.contains('revealed')) {
                            this.revealSlide(revealWrap, slideData);
                        }
                    });
                }
            }

            // Create dot indicator
            const dotLi = document.createElement('li');
            dotLi.className = 'nav-dot-item';
            dotLi.innerHTML = `
                <button class="nav-dot" aria-label="Slayt ${idx + 1}" data-index="${idx}"></button>
                <span class="nav-dot-tooltip">${slideData.title}</span>
            `;
            
            dotLi.querySelector('.nav-dot').addEventListener('click', () => {
                this.goToSlide(idx);
            });
            this.navDots.appendChild(dotLi);

            // Execute slide onRender hook if present
            if (slideData.onRender) {
                try {
                    slideData.onRender(slideEl);
                } catch (err) {
                    console.error(`Error on slide [${slideData.id}] render hook:`, err);
                }
            }

            // Hydrate interactive motion demos declared in this slide's html.
            slideEl.querySelectorAll('[data-motion-demo]').forEach((el) => {
                try { new MotionDemo(el); }
                catch (err) { console.error(`MotionDemo init [${slideData.id}]:`, err); }
            });
        });

        // Set total count
        this.totalSlidesNum.textContent = this.slides.length;
        
        // Restore saved slide index or go to first slide
        const savedIndex = localStorage.getItem(slideKey(this.currentWeekKey));
        let initialIndex = savedIndex ? parseInt(savedIndex, 10) : 0;
        
        // Ensure index is within bounds (in case slides were removed)
        if (initialIndex >= this.slides.length || initialIndex < 0) {
            initialIndex = 0;
        }
        
        this.goToSlide(initialIndex);

        // Fit every slide to the viewport once the browser has laid them out.
        requestAnimationFrame(() => this.fitAll());
    }

    goToSlide(index) {
        if (index < 0 || index >= this.slides.length) return;
        
        const direction = index > this.currentSlideIndex ? 'forward' : 'backward';
        
        const updateDOM = () => {
            // Remove active class from previous
            if (this.slideElements[this.currentSlideIndex]) {
                this.slideElements[this.currentSlideIndex].classList.remove('active');
            }

            // De-active nav dot
            const dots = this.navDots.querySelectorAll('.nav-dot-item');
            if (dots[this.currentSlideIndex]) {
                dots[this.currentSlideIndex].classList.remove('active');
            }

            // Set new index
            this.currentSlideIndex = index;

            // Add active to current
            if (this.slideElements[this.currentSlideIndex]) {
                this.slideElements[this.currentSlideIndex].classList.add('active');
                
                // Focus container to allow immediate keyboard input
                this.container.focus();
            }

            if (dots[this.currentSlideIndex]) {
                dots[this.currentSlideIndex].classList.add('active');
            }

            // Update footer counters
            this.currentSlideNum.textContent = this.currentSlideIndex + 1;
            
            // Save current slide index to localStorage
            if (this.currentWeekKey) {
                localStorage.setItem(slideKey(this.currentWeekKey), this.currentSlideIndex);
            }
        };

        if (!document.startViewTransition) {
            updateDOM();
        } else {
            document.startViewTransition({
                update: updateDOM,
                types: [direction]
            });
        }
    }

    advance() {
        const activeSlideData = this.slides[this.currentSlideIndex];
        const activeSlideEl = this.slideElements[this.currentSlideIndex];
        
        // If current slide is reveal type and not yet revealed, reveal it!
        if (activeSlideData.type === 'reveal') {
            const revealWrap = activeSlideEl.querySelector('.reveal-wrapper');
            if (revealWrap && !revealWrap.classList.contains('revealed')) {
                this.revealSlide(revealWrap, activeSlideData);
                return;
            }
        }

        // Otherwise go to next slide
        if (this.currentSlideIndex < this.slides.length - 1) {
            this.goToSlide(this.currentSlideIndex + 1);
        }
    }

    prevSlide() {
        if (this.currentSlideIndex > 0) {
            this.goToSlide(this.currentSlideIndex - 1);
        }
    }

    revealSlide(revealWrap, slideData) {
        revealWrap.classList.add('revealed');
        // Trigger reveal callback if exists
        if (slideData.onReveal) {
            try {
                slideData.onReveal(this.slideElements[this.currentSlideIndex]);
            } catch (err) {
                console.error(`Error on slide [${slideData.id}] reveal hook:`, err);
            }
        }
        // Revealed content expands the slide — re-fit so it still fits.
        requestAnimationFrame(() => this.fitSlide(this.slideElements[this.currentSlideIndex]));
    }

    handleKeyDown(e) {
        // Don't navigate slides while lightbox is open
        if (window.lightbox && window.lightbox.isOpen) return;

        // Prevent default space/arrow keys behavior (scrolling) when in presentation
        if (['Space', ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            // Check if user is typing in input or code editor inside slides
            const activeTag = document.activeElement.tagName.toLowerCase();
            if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select' || document.activeElement.isContentEditable) {
                return; // Let normal input typing work
            }
            e.preventDefault();
        }

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
            case 'PageDown':
                this.advance();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                this.prevSlide();
                break;
            case ' ': // Space key
            case 'Spacebar':
            case 'Enter':
                this.advance();
                break;
        }
    }

}

// ==========================================================================
// GLOBAL LIGHTBOX
// ==========================================================================
class Lightbox {
    constructor() {
        this.overlay = null;
        this.isOpen = false;
        this._build();
        this._bindGlobal();
    }

    _build() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'lightbox-overlay';
        this.overlay.setAttribute('role', 'dialog');
        this.overlay.setAttribute('aria-modal', 'true');

        this.overlay.innerHTML = `
            <div class="lb-backdrop"></div>
            <div class="lb-content">
                <img class="lb-img" src="" alt="" />
                <p class="lb-caption"></p>
            </div>
        `;
        document.body.appendChild(this.overlay);

        this.overlay.addEventListener('click', () => this.close());
    }

    _bindGlobal() {
        document.addEventListener('click', (e) => {
            const el = e.target.closest('[data-lightbox]');
            if (el) {
                e.stopPropagation();
                const src = el.dataset.lightboxSrc || el.src || '';
                const caption = el.dataset.lightboxCaption || el.alt || '';
                this.open(src, caption);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) this.close();
        });
    }

    open(src, caption = '') {
        const imgEl    = this.overlay.querySelector('.lb-img');
        const capEl    = this.overlay.querySelector('.lb-caption');
        const contentEl = this.overlay.querySelector('.lb-content');

        imgEl.src = src;
        imgEl.alt = caption;
        capEl.textContent = caption;
        capEl.style.display = caption ? 'block' : 'none';

        this.isOpen = true;
        document.body.style.overflow = 'hidden';

        // Make visible first (so transition can run), then animate in next frame
        this.overlay.style.visibility = 'visible';
        this.overlay.style.opacity = '0';
        contentEl.style.transform = 'scale(0.92) translateY(10px)';
        contentEl.style.opacity = '0';

        requestAnimationFrame(() => {
            this.overlay.style.opacity = '1';
            contentEl.style.transform = 'scale(1) translateY(0)';
            contentEl.style.opacity = '1';
        });
    }

    close() {
        const contentEl = this.overlay.querySelector('.lb-content');

        this.overlay.style.opacity = '0';
        contentEl.style.transform = 'scale(0.94) translateY(6px)';
        contentEl.style.opacity = '0';

        // Hide after transition completes
        setTimeout(() => {
            this.overlay.style.visibility = 'hidden';
        }, 350);

        this.isOpen = false;
        document.body.style.overflow = '';
    }
}

// ==========================================================================
// MOTION DEMO — interactive easing widgets (declarative: [data-motion-demo])
//   playground = draggable cubic-bezier curve + a dot that traces the eased motion
//   race       = N named easings animated side-by-side on one click
// Build-less, vanilla SVG/JS, no deps. Generic (animation-course-wide; inert
// when no [data-motion-demo] exists, so git423 decks are unaffected).
// ==========================================================================
class MotionDemo {
    constructor(el) {
        this.el = el;
        this.mode = el.dataset.motionDemo || 'playground';
        this.duration = parseInt(el.dataset.duration || '1100', 10);
        // control points [x1,y1,x2,y2]; y may exceed [0,1] for overshoot.
        this.presets = {
            linear:    [0, 0, 1, 1],
            ease:      [0.25, 0.1, 0.25, 1],
            overshoot: [0.34, 1.56, 0.64, 1],
        };
        this._raf = null;
        el.classList.add('motion-demo', `md-${this.mode}`);
        (this.mode === 'race') ? this._buildRace() : this._buildPlayground();
    }

    // cubic-bezier(p)(t): control pts [x1,y1,x2,y2] → eased y for input x=t in [0,1].
    static ease(p, t) {
        const [x1, y1, x2, y2] = p;
        const bez = (a, b, u) => 3 * (1 - u) * (1 - u) * u * a + 3 * (1 - u) * u * u * b + u * u * u;
        let lo = 0, hi = 1, u = t;
        for (let i = 0; i < 20; i++) { u = (lo + hi) / 2; (bez(x1, x2, u) < t) ? (lo = u) : (hi = u); }
        return bez(y1, y2, u);
    }

    // unit (x in [0,1], y free) → SVG coords inside a [pad .. size-pad] box (y up).
    _pt(x, y, size, pad) {
        const span = size - 2 * pad;
        return [pad + x * span, size - pad - y * span];
    }

    _buildPlayground() {
        const size = 300, pad = 34, ns = 'http://www.w3.org/2000/svg';
        let pts = (this.el.dataset.bezier || '0.25,0.1,0.25,1').split(',').map(Number);
        if (pts.length !== 4 || pts.some(Number.isNaN)) pts = [0.25, 0.1, 0.25, 1];

        const svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
        svg.setAttribute('class', 'md-svg');
        const mk = (tag, cls, attrs = {}) => {
            const n = document.createElementNS(ns, tag);
            if (cls) n.setAttribute('class', cls);
            for (const k in attrs) n.setAttribute(k, attrs[k]);
            return n;
        };
        const frame = mk('rect', 'md-frame', { x: pad, y: pad, width: size - 2 * pad, height: size - 2 * pad });
        const [lx0, ly0] = this._pt(0, 0, size, pad), [lx1, ly1] = this._pt(1, 1, size, pad);
        const diag = mk('line', 'md-diag', { x1: lx0, y1: ly0, x2: lx1, y2: ly1 });
        const guide1 = mk('line', 'md-guide'), guide2 = mk('line', 'md-guide');
        const curve = mk('path', 'md-curve');
        const h1 = mk('circle', 'md-handle', { r: 8 }), h2 = mk('circle', 'md-handle', { r: 8 });
        const dot = mk('circle', 'md-dot', { r: 7 });
        svg.append(frame, diag, guide1, guide2, curve, h1, h2, dot);

        const readout = document.createElement('div');
        readout.className = 'md-readout';
        const playBtn = document.createElement('button');
        playBtn.type = 'button'; playBtn.className = 'md-play'; playBtn.textContent = '▶ Oynat';

        const redraw = () => {
            const [p0x, p0y] = this._pt(0, 0, size, pad);
            const [p3x, p3y] = this._pt(1, 1, size, pad);
            const [c1x, c1y] = this._pt(pts[0], pts[1], size, pad);
            const [c2x, c2y] = this._pt(pts[2], pts[3], size, pad);
            curve.setAttribute('d', `M ${p0x} ${p0y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p3x} ${p3y}`);
            h1.setAttribute('cx', c1x); h1.setAttribute('cy', c1y);
            h2.setAttribute('cx', c2x); h2.setAttribute('cy', c2y);
            guide1.setAttribute('x1', p0x); guide1.setAttribute('y1', p0y); guide1.setAttribute('x2', c1x); guide1.setAttribute('y2', c1y);
            guide2.setAttribute('x1', p3x); guide2.setAttribute('y1', p3y); guide2.setAttribute('x2', c2x); guide2.setAttribute('y2', c2y);
            readout.textContent = `cubic-bezier(${pts.map((n) => n.toFixed(2)).join(', ')})`;
        };

        const bindDrag = (handle, ix, iy) => {
            handle.addEventListener('pointerdown', (e) => {
                e.preventDefault(); handle.setPointerCapture(e.pointerId);
                const span = size - 2 * pad;
                const move = (ev) => {
                    const r = svg.getBoundingClientRect();
                    const sx = (ev.clientX - r.left) / r.width * size;
                    const sy = (ev.clientY - r.top) / r.height * size;
                    pts[ix] = Math.min(1, Math.max(0, (sx - pad) / span));
                    pts[iy] = Math.min(1.6, Math.max(-0.6, (size - pad - sy) / span));
                    redraw();
                };
                const up = () => { svg.removeEventListener('pointermove', move); svg.removeEventListener('pointerup', up); };
                svg.addEventListener('pointermove', move);
                svg.addEventListener('pointerup', up);
            });
        };
        bindDrag(h1, 0, 1); bindDrag(h2, 2, 3);

        const play = () => {
            if (this._raf) cancelAnimationFrame(this._raf);
            const t0 = performance.now();
            const step = (now) => {
                const t = Math.min(1, (now - t0) / this.duration);
                const [cx, cy] = this._pt(t, MotionDemo.ease(pts, t), size, pad);
                dot.setAttribute('cx', cx); dot.setAttribute('cy', cy);
                if (t < 1) this._raf = requestAnimationFrame(step);
            };
            this._raf = requestAnimationFrame(step);
        };
        playBtn.addEventListener('click', play);

        redraw();
        const [sx, sy] = this._pt(0, 0, size, pad);
        dot.setAttribute('cx', sx); dot.setAttribute('cy', sy);
        this.el.append(svg, readout, playBtn);
    }

    _buildRace() {
        const names = (this.el.dataset.easings || 'linear,ease,overshoot')
            .split(',').map((s) => s.trim()).filter(Boolean);
        const rows = names.map((name) => {
            const row = document.createElement('div'); row.className = 'md-row';
            const label = document.createElement('span'); label.className = 'md-label'; label.setAttribute('lang', 'en'); label.textContent = name;
            const track = document.createElement('div'); track.className = 'md-track';
            const dot = document.createElement('span'); dot.className = 'md-dot';
            track.appendChild(dot); row.append(label, track);
            this.el.appendChild(row);
            return { dot, preset: this.presets[name] || this.presets.linear };
        });
        const playBtn = document.createElement('button');
        playBtn.type = 'button'; playBtn.className = 'md-play'; playBtn.textContent = '▶ Yarıştır';
        const play = () => {
            if (this._raf) cancelAnimationFrame(this._raf);
            const t0 = performance.now();
            const step = (now) => {
                const t = Math.min(1, (now - t0) / this.duration);
                rows.forEach((r) => { r.dot.style.left = (MotionDemo.ease(r.preset, t) * 100) + '%'; });
                if (t < 1) this._raf = requestAnimationFrame(step);
            };
            this._raf = requestAnimationFrame(step);
        };
        playBtn.addEventListener('click', play);
        this.el.appendChild(playBtn);
    }
}

// Instantiate presentation engine when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    console.info(`Sunum motoru v${ENGINE_VERSION} · ${SITE_ID}`);
    window.presentation = new PresentationEngine();
    window.lightbox = new Lightbox();
});
