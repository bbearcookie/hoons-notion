import Page from "@/core/Page";

export default class ThirdPage extends Page {
  initialize() {
    this.render = this.render.bind(this);
  }

  template() {
    return `
      <h1>Third Page</h1>
    `;
  }
}
