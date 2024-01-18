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
  {
    path: /\/documents\/(\d+)\/?$/,
    parameters: [{ name: "documentId", index: 1 }],
    component: DocumentPage,
  },
];
