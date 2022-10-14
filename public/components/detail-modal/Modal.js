import Component from '../../core/Component.js';
import Daily from './js/Daily.js';
import Detail from './js/Detail.js';

class Modal extends Component {
  render() {
    console.log(this.props);
    if (this.props.selectedDate === undefined) return '';

    // this.state = this.props;
    // console.log(this.state);

    // const targetPiece = this.filterPieces();
    // console.log(targetPiece);

    const daily = new Daily({
      ...this.props,
      closeDailyModal: this.closeDailyModal.bind(this),
      openDetailModal: this.openDetailModal.bind(this),
      closeDetailModal: this.closeDetailModal.bind(this),
      goToEditPage: this.goToEditPage.bind(this),
    }).render();
    const detail = new Detail(this.props).render();

    // prittier-ignore
    return `
      <div class="modal-bg"></div>
      <div class="modal moving">
        ${daily}
        ${detail}
      </div>
      `;
  }

  filterPieces(target) {
    const targetId = target.dataset.pieceId;

    const targetPiece = this.props.pieces.find(({ pieceId }) => pieceId === targetId);

    console.log(targetPiece);
    this.setState({ targetPiece });
  }

  openDetailModal({ target }) {
    if (!target.matches('.piece-plan')) return;

    this.filterPieces(target);

    const $modal = document.querySelector('.modal');
    $modal?.classList.add('moving');
  }

  closeDailyModal({ target }) {
    if (target.matches('.daily > .btn-close') || target.matches('.btn-cancel') || !target.closest('.modal')) {
      document.querySelector('.modal')?.classList.add('hidden');
      document.querySelector('.modal-bg')?.classList.add('hidden');
    }
  }

  closeDetailModal({ target }) {
    if (!target.matches('.daily-plan-container') || !target.matches('.piece > .btn-close')) return;

    const $modal = document.querySelector('.modal');
    $modal?.classList.remove('moving');
  }

  goToEditPage({ target }) {
    if (!target.matches('.btn-edit')) return;

    window.history.pushState(null, null, `/plan/${this.props.selectedDate}`);
  }
}

export default Modal;
