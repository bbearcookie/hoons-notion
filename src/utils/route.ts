import { router } from "@/router";
import PageStore from "@/stores/PageStore";

const NAVIGATE_EVENT = "navigate";

class NavigationEvent extends CustomEvent<{ prev: string; to: string }> {
  constructor(to: string) {
    super(NAVIGATE_EVENT, { detail: { prev: window.location.pathname, to } });
  }
}

export const navigate = (to: string) => {
  window.dispatchEvent(new NavigationEvent(to));
};

export const initNavigateEvent = (
  onNavigate: (prev: string, to: string) => void
) => {
  window.addEventListener(NAVIGATE_EVENT, (e: Event) => {
    if (e instanceof NavigationEvent) {
      if (e.detail.prev === e.detail.to) {
        history.replaceState(e.detail.prev, "", e.detail.to);
      } else {
        history.pushState(e.detail.prev, "", e.detail.to);
      }

      onNavigate(e.detail.prev, e.detail.to);
    }
  });

  window.addEventListener("popstate", (e: PopStateEvent) => {
    const prev = e.state;
    const to = window.location.pathname;

    onNavigate(prev, to);
  });
};

export const handleNavigate = ({
  pageStore,
  prev,
  to,
}: {
  pageStore: PageStore;
  prev: string;
  to: string;
}) => {
  const prevRoute = router.find((route) => route.path.test(prev));
  const toRoute = router.find((route) => route.path.test(to));

  if (!toRoute || prev === to || !pageStore.state.parent) {
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
    pageStore.state.parent.innerHTML = "";

    pageStore.setPage({
      ...pageStore.state,
      page: toRoute?.component.createPage({
        parent: pageStore.state.parent,
        pageStore,
      }),
      parameters: parameters ?? {},
    });
  }
};
