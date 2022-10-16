import Component from '../../core/Component.js';
import Daily from './js/Daily.js';
import Detail from './js/Detail.js';

class Modal extends Component {
  render() {
    if (this.props.selectedDate === undefined) return '';

    // this.state = this.props;
    // console.log(this.state);

    // const targetPiece = this.filterPieces();
    // console.log(targetPiece);

    const daily = new Daily({
      ...this.props,
      closeDailyModal: this.closeDailyModal.bind(this),
      openDetailModal: this.openDetailModal.bind(this),
      closeDetailModal: this.closeDetailModal,
      goToEditPage: this.goToEditPage.bind(this),
    }).render();
    const detail = new Detail(this.props).render();

    // prittier-ignore
    return `
      <div class="modal-bg"></div>
      <div class="modal ${!this.props.targetPiece ? '' : 'moving'}">
        ${daily}
        ${detail}
      </div>
      `;
  }

  openDetailModal({ target }) {
    if (!target.matches('.piece-plan')) return;

    this.props.filterPieces(target);
  }

  closeDailyModal({ target }) {
    if (target.matches('.daily > .btn-close') || target.matches('.btn-cancel') || target.matches('.modal-bg')) {
      this.props.resetModalData();

      document.querySelector('.modal')?.classList.add('hidden');
      document.querySelector('.modal-bg')?.classList.add('hidden');
    }
  }

  closeDetailModal({ target }) {
    if (target.matches('.daily-plan-container') || target.matches('.piece > .btn-close')) {
      const $modal = document.querySelector('.modal');
      $modal?.classList.remove('moving');
    }
  }

  goToEditPage({ target }) {
    if (!target.matches('.btn-edit')) return;

    this.changePage(`/plan/${this.props.selectedDate}`);
  }
}

export default Modal;
