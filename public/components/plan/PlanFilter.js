import Component from '../../core/Component.js';

class PlanFilter extends Component {
  render() {
    const { filters, categories } = this.props;

    return `
      <div class="plan-filter">
        ${filters
          .map(
            ([filter, content]) => `<button data-filter="${filter}" class="plan-filter-${filter}">${content}</button>`
          )
          .join('')}
        <select class="plan-category">
          ${categories.map(([cate, content]) => `<option value="${cate}">${content}</option>`).join('')}
        </select>
      </div>
    `;
  }

  setEvent() {
    const { filterPieces, filterCategory } = this.props.events;

    return [
      { type: 'click', selector: '.plan-filter', handler: filterPieces },
      { type: 'change', selector: '.plan-category', handler: filterCategory },
    ];
  }
}

export default PlanFilter;
