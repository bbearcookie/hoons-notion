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
    outlet.innerHTML = "";

    switch (window.location.pathname) {
      case "/one":
        DocumentPage.createElement<DocumentPage>({
          parent: outlet,
          props: {},
          children: ["히히"],
        });
        break;
      case "/two":
        SecondPage.createElement<SecondPage>({
          parent: outlet,
          props: {},
        });
        break;
      case "/three":
        ThirdPage.createElement<ThirdPage>({
          parent: outlet,
          props: {},
        });
        break;
      default:
        break;
    }
  }
}

// prevUrl이랑 nextUrl을 체크해야할듯.
// prevUrl === nextUrl 이면 재렌더링 하지 않는다.
// 그럼 prevUrl은 어디서 보내주지?
