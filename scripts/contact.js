// Contact Page JavaScript

class ContactPage {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.setupFormSubmission();
        this.setupSocialCardAnimations();
    }

    setupFormValidation() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearErrors(input));
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove previous validation classes
        formGroup.classList.remove('error', 'success');
        this.removeErrorMessage(formGroup);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo é obrigatório.';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, insira um email válido.';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                isValid = false;
                errorMessage = 'Por favor, insira um telefone válido.';
            }
        }

        // Name validation
        if ((field.name === 'firstName' || field.name === 'lastName') && value) {
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Nome deve ter pelo menos 2 caracteres.';
            }
        }

        // Message validation
        if (field.name === 'message' && value) {
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Mensagem deve ter pelo menos 10 caracteres.';
            }
        }

        if (isValid && value) {
            formGroup.classList.add('success');
        } else if (!isValid) {
            formGroup.classList.add('error');
            this.showErrorMessage(formGroup, errorMessage);
        }

        return isValid;
    }

    clearErrors(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        this.removeErrorMessage(formGroup);
    }

    showErrorMessage(formGroup, message) {
        this.removeErrorMessage(formGroup);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }

    removeErrorMessage(formGroup) {
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    setupFormSubmission() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    }

    async handleFormSubmit() {
        const inputs = this.form.querySelectorAll('input, select, textarea');
        let isFormValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        const submitBtn = this.form.querySelector('.submit-btn');
        const formData = new FormData(this.form);

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.submitForm(formData);
            
            // Show success message
            this.showSuccessForm();
            this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            
        } catch (error) {
            console.error('Erro ao enviar formulário:', error);
            this.showNotification('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    }

    async submitForm(formData) {
        // Send to FormSubmit service
        try {
            const response = await fetch('https://formsubmit.co/edson@jcartecapital.com.br', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    message: formData.get('message'),
                    _subject: 'Novo contato do site JC Arte Capital',
                    _captcha: 'false'
                })
            });

            if (response.ok) {
                return { success: true };
            } else {
                throw new Error('Falha no envio');
            }
        } catch (error) {
            throw new Error('Erro de conexão: ' + error.message);
        }
    }

    showSuccessForm() {
        const formContainer = this.form.parentElement;
        const successHtml = `
            <div class="form-success">
                <h3>✓ Mensagem Enviada!</h3>
                <p>Obrigado pelo seu interesse. Nossa equipe entrará em contato em até 24 horas.</p>
                <button onclick="location.reload()" class="btn btn-secondary" style="margin-top: 20px;">
                    Enviar Nova Mensagem
                </button>
            </div>
        `;
        
        formContainer.innerHTML = successHtml;
    }



    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    setupSocialCardAnimations() {
        const socialCards = document.querySelectorAll('.social-card');
        
        socialCards.forEach((card, index) => {
            // Stagger animation on scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, index * 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            observer.observe(card);

            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles if not exists
        if (!document.querySelector('#contact-notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'contact-notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 24px;
                    max-width: 400px;
                    z-index: 4000;
                    transform: translateX(100%);
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification-content {
                    background: var(--white);
                    border-radius: 12px;
                    padding: 16px 20px;
                    box-shadow: var(--shadow-medium);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                }
                
                .notification-success .notification-content {
                    border-left: 4px solid #27ae60;
                    background: #d4edda;
                    color: #155724;
                }
                
                .notification-error .notification-content {
                    border-left: 4px solid #e74c3c;
                    background: #f8d7da;
                    color: #721c24;
                }
                
                .notification-message {
                    flex: 1;
                    font-size: 0.875rem;
                    line-height: 1.4;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.25rem;
                    cursor: pointer;
                    color: inherit;
                    opacity: 0.7;
                    transition: opacity 0.2s ease;
                }
                
                .notification-close:hover {
                    opacity: 1;
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
}

// Contact form enhancements
class ContactFormEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.setupPhoneFormatting();
        this.setupCharacterCounters();
        this.setupFormProgress();
    }

    setupPhoneFormatting() {
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length >= 11) {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 7) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                }
                
                e.target.value = value;
            });
        }
    }

    setupCharacterCounters() {
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            const maxLength = 500;
            const counter = document.createElement('div');
            counter.className = 'character-counter';
            counter.style.cssText = `
                font-size: 0.75rem;
                color: var(--text-light);
                text-align: right;
                margin-top: 4px;
            `;
            
            messageTextarea.parentNode.appendChild(counter);
            
            const updateCounter = () => {
                const currentLength = messageTextarea.value.length;
                counter.textContent = `${currentLength}/${maxLength} caracteres`;
                
                if (currentLength > maxLength * 0.9) {
                    counter.style.color = '#e74c3c';
                } else {
                    counter.style.color = 'var(--text-light)';
                }
            };
            
            messageTextarea.addEventListener('input', updateCounter);
            updateCounter();
        }
    }

    setupFormProgress() {
        const form = document.getElementById('contactForm');
        const requiredFields = form.querySelectorAll('[required]');
        
        // Create progress indicator
        const progressContainer = document.createElement('div');
        progressContainer.className = 'form-progress';
        progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <span class="progress-text">0% completo</span>
        `;
        
        // Add styles
        if (!document.querySelector('#form-progress-styles')) {
            const styles = document.createElement('style');
            styles.id = 'form-progress-styles';
            styles.textContent = `
                .form-progress {
                    margin-bottom: 24px;
                    text-align: center;
                }
                
                .progress-bar {
                    width: 100%;
                    height: 4px;
                    background: var(--border-light);
                    border-radius: 2px;
                    overflow: hidden;
                    margin-bottom: 8px;
                }
                
                .progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, var(--primary-gold), var(--accent-copper));
                    width: 0%;
                    transition: width 0.3s ease;
                }
                
                .progress-text {
                    font-size: 0.75rem;
                    color: var(--text-light);
                    font-weight: 500;
                }
            `;
            document.head.appendChild(styles);
        }
        
        form.insertBefore(progressContainer, form.firstChild);
        
        const updateProgress = () => {
            let filledFields = 0;
            requiredFields.forEach(field => {
                if (field.value.trim()) {
                    filledFields++;
                }
            });
            
            const percentage = (filledFields / requiredFields.length) * 100;
            const progressFill = progressContainer.querySelector('.progress-fill');
            const progressText = progressContainer.querySelector('.progress-text');
            
            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${Math.round(percentage)}% completo`;
        };
        
        requiredFields.forEach(field => {
            field.addEventListener('input', updateProgress);
        });
        
        updateProgress();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactPage();
    new ContactFormEnhancements();
});

// Export for use in other scripts
window.ContactPage = ContactPage;
