import Component from '../../core/Component.js';

class PlanFilter extends Component {
  render() {
    const { filters, categories } = this.props;

    return `
      <div class="plan-filter">
        ${filters.map(([filter, content]) => `<button class="plan-filter-${filter}">${content}</button>`).join('')}
        <select class="plan-category">
          ${categories.map(([cate, content]) => `<option value="${cate}">${content}</option>`).join('')}
        </select>
      </div>
    `;
  }
}

export default PlanFilter;
