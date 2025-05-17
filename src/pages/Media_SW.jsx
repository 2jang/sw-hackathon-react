import {
    Button,
    Card,
    Typography
} from "@material-tailwind/react";
import {curriculumData_ICT,teamData_Media_SW} from "@/data/index.js";
import { TeamCard } from "@/widgets/cards/index.js";
import React from "react";
import {ChevronDownIcon } from "@heroicons/react/24/solid/index.js";
import {Footer, PageTitle} from "@/widgets/layout/index.js";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI.jsx";

export function Media_SW() {
    const [showAllProfessors, setShowAllProfessors] = React.useState(false);

    // 표시할 교수님 목록 결정 (teamData_Data_Science 사용으로 가정)
    // 만약 다른 교수 데이터(예: teamData_ICT)를 사용해야 한다면 해당 변수로 변경해주세요.
    const professorsToDisplay = showAllProfessors
        ? teamData_Media_SW
        : teamData_Media_SW.slice(0, 8);
    return(
        <>
            <div className="relative flex h-[50vh] content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('public/img/background-8.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-grey/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                미디어SW
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                미디어SW
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <section className="px-4 pt-20 pb-48 bg-[#f7f8fa]">
                <div className="container mx-auto max-w-screen-xl">
                    <PageTitle section="교수 소개" heading="컴퓨터SW학과">
                        “미디어SW의 길, 여러분의 가능성을 열어드립니다.”
                    </PageTitle>
                    <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
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
                    {!showAllProfessors && teamData_Media_SW.length > 8 && (
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
            <section className="relative bg-white py-24 px-4">
                <div className="container mx-auto">
                    <PageTitle section="Co-Working" heading="Build something">
                        Put the potentially record low maximum sea ice extent tihs year down
                        to low ice. According to the National Oceanic and Atmospheric
                        Administration, Ted, Scambos.
                    </PageTitle>
                    <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                        {curriculumData_ICT.map(({ title, icon, description }) => (
                            <Card
                                key={title}
                                color="transparent"
                                shadow={false}
                                className="text-center text-blue-gray-900"
                            >
                                <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                                    {React.createElement(icon, {
                                        className: "w-5 h-5 text-white",
                                    })}
                                </div>
                                <Typography variant="h5" color="blue-gray" className="mb-2">
                                    {title}
                                </Typography>
                                <Typography className="font-normal text-blue-gray-500">
                                    {description}
                                </Typography>
                            </Card>
                        ))}
                    </div>
                    <PageTitle section="Contact Us" heading="Want to work with us?">
                        Complete this form and we will get back to you in 24 hours.
                    </PageTitle>
                </div>
            </section>
            <div className="bg-white">
                <Footer />
            </div>
            <ChatbotUI />
        </>
    )
}