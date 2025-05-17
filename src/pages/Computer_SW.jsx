import {
    Button,
    Card,
    Typography
} from "@material-tailwind/react";
import {curriculumData_ICT, teamData_Computer_SW} from "@/data/index.js";
import {TeamCard} from "@/widgets/cards/index.js";
import React from "react";
import {ChevronDownIcon,} from "@heroicons/react/24/solid/index.js";
import {Footer, PageTitle} from "@/widgets/layout/index.js";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI.jsx";
import ComputerSWIntro from "@/widgets/layout/ComputerSWIntro.jsx";
import CurriculumComputerSW from "@/widgets/layout/curriculumComputerSW.jsx";

export function Computer_SW() {
    const [showAllProfessors, setShowAllProfessors] = React.useState(false);

    // 표시할 교수님 목록 결정 (teamData_Data_Science 사용으로 가정)
    // 만약 다른 교수 데이터(예: teamData_ICT)를 사용해야 한다면 해당 변수로 변경해주세요.
    const professorsToDisplay = showAllProfessors
        ? teamData_Computer_SW
        : teamData_Computer_SW.slice(0, 8);
    return(
        <>
            <div className="relative flex h-[50vh] content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('/img/background-7.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-grey/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                컴퓨터SW
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                "SW로 세상을 연결하다, 수원대 컴퓨터소프트웨어학과"
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <ComputerSWIntro/>
            <CurriculumComputerSW/>
            <section className="px-4 pt-20 pb-48 bg-[#f7f8fa]">
                <div className="container mx-auto max-w-screen-xl">
                    <PageTitle section="교수 소개" heading="컴퓨터SW학과">
                        “컴퓨터SW의 길, 여러분의 가능성을 열어드립니다.”
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
                    {!showAllProfessors && teamData_Computer_SW.length > 8 && (
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