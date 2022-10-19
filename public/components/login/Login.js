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
    this.errors = {
      userid: '아이디는 영문 또는 숫자를 6~12자 이상 입력해야 합니다.',
      password: '비밀번호는 영문 또는 숫자를 6~12자 이상 입력해야 합니다.',
    };
  }

  render() {
    return `
      <div class="auth-wrapper">
        <form class="auth login ${this.state.isLoginError ? 'vibration' : ''}" novalidate>
          <div class="auth-logo"></div>
          <h1 class="hidden">로그인</h1>
          ${this.formInfoArr
            .map(
              (formInfo, idx) => `
              <div class="auth-input-container">
              <input
                type="${formInfo[2]}"
                id="login-${formInfo[0]}"
                class="auth-input"
                name="${formInfo[0]}"
                placeholder="${formInfo[1]}"
                required
                autocomplete="off" 
                value="${this.state.values[formInfo[0]] ?? ''}"${idx === 0 ? ' autofocus' : ''}/>
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
      {
        type: 'click',
        selector: '.signup-button',
        handler: e => this.goSignupPage(e),
      },
    ];
  }

  // prettier-ignore
  getValid(inputType) {
    const value = this.state.values[inputType]?.replace(/&quot;/g, '"') ?? '';
    const schema = {
      userid: { get valid() { return /^[a-z|A-Z|0-9|]{6,12}$/.test(value); } },
      password: { get valid() { return /^[A-Za-z0-9]{6,12}$/.test(value); } },
    };
    
    return inputType !== undefined
      ? schema[inputType].valid
      : this.formInfoArr.every(formInfo => this.getValid(formInfo[0]));
  }

  goSignupPage(e) {
    if (!e.target.matches('.signup-button')) return;

    this.changePage('/signup');
  }

  getError(inputType) {
    return this.state.values[inputType] !== '' &&
      this.state.values[inputType] !== undefined &&
      !this.getValid(inputType)
      ? this.errors[inputType]
      : '';
  }

  validate(e) {
    if (!e.target.matches('.auth.login .auth-input')) return;
    const { name, value } = e.target;
    let trimedValue = value.trim();

    const values = { ...this.state.values };
    trimedValue = trimedValue.replace(/"/g, '&quot;');
    values[name] = trimedValue;

    this.setState({
      values,
    });
  }

  async request(e) {
    if (!e.target.matches('.auth.login')) return;
    e.preventDefault();

    if (this.getValid()) {
      const { userid: id, password } = this.state.values;
      const { data: isSuccess } = await axios.post('/login', { id, password }, { withCredentials: true });

      if (!isSuccess) {
        this.setState({ isLoginError: true });

        const timerId = setTimeout(() => {
          alert('아이디 또는 비밀번호를 확인해주세요.');

          this.setState({ isLoginError: false });
          clearTimeout(timerId);
        }, 300);

        return;
      }

      this.changePage('/calendar');
    } else {
      this.setState({ isLoginError: true });

      const timerId = setTimeout(() => {
        alert('아이디 또는 비밀번호를 확인해주세요.');
        this.setState({ isLoginError: false });

        clearTimeout(timerId);
      }, 300);
    }
  }
}

export default Login;
