// Hamburger menu toggle for mobile
const hamburger = document.getElementById('navbarHamburger');
const mobileMenu = document.getElementById('navbarMobileMenu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.style.display = 'none';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    if (mobileMenu.style.display === 'block') {
      mobileMenu.style.display = 'none';
    } else {
      mobileMenu.style.display = 'block';
    }
  });
  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  // Hide menu if window resized to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });
}
