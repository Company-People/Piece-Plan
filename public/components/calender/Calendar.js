import Component from '../../core/Component.js';
import Nav from '../nav/Nav.js';
import Modal from '../detail-modal/Modal.js';

class Calendar extends Component {
  constructor() {
    super();
    this.monthList = {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    };
    this.dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.state = { pieces: null, currentDate: new Date(), selectedDate: null, targetPiece: null };
  }

  async render() {
    // window.history.pushState(null, null, '/');

    const { data } = await axios.get('/mycalendar');

    const { pieces, plans } = data;

    this.state.pieces = pieces;

    const filteredPlan = data.plans.find(({ date }) => date === this.state.selectedDate);

    const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();

    // prettier-ignore
    return `
      ${new Nav(data).render()}
      <div class="calendar-container">
        <div class="calendar-nav">
          <div class="calendar-year">
            <button class="calendar-year-prev"></button>
            <div class="calendar-current-year">${this.currentYear}</div>
            <button class="calendar-year-next"></button>
          </div>
          <ol class="calendar-month">
            ${Object.values(this.monthList).map((month, i) =>
              `<li data-month=${i + 1} ${this.currentMonth === i ? `class="is-selected"` : ''}>${month}</li>`
              ).join('')}
          </ol>
        </div>
        <div class="calendar-main">
          <div class="calendar-current-month text-gradient">${this.monthList[this.currentMonth + 1]}</div>
          <div class="calendar-grid">
            ${this.dayList.map(day => `<div class="day">${day}</div>`).join('')}
            ${this.getCalendarDate().map((date, i) =>
            `<div ${i >= firstDay ? `class="date${this.isToday(date) ? ' today':''}"` : ''} 
            ${i >= firstDay ? `data-date="${this.formatDate(date)}"` : ''}>${i>= firstDay ? `<div class="date-day${this.categoryClassName(date, plans)}">${date.getDate()}</div>` : ''}</div>`
            ).join('')}
          </div>
        </div>
      </div>
      ${new Modal({ ...this.state, filteredPlan, pieces, filterPieces: this.filterPieces.bind(this), resetModalData: this.resetModalData.bind(this), changeDatePage: this.changeDatePage.bind(this) }).render()}
      `;
  }

  get currentYear() {
    return this.state.currentDate.getFullYear();
  }

  get currentMonth() {
    return this.state.currentDate.getMonth();
  }

  formatDate(date) {
    const format = n => (n < 10 ? '0' + n : n + '');
    return `${date.getFullYear()}-${format(date.getMonth() + 1)}-${format(date.getDate())}`;
  }

  getCalendarDate() {
    const { currentYear, currentMonth } = this;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const firstDate = new Date(currentYear, currentMonth, 0);
    const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

    return Array.from({ length: firstDay + lastDate }, (_, i) => {
      if (i < firstDay) return '';
      firstDate.setDate(firstDate.getDate() + 1);
      return new Date(firstDate);
    });
  }

  isEqualDate(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  isToday(date) {
    const today = new Date();

    return this.isEqualDate(today, date);
  }

  categoryClassName(date, plans) {
    const findedPlan = plans.find(plan => plan.date === this.formatDate(date));

    if (findedPlan) return `${' ' + findedPlan.pieces[0].category}-schedule`;

    return '';
  }

  // Modal - Click piece
  filterPieces(target) {
    const targetId = target.dataset.pieceId;

    const targetPiece = this.state.pieces.find(({ pieceId }) => pieceId === targetId);

    this.setState({ selectedDate: this.state.selectedDate, targetPiece });
  }

  resetModalData() {
    this.setState({ selectedDate: null, targetPiece: null });
  }

  // Modal - Click edit button
  changeDatePage() {
    this.changePage(`/plan/${this.state.selectedDate}`);
  }

  // Event handlers
  movePrevYear(e) {
    if (!e.target.matches('.calendar-year-prev')) return;
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear() - 1, this.state.currentDate.getMonth()),
      selectedDate: null,
    });
  }

  moveNextYear(e) {
    if (!e.target.matches('.calendar-year-next')) return;
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear() + 1, this.state.currentDate.getMonth()),
      selectedDate: null,
    });
  }

  selectMonth(e) {
    if (!e.target.matches('.calendar-month > li')) return;
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear(), e.target.dataset.month - 1),
      selectedDate: null,
    });
  }

  selectDate(e) {
    if (!e.target.closest('.date')) return;
    this.setState({ selectedDate: e.target.closest('.date').dataset.date });
  }

  setEvent() {
    return [
      // 이전 년도로 가기
      {
        type: 'click',
        selector: '.calendar-year-prev',
        handler: e => this.movePrevYear(e),
      },
      // 다음 년도로 가기
      {
        type: 'click',
        selector: '.calendar-year-next',
        handler: e => this.moveNextYear(e),
      },
      // 해당 달로 가기
      {
        type: 'click',
        selector: '.calendar-month',
        handler: e => this.selectMonth(e),
      },
      // 각 날짜 클릭
      {
        type: 'click',
        selector: '.date',
        handler: e => this.selectDate(e),
      },
    ];
  }
}

export default Calendar;
