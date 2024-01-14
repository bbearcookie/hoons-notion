import Link from "@/components/Link";
import Page from "@/core/Page";
import { playgroundPageRouter } from "@/router";
import { playgroundPageStore } from "@/stores/PageStore";
import { handleNavigate, initNavigateEvent } from "@/utils/route";

export default class PlaygroundPage extends Page {
  initialize() {
    this.render = this.render.bind(this);

    const navbar = this.element.querySelector("#navbar") as HTMLElement;
    const outlet = this.element.querySelector("#outlet") as HTMLElement;
    playgroundPageStore.setParent(this.element);

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

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/posts/1/comments/2",
      },
      children: ["1번째 포스트의 2번째 댓글"],
    });

    initNavigateEvent((prev, to) =>
      handleNavigate({ router: playgroundPageRouter, prev, to })
    );
  }

  template() {
    return `
    <h1 class="line-through italic">Hello, Playground!</h1>
    <nav id="navbar"></nav>
    <div id="outlet"></div>
    `;
  }

  componentDidMount() {
    handleNavigate({
      router: playgroundPageRouter,
      prev: "",
      to: window.location.pathname,
    });
  }
}
