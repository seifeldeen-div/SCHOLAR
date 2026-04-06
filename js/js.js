/* ============================================
   Scholar - Main JavaScript
   ============================================ */

// ── Loading Screen ──────────────────────────
const loader = document.querySelector(".c");

window.addEventListener("load", function () {
    loader.classList.add("active");
    setTimeout(() => {
        loader.style.display = "none";
    }, 2200);
});

// ── Sticky Nav: shrink on scroll ─────────────
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// ── Mobile Hamburger Menu ────────────────────
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector("nav .container ul");
const navLinks = document.querySelectorAll("nav .container ul li a");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navMenu.classList.toggle("menu-open");
});

// Close menu when a link is clicked
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navMenu.classList.remove("menu-open");
    });
});

// ── Active Nav Link on Scroll ─────────────────
const sections = document.querySelectorAll("section[id], header[id]");

const observerOptions = {
    root: null,
    rootMargin: "-40% 0px -40% 0px",
    threshold: 0,
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((link) => {
                link.classList.remove("active-link");
                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active-link");
                }
            });
        }
    });
}, observerOptions);

sections.forEach((s) => sectionObserver.observe(s));

// ── Scroll Reveal (lightweight, no library) ──
const revealEls = document.querySelectorAll(
    ".services .card, .courses .card, .team .card, .events .line, .six .testimonial-card, .six .testimonial-content"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

revealEls.forEach((el) => {
    el.classList.add("will-reveal");
    revealObserver.observe(el);
});

// ── Courses Filter Tabs ───────────────────────
const filterLinks = document.querySelectorAll(".courses ul li a");
const courseCards = document.querySelectorAll(".courses .cards .card");

filterLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        // Active state
        filterLinks.forEach((l) => l.classList.remove("tab-active"));
        link.classList.add("tab-active");

        const filter = link.dataset.filter;

        courseCards.forEach((card) => {
            const cat = card.dataset.category || "";
            if (!filter || filter === "all" || cat === filter) {
                card.style.display = "";
                card.classList.add("card-visible");
            } else {
                card.style.display = "none";
                card.classList.remove("card-visible");
            }
        });
    });
});

// ── Counter Animation (section four) ─────────
const counters = document.querySelectorAll(".four .text p:first-child");
let counted = false;

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach((counter) => {
                    const raw = counter.innerText.replace(/[^0-9]/g, "");
                    const target = parseInt(raw, 10);
                    const suffix = counter.innerText.replace(/[0-9]/g, "");
                    let current = 0;
                    const step = Math.ceil(target / 60);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.innerText = target + suffix;
                            clearInterval(timer);
                        } else {
                            counter.innerText = current + suffix;
                        }
                    }, 25);
                });
            }
        });
    },
    { threshold: 0.5 }
);

const fourSection = document.querySelector(".four");
if (fourSection) counterObserver.observe(fourSection);

// ── FAQ Accordion ─────────────────────────────
const faqItems = document.querySelectorAll(".primAsk");

faqItems.forEach((item) => {
    const heading = item.querySelector(".heading");
    const body = item.querySelector(".body");
    const toggle = item.querySelector(".heading span");

    if (!heading) return;

    heading.style.cursor = "pointer";

    heading.addEventListener("click", () => {
        const isOpen = item.classList.contains("faq-open");

        // Close all
        faqItems.forEach((fi) => {
            fi.classList.remove("faq-open");
            const b = fi.querySelector(".body");
            const t = fi.querySelector(".heading span");
            if (b) b.style.maxHeight = "0px";
            if (t) t.textContent = "+";
        });

        // Open clicked if it was closed
        if (!isOpen && body) {
            item.classList.add("faq-open");
            body.style.maxHeight = body.scrollHeight + "px";
            if (toggle) toggle.textContent = "−";
        }
    });
});

// Initialise first FAQ as open
if (faqItems.length > 0) {
    const firstBody = faqItems[0].querySelector(".body");
    const firstToggle = faqItems[0].querySelector(".heading span");
    if (firstBody) {
        faqItems[0].classList.add("faq-open");
        firstBody.style.maxHeight = firstBody.scrollHeight + "px";
        if (firstToggle) firstToggle.textContent = "−";
    }
}

// ── Smooth scroll for anchor links ───────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});