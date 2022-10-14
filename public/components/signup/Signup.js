import Component from './Component.js';
// import Component from '../../core/Component.js';
import { signupSchema as schema } from './schema.js';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      errorMessages: ['', '', '', ''],
      isSignupError: false,
    }
  }

  // 2. render 정하기
  render() {
    const virtualDOM = document.createElement('div');
    virtualDOM.id = 'root';

    virtualDOM.innerHTML = `
      <form class="auth signup ${this.state.isSignupError ? 'vibration' : ''}" novalidate>
      <div class="auth-logo"></div>
      <h1 class="hidden">로그인</h1>
      ${
        [['userid', '이메일', 'text'], ['username', '닉네임', 'text'], ['password', '비밀번호', 'password'], ['confirm-password', '비밀번호 확인', 'password']].map((formInfo, index) => `
          <div class="auth-input-container">
          <input
            type="${formInfo[2]}"
            id="signup-${formInfo[0]}"
            class="auth-input"
            name="${formInfo[0]}"
            placeholder="${formInfo[1]}"
            required
            autocomplete="off" />
          <label for="signup-${formInfo[0]}" class="hidden">${formInfo[1]}</label>
          <div class="auth-error error">${this.state.errorMessages[index]}</div>
        </div> 
        `).join('')
      }
      <button class="main-button signup-button button">가입하기</button>
      <div class="auth-callout">
        <div class="auth-callout-desc">계정이 없으신가요?</div>
        <button type="button" class="signup-button button">로그인</button>
      </div>
    </form>
    `;

    return virtualDOM;
  }

  setEvent() {
    return [
      {
        type: 'input',
        seletor: '.form.signin',
        handler: this.validate.bind(this),
      },
      {
        type: 'submit',
        seletor: '.form.signin',
        handler: this.request.bind(this)
      },
    ];
  }


  validate(e) {
    const { name, value } = e.target;
    schema[name].value = value.trim();
    schema[name].dirty = schema[name].value === '' ? false : true;
    // 수정!!!
    this.setState({ errorMessages: Object.keys(schema)
      .filter(name => name !== 'valid').map(e => schema[e].dirty && !schema[e].valid ? schema[e].error : '')})
  }

  request(e) {
    e.preventDefault();
    const $signinForm = e.target;
    const payload = { email: $signinForm.userid.value, password: $signinForm.password.value };
    if (schema.valid) {
      // 요청
      // 페이지 이동
      console.log(`POST /signin`, payload);
    } else {
      // 실패 처리
      this.setState({isSignupError: true})
      const timerId = setTimeout(() =>{
        alert("회원정보 정확히 입력해주세요.");
        this.setState({isSignupError: false})
        clearTimeout(timerId)
      },100)
    }
  };
}

export default Signup;