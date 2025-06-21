document.addEventListener("DOMContentLoaded", function() {
  const animated = document.querySelectorAll('.animate');
  animated.forEach(el => {
    let delay = el.getAttribute('data-delay');
    setTimeout(() => { el.classList.add('visible'); }, delay ? parseFloat(delay)*1000 : 0);
  });
});
