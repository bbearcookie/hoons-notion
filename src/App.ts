import Component from "@/core/Component";
import { initNavigationEvents } from "@/utils/route";
import { router } from "./router";
import Link from "./components/Link";
import documentAPI from "./api/documentAPI";

export default class App extends Component {
  initialize() {
    const navbar = this.element.querySelector("#navbar") as HTMLElement;

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/documents/2",
      },
      children: ["2번째 다큐먼트"],
    });

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/one",
      },
      children: ["링크1"],
    });

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/two",
      },
      children: ["링크2"],
    });

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/three",
      },
      children: ["링크3"],
    });

    initNavigationEvents(() => this.render());
  }

  template() {
    return `
      <h1 class="line-through italic">Hello, World!</h1>
      <nav id="navbar"></nav>
      <div id="outlet"></div>
    `;
  }

  componentDidMount() {
    (async () => {
      const document = await documentAPI.getDocuments();
      console.log(document);
    })();
  }

  render() {
    const outlet = this.element.querySelector("#outlet") as HTMLElement;
    outlet.innerHTML = "";

    router
      .filter(({ path }) => path.test(window.location.pathname))
      .forEach(({ component, children }) => {
        component.createElement({
          parent: outlet,
          props: {},
          children,
        });
      });
  }
}
