import React from "react";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { AcademicCapIcon } from "@heroicons/react/24/solid"; // 아이콘 import
import { PageTitle, Footer } from "@/widgets/layout";

const graduateTabsData = [
    {
        label: "컴퓨터 SW",
        value: "computersw",
        content: (
            <>
                <h3 className="text-xl font-semibold mb-4">컴퓨터 SW 학과 (컴퓨터학부, ICT융합대학 소속)</h3>
                <ol className="list-decimal list-inside space-y-4">
                    <li>
                        <strong className="font-semibold">외국어 인증 (필수)</strong>
                        <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-gray-700">
                            <li>TOEIC: 17학번 이전 550점, 18학번 이후 600점</li>
                            <li>TOEFL (iBT): 62점 이상</li>
                            <li>TEPS: 480점 이상</li>
                            <li>OPIc: IM1 이상</li>
                            <li>TOEIC Speaking: 5등급 이상, 최소 110점</li>
                            <li>JPT/JLPT: 2급 이상, 최소 500점</li>
                            <li>新HSK: 5급 이상, 최소 180점</li>
                            <li>FLEX: 3B 이상 (읽기·듣기 또는 말하기·쓰기 중 택 1)</li>
                            <li>TORFL: 1급 이상</li>
                            <li>DELF: A2 이상</li>
                        </ul>
                    </li>
                    <li>
                        <strong className="font-semibold">졸업 논문 및 전시</strong>
                        <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-gray-700">
                            <li>1년짜리 프로젝트 수행 후 졸업 전시 개최</li>
                            <li>교수님의 직접 승인 필요</li>
                        </ul>
                    </li>
                </ol>
            </>
        ),
    },
    {
        label: "미디어SW",
        value: "mediasw",
        content: <>
            <h3 className="text-xl font-semibold mb-4">미디어 SW 학과 (컴퓨터학부, ICT융합대학 소속)</h3>
            <ol className="list-decimal list-inside space-y-4">
                <li>
                    <strong className="font-semibold">외국어 인증 (필수)</strong>
                    <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-gray-700">
                        <li>TOEIC: 17학번 이전 550점, 18학번 이후 600점</li>
                        <li>TOEFL (iBT): 62점 이상</li>
                        <li>TEPS: 480점 이상</li>
                        <li>OPIc: IM1 이상</li>
                        <li>TOEIC Speaking: 5등급 이상, 최소 110점</li>
                        <li>JPT/JLPT: 2급 이상, 최소 500점</li>
                        <li>新HSK: 5급 이상, 최소 180점</li>
                        <li>FLEX: 3B 이상 (읽기·듣기 또는 말하기·쓰기 중 택 1)</li>
                        <li>TORFL: 1급 이상</li>
                        <li>DELF: A2 이상</li>
                    </ul>
                </li>
                <li>
                    <strong className="font-semibold">졸업 논문 및 전시</strong>
                    <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-gray-700">
                        <li>1년짜리 프로젝트 수행 후 졸업 전시 개최</li>
                        <li>교수님의 직접 승인 필요</li>
                    </ul>
                </li>
            </ol>
        </>,
    },
    {
        label: "정보통신",
        value: "information",
        content: (
            <>
                <h3 className="text-xl font-semibold mb-4">정보통신학과 (정보통신학부, ICT대학 소속)</h3>
                <ol className="list-decimal list-inside space-y-4 text-gray-800">
                    <li>
                        <strong className="font-semibold">어학능력 (필수)</strong>
                        <p className="mt-2 mb-1">18학번 이후 기준</p>
                        <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
                            <li>TOEIC: 600점 이상</li>
                            <li>TOEFL (iBT): 62점 이상</li>
                            <li>TEPS: 480점 이상</li>
                            <li>OPIc: IM1 이상</li>
                            <li>TOEIC Speaking: 5등급 이상, 최소 110점</li>
                            <li>JPT/JLPT: 2급 이상, 최소 500점</li>
                            <li>新HSK: 5급 이상, 최소 180점</li>
                            <li>TORFL: 1급 이상 (5개 영역 중 4개 영역에서 40% 이상 취득)</li>
                            <li>FLEX(러시아어): 읽기·듣기 또는 말하기·쓰기 중 1개 이상 3B 이상</li>
                            <li>DELF: A2 이상</li>
                        </ul>
                        <p className="mt-4 mb-1">17학번 이전 기준</p>
                        <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
                            <li>TOEIC: 550점 이상</li>
                            <li>TOEFL (iBT): 58점 이상</li>
                            <li>TEPS: 440점 이상</li>
                            <li>OPIc: IM1 이상</li>
                            <li>TOEIC Speaking: 4등급 이상, 최소 100점</li>
                            <li>기타 항목은 18학번 이후와 동일</li>
                        </ul>
                    </li>
                    <li>
                        <strong className="font-semibold">졸업학점취득 (필수)</strong>
                        <p className="mt-2">학번과 편입/복수전공에 따라 다름</p>
                        <p>개인별 확인 필수</p>
                    </li>
                    <li>
                        <strong className="font-semibold">창의적공학설계 과목 (필수)</strong>
                        <p className="mt-2">창의적공학설계 1, 2 과목 수강 필수</p>
                        <p>4학년 1, 2학기 모두 수강</p>
                    </li>
                    <li>
                        <strong className="font-semibold">졸업작품 (필수)</strong>
                        <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-gray-700">
                            <li>11월 졸업전시회 참가</li>
                            <li>학과 교수 심사 통과</li>
                        </ul>
                        <p className="mt-2">자격증 취득은 졸업요건에 해당하지 않음</p>
                        <p>졸업 사정 심사 신청서 통과 필요</p>
                    </li>
                </ol>
            </>
        ),
    },
    {
        label: "정보보호",
        value: "protection",
        content: (
            <>
                <h3 className="text-xl font-semibold mb-4">정보보호 학과 (정보통신학부, ICT대학 소속)</h3>
                <ol className="list-decimal list-inside space-y-4 text-gray-800">
                    <li>
                        <strong className="font-semibold">어학능력 (필수)</strong>
                        <p className="mt-2 mb-1">18학번 이후 기준</p>
                        <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
                            <li>TOEIC: 600점 이상</li>
                            <li>TOEFL (iBT): 62점 이상</li>
                            <li>TEPS: 480점 이상</li>
                            <li>OPIc: IM1 이상</li>
                            <li>TOEIC Speaking: 5등급 이상, 최소 110점</li>
                            <li>JPT/JLPT: 2급 이상, 최소 500점</li>
                            <li>新HSK: 5급 이상, 최소 180점</li>
                            <li>TORFL: 1급 이상 (5개 영역 중 4개 영역에서 40% 이상 취득)</li>
                            <li>FLEX(러시아어): 읽기·듣기 또는 말하기·쓰기 중 1개 이상 3B 이상</li>
                            <li>DELF: A2 이상</li>
                        </ul>
                        <p className="mt-4 mb-1">17학번 이전 기준</p>
                        <ul className="list-disc list-inside ml-5 space-y-1 text-gray-700">
                            <li>TOEIC: 550점 이상</li>
                            <li>TOEFL (iBT): 58점 이상</li>
                            <li>TEPS: 440점 이상</li>
                            <li>OPIc: IM1 이상</li>
                            <li>TOEIC Speaking: 4등급 이상, 최소 100점</li>
                            <li>기타 항목은 18학번 이후와 동일</li>
                        </ul>
                    </li>
                    <li>
                        <strong className="font-semibold">A-E 중 1개 이상 선택 (17학번 이전 및 18학번 이후 동일)</strong>
                        <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-gray-700">
                            <li>A: 학과 졸업작품전 출품 및 발표 (4학년)</li>
                            <li>B: SW 개발 프로젝트 과목 2개 이상 이수 (2·3학년 각각 1개, 2022년 3학년 한시적 완화)</li>
                            <li>C: IT 공모전 입상</li>
                            <li>D: 학회 우수 논문상 수상 (KCI 등재 논문도 가능)</li>
                            <li>E: 정보보안기사·정보보안산업기사·정보처리기사 중 1개 자격증 취득</li>
                        </ul>
                    </li>
                </ol>
            </>
        ),
    },
    {
        label: "데이터과학",
        value: "datascience",
        content: (
            <>
                <h3 className="text-xl font-semibold mb-4">데이터과학과 (ICT대학 소속)</h3>
                <ol className="list-decimal list-inside space-y-4 text-gray-800">
                    <li>
                        <strong className="font-semibold">외국어 인증제도 (필수, 18학번 이후)</strong>
                        <ul className="list-disc list-inside ml-5 mt-2 space-y-1 text-gray-700">
                            <li>TOEIC 600 이상</li>
                            <li>TEPS 480 이상</li>
                            <li>TOEFL (iBT) 62 이상</li>
                            <li>OPIc IM1 이상</li>
                            <li>TOEIC Speaking 5등급 이상, 최소 110점</li>
                            <li>JPT/JLPT 2급 이상, 최소 500점</li>
                            <li>新HSK 5급 이상, 최소 180점</li>
                            <li>TORFL 1급 이상 (5개 영역 중 4개 영역에서 40% 이상 취득)</li>
                            <li>FLEX(러시아어): 읽기·듣기 또는 말하기·쓰기 중 1개 이상 3B 이상</li>
                            <li>DELF A2 이상</li>
                        </ul>
                    </li>
                    <li>
                        <strong className="font-semibold">교양 및 전공 학점</strong>
                        <p className="mt-2 mb-1">전공 51학점 이상, 교양 42학점 이상</p>
                        <p>개인별 이수 계획 확인 필수</p>
                    </li>
                    <li>
                        <strong className="font-semibold">졸업논문 및 프로젝트</strong>
                        <p className="mt-2">전공필수인 프로젝트 및 논문 작성</p>
                    </li>
                </ol>
            </>
        ),
    },
];


