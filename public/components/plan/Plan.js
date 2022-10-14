import Component from '../../core/Component.js';
import Nav from '../nav/Nav.js';
import PlanDaily from './PlanDaily.js';
import PlanPiece from './PlanPiece.js';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
        ['all', '전체보기'],
        ['my', 'MY 피스'],
        ['favorite', '즐겨찾기'],
      ],
      categories: [
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
      ],
      filterId: 'all',
      categoryId: 'all',
      searchText: null,
    };
  }

  async render() {
    const { data } = await axios.post('/plan/2022-09-23', {
      filterId: this.state.filterId,
      searchText: this.state.searchText,
    });
    this.state = { ...this.state, pieces: data.pieces, plan: data.plan, selectDate: '2022-09-23' };

    const nav = new Nav({ name: data.name }).render();

    const planPiece = new PlanPiece({
      state: this.state,
      events: {
        dragPiece: this.dragPiece,
        searchPieces: this.searchPieces.bind(this),
        filterPieces: this.filterPieces.bind(this),
        filterCategory: this.filterCategory.bind(this),
      },
    }).render();

    const planDaily = new PlanDaily({
      plan: this.state.plan,
      selectDate: this.state.selectDate,
      events: {
        hoverPlan: this.hoverPlan,
        leavePlan: this.leavePlan,
        dropPiece: this.dropPiece.bind(this),
        leavePiece: this.leavePiece,
        useDrop: this.useDrop,
      },
    }).render();

    return `
    ${nav}
    <div class="plan">
    ${planPiece}
    ${planDaily}
    </div>
    `;
  }

  async patchPlan({ date, pieceId, startTime }) {
    await axios.patch('plan', { date, pieceId, startTime });
  }

  hoverPlan(e) {
    if (e.target.matches('.plan-daily-piece')) {
      e.target.classList.add('hover');
      e.target.lastElementChild.classList.remove('hidden');
    }
    if (e.target.matches('.plan-daily-add')) {
      e.target.parentNode.classList.add('hover');
      e.target.classList.remove('hidden');
    }
  }

  leavePlan(e) {
    if (!e.target.matches('.plan-daily-piece')) return;
    e.target.classList.remove('hover');
    e.target.lastElementChild.classList.add('hidden');
  }

  useDrop(e) {
    e.preventDefault();
    if (!e.target.matches('.plan-daily-piece')) return;
    e.target.classList.add('hover');
  }

  dragPiece(e) {
    if (!e.target.matches('.plan-piece-item')) return;

    e.dataTransfer.setData('text/plain', e.target.id);

    e.target.classList.add('drag');
    [...e.target.firstElementChild.children].forEach(child => {
      child.localName === 'span' && (child.style.display = 'none');
    });

    setTimeout(() => {
      e.target.classList.remove('drag');
      [...e.target.firstElementChild.children].forEach(child => {
        child.localName === 'span' && (child.style.display = 'block');
      });
    });
  }

  leavePiece(e) {
    if (!e.target.matches('.plan-daily-piece')) return;
    e.target.classList.remove('hover');
  }

  dropPiece(e) {
    if (!e.target.matches('.plan-daily-piece')) return;
    const date = '2022-09-23';
    const pieceId = e.dataTransfer.getData('text');

    this.patchState(this.patchPlan, { date, pieceId, startTime: e.target.id });
  }

  searchPieces(e) {
    if (!e.target.matches('.plan-search-form')) return;
    e.preventDefault();

    const [$input] = e.target;
    if ($input.value.trim() === '') return;
    this.setState({ searchText: $input.value });
    $input.value = '';
    this.state.searchText = null;
  }

  filterPieces(e) {
    if (!e.target.matches('.plan-filter > button')) return;
    this.setState({ filterId: e.target.dataset.filter });
  }

  filterCategory(e) {
    if (!e.target.matches('.plan-category')) return;
    this.setState({ categoryId: e.target.value });
  }
}

export default Plan;
