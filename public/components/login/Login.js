import Component from '../../core/Component.js';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      values: {},
      isLoginError: false,
    };
    this.formInfoArr = [
      ['userid', '아이디', 'text'],
      ['password', '비밀번호', 'password'],
    ];
  }

  // 2. render 정하기
  render() {
    return `
      <div class="auth-wrapper">
        <form class="auth login ${this.state.isLoginError ? 'vibration' : ''}" novalidate>
          <div class="auth-logo"></div>
          <h1 class="hidden">로그인</h1>
          ${this.formInfoArr
            .map(
              formInfo => `
              <div class="auth-input-container">
              <input
                type="${formInfo[2]}"
                id="login-${formInfo[0]}"
                class="auth-input"
                name="${formInfo[0]}"
                placeholder="${formInfo[1]}"
                required
                autocomplete="off" 
                value='${this.state.values[formInfo[0]] ?? ''}'/>
              <label for="login-${formInfo[0]}" class="hidden">${formInfo[1]}</label>
              <div class="auth-error error">${this.getError(formInfo[0])}</div>
            </div> 
            `
            )
            .join('')}
          <button class="main-button login-button button">로그인</button>
          <div class="auth-callout">
            <div class="auth-callout-desc">계정이 없으신가요?</div>
            <button type="button" class="signup-button button">가입하기</button>
          </div>
        </form>
      </div>
    `;
  }

  setEvent() {
    // console.log(this);
    return [
      {
        type: 'input',
        selector: '.auth.login .auth-input',
        handler: this.validate.bind(this),
      },
      {
        type: 'submit',
        selector: '.auth.login',
        handler: this.request.bind(this),
      },
    ];
  }

  getValid(inputType) {
    const value = this.state.values[inputType] ?? '';
    const schema = {
      userid: {
        get valid() {
          return /^[a-z|A-Z|0-9|]{6,12}$/.test(value);
        },
      },
      password: {
        get valid() {
          return /^[A-Za-z0-9]{6,12}$/.test(value);
        },
      },
    };
    return inputType !== undefined
      ? schema[inputType].valid
      : this.formInfoArr.every(formInfo => this.getValid(formInfo[0]));
  }

  getError(inputType) {
    const Errors = {
      userid: '아이디 영문 또는 숫자를 6~12자 입력하세요.',
      password: '비밀번호 영문 또는 숫자를 6~12자 입력하세요.',
    };
    return this.state.values[inputType] !== '' &&
      this.state.values[inputType] !== undefined &&
      !this.getValid(inputType)
      ? Errors[inputType]
      : '';
  }

  validate(e) {
    if (!e.target.matches('.auth.login .auth-input')) return;
    const { name, value } = e.target;
    const trimedValue = value.trim();

    const values = { ...this.state.values };
    values[name] = trimedValue;

    this.setState({
      values,
    });
  }

  request(e) {
    e.preventDefault();
    if (!e.target.matches('.auth.login')) return;
    const $signinForm = e.target;
    const payload = { email: $signinForm.userid.value, password: $signinForm.password.value };
    if (this.getValid()) {
      // 요청
      // 페이지 이동
      console.log(`POST /signin`, payload);
    } else {
      // 실패 처리
      this.setState({ isLoginError: true });
      const timerId = setTimeout(() => {
        alert('이메일 또는 비밀번호를 확인해주세요.');
        this.setState({ isLoginError: false });
        clearTimeout(timerId);
      }, 100);
    }
  }
}

export default Login;
