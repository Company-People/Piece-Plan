import Component from '../../core/Component.js';
import PlanForm from './PlanForm.js';
import PlanFilter from './PlanFilter.js';
import PieceList from './PieceList.js';

class PlanPiece extends Component {
  render() {
    const { pieces, categoryId } = this.props.state;

    // prettier-ignore
    return `
      <div class="plan-piece">
        ${new PlanForm({events: this.props.events}).render()}
        ${new PlanFilter({ events: this.props.events}).render()}
        ${new PieceList({pieces, categoryId, events: this.props.events}).render()}
      </div>  
    `;
  }
}

export default PlanPiece;
