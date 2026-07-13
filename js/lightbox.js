// ===== LIGHTBOX FUNCTIONALITY =====

class Lightbox {
    constructor() {
        this.overlay = null;
        this.container = null;
        this.image = null;
        this.caption = null;
        this.closeBtn = null;
        this.navPrev = null;
        this.navNext = null;
        this.zoomInBtn = null;
        this.zoomOutBtn = null;
        this.panModeBtn = null;
        this.panModeIndicator = null;
        
        this.currentIndex = 0;
        this.images = [];
        this.isZoomed = false;
        this.isPanning = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
        this.scale = 1;
        
        this.init();
    }
    
    init() {
        // Create lightbox elements
        this.createLightbox();
        
        // Find all gallery images
        this.findGalleryImages();
        
        // Add click handlers
        this.addClickHandlers();
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
    }
    
    createLightbox() {
        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.className = 'lightbox-overlay';
        document.body.appendChild(this.overlay);
        
        // Create container
        this.container = document.createElement('div');
        this.container.className = 'lightbox-container';
        this.overlay.appendChild(this.container);
        
        // Create image
        this.image = document.createElement('img');
        this.image.className = 'lightbox-image';
        this.container.appendChild(this.image);
        
        // Create caption
        this.caption = document.createElement('div');
        this.caption.className = 'lightbox-caption';
        this.container.appendChild(this.caption);
        
        // Create close button
        this.closeBtn = document.createElement('button');
        this.closeBtn.className = 'lightbox-close';
        this.closeBtn.innerHTML = '&times;';
        this.closeBtn.addEventListener('click', () => this.close());
        this.container.appendChild(this.closeBtn);
        
        // Create navigation buttons
        this.navPrev = document.createElement('button');
        this.navPrev.className = 'lightbox-nav-prev';
        this.navPrev.innerHTML = '&larr;';
        this.navPrev.addEventListener('click', () => this.prev());
        
        this.navNext = document.createElement('button');
        this.navNext.className = 'lightbox-nav-next';
        this.navNext.innerHTML = '&rarr;';
        this.navNext.addEventListener('click', () => this.next());
        
        const nav = document.createElement('div');
        nav.className = 'lightbox-nav';
        nav.appendChild(this.navPrev);
        nav.appendChild(this.navNext);
        this.container.appendChild(nav);
        
        // Create zoom controls
        this.zoomInBtn = document.createElement('button');
        this.zoomInBtn.innerHTML = '+ ';
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        
        this.zoomOutBtn = document.createElement('button');
        this.zoomOutBtn.innerHTML = '- ';
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        
        const zoomControls = document.createElement('div');
        zoomControls.className = 'lightbox-zoom-controls';
        zoomControls.appendChild(this.zoomInBtn);
        zoomControls.appendChild(this.zoomOutBtn);
        this.container.appendChild(zoomControls);
        
        // Create pan mode indicator
        this.panModeIndicator = document.createElement('div');
        this.panModeIndicator.className = 'lightbox-pan-mode';
        this.panModeIndicator.textContent = 'Pan Mode';
        this.container.appendChild(this.panModeIndicator);
        
        // Add overlay click to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });
        
        // Add touch events for mobile
        this.addTouchEvents();
        
        // Add mouse events for desktop
        this.addMouseEvents();
    }
    
    findGalleryImages() {
        // Find all images with class 'gallery-image' or inside 'gallery-card'
        const galleryImages = document.querySelectorAll('.gallery-image, .gallery-card img');
        
        this.images = [];
        galleryImages.forEach((img, index) => {
            const src = img.getAttribute('src');
            const alt = img.getAttribute('alt') || '';
            const title = img.closest('.gallery-card')?.querySelector('.gallery-title')?.textContent || '';
            const meta = img.closest('.gallery-card')?.querySelector('.gallery-meta')?.textContent || '';
            
            this.images.push({
                src: src,
                alt: alt,
                title: title,
                meta: meta,
                element: img
            });
            
            // Add data-index attribute
            img.setAttribute('data-index', index);
        });
    }
    
