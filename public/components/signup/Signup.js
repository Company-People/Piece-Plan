import Component from '../../core/Component.js';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      values: {},
      isSignupError: false,
    };
    this.formInfoArr = [
      ['userid', '아이디', 'text'],
      ['username', '닉네임', 'text'],
      ['password', '비밀번호', 'password'],
      ['confirm-password', '비밀번호 확인', 'password'],
    ];
    this.errors = {
      userid: '아이디는 영문 또는 숫자를 6~12자 이상 입력해야 합니다.',
      password: '비밀번호는 영문 또는 숫자를 6~12자 이상 입력해야 합니다.',
      username: '닉네임은 특수문자를 포함할 수 없습니다.',
      'confirm-password': '비밀번호가 일치하지 않습니다.',
    };
  }

  // 2. render 정하기
  render() {
    return `
      <div class="auth-wrapper">
        <form class="auth signup ${this.state.isSignupError ? 'vibration' : ''}" novalidate>
          <div class="auth-logo"></div>
          <h1 class="hidden">로그인</h1>
          ${this.formInfoArr
            .map(
              (formInfo, idx) => `
              <div class="auth-input-container">
              <input
                type="${formInfo[2]}"
                id="signup-${formInfo[0]}"
                class="auth-input"
                name="${formInfo[0]}"
                placeholder="${formInfo[1]}"
                required
                autocomplete="off" 
                value='${this.state.values[formInfo[0]] ?? ''}'${idx === 0 ? ' autofocus' : ''}/>
              <label for="signup-${formInfo[0]}" class="hidden">${formInfo[1]}</label>
              <div class="auth-error error">${this.getError(formInfo[0])}</div>
            </div> 
            `
            )
            .join('')}
          <button class="main-button signup-button button">가입하기</button>
          <div class="auth-callout">
            <div class="auth-callout-desc">이미 계정이 있으신가요?</div>
            <button type="button" class="login-button button">로그인</button>
          </div>
        </form>
      </div>

    `;
  }

  setEvent() {
    return [
      {
        type: 'input',
        selector: '.auth.signup .auth-input',
        handler: this.validate.bind(this),
      },
      {
        type: 'submit',
        selector: '.auth.signup',
        handler: this.request.bind(this),
      },
      {
        type: 'click',
        selector: '.login-button',
        handler: e => this.goLoginPage(e),
      },
    ];
  }

  goLoginPage(e) {
    if (!e.target.matches('.login-button')) return;

    this.changePage('/login');
  }

  getValid(inputType) {
    const value = this.state.values[inputType] ?? '';
    const password = this.state.values.password ?? '';
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
      username: {
        get valid() {
          return !value.match(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]/g);
        },
      },
      'confirm-password': {
        get valid() {
          return password === value;
        },
      },
    };
    return inputType !== undefined
      ? schema[inputType].valid
      : this.formInfoArr.every(formInfo => this.getValid(formInfo[0]));
  }

  getError(inputType) {
    return this.state.values[inputType] !== '' &&
      this.state.values[inputType] !== undefined &&
      !this.getValid(inputType)
      ? this.errors[inputType]
      : '';
  }

  validate(e) {
    if (!e.target.matches('.auth.signup .auth-input')) return;
    const { name, value } = e.target;
    const trimedValue = value.trim();

    const values = { ...this.state.values };
    values[name] = trimedValue;
    // 수정!!!
    this.setState({
      values,
    });
  }

  async request(e) {
    if (!e.target.matches('.auth.signup')) return;
    e.preventDefault();

    if (this.getValid()) {
      // 요청
      const { data: isSuccess } = await axios.post('/signup', this.state.values);
      if (!isSuccess) {
        alert('이미 등록된 아이디입니다.');
        return;
      }

      // 페이지 이동
      alert('회원가입이 완료되었습니다!');
      this.changePage('/login');
    } else {
      // 실패 처리
      this.setState({ isSignupError: true });
      const timerId = setTimeout(() => {
        alert('이미 등록된 아이디입니다.');
        this.setState({ isSignupError: false });
        clearTimeout(timerId);
      }, 300);
    }
  }
}

export default Signup;
