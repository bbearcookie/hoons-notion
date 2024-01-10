export default abstract class Component<TProps extends {} = {}, TState = any> {
  readonly element: HTMLElement;
  readonly props: TProps;
  private state: TState;

  constructor({ element, props }: { element: HTMLElement; props?: TProps }) {
    this.element = element;
    this.state = {} as TState;
    this.props = props || ({} as TProps);

    this.render();
  }

  setState(nextState: TState) {
    this.state = nextState;
    this.render();
  }

  render() {}
}
