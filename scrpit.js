/* ── MOBILE MENU ──────────────────────────────────── */
// Background audio: try on entry, then retry on interaction if autoplay is blocked.
(() => {
  const audio = document.getElementById("backgroundAudio");
  const toggle = document.getElementById("soundToggle");
  const status = document.getElementById("soundStatus");
  if (!audio || !toggle || !status) return;

  const preferenceKey = "talk-background-sound";
  let enabled = true;
  let pending = false;
  let attempt = 0;
  let waitingForGesture = false;

  try {
    enabled = localStorage.getItem(preferenceKey) !== "off";
  } catch (_) { /* Sound still works when storage is unavailable. */ }

  audio.volume = 0.35;
  toggle.hidden = false;

  function updateToggle() {
    const playing = !audio.paused && !audio.muted && !audio.error;
    toggle.setAttribute("aria-pressed", String(playing));
    toggle.title = playing || pending ? "Turn sound off" : "Turn sound on";
  }

  function stopWaiting() {
    waitingForGesture = false;
    document.removeEventListener("click", resumeOnInteraction);
    document.removeEventListener("keydown", resumeOnInteraction);
  }

  async function playAudio() {
    const currentAttempt = ++attempt;
    pending = true;
    audio.muted = false;
    updateToggle();
    try {
      await audio.play();
      if (currentAttempt !== attempt) return;
      stopWaiting();
      status.textContent = "Background sound on.";
    } catch (error) {
      if (currentAttempt !== attempt) return;
      if (error.name === "NotAllowedError") {
        waitingForGesture = enabled;
        document.addEventListener("click", resumeOnInteraction);
        document.addEventListener("keydown", resumeOnInteraction);
        status.textContent = "Use the speaker button to turn sound on.";
      } else if (error.name !== "AbortError") {
        stopWaiting();
        status.textContent = "Background audio could not be loaded. Tap the speaker to retry.";
      }
    } finally {
      if (currentAttempt === attempt) {
        pending = false;
        updateToggle();
      }
    }
  }

  function resumeOnInteraction(event) {
    if (!waitingForGesture || !enabled || pending || toggle.contains(event.target)) return;
    if (event.type === "keydown" && (event.repeat || !["Enter", " "].includes(event.key))) return;
    playAudio();
  }

  toggle.addEventListener("click", () => {
    stopWaiting();
    enabled = !(pending || (!audio.paused && !audio.muted));
    try {
      localStorage.setItem(preferenceKey, enabled ? "on" : "off");
    } catch (_) { /* Keep this visit's preference in memory. */ }

    if (enabled) {
      if (audio.error) audio.load();
      playAudio();
    } else {
      ++attempt; // Ignore any older play promise that is still settling.
      pending = false;
      audio.pause();
      status.textContent = "Background sound off.";
      updateToggle();
    }
  });

  ["playing", "pause", "volumechange", "error"].forEach(event => {
    audio.addEventListener(event, updateToggle);
  });
  updateToggle();
  if (enabled) playAudio();
})();

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
