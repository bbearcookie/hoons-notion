import Component from "@/core/Component";
import Store from "@/core/Store";
import { router } from "@/router";

interface State {
  parent: HTMLElement | null;
  page: Component<any, any> | null;
  parameters: Record<string, string>;
}

class PageStore extends Store<State> {
  handleNavigation(prev: string, to: string) {
    const prevRoute = router.find((route) => route.path.test(prev));
    const toRoute = router.find((route) => route.path.test(to));

    if (!toRoute || prev === to || !this.state.parent) {
      return;
    }

    const result = toRoute.path.exec(to)!!;

    const parameters = toRoute.parameters?.reduce((acc, { name, index }) => {
      acc[name] = result[index];
      return acc;
    }, {} as Record<string, string>);

    if (prevRoute?.component === toRoute.component) {
      pageStore.setPage({
        ...pageStore.state,
        parameters: parameters ?? {},
      });
    } else {
      this.state.parent.innerHTML = "";

      pageStore.setPage({
        ...pageStore.state,
        page: toRoute?.component.createElement({
          parent: this.state.parent,
          props: {},
        }),
        parameters: parameters ?? {},
      });
    }
  }

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

export const pageStore = new PageStore({
  parent: null,
  page: null,
  parameters: {},
});
