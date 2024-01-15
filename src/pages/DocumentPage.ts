import Page from "@/core/Page";
import { pageStore } from "@/stores/PageStore";
import template from "./DocumentPage.html";

export default class DocumentPage extends Page {
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
