// United Cooling & Refrigeration: small page behaviours. No dependencies, no build step.
// The page works without this file; it only adds two conveniences.

(function () {
  // Keep the footer copyright year current.
  var year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // On phones, show the "Call" bar at the bottom of the screen once the call
  // button in the hero has scrolled out of view, so there is never more than
  // one red call button on screen. (The stylesheet hides the bar on larger screens.)
  var bar = document.getElementById('call-bar');
  var card = document.getElementById('call-card');
  if (!bar || !card) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    bar.classList.add('visible');
    return;
  }

  new IntersectionObserver(function (entries) {
    // Entries arrive oldest first; the last one is the current state.
    bar.classList.toggle('visible', !entries[entries.length - 1].isIntersecting);
  }).observe(card);
})();
