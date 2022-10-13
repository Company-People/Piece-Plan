import Login from './Login.js';

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').replaceChild(new Login().render(), document.querySelector('#root'))
  console.log(11)
});
