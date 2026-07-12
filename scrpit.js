/* ── MOBILE MENU ──────────────────────────────────── */
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".menu-btn") && !e.target.closest(".mobile-menu")) {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("open");
    }
  });
}

/* ── SECTION SCROLL REVEAL ────────────────────────── */
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ns-visible");
        revealObserver.unobserve(entry.target);

        // Fire counter animation when section 1 becomes visible
        if (entry.target.querySelector(".stat-num[data-count]")) {
          animateCounters(entry.target);
        }
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".new-section").forEach(el => {
  el.classList.add("ns-anim");
  revealObserver.observe(el);
});

/* ── STAT COUNTER ANIMATION ───────────────────────── */
function animateCounters(section) {
  section.querySelectorAll(".stat-num[data-count]").forEach(el => {
    const target  = parseInt(el.dataset.count, 10);
    const suffix  = el.dataset.suffix || "";
    const duration = 1600;
    const start   = performance.now();

    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  });
}

/* ── FAQ ACCORDION ────────────────────────────────── */
document.querySelectorAll(".faq-q").forEach(btn => {
  btn.addEventListener("click", () => {
    const item   = btn.closest(".faq-item");
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach(el => el.classList.remove("open"));

    if (!isOpen) item.classList.add("open");
  });
});

/* ── PARALLAX ON HERO ORBS (mouse move) ──────────── */
const orbs = document.querySelectorAll(".orb");

if (orbs.length) {
  document.addEventListener("mousemove", (e) => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx; // -1 to 1
    const dy = (e.clientY - cy) / cy; // -1 to 1

    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 10; // 10, 20, 30px max shift
      // Use CSS custom properties to layer on top of the keyframe animation
      orb.style.setProperty("--px", `${dx * depth}px`);
      orb.style.setProperty("--py", `${dy * depth}px`);
    });
  });
}

/* ── SMOOTH NAVBAR ON SCROLL ──────────────────────── */
const nav = document.querySelector(".nav");

if (nav) {
  window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y > 80) {
      nav.style.background     = "rgba(10,14,26,0.88)";
      nav.style.backdropFilter = "blur(18px)";
      nav.style.boxShadow      = "0 4px 24px rgba(0,0,0,0.3)";
      nav.style.borderRadius   = "0 0 16px 16px";
    } else {
      nav.style.background     = "";
      nav.style.backdropFilter = "";
      nav.style.boxShadow      = "";
      nav.style.borderRadius   = "";
    }
  }, { passive: true });
}
