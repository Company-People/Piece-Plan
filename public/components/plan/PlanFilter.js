import Component from '../../core/Component.js';

class PlanFilter extends Component {
  render() {
    const filters = [
      ['all', '전체보기'],
      ['my', 'MY 피스'],
      ['favorite', '즐겨찾기'],
    ];
    const categories = [
      ['all', '전체'],
      ['exercise', '운동'],
      ['study', '공부'],
      ['love', '데이트'],
      ['trip', '여행'],
      ['art', '예술'],
      ['play', '놀이'],
      ['rest', '휴식'],
      ['work', '업무'],
      ['parenting', '육아'],
    ];

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
