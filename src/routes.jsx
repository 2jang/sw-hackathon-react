import { Home, Profile, SignIn, SignUp, Graduate } from "@/pages";
import {TelecommunicationEngineering} from "@/pages/telecommunicationEngineering.jsx";

export const routes = [
  {
    name: "컴퓨터학부",
    path: "/home",
    element: <Home />,
  },
  {
    name: "정보통신학부",
    path: "/telecommunicationEngineering",
    element: <TelecommunicationEngineering />,
  },
  {
    name: "데이터과학부",
    path: "/profile",
    element: <Profile />,
  },
  {
    name: "졸업요건", // 네 번째 순서로 변경
    path: "/graduate",
    element: <Graduate />,
  },
];

export default routes;