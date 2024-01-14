import DocumentPage from "@/pages/DocumentPage";
import SecondPage from "@/pages/SecondPage";
import ThirdPage from "@/pages/ThirdPage";
import OnePage from "./pages/OnePage";
import CommentPage from "./pages/CommentPage";
import { appPageStore } from "./stores/PageStore";

export const router = [
  {
    path: /\/documents\/(\d+)\/?$/,
    parameters: [{ name: "documentId", index: 1 }],
    component: DocumentPage,
    pageStore: appPageStore,
  },
  {
    path: /\/one/,
    component: OnePage,
    pageStore: appPageStore,
  },
  {
    path: /\/two/,
    component: SecondPage,
    pageStore: appPageStore,
  },
  {
    path: /\/three/,
    component: ThirdPage,
    pageStore: appPageStore,
  },
  {
    path: /\/posts\/(\d+)\/comments\/(\d+)\/?$/,
    parameters: [
      { name: "postId", index: 1 },
      { name: "commentId", index: 2 },
    ],
    component: CommentPage,
    pageStore: appPageStore,
  },
];