export function Graduate() {
    const [activeTab, setActiveTab] = React.useState(graduateTabsData[0].value);

    return (
        <>
            <div className="relative flex h-[50vh] content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
                {/* 배경 이미지 위의 텍스트 제거 */}
                <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                졸업 요건
              </Typography>
              <Typography variant="lead" color="white" className="opacity-80">
                학과별 졸업 요건을 확인하세요.
              </Typography>
            </div>
          </div>
        </div>
            </div>

            {/* PageTitle을 위한 별도의 Card 섹션 */}
            <section className="-mt-48 bg-transparent px-4 pb-10 pt-4"> {/* -mt-32에서 -mt-48 정도로 조정 */}
                <div className="container mx-auto">
                    <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                        <CardBody className="p-6 md:p-8 text-center">
                            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-3 text-center shadow-lg">
                                <AcademicCapIcon className="h-8 w-8 text-white" />
                            </div>
                            {/* PageTitle 대신 Typography를 사용하여 스타일 직접 적용 */}
                            <Typography variant="h2" color="blue-gray" className="mb-3 font-bold">
                                학과별 졸업 요건 안내
                            </Typography>
                            <Typography className="font-normal text-blue-gray-500">
                                각 학과별 졸업 요건 및 공통 요건을 확인하여 성공적인 졸업을 준비하세요.
                            </Typography>
                        </CardBody>
                    </Card>
                </div>
            </section>

            {/* Tabs와 TabPanel을 위한 별도의 Card 섹션 */}
            <section className="bg-white px-4 pb-20 pt-8"> {/* 상단 패딩 pt-8로 조정하여 위 카드와 간격 */}
                <div className="container mx-auto">
                    <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                        <CardBody className="p-6 md:p-8">
                            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)}>
                                <TabsHeader
                                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                                    indicatorProps={{
                                        className: "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                                    }}
                                >
                                    {graduateTabsData.map(({ label, value }) => (
                                        <Tab
                                            key={value}
                                            value={value}
                                            onClick={() => setActiveTab(value)}
                                            className={activeTab === value ? "text-gray-900" : ""}
                                        >
                                            {label}
                                        </Tab>
                                    ))}
                                </TabsHeader>
                                <TabsBody>
                                    {graduateTabsData.map(({ value, content }) => (
                                        <TabPanel key={value} value={value}>
                                            {graduateTabsData.find(tab => tab.value === value)?.label} 졸업 요건
                                            {content}
                                        </TabPanel>
                                    ))}
                                </TabsBody>
                            </Tabs>
                        </CardBody>
                    </Card>
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