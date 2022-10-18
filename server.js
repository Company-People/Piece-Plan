const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

let { users } = require('./models/users.js');
const { getPieces, addPiece, getFilterPieces, calcFavorite } = require('./models/pieces.js');
const { createPlan, removePlan, addPlan, patchPlan, getMyPlans, getSelectedPlan } = require('./models/plans.js');
const { getMyFavorites, toggleFavorite } = require('./models/favorites.js');


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5500;

app.use(express.static('public'));
app.use('/plan', express.static('public'));
app.use(express.json());
app.use(cookieParser());

const auth = (req, res, next) => {
  const { accessToken } = req.cookies;

  try {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    // console.log('인증 성공', decoded);
    next();
  } catch (e) {
    // console.error('사용자 인증 실패', e);
    res.redirect('/login');
  }
};

app.get('/auth', (req, res) => {
  const { accessToken } = req.cookies;

  res.send(!!accessToken);
});

// 로그인 요청
app.post('/login', (req, res) => {
  const { id, password } = req.body;

  const user = users.find(user => user.id === id && user.password === password);

  if (!user) res.send(false);

  const accessToken = jwt.sign({ userId: user.userId, name: user.name }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  res.setHeader('Access-Control-Allow-Credentials', 'true');

  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
    httpOnly: true,
  });

  res.send(true);
});

app.get('/logout', (req, res) => {
  res.clearCookie('accessToken');

  res.end();
});

// 회원가입 요청
app.post('/signup', (req, res) => {
  const { userid: id, username: name, password } = req.body;

  if (isDuplicateUser(id, name)) res.send(false);

  users = createNewUser(id, name, password);
  res.send(true);
});

app.get('/mycalendar', auth, (req, res) => {
  const { userId, name } = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);

  res.send({ name, pieces: getPieces(), plans: getMyPlans(userId) });
});

// 전체 피스 취득 요청
app.get('/pieces', auth, (req, res) => {
  const { userId } = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);
  const { filterId, searchText } = req.query;

  res.send({ pieces: getFilterPieces(userId, filterId, searchText) });
});

// 개별 피스 등록 요청
app.post('/pieces', auth, (req, res) => {
  const { userId } = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);
  const formData = req.body;

  const pieceId = addPiece({ ...formData, userId });
  addPlan({ ...formData, userId, pieceId });

  res.end();
});

app.post('/plans', auth, (req, res) => {
  const { userId } = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);
  const { date } = req.body;

  res.send(createPlan(userId, date));
});

app.get('/plans', auth, (req, res) => {
  const { userId, name } = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);
  const { date } = req.query;

  res.send({ name, plan: getSelectedPlan(userId, date) });
});

//
app.patch('/plans/:planId', auth, (req, res) => {
  const { planId } = req.params;
  const { pieces } = req.body;

  pieces.sort((a, b) => a.startTime - b.startTime);

  pieces.length === 0 ? removePlan(planId) : patchPlan(planId, pieces);

  res.end();
});

app.get('/favorites', auth, (req, res) => {
  const { userId } = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);

  res.send({ favorites: getMyFavorites(userId) });
});

app.patch('/favorites/:pieceId', (req, res) => {
  const { userId } = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET_KEY);
  const { pieceId } = req.params;
  const { isFavorite } = req.body;

  toggleFavorite(userId, pieceId, isFavorite);
  calcFavorite(pieceId, isFavorite);

  res.end();
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// listen (port번호, callback) - 언제올지 모르는 요청을 위해 무한루프를 돌며 켜져있어야 한다.
app.listen(PORT, () => {
  console.log(`app listening on ${PORT}`);
});
