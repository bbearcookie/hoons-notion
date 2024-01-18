import Page from "@/core/Page";
import { pageStore } from "@/stores/PageStore";

export default class ThirdPage extends Page {
  initialize() {
    this.render = this.render.bind(this);
    this.subscribe([pageStore]);
  }

  template() {
    return `
      <h1>Third Page</h1>
    `;
  }
}
