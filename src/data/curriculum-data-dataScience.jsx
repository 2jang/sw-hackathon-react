import {
    CommandLineIcon,
    ChartBarIcon,
    ComputerDesktopIcon,
} from "@heroicons/react/24/solid";

// 컴퓨터SW학과 과목소개 데이터
export const curriculumDataDataScience = [
    {
        title: "데이터 분석 및 시각화",
        icon: CommandLineIcon,
        description:
            "통계 분석, 탐색적 데이터 분석(EDA), 데이터 시각화 도구(Tableau, matplotlib 등)를 활용해 데이터에서 인사이트 도출"
    },
    {
        title: "머신러닝 및 인공지능 모델링",
        icon: ChartBarIcon,
        description:
            "지도/비지도 학습, 딥러닝, 강화학습 기반 예측 및 분류 모델 개발",
    },
    {
        title: "데이터 엔지니어링 및 빅데이터 처리",
        icon: ComputerDesktopIcon,
        description:
            "대용량 데이터 수집·저장·처리 기술 (Hadoop, Spark, SQL, NoSQL 등), 클라우드 기반 데이터 인프라 구축",
    },
];

export default curriculumDataDataScience;
