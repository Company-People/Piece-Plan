import reconciliation from './diff.js';

import { Main, Plan, Login, Signup, Calendar, NotFound } from '../components/index.js';

const routes = [
  { path: '/', component: Main },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/calendar', component: Calendar, guard: true },
  { path: '/plan', component: Plan, guard: true },
];

const components = {};
let prevPath = null;

const render = async path => {
  let _path = path ?? window.location.pathname;
  if (_path.lastIndexOf('/') !== 0) {
    _path = _path.substring(0, _path.lastIndexOf('/'));
  }

  const route = routes.find(route => route.path === _path);

  let CurrentComponent = route?.component || NotFound;

  const { data: auth } = await axios.get('/auth');

  if (route?.guard && !auth) {
    _path = '/login';
    CurrentComponent = Login;
    window.history.pushState(null, null, '/login');
  }

  try {
    const $root = document.getElementById('root');

    if (!components[_path]) components[_path] = new CurrentComponent();

    if (prevPath !== _path) components[_path].state = new CurrentComponent().state;

    prevPath = _path;

    const $virtual = $root.cloneNode();
    const domString = await components[_path].render();
    $virtual.innerHTML = domString;

    reconciliation($root, $virtual);
  } catch (e) {
    console.error(e);
  }
};

export default render;
