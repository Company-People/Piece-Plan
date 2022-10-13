import Signup from './Signup.js';

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').replaceChild(new Signup().render(), document.querySelector('#root'))
  console.log(11)
});
