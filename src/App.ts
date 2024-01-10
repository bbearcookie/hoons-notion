import Component from "@/core/Component";
import Counter from "@/components/Counter";
import Form from "./components/Form";

export default class App extends Component {
  initialize() {
    this.children.counter = Counter.create({
      parent: this.element,
      props: {
        initialCount: 10,
        heading: "카운터",
      },
    });

    this.children.counter2 = Counter.create({
      parent: this.element,
      props: {
        initialCount: 5,
        heading: "카운터2",
      },
    });
  }

  template() {
    return `
      <h1>Hello, World!</h1>
    `;
  }
}
