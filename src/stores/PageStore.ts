import Component from "@/core/Component";
import Store from "@/core/Store";

interface State {
  parent: HTMLElement | null;
  page: Component<any, any> | null;
  parameters: Record<string, string>;
}

export default class PageStore extends Store<State> {
  setParent(parent: HTMLElement) {
    this.setState({
      ...this.state,
      parent,
    });
  }

  setPage({ page, parameters }: State) {
    this.setState({
      ...this.state,
      page,
      parameters,
    });
  }
}

export const appPageStore = new PageStore({
  parent: null,
  page: null,
  parameters: {},
});

export const documentPageStore = new PageStore({
  parent: null,
  page: null,
  parameters: {},
});

export const playgroundPageStore = new PageStore({
  parent: null,
  page: null,
  parameters: {},
});
