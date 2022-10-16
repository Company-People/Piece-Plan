import Component from '../../core/Component.js';

class Main extends Component {
  // 2. render 정하기
  render() {
    return `
      <div class="main-wrapper">
        <div class="main-container">
          <a href="#"><div class="main-logo"></div></a>
          <h1 class="hidden">피플</h1>
          <ul class="main-catchphrase">
            <li class="former">모두의 플랜,</li>
            <li class="latter">Piece Plan</li>
          </ul>
          <ul class="main-button-list">
            <li><button class="button longin-button">로그인</button></li>
            <li><button class="button signup-button">회원가입</button></li>
          </ul>
        </div>
      </div>
    `;
  }
}

export default Main;