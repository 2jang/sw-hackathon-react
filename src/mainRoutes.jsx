import {Home, Profile, Graduate, TelecommunicationEngineering, Suwon_navi, ICT, CIS, Sample_form, } from "@/pages";

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
    path: "/home",
    element: <Home />,
  },
  {
    name: "졸업요건",
    path: "/graduate",
    element: <Graduate />,
  },
  {
    name: "길찾기",
    path: "/pathfinder",
    element: <Suwon_navi />,
  },
  {
    name: "",
    path: "/ict",
    element: <ICT />,
  },
  {
    name: "",
    path: "/cis",
    element: <CIS />,
  },
  {
    name: "",
    path: "/sample_form",
    element: <Sample_form />,
  },
];

export default mainRoutes;