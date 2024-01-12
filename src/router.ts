import DocumentPage from "@/pages/DocumentPage";
import SecondPage from "@/pages/SecondPage";
import ThirdPage from "@/pages/ThirdPage";
import OnePage from "./pages/OnePage";

export const router = [
  {
    path: /^\/documents\/\d/,
    component: DocumentPage,
    children: ["다큐먼트입니다"],
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
