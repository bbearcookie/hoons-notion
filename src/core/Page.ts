import Component from "./Component";

export default class Page extends Component {
  outlet: HTMLElement;

  constructor({ element, ...args }: { element: HTMLElement }) {
    super({ element, ...args });

    this.outlet = this.element.querySelector("[data-id=outlet]") as HTMLElement;
  }

  static createElement({ parent }: { parent?: HTMLElement }) {
    const element = document.createElement(this.tagName);

    if (parent) {
      parent.appendChild(element);
    }

    return new this({ element });
  }
}
