/* ==========================================================================
   BIEC PhoTech Club — Interactions
   ========================================================================== */

(function () {
    "use strict";

    /* Mobile navigation toggle */
    var navToggle = document.getElementById("navToggle");
    var nav = document.getElementById("nav");

    if (navToggle && nav) {
        navToggle.addEventListener("click", function () {
            var isOpen = nav.classList.toggle("is-open");
            navToggle.classList.toggle("is-open", isOpen);
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        nav.querySelectorAll(".nav-link").forEach(function (link) {
            link.addEventListener("click", function () {
                nav.classList.remove("is-open");
                navToggle.classList.remove("is-open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* Header background shadow on scroll */
    var header = document.getElementById("siteHeader");

    function onScrollHeader() {
        if (window.scrollY > 10) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    }

    if (header) {
        window.addEventListener("scroll", onScrollHeader, { passive: true });
        onScrollHeader();
    }

    /* Footer year */
    var yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    /* Hero camera-photo slideshow (Sony / Nikon / Canon) */
    var slides = Array.prototype.slice.call(
        document.querySelectorAll(".hero-media-img")
    );

    function activeSlides() {
        return slides.filter(function (s) {
            return !s.dataset.failed;
        });
    }

    slides.forEach(function (img) {
        img.addEventListener("error", function () {
            img.dataset.failed = "1";
            img.classList.remove("is-active");
            var valid = activeSlides();
            if (valid.length) {
                valid[0].classList.add("is-active");
            }
        });
    });

    function startSlideshow() {
        var valid = activeSlides();
        if (valid.length <= 1) {
            return;
        }
        var index = 0;
        window.setInterval(function () {
            index = (index + 1) % valid.length;
            slides.forEach(function (s) {
                s.classList.remove("is-active");
            });
            valid[index].classList.add("is-active");
        }, 6000);
    }

    startSlideshow();

    /* Scroll-reveal animation (progressive enhancement: added via JS only) */
    var revealTargets = document.querySelectorAll(
        ".section-head, .about-card, .activity-card, .event, .gallery-item, .join-info, .join-form"
    );

    if ("IntersectionObserver" in window) {
        var revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );

        revealTargets.forEach(function (el) {
            el.classList.add("reveal");
            revealObserver.observe(el);
        });
    }

    /* Active nav link based on scroll position */
    var sections = document.querySelectorAll("section[id]");
    var navLinks = document.querySelectorAll(".nav-link");

    if (sections.length && navLinks.length) {
        var scrollSpy = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var id = entry.target.getAttribute("id");
                        navLinks.forEach(function (link) {
                            var isMatch = link.getAttribute("href") === "#" + id;
                            link.classList.toggle("is-active", isMatch);
                        });
                    }
                });
            },
            { rootMargin: "-45% 0px -50% 0px" }
        );

        sections.forEach(function (section) {
            scrollSpy.observe(section);
        });
    }

    /* Contact form */
    var form = document.getElementById("joinForm");
    var status = document.getElementById("formStatus");

    if (form && status) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            var name = document.getElementById("name");
            var email = document.getElementById("email");

            if (!name.value.trim() || !email.value.trim()) {
                status.textContent = "Please fill in your name and email.";
                status.classList.add("is-error");
                return;
            }

            status.textContent = "Thanks for reaching out! We'll get back to you soon.";
            status.classList.remove("is-error");
            form.reset();
        });
    }
})();
