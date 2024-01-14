import Component from "@/core/Component";
import Store from "@/core/Store";

interface State {
  parent: HTMLElement | null;
  page: Component<any, any> | null;
  parameters: Record<string, string>;
}

// 내부에서 pageStore 객체에 대한 맥락을 빼야함.
// 즉, 유틸 함수로 분리해야함. 스토어랑 결합되면안됨.
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
