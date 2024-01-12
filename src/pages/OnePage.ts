import Component from "@/core/Component";
import { counterStore } from "@/stores/CounterStore";

export default class OnePage extends Component {
  initialize() {
    this.render = this.render.bind(this);
  }

  componentDidMount(): void {
    const incrementButton = this.element.querySelector(
      '[data-id="increment"]'
    ) as HTMLElement;
    const decrementButton = this.element.querySelector(
      '[data-id="decrement"]'
    ) as HTMLElement;

    incrementButton.addEventListener("click", () => counterStore.increase());
    decrementButton.addEventListener("click", () => counterStore.decrease());

    counterStore.subscribe(this.render);
  }

  componentWillUnmount(): void {
    console.log("OnePage: componentWillUnmount");
    counterStore.unsubscribe(this.render);
  }

  template() {
    return `
      <h1>One Page</h1>
      <p data-id="count"></p>
      <button data-id="increment">+</button>
      <button data-id="decrement">-</button>
    `;
  }

  render() {
    this.element.querySelector('[data-id="count"]')!.textContent = counterStore
      .getState()
      .count.toString();
  }
}
