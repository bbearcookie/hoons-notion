import Component from "@/core/Component";

interface FormState {
  username: string;
  password: string;
}

export default class Form extends Component<{}, FormState> {
  static create({ parent }: { parent: HTMLElement }) {
    const element = document.createElement("form");
    parent.appendChild(element);
    return new Form({ element });
  }

  initialize() {
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange(e: Event) {
    const { name, value } = e.target as HTMLInputElement;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  componentDidMount() {
    this.element.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(this.state);
    });

    this.element
      .querySelector("input[name=username]")!
      .addEventListener("input", (event) => this.handleChange(event));

    this.element
      .querySelector("input[name=password]")!
      .addEventListener("input", (event) => this.handleChange(event));
  }

  template() {
    return `
      <h1>로그인 폼</h1>
      <input type="text" name="username" placeholder="아이디" />
      <input type="password" name="password" placeholder="비밀번호" />
      <button type="submit">로그인</button>
    `;
  }

  render() {
    const $username = this.element.querySelector(
      "input[name=username]"
    ) as HTMLInputElement;

    const $password = this.element.querySelector(
      "input[name=password]"
    ) as HTMLInputElement;

    $username.value = this.state.username;
    $password.value = this.state.password;
  }
}
