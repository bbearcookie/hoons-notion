import DocumentPage from "@/pages/DocumentPage";
import SecondPage from "@/pages/SecondPage";
import ThirdPage from "@/pages/ThirdPage";
import OnePage from "./pages/OnePage";
import CommentPage from "./pages/CommentPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import Page from "./core/Page";
import PageStore, {
  appPageStore,
  playgroundPageStore,
} from "./stores/PageStore";

type RouterWithoutPageStore<T extends typeof Page> = {
  path: RegExp;
  parameters?: { name: string; index: number }[];
  component: T;
};

export type Router<T extends typeof Page> = RouterWithoutPageStore<T> & {
  pageStore: PageStore;
};

const _appPageRouter: RouterWithoutPageStore<typeof Page>[] = [
  {
    path: /\/playground/,
    component: PlaygroundPage,
  },
];

const _documentPageRouter: RouterWithoutPageStore<typeof Page>[] = [
  {
    path: /\/documents\/(\d+)\/?$/,
    parameters: [{ name: "documentId", index: 1 }],
    component: DocumentPage,
  },
];

const _playgroundPageRouter: RouterWithoutPageStore<typeof Page>[] = [
  {
    path: /\/one/,
    component: OnePage,
  },
  {
    path: /\/two/,
    component: SecondPage,
  },
  {
    path: /\/three/,
    component: ThirdPage,
  },
  {
    path: /\/posts\/(\d+)\/comments\/(\d+)\/?$/,
    parameters: [
      { name: "postId", index: 1 },
      { name: "commentId", index: 2 },
    ],
    component: CommentPage,
  },
];

export const appPageRouter: Router<typeof Page>[] = _appPageRouter.map(
  (route) => ({
    ...route,
    pageStore: appPageStore,
  })
);

export const documentPageRouter: Router<typeof Page>[] =
  _documentPageRouter.map((route) => ({
    ...route,
    pageStore: appPageStore,
  }));

export const playgroundPageRouter: Router<typeof Page>[] =
  _playgroundPageRouter.map((route) => ({
    ...route,
    pageStore: playgroundPageStore,
  }));
