/**
 * KAT Infra and Developers — Gummidipoondi
 * High-End Apple-Grade Interaction Logic & GSAP Scroll Animations
 */

// Immediate Scroll Reset: Force start at Hero on reload or link click
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('pageshow', (event) => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {
  // Always start at Hero on initial arrival or reload
  window.scrollTo(0, 0);

  // If page was loaded with a deep-link hash on initial arrival, clear it to start at Hero
  if (window.location.hash) {
    try {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    } catch (e) {}
    window.scrollTo(0, 0);
  }

  initMobileNav();
  initHeaderScroll();
  initContactForm();
  initSmoothScroll();
  initDitheredFooter();
  initPreloader(() => {
    window.scrollTo(0, 0);
    initGsapAnimations();
  });
});

// Site Video Preloader Controller
function initPreloader(onComplete) {
  const preloader = document.getElementById('site-preloader');
  const video = document.getElementById('preloader-video');
  const progressBar = document.getElementById('preloader-progress');
  const skipBtn = document.getElementById('preloader-skip');

  if (!preloader) {
    window.scrollTo(0, 0);
    if (typeof onComplete === 'function') onComplete();
    return;
  }

  let dismissed = false;

  function dismissPreloader() {
    if (dismissed) return;
    dismissed = true;
    window.scrollTo(0, 0);
    preloader.classList.add('fade-out');

    if (video) {
      setTimeout(() => {
        try { video.pause(); } catch (err) {}
      }, 700);
    }

    if (typeof onComplete === 'function') {
      setTimeout(() => {
        window.scrollTo(0, 0);
        onComplete();
      }, 200);
    }
  }

  if (skipBtn) {
    skipBtn.addEventListener('click', dismissPreloader);
  }

  if (video) {
    // Attempt playback
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback for browsers that block muted autoplay
        setTimeout(dismissPreloader, 1500);
      });
    }

    video.addEventListener('timeupdate', () => {
      // Let loading animation run for 10 seconds as requested
      const targetDuration = 10.0;
      const progress = Math.min(100, Math.round((video.currentTime / targetDuration) * 100));
      if (progressBar) progressBar.style.width = String(progress) + '%';

      if (video.currentTime >= 9.9) {
        dismissPreloader();
      }
    });

    video.addEventListener('ended', dismissPreloader);
  }

  // Safety maximum fallback: auto-dismiss after 10.3s
  setTimeout(dismissPreloader, 10300);
}

// Mobile Navigation Toggle
function initMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('is-open');
  });

  // Close menu when clicking links
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

// Header Scroll Elevation
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.borderBottomColor = 'rgba(0, 0, 0, 0.12)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.04)';
    } else {
      header.style.borderBottomColor = 'rgba(0, 0, 0, 0.08)';
      header.style.boxShadow = 'none';
    }
  }, { passive: true });
}

