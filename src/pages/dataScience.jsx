import {
    Typography
} from "@material-tailwind/react";
import { featuresDataDepartment3 } from "@/data/index.js";
import { FeatureCardCollege } from "@/widgets/cards/index.js";
import React from "react";
import {Footer } from "@/widgets/layout/index.js";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI.jsx";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import DataScienceIntro from "@/widgets/layout/dataScienceIntro.jsx";
import DeanIntro_DataScience from "@/widgets/layout/DeanIntro_DataScience.jsx";
import CurriculumDataScience from "@/widgets/layout/curriculumDataScience.jsx";

// 기존 fadeIn (FeatureCardCollege용)
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

// Hero 섹션 제목용 애니메이션 (아래로 슬라이드하며 나타남)
const heroTitleAnim = {
    hidden: { opacity: 0, y: -30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

// Hero 섹션 부제목용 애니메이션 (위로 슬라이드하며 나타남)
const heroSubtitleAnim = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: "easeOut", delay: 0.3 }, // 제목 후 약간 늦게
    },
};

// 섹션 전체를 위한 간단한 페이드인
const sectionContainerFadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
    },
};

// 섹션 전체를 위한 스케일인 (확대되며 나타남)
const sectionContainerScaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.7, ease: "easeOut" },
    },
};

export function DataScience() {
    return(
        <>
            <div className="relative flex h-[50vh] content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('/img/background-11.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/50 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-10/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black [@media(max-width:430px)]:text-[25px] [@media(max-width:430px)]:mt-[150px]"
                            >
                                데이터과학부
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80 [@media(max-width:430px)]:text-[15px]">
                                데이터과학부는 제4차 산업혁명의 필요한 전문인 양성을 적합한 교육과정을 제공한다. <br/>
                                이에 따라 데이터 분석에서부터 인공지능 알고리즘 개발 및 실행에 필요한 전문 지식을 익히도록 한다.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section 1: SW College Intro & Features with Gradient Background */}
            {/* 이 섹션 전체를 감싸는 motion.div 추가 */}
            <motion.section
                className="-mt-26 px-4 pt-20 pb-16 md:pb-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }} // amount는 섹션이 얼마나 보여야 애니메이션이 시작될지 결정
                variants={sectionContainerFadeIn} // 간단한 페이드인 효과
            >
                <div className="container mx-auto max-w-screen-xl">
                    <DataScienceIntro />
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 lg:gap-2 mt-12">
                        {featuresDataDepartment3.map(({ color, title, icon, path, description, links }, index) => (
                            <motion.div
                                key={title}
                                variants={fadeIn} // 기존 fadeInUp 효과
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                custom={index} // staggered delay
                            >
                                <Link to={path}>
                                    <FeatureCardCollege
                                        color={color}
                                        title={title}
                                        icon={React.createElement(icon, {
                                            className: "w-5 h-5 text-white",
                                        })}
                                        description={description}
                                        links={links}
                                    />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>
            <DeanIntro_DataScience />
            <CurriculumDataScience />
            <div className="bg-white">
                <Footer />
            </div>
            <ChatbotUI />
        </>
    )
}