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
        content: "졸업 요건 내용입니다.",
    },
    {
        label: "미디어SW",
        value: "mediasw",
        content: "졸업 요건 내용입니다.",
    },
    {
        label: "정보통신",
        value: "information",
        content: "졸업 요건 내용입니다.",
    },
    {
        label: "정보보호",
        value: "protection",
        content: "졸업 요건 내용입니다.",
    },
    {
        label: "데이터과학",
        value: "datascience",
        content: "졸업 요건 내용입니다.",
    },
];

export function Graduate() {
    const [activeTab, setActiveTab] = React.useState(graduateTabsData[0].value);

    return (
        <>
            <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
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
                                        <TabPanel key={value} value={value} className="p-0 pt-6">
                                            <Typography variant="h5" color="blue-gray" className="mb-4">
                                                {graduateTabsData.find(tab => tab.value === value)?.label} 졸업 요건
                                            </Typography>
                                            <Typography>
                                                {content}
                                            </Typography>
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