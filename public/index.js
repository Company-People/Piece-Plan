import render from './libs/render.js';

/*
 * popstate 이벤트는 pushState에 의해 발생하지 않고 앞으로/뒤로 가기 버튼을 클릭하거나
 * history.forward/back/go(n)에 의해 history entry가 변경되면 발생한다.
 * 앞으로/뒤로 가기 버튼을 클릭하면 window.location.pathname를 참조해 뷰를 전환한다.
 */
window.addEventListener('popstate', () => render());

// 웹페이지가 처음 로딩되면 window.location.pathname를 확인해 페이지를 이동시킨다.
window.addEventListener('DOMContentLoaded', () => render());
