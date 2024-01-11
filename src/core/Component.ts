/**
 * Component 클래스는 컴포넌트의 기본 기능을 정의합니다.
 *
 * `static tagName`: 컴포넌트가 생성될 때, HTML 태그 이름을 지정합니다.
 * `protected static createElement`: 컴포넌트를 생성하고, DOM에 추가합니다.
 *
 * `initialize`: 컴포넌트가 생성될 때, state나 props를 설정하고 자식 컴포넌트를 생성하는 작업을 수행하면 좋습니다.
 * `template`: 컴포넌트가 최초 마운트될 때, 렌더링 될 HTML을 반환해야 합니다.
 * `render`: 상태가 변경될 때 업데이트해야 할 동작을 수행해야 합니다. (예: DOM 조작)
 * `componentDidMount`: 컴포넌트가 최초 마운트된 후에 호출됩니다.
 * `componentDidUpdate`: 컴포넌트가 업데이트된 후에 호출됩니다.
 */
export default class Component<TProps extends {} = {}, TState = any> {
  readonly element: HTMLElement;
  props: TProps;
  state: TState;
  children: Component[] = [];

  constructor({
    element,
    props,
    children,
  }: {
    element: HTMLElement;
    props?: TProps;
    children?: Component[];
  }) {
    this.element = element;
    this.props = props || ({} as TProps);
    this.state = {} as TState;
    this.children = children || [];

    this.renderTemplate();
    this.initialize();
    this.render();
    this.componentDidMount();
  }

  static tagName = "div";

  protected static createElement<T extends Component>({
    parent,
    props,
    children,
  }: {
    parent?: HTMLElement;
    props?: T["props"];
    children?: Component[];
  }) {
    const element = document.createElement(this.tagName);

    if (parent) {
      parent.appendChild(element);
    }

    return new this({ element, props, children });
  }

  setState(nextState: TState) {
    this.state = nextState;
    this.render();
    this.componentDidUpdate();
  }

  private renderTemplate() {
    const template = this.template();

    if (template) {
      this.element.innerHTML = this.template();
    }

    for (const child of this.children) {
      this.element.appendChild(child.element);
    }
  }

  template() {
    return "";
  }

  initialize() {}
  componentDidMount() {}
  componentDidUpdate() {}
  render() {}
}
