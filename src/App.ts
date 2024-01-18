import Component from "@/core/Component";
import { initNavigateEvent, handleNavigate } from "@/utils/route";
import Link from "./components/Link";
import documentAPI from "./api/documentAPI";

export default class App extends Component {
  initialize() {
    const navbar = this.element.querySelector("#navbar") as HTMLElement;
    const outlet = this.element.querySelector("#outlet") as HTMLElement;

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
        to: "/playground/posts/1/comments/2",
      },
      children: ["플레이그라운드 포스트1 코멘트2"],
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
      handleNavigate({ parent: outlet, prev, to })
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
