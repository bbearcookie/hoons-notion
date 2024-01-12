import Component from "@/core/Component";
import { counterStore } from "@/stores/CounterStore";
import { loginFormStore } from "@/stores/LoginFormStore";

export default class OnePage extends Component {
  initialize() {
    this.render = this.render.bind(this);
    this.subscribe([counterStore, loginFormStore]);
  }

  componentDidMount(): void {
    this.element
      .querySelector('[data-id="increment"]')
      ?.addEventListener("click", () => counterStore.increase());
    this.element
      .querySelector('[data-id="decrement"]')
      ?.addEventListener("click", () => counterStore.decrease());

    this.element
      .querySelector('[data-id="username"]')
      ?.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;
        loginFormStore.setUsername(target.value);
      });

    this.element
      .querySelector('[data-id="password"]')
      ?.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement;
        loginFormStore.setPassword(target.value);
      });

    const form = this.element.querySelector("form") as HTMLFormElement;

    this.element.querySelector("form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(loginFormStore.getState());
    });
  }

  template() {
    return `
      <h1>One Page</h1>
      <p data-id="count"></p>
      <button data-id="increment">+</button>
      <button data-id="decrement">-</button>
      <hr />
      <form>
        <input type="text" data-id="username" />
        <input type="password" data-id="password" />
        <button>Login</button>
      </form>
    `;
  }

  render() {
    this.element.querySelector('[data-id="count"]')!.textContent = counterStore
      .getState()
      .count.toString();

    const usernameInput = this.element.querySelector(
      '[data-id="username"]'
    ) as HTMLInputElement;

    usernameInput.value = loginFormStore.getState().username;

    const passwordInput = this.element.querySelector(
      '[data-id="password"]'
    ) as HTMLInputElement;

    passwordInput.value = loginFormStore.getState().password;
  }
}
