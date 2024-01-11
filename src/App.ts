import Component from "@/core/Component";
import Counter from "@/components/Counter";
import DocumentPage from "@/pages/DocumentPage";
import Form from "@/components/Form";

export default class App extends Component {
  initialize() {
    Counter.create({
      parent: this.element,
      props: {
        initialCount: 10,
        heading: "카운터",
      },
    });

    Counter.create({
      parent: this.element,
      props: {
        initialCount: 5,
        heading: "카운터2",
      },
    });

    Form.create({
      parent: this.element,
      children: [
        Counter.create({
          props: {
            initialCount: 5,
            heading: "칠드런 카운터",
          },
        }),
        Counter.create({
          props: {
            initialCount: 5,
            heading: "칠드런 카운터2",
          },
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
