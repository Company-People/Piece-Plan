const { v4: uuid } = require('uuid');
const { getFavorites } = require('./favorites.js');

let pieces = [
  {
    pieceId: '88ef1bc9-f037-4eaa-aaaa-5f94b0997285',
    category: 'trip',
    title: '[인기폭발] 을왕리 맛집 코스',
    subTitle: '을왕리의 맛집 및 이쁜 카페 4시간 코스!',
    content:
      '을왕리의 짱구네 낙지 식당에 들려 맛있는 식사! 1시간~ \n 이후 마시안 해변가 카페에 들러 달달한 빵과 커피를 즐겨보세요! 2시간~',
    share: true,
    favoriteCnt: 30,
    time: 4,
    writeDate: '2022-10-04',
    userId: 'f3c01bd3-c491-4034-a961-bf63e988ccbf',
  },
  {
    pieceId: 'ec6a2e97-2b33-43b0-adbc-2ac0abf07c05',
    category: 'work',
    title: '개발자가 꼭 알아야 할 공부법',
    subTitle: '이렇게 학습하고 개발 실력을 쑥쑥 키워보자! 꿀팁 대방출',
    content:
      '1. 공부하고자 하는 내용에 대한 구글링을 30분간 진행하세요. \n 개념에 대한 정리를 1시간30분 동안 반복하여 손글씨로 써보세요^^',
    share: true,
    favoriteCnt: 62,
    time: 2,
    writeDate: '2022-10-04',
    userId: 'f3c01bd3-c491-4034-a961-bf63e988ccbf',
  },
  {
    pieceId: '55863ecc-6370-4517-99c2-f695aea6b394',
    category: 'study',
    title: '100일의 전사, 편입의 기적',
    subTitle: '현대판 비급서',
    content: '빨간책 영단어 1시간\n 김동준 문법 1시간\n  모의고사 1시간',
    share: true,
    favoriteCnt: 790,
    time: 3,
    writeDate: '2022-10-04',
    userId: 'f3c01bd3-c491-4034-a961-bf63e988ccbf',
  },
  {
    pieceId: '2d527f22-6cf6-4d47-8b04-604dc0e10b6c',
    category: 'parenting',
    title: '11개월 아기 하루 스케줄',
    subTitle: '저희 아기 하루 스케줄 공유해봐요',
    content: '8:00 기상\n 8:30 이유식\n 9:00 분유\n 11:00~1:00 낮잠\n 1:00 이유식 ...',
    share: true,
    favoriteCnt: 123,
    time: 3,
    writeDate: '2022-10-12',
    userId: '08ee5b01-5edd-48c8-ab0d-78ab5c40edb9',
  },
  {
    pieceId: '4da68e42-3901-4ce6-92b7-f58565baee61',
    category: 'play',
    title: '너도 21세기 카사노바?',
    subTitle: '21세기 카사노바, 의자왕이 되어볼까?',
    content:
      '쳅터 1: 남자는 머리빨! 강남 미용실부터 예약하자 1시간 \n 쳅터 2: 옷이 중요하다! 무신사 인기순 ㄱㄱ 1시간 \n 체터 3: 남자는 자신감! 웅변학원 등록 1시간',
    share: true,
    favoriteCnt: 3,
    time: 3,
    writeDate: '2022-10-13',
    userId: '08ee5b01-5edd-48c8-ab0d-78ab5c40edb9',
  },
  {
    pieceId: 'f7ef7024-4a8d-40d7-96af-1e62aea9add7',
    category: 'rest',
    title: '공휴일 야무지게 보내는 법',
    subTitle: '짧은 공휴일 야무지게 보내보자!',
    content:
      '아침 산책 30분\n 낮잠 2시간\n 지인 만나기 2시간\n 게임하기 2시간\n 시원한 맥주마시며 넷플릭스 보기 1시간\n',
    share: true,
    favoriteCnt: 24,
    time: 3,
    writeDate: '2022-10-01',
    userId: '08ee5b01-5edd-48c8-ab0d-78ab5c40edb9',
  },
  {
    pieceId: 'cd942996-e38f-4ff4-952b-795edfb099dc',
    category: 'art',
    title: '마블 코믹스 수석 디자이너의 드로잉 강의',
    subTitle: '너도 마블 디자이너??',
    content:
      '[김락희의 인체 드로잉]을 보고 인체 드로잉 2시간 동안 근육 공부 \n [쉽게 배우는 인체 드로잉] 보고 1시간 손 공부',
    share: true,
    favoriteCnt: 19,
    time: 3,
    writeDate: '2022-10-07',
    userId: '08ee5b01-5edd-48c8-ab0d-78ab5c40edb9',
  },
  {
    pieceId: 'c544dfaa-5b6c-4c87-b290-c2f857f5bae5',
    category: 'exercise',
    title: '이두 조지기!',
    subTitle: '이두 효과적으로 키우는 방법',
    content: '헤머컬 20회 1시간 진행 \n 인클라인 덤벨컬 20회 1시간 진행 \n 총 2시간 세트별 휴식 시간 30초입니다!',
    share: true,
    favoriteCnt: 364,
    time: 2,
    writeDate: '2022-10-04',
    userId: '08ee5b01-5edd-48c8-ab0d-78ab5c40edb9',
  },
];

const getPieces = () => pieces;

const addPiece = formData => {
  const { category, title, subtitle, content, mypiece, time, userId } = formData;
  const writeDate = new Date().toLocaleString('ko-KR', { timeZone: 'UTC' }).split('. ').slice(0, 3).join('-');

  const newPiece = {
    pieceId: uuid(),
    category,
    title,
    subTitle: subtitle,
    content,
    share: !mypiece,
    favoriteCnt: 0,
    time: +time,
    writeDate,
    userId,
  };
  pieces = [newPiece, ...pieces];

  return newPiece.pieceId;
};

const getFilterPieces = (userId, filterId, search) => {
  if (search !== '') return pieces.filter(piece => piece.title.includes(search));

  if (filterId === 'all') return pieces.filter(piece => piece.share);

  if (filterId === 'my') return pieces.filter(piece => piece.userId === userId);

  if (filterId === 'favorite')
    return pieces.filter(piece =>
      getFavorites()
        .filter(favorite => favorite.userId === userId)
        .find(favorite => favorite.pieceId === piece.pieceId)
    );
};

const calcFavorite = (pieceId, isFavorite) => {
  const piece = pieces.find(piece => piece.pieceId === pieceId);

  piece.favoriteCnt += !isFavorite ? 1 : -1;

  return piece;
};

module.exports = { getPieces, addPiece, getFilterPieces, calcFavorite };
