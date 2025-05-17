import React from "react";
import {
    Button,
    Card,
    Typography
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/solid/index.js";
import { curriculumData_CIS, teamData_CIS } from "@/data/index.js";
import { TeamCard } from "@/widgets/cards/index.js";
import { Footer, PageTitle } from "@/widgets/layout/index.js";
import CISIntro from "@/widgets/layout/CISIntro.jsx";
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


export function CIS() {
    const [showAllProfessors, setShowAllProfessors] = React.useState(false);

    const professorsToDisplay = showAllProfessors
        ? teamData_CIS
        : teamData_CIS.slice(0, 8);
    return(
        <>
            {/* Hero Section */}
            <div className="relative flex h-[50vh] content-center items-center justify-center">
                <div className="absolute top-0 h-full w-full bg-[url('/img/image_cis.png')] bg-cover bg-center" />
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
                                    정보보호학과
                                </Typography>
                            </motion.div>
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={heroSubtitleAnim}
                            >
                                <Typography variant="lead" color="white" className="opacity-80">
                                    "안전한 디지털 세상을 만드는 정보보호 전문가"
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
                    <CISIntro
                        departmentName="정보보호학과"
                        introText="정보보호학과는 사이버 보안 위협이 증가하는 현대 사회에서 핵심적인 역할을 수행하는 정보보호 전문가 양성을 목표로 합니다. 암호학, 네트워크 보안, 시스템 보안, 디지털 포렌식, 보안 컨설팅 등 전문 분야에 대한 깊이 있는 지식과 실무 능력을 배양하여, 안전하고 신뢰할 수 있는 디지털 환경 구축에 기여하는 인재를 육성합니다."
                        mainImageUrl="/img/Cybersecurity_department.jpg" // 정보보호학과 관련 이미지 경로 (예시)
                    />
                </div>
            </motion.section>

            {/* 과목 소개 섹션 */}
            <motion.section
                className="relative bg-white py-24 px-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionContainerScaleIn}
            >
                <div className="container mx-auto">
                    <PageTitle section="과목 소개" heading="주요 전공 교과목">
                        정보보호학과의 핵심 커리큘럼입니다. 사이버 보안의 다양한 영역을 학습하여 실무 능력을 갖춘 전문가로 성장합니다.
                    </PageTitle>
                    <div className="mx-auto mt-20 mb-24 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                        {curriculumData_CIS.map(({ title, icon, description }, index) => ( // curriculumData를 CIS 학과에 맞는 과목 데이터로 교체 필요
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
                                    className="text-center text-blue-gray-900 rounded-xl overflow-hidden border border-gray-200/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out pt-8 pb-8"
                                >
                                    <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-blue-gray-900 shadow-lg shadow-gray-500/20">
                                        {React.createElement(icon, {
                                            className: "w-5 h-5 text-white",
                                        })}
                                    </div>
                                    <Typography variant="h5" color="blue-gray" className="mb-2 px-4">
                                        {title}
                                    </Typography>
                                    <Typography className="font-normal text-blue-gray-500 px-6">
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
                className="px-4 pt-20 pb-20 bg-[#f7f8fa]" // mb-48에서 pb-20으로 수정하여 CampusGuide와의 간격 조정
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionContainerFadeIn}
            >
                <div className="container mx-auto max-w-screen-xl">
                    <PageTitle section="교수 소개" heading="정보보호학과 교수진">
                        “정보보호 분야의 발전을 이끄는 최고의 교수진과 함께하세요.”
                    </PageTitle>
                    <div className="mt-24 grid grid-cols-1 [@media(max-width:430px)]:grid-cols-2 [@media(max-width:430px)]:gap-8 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
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
                    {!showAllProfessors && teamData_CIS.length > 8 && (
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

export default CIS;