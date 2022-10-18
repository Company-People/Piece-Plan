import Component from '../../core/Component.js';

class Main extends Component {
  // 2. render 정하기
  async render() {
    const {
      data: { auth },
    } = await axios.get('/auth');

    if (auth) {
      this.changePage('/calendar');
      return '';
    }

    return `
      <div class="main-wrapper">
        <div class="main-container">
          <a href="#"><div class="main-logo"></div></a>
          <h1 class="hidden">피플</h1>
          <ul class="main-catchphrase">
            <li class="former text-gradient-main">모두의 플랜,</li>
            <li class="latter text-gradient-main">Piece Plan</li>
          </ul>
          <ul class="main-button-list">
            <li><button class="button login-button">로그인</button></li>
            <li><button class="button signup-button">회원가입</button></li>
          </ul>
        </div>
      </div>
    `;
  }

  goLoginPage(e) {
    if (!e.target.matches('.login-button')) return;

    this.changePage('/login');
  }

  goSignupPage(e) {
    if (!e.target.matches('.signup-button')) return;

    this.changePage('/signup');
  }

  setEvent() {
    return [
      // 로그인 페이지 가기
      {
        type: 'click',
        selector: '.login-button',
        handler: e => this.goLoginPage(e),
      },
      // 회원가입 페이지 가기
      {
        type: 'click',
        selector: '.signup-button',
        handler: e => this.goSignupPage(e),
      },
    ];
  }
}

export default Main;
