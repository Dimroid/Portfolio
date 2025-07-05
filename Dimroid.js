// Dimroid.js
// Infinite manual scroll for tech stack list (inspired by infiniteCarousel.js, but for horizontal scroll and modern JS)
document.addEventListener('DOMContentLoaded', function() {
  const techStack = document.querySelector('.tech-stack-list');
  if (!techStack) return;

  // Duplicate the spans to allow seamless looping
  techStack.innerHTML += techStack.innerHTML;

  // Set initial scroll position to the start of the first set
  techStack.scrollLeft = techStack.scrollWidth / 2 - techStack.offsetWidth / 2;

  techStack.addEventListener('scroll', function() {
    const scrollLeft = techStack.scrollLeft;
    const scrollWidth = techStack.scrollWidth;
    const visibleWidth = techStack.offsetWidth;
    const half = scrollWidth / 2;

    // If scrolled to (or past) the end of the first set, reset to the start
    if (scrollLeft < half - visibleWidth) {
      if (scrollLeft <= 0) {
        techStack.scrollLeft = half;
      }
    }
    // If scrolled to (or past) the start of the second set, reset to the end
    else if (scrollLeft >= half) {
      techStack.scrollLeft = scrollLeft - half;
    }
  });

  // Auto-scroll logic
  let autoScroll = true;
  let scrollSpeed = 2; // pixels per frame
  let rafId;

  function autoScrollFn() {
    if (!autoScroll) return;
    techStack.scrollLeft += scrollSpeed;
    // Loop logic (same as manual scroll)
    const scrollLeft = techStack.scrollLeft;
    const scrollWidth = techStack.scrollWidth;
    const visibleWidth = techStack.offsetWidth;
    const half = scrollWidth / 2;
    if (scrollLeft < half - visibleWidth) {
      if (scrollLeft <= 0) {
        techStack.scrollLeft = half;
      }
    } else if (scrollLeft >= half) {
      techStack.scrollLeft = scrollLeft - half;
    }
    rafId = requestAnimationFrame(autoScrollFn);
  }

  // Start auto-scroll
  autoScrollFn();

  // Optional: Pause on hover
  techStack.addEventListener('mouseenter', function() {
    autoScroll = false;
    cancelAnimationFrame(rafId);
  });
  techStack.addEventListener('mouseleave', function() {
    if (!autoScroll) {
      autoScroll = true;
      autoScrollFn();
    }
  });
});

// Smooth scroll for navbar links
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.navbar-links a, .navbar-cta').forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
});

// Carousel functionality for services section
class ServiceCarousel {
  constructor() {
    this.track = document.getElementById('servicesCarousel');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.cards = this.track ? this.track.querySelectorAll('.service-card') : [];
    this.cardWidth = this.cards[0] ? this.cards[0].offsetWidth + 32 : 432; // card width + gap
    this.currentIndex = 0;
    this.isAnimating = false;
    this.init();
  }

  init() {
    if (!this.track) return;
    this.prevBtn.addEventListener('click', () => this.slidePrev());
    this.nextBtn.addEventListener('click', () => this.slideNext());
    // Pause animation on hover
    this.track.addEventListener('mouseenter', () => {
      this.track.style.animationPlayState = 'paused';
    });
    this.track.addEventListener('mouseleave', () => {
      this.track.style.animationPlayState = 'running';
    });
  }

  slidePrev() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const currentTransform = this.track.style.transform || 'translateX(0px)';
    const currentX = parseInt(currentTransform.match(/translateX\((-?\d+)px\)/)?.[1] || '0');
    const newX = currentX + this.cardWidth;
    this.track.style.animation = 'none';
    this.track.style.transform = `translateX(${newX}px)`;
    setTimeout(() => {
      this.track.style.animation = 'autoScroll 30s linear infinite';
      this.isAnimating = false;
    }, 500);
  }

  slideNext() {
    if (this.isAnimating) return;
    this.isAnimating = true;
    const currentTransform = this.track.style.transform || 'translateX(0px)';
    const currentX = parseInt(currentTransform.match(/translateX\((-?\d+)px\)/)?.[1] || '0');
    const newX = currentX - this.cardWidth;
    this.track.style.animation = 'none';
    this.track.style.transform = `translateX(${newX}px)`;
    setTimeout(() => {
      this.track.style.animation = 'autoScroll 30s linear infinite';
      this.isAnimating = false;
    }, 500);
  }
}
// Initialize carousel
new ServiceCarousel();

// Fade out after 7s, fade in after 4s delay, repeat forever
window.addEventListener('DOMContentLoaded', function() {
  var glassBg = document.querySelector('.hero-image-glass-bg');
  if (glassBg) {
    glassBg.classList.add('fade-in'); // Ensure initial state
    function fadeLoop() {
      setTimeout(function() {
        glassBg.classList.add('fade-out');
        glassBg.classList.remove('fade-in');
        setTimeout(function() {
          glassBg.classList.remove('fade-out');
          glassBg.classList.add('fade-in');
          fadeLoop(); // repeat
        }, 3000); // 4s after fade out
      }, 2000); // 4s after fade in
    }
    fadeLoop();
  }
});
