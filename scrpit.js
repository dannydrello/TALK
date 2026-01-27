// SECTION ANIMATION
const sections = document.querySelectorAll(".feature");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.25 }
);

sections.forEach(section => {
  section.classList.add("animate");
  observer.observe(section);
});

// MOBILE MENU TOGGLE
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  // Close menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest("header")) {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("open");
    }
  });
}

// CAROUSEL FUNCTIONALITY - ENDLESS MOVING WITH 3 SEPARATE IMAGES
const carousel = document.querySelector(".carousel");
const carouselContainer = document.querySelector(".carousel-container");

if (carousel && carouselContainer) {
  let currentIndex = 0;
  const totalOriginalImages = 5; // Number of original images
  const imageWidth = 33.333; // Width in percentage for 3 images
  const gap = 2; // Gap adjustment in percentage
  const itemWidth = imageWidth + gap; // Total width per item movement
  const autoScrollInterval = 4000; // Auto scroll every 4 seconds

  const updateCarousel = () => {
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
  };

  const scrollNext = () => {
    currentIndex++;
    updateCarousel();

    // Reset to beginning when we reach the duplicated section
    if (currentIndex >= totalOriginalImages) {
      setTimeout(() => {
        carousel.style.transition = "none";
        currentIndex = 0;
        updateCarousel();
        setTimeout(() => {
          carousel.style.transition = "transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        }, 50);
      }, 800);
    }
  };

  // Auto scroll
  setInterval(scrollNext, autoScrollInterval);
}
