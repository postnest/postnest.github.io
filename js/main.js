// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuButton.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-open');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuButton.classList.remove('active');
                    document.body.classList.remove('mobile-menu-open');
                }
            }
        });
    });

    // Pricing tabs functionality
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const pricingCards = document.querySelectorAll('.pricing-card');

    if (pricingTabs.length > 0 && pricingCards.length > 0) {
        // Make pricing cards selectable
        pricingCards.forEach(card => {
            card.addEventListener('click', function() {
                // Remove selected class from all cards
                pricingCards.forEach(c => c.classList.remove('selected'));
                // Add selected class to clicked card
                this.classList.add('selected');
            });
        });
        function setPricingDisplay(period) {
            pricingCards.forEach(card => {
                const amountEl = card.querySelector('.price-container .amount');
                const breakdownEl = card.querySelector('.price-breakdown');

                // Skip lifetime card for dynamic price changes
                if (card.classList.contains('lifetime')) {
                    return;
                }

                if (amountEl && breakdownEl) {
                    const yearlyPrice = amountEl.getAttribute('data-yearly');
                    const monthlyPrice = amountEl.getAttribute('data-monthly');
                    const yearlyBreakdown = breakdownEl.getAttribute('data-yearly');
                    const monthlyBreakdown = breakdownEl.getAttribute('data-monthly');

                    if (period === 'yearly') {
                        amountEl.textContent = yearlyPrice;
                        breakdownEl.textContent = yearlyBreakdown;
                    } else if (period === 'monthly') {
                        amountEl.textContent = monthlyPrice;
                        breakdownEl.textContent = monthlyBreakdown;
                    }
                }
            });
        }

        // Set initial state based on the active tab (should be 'yearly' from HTML)
        const activeTab = document.querySelector('.pricing-tab.active');
        if (activeTab) {
            const initialPeriod = activeTab.getAttribute('data-period');
            setPricingDisplay(initialPeriod);
        } else if (pricingTabs.length > 0) {
            // Fallback if no tab is active (though HTML should define one)
            pricingTabs[0].classList.add('active');
            setPricingDisplay(pricingTabs[0].getAttribute('data-period'));
        }

        // Handle tab clicks
        pricingTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                pricingTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const period = this.getAttribute('data-period');
                setPricingDisplay(period);
            });
        });
    }

    // Add animation effects on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .step, .app-feature, .app-mockup');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Run once on page load
    animateOnScroll();

    // Then run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Handle platform icons hover effect
    const platformIcons = document.querySelectorAll('.platform-icons i');
    platformIcons.forEach(icon => {
        // Already using title attribute for tooltips
        icon.setAttribute('aria-label', icon.getAttribute('title'));
    });

    // Handle social icon links hover effect
    const socialLinks = document.querySelectorAll('.social-icon-link');
    socialLinks.forEach(link => {
        const platform = link.getAttribute('data-platform');
        if (platform) {
            // Set aria label for accessibility
            link.setAttribute('aria-label', platform);
        }
    });

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Here you would normally send the data to a server
            // For now, we'll just log it and show a success message
            console.log('Form submitted:', { name, email, message });

            // Show success message
            const formMessage = document.querySelector('.form-message');
            if (formMessage) {
                formMessage.textContent = 'Thanks for your message! We\'ll get back to you soon.';
                formMessage.classList.add('success');
                formMessage.style.display = 'block';

                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                alert('Thanks for your message! We\'ll get back to you soon.');
            }

            // Reset form
            contactForm.reset();
        });
    }
});
