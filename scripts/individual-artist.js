// Individual Artist Page JavaScript
class IndividualArtistPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupArtworkGallery();
        this.setupContactForm();
        this.setupScrollAnimations();
        this.setupArtworkModal();
    }

    setupArtworkGallery() {
        const artworkItems = document.querySelectorAll('.artwork-item');
        
        artworkItems.forEach((item, index) => {
            // Add click handler for artwork modal
            item.addEventListener('click', () => {
                this.openArtworkModal(item);
            });
            
            // Add hover effects
            item.addEventListener('mouseenter', () => {
                this.addArtworkHoverEffect(item);
            });
            
            item.addEventListener('mouseleave', () => {
                this.removeArtworkHoverEffect(item);
            });
            
            // Stagger animation
            item.style.animationDelay = `${index * 0.1}s`;
        });
    }

    addArtworkHoverEffect(item) {
        const image = item.querySelector('.artwork-image');
        const title = item.querySelector('h3');
        const price = item.querySelector('.artwork-price');
        
        if (image) {
            image.style.transform = 'scale(1.05)';
        }
        
        if (title) {
            title.style.color = 'var(--accent-cyan)';
        }
        
        if (price) {
            price.style.transform = 'scale(1.05)';
        }
    }

    removeArtworkHoverEffect(item) {
        const image = item.querySelector('.artwork-image');
        const title = item.querySelector('h3');
        const price = item.querySelector('.artwork-price');
        
        if (image) {
            image.style.transform = 'scale(1)';
        }
        
        if (title) {
            title.style.color = 'var(--text-primary)';
        }
        
        if (price) {
            price.style.transform = 'scale(1)';
        }
    }

    openArtworkModal(artworkItem) {
        const title = artworkItem.querySelector('h3').textContent;
        const details = artworkItem.querySelector('p').textContent;
        const year = artworkItem.querySelector('.artwork-year').textContent;
        const price = artworkItem.querySelector('.artwork-price').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'artwork-modal-overlay';
        modal.innerHTML = `
            <div class="artwork-modal">
                <div class="modal-close">&times;</div>
                <div class="modal-content">
                    <div class="modal-image">
                        <div class="modal-placeholder-artwork">${title}</div>
                    </div>
                    <div class="modal-info">
                        <h2>${title}</h2>
                        <p class="modal-details">${details}</p>
                        <p class="modal-year">${year}</p>
                        <p class="modal-price">${price}</p>
                        <div class="modal-actions">
                            <button class="inquiry-btn">Fazer Consulta</button>
                            <button class="share-btn">Compartilhar</button>
                        </div>
                        <div class="artwork-description">
                            <h3>Sobre a Obra</h3>
                            <p>Esta obra representa uma expressão única do estilo contemporâneo do artista, combinando técnicas tradicionais com elementos modernos para criar uma experiência visual impactante.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Style the modal
        this.styleArtworkModal(modal);
        
        // Add to page
        document.body.appendChild(modal);
        
        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.querySelector('.artwork-modal').style.transform = 'scale(1)';
        }, 10);
        
        // Setup close handlers
        this.setupModalCloseHandlers(modal);
        
        // Setup action handlers
        this.setupModalActionHandlers(modal, title);
    }

    styleArtworkModal(modal) {
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            padding: 20px;
        `;
        
        const modalContent = modal.querySelector('.artwork-modal');
        modalContent.style.cssText = `
            background: white;
            border-radius: 20px;
            max-width: 900px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            position: relative;
        `;
        
        const modalContentDiv = modal.querySelector('.modal-content');
        modalContentDiv.style.cssText = `
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
        `;
        
        const modalImage = modal.querySelector('.modal-image');
        modalImage.style.cssText = `
            height: 400px;
            background: linear-gradient(135deg, var(--primary-light), var(--text-light));
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 20px 0 0 20px;
        `;
        
        const modalInfo = modal.querySelector('.modal-info');
        modalInfo.style.cssText = `
            padding: 40px;
            display: flex;
            flex-direction: column;
        `;
        
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 25px;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #999;
            z-index: 1001;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        `;
    }

    setupModalCloseHandlers(modal) {
        const closeBtn = modal.querySelector('.modal-close');
        
        const closeModal = () => {
            modal.style.opacity = '0';
            modal.querySelector('.artwork-modal').style.transform = 'scale(0.9)';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        };
        
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }

    setupModalActionHandlers(modal, artworkTitle) {
        const inquiryBtn = modal.querySelector('.inquiry-btn');
        const shareBtn = modal.querySelector('.share-btn');
        
        if (inquiryBtn) {
            inquiryBtn.addEventListener('click', () => {
                this.handleInquiry(artworkTitle);
            });
        }
        
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.handleShare(artworkTitle);
            });
        }
    }

    handleInquiry(artworkTitle) {
        // Scroll to contact form and pre-fill artwork
        const modal = document.querySelector('.artwork-modal-overlay');
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
            }, 300);
        }
        
        // Scroll to contact form
        const contactSection = document.querySelector('.contact-artist');
        if (contactSection) {
            contactSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Pre-fill form
            setTimeout(() => {
                const select = document.querySelector('select');
                if (select) {
                    // Try to find matching option
                    const options = select.querySelectorAll('option');
                    for (let option of options) {
                        if (option.textContent.toLowerCase().includes(artworkTitle.toLowerCase().replace(/["']/g, ''))) {
                            select.value = option.value;
                            break;
                        }
                    }
                }
                
                const textarea = document.querySelector('textarea');
                if (textarea) {
                    textarea.value = `Olá! Tenho interesse na obra "${artworkTitle}". Gostaria de mais informações sobre disponibilidade e condições de compra.`;
                    textarea.focus();
                }
            }, 1000);
        }
    }

    handleShare(artworkTitle) {
        if (navigator.share) {
            navigator.share({
                title: artworkTitle,
                text: `Confira esta obra incrível: ${artworkTitle}`,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            const url = window.location.href;
            navigator.clipboard.writeText(`${artworkTitle} - ${url}`).then(() => {
                this.showNotification('Link copiado para a área de transferência!');
            });
        }
    }

    setupContactForm() {
        const form = document.querySelector('.contact-form');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove previous error styling
        field.style.borderColor = 'var(--border-light)';
        
        if (field.hasAttribute('required') && !value) {
            isValid = false;
        }
        
        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
        }
        
        if (!isValid) {
            field.style.borderColor = 'var(--accent-red)';
        }
        
        return isValid;
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate all fields
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showNotification('Por favor, corrija os campos destacados.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
            this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        }, 2000);
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

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.biography-text, .biography-highlights, .artwork-item, .contact-info, .contact-form-container');
        animateElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            element.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    }

    setupArtworkModal() {
        // Add CSS for modal elements that aren't in the main CSS
        const style = document.createElement('style');
        style.textContent = `
            .modal-placeholder-artwork {
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--white);
                background: var(--accent-cyan);
                padding: 30px 40px;
                border-radius: 15px;
                box-shadow: var(--shadow-soft);
            }
            
            .modal-info h2 {
                font-size: 2rem;
                font-weight: 700;
                color: var(--text-primary);
                margin-bottom: 16px;
            }
            
            .modal-details {
                color: var(--text-secondary);
                margin-bottom: 12px;
                font-size: 1.1rem;
            }
            
            .modal-year {
                color: var(--accent-cyan);
                font-weight: 600;
                margin-bottom: 8px;
            }
            
            .modal-price {
                color: var(--accent-red);
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 30px;
            }
            
            .modal-actions {
                display: flex;
                gap: 16px;
                margin-bottom: 30px;
            }
            
            .inquiry-btn, .share-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                flex: 1;
            }
            
            .inquiry-btn {
                background: var(--accent-cyan);
                color: white;
            }
            
            .inquiry-btn:hover {
                background: var(--accent-pink);
                transform: translateY(-2px);
            }
            
            .share-btn {
                background: var(--border-light);
                color: var(--text-primary);
            }
            
            .share-btn:hover {
                background: var(--text-light);
            }
            
            .artwork-description h3 {
                font-size: 1.2rem;
                font-weight: 600;
                color: var(--text-primary);
                margin-bottom: 12px;
            }
            
            .artwork-description p {
                color: var(--text-secondary);
                line-height: 1.6;
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    grid-template-columns: 1fr !important;
                }
                
                .modal-image {
                    border-radius: 20px 20px 0 0 !important;
                    height: 250px !important;
                }
                
                .modal-info {
                    padding: 30px 25px !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--accent-cyan)' : type === 'error' ? 'var(--accent-red)' : 'var(--primary-navy)'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: var(--shadow-medium);
            z-index: 1002;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            max-width: 350px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IndividualArtistPage();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IndividualArtistPage;
}
