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
    path: "/home",
    element: <Home />,
  },
  {
    name: "졸업요건",
    path: "/graduate",
    element: <Graduate />,
  },
];

export default routes;