import PieceAdd from './PieceAdd.js';

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('body').replaceChild(new PieceAdd().render(), document.querySelector('#root'))
  console.log(11)
});
