import Component from "@/core/Component";

interface LinkProps {
  className?: string;
  to: string;
}

export default class Link extends Component<LinkProps> {
  static tagName = "a";

  initialize() {
    this.element.setAttribute("class", this.props.className || "");
    this.element.setAttribute("href", this.props.to);
  }

  // TODO: 커스텀 이벤트를 사용해서 라우팅 구현하기
  componentDidMount(): void {
    this.element.addEventListener("click", (event) => {
      event.preventDefault();
      window.history.pushState({}, "", this.props.to);
    });
  }
}
