/* Form Data Schema
schema = {
  inputName1: { value: any, dirty: boolean, get valid: () => boolean, error: string },
  inputName2: { value: any, dirty: boolean, get valid: () => boolean, error: string },
  get valid: () => boolean
}
*/

const signinSchema = {
  userid: {
    value: '',
    dirty: false,
    get valid() {
      return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(this.value);
    },
    error: '이메일 형식에 맞게 입력해 주세요.',
  },
  password: {
    value: '',
    dirty: false,
    get valid() {
      return /^[A-Za-z0-9]{6,12}$/.test(this.value);
    },
    error: '영문 또는 숫자를 6~12자 입력하세요.',
  },
  get valid() {
    return this.userid.valid && this.password.valid;
  },
};

const signupSchema = {
  userid: {
    value: '',
    dirty: false,
    get valid() {
      return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(this.value);
    },
    error: '이메일 형식에 맞게 입력해 주세요.',
  },
  username: {
    value: '',
    dirty: false,
    get valid() {
      return !!this.value;
    },
    error: '이름을 입력해 주세요.',
  },
  password: {
    value: '',
    dirty: false,
    get valid() {
      return /^[A-Za-z0-9]{6,12}$/.test(this.value);
    },
    error: '영문 또는 숫자를 6~12자 입력하세요.',
  },
  get valid() {
    return this.userid.valid && this.password.valid;
  },
  'confirm-password': {
    value: '',
    dirty: false,
    get valid() {
      return signupSchema.password.value === this.value;
    },
    error: '패스워드가 일치하지 않습니다.',
  },
  get valid() {
    return this.userid.valid && this.username.valid && this.password.valid && this['confirm-password'].valid;
  },
};

const PieceAddSchema = {
  title: {
    value: '',
    dirty: false,
    get valid() {
      return /^.{1,20}$/.test(this.value);
    },
    error: '제목 1~20자 입력해 주세요.',
  },
  time: {
    value: '',
    dirty: false,
    get valid() {
      return !!this.value;
    },
    error: '시간을 선택해 주세요',
  },
  category: {
    value: '',
    dirty: false,
    get valid() {
      return !!this.value;
    },
    error: '카테고리를 선택해 주세요',
  },
  subtitle: {
    value: '',
    dirty: false,
    get valid() {
      return /^.{1,20}$/.test(this.value);
    },
    error: '소제목 1~20자 입력해 주세요.',
  },
  content: {
    value: '',
    dirty: false,
    get valid() {
      return !!this.value;
    },
    error: '내용을 입력해 주세요.',
  },
  get valid() {
    return this.title.valid && this.category.valid && this.subtitle.valid && this.content.valid;
  },
};

export { signinSchema, signupSchema, PieceAddSchema };
