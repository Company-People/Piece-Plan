import reconciliation from './diff.js';
import { Main, Plan, Login } from '../components/index.js';

const routes = [
  { path: '/', component: Main },
  { path: '/login', component: Login },
  // { path: '/signup', component: Signup },
  // { path: '/calender', component: Calender },
  { path: '/plan', component: Plan },
];

// let component = null;
const pathComponents = {};
class NotFound {
  render() {
    return '';
  }
}

const render = async path => {
  const _path = path ?? window.location.pathname;
  // console.log(_path);
  try {
    const $root = document.getElementById('root');

    // const pathComponent = new (routes.find(route => route.path === _path)?.component || NotFound)();
    // if (!component || component.constructor !== pathComponent.constructor) {
    //   component = pathComponent;
    //   // console.log('change');
    // }

    // 키값이 없다면 새로 인스턴스 생성해서 넣어줌!!
    if (pathComponents[_path] === undefined) {
      pathComponents[_path] = new (routes.find(route => route.path === _path)?.component || NotFound)();
    }

    // 기존에 만들어 놓은 인스턴스와 뒤로 갔다가 와서 새로 만든 인스턴스가 달라서 this가 달라진다.
    // 객체 사용해야함.
    // 키값이 없다면 새로 인스턴스 생성해서 넣어줌!!
    // 이미 한번 와봤던 주소를 키로 갖고 인스턴스를 value로 줘야함
    // 그리고 _path를 통해서 객체에서 꺼내서 랜더하자!!
    // 뒤로 갔다가 오면 state를 초기화해줘야함
    // console.log(
    //   pathComponents[_path].state,
    //   new (routes.find(route => route.path === _path)?.component || NotFound)().state
    // );
    // pathComponents[_path].state = new (routes.find(route => route.path === _path)?.component || NotFound)().state;
    const $virtual = $root.cloneNode();
    const domString = await pathComponents[_path].render();
    // console.log(domString);
    $virtual.innerHTML = domString;

    reconciliation($root, $virtual);
  } catch (e) {
    console.error(e);
  }
};

export default render;
