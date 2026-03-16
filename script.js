

// ===============================
// Executive Brand JavaScript
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------
    // 1. Smooth Scroll Navigation
    // ----------------------------------
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (targetId.length > 1) {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // ----------------------------------
    // 2. Scroll Reveal Animation
    // ----------------------------------
    const fadeElements = document.querySelectorAll(".fade-in");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.15
    });

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // ----------------------------------
    // 3. Animated KPI Counter
    // ----------------------------------
    const counters = document.querySelectorAll(".impact-card");

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            animateCounter(el);
            observer.unobserve(el);
        });
    }, { threshold: 0.6 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    function animateCounter(element) {
        const text = element.innerText;
        const numericValue = parseInt(text.replace(/\D/g, ''));

        if (isNaN(numericValue)) return;

        let start = 0;
        const duration = 1500;
        const stepTime = Math.abs(Math.floor(duration / numericValue));

        const timer = setInterval(() => {
            start += Math.ceil(numericValue / 60);

            if (start >= numericValue) {
                element.innerText = text;
                clearInterval(timer);
            } else {
                element.innerText = start + text.replace(/[0-9]/g, '');
            }
        }, stepTime);
    }

    // ----------------------------------
    // 4. Navbar Style Change on Scroll
    // ----------------------------------
    const nav = document.querySelector(".nav");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)";
        } else {
            nav.style.boxShadow = "none";
        }
    });

    // ----------------------------------
    // 5. Scroll Progress Indicator
    // ----------------------------------
    const progressBar = document.createElement("div");
    progressBar.style.position = "fixed";
    progressBar.style.top = "0";
    progressBar.style.left = "0";
    progressBar.style.height = "8px";
    progressBar.style.background = "#111";
    progressBar.style.width = "0%";
    progressBar.style.zIndex = "9999";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + "%";
    });

});


const sectionHeaders = document.querySelectorAll(".section-header h2");

const underlineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("underline-visible");
        } else {
            entry.target.classList.remove("underline-visible");
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of header is visible
});

sectionHeaders.forEach(header => {
    underlineObserver.observe(header);
});




document.addEventListener("DOMContentLoaded", () => {
    const skillMeters = document.querySelectorAll(".skill-meter");

    const meterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const meter = entry.target.querySelector(".meter-fill");
            const valueLabel = entry.target.querySelector(".meter-value");
            const targetValue = parseInt(entry.target.dataset.value);

            let progress = 0;
            const duration = 1500; // ms
            const step = targetValue / (duration / 15);

            const interval = setInterval(() => {
                progress += step;
                if (progress >= targetValue) progress = targetValue;

                meter.style.width = progress + "%";
                valueLabel.textContent = Math.round(progress) + "%";

                if (progress >= targetValue) clearInterval(interval);
            }, 15);

            meterObserver.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    skillMeters.forEach(m => meterObserver.observe(m));
});




document.querySelectorAll('.carousel').forEach(carousel => {

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');
    const dotsNav = carousel.querySelector('.carousel-dots');

    let index = 0;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(dotsNav.children);

    function updateCarousel(i) {
        track.style.transform = `translateX(-${i * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[i].classList.add('active');
        index = i;
    }

    nextBtn.addEventListener('click', () => {
        let i = (index + 1) % slides.length;
        updateCarousel(i);
    });

    prevBtn.addEventListener('click', () => {
        let i = (index - 1 + slides.length) % slides.length;
        updateCarousel(i);
    });

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => updateCarousel(i));
    });

    // Auto play
    setInterval(() => {
        let i = (index + 1) % slides.length;
        updateCarousel(i);
    }, 5000);
});


