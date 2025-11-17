// ============================================
// NOVAWAVE SOLUTIONS - JAVASCRIPT FUNCTIONALITY
// ============================================

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================

// Sticky Navbar on Scroll
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Hamburger Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// FORM VALIDATION
// ============================================

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form elements
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');
        const formSuccess = document.getElementById('formSuccess');

        // Reset previous errors
        let isValid = true;
        if (nameInput) nameInput.classList.remove('error');
        if (emailInput) emailInput.classList.remove('error');
        if (messageInput) messageInput.classList.remove('error');
        if (nameError) nameError.classList.remove('show');
        if (emailError) emailError.classList.remove('show');
        if (messageError) messageError.classList.remove('show');
        if (formSuccess) formSuccess.style.display = 'none';

        // Validate Name
        if (nameInput) {
            if (nameInput.value.trim() === '') {
                nameInput.classList.add('error');
                if (nameError) {
                    nameError.textContent = 'Name is required';
                    nameError.classList.add('show');
                }
                isValid = false;
            } else if (nameInput.value.trim().length < 2) {
                nameInput.classList.add('error');
                if (nameError) {
                    nameError.textContent = 'Name must be at least 2 characters';
                    nameError.classList.add('show');
                }
                isValid = false;
            }
        }

        // Validate Email
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                emailInput.classList.add('error');
                if (emailError) {
                    emailError.textContent = 'Email is required';
                    emailError.classList.add('show');
                }
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.classList.add('error');
                if (emailError) {
                    emailError.textContent = 'Please enter a valid email address';
                    emailError.classList.add('show');
                }
                isValid = false;
            }
        }

        // Validate Message
        if (messageInput) {
            if (messageInput.value.trim() === '') {
                messageInput.classList.add('error');
                if (messageError) {
                    messageError.textContent = 'Message is required';
                    messageError.classList.add('show');
                }
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                messageInput.classList.add('error');
                if (messageError) {
                    messageError.textContent = 'Message must be at least 10 characters';
                    messageError.classList.add('show');
                }
                isValid = false;
            }
        }

        // If form is valid, show success message
        if (isValid && formSuccess) {
            formSuccess.style.display = 'block';
            contactForm.reset();
            
            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        }
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });

    function validateField(field) {
        const fieldId = field.id;
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field.value.trim() === '') {
            field.classList.add('error');
            if (errorElement && field.previousElementSibling) {
                errorElement.textContent = `${field.previousElementSibling.textContent.replace('*', '').trim()} is required`;
                errorElement.classList.add('show');
            }
        } else {
            field.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }

        // Additional email validation
        if (fieldId === 'email' && field.value.trim() !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                field.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = 'Please enter a valid email address';
                    errorElement.classList.add('show');
                }
            }
        }
    }
}

// ============================================
// CARD HOVER EFFECTS
// ============================================

// Add hover effects to cards
const cards = document.querySelectorAll('.product-card, .service-card, .feature-item, .testimonial-card, .team-card, .value-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ============================================
// ANIMATED COUNTERS (for About page)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const suffix = element.dataset.suffix || (element.dataset.target && element.dataset.target.includes('%') ? '%' : '+');
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

// Intersection Observer for counters
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const target = parseInt(entry.target.dataset.target) || parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections
const animatedElements = document.querySelectorAll('.product-card, .service-card, .feature-item, .testimonial-card, .team-card, .value-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeObserver.observe(el);
});

// ============================================
// TYPEWRITER EFFECT (Optional - for hero section)
// ============================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Uncomment to enable typewriter effect on hero title
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// }