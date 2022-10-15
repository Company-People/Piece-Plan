import Component from '../../core/Component.js';
import Nav from '../nav/Nav.js';
import Modal from '../detail-modal/Modal.js';

class Calendar extends Component {
  constructor() {
    super();
    this.state = { currentDate: new Date(), selectedDate: undefined };
  }

  async render() {
    const monthList = {
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

    const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const { data } = await axios.get('/calender');
    const { pieces, plans } = data;

    const [filteredPlan] = data.plans.filter(({ date }) => date === this.state.selectedDate);

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
            ${Object.values(monthList).map((month, i) =>
              `<li data-month=${i + 1} ${this.currentMonth === i ? `class="is-selected"` : ''}>${month}</li>`
              ).join('')}
          </ol>
        </div>
        <div class="calendar-main">
          <div class="calendar-current-month text-gradient">${monthList[this.currentMonth + 1]}</div>
          <div class="calendar-grid">
            ${dayList.map(day => `<div class='day'>${day}</div>`).join('')}
            ${this.getCalendarDate().map((date, i) =>
              `<div ${i >= firstDay ? `class="${this.classNames(date, plans)}"` : ''} 
              ${i >= firstDay ? `data-date="${this.formatDate(date)}"` : ''}>
                <div ${i >= firstDay ? `class="date-day ${this.planClassNames(date, plans)}"`:''} 
                  ${i >= firstDay ? `data-date="${this.formatDate(date)}"` : ''}>${i >= firstDay ? date.getDate() : ''}</div>
              </div>`
              ).join('')}
          </div>
        </div>
      </div>
      ${new Modal({ ...this.state, filteredPlan, pieces }).render()}
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

  classNames(date, plans) {
    const today = new Date();
    const classList = ['date'];

    if (this.isEqualDate(today, date)) classList.push('today');
    // plans.forEach(plan =>
    //   plan.date === this.formatDate(date) ? classList.push(`${plan.pieces[0].category}-schedule`) : ''
    // );

    return classList.join(' ');
  }

  planClassNames(date, plans) {
    const classList = [];

    plans.forEach(plan =>
      plan.date === this.formatDate(date) ? classList.push(`${plan.pieces[0].category}-schedule`) : ''
    );

    return classList.join(' ');
  }

  // Event handlers
  movePrevYear(e) {
    if (!e.target.matches('.calendar-year-prev')) return;
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear() - 1, this.state.currentDate.getMonth()),
      selectedDate: undefined,
    });
    console.log('this.state: ', this.state);
  }

  moveNextYear(e) {
    if (!e.target.matches('.calendar-year-next')) return;
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear() + 1, this.state.currentDate.getMonth()),
      selectedDate: undefined,
    });
    console.log('this.state: ', this.state);
  }

  selectMonth(e) {
    if (!e.target.matches('.calendar-month > li')) return;
    this.setState({
      currentDate: new Date(this.state.currentDate.getFullYear(), e.target.dataset.month - 1),
      selectedDate: undefined,
    });
    console.log('this.state: ', this.state);
  }

  selectDate(e) {
    if (!e.target.matches('.date') && !e.target.matches('.date-day')) return;
    console.log(e.target.dataset.date);
    this.setState({ selectedDate: e.target.dataset.date });
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
