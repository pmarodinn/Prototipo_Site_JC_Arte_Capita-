// Curator Page JavaScript

class CuratorPage {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupTimelineAnimations();
        this.setupHighlightCounters();
        this.setupPhilosophyCards();
        this.setupPublicationHovers();
    }

    setupScrollAnimations() {
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
        const animateElements = document.querySelectorAll(
            '.biography-text p, .philosophy-card, .publication-item, .credential-item, .award-item'
        );
        
        animateElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            observer.observe(el);
        });

        // Add CSS for animation state
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

    setupTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Alternate animation directions
            if (index % 2 === 0) {
                item.style.transform = 'translateX(-50px)';
            } else {
                item.style.transform = 'translateX(50px)';
            }
            
            timelineObserver.observe(item);
        });
    }

    setupHighlightCounters() {
        const highlightNumbers = document.querySelectorAll('.highlight-number');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        highlightNumbers.forEach(number => {
            counterObserver.observe(number);
        });
    }

    animateCounter(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/\d/g, '');
        
        let current = 0;
        const increment = number / 60; // 60 frames for 1 second at 60fps
        const duration = 2000; // 2 seconds
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            current = Math.floor(number * this.easeOutCubic(progress));
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = text; // Ensure final value is correct
            }
        };

        requestAnimationFrame(animate);
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    setupPhilosophyCards() {
        const philosophyCards = document.querySelectorAll('.philosophy-card');
        
        philosophyCards.forEach((card, index) => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-12px) scale(1.02)';
                
                // Add subtle glow effect
                card.style.boxShadow = `
                    0 20px 40px rgba(0, 0, 0, 0.15),
                    0 0 0 1px rgba(212, 175, 55, 0.1)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'var(--shadow-soft)';
            });

            // Stagger entrance animation
            card.style.animationDelay = `${index * 0.2}s`;
        });
    }

    setupPublicationHovers() {
        const publicationItems = document.querySelectorAll('.publication-item');
        
        publicationItems.forEach(item => {
            const publicationType = item.querySelector('.publication-type');
            
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-8px) scale(1.02)';
                publicationType.style.background = 'var(--accent-copper)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
                publicationType.style.background = 'var(--primary-gold)';
            });
        });
    }
}

// Enhanced quote animation
class QuoteAnimation {
    constructor() {
        this.setupQuoteReveal();
    }

    setupQuoteReveal() {
        const quote = document.querySelector('.curator-quote p');
        const cite = document.querySelector('.curator-quote cite');
        
        if (!quote || !cite) return;

        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateQuoteText(quote);
                    setTimeout(() => {
                        cite.style.opacity = '1';
                        cite.style.transform = 'translateY(0)';
                    }, 1500);
                    quoteObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        // Initial state
        cite.style.opacity = '0';
        cite.style.transform = 'translateY(20px)';
        cite.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

        quoteObserver.observe(quote);
    }

    animateQuoteText(element) {
        const text = element.textContent;
        const words = text.split(' ');
        
        element.innerHTML = words.map(word => 
            `<span class="quote-word" style="opacity: 0; transform: translateY(20px);">${word}</span>`
        ).join(' ');

        const wordElements = element.querySelectorAll('.quote-word');
        
        wordElements.forEach((word, index) => {
            setTimeout(() => {
                word.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Timeline enhanced interactions
class TimelineEnhancer {
    constructor() {
        this.setupTimelineHovers();
        this.setupTimelineProgress();
    }

    setupTimelineHovers() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            const content = item.querySelector('.timeline-content');
            const year = item.querySelector('.timeline-year');
            
            item.addEventListener('mouseenter', () => {
                content.style.transform = 'scale(1.05)';
                year.style.transform = 'scale(1.1)';
                year.style.background = 'var(--accent-copper)';
            });

            item.addEventListener('mouseleave', () => {
                content.style.transform = 'scale(1)';
                year.style.transform = 'scale(1)';
                year.style.background = 'var(--primary-gold)';
            });
        });
    }

    setupTimelineProgress() {
        const timeline = document.querySelector('.exhibitions-timeline');
        if (!timeline) return;

        const timelineProgress = document.createElement('div');
        timelineProgress.className = 'timeline-progress';
        timelineProgress.style.cssText = `
            position: absolute;
            left: 50%;
            top: 0;
            width: 4px;
            background: var(--accent-copper);
            transform: translateX(-50%);
            height: 0%;
            transition: height 0.3s ease;
            z-index: 1;
        `;
        
        timeline.appendChild(timelineProgress);

        const updateProgress = () => {
            const timelineRect = timeline.getBoundingClientRect();
            const timelineTop = timelineRect.top + window.pageYOffset;
            const timelineHeight = timeline.offsetHeight;
            const scrollProgress = Math.max(0, window.pageYOffset - timelineTop);
            const progressPercentage = Math.min(100, (scrollProgress / timelineHeight) * 100);
            
            timelineProgress.style.height = `${progressPercentage}%`;
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }
}

// Parallax effects for hero section
class HeroParallax {
    constructor() {
        this.setupParallax();
    }

    setupParallax() {
        const heroImage = document.querySelector('.hero-image');
        const floatingQuote = document.querySelector('.floating-quote');
        
        if (!heroImage || !floatingQuote) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroImage.style.transform = `translateY(${rate}px)`;
            floatingQuote.style.transform = `translateY(${rate * 0.3}px)`;
        });
    }
}

// Contact section enhancement
class ContactEnhancer {
    constructor() {
        this.setupContactAnimations();
    }

    setupContactAnimations() {
        const contactButtons = document.querySelectorAll('.contact-actions .btn');
        
        contactButtons.forEach((btn, index) => {
            btn.style.opacity = '0';
            btn.style.transform = 'translateY(20px)';
            btn.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        btn.style.opacity = '1';
                        btn.style.transform = 'translateY(0)';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(btn);
        });
    }
}

// Initialize all classes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CuratorPage();
    new QuoteAnimation();
    new TimelineEnhancer();
    new HeroParallax();
    new ContactEnhancer();
    
    // Add smooth scrolling for internal links
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
window.CuratorPage = CuratorPage;
