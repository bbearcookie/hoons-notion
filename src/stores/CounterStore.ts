import Store from "@/core/Store";

interface State {
  count: number;
}

class CounterStore extends Store<State> {
  increase() {
    this.setState({
      count: this.getState().count + 1,
    });
  }

  decrease() {
    this.setState({
      count: this.getState().count - 1,
    });
  }
}

export const counterStore = new CounterStore({
  count: 0,
});
