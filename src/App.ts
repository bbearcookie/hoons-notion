import Component from "@/core/Component";
import Counter from "@/components/Counter";
import DocumentPage from "@/pages/DocumentPage";
import Form from "@/components/Form";
import Link from "@/components/Link";

export default class App extends Component {
  initialize() {
    Counter.createElement<Counter>({
      parent: this.element,
      props: {
        initialCount: 5,
        heading: "제너레이트 카운터",
      },
    });

    Counter.createElement<Counter>({
      parent: this.element,
      props: {
        initialCount: 10,
        heading: "카운터",
      },
    });

    Form.createElement<Form>({
      parent: this.element,
      props: {},
      children: [
        Counter.createElement<Counter>({
          parent: this.element,
          props: {
            initialCount: 5,
            heading: "칠드런 카운터",
          },
        }),

        Counter.createElement<Counter>({
          parent: this.element,
          props: {
            initialCount: 8,
            heading: "칠드런 카운터2",
          },
        }),
      ],
    });

    DocumentPage.createElement<DocumentPage>({
      parent: this.element,
      props: {},
    });
  }

  template() {
    return `
      <h1 class="line-through italic">Hello, World!</h1>
    `;
  }
}
