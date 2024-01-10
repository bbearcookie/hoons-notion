import Component from "@/core/Component";

export default class Counter extends Component<{}, number> {
  componentDidInitialized() {
    this.state = 0;
  }

  handleIncrement() {
    this.setState(this.state + 1);
  }

  handleDecrement() {
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

  componentDidUpdate() {
    this.element
      .querySelector("#increment")
      ?.addEventListener("click", () => this.handleIncrement());
    this.element
      .querySelector("#decrement")
      ?.addEventListener("click", () => this.handleDecrement());
  }

  render() {
    this.element.innerHTML = `
      <p>Count: ${this.state}</p>
      <button id="increment">Increment</button>
      <button id="decrement">Decrement</button>
    `;
  }
}
