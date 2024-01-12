import Component from "@/core/Component";

export default class ThirdPage extends Component {
  template() {
    return `
      <h1>Third Page</h1>
    `;
  }

  componentWillUnmount(): void {
    console.log("ThirdPage: componentWillUnmount");
    console.log(this.element);
  }
}
