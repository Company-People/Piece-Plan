import Component from '../../core/Component.js';
import Calendar from './Calendar.js';

class App extends Component {
  constructor() {
    super();

    this.state = { currentDate: new Date() };
    this.calendar = new Calendar({ ...this.state });
  }

  render() {
    const calendar = this.calendar.render();

    return `
      ${calendar}
    `;
  }
}

export default App;
