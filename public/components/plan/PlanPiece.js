import Component from '../../core/Component.js';
import PlanForm from './PlanForm.js';
import PlanFilter from './PlanFilter.js';
import PieceList from './PieceList.js';

class PlanPiece extends Component {
  render() {
    const { pieces, filters, categories } = this.props.state;

    // prettier-ignore
    return `
      <div class="plan-piece">
        ${new PlanForm().render()}
        ${new PlanFilter({filters, categories}).render()}
        ${new PieceList({pieces, events: this.props.events}).render()}
      </div>  
    `;
  }
}

export default PlanPiece;
