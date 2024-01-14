import Component from "@/core/Component";
import { initNavigationEvents } from "@/utils/route";
import { router } from "./router";
import Link from "./components/Link";
import documentAPI from "./api/documentAPI";

interface AppState {
  page?: Component<any, any>;
  parameters: Record<string, string>;
}

export default class App extends Component<{}, AppState> {
  initialize() {
    this.state = {
      page: undefined,
      parameters: {},
    };

    const navbar = this.element.querySelector("#navbar") as HTMLElement;

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

    initNavigationEvents((prev, to) => this.handleNavigation(prev, to));

    this.handleNavigation("", window.location.pathname);
  }

  handleNavigation(prev: string, to: string) {
    const prevRoute = router.find((route) => route.path.test(prev));
    const toRoute = router.find((route) => route.path.test(to));

    console.log("handleNavigation");

    if (!toRoute || prev === to) {
      return;
    }

    const result = toRoute.path.exec(window.location.pathname)!!;

    const parameters = toRoute.parameters?.reduce((acc, { name, index }) => {
      acc[name] = result[index];
      return acc;
    }, {} as Record<string, string>);

    if (prevRoute?.component === toRoute.component) {
      this.setState({
        ...this.state,
        parameters: parameters ?? {},
      });
    } else {
      const outlet = this.element.querySelector("#outlet") as HTMLElement;
      outlet.innerHTML = "";

      this.setState({
        ...this.state,
        page: toRoute?.component.createElement({
          parent: outlet,
          props: {},
        }),
        parameters: parameters ?? {},
      });
    }

    this.state.page?.render();
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
}
