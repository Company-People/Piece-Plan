const pieces = [
  {
    pieceId: 9,
    category: '공부',
    title: '코딩 테스트 정복',
    subTitle: '프로그래머스 완전 탐색 문제 부수기 👊',
    content:
      '코딩 테스트를 준비하면서 완전 탐색을 공부할 때 효율적이라고 생각했던 공부 루틴을 공유합니다. <br> - 프로그래머스 Lv.1 어쩌고 풀기 <br> - 프로그래머스 Lv.2 어쩌고 풀기 <br> - 동빈나 유튜브 해설 강의 듣기 <br> ⭐Tip⭐ 혼자 생각하는 시간은 최대 1시간을 넘지 않도록 하기!',
    share: true,
    favoriteCnt: 60,
    time: 3,
    writeDate: '2022-10-12',
    userId: 1,
  },
  {
    pieceId: 8,
    category: '여행',
    title: '[인기폭발] 을왕리 맛집 코스',
    subTitle: '을왕리의 맛집 및 이쁜 카페 4시간 코스!',
    content:
      '을왕리의 짱구네 낙지 식당에 들려 맛있는 식사! 1시간~ \n 이후 마시안 해변가 카페에 들러 달달한 빵과 커피를 즐겨보세요! 2시간~',
    share: true,
    favoriteCnt: 30,
    time: 4,
    writeDate: '2022-10-04',
    userId: 1,
  },
  {
    pieceId: 7,
    category: '업무',
    title: '개발자가 꼭 알아야 할 공부법',
    subTitle: '이렇게 학습하고 개발 실력을 쑥쑥 키워보자! 꿀팁 대방출',
    content:
      '1. 공부하고자 하는 내용에 대한 구글링을 30분간 진행하세요. \n 개념에 대한 정리를 1시간30분 동안 반복하여 손글씨로 써보세요^^',
    share: true,
    favoriteCnt: 0,
    time: 2,
    writeDate: '2022-10-04',
    userId: 3,
  },
  {
    pieceId: 6,
    category: '공부',
    title: '100일의 전사, 편입의 기적',
    subTitle: '현대판 비급서',
    content: '빨간책 영단어 1시간\n 김동준 문법 1시간\n  모의고사 1시간',
    share: true,
    favoriteCnt: 0,
    time: 3,
    writeDate: '2022-10-04',
    userId: 4,
  },
  {
    pieceId: 5,
    category: '육아',
    title: '11개월 아기 하루 스케줄',
    subTitle: '저희 아기 하루 스케줄 공유해봐요',
    content: '8:00 기상\n 8:30 이유식\n 9:00 분유\n 11:00~1:00 낮잠\n 1:00 이유식 ...',
    share: true,
    favoriteCnt: 0,
    time: 3,
    writeDate: '2022-10-12',
    userId: 4,
  },
  {
    pieceId: 4,
    category: '꿀팁',
    title: '너도 21세기 카사노바?',
    subTitle: '21세기 카사노바, 의자왕이 되어볼까?',
    content:
      '쳅터 1: 남자는 머리빨! 강남 미용실부터 예약하자 1시간 \n 쳅터 2: 옷이 중요하다! 무신사 인기순 ㄱㄱ 1시간 \n 체터 3: 남자는 자신감! 웅변학원 등록 1시간',
    share: true,
    favoriteCnt: 0,
    time: 3,
    writeDate: '2022-10-13',
    userId: 2,
  },
  {
    pieceId: 3,
    category: '휴식',
    title: '공휴일 야무지게 보내는 법',
    subTitle: '짧은 공휴일 야무지게 보내보자!',
    content:
      '아침 산책 30분\n 낮잠 2시간\n 지인 만나기 2시간\n 게임하기 2시간\n 시원한 맥주마시며 넷플릭스 보기 1시간\n',
    share: true,
    favoriteCnt: 0,
    time: 3,
    writeDate: '2022-10-01',
    userId: 1,
  },
  {
    pieceId: 2,
    category: '예술',
    title: '마블 코믹스 수석 디자이너의 드로잉 강의',
    subTitle: '너도 마블 디자이너??',
    content:
      '[김락희의 인체 드로잉]을 보고 인체 드로잉 2시간 동안 근육 공부 \n [쉽게 배우는 인체 드로잉] 보고 1시간 손 공부',
    share: true,
    favoriteCnt: 0,
    time: 3,
    writeDate: '2022-10-07',
    userId: 3,
  },
  {
    pieceId: 1,
    category: '운동',
    title: '이두 조지기!',
    subTitle: '이두 효과적으로 키우는 방법',
    content: '헤머컬 20회 1시간 진행 \n 인클라인 덤벨컬 20회 1시간 진행 \n 총 2시간 세트별 휴식 시간 30초입니다!',
    share: true,
    favoriteCnt: 1,
    time: 2,
    writeDate: '2022-10-04',
    userId: 2,
  },
];

export default pieces;

// category

// - 운동
// - 공부
// - 데이트
// - 여행
// - 예술
// - 놀이
// - 휴식
// - 업무
// - 육아
// - 꿀팁
