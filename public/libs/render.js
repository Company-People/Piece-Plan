// import reconciliation from './diff.js';
// import { Main, Login, Signup, Calender, Plan } from '../components/index.js';

// const $root = document.getElementById('root');

// const routes = [
//   { path: '/', component: Main },
//   { path: '/login', component: Login },
//   { path: '/signup', component: Signup },
//   { path: '/calender', component: Calender },
//   { path: '/plan', component: Plan },
// ];

const render = path => {
  const _path = path ?? window.location.pathname;
  console.log(_path);
  // try {
  //   const Component = routes.find(route => route.path === _path)?.component || Main;
  //   const $virtual = $root.cloneNode();
  //   const domString = new Component().render();
  //   $virtual.innerHTML = domString;

  //   reconciliation($root, $virtual);
  // } catch (e) {
  //   console.error(e);
  // }
};

export default render;
