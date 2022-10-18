import Component from '../../core/Component.js';

class PieceItem extends Component {
  render() {
    const { pieceId, title, category, subTitle, time, favoriteCnt } = this.props;

    return `
    <li id="${pieceId}" class="plan-piece-item ${category}" draggable="true">
      <div class="plan-piece-link">
        <p class="plan-piece-title">${title}</p>
        <p class="plan-piece-sub">${subTitle}</p>
        <span class="plan-piece-time">${time}h</span>
        <span class="plan-piece-fav">${favoriteCnt}</span>
      </div>
    </li>
    `;
  }
}

export default PieceItem;
