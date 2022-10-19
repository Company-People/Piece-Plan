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

    const { pieceId, category, title, subTitle, content, favoriteCnt, time } = this.props.selectedPiece;
    const { favorites } = this.props;
    const isFavorite = favorites.find(favorite => favorite.pieceId === pieceId);

    // prettier-ignore
    return `
      <div class="detail-bg">
        <section id="${pieceId}" ${isFavorite ? 'data-fav=fav' : ''}  class="piece">
          <h2 class="piece-title text-gradient">${title}</h2>
          <div class="piece-info">
            <div class="piece-label">
              <span class="piece-time">${time}h</span>
              <span class="${category}">${CATEGORY_LIST[category]}</span>
            </div>
            <button class="detail-favorite">
              <span class="detail-star ${isFavorite ? 'fill' : ''}"></span>
              <span>${favoriteCnt}</span>
            </button>
          </div>
          <section class="piece-content">
            <h3 class="piece-subtitle">${subTitle}</h3>
            <p class="piece-describtion">
              ${content.replaceAll("\n", "<br>")}
            </p>
          </section>
          <button class="btn-close detail-close"></button>
        </section>
      </div>
      `;
  }

  setEvent() {
    const { closeDetail, toggleFavorite } = this.props.events;

    return [
      { type: 'click', selector: '.detail-bg', handler: closeDetail },
      { type: 'click', selector: '.detail-favorite', handler: toggleFavorite },
    ];
  }
}

export default PieceDetail;
