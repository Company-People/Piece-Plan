import addEventHandlers from '../../libs/eventHolder.js';
import reconciliation from '../../libs/diff.js';

class Component {
  constructor(props) {
    this.props = props;
    this.setEvent && addEventHandlers(this.setEvent());
  }

  /**
   * @public
   * 컴포넌트의 state를 업데이트한다. state가 변경되면 컴포넌트는 re-rendering된다.
   */
  setState(newState) {
    this.state = { ...this.state, ...newState };
    // console.log(this)
    reconciliation(document.querySelector('#root'), this.render())
  }
}

export default Component;