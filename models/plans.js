const { v4: uuid } = require('uuid');
const { pieces } = require('./pieces.js');

let plans = [
  {
    date: '2022-09-22',
    planId: 'd3af9015-3272-4bae-9a8a-8fdc71663848',
    pieces: [
      {
        pieceId: 'c544dfaa-5b6c-4c87-b290-c2f857f5bae5',
        title: '이두 조지기!',
        category: 'exercise',
        startTime: 1,
        endTime: 3,
      },
      {
        pieceId: '88ef1bc9-f037-4eaa-aaaa-5f94b0997285',
        title: '[인기폭발] 을왕리 맛집 코스',
        category: 'trip',
        startTime: 5,
        endTime: 9,
      },
      {
        pieceId: 'ec6a2e97-2b33-43b0-adbc-2ac0abf07c05',
        title: '개발자가 꼭 알아야 할 공부법',
        category: 'work',
        startTime: 13,
        endTime: 16,
      },
    ],
    userId: 'f3c01bd3-c491-4034-a961-bf63e988ccbf',
  },
];

const getMyPlans = id => plans.filter(plan => plan.userId === id);

const getSelectPlan = date => plans.filter(plan => plan.date === date);

const addPlans = ({ date, pieceId, startTime }, userId) => {
  const plan = plans.find(plan => plan.date === date);
  // console.log(plan);
  const { pieceId: id, title, category, time } = pieces.find(piece => piece.pieceId === pieceId);
  const endTime = +startTime + time;

  const newPiece = { pieceId: id, title, category, startTime: +startTime, endTime };

  if (plan) {
    // 시간이 겹치는지 여부 확인
    const newTimes = Array.from({ length: time }).map((_, i) => i + +startTime);
    const checked = plan.pieces.every(({ startTime, endTime }) => {
      const times = Array.from({ length: endTime - startTime }).map((_, i) => i + startTime);
      return newTimes.length + times.length === new Set([...newTimes, ...times]).size;
    });

    if (!checked || endTime > 24) return;

    plan.pieces = [newPiece, ...plan.pieces];
  } else {
    plans = [{ date, planId: uuid(), pieces: [newPiece], userId }, ...plans];
  }
  // console.log(plans);
  // console.log(plans, plan);
};

module.exports = { addPlans, getMyPlans, getSelectPlan };
