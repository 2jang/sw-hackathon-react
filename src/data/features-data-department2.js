import {
  CpuChipIcon,
  FilmIcon
} from "@heroicons/react/24/solid";

// 컴퓨터학부 학과 카드 정보
export const featuresDataDepartment2 = [
  {
    color: "gray",
    title: "컴퓨터SW",
    icon: CpuChipIcon,
    description: "컴퓨터SW 전공은 컴퓨터 및 정보통신 이론과 실습을 기반으로 정보화 사회를 선도할 고급 인력을 양성하는 데 중점을 둔다.\n" +
        "또한 컴퓨터 과학자, 기술자, 관리자 등 실무 중심의 유능한 인재를 배출하는 것을 목표로 한다.",
    path: "/computer_sw", // 경로 수정
  },
  {
    color: "gray",
    title: "미디어SW",
    icon: FilmIcon,
    description: "미디어SW 전공은 멀티미디어 기반 웹 환경에서 중심적 역할을 수행할 창의적 전문 인력을 양성하는 것을 목표로 한다.\n" +
        "컴퓨터 기초와 함께 그래픽스, 애니메이션, 게임, VR/AR, 웹 개발 등 다양한 소프트웨어 응용 기술을 학습한다.",
    path: "/media_sw", // 경로 수정
  },
];

export default featuresDataDepartment2;