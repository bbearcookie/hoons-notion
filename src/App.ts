import Component from "@/core/Component";
import { initNavigateEvent, handleNavigate } from "@/utils/route";
import documentAPI from "./api/documentAPI";

export default class App extends Component {
  initialize() {
    const outlet = this.element.querySelector("#outlet") as HTMLElement;

    initNavigateEvent((prev, to) =>
      handleNavigate({ parent: outlet, prev, to })
    );
  }

  template() {
    return `
      <div id="outlet"></div>
    `;
  }

  componentDidMount() {
    // (async () => {
    //   const document = await documentAPI.getDocuments();
    //   console.log(document);
    // })();

    handleNavigate({
      prev: "",
      to: window.location.pathname,
      parent: this.element.querySelector("#outlet") as HTMLElement,
    });
  }
}
