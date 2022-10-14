import Component from '../../core/Component.js';
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
        ['date', '데이트'],
        ['trip', '여행'],
        ['art', '예술'],
        ['play', '놀이'],
        ['rest', '휴식'],
        ['work', '업무'],
        ['parenting', '육아'],
      ],
      filterId: 'all',
      categoryId: 'all',
    };
  }

  async render() {
    const { data } = await axios.post('/plan/2022-09-22', {
      filterId: this.state.filterId,
      searchText: this.state.searchText,
    });
    this.state = { ...this.state, pieces: data.pieces, plan: data.plan };

    const planPiece = new PlanPiece({
      state: this.state,
      events: {
        dragPiece: this.dragPiece,
      },
    }).render();

    const planDaily = new PlanDaily({
      plan: this.state.plan,
      events: {
        hoverPlan: this.hoverPlan,
        leavePlan: this.leavePlan,
        dropPiece: this.dropPiece,
        useDrop: this.useDrop,
      },
    }).render();

    return `
    <div class="plan">
    ${planPiece}
    ${planDaily}
    </div>
    `;
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
    console.log(e.target);
  }

  dropPiece(e) {
    if (!e.target.matches('.plan-daily-piece')) return;
    console.log(e.target);
  }
}

export default Plan;
