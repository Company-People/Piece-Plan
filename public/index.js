import render from './libs/render.js';

window.addEventListener('click', e => {
  if (!e.target.matches('.tmp')) return;

  e.preventDefault();

  const path = e.target.getAttribute('href');
  window.history.pushState(null, null, path);
  render(path);
});

window.addEventListener('popstate', () => render());

window.addEventListener('DOMContentLoaded', () => render());
