import Link from "@/components/Link";
import Page from "@/core/Page";
import { pageStore } from "@/stores/PageStore";

export default class PlaygroundPage extends Page {
  initialize() {
    this.render = this.render.bind(this);
    this.subscribe([pageStore]);

    const navbar = this.element.querySelector("#navbar") as HTMLElement;

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/playground/one",
      },
      children: ["링크1"],
    });

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/playground/two",
      },
      children: ["링크2"],
    });

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/playground/three",
      },
      children: ["링크3"],
    });

    Link.createElement<Link>({
      parent: navbar,
      props: {
        to: "/playground/posts/1/comments/2",
      },
      children: ["1번째 포스트의 2번째 댓글"],
    });
  }

  template() {
    return `
      <h1 class="line-through italic">Hello, Playground!</h1>
      <nav id="navbar"></nav>
      <div data-id="outlet"></div>
    `;
  }
}
