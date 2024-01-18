import Page from "@/core/Page";
import { pageStore } from "@/stores/PageStore";
import { newRouter, type Router } from "@/router";

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

type ComponentClass = {
  name: string;
  component: typeof Page;
};

let memoized: {
  classes: ComponentClass[];
  objects: Page[];
} = {
  classes: [],
  objects: [],
} as const;

export const handleNavigate = ({
  parent,
  prev,
  to,
}: {
  parent: HTMLElement;
  prev: string;
  to: string;
}) => {
  const toRoute = newRouter.find((route) => route.path.test(to));
  const componentClasses: ComponentClass[] = [];
  const componentObjects: Page[] = [];
  const parameters: Record<string, string> = {};

  if (!toRoute || prev === to) {
    return;
  }

  searchRoute(newRouter, to);

  function searchRoute(router: Router<typeof Page>[], to: string) {
    const restRoute = router.find((route) => route.path.test(to));

    if (restRoute) {
      const regxResult = restRoute.path.exec(to)!!;
      const restPath = regxResult.input.replace(regxResult[0], "");

      router.forEach((route) => {
        if (route.parameters) {
          route.parameters.forEach(({ name, index }) => {
            parameters[name] = regxResult[index];
          });
        }
      });

      componentClasses.push({
        name: restRoute.component.name,
        component: restRoute.component,
      });

      searchRoute(restRoute.children ?? [], restPath);
    } else {
      let outlet = parent;

      componentClasses.forEach((component, index) => {
        if (
          memoized.classes[index] &&
          memoized.classes[index].name === component.name
        ) {
          outlet = memoized.objects[index].outlet;
          componentObjects.push(memoized.objects[index]);
        } else {
          console.log(component.name, "렌더링 하기");
          outlet.innerHTML = "";

          const newPage = component.component.createElement({
            parent: outlet,
          });

          componentObjects.push(newPage);
          outlet = newPage.outlet;
        }
      });

      memoized = {
        classes: componentClasses,
        objects: componentObjects,
      };

      pageStore.setPage({
        ...pageStore.state,
        parameters,
      });
    }
  }
};
