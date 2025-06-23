// Drag & Drop Interfaces
export interface Draggable {
  // 드래그 이벤트의 시작을 기다리는 리스너
  dragStartHandler(event: DragEvent): void;
  // 드래그 이벤트의 종료를 기다리는 리스너
  dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
  // 드래그하는 대상이 유효한 드래그 타깃인지를 브라우저와 타이스크립트에 알려주기 위한 역할.
  dragOverHandler(event: DragEvent): void;
  // 드롭이 일어나면 반응하는 역할.
  // 데이터와 UI를 업데이트.
  dropHandler(event: DragEvent): void;
  // 박스 위로 뭔가를 드래그했을 때.
  // 배경색을 바꾸거나 사용자에게 시각적인 피드백을 주려고 할 때.
  // 드롭이 이루어지지 않고 취소하거나 사용자가 요소를 다른 곳으로 옮길 때 시각적으로 업데이트를 되돌리 때.
  dragLeaveHandler(event: DragEvent): void;
}
