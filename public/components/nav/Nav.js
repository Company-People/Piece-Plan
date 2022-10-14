import Component from '../../core/Component.js';

const users = [
  {
    userId: 4,
    email: 'queen@abc.com',
    name: '김팀장',
    password: '1q2w3e4r',
  },
  {
    userId: 3,
    email: '10rlatkdtn@abc.com',
    name: '김차장',
    password: '1q2w3e4r',
  },
  {
    userId: 2,
    email: 'eunoo@abc.com',
    name: '김과장',
    password: '1q2w3e4r',
  },
  {
    userId: 1,
    email: 'heejun@abc.com',
    name: '전부장',
    password: '1q2w3e4r',
  },
];

class Nav extends Component {
  render() {
    return `
      <div class="nav">
        <div class="logo"></div>
        <div class="user-container">
          <div class="user-info text-gradient">Welcome, ${users[0].name}!</div>
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
          console.log('메인으로 가기');
        },
      },
      {
        // 로그아웃
        type: 'click',
        selector: '.logout',
        handler: ({ target }) => {
          if (!target.matches('.logout')) return;
          console.log('초기화면으로 가기');
        },
      },
    ];
  }
}

export default Nav;
