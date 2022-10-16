import reconciliation from './diff.js';

import { Main, Plan, Login, Calendar } from '../components/index.js';

const routes = [
  { path: '/', component: Main },
  { path: '/login', component: Login },
  // { path: '/signup', component: Signup },
  { path: '/calendar', component: Calendar },
  { path: '/plan', component: Plan },
];

const components = {};
let prevPath = null;

class NotFound {
  render() {
    return '';
  }
}

const render = async path => {
  let _path = path ?? window.location.pathname;

  if (_path.lastIndexOf('/') !== 0) {
    _path = _path.substring(0, _path.lastIndexOf('/'));
  }

  const CurrentComponent = routes.find(route => route.path === _path)?.component || NotFound;

  try {
    const $root = document.getElementById('root');

    if (!components[_path]) components[_path] = new CurrentComponent();

    if (prevPath !== _path) {
      components[_path].state = new CurrentComponent().state;
    }
    prevPath = _path;

    const $virtual = $root.cloneNode();
    const domString = await components[_path].render();
    // console.log(domString);
    $virtual.innerHTML = domString;

    reconciliation($root, $virtual);
  } catch (e) {
    console.error(e);
  }
};

export default render;
