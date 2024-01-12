import Component from "@/core/Component";

interface CounterProps {
  initialCount: number;
  heading?: string;
}

export default class Counter extends Component<CounterProps, number> {
  static tagName = "div";

  initialize() {
    const element = this.element as HTMLDivElement;

    element.style.height = "75px";
    element.style.backgroundColor = "lightgray";

    this.state = this.props.initialCount;
    this.props = {
      heading: "기본 카운터",
      ...this.props,
    };
  }

  handleIncrement() {
    this.setState(this.state + 1);
  }

  handleDecrement() {
    this.setState(this.state - 1);
  }

  componentDidMount() {
    this.element
      .querySelector("button[data-id=increment]")
      ?.addEventListener("click", () => this.handleIncrement());
    this.element
      .querySelector("button[data-id=decrement]")
      ?.addEventListener("click", () => this.handleDecrement());
  }

  template() {
    return `
      <p data-id="count"></p>
      <button type="button" data-id="increment">Increment</button>
      <button type="button" data-id="decrement">Decrement</button>
    `;
  }

  render() {
    this.element.querySelector(
      "[data-id=count]"
    )!.textContent = `${this.props.heading}: ${this.state}`;
  }
}
