// Back to top button functionality
document.addEventListener('DOMContentLoaded', function() {
  const backToTopBtn = document.getElementById('back-to-top');
  const linksNav = document.querySelector('.links');

  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (linksNav) {
      const linksBottom = linksNav.getBoundingClientRect().bottom;

      // Show button when scrolled past the links navigation
      if (linksBottom < 0) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
