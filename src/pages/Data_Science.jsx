import {
    Button,
    Card,
    Typography
} from "@material-tailwind/react";
import {teamData_Data_Science , curriculumDataDataScience} from "@/data/index.js";
import { TeamCard } from "@/widgets/cards/index.js";
import React from "react";
import {ChevronDownIcon } from "@heroicons/react/24/solid/index.js";
import {Footer, PageTitle} from "@/widgets/layout/index.js";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI.jsx";
import DataScienceIntro from "@/widgets/layout/dataScienceIntro.jsx";
import CurriculumDataScience from "@/widgets/layout/curriculumDataScience.jsx";

export function Data_Science() {
    const [showAllProfessors, setShowAllProfessors] = React.useState(false);

    // 표시할 교수님 목록 결정 (teamData_Data_Science 사용으로 가정)
    // 만약 다른 교수 데이터(예: teamData_ICT)를 사용해야 한다면 해당 변수로 변경해주세요.
    const professorsToDisplay = showAllProfessors
        ? teamData_Data_Science
        : teamData_Data_Science.slice(0, 8);
    return(
        <>
            <div className="relative flex h-[50vh] content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('/img/background-4.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/50 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                데이터학과
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                "데이터로 세상을 읽고, 통찰로 미래를 설계하다"
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <DataScienceIntro/>
            <CurriculumDataScience/>
            <section className="px-4 pt-20 pb-48 bg-[#f7f8fa]">
                <div className="container mx-auto max-w-screen-xl">
                    <PageTitle section="교수 소개" heading="데이터과학과">
                        “데이터과학과의 길, 여러분의 가능성을 열어드립니다.”
                    </PageTitle>
                    <div className="mt-24 grid grid-cols-1 [@media(max-width:430px)]:grid-cols-2 [@media(max-width:430px)]:gap-8 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
                        {professorsToDisplay.map(({ img, name, position, socials, detailUrl }) => (
                            <TeamCard
                                key={name}
                                img={img}
                                name={name}
                                position={position}
                                socials={socials}
                                detailUrl={detailUrl}
                            />
                        ))}
                    </div>
                    {!showAllProfessors && teamData_Data_Science.length > 8 && (
                        <div className="mt-12 text-center">
                            <Button
                                variant="text"
                                color="green"
                                onClick={() => setShowAllProfessors(true)}
                                className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-800 mx-auto"
                            >
                                더보기
                                <ChevronDownIcon strokeWidth={2} className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>
            </section>
            <div className="bg-white">
                <Footer />
            </div>
            <ChatbotUI />
        </>
    )
}