// ===== ULTRA-SLEEK JOSH ROBINSON WEBSITE INTERACTIONS =====

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupFormHandling();
    setupInteractiveElements();
    setupPerformanceOptimizations();
    
    console.log('🚀 Josh Robinson website loaded successfully!');
    console.log('✨ Ultra-sleek student empowerment hub ready');
}

// ===== NAVIGATION SYSTEM =====
function setupNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect with smooth transitions
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 2px 20px rgba(10, 29, 63, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle with smooth animations
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger with smooth transitions
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Smooth scrolling for navigation links with enhanced UX
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 80;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Enhanced smooth scroll with easing
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Track navigation click
                trackEvent('navigation_click', 'engagement', targetId);
            }
        });
    });
    
    // Active section highlighting with smooth transitions
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL EFFECTS AND ANIMATIONS =====
function setupScrollEffects() {
    createScrollProgress();
    setupParallaxEffects();
    setupScrollToTop();
    initializeIntersectionObserver();
    setupStaggeredAnimations();
}

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #F5B700, #0A1D3F);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
}

function setupParallaxEffects() {
    const heroSection = document.querySelector('.hero');
    const heroParticles = document.querySelector('.hero-particles');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled < window.innerHeight && heroParticles) {
            heroParticles.style.transform = `translateY(${rate * 0.3}px)`;
        }
        
        // Enhanced parallax for hero image with smoother transitions
        const heroImage = document.querySelector('.hero-image-container');
        if (heroImage && scrolled < window.innerHeight) {
            heroImage.style.transform = `translateY(${scrolled * 0.2}px) rotate(2deg)`;
        }
    });
}

function setupScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #F5B700, #0A1D3F);
        color: #FFFFFF;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(245, 183, 0, 0.3);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        transform: scale(0);
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        trackEvent('scroll_to_top', 'navigation', 'button_click');
    });
    
    scrollTopBtn.addEventListener('mouseenter', () => {
        scrollTopBtn.style.transform = window.pageYOffset > 300 ? 'scale(1.1)' : 'scale(0)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', () => {
        scrollTopBtn.style.transform = window.pageYOffset > 300 ? 'scale(1)' : 'scale(0)';
    });
    
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.transform = 'scale(1)';
        } else {
            scrollTopBtn.style.transform = 'scale(0)';
        }
    });
}

function setupStaggeredAnimations() {
    // Staggered animation for credential items
    const credentialItems = document.querySelectorAll('.credentials-list li');
    credentialItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(20px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(item);
    });
}

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay with enhanced timing
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
                
                // Special animations for specific elements
                if (entry.target.classList.contains('service-card')) {
                    entry.target.style.animationDelay = `${index * 0.3}s`;
                }
                
                if (entry.target.classList.contains('interest-card')) {
                    entry.target.style.animationDelay = `${index * 0.2}s`;
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation with enhanced selection
    const animateElements = document.querySelectorAll(`
        .hero-text,
        .about-text,
        .service-card,
        .interest-card,
        .partner-item,
        .contact-form-container,
        .contact-info,
        .credential-category
    `);
    
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// ===== INTERACTIVE ANIMATIONS =====
function setupAnimations() {
    setupHoverEffects();
    setupCountUpAnimations();
    setupTypingEffect();
    setupMorphingAnimations();
}

function setupHoverEffects() {
    // Enhanced service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'rotate(5deg) scale(1.1)';
            }
            
            // Add subtle glow effect
            this.style.boxShadow = '0 20px 60px rgba(10, 29, 63, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.service-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
            
            this.style.boxShadow = '';
        });
    });
    
    // Enhanced interest card hover effects
    const interestCards = document.querySelectorAll('.interest-card');
    interestCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            
            const icon = this.querySelector('.interest-icon');
            if (icon) {
                icon.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const icon = this.querySelector('.interest-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg) scale(1)';
            }
        });
    });
    
    // Enhanced partner logo hover effects
    const partnerItems = document.querySelectorAll('.partner-item');
    partnerItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function setupMorphingAnimations() {
    // Morphing background effect for hero section
    const heroBackground = document.querySelector('.hero-particles');
    if (heroBackground) {
        let time = 0;
        function animate() {
            time += 0.01;
            heroBackground.style.backgroundImage = `
                radial-gradient(circle at ${20 + Math.sin(time) * 10}% ${80 + Math.cos(time) * 10}%, #F5B700 0%, transparent 50%),
                radial-gradient(circle at ${80 + Math.sin(time * 0.5) * 10}% ${20 + Math.cos(time * 0.5) * 10}%, rgba(245, 183, 0, 0.3) 0%, transparent 50%),
                radial-gradient(circle at ${40 + Math.sin(time * 0.3) * 10}% ${40 + Math.cos(time * 0.3) * 10}%, #F5B700 0%, transparent 50%)
            `;
            requestAnimationFrame(animate);
        }
        animate();
    }
}

