// ===== ULTRA-MODERN JOSH ROBINSON WEBSITE - OPTIMIZED =====

console.log('🚀 Ultra-modern Josh Robinson website loaded with optimized performance');

// ===== LOADING ANIMATION CONTROL =====
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
}

// Hide loading screen when page is fully loaded
window.addEventListener('load', () => {
    // Add a small delay for smooth transition
    setTimeout(hideLoadingScreen, 1000);
});

// Fallback: Hide loading screen after 3 seconds max
setTimeout(hideLoadingScreen, 3000);

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
    
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    lastScrollY = currentScrollY;
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
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
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== ADVANCED LAZY LOADING - OPTIMIZED =====
function setupLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const picture = img.closest('picture');
                
                if (picture) {
                    // Load WebP source if supported
                    const webpSource = picture.querySelector('source[type="image/webp"]');
                    if (webpSource && 'WebP' in window) {
                        img.src = webpSource.srcset.split(' ')[0]; // Use first size
                    }
                }
                
                // Add loaded class for animations
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px', // Start loading 50px before image enters viewport
        threshold: 0.1
    });
    
    // Observe all images
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== SCROLL-TRIGGERED ANIMATIONS - OPTIMIZED =====
function setupScrollAnimations() {
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px', // Trigger when element is 50px from bottom
        threshold: 0.1
    });
    
    // Observe all animation elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
        animationObserver.observe(el);
    });
}

// ===== PARALLAX EFFECTS - OPTIMIZED =====
function setupParallax() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const rate = scrolled * -0.5; // Parallax speed
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ===== TOUCH GESTURES & MOBILE INTERACTIONS =====
function setupTouchGestures() {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    
    // Touch start
    document.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        startTime = Date.now();
    }, { passive: true });
    
    // Touch end - detect gestures
    document.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        // Minimum distance for gesture detection
        if (distance < 50) return;
        
        // Swipe left/right for testimonials
        if (Math.abs(deltaX) > Math.abs(deltaY) && duration < 500) {
            if (deltaX > 0) {
                // Swipe right - previous testimonial
                navigateTestimonial('prev');
            } else {
                // Swipe left - next testimonial
                navigateTestimonial('next');
            }
        }
        
        // Swipe up for contact modal
        if (deltaY < -100 && duration < 500) {
            openContactModal();
        }
    }, { passive: true });
    
    // Double tap to zoom prevention
    let lastTap = 0;
    document.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            e.preventDefault();
        }
        lastTap = currentTime;
    });
}

// Testimonial navigation function
function navigateTestimonial(direction) {
    const currentSlide = document.querySelector('.testimonial-slide.active');
    if (!currentSlide) return;
    
    if (direction === 'next') {
        // Trigger next testimonial
        const nextButton = document.querySelector('.testimonial-controls .next');
        if (nextButton) nextButton.click();
    } else {
        // Trigger previous testimonial
        const prevButton = document.querySelector('.testimonial-controls .prev');
        if (prevButton) prevButton.click();
    }
}

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

// ===== PERFORMANCE OPTIMIZED PARALLAX =====
function setupOptimizedParallax() {
    const heroImage = document.querySelector('.hero-image');
    if (!heroImage) return;
    
    let ticking = false;
    let lastScrollY = window.pageYOffset;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const delta = scrolled - lastScrollY;
        
        // Only update if scroll amount is significant
        if (Math.abs(delta) > 5) {
            const rate = scrolled * -0.3; // Reduced intensity for better performance
            heroImage.style.transform = `translateY(${rate}px)`;
            lastScrollY = scrolled;
        }
    }
    
    function throttledParallax() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Only add scroll listener if user hasn't requested reduced motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', throttledParallax, { passive: true });
    }
}

setupOptimizedParallax();

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

// ===== PERFORMANCE OPTIMIZED ANIMATIONS =====
function setupOptimizedAnimations() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);
    
    // Observe only critical elements for better performance
    const criticalElements = [
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.credential-category'),
        ...document.querySelectorAll('.partner-item')
    ];
    
    criticalElements.forEach(el => observer.observe(el));
}

setupOptimizedAnimations();

// ===== PERFORMANCE OPTIMIZED HOVER EFFECTS =====
function setupOptimizedHoverEffects() {
    // Use CSS classes instead of inline styles for better performance
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover-active');
        });
    });
    
    // Partner item hover effects
    document.querySelectorAll('.partner-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('hover-active');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover-active');
        });
    });
}

setupOptimizedHoverEffects();

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

// ===== PERFORMANCE OPTIMIZED HERO CAROUSEL =====
function setupOptimizedHeroCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (!carouselContainer || slides.length === 0) return;
    
    let currentSlide = 0;
    const slideInterval = 6000; // 6 seconds per slide for better UX
    
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        // Update subtitle text with smooth transition
        if (heroSubtitle) {
            const slideText = slides[index].getAttribute('data-text');
            if (slideText && heroSubtitle.textContent !== slideText) {
                heroSubtitle.style.opacity = '0';
                setTimeout(() => {
                    heroSubtitle.textContent = slideText;
                    heroSubtitle.style.opacity = '1';
                }, 200);
            }
        }
        
        // Add prev class to previous slide for smooth transition
        const prevIndex = (index - 1 + slides.length) % slides.length;
        slides[prevIndex].classList.add('prev');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slides with better performance
    let slideTimer = setInterval(nextSlide, slideInterval);
    
    // Dot click handlers with debouncing
    dots.forEach((dot, index) => {
        dot.addEventListener('click', debounce(() => {
            currentSlide = index;
            showSlide(currentSlide);
            
            // Reset timer
            clearInterval(slideTimer);
            slideTimer = setInterval(nextSlide, slideInterval);
        }, 300));
    });
    
    // Pause auto-advance on hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideTimer);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        slideTimer = setInterval(nextSlide, slideInterval);
    });
    
    // Initialize first slide
    showSlide(0);
}

