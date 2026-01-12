/**
 * Patrícia Digitação - Main JavaScript
 * Landing page functionality with AOS animations and mobile menu
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate On Scroll)
    initializeAOS();
    
    // Initialize Mobile Menu
    initializeMobileMenu();
    
    // Initialize Smooth Scrolling
    initializeSmoothScroll();
    
    // Initialize Scroll Effects
    initializeScrollEffects();
    
    // Initialize WhatsApp Button
    initializeWhatsAppButton();
    
    // Initialize Back to Top Button
    initializeBackToTop();
    
    // Initialize Service Cards Hover Effects
    initializeServiceCards();
    
    // Initialize Form Validation (if forms exist)
    initializeFormValidation();
    
    // Initialize Lazy Loading for Images
    initializeLazyLoading();
});

/**
 * Initialize AOS (Animate On Scroll) Library
 */
function initializeAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            delay: 0,
            easing: 'ease-out-cubic',
            mirror: false,
            anchorPlacement: 'top-bottom'
        });
        
        console.log('AOS initialized successfully');
    } else {
        console.warn('AOS library not found');
    }
}

/**
 * Initialize Mobile Menu Functionality
 */
function initializeMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
            
            // Change icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(e.target) && 
                !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking on links
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                if (window.innerWidth >= 768) { // md breakpoint
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }, 250);
        });
    }
}

/**
 * Initialize Smooth Scrolling for Navigation Links
 */
function initializeSmoothScroll() {
    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate offset for fixed navigation
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20; // 20px extra padding
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
}

/**
 * Initialize Scroll Effects and Animations
 */
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    // Navigation background opacity on scroll
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background opacity
        if (scrollTop > 50) {
            nav.classList.add('bg-white/95', 'backdrop-blur-sm');
            nav.classList.remove('bg-white');
        } else {
            nav.classList.remove('bg-white/95', 'backdrop-blur-sm');
            nav.classList.add('bg-white');
        }
        
        // Hide/show navigation on scroll (optional)
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            nav.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add transition for navigation transform
    nav.style.transition = 'transform 0.3s ease-in-out';
}

/**
 * Initialize WhatsApp Button Functionality
 */
function initializeWhatsAppButton() {
    const whatsappButtons = document.querySelectorAll('[href^="https://wa.me/"]');
    
    whatsappButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Log WhatsApp click for analytics (optional)
            console.log('WhatsApp button clicked');
        });
        
        // Add hover effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Initialize Back to Top Button
 */
function initializeBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('translate-y-20', 'opacity-0');
            } else {
                backToTopButton.classList.add('translate-y-20', 'opacity-0');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize Service Cards Hover Effects
 */
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card, [class*="rounded-lg shadow-lg"]');
    
    serviceCards.forEach(card => {
        // Add click ripple effect
        card.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add keyboard navigation
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(196, 0, 0, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Initialize Form Validation (for future forms)
 */
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('border-red-500');
                    
                    // Add error message
                    const errorMsg = input.parentElement.querySelector('.error-message') || document.createElement('span');
                    errorMsg.className = 'error-message text-red-500 text-sm mt-1';
                    errorMsg.textContent = 'Este campo é obrigatório';
                    
                    if (!input.parentElement.querySelector('.error-message')) {
                        input.parentElement.appendChild(errorMsg);
                    }
                } else {
                    input.classList.remove('border-red-500');
                    const errorMsg = input.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (isValid) {
                // Form is valid, proceed with submission
                console.log('Form is valid');
                // Add your form submission logic here
            }
        });
    });
}

/**
 * Initialize Lazy Loading for Images
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('opacity-0');
                    img.classList.add('opacity-100', 'transition-opacity', 'duration-300');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.classList.add('opacity-0');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Utility Functions
 */

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
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
    };
}

// Add loading animation
function showLoading(element) {
    element.classList.add('animate-pulse', 'pointer-events-none');
}

function hideLoading(element) {
    element.classList.remove('animate-pulse', 'pointer-events-none');
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You can add error reporting here
});

// Console welcome message
console.log(`
    🎨 Patrícia Digitação - Landing Page
    📱 Serviços de papelaria personalizada
    💬 Contato: (11) 99999-9999
    
    ✨ Desenvolvido com carinho e tecnologia de ponta
`);