/* ============================================================
   MAIN.JS -- Tinaht Site Interactivity
   Vanilla JS, no dependencies
   ============================================================ */

(function () {
  'use strict';

  // ---- Module 1: Mobile Navigation ----
  const navToggle = document.querySelector('.nav-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  function openDrawer() {
    mobileDrawer.classList.add('is-open');
    drawerOverlay.classList.add('is-visible');
    navToggle.classList.add('is-active');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('is-open');
    drawerOverlay.classList.remove('is-visible');
    navToggle.classList.remove('is-active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobileDrawer.classList.contains('is-open');
      isOpen ? closeDrawer() : openDrawer();
    });
  }

  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeDrawer);
  }

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Close drawer when clicking a link inside it
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ---- Module 2: Header Scroll Effect ----
  const header = document.querySelector('.site-header');
  let lastScrollY = 0;

  function handleHeaderScroll() {
    const scrollY = window.scrollY;
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  // ---- Module 3: Scroll Reveal Animations ----
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    animatedElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything if IntersectionObserver not supported
    animatedElements.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ---- Module 4: Testimonials Carousel ----
  const carousel = document.querySelector('.testimonials-carousel');

  if (carousel) {
    const slides = carousel.querySelectorAll('.testimonial-slide');
    const dots = carousel.querySelectorAll('.testimonial-dot');
    let currentSlide = 0;
    let autoAdvanceTimer = null;

    function goToSlide(index) {
      // Remove active from current
      slides[currentSlide].classList.remove('is-active');
      dots[currentSlide].classList.remove('is-active');
      dots[currentSlide].setAttribute('aria-selected', 'false');

      // Update index
      currentSlide = index;

      // Add active to new
      slides[currentSlide].classList.add('is-active');
      dots[currentSlide].classList.add('is-active');
      dots[currentSlide].setAttribute('aria-selected', 'true');
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      goToSlide(next);
    }

    function startAutoAdvance() {
      autoAdvanceTimer = setInterval(nextSlide, 10000);
    }

    function stopAutoAdvance() {
      if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
      }
    }

    // Dot click handlers
    dots.forEach(function (dot, index) {
      dot.addEventListener('click', function () {
        stopAutoAdvance();
        goToSlide(index);
        startAutoAdvance();
      });
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoAdvance);
    carousel.addEventListener('mouseleave', startAutoAdvance);

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener(
      'touchstart',
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoAdvance();
      },
      { passive: true }
    );

    carousel.addEventListener(
      'touchend',
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            // Swipe left -> next
            goToSlide((currentSlide + 1) % slides.length);
          } else {
            // Swipe right -> prev
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
          }
        }
        startAutoAdvance();
      },
      { passive: true }
    );

    // Keyboard navigation
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        stopAutoAdvance();
        goToSlide((currentSlide - 1 + slides.length) % slides.length);
        startAutoAdvance();
      } else if (e.key === 'ArrowRight') {
        stopAutoAdvance();
        nextSlide();
        startAutoAdvance();
      }
    });

    // Start auto-advance
    startAutoAdvance();

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stopAutoAdvance();
    }
  }

  // ---- Module 5: Active Nav Highlight ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-list-desktop .nav-list a:not(.btn)');

  function highlightNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '/#' + sectionId || link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });

    // If at top of page, highlight Home
    if (scrollY < 300) {
      navLinks.forEach(function (link) {
        link.classList.remove('active');
      });
      const homeLink = document.querySelector('.nav-list-desktop .nav-list a[href="./"]') || document.querySelector('.nav-list-desktop .nav-list a[href="../"]');
      if (homeLink) {
        homeLink.classList.add('active');
      }
    }
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

  // ---- Module 6: Newsletter Form Enhancement ----
  const newsletterForm = document.querySelector('.newsletter-form');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        e.preventDefault();
        showFormFeedback(newsletterForm, 'Please enter a valid email address.', 'error');
        return;
      }

      // If Netlify handles the form, we let it submit normally
      // For local testing, show success message
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        e.preventDefault();
        showFormFeedback(newsletterForm, 'Thanks for subscribing! (Local test)', 'success');
        emailInput.value = '';
      }
    });
  }

  function showFormFeedback(form, message, type) {
    // Remove existing feedback
    const existing = form.querySelector('.newsletter-form__feedback');
    if (existing) existing.remove();

    const feedback = document.createElement('p');
    feedback.className = 'newsletter-form__feedback newsletter-form__feedback--' + type;
    feedback.textContent = message;
    form.appendChild(feedback);

    // Auto-remove after 5 seconds
    setTimeout(function () {
      if (feedback.parentNode) {
        feedback.remove();
      }
    }, 5000);
  }

  // ---- Initialize ----
  // Run header scroll check on load (in case page is already scrolled)
  handleHeaderScroll();
  highlightNav();
})();
