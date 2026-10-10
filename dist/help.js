// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function() {
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

  // FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll(".faq-question");
  
  faqQuestions.forEach(question => {
    question.addEventListener("click", function() {
      const faqItem = this.parentElement;
      const isActive = faqItem.classList.contains("active");
      
      // Close all open FAQs
      document.querySelectorAll(".faq-item.active").forEach(item => {
        if (item !== faqItem) {
          item.classList.remove("active");
        }
      });
      
      // Toggle current FAQ
      faqItem.classList.toggle("active");
    });
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      // Get form data
      const name = this.querySelector("input[type='text']").value;
      const submitBtn = this.querySelector("button[type='submit']");
      const originalText = submitBtn.textContent;
      
      // Show loading state
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";
      
      // Show success message after form is submitted via FormSubmit
      setTimeout(() => {
        submitBtn.textContent = "Message Sent!";
        submitBtn.style.background = "linear-gradient(135deg, #10b981 0%, #059669 100%)";
        
        // Reset form
        this.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
          submitBtn.style.opacity = "1";
        }, 3000);
      }, 1000);
    });
  }

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("keyup", function(e) {
      const searchTerm = this.value.toLowerCase();
      
      if (searchTerm.length > 0) {
        const faqItems = document.querySelectorAll(".faq-item");
        
        faqItems.forEach(item => {
          const question = item.querySelector(".faq-question span").textContent.toLowerCase();
          const answer = item.querySelector(".faq-answer p").textContent.toLowerCase();
          
          if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = "block";
            item.style.animation = "fadeIn 0.3s ease-out";
          } else {
            item.style.display = "none";
          }
        });
      } else {
        document.querySelectorAll(".faq-item").forEach(item => {
          item.style.display = "block";
        });
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const href = this.getAttribute("href");
      if (href !== "#") {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll(".link-card, .faq-item").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    observer.observe(el);
  });
});
