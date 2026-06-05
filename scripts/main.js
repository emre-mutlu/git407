/**
 * ==========================================================================
 * MAIN PRESENTATION CONTROLLER (Shell Engine)
 * ==========================================================================
 */

import { week1 } from '../weeks/week1.js';

// Cache for loaded weeks
const weeksData = {
    week1: week1
};

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
        this.setupEventListeners();
        await this.loadWeek(this.weekSelect.value);
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
        });

        // Set total count
        this.totalSlidesNum.textContent = this.slides.length;
        
        // Restore saved slide index or go to first slide
        const savedIndex = localStorage.getItem(`vcd_sunum_slide_${this.currentWeekKey}`);
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
                localStorage.setItem(`vcd_sunum_slide_${this.currentWeekKey}`, this.currentSlideIndex);
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

// Instantiate presentation engine when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    window.presentation = new PresentationEngine();
    window.lightbox = new Lightbox();
});
