import DocumentPage from "@/pages/DocumentPage";
import SecondPage from "@/pages/SecondPage";
import ThirdPage from "@/pages/ThirdPage";
import OnePage from "./pages/OnePage";
import CommentPage from "./pages/CommentPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import Page from "./core/Page";

export type Router<T extends typeof Page> = {
  path: RegExp;
  parameters?: { name: string; index: number }[];
  component: T;
  children?: Router<T>[];
};

// 하나의 라우터만 가지고, 재귀적으로 탐색하도록 해야한다.
// App이 렌더링되면 경로를 체크해서 페이지를 찾아야하기 때문이다.

export const newRouter: Router<typeof Page>[] = [
  {
    path: /\/playground/,
    component: PlaygroundPage,
    children: [
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
    ],
  },
];
