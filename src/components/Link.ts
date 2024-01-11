import Component from "@/core/Component";
import { navigate } from "@/utils/route";

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

  componentDidMount(): void {
    this.element.addEventListener("click", (event) => {
      event.preventDefault();
      navigate(this.props.to);
    });
  }
}
