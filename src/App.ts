import Component from "@/core/Component";
import Counter from "@/components/Counter";

export default class App extends Component {
  componentDidInitialized() {
    const $counter = document.createElement("div");
    this.element.appendChild($counter);
    this.children.counter = new Counter({ element: $counter });

    const $counter2 = document.createElement("div");
    this.element.appendChild($counter2);
    this.children.counter2 = new Counter({ element: $counter2 });
  }

  render() {
    // this.element.innerHTML = `
    //   <h1>Hello, World!</h1>
    // `;
  }
}
