import DocumentPage from "@/pages/DocumentPage";
import SecondPage from "@/pages/SecondPage";
import ThirdPage from "@/pages/ThirdPage";
import OnePage from "./pages/OnePage";
import CommentPage from "./pages/CommentPage";

export const router = [
  {
    path: /\/documents\/(\d+)\/?$/,
    parameters: [{ name: "documentId", index: 1 }],
    component: DocumentPage,
  },
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
