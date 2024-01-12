export default abstract class Store<TState> {
  private state: TState;
  private listeners = new Set<VoidFunction>();

  constructor(initialState: TState) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  protected setState(nextState: TState) {
    this.state = nextState;
    this.notifyAll();
  }

  subscribe(listener: VoidFunction) {
    this.listeners.add(listener);
    console.log(this.listeners);
  }

  unsubscribe(listener: VoidFunction) {
    this.listeners.delete(listener);
  }

  protected notifyAll() {
    this.listeners.forEach((listener) => listener());
  }
}
