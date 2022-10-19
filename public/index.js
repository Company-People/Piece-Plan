import render from './libs/render.js';

window.addEventListener('popstate', () => render());
window.addEventListener('DOMContentLoaded', () => render());
