// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const body = document.body;

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.parentElement.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
            navMenu.parentElement.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.parentElement.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
});

// Dropdown Menu on Mobile
const dropdowns = document.querySelectorAll('.dropdown');

if (window.innerWidth <= 768) {
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        dropdownLink.addEventListener('click', (e) => {
            e.preventDefault();
            dropdownContent.classList.toggle('show');
        });
    });
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animated counters for stats section
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // lower is faster

    counters.forEach(counter => {
        const animate = () => {
            const value = +counter.getAttribute('data-count');
            const data = +counter.innerText;

            const increment = Math.ceil(value / speed);

            if (data < value) {
                counter.innerText = data + increment;
                setTimeout(animate, 10);
            } else {
                counter.innerText = value;
            }
        };
        animate();
    });
});

// Stats Counter Animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    let animationStarted = false;

    function startAnimation() {
        if (animationStarted) return;
        animationStarted = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();
            const startValue = 0;

            function updateNumber(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                
                // Easing function for smooth animation
                const easeOutQuad = t => t * (2 - t);
                const currentValue = Math.floor(easeOutQuad(progress) * target);

                stat.textContent = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                }
            }

            requestAnimationFrame(updateNumber);
        });
    }

    // Start animation when stats section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startAnimation();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

// Initialize the animation when the page loads
document.addEventListener('DOMContentLoaded', animateStats);

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');

        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation
const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.querySelector('input[type="text"]');
        const email = this.querySelector('input[type="email"]');
        const subject = this.querySelectorAll('input[type="text"]')[1];
        const message = this.querySelector('textarea');

        let isValid = true;

        if (!name.value.trim()) {
            isValid = false;
            showError(name, 'Name is required');
        } else {
            removeError(name);
        }

        if (!email.value.trim()) {
            isValid = false;
            showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email');
        } else {
            removeError(email);
        }

        if (!subject.value.trim()) {
            isValid = false;
            showError(subject, 'Subject is required');
        } else {
            removeError(subject);
        }

        if (!message.value.trim()) {
            isValid = false;
            showError(message, 'Message is required');
        } else {
            removeError(message);
        }

        if (isValid) {
            alert('Message sent successfully!');
            this.reset();
        }
    });
}

function showError(input, message) {
    const formGroup = input.parentElement;
    let errorElement = formGroup.querySelector('.error-message');

    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'red';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        formGroup.appendChild(errorElement);
    }

    errorElement.textContent = message;
    input.style.borderColor = 'red';
}

function removeError(input) {
    const formGroup = input.parentElement;
    const errorElement = formGroup.querySelector('.error-message');

    if (errorElement) {
        formGroup.removeChild(errorElement);
    }

    input.style.borderColor = '';
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        const body = document.body;
        const icon = darkModeToggle.querySelector('i');

        // Check for saved dark mode preference
        if (localStorage.getItem('darkMode') === 'true') {
            body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        darkModeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            // Toggle icon
            if (body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'true');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'false');
            }
        });
    }
});

// Smooth Heading and Blog Post Animation
document.addEventListener("DOMContentLoaded", function() {
  const faders = document.querySelectorAll('.fade-in-up');
  function revealOnScroll() {
    faders.forEach(el => {
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight - 60) {
        el.style.animationDelay = el.dataset.delay || "0s";
        el.classList.add('animated');
      }
    });
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});