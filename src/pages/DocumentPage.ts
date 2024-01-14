import Component from "@/core/Component";
import template from "./DocumentPage.html";
import { pageStore } from "@/stores/PageStore";

export default class DocumentPage extends Component {
  initialize() {
    this.render = this.render.bind(this);
    this.subscribe([pageStore]);
  }

  template() {
    return template;
  }

  render() {
    const documentId = Number(pageStore.state.parameters.documentId) || 0;

    this.element.querySelector(
      '[data-id="document-id"]'
    )!.textContent = `${documentId.toString()}번째 다큐먼트`;
  }
}
