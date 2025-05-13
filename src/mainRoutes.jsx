import {Home, Profile, Graduate, TelecommunicationEngineering, ICT, CIS} from "@/pages";

export const mainRoutes = [
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
    name: "졸업요건", // 새 라우트 추가
    path: "/graduate",
    element: <Graduate />,
  },
  {
    name: "정보통신학과",
    path: "/ict",
    element: <ICT />,
  },
  {
    name: "정보보호학과",
    path: "/cis",
    element: <CIS />,
  },
];

export default mainRoutes;