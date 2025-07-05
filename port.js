// Portfolio Carousel Functionality
const carousel = document.getElementById('portfolioCarousel');
const slides = carousel ? carousel.getElementsByClassName('portfolio-slide') : [];
const prevBtn = document.getElementById('portfolioPrevBtn');
const nextBtn = document.getElementById('portfolioNextBtn');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;

function showSlide(index) {
  if (!carousel || slides.length === 0) return;
  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  carousel.style.transform = `translateX(-${index * 100}vw)`;
  currentSlide = index;
  // Update indicators
  indicators.forEach((ind, i) => {
    if (i === index) {
      ind.classList.add('active');
    } else {
      ind.classList.remove('active');
    }
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
}
if (nextBtn) {
  nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
}
indicators.forEach((ind, i) => {
  ind.addEventListener('click', () => showSlide(i));
});

// Touch swipe support for mobile
let startX = null;
if (carousel) {
  carousel.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
  });
  carousel.addEventListener('touchend', function(e) {
    if (startX === null) return;
    let endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
      showSlide(currentSlide - 1);
    } else if (startX - endX > 50) {
      showSlide(currentSlide + 1);
    }
    startX = null;
  });
}

// Initialize
showSlide(0);
