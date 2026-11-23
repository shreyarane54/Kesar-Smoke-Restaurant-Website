(() => {
  const hero = document.querySelector('.ks-hero');
  if (!hero) return;
  hero.addEventListener('focusin', () => hero.classList.add('interaction-ready'), { once: true });
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!preference.matches) hero.classList.add('is-entering');
  preference.addEventListener('change', event => {
    if (event.matches) hero.classList.remove('is-entering');
  });
  // Pause decorative motion when it cannot be seen; never replay the entrance.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      hero.classList.toggle('motion-paused', !entries[0].isIntersecting);
    });
    observer.observe(hero);
  }
})();

