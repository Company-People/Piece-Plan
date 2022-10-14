import Component from './Component.js';
import { PieceAddSchema as schema } from './schema.js';

class PieceAdd extends Component {
  constructor() {
    super();
    this.state = {
      isErrorMessageArr: [false, false, false, false, false],
      errorMessages: Object.keys(schema).filter(name => name !== 'valid').map(name => schema[name].error),
      timeArr: Array.from({length: 24}, (_, index) => index + 1),
      categoryArr: [['exercise', '운동'], ['study', '공부'], ['date', '데이트'], ['trip', '여행'], ['art', '예술'], ['play', '놀이'], ['reset', '휴식'], ['work', '업무'], ['parenting', '육아']]
    }
    this.timerId
  }

  // 2. render 정하기
  render() {
    // console.log(this.state)
    const virtualDOM = document.createElement('div');
    virtualDOM.id = 'root';

    virtualDOM.innerHTML = `
      <div class="modal-background">
        <form action="#" method="post" class="inputmodal">
          <h1 class="inputmodal-title text-gradient">피스 등록</h1>

          <div class="inputmodal-item-container">
            <input type="text" id="piece-title" class="piece-input" name="title" placeholder="제목을 입력해 주세요."  autocomplete="off" />
            <label for="piece-title" class="pieceadd-error-messages ${this.state.isErrorMessageArr[0] ? '' : 'hidden'}">${schema.title.error}</label>
          </div>

          
          <ul class="piece-dropdown-list">
            <li class="piece-dropdown-item"> 
              <select name="time" id="piece-time-select" class="piece-input" >
                <option value="">시간 선택</option>
                ${
                  this.state.timeArr.map(time => `<option value="${time}">${time} 시간</option>`)
                }
              </select>
              <label for="piece-time-select" class="pieceadd-error-messages ${this.state.isErrorMessageArr[1] ? '' : 'hidden'}">${schema.time.error}</label>
            </li>

            <li class="piece-dropdown-item">
              <select name="category" id="piece-category-select" class="piece-input" >
                <option value="">카테고리 선택</option>
                ${
                  this.state.categoryArr.map(category => `<option value="${category[0]}">${category[1]}</option>`)
                }
              </select>
              <label for="piece-category-select" class="pieceadd-error-messages ${this.state.isErrorMessageArr[2] ? '' : 'hidden'}">${schema.category.error}</label>
            </li>

          </ul>
          
          <div class="inputmodal-item-container">
            <input type="text" id="piece-subtitle" class="piece-input" name="subtitle" placeholder="소제목을 입력해 주세요."  autocomplete="off" />
            <label for="piece-subtitle" class="pieceadd-error-messages ${this.state.isErrorMessageArr[3] ? '' : 'hidden'}">${schema.subtitle.error}</label>
          </div>

          <div class="inputmodal-item-container">
            <textarea name="content" id="piece-content" class="piece-input" cols="30" rows="10" placeholder="내용을 입력해 주세요." ></textarea>
            <label for="piece-content" class="pieceadd-error-messages ${this.state.isErrorMessageArr[4] ? '' : 'hidden'}">${schema.content.error}</label>
          </div>

          <div class="checkbox-container">
            <input type="checkbox" id="my-piece" name="my-piece" checked>
            <label for="my-piece" class="my-piece-desc text-gradient">나만의 피스로 등록</label>
          </div>

          <button class="piece-add-button button">등록</button>
          <button type="button" class="piece-close-button"></button>
        </form>
      </div>
    `;

    return virtualDOM;
  }

  setEvent() {
    return [
      {
        type: 'input',
        seletor: '.inputmodal',
        handler: this.validate.bind(this),
      },
      {
        type: 'submit',
        seletor: '.inputmodal',
        handler: this.request.bind(this)
      },
      {
        type: 'click',
        seletor: 'window',
        handler: this.hideErrorMsg.bind(this)
      },
    ];
  }

  hideErrorMsg(e) {
    if (this.state.isErrorMessageArr.some(errMsg => true)) {
      this.setState({isErrorMessageArr: this.state.isErrorMessageArr.map(errorMessage => false)});
      clearTimeout(this.timerId)
    }
  }

  validate(e) {
    // 디바운스도...
    if (e.target.matches('#my-piece')) return;
    const {value, name} = e.target;
    schema[name].value = value.trim();
    schema[name].dirty = schema[name].value === '' ? false : true;
  }

  showErrorMsg() {
    Object.keys(schema)
    .filter(name => name !== 'valid').some((validInfo, index) => {
      if (!schema[validInfo].dirty && !schema[validInfo].valid) {
        this.setState({isErrorMessageArr: this.state.isErrorMessageArr.map((_, idx) => index === idx)});
        this.timerId = setTimeout(() => {
          this.setState({isErrorMessageArr: this.state.isErrorMessageArr.map(errorMessage => false)});
          clearTimeout(this.timerId)
        }, 4000)
        return true
      }
      else return false
    })

  }

  request(e) {
    e.preventDefault();
    const $PieceAdd = e.target;
    // 수정해야함
    const payload = { title: $PieceAdd.title.value, time: $PieceAdd.time.value, category: $PieceAdd.category.value, subtitle: $PieceAdd.subtitle.value };
    if (schema.valid) {
      // 요청
      // 페이지 이동
      this.setState({isErrorMessageArr: this.state.isErrorMessageArr.map(errorMessage => false)});  // 필요한가?
      console.log(`POST /signin`, payload);
    } else {
      // 실패 처리
      this.showErrorMsg()
    }
  };
}

export default PieceAdd;