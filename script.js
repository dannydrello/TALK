<<<<<<< HEAD

  // ===============================
// NAV BEHAVIOR
// ===============================

// Grab elements
const sections = document.querySelectorAll("section");
const nav = document.querySelector(".bottom-nav");
const navItems = document.querySelectorAll(".bottom-nav .nav-item");

// Detect first section dynamically
const firstSection = sections[0];

// Move nav to top after leaving first section
window.addEventListener("scroll", () => {
  if (window.scrollY > firstSection.offsetHeight - 100) {
    nav.classList.add("fixed");
  } else {
    nav.classList.remove("fixed");
  }

  // Highlight active section
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
});

// Smooth scroll on nav clicks
navItems.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===============================
// FEATURE ANIMATIONS
// ===============================

const features = document.querySelectorAll(".feature");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.3 }
);

features.forEach(feature => observer.observe(feature));

// ===============================
// TALK HORIZON CAROUSEL
// ===============================


const talkCarousel = document.querySelector("#talk .carousel");
if (talkCarousel) {
  const talkImages = talkCarousel.querySelectorAll("img");

  let startIndex = 0;
  const visibleCount = 3;
  const intervalTime = 4000; // 4s per set

  function showCarouselImages() {
    // Reset all
    talkImages.forEach(img => img.classList.remove("active"));

    // Show next set of 3
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % talkImages.length;
      talkImages[index].classList.add("active");
    }

    // Move to next set
    startIndex += visibleCount;
    if (startIndex >= talkImages.length) {
      startIndex = 0;
    }
  }

  // Start rotation
  showCarouselImages();
  setInterval(showCarouselImages, intervalTime);
}




=======

  // ===============================
// NAV BEHAVIOR
// ===============================

// Grab elements
const sections = document.querySelectorAll("section");
const nav = document.querySelector(".bottom-nav");
const navItems = document.querySelectorAll(".bottom-nav .nav-item");

// Detect first section dynamically
const firstSection = sections[0];

// Move nav to top after leaving first section
window.addEventListener("scroll", () => {
  if (window.scrollY > firstSection.offsetHeight - 100) {
    nav.classList.add("fixed");
  } else {
    nav.classList.remove("fixed");
  }

  // Highlight active section
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;
    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("href") === `#${current}`) {
      item.classList.add("active");
    }
  });
});

// Smooth scroll on nav clicks
navItems.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ===============================
// FEATURE ANIMATIONS
// ===============================

const features = document.querySelectorAll(".feature");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.3 }
);

features.forEach(feature => observer.observe(feature));

// ===============================
// TALK HORIZON CAROUSEL
// ===============================


const talkCarousel = document.querySelector("#talk .carousel");
if (talkCarousel) {
  const talkImages = talkCarousel.querySelectorAll("img");

  let startIndex = 0;
  const visibleCount = 3;
  const intervalTime = 4000; // 4s per set

  function showCarouselImages() {
    // Reset all
    talkImages.forEach(img => img.classList.remove("active"));

    // Show next set of 3
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % talkImages.length;
      talkImages[index].classList.add("active");
    }

    // Move to next set
    startIndex += visibleCount;
    if (startIndex >= talkImages.length) {
      startIndex = 0;
    }
  }

  // Start rotation
  showCarouselImages();
  setInterval(showCarouselImages, intervalTime);
}




>>>>>>> 6c37d284f8d9c3100369f1c99c34e3237cbb085f
