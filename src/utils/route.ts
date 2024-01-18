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

let memo: {
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
      // 경로를 통해 화면에 그려야 할 모든 페이지를 알아내고 Path Parameter를 추출한다.
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
      // 화면에 그려야 할 페이지를 Update OR Mount 처리한다.
      let outlet = parent;

      componentClasses.forEach((component, index) => {
        if (
          memo.classes[index] &&
          memo.classes[index].name === component.name
        ) {
          // 화면에 이미 렌더링된 페이지는 컴포넌트를 재사용한다. (Update)
          outlet = memo.objects[index].outlet;
          componentObjects.push(memo.objects[index]);
        } else {
          // 화면에 렌더링되지 않은 페이지는 컴포넌트를 생성한다. (Mount)
          outlet.innerHTML = "";

          const newPage = component.component.createElement({
            parent: outlet,
          });

          componentObjects.push(newPage);
          outlet = newPage.outlet;
        }
      });

      // 새로 렌더링해야 할 페이지가 기존 페이지보다 적을 경우 초과된 기존 페이지는 제거한다. (Delete)
      if (componentObjects.length < memo.objects.length) {
        const finalOutlet =
          componentObjects[componentObjects.length - 1].outlet;

        if (finalOutlet) {
          finalOutlet.innerHTML = "";
        }
      }

      memo = {
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
