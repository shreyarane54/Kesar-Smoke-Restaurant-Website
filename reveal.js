// Progressive enhancement: content stays visible without JavaScript or motion support.
document.querySelectorAll('[data-menu-link]').forEach(link => {
  link.addEventListener('click', () => showMenu(link.dataset.menuLink));
});
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const targets = document.querySelectorAll('.story > div, .fire-copy, .section-top, .sweet-copy, .photo-crop, .evening-title, .moments article, .reservation > h2, .reservation > .eyebrow');
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });
  targets.forEach((target) => {
    // Only animate content that begins below the viewport.
    if (target.getBoundingClientRect().top > window.innerHeight - 28) {
      target.classList.add('reveal-pending');
      reveal.observe(target);
    }
  });
  const showAll = () => {
    targets.forEach(target => target.classList.add('is-visible'));
    reveal.disconnect();
  };
  motionPreference.addEventListener('change', event => { if (event.matches) showAll(); });
  document.addEventListener('focusin', event => {
    const hiddenParent = event.target.closest('.reveal-pending');
    if (hiddenParent) hiddenParent.classList.add('is-visible');
  });
}
