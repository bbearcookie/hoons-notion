import Component from "@/core/Component";

interface CounterProps {
  initialCount: number;
  heading?: string;
}

export default class Counter extends Component<CounterProps, number> {
  static create({
    parent,
    props,
  }: {
    parent: HTMLElement;
    props: CounterProps;
  }) {
    const element = document.createElement("div");
    parent.appendChild(element);
    return new Counter({ element, props });
  }

  initialize() {
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
    this.element.querySelector(
      "#count"
    )!.textContent = `${this.props.heading}: ${this.state}`;
  }
}
