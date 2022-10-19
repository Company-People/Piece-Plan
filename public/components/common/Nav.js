import Component from '../../core/Component.js';

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
      {
        type: 'click',
        selector: '.logo',
        handler: ({ target }) => {
          if (!target.matches('.logo')) return;

          this.changePage('/calendar');
        },
      },
      {
        type: 'click',
        selector: '.logout',
        handler: async ({ target }) => {
          if (!target.matches('.logout')) return;

          await axios.get('/logout');
          this.changePage('/');
        },
      },
    ];
  }
}

export default Nav;
