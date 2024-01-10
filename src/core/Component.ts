export default class Component<TProps extends {} = {}, TState = any> {
  readonly element: HTMLElement;
  readonly children: { [name: string]: Component | HTMLElement } = {};
  props: TProps;
  state: TState;

  constructor({ element, props }: { element: HTMLElement; props?: TProps }) {
    this.element = element;
    this.state = {} as TState;
    this.props = props || ({} as TProps);

    this.renderTemplate();
    this.initialize();
    this.render();
    this.componentDidMount();
  }

  setState(nextState: TState) {
    this.state = nextState;
    this.render();
    this.componentDidUpdate();
  }

  initialize() {}
  componentDidMount() {}
  componentDidUpdate() {}

  template() {
    return "";
  }

  private renderTemplate() {
    const template = this.template();

    if (template) {
      this.element.innerHTML = this.template();
    }
  }

  render() {}
}
