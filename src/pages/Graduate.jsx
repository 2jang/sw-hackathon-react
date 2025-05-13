import React from "react";
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
import { PageTitle, Footer } from "@/widgets/layout";

// 탭 데이터 예시 (실제 데이터로 교체 필요)
const graduateTabsData = [
    {
        label: "1학년",
        value: "grade1",
        content: "1학년 졸업 요건 내용입니다. 여기에 카드 형식으로 상세 내용을 표시할 수 있습니다.",
    },
    {
        label: "2학년",
        value: "grade2",
        content: "2학년 졸업 요건 내용입니다. 여기에 카드 형식으로 상세 내용을 표시할 수 있습니다.",
    },
    {
        label: "3학년",
        value: "grade3",
        content: "3학년 졸업 요건 내용입니다. 여기에 카드 형식으로 상세 내용을 표시할 수 있습니다.",
    },
    {
        label: "4학년",
        value: "grade4",
        content: "4학년 졸업 요건 내용입니다. 여기에 카드 형식으로 상세 내용을 표시할 수 있습니다.",
    },
    {
        label: "공통",
        value: "common",
        content: "공통 졸업 요건 내용입니다. 여기에 카드 형식으로 상세 내용을 표시할 수 있습니다.",
    },
];

export function Graduate() {
    const [activeTab, setActiveTab] = React.useState(graduateTabsData[0].value);

    return (
        <>
            <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
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
                                학년별 및 공통 졸업 요건을 확인하세요.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>

            {/* PageTitle을 위한 별도의 Card 섹션 */}
            <section className="-mt-32 bg-transparent px-4 pb-10 pt-4"> {/* 배경을 투명하게 하고, 하단 패딩 조정 */}
                <div className="container mx-auto">
                    <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                        <CardBody className="p-6 md:p-8 text-center"> {/* 패딩 및 중앙 정렬 */}
                            <PageTitle section="졸업 요건" heading="학년별 졸업 요건 안내">
                                각 학년별 졸업 요건 및 공통 요건을 확인하여 성공적인 졸업을 준비하세요.
                            </PageTitle>
                        </CardBody>
                    </Card>
                </div>
            </section>

            {/* Tabs와 TabPanel을 위한 별도의 Card 섹션 */}
            <section className="bg-white px-4 pb-20 pt-0"> {/* 상단 패딩을 0으로 조정 */}
                <div className="container mx-auto">
                    <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                        <CardBody className="p-6 md:p-8"> {/* 패딩 적용 */}
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
                                        <TabPanel key={value} value={value} className="p-0 pt-6"> {/* TabPanel 상단에만 패딩 추가 */}
                                            {/* 각 탭의 내용은 이미 Card 형식이므로 추가 Card로 감싸지 않음 */}
                                            <Typography variant="h5" color="blue-gray" className="mb-4">
                                                {graduateTabsData.find(tab => tab.value === value)?.label} 졸업 요건
                                            </Typography>
                                            <Typography>
                                                {content}
                                            </Typography>
                                            {/* 여기에 추가적인 카드 내용이나 컴포넌트를 넣을 수 있습니다. */}
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
        </>
    );
}

export default Graduate;