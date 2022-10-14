import reconciliation from './diff.js';
import { Plan } from '../components/index.js';

const routes = [
  // { path: '/', component: Main },
  // { path: '/login', component: Login },
  // { path: '/signup', component: Signup },
  // { path: '/calender', component: Calender },
  { path: '/plan', component: Plan },
];

let component = null;

class NotFound {
  render() {
    return '';
  }
}

const render = async path => {
  const _path = path ?? window.location.pathname;

  try {
    const $root = document.getElementById('root');
    const pathComponent = new (routes.find(route => route.path === _path)?.component || NotFound)();
    if (!component || component.constructor !== pathComponent.constructor) component = pathComponent;

    const $virtual = $root.cloneNode();
    const domString = await component.render();
    // console.log(domString);
    $virtual.innerHTML = domString;

    reconciliation($root, $virtual);
  } catch (e) {
    console.error(e);
  }
};

export default render;
