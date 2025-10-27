// Planos Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for hero CTA
    const heroCtaButtons = document.querySelectorAll('.hero-cta a[href^="#"]');
    heroCtaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Plan cards hover effects
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Feature items animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Animate feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate benefit items
    const benefitItems = document.querySelectorAll('.benefit-item');
    benefitItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `all 0.8s ease ${index * 0.2}s`;
        observer.observe(item);
    });

    // Plan button click tracking (for analytics)
    const planButtons = document.querySelectorAll('.btn-plan');
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planType = this.classList.contains('btn-basic') ? 'Básico' :
                           this.classList.contains('btn-silver') ? 'Prata' :
                           this.classList.contains('btn-gold') ? 'Ouro' : 'Unknown';
            
            // You can add analytics tracking here
            console.log(`Plano selecionado: ${planType}`);
            
            // Add a subtle animation feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.documentElement.style.setProperty('--scroll-progress', scrollProgress + '%');
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Add parallax effect to hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Price animation on hover
    const priceValues = document.querySelectorAll('.price-value');
    priceValues.forEach(price => {
        const originalText = price.textContent;
        
        price.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.color = 'var(--accent-cyan)';
        });
        
        price.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = 'var(--primary-navy)';
        });
    });

    // Add loading animation to plan cards
    planCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.8s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 200));
    });

    // WhatsApp integration helper
    function createWhatsAppLink(planType) {
        const phoneNumber = '5511999999999'; // Replace with actual phone number
        const message = encodeURIComponent(`Olá! Tenho interesse no ${planType} do JC Arte & Capital. Gostaria de mais informações.`);
        return `https://wa.me/${phoneNumber}?text=${message}`;
    }

    // Add WhatsApp quick access
    const quickWhatsApp = document.createElement('div');
    quickWhatsApp.className = 'whatsapp-float';
    quickWhatsApp.innerHTML = `
        <a href="${createWhatsAppLink('Plano')}" target="_blank" title="Falar no WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
    `;
    document.body.appendChild(quickWhatsApp);

    // Add CSS for WhatsApp float button
    const whatsappStyle = document.createElement('style');
    whatsappStyle.textContent = `
        .whatsapp-float {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 1000;
        }
        
        .whatsapp-float a {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #25d366, #128c7e);
            color: white;
            border-radius: 50%;
            font-size: 1.8rem;
            text-decoration: none;
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        
        .whatsapp-float a:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 35px rgba(37, 211, 102, 0.6);
        }
        
        @keyframes pulse {
            0% { box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4); }
            50% { box-shadow: 0 8px 25px rgba(37, 211, 102, 0.6); }
            100% { box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4); }
        }
        
        @media (max-width: 768px) {
            .whatsapp-float {
                bottom: 1rem;
                right: 1rem;
            }
            
            .whatsapp-float a {
                width: 50px;
                height: 50px;
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(whatsappStyle);

    // Add scroll-to-top functionality
    const scrollToTop = document.createElement('div');
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.body.appendChild(scrollToTop);

    // Show/hide scroll-to-top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTop.classList.add('visible');
        } else {
            scrollToTop.classList.remove('visible');
        }
    });

    // Add CSS for scroll-to-top button
    const scrollTopStyle = document.createElement('style');
    scrollTopStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            left: 2rem;
            width: 50px;
            height: 50px;
            background: var(--primary-navy);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(31, 41, 88, 0.3);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .scroll-to-top:hover {
            background: var(--accent-cyan);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(38, 187, 190, 0.4);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 8rem;
                left: 1rem;
                width: 45px;
                height: 45px;
            }
        }
    `;
    document.head.appendChild(scrollTopStyle);
});

// Utility function to format currency
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Function to calculate installment values
function calculateInstallments(totalValue, installments = 12) {
    const installmentValue = totalValue / installments;
    return {
        total: formatCurrency(totalValue),
        installment: formatCurrency(installmentValue),
        installments: installments
    };
}
