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

    this.children.form = Form.create({
      parent: this.element,
    });
  }

  template() {
    return `
      <h1 class="line-through italic">Hello, World!</h1>
    `;
  }
}
