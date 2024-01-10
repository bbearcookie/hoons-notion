import Component from "@/core/Component";

export default class App extends Component {
  render() {
    this.element.innerHTML = `
      <h1>Hello, World!</h1>
    `;
  }
}