function setupCountUpAnimations() {
    window.animateCountUp = function(element) {
        const numberElement = element.querySelector('h4');
        if (!numberElement) return;
        
        const targetText = numberElement.textContent;
        const targetNumber = parseInt(targetText.replace(/\D/g, ''));
        const suffix = targetText.replace(/[\d.]/g, '');
        
        if (isNaN(targetNumber)) return;
        
        let currentNumber = 0;
        const increment = targetNumber / 60;
        const duration = 2500;
        const stepTime = duration / 60;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(timer);
            }
            
            numberElement.textContent = Math.floor(currentNumber) + suffix;
        }, stepTime);
    };
}

function setupTypingEffect() {
    const titleHighlight = document.querySelector('.title-highlight');
    if (!titleHighlight) return;
    
    const phrases = [
        'on their own terms',
        'with confidence',
        'beyond expectations',
        'with purpose'
    ];
    
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const current = phrases[currentPhrase];
        
        if (isDeleting) {
            titleHighlight.textContent = current.substring(0, currentChar - 1);
            currentChar--;
        } else {
            titleHighlight.textContent = current.substring(0, currentChar + 1);
            currentChar++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentChar === current.length) {
            typeSpeed = 3000;
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
        }
        
        setTimeout(typeEffect, typeSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeEffect, 4000);
}

