import Component from "@/core/Component";
import DocumentPage from "@/pages/DocumentPage";
import { initNavigationEvents } from "@/utils/route";
import SecondPage from "./pages/SecondPage";
import Link from "./components/Link";
import ThirdPage from "./pages/ThirdPage";

export default class App extends Component {
  initialize() {
    const navbar = this.element.querySelector("#navbar") as HTMLElement;

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

  render() {
    const outlet = this.element.querySelector("#outlet") as HTMLElement;

    switch (window.location.pathname) {
      case "/one":
        outlet.innerHTML = DocumentPage.createElement<DocumentPage>({
          props: {},
        }).element.innerHTML;
        break;
      case "/two":
        outlet.innerHTML = SecondPage.createElement<SecondPage>({
          props: {},
        }).element.innerHTML;
        break;
      case "/three":
        outlet.innerHTML = ThirdPage.createElement<ThirdPage>({
          props: {},
        }).element.innerHTML;
        break;
      default:
        break;
    }
  }
}
