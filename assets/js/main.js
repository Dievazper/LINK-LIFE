document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggleBtn.innerHTML = newTheme === 'light' ? '🌙' : '☀️';
            localStorage.setItem('theme', newTheme);
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            themeToggleBtn.innerHTML = savedTheme === 'light' ? '🌙' : '☀️';
        }
    }

    // 2. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
    
    // 3. Header background on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-color');
            } else {
                header.style.background = getComputedStyle(document.documentElement).getPropertyValue('--header-glass');
            }
        });
    }

    // 4. Mobile Menu Toggle (if added later)
    // Could add a hamburger menu listener here.
});
