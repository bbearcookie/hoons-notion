import Store from "@/core/Store";

interface State {
  username: string;
  password: string;
}

class LoginFormStore extends Store<State> {
  setUsername(username: string) {
    this.setState({
      ...this.getState(),
      username: username,
    });
  }

  setPassword(password: string) {
    this.setState({
      ...this.getState(),
      password: password,
    });
  }
}

export const loginFormStore = new LoginFormStore({
  username: "",
  password: "",
});
