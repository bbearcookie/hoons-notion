import template from "./DocumentPage.html";
import Page from "@/core/Page";

export default class DocumentPage extends Page {
  initialize() {
    this.render = this.render.bind(this);
  }

  template() {
    return template;
  }

  render() {
    const documentId = Number(this.pageStore.state.parameters.documentId) || 0;

    this.element.querySelector(
      '[data-id="document-id"]'
    )!.textContent = `${documentId.toString()}번째 다큐먼트`;
  }
}
