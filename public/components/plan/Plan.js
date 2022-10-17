import Component from '../../core/Component.js';
import Nav from '../nav/Nav.js';
import PlanDaily from './PlanDaily.js';
import PlanPiece from './PlanPiece.js';
import PieceDetail from './PieceDetail.js';
import PieceAdd from './PieceAdd.js';

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterId: 'all',
      categoryId: 'all',
      searchText: '',
      selectedPiece: null,
      isAddOpen: false,
      //----------------
      values: {},
      isErrorMessageArr: [false, false, false, false, false],
    };
    this.formInfoArr = ['title', 'time', 'category', 'subtitle', 'content', 'my-piece'];
    this.timerId = 0;
  }

  async render() {
    const selectedDate = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    try {
      const {
        data: { pieces },
      } = await axios.get(`/pieces?filterId=${this.state.filterId}&searchText=${this.state.searchText}`);

      const {
        data: { plan, name },
      } = await axios.get(`/plans?date=${selectedDate}`);

      this.state = { ...this.state, pieces, plan, selectedDate };

      const nav = new Nav({ name }).render();

      const planPiece = new PlanPiece({
        pieces: this.state.pieces,
        categoryId: this.state.categoryId,
        events: {
          dragPiece: this.dragPiece,
          searchPieces: this.searchPieces.bind(this),
          filterPieces: this.filterPieces.bind(this),
          filterCategory: this.filterCategory.bind(this),
          openDetail: this.openDetail.bind(this),
        },
      }).render();

      const planDaily = new PlanDaily({
        plan: this.state.plan,
        selectedDate: this.state.selectedDate,
        events: {
          hoverPlan: this.hoverPlan,
          leavePlan: this.leavePlan,
          leavePiece: this.leavePiece,
          useDrop: this.useDrop,
          completeEdit: this.completeEdit.bind(this),
          addPiece: this.addPiece.bind(this),
          removePiece: this.removePiece.bind(this),
          openAdd: this.openAdd.bind(this),
        },
      }).render();

      const pieceDetail = new PieceDetail({
        selectedPiece: this.state.selectedPiece,
        events: { closeDetail: this.closeDetail.bind(this) },
      }).render();

      const pieceAdd = new PieceAdd({
        values: this.state.values,
        isErrorMessageArr: this.state.isErrorMessageArr,
        formInfoArr: this.formInfoArr,
        events: {
          closeAdd: this.closeAdd.bind(this),
          validate: this.validate.bind(this),
          request: this.request.bind(this),
          hideErrorMsg: this.hideErrorMsg.bind(this),
        },
      }).render();

      return `
    ${nav}
    <div class="plan">
    ${planPiece}
    ${planDaily}
    </div>
    ${pieceDetail}
    ${this.state.isAddOpen ? pieceAdd : ''}
    `;
    } catch (e) {
      console.error(e);
    }
  }

  // =============== hover 관련 이벤트 ===============

  hoverPlan(e) {
    if (e.target.matches('.plan-daily-piece')) {
      e.target.classList.add('hover');
      e.target.lastElementChild.classList.remove('hidden');
    }
    if (e.target.matches('.plan-daily-add')) {
      e.target.parentNode.classList.add('hover');
      e.target.classList.remove('hidden');
    }
    if (e.target.matches('.plan-daily-link')) {
      e.target.lastElementChild.classList.remove('hidden');
    }
    if (e.target.matches('.plan-daily-piece-title')) {
      e.target.nextElementSibling.classList.remove('hidden');
    }
    if (e.target.matches('.plan-daily-remove')) {
      e.target.classList.remove('hidden');
    }
  }

  leavePlan(e) {
    if (e.target.matches('.plan-daily-piece')) {
      e.target.classList.remove('hover');
      e.target.lastElementChild.classList.add('hidden');
    }
    if (e.target.matches('.plan-daily-link')) {
      e.target.lastElementChild.classList.add('hidden');
    }
  }

  // =============== drag & drop 이벤트 ===============

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

  // =============== piece filter 관련 이벤트 ===============

  searchPieces(e) {
    if (!e.target.matches('.plan-search-form')) return;
    e.preventDefault();

    const [$input] = e.target;

    if ($input.value.trim() === '') return;

    this.setState({ searchText: $input.value });
    $input.value = '';
    this.state.searchText = '';
  }

  filterPieces(e) {
    if (!e.target.matches('.plan-filter > button')) return;

    this.setState({ filterId: e.target.dataset.filter });
  }

  filterCategory(e) {
    if (!e.target.matches('.plan-category')) return;

    this.setState({ categoryId: e.target.value });
  }

  // =============== page 전환 이벤트 ===============

  completeEdit(e) {
    if (!e.target.matches('.plan-cancel-btn') && !e.target.matches('.plan-submit-btn')) return;

    this.changePage('/calendar');
  }

  // =============== plan piece 관련 메서드 ===============

  createPlan() {
    return axios.post('/plans', { date: this.state.selectedDate });
  }

  // 추가될 피스와 기존 피스의 중복 여부를 체크하여 불리언 반환
  isOverlap(plan, startTime, time) {
    const newTimes = Array.from({ length: time }).map((_, i) => i + +startTime);

    return !plan.pieces.every(({ startTime, endTime }) => {
      const times = Array.from({ length: endTime - startTime }).map((_, i) => i + startTime);
      return newTimes.length + times.length === new Set([...newTimes, ...times]).size;
    });
  }

  async addPiece(e) {
    if (!e.target.matches('.plan-daily-piece')) return;

    // 드랍된 piece의 정보를 가져옴
    const { pieceId, title, category, time } = this.state.pieces.find(
      piece => piece.pieceId === e.dataTransfer.getData('text')
    );

    // plan이 존재하지 않을 경우 새로운 plan을 만든다.
    if (!this.state.plan) {
      const { data } = await this.createPlan();
      this.state.plan = data;
    }

    // plan에 추가될 piece 생성
    const newPiece = {
      pieceId,
      title,
      category,
      startTime: +e.target.id,
      endTime: +e.target.id + time,
    };

    // 생성된 piece가 기존의 plan에 있는 piece들과 중복되거나 하루 일정이 넘어갈 경우 리턴
    if (this.isOverlap(this.state.plan, +e.target.id, time) || newPiece.endTime > 24) return;

    // 서버에 업데이트 된 pieces를 보내 서버 상태 패치
    this.patchState(({ planId, pieces }) => axios.patch(`/plans/${planId}`, { pieces }), {
      planId: this.state.plan.planId,
      pieces: [...this.state.plan.pieces, newPiece],
    });
  }

  removePiece(e) {
    if (!e.target.matches('.plan-daily-remove')) return;

    const pieceId = e.target.parentNode.id;
    const startTime = e.target.parentNode.parentNode.id;

    // 서버에 업데이트 된 pieces를 보내 서버 상태 패치
    this.patchState(({ planId, pieces }) => axios.patch(`/plans/${planId}`, { pieces }), {
      planId: this.state.plan.planId,
      pieces: this.state.plan.pieces.filter(piece => piece.pieceId !== pieceId || piece.startTime !== +startTime),
    });
  }

  // =============== detailmodal 관련 메서드 ===============

  openDetail(e) {
    if (!e.target.closest('.plan-piece-item')) return;

    const pieceId = e.target.closest('.plan-piece-item').id;

    this.setState({ selectedPiece: this.state.pieces.find(piece => piece.pieceId === pieceId) });
  }

  closeDetail(e) {
    if (!e.target.matches('.detail-bg') && !e.target.matches('.detail-close')) return;

    this.setState({ selectedPiece: null });
  }

  // =============== addmodal 관련 메서드 ===============
  openAdd(e) {
    if (!e.target.matches('.plan-daily-add')) return;

    this.setState({ isAddOpen: true });
  }

  closeAdd(e) {
    if (!e.target.matches('.modal-background') && !e.target.matches('.piece-close-button')) return;
    this.setState({
      values: Object.fromEntries(Object.entries(this.state.values).map(value => [value[0], ''])),
      isErrorMessageArr: [false, false, false, false, false],
      isAddOpen: false,
    });
  }

  getValid(inputType) {
    const value = this.state.values[inputType] ?? '';
    const schema = {
      title: {
        get valid() {
          return /^.{1,15}$/.test(value);
        },
      },
      time: {
        get valid() {
          return !!value;
        },
      },
      category: {
        get valid() {
          return !!value;
        },
      },
      subtitle: {
        get valid() {
          return /^.{1,30}$/.test(value);
        },
      },
      content: {
        get valid() {
          return !!value;
        },
      },
    };
    return inputType !== undefined
      ? schema[inputType].valid
      : Object.keys(schema).every(formInfo => this.getValid(formInfo));
  }

  hideErrorMsg() {
    if (this.state.isErrorMessageArr.some(errMsg => errMsg === true)) {
      this.setState({ isErrorMessageArr: this.state.isErrorMessageArr.map(() => false) });
      clearTimeout(this.timerId);
    }
  }

  validate(e) {
    if (!(e.target.matches('#my-piece') || e.target.matches('.piece-input'))) return;
    const { value, name, checked } = e.target;
    const values = { ...this.state.values };
    values[name] = name === 'my-piece' ? checked : value;

    this.setState({
      values,
    });
  }

  showErrorMsg() {
    const setErrorMsg = index => {
      this.setState({ isErrorMessageArr: this.state.isErrorMessageArr.map((_, idx) => index === idx) });

      this.timerId = setTimeout(() => {
        this.setState({ isErrorMessageArr: this.state.isErrorMessageArr.map(() => false) });
        clearTimeout(this.timerId);
      }, 4000);
    };

    !this.formInfoArr.some((formInfo, index) => {
      if (this.state.values[formInfo] === '' || this.state.values[formInfo] === undefined) {
        setErrorMsg(index);
        return true;
      }
      return false;
    }) &&
      this.formInfoArr.some((formInfo, index) => {
        if (!this.getValid(formInfo)) {
          setErrorMsg(index);
          return true;
        }
        return false;
      });
  }

  request(e) {
    e.preventDefault();
    if (!e.target.matches('.inputmodal')) return;
    const $PieceAdd = e.target;
    // 수정해야함
    const payload = {
      title: $PieceAdd.title.value,
      time: $PieceAdd.time.value,
      category: $PieceAdd.category.value,
      subtitle: $PieceAdd.subtitle.value,
    };
    if (this.getValid()) {
      // 요청
      // 페이지 이동
      this.setState({ isErrorMessageArr: this.state.isErrorMessageArr.map(() => false) }); // 필요한가?
      console.log(`POST /signin`, this.state.values);
    } else {
      // 실패 처리
      this.showErrorMsg();
    }
  }
}

export default Plan;
