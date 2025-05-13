import { Home, Profile, SignIn, SignUp, Graduate } from "@/pages"; // Graduate를 import 합니다.

export const routes = [
  {
    name: "컴퓨터학부",
    path: "/home",
    element: <Home />,
  },
  {
    name: "데이터과학부",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "정보통신학부",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "졸업요건", // 새 라우트 추가
    path: "/graduate",
    element: <Graduate />,
  },
  // 기존 SignUp 라우트가 있다면 유지하거나 필요에 따라 수정합니다.
  // {
  //   name: "Sign Up",
  //   path: "/sign-up",
  //   element: <SignUp />,
  // },
];

export default routes;