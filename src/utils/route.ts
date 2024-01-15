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

let memoizedComponentClass: {
  name: string;
  component: typeof Page;
}[] = [];
let memoizedComponentObject: Page[] = [];

export const handleNewNavigate = ({
  parent,
  prev,
  to,
}: {
  parent: HTMLElement;
  prev: string;
  to: string;
}) => {
  const toRoute = newRouter.find((route) => route.path.test(to));
  const tracedComponents: {
    name: string;
    component: typeof Page;
  }[] = [];

  const parameters: Record<string, string> = {};

  if (!toRoute || prev === to) {
    return;
  }

  const dfs = (router: Router<typeof Page>[], to: string) => {
    const restRoute = router.find((route) => route.path.test(to));

    if (restRoute) {
      const result = restRoute.path.exec(to)!!;
      const restPath = result.input.replace(result[0], "");

      router.forEach((route) => {
        if (route.parameters) {
          route.parameters.forEach(({ name, index }) => {
            parameters[name] = result[index];
          });
        }
      });

      tracedComponents.push({
        name: restRoute.component.name,
        component: restRoute.component,
      });

      dfs(restRoute.children ?? [], restPath);
    } else {
      let outlet = parent;

      tracedComponents.forEach((component, index) => {
        if (
          memoizedComponentClass[index] &&
          memoizedComponentClass[index].name === component.name
        ) {
          console.log(component.name, "파라미터만 바꿔줌");
          outlet = memoizedComponentObject[index].outlet;
        } else {
          console.log(component.name, "렌더링 하기");
          outlet.innerHTML = "";

          const newPage = component.component.createElement({
            parent: outlet,
          });

          memoizedComponentObject.push(newPage);

          outlet = newPage.outlet;
          console.log(newPage);
        }
      });

      memoizedComponentClass = tracedComponents;

      pageStore.setPage({
        ...pageStore.state,
        parameters,
      });
    }
  };

  dfs(newRouter, to);
};

// export const handleLegacyNewNavigate = ({
//   parent,
//   prev,
//   to,
// }: {
//   parent: HTMLElement;
//   prev: string;
//   to: string;
// }) => {
//   const toRoute = newRouter.find((route) => route.path.test(to));
//   const components: (typeof Page)[] = [];
//   const parameters: Record<string, string> = {};

//   if (!toRoute || prev === to) {
//     return;
//   }

//   const dfs = (router: Router<typeof Page>[], to: string) => {
//     const restRoute = router.find((route) => route.path.test(to));

//     if (restRoute) {
//       const result = restRoute.path.exec(to)!!;
//       const restPath = result.input.replace(result[0], "");

//       components.push(restRoute.component);

//       router.forEach((route) => {
//         if (route.parameters) {
//           route.parameters.forEach(({ name, index }) => {
//             parameters[name] = result[index];
//           });
//         }
//       });

//       dfs(restRoute.children ?? [], restPath);
//     } else {
//       let outlet = parent;

//       components.forEach((component, index) => {
//         if (prevComponents[index] === component) {
//           console.log(component, "파라미터만 바꿔줌");
//         } else {
//           console.log(component.name, "렌더링 하기");
//           outlet.innerHTML = "";

//           const newPage = component.create({
//             pageStore: appPageStore,
//             parent: outlet,
//           });

//           outlet = newPage.outlet as HTMLElement;

//           // console.log(newPage);
//         }
//       });
//     }

//     prevComponents = components;
//   };

//   dfs(newRouter, to);
// };

// export const handleNavigate = ({
//   router,
//   prev,
//   to,
// }: {
//   router: Router<typeof Page>[];
//   prev: string;
//   to: string;
// }) => {
//   const prevRoute = router.find((route) => route.path.test(prev));
//   const toRoute = router.find((route) => route.path.test(to));
//   const pageStore = toRoute?.pageStore;

//   if (!toRoute || prev === to) {
//     return;
//   }

//   if (!pageStore || pageStore?.state.parent === null) {
//     throw new Error("PageStore is not initialized");
//   }

//   const result = toRoute.path.exec(to)!!;

//   const parameters = toRoute.parameters?.reduce((acc, { name, index }) => {
//     acc[name] = result[index];
//     return acc;
//   }, {} as Record<string, string>);

//   if (prevRoute?.component === toRoute.component) {
//     pageStore.setPage({
//       ...pageStore.state,
//       parameters: parameters ?? {},
//     });
//   } else {
//     pageStore.state.parent.innerHTML = "";

//     pageStore.setPage({
//       ...pageStore.state,
//       page: toRoute?.component.createPage({
//         parent: pageStore.state.parent,
//         pageStore,
//       }),
//       parameters: parameters ?? {},
//     });
//   }
// };
