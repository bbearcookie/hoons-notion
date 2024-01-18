import DocumentPage from "@/pages/DocumentPage";
import SecondPage from "@/pages/playground/SecondPage";
import ThirdPage from "@/pages/playground/ThirdPage";
import OnePage from "@/pages/playground/OnePage";
import CommentPage from "@/pages/playground/CommentPage";
import PlaygroundPage from "@/pages/playground/PlaygroundPage";
import Page from "@/core/Page";

export type Router<T extends typeof Page> = {
  path: RegExp;
  component: T;
  parameters?: { name: string; index: number }[];
  children?: Router<T>[];
};

export const router: Router<typeof Page>[] = [
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
