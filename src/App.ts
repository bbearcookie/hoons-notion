import Component from "@/core/Component";
import Counter, { CounterProps } from "@/components/Counter";
import DocumentPage from "@/pages/DocumentPage";
import Form from "@/components/Form";

export default class App extends Component {
  initialize() {
    Counter.createElement({
      parent: this.element,
      props: {
        initialCount: 5,
        heading: "제너레이트 카운터",
      } satisfies CounterProps,
    });

    Counter.createElement({
      parent: this.element,
      props: {
        initialCount: 10,
        heading: "카운터",
      } satisfies CounterProps,
    });

    Form.createElement({
      parent: this.element,
      children: [
        Counter.createElement({
          parent: this.element,
          props: {
            initialCount: 5,
            heading: "칠드런 카운터",
          } satisfies CounterProps,
        }),

        Counter.createElement({
          parent: this.element,
          props: {
            initialCount: 8,
            heading: "칠드런 카운터2",
          } satisfies CounterProps,
        }),
      ],
    });

    DocumentPage.create({
      parent: this.element,
    });
  }

  template() {
    return `
      <h1 class="line-through italic">Hello, World!</h1>
    `;
  }
}
