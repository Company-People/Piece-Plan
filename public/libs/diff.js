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
