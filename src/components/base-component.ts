// Component Base Class
// 직접 인스턴스화를 하지 않게끔 abstract.
export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  // tsconfig.js의 lib의 'dom'이 있기 때문에 html 요소 타입들을 사용할 수 있다.
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    // importNode(1, 2)
    // 1. template 태그 안에 있는 html 코드에 대한 참조 제공.
    // 2. 노드의 자식들을 포함해서 가져온다.(깊은 복사)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  // insertAdjacentElement(1, 2): html 요소를 삽입할 때 사용.
  // 1: 삽입할 곳.
  // 2: 삽입할 요소.
  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
  abstract renderContent(): void;
}