// GSAP + ScrollTrigger Apple-Grade Scroll Animations
function initGsapAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded, falling back to standard view.');
    return;
  }

  // Register plugin
  gsap.registerPlugin(ScrollTrigger);

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }

  const isMobile = window.innerWidth <= 768;
  const xOffset = isMobile ? 32 : 80;

  // 1. Hero Load Entrance Timeline
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (document.querySelector('.hero-tagline')) {
    heroTl.from('.hero-tagline', {
      y: -20,
      opacity: 0,
      duration: 0.7,
      delay: 0.1
    });
  }

  if (document.querySelector('.hero-title')) {
    heroTl.from('.hero-title', {
      y: 40,
      opacity: 0,
      duration: 0.9
    }, '-=0.4');
  }

  if (document.querySelector('.hero-lead')) {
    heroTl.from('.hero-lead', {
      y: 25,
      opacity: 0,
      duration: 0.8
    }, '-=0.5');
  }

  if (document.querySelector('.hero-actions')) {
    heroTl.from('.hero-actions .btn-apple-primary, .hero-actions .btn-apple-secondary', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12
    }, '-=0.4');
  }

  if (document.querySelector('.hero-showcase')) {
    heroTl.from('.hero-showcase', {
      scale: 0.96,
      y: 30,
      opacity: 0,
      duration: 1.1,
      ease: 'power2.out'
    }, '-=0.5');

    // Subtle parallax scrub on hero showcase
    gsap.to('.hero-showcase img', {
      scrollTrigger: {
        trigger: '.hero-showcase',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      },
      yPercent: 10,
      ease: 'none'
    });
  }

  if (document.querySelector('.metrics-strip')) {
    heroTl.from('.metric-card', {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.6');
  }

  // 2. Section Headers Entrance (Vertical Slide & Fade)
  gsap.utils.toArray('.section-head').forEach((head) => {
    gsap.from(head, {
      scrollTrigger: {
        trigger: head,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 35,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });
  });

  // 3. Core Civil Service Features (Alternating Horizontal Slides)
  gsap.utils.toArray('.service-feature').forEach((feature) => {
    const isReverse = feature.classList.contains('reverse');
    const media = feature.querySelector('.service-media');
    const content = feature.querySelector('.service-content');

    if (media && content) {
      // Normal card: media from left, content from right
      // Reverse card: media from right, content from left
      const mediaX = isReverse ? xOffset : -xOffset;
      const contentX = isReverse ? -xOffset : xOffset;

      gsap.from(media, {
        scrollTrigger: {
          trigger: feature,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        },
        x: mediaX,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out'
      });

      gsap.from(content, {
        scrollTrigger: {
          trigger: feature,
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        },
        x: contentX,
        opacity: 0,
        duration: 0.95,
        delay: 0.1,
        ease: 'power3.out'
      });
    }
  });

  // 4. FAQ Cards (Smooth Staggered Rise)
  gsap.utils.toArray('.faq-card').forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      y: 25,
      opacity: 0,
      duration: 0.6,
      delay: index * 0.08,
      ease: 'power2.out'
    });
  });

  // 5. Fleet Inventory Box (Smooth Vertical Rise)
  if (document.querySelector('.fleet-box')) {
    gsap.from('.fleet-box', {
      scrollTrigger: {
        trigger: '.fleet-box',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 45,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });
  }

  // 6. South India Village Showcase Cards (Alternating Horizontal & Vertical Reveal)
  gsap.utils.toArray('.village-card').forEach((card, index) => {
    const fromLeft = index % 2 === 0;
    const cardX = fromLeft ? -xOffset : xOffset;

    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      x: isMobile ? 0 : cardX,
      y: isMobile ? 40 : 20,
      opacity: 0,
      duration: 0.85,
      ease: 'power3.out'
    });
  });

  // 7. Leadership Profile & Corporate Credentials (Aligned Symmetrical Entrances)
  if (document.querySelector('.leadership-profile-card')) {
    const portraitCol = document.querySelector('.leadership-portrait-col');
    const contentCol = document.querySelector('.leadership-content-col');

    if (portraitCol) {
      gsap.from(portraitCol, {
        scrollTrigger: {
          trigger: '.leadership-profile-card',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        },
        x: -xOffset,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out'
      });
    }

    if (contentCol) {
      gsap.from(contentCol, {
        scrollTrigger: {
          trigger: '.leadership-profile-card',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        },
        x: xOffset,
        opacity: 0,
        duration: 0.95,
        delay: 0.1,
        ease: 'power3.out'
      });
    }
  }

  // Corporate Credentials Grid Stagger
  if (document.querySelector('.corporate-credentials-grid')) {
    gsap.from('.credential-box', {
      scrollTrigger: {
        trigger: '.corporate-credentials-grid',
        start: 'top 88%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }

  // 8. Contact Section (Location Card from Left, Form Card from Right)
  if (document.querySelector('.contact-grid')) {
    const locationPanel = document.querySelector('.contact-details-panel');
    const formCard = document.querySelector('.apple-form-card');

    if (locationPanel) {
      gsap.from(locationPanel, {
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        },
        x: -xOffset,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    if (formCard) {
      gsap.from(formCard, {
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 82%',
          toggleActions: 'play none none reverse'
        },
        x: xOffset,
        opacity: 0,
        duration: 0.9,
        delay: 0.1,
        ease: 'power3.out'
      });
    }
  }
}

// Contact Form Validation & Submission
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  // Quick Select Category Chips
  const chips = document.querySelectorAll('.form-chip');
  const selectEl = document.getElementById('interest');
  if (chips.length && selectEl) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const val = chip.getAttribute('data-val');
        selectEl.value = val;
        selectEl.setAttribute('aria-invalid', 'false');
        const err = document.getElementById('error-interest');
        if (err) err.textContent = '';
      });
    });

    selectEl.addEventListener('change', () => {
      chips.forEach(c => {
        if (c.getAttribute('data-val') === selectEl.value) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[\d\s+\-()]{7,}$/;

  function validateInput(input) {
    const id = input.id;
    const errorEl = document.getElementById(`error-${id}`);
    let errorMsg = '';

    if (input.hasAttribute('required') && !input.value.trim()) {
      errorMsg = 'This field is required.';
    } else if (input.type === 'email' && input.value.trim() && !emailRegex.test(input.value.trim())) {
      errorMsg = 'Please enter a valid email address.';
    } else if (input.type === 'tel' && input.value.trim() && !phoneRegex.test(input.value.trim())) {
      errorMsg = 'Please enter a valid phone number.';
    }

    if (errorMsg) {
      input.setAttribute('aria-invalid', 'true');
      if (errorEl) errorEl.textContent = errorMsg;
      return false;
    } else {
      input.setAttribute('aria-invalid', 'false');
      if (errorEl) errorEl.textContent = '';
      return true;
    }
  }

  // Real-time listener
  form.querySelectorAll('input, select, textarea').forEach(field => {
    field.addEventListener('blur', () => validateInput(field));
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        validateInput(field);
      }
    });
  });

  // Submit Handler
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = form.querySelectorAll('input, select, textarea');
    let hasError = false;

    fields.forEach(field => {
      if (!validateInput(field)) {
        hasError = true;
      }
    });

    if (hasError) {
      feedback.textContent = 'Please complete the highlighted required fields above.';
      feedback.className = 'form-feedback error';
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting to KAT Towers Headquarters...';
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    try {
      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 800));

      feedback.textContent = 'Thank you. Your inquiry has been received at KAT Towers, Gummidipoondi. Mr. T. Vinayaga Perumal\'s office will connect with you promptly.';
      feedback.className = 'form-feedback success';
      form.reset();
      fields.forEach(f => {
        f.removeAttribute('aria-invalid');
        const err = document.getElementById(`error-${f.id}`);
        if (err) err.textContent = '';
      });
    } catch (err) {
      feedback.textContent = 'Unable to transmit inquiry right now. Please call us directly at +91 98405 09896.';
      feedback.className = 'form-feedback error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Smooth Anchor Scrolling with Native Smooth Behavior
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#hero') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = 60;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Dithered Footer Interactive Spotlight & Controls
function initDitheredFooter() {
  const band = document.getElementById('df-band');
  const field = document.getElementById('df-field');
  let frame = 0;

  if (band && field) {
    band.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const r = field.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        field.style.setProperty('--df-x', `${x}px`);
        field.style.setProperty('--df-y', `${y}px`);
        field.classList.add('df-lit');
      });
    });

    band.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      field.classList.remove('df-lit');
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById('df-back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Subscribe form
  const subForm = document.getElementById('df-subscribe-form');
  const subStatus = document.getElementById('df-subscribe-status');
  if (subForm && subStatus) {
    subForm.addEventListener('submit', (e) => {
      e.preventDefault();
      subStatus.textContent = "Thank you. You're subscribed for official project bulletins.";
      subStatus.style.color = 'var(--color-accent)';
      subForm.reset();
    });
  }
}
