import { Home, Profile, SignIn, SignUp } from "@/pages";

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
];

export default routes;
