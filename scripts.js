// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Smooth Scrolling for CTA buttons and navigation links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.scroll-animate');
        this.init();
    }
    
    init() {
        this.createObserver();
        this.addScrollAnimateClasses();
    }
    
    addScrollAnimateClasses() {
        // Add scroll animate class to various elements
        const elementsToAnimate = [
            '.service-card',
            '.testimonial-card',
            '.content-card',
            '.logo-item',
            '.contact-method',
            '.stat-item'
        ];
        
        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add('scroll-animate');
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }
    
    createObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        // Observe all elements with scroll-animate class
        document.querySelectorAll('.scroll-animate').forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize scroll animations
new ScrollAnimations();

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(249, 249, 249, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(11, 29, 58, 0.1)';
    } else {
        navbar.style.background = 'rgba(249, 249, 249, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('.submit-button');
    const originalButtonText = submitButton.innerHTML;
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            contactForm.classList.add('loading');
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
                contactForm.classList.remove('loading');
                
                // Show success message
                showNotification('Thanks for your message! I\'ll get back to you soon.', 'success');
            }, 2000);
        });
    }
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Content cards click handlers
document.addEventListener('DOMContentLoaded', function() {
    const contentCards = document.querySelectorAll('.content-card');
    
    contentCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            
            // You can customize these links based on actual content
            const contentLinks = {
                '5 Tips for Confident Public Speaking': 'https://instagram.com/joshrobinson.uk',
                'Gap Year Planning Made Simple': 'https://tiktok.com/@joshrobinson',
                'Building Student Communities': '#'
            };
            
            const link = contentLinks[title];
            if (link && link !== '#') {
                window.open(link, '_blank');
            }
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Service cards hover effect enhancement
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Typing animation for hero title (optional enhancement)
class TypingAnimation {
    constructor(element, text, speed = 100) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
    }
    
    start() {
        this.element.textContent = '';
        this.typeText();
    }
    
    typeText() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            setTimeout(() => this.typeText(), this.speed);
        }
    }
}

// Initialize typing animation for hero title (uncomment if desired)
// document.addEventListener('DOMContentLoaded', function() {
//     const heroTitle = document.querySelector('.hero-title');
//     if (heroTitle) {
//         const originalText = heroTitle.textContent;
//         const typingAnimation = new TypingAnimation(heroTitle, originalText, 80);
//         setTimeout(() => typingAnimation.start(), 1000);
//     }
// });

// Scroll to top functionality
function createScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    
    Object.assign(scrollTopBtn.style, {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #d69e2e, #b7791f)',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.2rem',
        boxShadow: '0 5px 20px rgba(214, 158, 46, 0.3)',
        zIndex: '1000',
        opacity: '0',
        transform: 'translateY(100px)',
        transition: 'all 0.3s ease'
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.transform = 'translateY(100px)';
        }
    });
}

// Initialize scroll to top button
createScrollToTop();

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add mobile menu styles
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(249, 249, 249, 0.98);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(11, 29, 58, 0.1);
                padding: 2rem 0;
                backdrop-filter: blur(10px);
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }
            
            .hamburger.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        }
    `;
    document.head.appendChild(style);
});

console.log('Josh Robinson website loaded successfully! 🎉');