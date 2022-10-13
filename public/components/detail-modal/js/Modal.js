import Component from '../../../core/Component.js';
import Daily from './Daily.js';
import Detail from './Detail.js';

class Modal extends Component {
  constructor(state) {
    super();

    this.state = state;
    console.log(this.state);
  }

  render() {
    const daily = new Daily({ plans: this.state.plans }).render();
    const detail = new Detail({ ...this.state }).render();

    // prittier-ignore
    return `
      <div class="modal-bg"></div>
      <div class="modal">
        ${daily}
        ${detail}
      </div>
      `;
  }
}

export default Modal;
