import DocumentPage from "@/pages/DocumentPage";
import SecondPage from "@/pages/SecondPage";
import ThirdPage from "@/pages/ThirdPage";
import OnePage from "./pages/OnePage";

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
];
