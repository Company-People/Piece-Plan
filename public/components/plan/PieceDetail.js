import Component from '../../core/Component.js';

class PieceDetail extends Component {
  render() {
    if (!this.props.selectedPiece) return '';

    const CATEGORY_LIST = {
      exercise: '운동',
      study: '공부',
      love: '데이트',
      trip: '여행',
      art: '예술',
      play: '여가',
      rest: '휴식',
      work: '업무',
      parenting: '육아',
    };

    const { category, title, subTitle, content, favoriteCnt, time } = this.props.selectedPiece;

    // prettier-ignore
    return `
      <div class="detail-bg">
        <section class="piece">
          <h2 class="piece-title text-gradient">${title}</h2>
          <div class="piece-info">
            <div class="piece-label">
              <span class="piece-time ">${time}h</span>
              <span class="${category}">${CATEGORY_LIST[category]}</span>
            </div>
            <button class="piece-favorite">${favoriteCnt}</button>
          </div>
          <section class="piece-content">
            <h3 class="piece-subtitle">${subTitle}</h3>
            <p class="piece-describtion">
              ${content.replaceAll("\n", "<br>")}
            </p>
          </section>
          <button class="btn-close"></button>
        </section>
      </div>
      `;
  }

  setEvent() {
    const { closeDetail } = this.props.events;

    return [{ type: 'click', selector: '.detail-bg', handler: closeDetail }];
  }
}

export default PieceDetail;
