export default class Component<TProps extends {} = {}, TState = any> {
  readonly element: HTMLElement;
  readonly children: { [name: string]: Component } = {};
  readonly props: TProps;
  state: TState;

  constructor({ element, props }: { element: HTMLElement; props?: TProps }) {
    this.element = element;
    this.state = {} as TState;
    this.props = props || ({} as TProps);

    this.componentDidInitialized();
    this.render();
    this.componentDidMount();
  }

  componentDidInitialized() {}
  componentDidMount() {}
  componentDidUpdate() {}

  setState(nextState: TState) {
    this.state = nextState;
    this.render();
    this.componentDidUpdate();
  }

  render() {}
}
