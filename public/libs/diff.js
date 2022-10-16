const reconciliation = (realNode, virtualNode) => {
  // 넘어온 노드가 요소 노드일 때
  if (realNode instanceof Element) {
    const rAttributes = [...realNode.attributes];
    const vAttributes = [...virtualNode.attributes];

    // 가상 요소의 어트리뷰트 비교하여 추가
    vAttributes.forEach(({ name, value }) => {
      realNode.setAttribute(name, value);
    });
    // 가상 요소에 없는 어트리뷰트 비교하여 삭제
    rAttributes.forEach(({ name }) => {
      if (!vAttributes.map(({ name }) => name).includes(name)) realNode.removeAttribute(name);
    });
    // 요소의 프로퍼티 비교 후 최신화
    if (realNode instanceof HTMLInputElement) {
      realNode.checked = virtualNode.checked;
      if (realNode.value !== virtualNode.value) realNode.value = virtualNode.value;
    }
  } else {
    // 텍스트 노드가 변경된 경우 바꿔주기
    realNode.data !== virtualNode.data && realNode.replaceWith(virtualNode);
  }

  // 재귀 탈출 조건
  // 가상 요소에 자식이 없는 경우 돔 요소의 자식 비우기
  if (virtualNode.firstChild === null) {
    realNode.innerHTML = '';
    return;
  }

  const rChildren = [...realNode.childNodes];
  const vChildren = [...virtualNode.childNodes];

  // 자식 갯수가 더 긴 배열을 순회
  (rChildren.length < vChildren.length ? vChildren : rChildren).forEach((_, i) => {
    // real에는 없고 virtual에는 있는 경우
    if (!rChildren[i] && vChildren[i]) realNode.append(vChildren[i].cloneNode(true));
    // real에는 있는 virtual에는 없는 경우
    else if (rChildren[i] && !vChildren[i]) rChildren[i].remove();
    // 둘 다 존재하지만 타입이 다른 경우 (테스트 해봐야함)
    else if (rChildren[i].tagName !== vChildren[i].tagName) rChildren[i].replaceWith(vChildren[i].cloneNode(true));
    // 둘 다 존재하고 타입이 같은 경우
    else if (rChildren[i].tagName === vChildren[i].tagName) reconciliation(rChildren[i], vChildren[i]);
  });
};

export default reconciliation;

// const updateDOM = (parentNode, realNode, virtualNode) => {
//   // 기존 node는 없고 새로운 node만 있다면 새로운 node를 추가한다.
//   if (!realNode && virtualNode) {
//     parentNode.appendChild(virtualNode);
//     return;
//   }

//   // 기존 node는 있고 새로운 node는 없다면 기존 node를 제거한다.
//   if (realNode && !virtualNode) {
//     parentNode.removeChild(realNode);
//     return;
//   }

//   // 기존 node와 새로운 node 모두 Text node고 기존 node와 새로운 node의 textContent가 다르면 새로운 textContent로 교체한다.
//   if (realNode.nodeType === Node.TEXT_NODE && virtualNode.nodeType === Node.TEXT_NODE) {
//     if (realNode.textContent !== virtualNode.textContent) realNode.textContent = virtualNode.textContent;
//     return;
//   }

//   // 기존 node 또는 새로운 node가 comment node면 무시한다.
//   if (realNode.nodeType === Node.COMMENT_NODE || virtualNode.nodeType === Node.COMMENT_NODE) return;

//   // Element.nodeName이 다르면 기존 node를 제거하고 새로운 node로 교체한다. node가 자식을 가진 tree라면 자식 node들 모두 재구축된다.
//   if (realNode.nodeName !== virtualNode.nodeName) {
//     // realNode 앞에 virtualNode을 삽입한다. realNode는 반드시 존재하며 element node다.
//     parentNode.insertBefore(virtualNode, realNode);
//     parentNode.removeChild(realNode);
//     return;
//   }

//   // ↓ element.nodeName이 동일한 경우, attribute를 확인해 동일하면 유지하고 다르면 변경한다.

//   // virtualNode에 존재하는 어트리뷰트가 realNode에는 존재하지 않거나 어트리뷰트 값이 같지 않으면 realNode에 해당 어트리뷰트를 추가/변경해 virtualNode와 일치시킨다.
//   for (const { name, value } of [...virtualNode.attributes]) {
//     if (!realNode.hasAttribute(name) || realNode.getAttribute(name) !== value) {
//       realNode.setAttribute(name, value);
//     }
//   }

//   // realNode에 존재하는 어트리뷰트가 virtualNode에는 존재하지 않으면 realNode에서 해당 어트리뷰트를 제거해 virtualNode와 일치시킨다.
//   for (const { name } of [...realNode.attributes]) {
//     if (!virtualNode.hasAttribute(name)) realNode.removeAttribute(name);
//   }

//   ['checked', 'value', 'selected'].forEach(key => {
//     if (realNode[key] !== undefined && virtualNode[key] !== undefined && realNode[key] !== virtualNode[key]) {
//       realNode[key] = virtualNode[key];
//     }
//   });

//   // element의 자식 node와 text를 재귀 비교해 DOM에 update한다.
//   // eslint-disable-next-line no-use-before-define
//   reconciliation(realNode, virtualNode);
// };

// const reconciliation = (realDOM, virtualDOM) => {
//   // console.log({ oldNode: realDOM.innerHTML, newNode: virtualDOM.innerHTML });

//   // node의 text까지 처리해야 하므로 children 대신 childNodes를 사용한다.
//   const [realNodes, virtualNodes] = [[...realDOM.childNodes], [...virtualDOM.childNodes]];
//   const max = Math.max(realNodes.length, virtualNodes.length);

//   for (let i = 0; i < max; i++) {
//     updateDOM(realDOM, realNodes[i], virtualNodes[i]);
//   }
// };
// export default reconciliation;