    addClickHandlers() {
        this.images.forEach((image, index) => {
            image.element.addEventListener('click', (e) => {
                e.preventDefault();
                this.open(index);
            });
            
            // Add cursor pointer
            image.element.style.cursor = 'pointer';
        });
    }
    
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.overlay.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.prev();
                    break;
                case 'ArrowRight':
                    this.next();
                    break;
                case '+':
                case '=':
                    this.zoomIn();
                    break;
                case '-':
                case '_':
                    this.zoomOut();
                    break;
            }
        });
    }
    
    addTouchEvents() {
        let touchStartX = 0;
        let touchStartY = 0;
        
        this.image.addEventListener('touchstart', (e) => {
            if (this.isZoomed) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: false });
        
        this.image.addEventListener('touchmove', (e) => {
            if (this.isZoomed) {
                e.preventDefault();
                const touchX = e.touches[0].clientX;
                const touchY = e.touches[0].clientY;
                
                const deltaX = touchX - touchStartX;
                const deltaY = touchY - touchStartY;
                
                this.translateX += deltaX;
                this.translateY += deltaY;
                
                this.image.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
                
                touchStartX = touchX;
                touchStartY = touchY;
            }
        }, { passive: false });
    }
    
    addMouseEvents() {
        let isDragging = false;
        
        this.image.addEventListener('mousedown', (e) => {
            if (this.isZoomed) {
                isDragging = true;
                this.startX = e.clientX - this.translateX;
                this.startY = e.clientY - this.translateY;
                this.container.classList.add('dragging');
                e.preventDefault();
            }
        });
        
        document.addEventListener('mousemove', (e) => {
            if (isDragging && this.isZoomed) {
                this.translateX = e.clientX - this.startX;
                this.translateY = e.clientY - this.startY;
                this.image.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
            }
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            this.container.classList.remove('dragging');
        });
        
        // Double click to toggle zoom
        this.image.addEventListener('dblclick', (e) => {
            if (this.isZoomed) {
                this.zoomOut();
            } else {
                this.zoomIn();
            }
            e.preventDefault();
        });
        
        // Mouse wheel to zoom
        this.image.addEventListener('wheel', (e) => {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.2 : 0.2;
            this.scale = Math.max(1, Math.min(5, this.scale + delta));
            this.image.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
            
            if (this.scale > 1) {
                this.isZoomed = true;
                this.panModeIndicator.classList.add('active');
            } else {
                this.isZoomed = false;
                this.translateX = 0;
                this.translateY = 0;
                this.panModeIndicator.classList.remove('active');
            }
        }, { passive: false });
    }
    
    open(index) {
        this.currentIndex = index;
        const imageData = this.images[index];
        
        this.image.src = imageData.src;
        this.image.alt = imageData.alt;
        this.caption.textContent = `${imageData.title} - ${imageData.meta}`;
        
        // Reset zoom and pan
        this.scale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.isZoomed = false;
        this.image.style.transform = 'none';
        this.panModeIndicator.classList.remove('active');
        
        // Update navigation buttons
        this.updateNavigation();
        
        // Show lightbox
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    close() {
        this.overlay.classList.remove('active');
        this.overlay.classList.add('closing');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            this.overlay.classList.remove('closing');
        }, 300);
    }
    
    next() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.loadImage();
        }
    }
    
    prev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.loadImage();
        }
    }
    
    loadImage() {
        const imageData = this.images[this.currentIndex];
        
        // Fade out
        this.image.style.opacity = '0';
        
        setTimeout(() => {
            this.image.src = imageData.src;
            this.image.alt = imageData.alt;
            this.caption.textContent = `${imageData.title} - ${imageData.meta}`;
            
            // Reset zoom and pan
            this.scale = 1;
            this.translateX = 0;
            this.translateY = 0;
            this.isZoomed = false;
            this.image.style.transform = 'none';
            this.panModeIndicator.classList.remove('active');
            
            // Fade in
            this.image.style.opacity = '1';
            
            // Update navigation buttons
            this.updateNavigation();
        }, 200);
    }
    
    zoomIn() {
        this.scale = Math.min(5, this.scale + 0.5);
        this.image.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
        this.isZoomed = true;
        this.panModeIndicator.classList.add('active');
    }
    
    zoomOut() {
        this.scale = Math.max(1, this.scale - 0.5);
        this.image.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
        
        if (this.scale <= 1) {
            this.scale = 1;
            this.translateX = 0;
            this.translateY = 0;
            this.isZoomed = false;
            this.image.style.transform = 'none';
            this.panModeIndicator.classList.remove('active');
        }
    }
    
    updateNavigation() {
        this.navPrev.disabled = this.currentIndex === 0;
        this.navNext.disabled = this.currentIndex === this.images.length - 1;
    }
}

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Lightbox();
});
