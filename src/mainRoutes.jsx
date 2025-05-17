import {
  Home,
  Graduate,
  TelecommunicationEngineering,
  ComputerScienceAndEngineering,
  DataScience,
  Suwon_navi,
  ICT, CIS, Computer_SW, Media_SW, Data_Science,
  Sample_form,
  ClickBattle,
} from "@/pages";

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