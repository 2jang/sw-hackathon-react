import React, { useState, useEffect } from "react";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI.jsx";
import {
    Card,
    CardBody,
    Typography,
    Checkbox,
    Button,
    Tabs,
    TabsHeader,
    Tab,
} from "@material-tailwind/react";
import {
    CheckCircleIcon,
    XCircleIcon,
    ComputerDesktopIcon,
    GlobeAltIcon,
    LockClosedIcon,
    ServerIcon,
    ChartBarIcon,
    ClockIcon,
    AcademicCapIcon
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { motion, AnimatePresence } from "framer-motion";

// 학과별 데이터 수정
const departmentsData = [
    {
        id: "computersw",
        name: "컴퓨터 SW",
        icon: ComputerDesktopIcon,
        color: "blue",
        description: "컴퓨터학부",
        requirements: [
            {
                name: "외국어 인증 (1개 이상)",
                options: [
                    "TOEIC: 18학번 이후 600점",
                    "TOEFL (iBT): 62점 이상",
                    "TEPS: 480점 이상",
                    "OPIc: IM1 이상",
                    "TOEIC Speaking: 5등급 이상, 최소 110점",
                    "JPT/JLPT: 2급 이상, 최소 500점",
                    "新HSK: 5급 이상, 최소 180점",
                    "FLEX: 3B 이상 (읽기·듣기 또는 말하기·쓰기 중 택 1)",
                    "TORFL: 1급 이상",
                    "DELF: A2 이상"
                ]
            },
            {
                name: "졸업 전시",
                description: "1년짜리 프로젝트 수행 후 졸업 전시 개최 및 교수님의 직접 승인이 필요합니다."
            }
        ]
    },
    {
        id: "mediasw",
        name: "미디어 SW",
        icon: GlobeAltIcon,
        color: "purple",
        description: "컴퓨터학부",
        requirements: [
            {
                name: "외국어 인증 (1개 이상)",
                options: [
                    "TOEIC: 18학번 이후 600점",
                    "TOEFL (iBT): 62점 이상",
                    "TEPS: 480점 이상",
                    "OPIc: IM1 이상",
                    "TOEIC Speaking: 5등급 이상, 최소 110점",
                    "JPT/JLPT: 2급 이상, 최소 500점",
                    "新HSK: 5급 이상, 최소 180점",
                    "FLEX: 3B 이상 (읽기·듣기 또는 말하기·쓰기 중 택 1)",
                    "TORFL: 1급 이상",
                    "DELF: A2 이상"
                ]
            },
            {
                name: "졸업 프로젝트",
                description: "미디어 콘텐츠 관련 1년짜리 졸업 작품 제작 및 전시에 참여해야 합니다."
            }
        ]
    },
    {
        id: "information",
        name: "정보통신",
        icon: ServerIcon,
        color: "green",
        description: "정보통신학부",
        requirements: [
            {
                name: "외국어 인증 (1개 이상)",
                options: [
                    "TOEIC: 18학번 이후 600점",
                    "TOEFL (iBT): 62점 이상",
                    "TEPS: 480점 이상",
                    "OPIc: IM1 이상",
                    "TOEIC Speaking: 5등급 이상, 최소 110점",
                    "JPT/JLPT: 2급 이상, 최소 500점",
                    "新HSK: 5급 이상, 최소 180점",
                    "FLEX: 3B 이상 (읽기·듣기 또는 말하기·쓰기 중 택 1)",
                    "TORFL: 1급 이상",
                    "DELF: A2 이상"
                ]
            },
            {
                name: "졸업학점취득",
                description: "학번과 편입/복수전공에 따라 다름, 개인별 확인 필수"
            },
            {
                name: "창의적공학설계 과목",
                description: "창의적공학설계 1, 2 과목 수강 필수 (4학년 1, 2학기 모두 수강)"
            },
            {
                name: "졸업작품",
                description: "11월 졸업전시회 참가, 학과 교수 심사 통과, 자격증 취득은 졸업요건에 해당하지 않음, 졸업 사정 심사 신청서 통과 필요"
            }
        ]
    },
    {
        id: "protection",
        name: "정보보호",
        icon: LockClosedIcon,
        color: "red",
        description: "정보통신학부",
        requirements: [
            {
                name: "외국어 인증 (1개 이상)",
                options: [
                    "TOEIC: 18학번 이후 600점",
                    "TOEFL (iBT): 62점 이상",
                    "TEPS: 480점 이상",
                    "OPIc: IM1 이상",
                    "TOEIC Speaking: 5등급 이상, 최소 110점",
                    "JPT/JLPT: 2급 이상, 최소 500점",
                    "新HSK: 5급 이상, 최소 180점",
                    "FLEX: 3B 이상 (읽기·듣기 또는 말하기·쓰기 중 택 1)",
                    "TORFL: 1급 이상",
                    "DELF: A2 이상"
                ]
            },
            {
                name: "A-E 중 1개 이상 선택",
                options: [
                    "A: 학과 졸업작품전 출품 및 발표 (4학년)",
                    "B: SW 개발 프로젝트 과목 2개 이상 이수 (2·3학년 각각 1개)",
                    "C: IT 공모전 입상",
                    "D: 학회 우수 논문상 수상 (KCI 등재 논문도 가능)",
                    "E: 정보보안기사·정보보안산업기사·정보처리기사 중 1개 자격증 취득"
                ]
            }
        ]
    },
    {
        id: "datascience",
        name: "데이터과학",
        icon: ChartBarIcon,
        color: "amber",
        description: "데이터과학부",
        requirements: [
            {
                name: "외국어 인증 (1개 이상)",
                options: [
                    "TOEIC: 600점 이상",
                    "TOEFL (iBT): 62점 이상",
                    "TEPS: 480점 이상",
                    "OPIc: IM1 이상",
                    "TOEIC Speaking: 5등급 이상, 최소 110점",
                    "JPT/JLPT: 2급 이상, 최소 500점",
                    "新HSK: 5급 이상, 최소 180점",
                    "FLEX: 3B 이상 (읽기·듣기 또는 말하기·쓰기 중 택 1)",
                    "TORFL: 1급 이상",
                    "DELF: A2 이상"
                ]
            },
            {
                name: "교양 및 전공 학점",
                description: "전공 51학점 이상, 교양 42학점 이상, 개인별 이수 계획 확인 필수"
            },
            {
                name: "졸업논문 및 프로젝트",
                description: "전공필수인 프로젝트 및 논문 작성"
            }
        ]
    }
];

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};

