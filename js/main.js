// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    // Get theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme');

    // Default to dark theme to match the inspiration
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateToggleIcon(savedTheme);
    } else {
        // Always start with dark theme
        document.documentElement.setAttribute('data-theme', 'dark');
        updateToggleIcon('dark');
    }

    // Theme toggle button click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Set the new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update the toggle icon
        updateToggleIcon(newTheme);
    });

    // Update toggle icon based on current theme
    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // Initialize features
    initCustomCursor();
    initScrollAnimations();
    initScrollSpy();
    highlightSectionTitlesOnScroll();

    // Mobile Navigation Toggle
    initMobileNavToggle();
});

// Mobile Navigation Toggle
function initMobileNavToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (navToggle && nav && navLinks) {
        navToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-open');
        });

        // Close menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-open');
            });
        });
    }
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Scroll-Based Navigation Highlighting (ScrollSpy)
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Highlight section titles when in viewport
function highlightSectionTitlesOnScroll() {
    const sectionTitles = document.querySelectorAll('.section-title');
    const sections = Array.from(sectionTitles).map(title => title.closest('section'));

    function onScroll() {
        const windowHeight = window.innerHeight;
        sectionTitles.forEach((title, idx) => {
            const section = sections[idx];
            const rect = section.getBoundingClientRect();
            // Section is considered in viewport if at least 30% visible
            if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
                title.classList.add('active-highlight');
            } else {
                title.classList.remove('active-highlight');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    onScroll(); // Initial check
}
