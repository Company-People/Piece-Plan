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
      return /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,10}$/.test(this.value);
    },
    error: '한글, 영문 또는 숫자를 2~10자 입력해 주세요.',
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

export { signinSchema, signupSchema };