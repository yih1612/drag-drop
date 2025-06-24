import { autoBind as AutoBind } from "../decorators/autobind";
import { projectState } from "../state/project-state";
import * as Validation from "../util/validation";
// export default를 한경우에 이름을 마음대로 써도 됨.
// import Cpt from "./base-component";
import Component from "./base-component";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super("project-input", "app", true, "user-input");

    this.titleInputElement = this.element.querySelector("#title")!;
    this.descriptionInputElement = this.element.querySelector("#description")!;
    this.peopleInputElement = this.element.querySelector("#people")!;

    this.configure();
  }

  // public은 private보다 앞에 둬야한다.
  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      // 하나라도 false값이 나온다면
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(peopleValidatable)
    ) {
      alert("Invalid input, plz try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  // decorator를 쓸 경우에 tsconfig.json에서 아래 부분 주석 해제해야 한다.
  // "experimentalDecorators": true
  @AutoBind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
