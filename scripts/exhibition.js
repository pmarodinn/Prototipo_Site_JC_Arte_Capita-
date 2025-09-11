// Exhibition Page JavaScript

class ExhibitionPage {
    constructor() {
        this.currentFilter = 'all';
        this.artworks = [];
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupArtworkModal();
        this.setupArtworkAnimations();
        this.collectArtworkData();
    }

    collectArtworkData() {
        const artworkItems = document.querySelectorAll('.artwork-item');
        this.artworks = Array.from(artworkItems).map(item => ({
            element: item,
            category: item.getAttribute('data-category'),
            title: item.querySelector('h3').textContent,
            artist: item.querySelector('.artist-name').textContent,
            year: item.querySelector('.artwork-year').textContent,
            medium: item.querySelector('.artwork-medium').textContent,
            dimensions: item.querySelector('.artwork-dimensions').textContent
        }));
    }

    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                this.applyFilter(filter);
                this.updateActiveFilter(btn);
            });
        });
    }

    updateActiveFilter(activeBtn) {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    applyFilter(filter) {
        this.currentFilter = filter;
        const artworkItems = document.querySelectorAll('.artwork-item');
        
        artworkItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('filtered-out');
                // Stagger animation for visible items
                setTimeout(() => {
                    item.style.transform = 'translateY(0) scale(1)';
                    item.style.opacity = '1';
                }, index * 100);
            } else {
                item.classList.add('filtered-out');
                item.style.transform = 'translateY(20px) scale(0.8)';
                item.style.opacity = '0';
            }
        });
    }

    setupArtworkModal() {
        const viewButtons = document.querySelectorAll('.view-btn');
        
        viewButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openArtworkModal(index);
            });
        });
    }

    openArtworkModal(artworkIndex) {
        const artwork = this.artworks[artworkIndex];
        if (!artwork) return;

        const modal = this.createArtworkModal(artwork);
        document.body.appendChild(modal);
        
        // Animate modal entrance
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }

    createArtworkModal(artwork) {
        const modal = document.createElement('div');
        modal.className = 'artwork-modal';
        
        modal.innerHTML = `
            <div class="artwork-modal-overlay"></div>
            <div class="artwork-modal-content">
                <button class="modal-close">&times;</button>
                <div class="artwork-modal-image"></div>
                <div class="artwork-modal-info">
                    <h2>${artwork.title}</h2>
                    <p class="artist">${artwork.artist}</p>
                    <div class="details">
                        <div class="detail">
                            <strong>Ano:</strong>
                            <span>${artwork.year}</span>
                        </div>
                        <div class="detail">
                            <strong>Técnica:</strong>
                            <span>${artwork.medium}</span>
                        </div>
                        <div class="detail">
                            <strong>Dimensões:</strong>
                            <span>${artwork.dimensions}</span>
                        </div>
                        <div class="detail">
                            <strong>Categoria:</strong>
                            <span>${this.translateCategory(artwork.category)}</span>
                        </div>
                    </div>
                    <div class="description">
                        <p>
                            ${this.generateArtworkDescription(artwork)}
                        </p>
                        <p>
                            Esta obra representa um investimento cultural e financeiro de grande potencial, 
                            combinando valor artístico com perspectivas de valorização no mercado de arte contemporânea.
                        </p>
                    </div>
                    <div class="artwork-actions">
                        <button class="btn btn-primary" onclick="this.requestInfo('${artwork.title}')">
                            Solicitar Informações
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.artwork-modal-overlay');
        
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 400);
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);
        
        // Close on Escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });

        return modal;
    }

    translateCategory(category) {
        const translations = {
            'pintura': 'Pintura',
            'escultura': 'Escultura',
            'instalacao': 'Instalação',
            'fotografia': 'Fotografia',
            'desenho': 'Desenho'
        };
        return translations[category] || category;
    }

    generateArtworkDescription(artwork) {
        const descriptions = {
            'pintura': `Esta ${artwork.medium.toLowerCase()} explora as possibilidades expressivas da cor e forma, 
                       criando uma narrativa visual que dialoga com as questões contemporâneas. 
                       A técnica refinada do artista evidencia sua maturidade artística e domínio do meio.`,
            'escultura': `Uma peça tridimensional que ocupa o espaço de forma magistral, 
                         ${artwork.medium.toLowerCase()} revela a habilidade técnica e a visão conceitual do artista. 
                         A obra convida à reflexão sobre forma, volume e presença no espaço.`,
            'instalacao': `Esta instalação interativa cria uma experiência imersiva única, 
                          transformando o espaço expositivo em ambiente de contemplação e descoberta. 
                          A obra utiliza elementos contemporâneos para questionar nossa relação com o espaço e o tempo.`
        };
        return descriptions[artwork.category] || `Uma obra significativa que representa a visão única de ${artwork.artist}, 
                                                  demonstrando técnica refinada e conceito bem desenvolvido.`;
    }

    requestInfo(artworkTitle) {
        // Simulate info request
        const message = `Gostaria de mais informações sobre a obra "${artworkTitle}".`;
        
        // You could integrate with a contact form or email service here
        if (navigator.share) {
            navigator.share({
                title: 'JC Arte & Capital - Solicitação de Informações',
                text: message,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard or show contact info
            this.showContactInfo(message);
        }
    }

    showContactInfo(message) {
        const notification = document.createElement('div');
        notification.className = 'contact-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h3>Entre em Contato</h3>
                <p>Para mais informações sobre esta obra:</p>
                <div class="contact-options">
                    <a href="mailto:contato@jcartecapital.com?subject=Consulta sobre obra&body=${encodeURIComponent(message)}" 
                       class="contact-option">
                        Email: contato@jcartecapital.com
                    </a>
                    <a href="tel:+5511999999999" class="contact-option">
                        Telefone: +55 (11) 9999-9999
                    </a>
                </div>
                <button class="close-notification">&times;</button>
            </div>
        `;

        // Add notification styles
        if (!document.querySelector('#contact-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'contact-notification-styles';
            styles.textContent = `
                .contact-notification {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 4000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                .contact-notification.show {
                    opacity: 1;
                }
                
                .notification-content {
                    background: var(--white);
                    padding: 40px;
                    border-radius: 16px;
                    max-width: 500px;
                    width: 90vw;
                    position: relative;
                    text-align: center;
                }
                
                .notification-content h3 {
                    color: var(--text-primary);
                    margin-bottom: 16px;
                    font-size: 1.5rem;
                }
                
                .notification-content p {
                    color: var(--text-secondary);
                    margin-bottom: 24px;
                }
                
                .contact-options {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }
                
                .contact-option {
                    display: block;
                    padding: 16px;
                    background: var(--primary-light);
                    border-radius: 8px;
                    color: var(--text-primary);
                    text-decoration: none;
                    transition: background 0.3s ease;
                }
                
                .contact-option:hover {
                    background: var(--primary-gold);
                    color: var(--white);
                }
                
                .close-notification {
                    position: absolute;
                    top: 12px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        const closeBtn = notification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }

    setupArtworkAnimations() {
        // Intersection Observer for artwork items
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Initially hide artwork items for animation
        const artworkItems = document.querySelectorAll('.artwork-item');
        artworkItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px)';
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(item);
        });

        // Statistics counter animation
        this.animateStats();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.textContent);
                    this.animateNumber(entry.target, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * this.easeOutCubic(progress));
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
}

// Gallery slideshow for other exhibitions
class ExhibitionSlideshow {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.other-exhibition-card');
        this.init();
    }

    init() {
        if (this.slides.length > 0) {
            this.setupSlideshow();
        }
    }

    setupSlideshow() {
        // Add subtle hover animations
        this.slides.forEach((slide, index) => {
            slide.addEventListener('mouseenter', () => {
                slide.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            slide.addEventListener('mouseleave', () => {
                slide.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ExhibitionPage();
    new ExhibitionSlideshow();
    
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export for use in other scripts
window.ExhibitionPage = ExhibitionPage;
