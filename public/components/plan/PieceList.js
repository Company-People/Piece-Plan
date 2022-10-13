import Component from '../../core/Component.js';
import PieceItem from './PieceItem.js';

class PieceList extends Component {
  render() {
    const { pieces } = this.props;

    return `
      <ul class="plan-piece-list">
        ${pieces.map(piece => new PieceItem(piece).render()).join('')}
      </ul>
    `;
  }

  setEvent() {
    const { dragPiece } = this.props.events;

    return [{ type: 'dragstart', selector: '.plan-piece-item', handler: dragPiece }];
  }
}

export default PieceList;
