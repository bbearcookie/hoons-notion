import Store from "@/core/Store";

interface State {
  count: number;
  test: {
    a: number;
    b: number;
  };
}

class CounterStore extends Store<State> {
  increase() {
    this.setState({
      ...this.state,
      count: this.state.count + 1,
    });
  }

  decrease() {
    this.setState({
      ...this.state,
      count: this.state.count - 1,
    });
  }
}

export const counterStore = new CounterStore({
  count: 0,
  test: {
    a: 1,
    b: 2,
  },
});