setupOptimizedHeroCarousel();

// ===== OPTIMIZED TYPING ANIMATION =====
function setupOptimizedTypingAnimation() {
    const phrases = [
        "build confidence",
        "find your voice", 
        "achieve excellence",
        "unlock potential",
        "transform learning",
        "develop skills",
        "create connections",
        "excel academically",
        "navigate university",
        "thrive anywhere",
        "overcome challenges",
        "think critically",
        "build friendships",
        "discover yourself",
        "succeed always"
    ];
    
    const typingElement = document.querySelector('.title-highlight');
    if (!typingElement) return;
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const deleteSpeed = 40;
    const pauseTime = 2500;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        // Add typing class to show cursor
        typingElement.classList.add('typing');
        
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
            speed = 800;
            // Remove typing class when starting new phrase
            typingElement.classList.remove('typing');
        }
        
        setTimeout(type, speed);
    }
    
    // Start typing animation after initial load
    setTimeout(type, 2000);
}

setupOptimizedTypingAnimation();

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

// ===== OPTIMIZED ASSET PRELOADING =====
function preloadCriticalAssets() {
    const criticalAssets = [
        'assets/Graduation.jpeg',
        'assets/St pauls.jpeg',
        'assets/LUBE FINALS.jpeg',
        'assets/Studying.jpeg',
        'assets/101.jpeg',
        'assets/Logo - LSN.jpeg',
        'assets/Logo - KCL Politics.jpeg',
        'assets/Logo - KCL.jpeg'
    ];
    
    // Preload with better error handling and performance
    criticalAssets.forEach(src => {
        const img = new Image();
        img.onload = () => console.log(`✅ Loaded: ${src}`);
        img.onerror = () => console.warn(`⚠️ Failed to load: ${src}`);
        img.src = src;
    });
}

// Preload critical assets after page load for better performance
window.addEventListener('load', () => {
    setTimeout(preloadCriticalAssets, 1000);
});

// ===== LAZY LOADING FOR BETTER PERFORMANCE =====
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

setupLazyLoading();

// ===== PERFORMANCE MONITORING =====
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log('🚀 Page load time:', Math.round(perfData.loadEventEnd - perfData.loadEventStart), 'ms');
            }, 0);
        });
    }
}

monitorPerformance();

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

// Optimize scroll handlers with passive listeners
const optimizedScrollHandler = debounce(() => {
    updateScrollProgress();
    toggleScrollToTopButton();
}, 16);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ===== FINAL PERFORMANCE OPTIMIZATIONS =====
// Disable animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('low-performance');
}

// Optimize for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// ===== TESTIMONIALS SLIDER FUNCTIONALITY =====
function setupTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-nav.prev');
    const nextBtn = slider.querySelector('.slider-nav.next');
    
    let currentSlide = 0;
    let isTransitioning = false;
    let autoPlayInterval;
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    function showSlide(index) {
        if (isTransitioning || index === currentSlide) return;
        
        isTransitioning = true;
        
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Reset transition flag after animation
        setTimeout(() => {
            isTransitioning = false;
        }, prefersReducedMotion ? 100 : 500);
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });
    
    // Arrow navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }
    
    // Keyboard navigation
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoPlay();
        }
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });
    
    slider.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoPlay();
        }
    }
    
    // Auto-play functionality (disabled if reduced motion is preferred)
    function startAutoPlay() {
        if (prefersReducedMotion) return;
        
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000);
    }
    
    function resetAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
    }
    
    function stopAutoPlay() {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    }
    
    // Pause auto-play on hover/focus
    slider.addEventListener('mouseenter', stopAutoPlay);
    slider.addEventListener('mouseleave', startAutoPlay);
    slider.addEventListener('focusin', stopAutoPlay);
    slider.addEventListener('focusout', startAutoPlay);
    
    // Start auto-play
    startAutoPlay();
    
    // Make slider focusable for accessibility
    slider.setAttribute('tabindex', '0');
}

// Initialize testimonials slider
setupTestimonialsSlider();

// ===== WEBSITE READY =====
console.log('✅ Josh Robinson website optimized and ready for production');
console.log('🚀 Performance optimizations applied');
console.log('📱 Mobile optimizations enabled');
console.log('🎨 Typing animation restored with better performance');
console.log('💬 Testimonials slider with accessibility features');

// ===== PWA SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('📱 PWA Service Worker registered:', registration.scope);
            })
            .catch(error => {
                console.error('❌ PWA Service Worker registration failed:', error);
            });
    });
}

// Initialize lazy loading
setupLazyLoading();

// Initialize scroll animations
setupScrollAnimations();

// Initialize parallax effects
setupParallax();

// Initialize touch gestures
setupTouchGestures();

// ===== CONTACT MODAL FUNCTIONS =====

function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
        const firstInput = modal.querySelector('input');
        if (firstInput) firstInput.focus();
    }, 100);
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    
    // Reset form
    const form = document.getElementById('contactForm');
    if (form) form.reset();
}

function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('.submit-button');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    // Prepare data for API
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Send to backend API using form action
    const formAction = event.target.action;
    fetch(formAction, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Close contact modal
            closeContactModal();
            
            // Show success modal
            showSuccessModal();
        } else {
            // Show error message
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to send message. Please try again or email me directly at josh@joshrobinson.uk');
    })
    .finally(() => {
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    });
}