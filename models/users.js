const { v4: uuid } = require('uuid');

let users = [
  {
    userId: 'ef1f1539-286f-4aa0-acd7-9ddc5aa8efac',
    id: 'nalsae0207',
    name: '김팀장',
    password: '00000000',
  },
  {
    userId: '1e6db1f7-3cf7-4b0a-933d-c22a164db98b',
    id: '10rlatkdtn',
    name: '김차장',
    password: '1q2w3e4r',
  },
  {
    userId: 'f3c01bd3-c491-4034-a961-bf63e988ccbf',
    id: 'eunoo1995',
    name: '김과장',
    password: '1q2w3e4r',
  },
  {
    userId: '08ee5b01-5edd-48c8-ab0d-78ab5c40edb9',
    id: 'kawaheejun',
    name: '전부장',
    password: '1q2w3e4r',
  },
];

const createNewUser = (id, name, password) => {
  const newUser = { userid: uuid(), id, name, password };
  users = [...users, newUser];
  return users;
};

const isDuplicateUser = id => {
  console.log(id);
  return users.some(user => user.id === id);
};
module.exports = { users, createNewUser, isDuplicateUser };
