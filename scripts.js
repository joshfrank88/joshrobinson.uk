// ===== ULTRA-MODERN JOSH ROBINSON WEBSITE - OPTIMIZED =====

console.log('🚀 Ultra-modern Josh Robinson website loaded with optimized performance');

// ===== DOM ELEMENTS =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');

// ===== NAVBAR SCROLL EFFECT - OPTIMIZED =====
let lastScrollY = window.scrollY;

function handleNavbarScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(30px)';
        navbar.style.boxShadow = '0 4px 20px rgba(10, 29, 63, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(30px)';
        navbar.style.boxShadow = '0 1px 3px rgba(10, 29, 63, 0.1)';
    }
    
    lastScrollY = currentScrollY;
}

// Throttled scroll handler for better performance
let ticking = false;
function throttledScrollHandler() {
    if (!ticking) {
        requestAnimationFrame(() => {
            handleNavbarScroll();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', throttledScrollHandler);

// ===== MOBILE MENU TOGGLE - OPTIMIZED =====
function toggleMobileMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans.forEach((span, index) => {
        if (hamburger.classList.contains('active')) {
            if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) span.style.opacity = '0';
            if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            span.style.transform = 'none';
            span.style.opacity = '1';
        }
    });
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans.forEach(span => {
            span.style.transform = 'none';
            span.style.opacity = '1';
        });
    });
});

// ===== SMOOTH SCROLLING - OPTIMIZED =====
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

setupSmoothScrolling();

// ===== SCROLL PROGRESS BAR =====
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
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
    
    return progressBar;
}

const progressBar = createScrollProgressBar();

function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===== PARALLAX EFFECT - OPTIMIZED =====
function setupParallaxEffect() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px) rotate(3deg)`;
    }
    
    let ticking = false;
    function throttledParallax() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', throttledParallax);
}

setupParallaxEffect();

// ===== SCROLL-TO-TOP BUTTON =====
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-chevron-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #F5B700, #0A1D3F);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 20px rgba(10, 29, 63, 0.3);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    return button;
}

const scrollToTopButton = createScrollToTopButton();

function toggleScrollToTopButton() {
    if (window.pageYOffset > 500) {
        scrollToTopButton.style.opacity = '1';
        scrollToTopButton.style.visibility = 'visible';
    } else {
        scrollToTopButton.style.opacity = '0';
        scrollToTopButton.style.visibility = 'hidden';
    }
}

window.addEventListener('scroll', toggleScrollToTopButton);

// ===== STAGGERED ANIMATIONS - OPTIMIZED =====
function setupStaggeredAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100); // Reduced delay for better performance
            }
        });
    }, observerOptions);
    
    // Observe elements that need staggered animations
    const elementsToObserve = [
        ...document.querySelectorAll('.credentials-list li'),
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.partner-item'),
        ...document.querySelectorAll('.credential-category')
    ];
    
    elementsToObserve.forEach(el => observer.observe(el));
}

setupStaggeredAnimations();

// ===== INTERSECTION OBSERVER - OPTIMIZED =====
function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150);
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.hero-text, .hero-visual, .about-text, .about-visual, .credentials-grid, .services-grid, .partners-grid, .contact-content');
    animatedElements.forEach(el => observer.observe(el));
}

setupIntersectionObserver();

// ===== HOVER EFFECTS - OPTIMIZED =====
function setupHoverEffects() {
    // Service card hover effects
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 15px 40px rgba(10, 29, 63, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 4px 20px rgba(10, 29, 63, 0.15)';
        });
    });
    
    // Partner item hover effects
    document.querySelectorAll('.partner-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            const logo = item.querySelector('.partner-logo');
            if (logo) logo.style.transform = 'scale(1.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            const logo = item.querySelector('.partner-logo');
            if (logo) logo.style.transform = 'scale(1)';
        });
    });
}

setupHoverEffects();

// ===== ENHANCED HOVER EFFECTS =====
function setupEnhancedHoverEffects() {
    // Section badge hover effects
    document.querySelectorAll('.section-badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateY(-2px)';
            badge.style.boxShadow = '0 8px 25px rgba(245, 183, 0, 0.3)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateY(0)';
            badge.style.boxShadow = 'none';
        });
    });
    
    // Credentials list hover effects
    document.querySelectorAll('.credentials-list li').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
            item.style.background = 'rgba(255, 255, 255, 0.08)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.background = 'transparent';
        });
    });
}

setupEnhancedHoverEffects();

// ===== COUNT-UP ANIMATIONS - OPTIMIZED =====
function animateCountUp(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const stepTime = 16;
    
    function updateCount() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            setTimeout(updateCount, stepTime);
        } else {
            element.textContent = target;
        }
    }
    
    updateCount();
}

// ===== TYPING ANIMATION - OPTIMIZED =====
function setupTypingAnimation() {
    const phrases = [
        "on their own terms",
        "with confidence",
        "beyond expectations",
        "with purpose"
    ];
    
    const typingElement = document.querySelector('.title-highlight');
    if (!typingElement) return;
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseTime = 2000;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? deleteSpeed : typeSpeed;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    }
    
    // Start typing animation after initial load
    setTimeout(type, 3000);
}

setupTypingAnimation();

// ===== CONTACT FORM HANDLING - OPTIMIZED =====
function setupContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Success state
            submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitButton.style.background = '#28a745';
            
            // Show success modal
            setTimeout(() => {
                showSuccessModal();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                contactForm.reset();
            }, 1000);
        }, 2000);
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    if (!value) {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (field.type === 'email' && !isValidEmail(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message if invalid
    if (!isValid) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.9rem;
            margin-top: 0.5rem;
            font-family: 'Roboto Mono', monospace;
        `;
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

setupContactForm();

// ===== SUCCESS MODAL =====
function showSuccessModal() {
    if (successModal) {
        successModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessModal() {
    if (successModal) {
        successModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Close modal when clicking overlay
if (successModal) {
    const overlay = successModal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeSuccessModal);
    }
}

// ===== PRELOADING CRITICAL ASSETS =====
function preloadCriticalAssets() {
    const criticalAssets = [
        'assets/Graduation.jpeg',
        'assets/St pauls.jpeg',
        'assets/Logo - LSN.jpeg',
        'assets/Logo - KCL Politics.jpeg',
        'assets/Logo - KCL.jpeg'
    ];
    
    criticalAssets.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadCriticalAssets();

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for performance
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

// Optimize scroll handlers
const optimizedScrollHandler = debounce(() => {
    updateScrollProgress();
    toggleScrollToTopButton();
}, 16);

window.addEventListener('scroll', optimizedScrollHandler);

console.log('✅ All optimizations applied successfully');