export function Graduate() {
    // 기본 학과를 컴퓨터 SW로 설정
    const [activeTab, setActiveTab] = useState("computersw");
    const [checkedItems, setCheckedItems] = useState({});
    const [showResults, setShowResults] = useState({});

    // 학과 데이터 상태 초기화
    useEffect(() => {
        const newCheckedItems = {};
        const newShowResults = {};

        departmentsData.forEach(dept => {
            newShowResults[dept.id] = false;

            dept.requirements.forEach((req, reqIndex) => {
                if (reqIndex === 0 || (dept.id === 'protection' && reqIndex === 1)) {
                    // 1번 항목(외국어 인증)과 정보보호학과의 2번 항목(A-E 선택)은 다중 체크박스
                    if (req.options) {
                        req.options.forEach((_, optionIndex) => {
                            newCheckedItems[`${dept.id}_${reqIndex}_${optionIndex}`] = false;
                        });
                    }
                } else {
                    // 나머지는 단일 항목
                    newCheckedItems[`${dept.id}_${reqIndex}`] = false;
                }
            });
        });

        setCheckedItems(newCheckedItems);
        setShowResults(newShowResults);
    }, []);

    const handleCheckChange = (e) => {
        setCheckedItems({
            ...checkedItems,
            [e.target.name]: e.target.checked
        });
    };

    const evaluateGraduationStatus = (departmentId) => {
        const department = departmentsData.find(dept => dept.id === departmentId);
        if (!department) return false;

        let canGraduate = true;

        department.requirements.forEach((req, reqIndex) => {
            if (reqIndex === 0 || (department.id === 'protection' && reqIndex === 1)) {
                // 1번 항목(외국어 인증)과 정보보호학과의 2번 항목(A-E 선택)은 하나 이상 선택 필요
                let hasOption = false;
                if (req.options) {
                    req.options.forEach((_, optionIndex) => {
                        if (checkedItems[`${department.id}_${reqIndex}_${optionIndex}`]) {
                            hasOption = true;
                        }
                    });
                }
                if (!hasOption) canGraduate = false;
            } else {
                // 나머지 항목은 반드시 체크 필요
                if (!checkedItems[`${department.id}_${reqIndex}`]) {
                    canGraduate = false;
                }
            }
        });

        return canGraduate;
    };

    const handleCheckResult = (departmentId) => {
        setShowResults({
            ...showResults,
            [departmentId]: true
        });

        // 결과를 보여준 후 스크롤 이동
        setTimeout(() => {
            const resultElement = document.getElementById('result-section');
            if (resultElement) {
                resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    // 탭 변경 처리
    const handleTabChange = (deptId) => {
        setActiveTab(deptId);
        setShowResults({
            ...showResults,
            [deptId]: false
        });
    };

    const getDeptColor = (deptId) => {
        const dept = departmentsData.find(d => d.id === deptId);
        return dept ? dept.color : 'blue';
    };

    const resetSelection = () => {
        // 현재 선택된 학과의 체크박스만 초기화
        const currentDept = departmentsData.find(dept => dept.id === activeTab);
        const newCheckedItems = { ...checkedItems };

        currentDept.requirements.forEach((req, reqIndex) => {
            if (reqIndex === 0 || (currentDept.id === 'protection' && reqIndex === 1)) {
                if (req.options) {
                    req.options.forEach((_, optionIndex) => {
                        newCheckedItems[`${currentDept.id}_${reqIndex}_${optionIndex}`] = false;
                    });
                }
            } else {
                newCheckedItems[`${currentDept.id}_${reqIndex}`] = false;
            }
        });

        setCheckedItems(newCheckedItems);
        setShowResults({
            ...showResults,
            [activeTab]: false
        });
    };

    const getProgressPercentage = (departmentId) => {
        const department = departmentsData.find(dept => dept.id === departmentId);
        if (!department) return 0;

        let totalChecks = 0;
        let checkedCount = 0;

        department.requirements.forEach((req, reqIndex) => {
            if (reqIndex === 0 || (department.id === 'protection' && reqIndex === 1)) {
                // 다중 선택 항목은 하나라도 체크되면 1점 획득
                let hasChecked = false;
                if (req.options) {
                    req.options.forEach((_, optionIndex) => {
                        if (checkedItems[`${department.id}_${reqIndex}_${optionIndex}`]) {
                            hasChecked = true;
                        }
                    });
                }
                totalChecks += 1;
                if (hasChecked) checkedCount += 1;
            } else {
                totalChecks += 1;
                if (checkedItems[`${department.id}_${reqIndex}`]) {
                    checkedCount += 1;
                }
            }
        });

        return totalChecks > 0 ? Math.round((checkedCount / totalChecks) * 100) : 0;
    };

    return (
        <>
            <div className="relative flex h-[40vh] content-center items-center justify-center">
                <div className="absolute top-0 h-full w-full bg-[url('https://www.suwon.ac.kr/usr/images/suwon/college_top_technology.gif')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                졸업 요건 확인
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                ICT대학 학과별 졸업 요건을 체크하고 준비하세요
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            <section className="-mt-26 px-4 pt-20 pb-16 md:pb-24">
                <div className="container mx-auto max-w-screen-xl">
                    <motion.div
                        variants={fadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
                            <CardBody className="p-4">
                                <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
                                    학과별 졸업 요건 체크리스트
                                </Typography>
                                <Typography className="font-normal text-blue-gray-500 mb-6 text-center">
                                    학과를 선택하고 충족한 졸업 요건을 체크하세요
                                </Typography>

                                {/* 탭 네비게이션 - 중앙 정렬 */}
                                <div className="flex justify-center mb-8">
                                    <div className="w-full max-w-4xl">
                                        <Tabs value={activeTab}>
                                            <TabsHeader className="bg-gray-100 p-2">
                                                {departmentsData.map((dept) => (
                                                    <Tab
                                                        key={dept.id}
                                                        value={dept.id}
                                                        onClick={() => handleTabChange(dept.id)}
                                                        className={`flex items-center justify-center gap-2 py-3 px-4 ${
                                                            activeTab === dept.id
                                                                ? `text-${dept.color}-500 font-medium`
                                                                : "text-gray-700"
                                                        }`}
                                                    >
                                                        <dept.icon className={`h-5 w-5 ${activeTab === dept.id ? `text-${dept.color}-500` : "text-gray-600"}`} />
                                                        <span className="hidden sm:block">{dept.name}</span>
                                                    </Tab>
                                                ))}
                                            </TabsHeader>
                                        </Tabs>
                                    </div>
                                </div>

                                {/* 현재 선택된 학과 컨텐츠 */}
                                {departmentsData.map(dept => (
                                    activeTab === dept.id && (
                                        <motion.div
                                            key={dept.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col items-center"
                                        >
                                            {/* 학과 정보 헤더 - 중앙 정렬 */}
                                            <div className={`mb-6 p-4 rounded-lg bg-${dept.color}-50 border w-full max-w-4xl`}>
                                                <div className="flex items-center justify-center gap-4">
                                                    <div className={`rounded-full p-3`}>
                                                        <dept.icon className={`h-8 w-8 text-${dept.color}-500`} />
                                                    </div>
                                                    <div>
                                                        <Typography variant="h4" color="blue-gray">
                                                            {dept.name}
                                                        </Typography>
                                                        <Typography variant="small" color="gray">
                                                            {dept.description}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* 요건 체크리스트 - 중앙 정렬 */}
                                            {/* 요건 체크리스트 - 1번(외국어)은 왼쪽, 2번(나머지)은 오른쪽에 배치 */}
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-4xl">
                                                {/* 1번 - 외국어 인증 (왼쪽) */}
                                                <div className="border border-gray-200 rounded-xl p-6">
                                                    {dept.requirements.filter(req => req.name.includes("외국어")).map((req, idx) => {
                                                        const reqIndex = dept.requirements.findIndex(r => r === req);
                                                        return (
                                                            <React.Fragment key={idx}>
                                                                <Typography variant="h5" className="mb-4 flex items-center gap-2 text-lg font-semibold">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-${dept.color}-500 text-white`}>
                            1
                        </span>
                                                                    {req.name}
                                                                </Typography>

                                                                <div className="ml-10">
                                                                    {req.options && (
                                                                        <div>
                                                                            <Typography color="blue-gray" className="mb-3">
                                                                                다음 중 하나 이상 선택해야 합니다:
                                                                            </Typography>
                                                                            <div className="rounded-lg bg-gray-50 p-4">
                                                                                {req.options.map((option, optionIndex) => (
                                                                                    <div key={optionIndex} className="mb-2 flex items-start last:mb-0">
                                                                                        <Checkbox
                                                                                            name={`${dept.id}_${reqIndex}_${optionIndex}`}
                                                                                            checked={checkedItems[`${dept.id}_${reqIndex}_${optionIndex}`] || false}
                                                                                            onChange={handleCheckChange}
                                                                                            color={dept.color}
                                                                                            className="h-5 w-5"
                                                                                            crossOrigin={undefined}
                                                                                        />
                                                                                        <Typography color="blue-gray" className="ml-2">
                                                                                            {option}
                                                                                        </Typography>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </React.Fragment>
                                                        );
                                                    })}
                                                </div>

                                                {/* 오른쪽 섹션 - 여기에 나머지 요건들을 각각 다른 번호의 동그라미로 표시 */}
                                                <div className="flex flex-col gap-6">
                                                    {dept.requirements.filter(req => !req.name.includes("외국어")).map((req, idx) => {
                                                        const reqIndex = dept.requirements.findIndex(r => r === req);
                                                        return (
                                                            <div key={idx} className="border border-gray-200 rounded-xl p-6">
                                                                <Typography variant="h5" className="mb-4 flex items-center gap-2 text-lg font-semibold">
                                                                    <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-${dept.color}-500 text-white`}>
                                                                        {idx + 2} {/* 외국어가 1번이므로 나머지는 2번부터 시작 */}
                                                                    </span>
                                                                    {req.name}
                                                                </Typography>

                                                                <div className="ml-10">
                                                                    {(dept.id === 'protection' && reqIndex === 1) && req.options ? (
                                                                        <div>
                                                                            <Typography color="blue-gray" className="mb-3">
                                                                                다음 중 하나 이상 선택해야 합니다:
                                                                            </Typography>
                                                                            <div className="rounded-lg bg-gray-50 p-4">
                                                                                {req.options.map((option, optionIndex) => (
                                                                                    <div key={optionIndex} className="mb-2 flex items-start last:mb-0">
                                                                                        <Checkbox
                                                                                            name={`${dept.id}_${reqIndex}_${optionIndex}`}
                                                                                            checked={checkedItems[`${dept.id}_${reqIndex}_${optionIndex}`] || false}
                                                                                            onChange={handleCheckChange}
                                                                                            color={dept.color}
                                                                                            className="h-5 w-5"
                                                                                            crossOrigin={undefined}
                                                                                        />
                                                                                        <Typography color="blue-gray" className="ml-2">
                                                                                            {option}
                                                                                        </Typography>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className="rounded-lg bg-gray-50 p-4">
                                                                            <div className="flex items-start">
                                                                                <Checkbox
                                                                                    name={`${dept.id}_${reqIndex}`}
                                                                                    checked={checkedItems[`${dept.id}_${reqIndex}`] || false}
                                                                                    onChange={handleCheckChange}
                                                                                    color={dept.color}
                                                                                    className="h-5 w-5"
                                                                                    crossOrigin={undefined}
                                                                                />
                                                                                <Typography color="blue-gray" className="ml-2">
                                                                                    {req.description}
                                                                                </Typography>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>

                                            {/* 진행 상태 - 중앙 정렬 */}
                                            <div className="mt-8 mb-4 w-full max-w-4xl">
                                                <div className="flex items-center justify-between mb-2">
                                                    <Typography className="text-gray-700 text-sm">진행 상태</Typography>
                                                    <Typography className={`text-${dept.color}-500 font-medium text-sm`}>
                                                        {getProgressPercentage(dept.id)}%
                                                    </Typography>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`bg-${dept.color}-500 h-2.5 rounded-full transition-all duration-500`}
                                                        style={{width: `${getProgressPercentage(dept.id)}%`}}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* 버튼 그룹 - 가운데 정렬 */}
                                            <div className="mt-8 flex justify-center gap-4">
                                                <Button
                                                    onClick={() => handleCheckResult(dept.id)}
                                                    color={dept.color}
                                                    size="lg"
                                                    className="flex items-center gap-2 px-6 py-3 text-base"
                                                >
                                                    <AcademicCapIcon className="h-5 w-5" />
                                                    졸업 요건 확인하기
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="gray"
                                                    size="lg"
                                                    className="flex items-center gap-2 px-6 py-3 text-base"
                                                    onClick={resetSelection}
                                                >
                                                    초기화
                                                </Button>
                                            </div>

                                            {/* 결과 표시 - 가운데 정렬 */}
                                            <div id="result-section" className="w-full flex justify-center">
                                                <AnimatePresence>
                                                    {showResults[dept.id] && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: -10 }}
                                                            className="mt-8 rounded-xl overflow-hidden w-full max-w-3xl"
                                                        >
                                                            <div className="py-3 px-4 rounded-t-xl bg-gray-50">
                                                                <Typography variant="h5" className="text-gray-800 text-center font-bold">
                                                                    졸업 요건 평가 결과
                                                                </Typography>
                                                            </div>

                                                            <div className="p-6">
                                                                <div className="flex items-center justify-center mb-6">
                                                                    <div className={`h-16 w-16 rounded-full ${
                                                                        evaluateGraduationStatus(dept.id) ? 'bg-green-500' : 'bg-red-500'
                                                                    } flex items-center justify-center mx-auto shadow-lg`}>
                                                                        {evaluateGraduationStatus(dept.id) ? (
                                                                            <CheckCircleIcon className="h-10 w-10 text-white" />
                                                                        ) : (
                                                                            <XCircleIcon className="h-10 w-10 text-white" />
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <Typography className="text-center text-lg font-medium">
                                                                    {evaluateGraduationStatus(dept.id)
                                                                        ? "축하합니다! 모든 졸업 요건을 충족하였습니다."
                                                                        : "아직 모든 졸업 요건을 충족하지 못했습니다."}
                                                                </Typography>

                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                                                    <div className="bg-white rounded-lg p-3 text-center border border-gray-200 shadow-sm">
                                                                        <Typography className="text-gray-500 text-xs mb-1">충족 요건</Typography>
                                                                        <div className="flex items-center justify-center gap-1">
                                                                            <CheckCircleIcon className="h-4 w-4 text-green-500" />
                                                                            <Typography className="font-bold text-green-600">
                                                                                {getProgressPercentage(dept.id)}%
                                                                            </Typography>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bg-white rounded-lg p-3 text-center border border-gray-200 shadow-sm">
                                                                        <Typography className="text-gray-500 text-xs mb-1">남은 요건</Typography>
                                                                        <div className="flex items-center justify-center gap-1">
                                                                            <ClockIcon className="h-4 w-4 text-blue-500" />
                                                                            <Typography className="font-bold text-blue-600">
                                                                                {100 - getProgressPercentage(dept.id)}%
                                                                            </Typography>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    )
                                ))}
                            </CardBody>
                        </Card>
                    </motion.div>
                </div>
            </section>

            <div className="bg-white">
                <Footer />
            </div>
            <ChatbotUI />
        </>
    );
}

export default Graduate;