import Component from '../../core/Component.js';
import Daily from './js/Daily.js';
import Detail from './js/Detail.js';

class Modal extends Component {
  async render() {
    const { data } = await axios.get('/calender');
    this.state = { ...this.state, pieces: data.pieces, plan: data.plans };
    const daily = new Daily(this.state).render();
    const detail = new Detail(this.state).render();

    // prittier-ignore
    return `
      <div class="modal-bg"></div>
      <div class="modal">
        ${daily}
        ${detail}
      </div>
      `;
  }

  filterPieces(target) {
    const targetId = target.dataset.pieceId;

    const targetPiece = this.state.pieces.find(({ pieceId }) => pieceId === +targetId);

    this.setState({ targetPiece });
    console.log(this.state);
  }

  openPieceDetail({ target }) {
    if (!target.matches('.piece-plan')) return;

    this.filterPieces(target);

    const $modal = document.querySelector('.modal');
    $modal?.classList.add('moving');
  }

  setEvent() {
    return [
      {
        type: 'click',
        selector: '.piece-plan',
        handler: this.openPieceDetail.bind(this),
      },
    ];
  }
}

export default Modal;
