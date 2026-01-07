// ===================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ===== NAVIGATION =====
  const header = document.getElementById("header");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navLinksContainer = document.getElementById("navLinks");

  // Header scroll effect
  let lastScroll = 0;
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-times");
    });
  }

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        navLinksContainer.classList.remove("active");
        const icon = mobileMenuToggle?.querySelector("i");
        if (icon) {
          icon.classList.add("fa-bars");
          icon.classList.remove("fa-times");
        }
      }
    });
  });

  // Active section highlighting
  const sections = document.querySelectorAll(".section");

  function updateActiveLink() {
    const scrollPosition = window.pageYOffset + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveLink);

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate skill bars when they come into view
        if (entry.target.classList.contains("skill-category")) {
          const skillBars = entry.target.querySelectorAll(".skill-progress");
          skillBars.forEach((bar) => {
            bar.classList.add("animate");
          });
        }
      }
    });
  }, observerOptions);

  // Observe all fade-in elements
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => observer.observe(element));

  // ===== BACK TO TOP BUTTON =====
  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  });

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ===== PROJECT CARDS INTERACTION =====
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Add a subtle pulse effect
      card.style.transform = "scale(0.98)";
      setTimeout(() => {
        card.style.transform = "";
      }, 100);

      // You can add modal functionality here if needed
      // For now, it just provides visual feedback
    });
  });

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !message) {
        showNotification("Please fill in all fields", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address", "error");
        return;
      }

      // Show success message
      showNotification(
        "Thank you for your message! I'll get back to you soon.",
        "success"
      );

      // Reset form
      contactForm.reset();

      // In a real application, you would send this data to a server
      console.log("Form submitted:", { name, email, message });
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Notification system
  function showNotification(message, type = "success") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: ${
              type === "success"
                ? "linear-gradient(135deg, #00D9FF, #00A8CC)"
                : "linear-gradient(135deg, #FF6B6B, #E85555)"
            };
            color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-family: var(--font-body);
            font-weight: 500;
        `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  // Add notification animations to CSS dynamically
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);

  // ===== LAZY LOADING IMAGES =====
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // ===== TYPING EFFECT FOR HERO TAGLINE (Optional Enhancement) =====
  const tagline = document.querySelector(".hero-tagline");
  if (tagline) {
    const originalText = tagline.textContent;
    tagline.textContent = "";
    let charIndex = 0;

    function typeText() {
      if (charIndex < originalText.length) {
        tagline.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50);
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeText, 500);
  }

  // ===== PARALLAX EFFECT FOR HERO SECTION =====
  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    if (hero && scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });

  // ===== CURSOR TRAIL EFFECT (Optional - Premium Touch) =====
  let cursorTrail = [];
  const trailLength = 10;

  document.addEventListener("mousemove", (e) => {
    // Only on desktop
    if (window.innerWidth > 768) {
      cursorTrail.push({ x: e.clientX, y: e.clientY });

      if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
      }
    }
  });

  // ===== PERFORMANCE OPTIMIZATION =====
  // Debounce function for scroll events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to scroll-heavy functions
  const debouncedUpdateActiveLink = debounce(updateActiveLink, 100);
  window.removeEventListener("scroll", updateActiveLink);
  window.addEventListener("scroll", debouncedUpdateActiveLink);

  // ===== CONSOLE MESSAGE =====
  console.log(
    "%c👋 Welcome to Ashhar Shaikh's Portfolio!",
    "color: #00D9FF; font-size: 20px; font-weight: bold;"
  );
  console.log(
    "%cLooking for a talented sports copywriter? Let's connect!",
    "color: #FF6B6B; font-size: 14px;"
  );
});

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to element
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    const headerHeight = document.getElementById("header").offsetHeight;
    const targetPosition = element.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get scroll percentage
function getScrollPercentage() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  return (scrollTop / scrollHeight) * 100;
}
