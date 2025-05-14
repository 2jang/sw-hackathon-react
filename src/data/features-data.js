import {
  CpuChipIcon,
  WifiIcon,
  CircleStackIcon,
} from "@heroicons/react/24/solid";

// ICT 학부 카드 정보
export const featuresDataCollege = [
  {
    color: "gray",
    title: "컴퓨터학부",
    icon: CpuChipIcon,
    path: "/home", // 대표 페이지 경로 추가
    description:
        "ICT 정보 처리 기반 기술을 바탕으로 컴퓨터 시스템과 소프트웨어 기초, 응용, 개발 기술을 습득",
    links: [
      { text: "컴퓨터 SW", url: "/college/computer-science/introduction" },
      { text: "미디어 SW", url: "/college/computer-science/faculty" },
    ],
  },
  {
    color: "gray",
    title: "정보통신학부",
    icon: WifiIcon,
    path: "/telecommunicationEngineering", // 대표 페이지 경로 추가
    description:
        "정보통신과 정보보호 분야를 공부하고, 4차 산업혁명시대에 필요한 핵심 기술 인력을 양성",
    links: [
      { text: "정보 통신", url: "/college/information-communication/home" },
      { text: "정보 보호", url: "/college/information-communication/curriculum" },
    ],
  },
  {
    color: "gray",
    title: "데이터과학부",
    icon: CircleStackIcon,
    path: "/profile", // 대표 페이지 경로 추가
    description:
        "데이터 분석에서부터 인공지능 알고리즘 개발 및 실행에 필요한 전문 지식과 개발 기술을 습득",
    links: [
      { text: "데이터과학부", url: "/college/data-science/details" },
    ],
  },
];

export default featuresDataCollege;