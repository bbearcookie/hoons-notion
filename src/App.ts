import Component from "@/core/Component";
import { initNavigateEvent, handleNavigate } from "@/utils/route";
import { appPageStore } from "./stores/PageStore";
import { appPageRouter } from "./router";
import Link from "./components/Link";
import documentAPI from "./api/documentAPI";

export default class App extends Component {
  initialize() {
    const navbar = this.element.querySelector("#navbar") as HTMLElement;
    const outlet = this.element.querySelector("#outlet") as HTMLElement;
    appPageStore.setParent(outlet);

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/playground",
      },
      children: ["플레이그라운드"],
    });

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/documents/1",
      },
      children: ["1번째 다큐먼트"],
    });

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/documents/2",
      },
      children: ["2번째 다큐먼트"],
    });

    initNavigateEvent((prev, to) =>
      handleNavigate({ router: appPageRouter, prev, to })
    );
  }

  template() {
    return `
      <h1 class="line-through italic">Hello, World!</h1>
      <nav id="navbar"></nav>
      <div id="outlet"></div>
    `;
  }

  componentDidMount() {
    handleNavigate({
      router: appPageRouter,
      prev: "",
      to: window.location.pathname,
    });

    (async () => {
      const document = await documentAPI.getDocuments();
      console.log(document);
    })();
  }
}
