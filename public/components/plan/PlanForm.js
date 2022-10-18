import Component from '../../core/Component.js';

class PlanForm extends Component {
  render() {
    return `
      <form class="plan-search-form">
        <input class="plan-search-input" type="text" placeholder="검색어를 입력하세요." />
        <button class="plan-search-btn"></button>
      </form>
    `;
  }

  setEvent() {
    const { searchPieces } = this.props.events;

    return [{ type: 'submit', selector: '.plan-search-form', handler: searchPieces }];
  }
}

export default PlanForm;
