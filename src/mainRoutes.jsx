import { lazy } from "react";

const Home = lazy(() => import("@/pages/home"));
const Graduate = lazy(() => import("@/pages/Graduate"));
const TelecommunicationEngineering = lazy(() => import("@/pages/telecommunicationEngineering"));
const ComputerScienceAndEngineering = lazy(() => import("@/pages/computerScienceAndEngineering"));
const DataScience = lazy(() => import("@/pages/dataScience"));
const Suwon_navi = lazy(() => import("@/pages/PathFinderPage"));
const ICT = lazy(() => import("@/pages/ICT"));
const CIS = lazy(() => import("@/pages/CIS"));
const Computer_SW = lazy(() => import("@/pages/Computer_SW"));
const Media_SW = lazy(() => import("@/pages/Media_SW"));
const Data_Science = lazy(() => import("@/pages/Data_Science"));
const Sample_form = lazy(() => import("@/pages/sample_form"));
const ClickBattle = lazy(() => import("@/pages/ClickBattle"));

export const mainRoutes = [
  {
    name: "",
    path: "/home",
    element: <Home />,
  },
  {
    name: "컴퓨터학부",
    path: "/ComputerScience",
    element: <ComputerScienceAndEngineering />,
  },
  {
    name: "정보통신학부",
    path: "/telecommunicationEngineering",
    element: <TelecommunicationEngineering />,
  },
  {
    name: "데이터과학부",
    path: "/DataScience",
    element: <DataScience />,
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
    name: "미니게임",
    path: "/minigame",
    element: <ClickBattle />,
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
    path: "/computer_sw",
    element: <Computer_SW />,
  },
  {
    name: "",
    path: "/media_sw",
    element: <Media_SW />,
  },
  {
    name: "",
    path: "/data_science",
    element: <Data_Science />,
  },
  {
    name: "",
    path: "/sample_form",
    element: <Sample_form />,
  },
];

export default mainRoutes;