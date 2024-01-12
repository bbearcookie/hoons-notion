import Component from "@/core/Component";
import template from "./DocumentPage.html";

export default class DocumentPage extends Component {
  template() {
    return template;
  }

  componentWillUnmount(): void {
    console.log("DocumentPage: componentWillUnmount");
  }
}
