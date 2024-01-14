import Component from "./Component";
import PageStore from "@/stores/PageStore";

export default class Page extends Component {
  pageStore: PageStore;

  constructor({
    element,
    pageStore,
    ...args
  }: {
    element: HTMLElement;
    pageStore: PageStore;
  }) {
    super({ element, ...args });
    this.pageStore = pageStore;
    this.subscribe([this.pageStore]);
  }

  static createPage({
    parent,
    pageStore,
  }: {
    parent: HTMLElement;
    pageStore: PageStore;
  }) {
    const element = document.createElement(this.tagName);

    if (parent) {
      parent.appendChild(element);
    }

    return new this({ element, pageStore });
  }
}
