// Main JavaScript for JC Arte & Capital Website

class JCWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupExhibitions();
        this.setupForm();
        this.setupMobileMenu();
        this.setupInteractiveMosaic();
    }

    // Navigation and Scroll Effects
    setupNavigation() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Inject scroll progress bar
        if (!navbar.querySelector('.scroll-progress')) {
            const bar = document.createElement('div');
            bar.className = 'scroll-progress';
            navbar.appendChild(bar);
        }
        const progressBar = navbar.querySelector('.scroll-progress');

        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                    }
                }
            });
        });

        const updateProgress = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            progressBar.style.transform = `scaleX(${progress})`;
        };

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
            updateProgress();
            this.updateActiveNavigation();
        });

        updateProgress();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Scroll-triggered animations
    setupScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.text-block, .exhibition-card, .grid-item');
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }

    // Enhanced animations
    setupAnimations() {
        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-circle, .floating-square, .floating-triangle');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Stagger animation for text blocks
        const textBlocks = document.querySelectorAll('.text-block');
        textBlocks.forEach((block, index) => {
            block.style.opacity = '0';
            block.style.transform = 'translateY(30px)';
            block.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            block.style.transitionDelay = `${index * 0.2}s`;
        });

        // Trigger text block animations when in view
        const textObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        textBlocks.forEach(block => {
            textObserver.observe(block);
        });
    }

    // Exhibition interactions
    setupExhibitions() {
        const exhibitionCards = document.querySelectorAll('.exhibition-card');
        
        exhibitionCards.forEach(card => {
            card.addEventListener('click', () => {
                const expoId = card.getAttribute('data-expo');
                this.openExhibition(expoId);
            });

            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
                const arrow = card.querySelector('.card-arrow');
                if (arrow) {
                    arrow.style.transform = 'translateX(12px) scale(1.2)';
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                const arrow = card.querySelector('.card-arrow');
                if (arrow) {
                    arrow.style.transform = 'translateX(0) scale(1)';
                }
            });
        });
    }

    openExhibition(expoId) {
        // Navigate to exhibition page
        const exhibitions = {
            'expo1': 'exhibitions/jockey-clube.html',
            'expo2': 'exhibitions/exposicao-exemplo.html'
        };
        
        if (exhibitions[expoId]) {
            window.location.href = exhibitions[expoId];
        }
    }

    createExhibitionModal(expoId) {
        const exhibitions = {
            'expo1': {
                title: 'Arte Contemporânea',
                description: 'Uma jornada através das expressões artísticas mais inovadoras da atualidade.',
                works: ['Obra 1', 'Obra 2', 'Obra 3', 'Obra 4', 'Obra 5', 'Obra 6']
            },
            'expo2': {
                title: 'Mestres Modernos',
                description: 'Celebrando os grandes nomes que definiram o modernismo artístico.',
                works: ['Obra A', 'Obra B', 'Obra C', 'Obra D', 'Obra E', 'Obra F']
            },
            'expo3': {
                title: 'Jovens Talentos',
                description: 'Descobrindo e promovendo a próxima geração de artistas visionários.',
                works: ['Obra X', 'Obra Y', 'Obra Z', 'Obra W', 'Obra V', 'Obra U']
            }
        };

        const expo = exhibitions[expoId];
        
        const modal = document.createElement('div');
        modal.className = 'exhibition-modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <h2>${expo.title}</h2>
                    <p>${expo.description}</p>
                </div>
                <div class="modal-gallery">
                    ${expo.works.map((work, index) => `
                        <div class="gallery-item" style="animation-delay: ${index * 0.1}s">
                            <div class="work-placeholder"></div>
                            <h4>${work}</h4>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Add modal styles
        if (!document.querySelector('#modal-styles')) {
            const modalStyles = document.createElement('style');
            modalStyles.id = 'modal-styles';
            modalStyles.textContent = `
                .exhibition-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 2000;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .exhibition-modal.active {
                    opacity: 1;
                    visibility: visible;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(10px);
                }
                
                .modal-content {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.9);
                    background: var(--white);
                    border-radius: 24px;
                    padding: 40px;
                    max-width: 1000px;
                    max-height: 80vh;
                    overflow-y: auto;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    width: 90vw;
                }
                
                .exhibition-modal.active .modal-content {
                    transform: translate(-50%, -50%) scale(1);
                }
                
                .modal-close {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                    transition: color 0.3s ease;
                }
                
                .modal-close:hover {
                    color: var(--primary-gold);
                }
                
                .modal-header h2 {
                    font-size: 2.5rem;
                    margin-bottom: 16px;
                    color: var(--text-primary);
                }
                
                .modal-header p {
                    font-size: 1.2rem;
                    color: var(--text-secondary);
                    margin-bottom: 40px;
                }
                
                .modal-gallery {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 24px;
                }
                
                .gallery-item {
                    text-align: center;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: slideInGallery 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
                }
                
                .work-placeholder {
                    width: 100%;
                    height: 150px;
                    background: linear-gradient(135deg, var(--primary-gold), var(--accent-copper));
                    border-radius: 12px;
                    margin-bottom: 12px;
                    transition: transform 0.3s ease;
                }
                
                .gallery-item:hover .work-placeholder {
                    transform: scale(1.05);
                }
                
                .gallery-item h4 {
                    font-size: 1rem;
                    color: var(--text-primary);
                }
                
                @keyframes slideInGallery {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(modalStyles);
        }

        // Close modal functionality
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 400);
        };

        closeBtn.addEventListener('click', closeModal);
        overlay.addEventListener('click', closeModal);

        return modal;
    }

    // Form handling
    setupForm() {
        const form = document.querySelector('.contact-form form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit(form);
            });
        }
    }

    handleFormSubmit(form) {
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        // Visual feedback
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Mensagem enviada com sucesso!', 'success');
            form.reset();
            submitBtn.textContent = 'Enviar Mensagem';
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles if not exists
        if (!document.querySelector('#notification-styles')) {
            const notificationStyles = document.createElement('style');
            notificationStyles.id = 'notification-styles';
            notificationStyles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 24px;
                    padding: 16px 24px;
                    background: var(--white);
                    border-radius: 12px;
                    box-shadow: var(--shadow-medium);
                    z-index: 3000;
                    transform: translateX(100%);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .notification-success {
                    border-left: 4px solid var(--primary-gold);
                }
                
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(notificationStyles);
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Mobile menu
    setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });

            // Close menu when clicking on links
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                });
            });
        }
    }

    // Interactive Mosaic Setup
    setupInteractiveMosaic() {
        const mosaicCard = document.querySelector('.mosaic-card');
        if (!mosaicCard) return;

        mosaicCard.addEventListener('click', () => {
            const exhibition = mosaicCard.dataset.exhibition;
            if (exhibition) {
                // Add click animation
                mosaicCard.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    // Navigate to exhibition page
                    window.location.href = `exhibitions/${exhibition}.html`;
                }, 150);
            }
        });

        // Add hover effects for tiles
        mosaicCard.addEventListener('mouseenter', () => {
            const tiles = mosaicCard.querySelectorAll('.preview-tile');
            tiles.forEach((tile, index) => {
                setTimeout(() => {
                    tile.style.transform = 'scale(1.1) rotate(3deg)';
                }, index * 50);
            });
        });

        mosaicCard.addEventListener('mouseleave', () => {
            const tiles = mosaicCard.querySelectorAll('.preview-tile');
            tiles.forEach(tile => {
                tile.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JCWebsite();
});

// Additional smooth interactions
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical elements
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease';
            hero.style.opacity = '1';
        }, 100);
    }

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth reveal for grid items
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '0.8';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
});
