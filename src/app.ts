class ProjectInput {
  // tsconfig.js의 lib의 'dom'이 있기 때문에 html 요소 타입들을 사용할 수 있다.
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById("app")! as HTMLDivElement;

    // importNode(1, 2)
    // 1. template 태그 안에 있는 html 코드에 대한 참조 제공.
    // 2. 노드의 자식들을 포함해서 가져온다.(깊은 복사)
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = this.element.querySelector("#title")!;
    this.descriptionInputElement = this.element.querySelector("#description")!;
    this.peopleInputElement = this.element.querySelector("#number")!;

    this.configure();
    this.attach();
  }

  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    // insertAdjacentElement(1, 2): html 요소를 삽입할 때 사용.
    // 1: 삽입할 곳.
    // 2: 삽입할 요소.
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const prjInput = new ProjectInput();
