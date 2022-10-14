import Component from '../../core/Component.js';
import render from '../../libs/render.js';

class Nav extends Component {
  render() {
    return `
      <div class="nav">
        <div class="logo"></div>
        <div class="user-container">
          <div class="user-info text-gradient">Welcome, ${this.props.name}!</div>
          <button class="logout">로그아웃</button>
        </div>
      </div>
    `;
  }

  setEvent() {
    return [
      // 메인
      {
        type: 'click',
        selector: '.logo',
        handler: ({ target }) => {
          if (!target.matches('.logo')) return;
          window.history.pushState(null, null, '/calender');
          render();
        },
      },
      {
        // 로그아웃
        type: 'click',
        selector: '.logout',
        handler: ({ target }) => {
          if (!target.matches('.logout')) return;
          // logout 처리 요청 보낸 후 완료되면 메인으로
          window.history.pushState(null, null, '/');
          render();
        },
      },
    ];
  }
}

export default Nav;
