export default abstract class Store<TState> {
  private _state: TState;
  private listeners = new Set<VoidFunction>();

  constructor(initialState: TState) {
    this._state = initialState;
  }

  get state(): Readonly<TState> {
    return this._state;
  }

  protected setState(nextState: TState) {
    this._state = nextState;
    this.notifyAll();
  }

  subscribe(listener: VoidFunction) {
    this.listeners.add(listener);
  }

  unsubscribe(listener: VoidFunction) {
    this.listeners.delete(listener);
  }

  protected notifyAll() {
    this.listeners.forEach((listener) => listener());
  }
}
