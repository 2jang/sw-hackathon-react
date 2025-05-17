import React from "react";
import {
    Button,
    Card,
    Typography
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid/index.js";
import { PageTitle, Footer } from "@/widgets/layout/index.js";
import { TeamCard } from "@/widgets/cards/index.js";
import { curriculumData_ICT, teamData_ICT } from "@/data/index.js";
import ICTIntro from "@/widgets/layout/ICTIntro.jsx";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI.jsx";

const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const heroTitleAnim = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

const heroSubtitleAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut", delay: 0.3 },
    },
};

const sectionContainerFadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

const sectionContainerScaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

export function ICT() {
    const [showAllProfessors, setShowAllProfessors] = React.useState(false);

    const professorsToDisplay = showAllProfessors
        ? teamData_ICT
        : teamData_ICT.slice(0, 8);

    return(
        <>
            {/* Hero Section */}
            <div className="relative flex h-[50vh] content-center items-center justify-center">
                <div className="absolute top-0 h-full w-full bg-[url('https://www.suwon.ac.kr/usr/images/suwon/college_top_technology.gif')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-grey/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={heroTitleAnim}
                            >
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-6 font-black"
                                >
                                    정보통신학과
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={heroSubtitleAnim}
                            >
                                <Typography variant="lead" color="white" className="opacity-80">
                                    미래를 연결하는 기술, 세상을 바꾸는 혁신
                                </Typography>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 1: Department Intro */}
            <motion.section
                className="-mt-26 px-4 pt-20 pb-16 md:pb-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionContainerFadeIn}
            >
                <div className="container mx-auto max-w-screen-xl">
                    <ICTIntro
                        departmentName="정보통신학과"
                        introText="정보통신학과는 4차 산업혁명 시대를 이끌어갈 핵심 기술인 정보통신기술(ICT) 분야의 창의적이고 실무 능력을 갖춘 인재 양성을 목표로 합니다. 최신 통신 기술, 네트워크, 모바일 컴퓨팅, 사물인터넷(IoT), 인공지능 기반 시스템 등 다양한 분야의 심도 있는 교육과정을 제공하여 학생들이 미래 사회의 주역으로 성장할 수 있도록 지원합니다."
                        // stats prop 제거
                        mainImageUrl="/img/Telecommunication_Engineering_department.jpg" // 학과 소개 이미지 경로 (예시)
                    />
                    {/* FeatureCardCollege 섹션 제거 */}
                </div>
            </motion.section>

            {/* 과목 소개 섹션 (기존 커리큘럼 섹션에서 변경 및 이동) */}
            <motion.section
                className="relative bg-white py-24 px-4" // 배경색 변경 가능 (예: bg-gray-50)
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionContainerScaleIn} // 또는 sectionContainerFadeIn
            >
                <div className="container mx-auto">
                    <PageTitle section="과목 소개" heading="주요 전공 교과목">
                        정보통신학과의 핵심 커리큘럼입니다. 이론 수업과 실습으로 정보통신전문가를 양성합니다.
                    </PageTitle>
                    <div className="mx-auto mt-20 mb-24 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                        {curriculumData_ICT.map(({ title, icon, description }, index) => ( // curriculumData를 ICT 학과에 맞는 과목 데이터로 교체 필요
                            <motion.div
                                key={title}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                custom={index}
                            >
                                <Card
                                    color="transparent"
                                    shadow={false}
                                    className="text-center text-blue-gray-900 rounded-xl overflow-hidden border border-gray-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out pt-8 pb-8" // 스타일 약간 수정
                                >
                                    <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                                        {React.createElement(icon, {
                                            className: "w-5 h-5 text-white",
                                        })}
                                    </div>
                                    <Typography variant="h5" color="blue-gray" className="mb-2 px-4">
                                        {title}
                                    </Typography>
                                    <Typography className="font-normal text-blue-gray-500 px-6"> {/* pb-8 제거 */}
                                        {description}
                                    </Typography>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* 교수 소개 섹션 */}
            <motion.section
                className="px-4 pt-20 pb-20 bg-[#f7f8fa]"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionContainerFadeIn}
            >
                <div className="container mx-auto max-w-screen-xl">
                    <PageTitle section="교수 소개" heading="정보통신학과 교수진">
                        “미래 IT 기술을 선도하는 열정적인 교육자들과 함께 하세요.”
                    </PageTitle>
                    <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
                        {professorsToDisplay.map(({ img, name, position, socials, detailUrl }, index) => (
                            <motion.div
                                key={name}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                custom={index}
                            >
                                <TeamCard
                                    img={img}
                                    name={name}
                                    position={position}
                                    socials={socials}
                                    detailUrl={detailUrl}
                                />
                            </motion.div>
                        ))}
                    </div>
                    {!showAllProfessors && teamData_ICT.length > 8 && (
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
            </motion.section>

            <div className="bg-white">
                <Footer />
            </div>
            <ChatbotUI />
        </>
    )
}

export default ICT;