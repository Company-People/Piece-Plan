import Component from '../../core/Component.js';
import PieceItem from './PieceItem.js';

class PieceList extends Component {
  render() {
    const { pieces, categoryId, favorites } = this.props;

    const filteredPieces = pieces.filter(piece => (categoryId === 'all' ? true : piece.category === categoryId));

    return `
      <ul class="plan-piece-list">
        ${filteredPieces.map(piece => new PieceItem({ ...piece, favorites }).render()).join('')}
      </ul>
    `;
  }

  setEvent() {
    const { dragPiece, openDetail, toggleItemFavorite } = this.props.events;

    return [
      { type: 'dragstart', selector: '.plan-piece-item', handler: dragPiece },
      { type: 'click', selector: '.plan-piece-item', handler: openDetail },
      { type: 'click', selector: '.plan-piece-fav', handler: toggleItemFavorite },
    ];
  }
}

export default PieceList;
