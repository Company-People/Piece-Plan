import Component from '../../core/Component.js';

class Daily extends Component {
  render() {
    const TIME_COUNT = 25;
    const PLAN_HEIGHT = 48;

    const pieces = this.props.filteredPlan ? this.props.filteredPlan.pieces : '';
    const [yy, mm, dd] = this.props.selectedDate.split('-');

    // prettier-ignore
    return `
      <section class="daily">
        <h2 class="daily-date text-gradient">${yy}. ${mm.padStart(2, '0')}. ${dd.padStart(2, '0')}</h2>
        <div class="daily-plan-wrapper">
          <div class="daily-plan">
            ${Array.from({length: TIME_COUNT}).map((_, index) => `
            <span class="daily-time">${index < 12 ? '오전' : '오후'} ${index % 12 === 0 ? '12' : index % 12}시</span>
            <div data-time="${index}" class="daily-plan-container">
              ${!pieces ? '' : pieces.map(piece => {
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

  setEvent() {
    const { closeDailyModal, openDetailModal, closeDetailModal, goEditPage } = this.props;

    return [
      {
        type: 'click',
        selector: '.daily',
        handler: closeDailyModal,
      },
      {
        type: 'click',
        selector: '.piece-plan',
        handler: openDetailModal,
      },
      {
        type: 'click',
        selector: '.daily-plan-container',
        handler: closeDetailModal,
      },
      {
        type: 'click',
        selector: '.btn-edit',
        handler: goEditPage,
      },
    ];
  }
}

export default Daily;
