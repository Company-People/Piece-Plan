import Component from '../../core/Component.js';

class PlanDaily extends Component {
  render() {
    const [{ pieces }] = this.props.plan.length !== 0 ? this.props.plan : [{}];

    const date = this.props.selectDate;

    const [yy, mm, dd] = date.split('-');

    // prettier-ignore
    return `
    <div class="plan-daily">
      <h2 class="plan-daily-title text-gradient">${yy}. ${mm}. ${dd}</h2>
      <div class="plan-daily-scroll">
      ${Array.from({ length: 25 }).map((_,i) => {
        const piece = pieces?.find(piece => piece.startTime === i);
        const time = piece && piece.endTime - piece.startTime;

        return `
        <div class="plan-daily-time">
          <span class="plan-daily-hour">${i <= 12 ? '오전' : '오후'} ${i % 12 ? i % 12 : 12}시</span>
          <div id="${i}" class="plan-daily-piece">
            ${piece ? `
            <div id="${piece.pieceId}" style="height:${47 * (time || 1)}px" class="plan-daily-link ${piece.category}">
              <p class="plan-daily-piece-title">${piece.title}</p>
              <button class="plan-daily-remove hidden"></button>
            </div>
            ` : ''}
            <button class="plan-daily-add hidden"></button>
          </div>
        </div>
        `}).join('')}
      </div>
      <button class="plan-submit-btn">완료</button>
    </div>
    <button class="plan-cancel-btn"></button> 
    `;
  }

  setEvent() {
    const { hoverPlan, leavePlan, dropPiece, leavePiece, useDrop } = this.props.events;

    return [
      { type: 'mouseover', selector: '.plan-daily-piece', handler: hoverPlan },
      { type: 'mouseout', selector: '.plan-daily-piece', handler: leavePlan },
      { type: 'dragover', selector: '.plan-daily-piece', handler: useDrop },
      { type: 'dragleave', selector: '.plan-daily-piece', handler: leavePiece },
      { type: 'drop', selector: '.plan-daily-piece', handler: dropPiece },
    ];
  }
}

export default PlanDaily;
