import Component from "@/core/Component";

export default class Counter extends Component<{}, number> {
  initialize() {
    this.state = 0;
  }

  handleIncrement() {
    this.setState(this.state + 1);
  }

  handleDecrement() {
    console.log(this);
    this.setState(this.state - 1);
  }

  componentDidMount() {
    this.element
      .querySelector("#increment")
      ?.addEventListener("click", () => this.handleIncrement());
    this.element
      .querySelector("#decrement")
      ?.addEventListener("click", () => this.handleDecrement());
  }

  template() {
    return `
      <p id="count"></p>
      <button id="increment">Increment</button>
      <button id="decrement">Decrement</button>
    `;
  }

  render() {
    this.element.querySelector("#count")!.textContent = `Count: ${this.state}`;
  }
}
