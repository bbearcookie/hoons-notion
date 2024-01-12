import Component from "@/core/Component";

export default class OnePage extends Component {
  template() {
    return `
      <h1>One Page</h1>
    `;
  }

  componentWillUnmount(): void {
    console.log("OnePage: componentWillUnmount");
  }
}
