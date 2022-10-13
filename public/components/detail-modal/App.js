import Component from '../../core/Component.js';
import { Modal } from './js/index.js';
import pieces from '../../../models/pieces.js';
import plans from '../../../models/plans.js';

class App extends Component {
  constructor() {
    super();

    this.state = { plans: this.fetchPlans(), pieces: this.fetchPieces() };
    console.log(this.state);
  }

  render() {
    const modal = new Modal({ ...this.state }).render();

    return `${modal}`;
  }

  fetchPlans() {
    const allPlans = plans;

    return allPlans;
  }

  fetchPieces() {
    const allPieces = pieces;

    return allPieces;
  }

  filterPieces(target) {
    const targetId = target.dataset.pieceId;

    const targetPiece = this.state.pieces.find(({ pieceId }) => pieceId === +targetId);

    this.setState({ targetPiece });
  }

  openPieceDetail({ target }) {
    if (!target.matches('.piece-plan')) return;

    this.filterPieces(target);

    const $modal = document.querySelector('.modal');
    $modal?.classList.add('moving');
  }

  setEvent() {
    return [
      {
        type: 'click',
        selector: '.piece-plan',
        handler: this.openPieceDetail.bind(this),
      },
    ];
  }
}

export default App;