// ===== FORM HANDLING =====
function setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm?.querySelector('.submit-button');
    
    if (!contactForm || !submitButton) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            service: formData.get('service'),
            message: formData.get('message')
        };
        
        // Enhanced validation
        if (!validateForm(data)) return;
        
        // Show loading state with enhanced animation
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        // Simulate form submission with enhanced UX
        setTimeout(() => {
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            
            showSuccessModal();
            trackEvent('form_submit', 'conversion', data.service);
        }, 2500);
    });
    
    // Real-time validation with enhanced feedback
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateForm(data) {
    let isValid = true;
    
    if (!data.name || data.name.length < 2) {
        showFieldError('name', 'Please enter your full name');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!data.service) {
        showFieldError('service', 'Please select a service');
        isValid = false;
    }
    
    if (!data.message || data.message.length < 10) {
        showFieldError('message', 'Please provide more details about your goals');
        isValid = false;
    }
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    switch (field.name) {
        case 'name':
            if (!value || value.length < 2) {
                errorMessage = 'Please enter your full name';
                isValid = false;
            }
            break;
        case 'email':
            if (!value || !isValidEmail(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
        case 'service':
            if (!value) {
                errorMessage = 'Please select a service';
                isValid = false;
            }
            break;
        case 'message':
            if (!value || value.length < 10) {
                errorMessage = 'Please provide more details about your goals';
                isValid = false;
            }
            break;
    }
    
    if (isValid) {
        clearFieldError(field.name);
    } else {
        showFieldError(field.name, errorMessage);
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const existingError = field.parentNode.querySelector('.error-message');
    
    field.classList.add('error');
    field.style.borderColor = '#ef4444';
    
    if (!existingError) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            font-family: 'Roboto Mono', monospace;
        `;
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    } else {
        existingError.textContent = message;
    }
}

function clearFieldError(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = field.parentNode.querySelector('.error-message');
    
    field.classList.remove('error');
    field.style.borderColor = '';
    
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== MODAL SYSTEM =====
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (!modal) return;
    
    modal.classList.remove('hidden');
    modal.style.display = 'flex';
    
    setTimeout(() => {
        const modalContent = modal.querySelector('.modal-content');
        modalContent.classList.add('scale-100');
    }, 10);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        closeSuccessModal();
    }, 10000);
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.classList.remove('scale-100');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }, 300);
}

// ===== INTERACTIVE ELEMENTS =====
function setupInteractiveElements() {
    setupCTATracking();
    setupServiceCardInteractions();
    setupKeyboardNavigation();
    setupEnhancedHoverEffects();
}

function setupCTATracking() {
    const ctaButtons = document.querySelectorAll('[href="#contact"], .cta-primary, .cta-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const buttonType = this.classList.contains('cta-primary') ? 'primary' : 'secondary';
            trackEvent('cta_click', 'conversion', `${buttonType}_${buttonText}`);
        });
    });
}

function setupServiceCardInteractions() {
    const serviceButtons = document.querySelectorAll('.service-button');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const serviceCard = this.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('.service-title').textContent;
            
            // Pre-fill contact form
            const serviceSelect = document.getElementById('service');
            if (serviceSelect) {
                const optionMap = {
                    '1:1 Tutoring & Mentoring': 'tutoring',
                    'School Workshops': 'workshop',
                    'Speaking & Events': 'speaking',
                    'Content & Strategy': 'content'
                };
                
                serviceSelect.value = optionMap[serviceTitle] || 'other';
            }
            
            // Scroll to contact form with enhanced animation
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            trackEvent('service_selection', 'engagement', serviceTitle);
        });
    });
}

function setupEnhancedHoverEffects() {
    // Enhanced hover effects for section tags
    const sectionTags = document.querySelectorAll('.section-tag');
    sectionTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Enhanced hover effects for credential items
    const credentialItems = document.querySelectorAll('.credentials-list li');
    credentialItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

function setupKeyboardNavigation() {
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSuccessModal();
            
            // Close mobile menu
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
    
    // Focus management for accessibility
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.getElementById('successModal');
    
    if (modal) {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusable = modal.querySelectorAll(focusableElements);
                const firstFocusable = focusable[0];
                const lastFocusable = focusable[focusable.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }
}

// ===== PERFORMANCE OPTIMIZATIONS =====
function setupPerformanceOptimizations() {
    setupLazyLoading();
    setupImageOptimization();
    setupPreloading();
    setupSmoothScrolling();
}

function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

function setupImageOptimization() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Add loading state
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
}

function setupPreloading() {
    // Preload critical assets
    const criticalAssets = [
        'assets/graduation-photo.jpg',
        'assets/professional-portrait.jpg',
        // Add more critical assets here
    ];
    
    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = asset;
        document.head.appendChild(link);
    });
}

function setupSmoothScrolling() {
    // Enhanced smooth scrolling for all internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = 80;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== ANALYTICS AND TRACKING =====
function trackEvent(action, category, label) {
    console.log(`📊 Event: ${action} | Category: ${category} | Label: ${label}`);
    
    // Google Analytics 4 tracking (uncomment when ready)
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         event_category: category,
    //         event_label: label,
    //         value: 1
    //     });
    // }
    
    // Facebook Pixel tracking (uncomment when ready)
    // if (typeof fbq !== 'undefined') {
    //     fbq('track', 'CustomEvent', {
    //         action: action,
    //         category: category,
    //         label: label
    //     });
    // }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== GLOBAL FUNCTIONS (for modal) =====
window.closeSuccessModal = closeSuccessModal;

// ===== INITIALIZE ON LOAD =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}