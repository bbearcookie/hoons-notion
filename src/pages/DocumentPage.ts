import Component from "@/core/Component";
import template from "./DocumentPage.html";
import Link from "@/components/Link";

export default class DocumentPage extends Component {
  initialize() {
    Link.createElement<Link>({
      parent: this.element,
      props: {
        to: "/one",
      },
      children: ["링크1"],
    });

    Link.createElement<Link>({
      parent: this.element,
      props: {
        to: "/two",
      },
      children: ["링크2"],
    });

    Link.createElement<Link>({
      parent: this.element,
      props: {
        to: "/three",
      },
      children: ["링크3"],
    });
  }

  template() {
    return template;
  }
}
