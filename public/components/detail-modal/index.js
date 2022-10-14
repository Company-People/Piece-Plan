import Modal from './Modal.js';
// import reconciliation from '../../libs/diff.js';
import render from '../../libs/render.js';

// const $root = document.getElementById('root');

// const render = Component => {
//   const $virtual = $root.cloneNode();
//   const domString = new Component().render();
//   $virtual.innerHTML = domString;

//   reconciliation($root, $virtual);
// };

render(Modal);
