import Component from '../../core/Component.js';

class PieceAdd extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     values: {},
  //     isErrorMessageArr: [false, false, false, false, false],
  //   };
  //   this.formInfoArr = ['title', 'time', 'category', 'subtitle', 'content'];
  //   this.timeArr = Array.from({ length: 24 }, (_, index) => index + 1);
  //   this.categoryArr = [
  //     ['exercise', '운동'],
  //     ['study', '공부'],
  //     ['date', '데이트'],
  //     ['trip', '여행'],
  //     ['art', '예술'],
  //     ['play', '놀이'],
  //     ['reset', '휴식'],
  //     ['work', '업무'],
  //     ['parenting', '육아'],
  //   ];
  //   this.errors = {
  //     title: '제목 1~20자 입력해 주세요.',
  //     time: '시간을 선택해 주세요',
  //     category: '카테고리를 선택해 주세요',
  //     subtitle: '소제목 1~20자 입력해 주세요.',
  //     content: '내용을 입력해 주세요.',
  //   };
  //   this.timerId = 0;
  // }

  // 2. render 정하기
  render() {
    const { values, isErrorMessageArr, errors, timeArr, categoryArr, formInfoArr } = this.props;
    return `
      <div class="modal-background">
        <form action="#" method="post" class="inputmodal">
          <h1 class="inputmodal-title text-gradient">피스 등록</h1>

          <div class="inputmodal-item-container">
            <input type="text" id="piece-title" class="piece-input" name="title" placeholder="제목을 입력해 주세요."  autocomplete="off" value="${
              values[formInfoArr[0]] ?? ''
            }"/>
            <label for="piece-title" class="pieceadd-error-messages ${isErrorMessageArr[0] ? '' : 'hidden'}">${
      errors.title
    }</label>
          </div>

          
          <ul class="piece-dropdown-list">
            <li class="piece-dropdown-item"> 
              <select name="time" id="piece-time-select" class="piece-input" >
                <option value="">시간 선택</option>
                ${timeArr
                  .map(
                    time =>
                      `<option value="${time}" ${
                        +time === +values[formInfoArr[1]] ? 'selected' : ''
                      }>${time} 시간</option>`
                  )
                  .join('')}
              </select>
              <label for="piece-time-select" class="pieceadd-error-messages ${isErrorMessageArr[1] ? '' : 'hidden'}">${
      errors.time
    }</label>
            </li>

            <li class="piece-dropdown-item">
              <select name="category" id="piece-category-select" class="piece-input" >
                <option value="">카테고리 선택</option>
                ${categoryArr
                  .map(
                    category =>
                      `<option value="${category[0]}" ${category[0] === values[formInfoArr[2]] ? 'selected' : ''}>${
                        category[1]
                      }</option>`
                  )
                  .join('')}
              </select>
              <label for="piece-category-select" class="pieceadd-error-messages ${
                isErrorMessageArr[2] ? '' : 'hidden'
              }">${errors.category}</label>
            </li>

          </ul>
          
          <div class="inputmodal-item-container">
            <input type="text" id="piece-subtitle" class="piece-input" name="subtitle" placeholder="소제목을 입력해 주세요."  autocomplete="off" value="${
              values[formInfoArr[3]] ?? ''
            }"/>
            <label for="piece-subtitle" class="pieceadd-error-messages ${isErrorMessageArr[3] ? '' : 'hidden'}">${
      errors.subtitle
    }</label>
          </div>

          <div class="inputmodal-item-container">
            <textarea name="content" id="piece-content" class="piece-input" cols="30" rows="10" placeholder="내용을 입력해 주세요." value="${
              values[formInfoArr[4]] ?? ''
            }"></textarea>
            <label for="piece-content" class="pieceadd-error-messages ${isErrorMessageArr[4] ? '' : 'hidden'}">${
      errors.content
    }</label>
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
  }

  setEvent() {
    const { validate, request, hideErrorMsg, closeAdd } = this.props.events;

    return [
      {
        type: 'click',
        seletor: '.modal-background',
        handler: closeAdd,
      },
      {
        type: 'input',
        seletor: '.inputmodal',
        handler: validate,
      },
      {
        type: 'submit',
        seletor: '.inputmodal',
        handler: request,
      },
      {
        type: 'click',
        seletor: 'window',
        handler: hideErrorMsg,
      },
    ];
  }

  // getValid(inputType) {
  //   const value = this.state.values[inputType] ?? '';
  //   const schema = {
  //     title: {
  //       get valid() {
  //         return /^.{1,20}$/.test(value);
  //       },
  //     },
  //     time: {
  //       get valid() {
  //         return !!value;
  //       },
  //     },
  //     category: {
  //       get valid() {
  //         return !!value;
  //       },
  //     },
  //     subtitle: {
  //       get valid() {
  //         return /^.{1,20}$/.test(value);
  //       },
  //     },
  //     content: {
  //       get valid() {
  //         return !!value;
  //       },
  //     },
  //   };
  //   return inputType !== undefined
  //     ? schema[inputType].valid
  //     : this.formInfoArr.every(formInfo => this.getValid(formInfo));
  // }

  // hideErrorMsg() {
  //   if (this.state.isErrorMessageArr.some(errMsg => errMsg === true)) {
  //     this.setState({ isErrorMessageArr: this.state.isErrorMessageArr.map(() => false) });
  //     clearTimeout(this.timerId);
  //   }
  // }

  // validate(e) {
  //   if (e.target.matches('#my-piece')) return;
  //   const { value, name } = e.target;
  //   const trimedValue = value.trim();

  //   const values = { ...this.state.values };
  //   values[name] = trimedValue;

  //   this.setState({
  //     values,
  //   });
  // }

  // // !this.getValid(formInfo)
  // showErrorMsg() {
  //   const setErrorMsg = index => {
  //     this.setState({ isErrorMessageArr: this.state.isErrorMessageArr.map((_, idx) => index === idx) });
  //     this.timerId = setTimeout(() => {
  //       this.setState({ isErrorMessageArr: this.state.isErrorMessageArr.map(() => false) });
  //       clearTimeout(this.timerId);
  //     }, 4000);
  //   };

  //   // eslint-disable-next-line no-unused-expressions
  //   !this.formInfoArr.some((formInfo, index) => {
  //     if (this.state.values[formInfo] === '' || this.state.values[formInfo] === undefined) {
  //       setErrorMsg(index);
  //       return true;
  //     }
  //     return false;
  //   })
  //     ? this.formInfoArr.some((formInfo, index) => {
  //         if (!this.getValid(formInfo)) {
  //           setErrorMsg(index);
  //           return true;
  //         }
  //         return false;
  //       })
  //     : null;
  // }

  // request(e) {
  //   e.preventDefault();
  //   const $PieceAdd = e.target;
  //   // 수정해야함
  //   const payload = {
  //     title: $PieceAdd.title.value,
  //     time: $PieceAdd.time.value,
  //     category: $PieceAdd.category.value,
  //     subtitle: $PieceAdd.subtitle.value,
  //   };
  //   if (this.getValid()) {
  //     // 요청
  //     // 페이지 이동
  //     this.setState({ isErrorMessageArr: this.state.isErrorMessageArr.map(() => false) }); // 필요한가?
  //     console.log(`POST /signin`, payload);
  //   } else {
  //     // 실패 처리
  //     this.showErrorMsg();
  //   }
}

export default PieceAdd;
