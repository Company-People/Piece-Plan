import Component from '../../../core/Component.js';

class Daily extends Component {
  render() {
    const TIME_COUNT = 24;
    const PLAN_HEIGHT = 48;

    const [{ pieces, date }] = this.props.plan;
    const [yy, mm, dd] = date.split('-');

    // prettier-ignore
    return `
      <section class="daily">
        <h2 class="daily-date text-gradient">${yy.slice(-2)}. ${mm.padStart(2, '0')}. ${dd.padStart(2, '0')}</h2>
        <div class="daily-plan-wrapper">
          <div class="daily-plan">
            ${Array.from({length: TIME_COUNT}).map((_, index) => `
            <span class="daily-time">${index / 12 < 1 ? '오전' : '오후'} ${index % 12 === 0 ? '12' : index}시</span>
            <div data-time="${index}" class="daily-plan-container">
              ${pieces.map(piece => {
                const { pieceId, title, category, startTime, endTime} = piece;
                return index === startTime ? `<div data-piece-id="${pieceId}" class="piece-plan ${category}" style="height: ${PLAN_HEIGHT * (endTime - startTime)}px">${title}</div>` : '';
              }).join("")}
            </div>`
            ).join("")}
          </div>
        </div>
        <div class="daily-buttons">
          <button class="btn-edit">편집</button>
          <button class="btn-cancel">취소</button>
        </div>
        <button class="btn-close"></button>
    </section>`
  }

  hideModal({ target }) {
    if (target.matches('.daily > .btn-close') || target.matches('.btn-cancel') || !target.closest('.modal')) {
      document.querySelector('.modal')?.classList.add('hidden');
      document.querySelector('.modal-bg')?.classList.add('hidden');
    }
  }

  moveModal({ target }) {
    if (!target.matches('.daily-plan-container')) return;

    const $modal = document.querySelector('.modal');
    $modal?.classList.remove('moving');
  }

  setEvent() {
    return [
      {
        type: 'click',
        selector: '.daily',
        handler: this.hideModal,
      },
      {
        type: 'click',
        selector: '.daily-plan-container',
        handler: this.moveModal,
      },
    ];
  }
}

export default Daily;
