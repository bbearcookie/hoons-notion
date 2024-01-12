type Children = (Component | string)[];

// WeakMap을 사용하여 DOM Element와 Component 인스턴스를 연결합니다.
const componentMap = new WeakMap<HTMLElement, Component>();

/**
 * Component 클래스는 컴포넌트의 기본 기능을 정의합니다.
 *
 * `static tagName`: 컴포넌트가 생성될 때, HTML 태그 이름을 지정합니다.
 * `protected static createElement`: 컴포넌트를 생성하고, DOM에 추가합니다.
 *
 * `initialize`: 컴포넌트가 생성될 때, state나 props를 설정하고 자식 컴포넌트를 생성하는 작업을 수행하면 좋습니다.
 * `template`: 컴포넌트가 최초 마운트될 때, 렌더링 될 HTML을 반환해야 합니다.
 * `render`: 상태가 변경될 때 업데이트해야 할 동작을 수행해야 합니다. (예: DOM 업데이트 조작)
 * `componentDidMount`: 컴포넌트가 최초 마운트된 후에 호출됩니다. (예: 이벤트 리스너 등록)
 * `componentWillUnmount`: 컴포넌트의 element가 화면에서 제거되면 호출됩니다. (예: 이벤트 리스너 해제)
 */
export default class Component<TProps extends {} = {}, TState = any> {
  readonly element: HTMLElement;
  props: TProps;
  state: TState;
  children: Children = [];

  constructor({
    element,
    props,
    children,
  }: {
    element: HTMLElement;
    props?: TProps;
    children?: Children;
  }) {
    this.element = element;
    this.props = props || ({} as TProps);
    this.state = {} as TState;
    this.children = children || [];

    this.mount();
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
    props: T["props"];
    children?: Children;
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
  }

  private mount() {
    const { element, children } = this;

    this.element.innerHTML = this.template();

    for (const child of children) {
      if (typeof child === "string") {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child.element);
      }
    }

    componentMap.set(element, this);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.removedNodes.forEach((node) => {
          const component = componentMap.get(node as HTMLElement);
          componentMap.delete(node as HTMLElement);
          component?.componentWillUnmount();
        });
      });
    });

    observer.observe(element, {
      subtree: true,
      childList: true,
    });
  }

  template() {
    return "";
  }

  initialize() {}
  componentDidMount() {}
  componentWillUnmount() {}
  render() {}
}
