// United Cooling & Refrigeration: small page behaviours. No dependencies, no build step.

(function () {
  // Keep the footer copyright year current.
  var year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Show the "back to top" button once the section navigation has scrolled out of view.
  var button = document.getElementById('back-to-top');
  var nav = document.querySelector('.links');
  if (!button || !nav) {
    return;
  }

  function setVisible(visible) {
    button.classList.toggle('visible', visible);
  }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      var entry = entries[0];
      setVisible(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    }).observe(nav);
  } else {
    window.addEventListener('scroll', function () {
      setVisible(nav.getBoundingClientRect().bottom < 0);
    }, { passive: true });
  }

  button.addEventListener('click', function () {
    // The stylesheet decides whether this scroll is smooth (it is not for reduced-motion users).
    window.scrollTo(0, 0);
  });
})();
