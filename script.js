/* =====================================================
   GRACIEUSE - Parfums d'Exception
   JavaScript - Vanilla JS
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // Navigation - Scroll Effect
    // =====================================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on load

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on outside click
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // =====================================================
    // Smooth Scroll for Anchor Links
    // =====================================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================
    // Reveal on Scroll Animation
    // =====================================================
    const revealElements = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load

    // =====================================================
    // FAQ Accordion
    // =====================================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(function(otherItem) {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // =====================================================
    // Contact Form Validation
    // =====================================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset errors
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Validate name
            if (name.value.trim() === '') {
                showError(name, 'nameError', 'Veuillez entrer votre nom');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError(name, 'nameError', 'Le nom doit contenir au moins 2 caractères');
                isValid = false;
            }
            
            // Validate email
            if (email.value.trim() === '') {
                showError(email, 'emailError', 'Veuillez entrer votre email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'emailError', 'Veuillez entrer un email valide');
                isValid = false;
            }
            
            // Validate message
            if (message.value.trim() === '') {
                showError(message, 'messageError', 'Veuillez entrer votre message');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'messageError', 'Le message doit contenir au moins 10 caractères');
                isValid = false;
            }
            
            // If valid, show success message
            if (isValid) {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.textContent = 'Envoi en cours...';
                submitBtn.disabled = true;
                
                setTimeout(function() {
                    formSuccess.classList.add('show');
                    contactForm.reset();
                    submitBtn.textContent = 'Envoyer le Message';
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        formSuccess.classList.remove('show');
                    }, 5000);
                }, 1500);
            }
        });
    }

    function showError(input, errorId, message) {
        input.classList.add('error');
        document.getElementById(errorId).textContent = message;
    }

    function clearErrors() {
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        const errors = document.querySelectorAll('.error-message');
        
        inputs.forEach(function(input) {
            input.classList.remove('error');
        });
        
        errors.forEach(function(error) {
            error.textContent = '';
        });
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // =====================================================
    // Active Navigation Link on Scroll
    // =====================================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');

            if (navLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                    });
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // =====================================================
    // Lazy Loading Images (Native + Fallback)
    // =====================================================
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(function(img) {
            img.src = img.src;
        });
    } else {
        // Fallback for older browsers
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // =====================================================
    // Prevent iframe issues
    // =====================================================
    // Check if in iframe and adjust if needed
    if (window.self !== window.top) {
        document.body.classList.add('in-iframe');
    }

});
