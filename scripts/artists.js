// Artists Page JavaScript
class ArtistsPage {
    constructor() {
        this.currentFilter = 'todos';
        this.init();
    }

    init() {
        this.setupFilterButtons();
        this.setupArtistCards();
        this.setupScrollAnimations();
        
        // Show all artists by default
        this.filterArtists('todos');
    }

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get filter category
                const category = button.dataset.category;
                this.filterArtists(category);
            });
        });
    }

    filterArtists(category) {
        this.currentFilter = category;
        const sections = document.querySelectorAll('.category-section');
        
        // Add fade out effect
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });
        
        setTimeout(() => {
            sections.forEach(section => {
                if (category === 'todos') {
                    section.classList.remove('hidden');
                } else {
                    if (section.dataset.category === category) {
                        section.classList.remove('hidden');
                    } else {
                        section.classList.add('hidden');
                    }
                }
            });
            
            // Fade in visible sections
            const visibleSections = document.querySelectorAll('.category-section:not(.hidden)');
            visibleSections.forEach((section, index) => {
                setTimeout(() => {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, index * 100);
            });
            
            // Re-animate artist cards
            this.animateArtistCards();
        }, 150);
    }

    setupArtistCards() {
        const artistCards = document.querySelectorAll('.artist-card');
        
        artistCards.forEach((card, index) => {
            // Add click handler for navigation to individual artist page
            card.addEventListener('click', () => {
                const artistName = card.querySelector('h3').textContent;
                const artistSlug = this.createSlug(artistName);
                
                // For now, we'll show an alert - later we'll navigate to individual pages
                this.showArtistModal(artistName);
            });
            
            // Add hover effects
            card.addEventListener('mouseenter', () => {
                this.addCardHoverEffect(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.removeCardHoverEffect(card);
            });
        });
    }

    createSlug(name) {
        return name
            .toLowerCase()
            .replace(/[àáâãäå]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[ñ]/g, 'n')
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    }

    showArtistModal(artistName) {
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'artist-modal-overlay';
        modal.innerHTML = `
            <div class="artist-modal">
                <div class="modal-header">
                    <h2>${artistName}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    <p>Página individual do artista será criada em breve!</p>
                    <p>Aqui você encontrará:</p>
                    <ul>
                        <li>Biografia completa</li>
                        <li>Galeria de obras</li>
                        <li>Informações de contato</li>
                        <li>Preços e disponibilidade</li>
                    </ul>
                </div>
            </div>
        `;
        
        // Add modal styles
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        const modalContent = modal.querySelector('.artist-modal');
        modalContent.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 40px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;
        
        const modalHeader = modal.querySelector('.modal-header');
        modalHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
        `;
        
        const closeButton = modal.querySelector('.modal-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
            transition: color 0.2s ease;
        `;
        
        // Add to page
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modalContent.style.transform = 'scale(1)';
        }, 10);
        
        // Close handlers
        const closeModal = () => {
            modal.style.opacity = '0';
            modalContent.style.transform = 'scale(0.9)';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };
        
        closeButton.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    addCardHoverEffect(card) {
        const image = card.querySelector('.artist-image');
        const info = card.querySelector('.artist-info');
        
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
        
        if (info) {
            const title = info.querySelector('h3');
            if (title) {
                title.style.color = 'var(--accent-cyan)';
            }
        }
    }

    removeCardHoverEffect(card) {
        const image = card.querySelector('.artist-image');
        const info = card.querySelector('.artist-info');
        
        if (image) {
            image.style.transform = 'scale(1)';
        }
        
        if (info) {
            const title = info.querySelector('h3');
            if (title) {
                title.style.color = 'var(--text-primary)';
            }
        }
    }

    animateArtistCards() {
        const visibleCards = document.querySelectorAll('.category-section:not(.hidden) .artist-card');
        
        visibleCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe category titles
        const categoryTitles = document.querySelectorAll('.category-title');
        categoryTitles.forEach(title => {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            title.style.transition = 'all 0.6s ease';
            observer.observe(title);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ArtistsPage();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ArtistsPage;
}
