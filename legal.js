// Tab switching functionality
document.addEventListener("DOMContentLoaded", function() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const menuBtn = document.querySelector(".menu-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  // Tab click handlers
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", function() {
      const tabName = this.getAttribute("data-tab");
      
      // Remove active class from all buttons and contents
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      
      // Add active class to clicked button and corresponding content
      this.classList.add("active");
      document.getElementById(tabName).classList.add("active");
      
      // Smooth scroll to content
      document.querySelector(".content-wrapper").scrollIntoView({ behavior: "smooth" });
    });
  });

  // Keyboard navigation for tabs (Arrow keys)
  document.addEventListener("keydown", function(e) {
    const activeTab = document.querySelector(".tab-btn.active");
    if (!activeTab) return;

    let nextTab;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      nextTab = activeTab.nextElementSibling;
      if (!nextTab || !nextTab.classList.contains("tab-btn")) {
        nextTab = tabButtons[0];
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      nextTab = activeTab.previousElementSibling;
      if (!nextTab || !nextTab.classList.contains("tab-btn")) {
        nextTab = tabButtons[tabButtons.length - 1];
      }
    }

    if (nextTab && nextTab.classList.contains("tab-btn")) {
      nextTab.click();
    }
  });

  // Mobile menu toggle
  if (menuBtn) {
    menuBtn.addEventListener("click", function() {
      this.classList.toggle("active");
      mobileMenu.classList.toggle("open");
    });
  }

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll(".mobile-menu a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", function() {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe legal sections
  document.querySelectorAll(".legal-section").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });

  // Set first tab as active on page load
  if (tabButtons.length > 0) {
    tabButtons[0].click();
  }

  // Print-friendly styles
  if (window.matchMedia) {
    const mediaQueryList = window.matchMedia("print");
    mediaQueryList.addListener(function(mql) {
      if (mql.matches) {
        document.querySelector("header").style.display = "none";
        document.querySelector(".site-footer").style.display = "none";
      }
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function(e) {
    if (!e.target.closest("header")) {
      menuBtn.classList.remove("active");
      mobileMenu.classList.remove("open");
    }
  });
});
