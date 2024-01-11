import Component from "@/core/Component";
import template from "./DocumentPage.html";

export default class DocumentPage extends Component {
  static create({ parent, props }: { parent: HTMLElement; props?: any }) {
    const element = document.createElement("div");
    parent.appendChild(element);
    return new DocumentPage({ element, props });
  }

  template() {
    return template;
  }
}
