import Component from '../../core/Component.js';
import PieceItem from './PieceItem.js';

class PieceList extends Component {
  render() {
    const { pieces, categoryId } = this.props;

    const filteredPieces = pieces.filter(piece => (categoryId === 'all' ? true : piece.category === categoryId));

    return `
      <ul class="plan-piece-list">
        ${filteredPieces.map(piece => new PieceItem(piece).render()).join('')}
      </ul>
    `;
  }

  setEvent() {
    const { dragPiece } = this.props.events;

    return [{ type: 'dragstart', selector: '.plan-piece-item', handler: dragPiece }];
  }
}

export default PieceList;
