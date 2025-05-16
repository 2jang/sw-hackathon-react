import {
  WifiIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/solid";

// 정보통신학부 학과 카드 정보
export const featuresDataDepartment1 = [
  {
    color: "gray",
    title: "정보통신학과",
    icon: WifiIcon,
    description: "정보통신 전공은 ICT 및 IoT 시대에 맞춰 공학 인재를 양성하며, 실무 중심의 전문가 교육과 융합형 창의력 개발을 목표로 한다.\n" +
        "주요 교육 내용은 네트워크, 모바일·임베디드 프로그래밍, 멀티미디어 시스템, 로봇 특화 융합교과 등이다.",
    path: "/ict", // 경로 수정
  },
  {
    color: "gray",
    title: "정보보호학과",
    icon: ShieldCheckIcon,
    description:
        "정보보호 전공은 정보사회 핵심 기반인 정보보호 기술 분야에서 이론과 실무를 겸비한 전문가 양성을 목표로 한다.\n" +
        "컴퓨터 공학 기초부터 암호학, 시스템·네트워크 보안 등 전문 이론과 실습, 인턴십을 통해 현장 중심의 실무 역량을 키운다.",
    path: "/cis", // 경로 수정
  },
];

export default featuresDataDepartment1;