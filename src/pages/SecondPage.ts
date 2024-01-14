import Counter from "@/components/Counter";
import Form from "@/components/Form";
import Page from "@/core/Page";

export default class SecondPage extends Page {
  initialize() {
    this.render = this.render.bind(this);

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
  }

  template() {
    return `
      <h1>Second Page</h1>
    `;
  }
}
