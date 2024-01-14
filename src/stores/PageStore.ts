import Component from "@/core/Component";
import Store from "@/core/Store";

interface State {
  page?: Component<any, any>;
  parameters: Record<string, string>;
}

class PageStore extends Store<State> {
  setPage({ page, parameters }: State) {
    this.setState({
      ...this.state,
      page,
      parameters,
    });
  }
}

export const pageStore = new PageStore({
  page: undefined,
  parameters: {},
});
