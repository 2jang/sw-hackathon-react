import {
  BriefcaseIcon,
  ChartBarIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";

//정보통신학부 과목소개 데이터
export const curriculumData = [
  {
    title: "회로이론",
    icon: BriefcaseIcon,
    description:
      "회로이론의 기초가 되는 회로해석에 중점을 두어 앞으로 학습할 전자회로이론, 전력전자 이론을 학습하는데 도움을준다.",
  },
  {
    title: "네트워크",
    icon: ChartBarIcon,
    description:
      "컴퓨터 간의 통신 원리를 이해하고, 네트워크 계층 구조 및 데이터 전달 방식에 대한 이론을 학습하여 정보 전달 시스템의 기초를 다진다.",
  },
  {
    title: "디지털논리설계실험",
    icon: PlayIcon,
    description:
      "논리회로의 기본 원리를 바탕으로 조합논리 및 순차논리 회로를 직접 설계하고 실험함으로써 디지털 시스템 구현 능력을 키운다.",
  },
];

export default curriculumData;
