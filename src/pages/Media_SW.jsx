import {
    Button,
    Card, // Card import는 CurriculumMediaSW 내부에서 사용될 경우 필요합니다. 직접 사용하지 않으면 제거해도 됩니다.
    Typography
} from "@material-tailwind/react";
import { teamData_Media_SW } from "@/data/index.js"; // curriculumData_ICT 대신 Media SW 관련 데이터로 변경 필요 (예: curriculumData_Media_SW)
import { TeamCard } from "@/widgets/cards/index.js";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid/index.js";
import { Footer, PageTitle } from "@/widgets/layout/index.js";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI.jsx";
import CurriculumMediaSW from "@/widgets/layout/curriculumMediaSW.jsx";
import MediaSWIntro from "@/widgets/layout/MediaSWIntro.jsx";
import { motion } from "framer-motion"; // framer-motion import 추가

// Computer_SW.jsx 또는 ICT.jsx에서 애니메이션 정의 복사
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

export function Media_SW() {
    const [showAllProfessors, setShowAllProfessors] = React.useState(false);

    const professorsToDisplay = showAllProfessors
        ? teamData_Media_SW
        : teamData_Media_SW.slice(0, 8);

    return(
        <>
            {/* Hero Section */}
            <div className="relative flex h-[50vh] content-center items-center justify-center"> {/* pt-16 pb-32 제거 및 h-[50vh] 고정 */}
                <div className="absolute top-0 h-full w-full bg-[url('/img/background-8.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/50 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <motion.div // motion.div와 variants 적용
                                initial="hidden"
                                animate="visible"
                                variants={heroTitleAnim}
                            >
                                <Typography
                                    variant="h1"
                                    color="white"
                                    className="mb-6 font-black [@media(max-width:430px)]:text-[25px]"
                                >
                                    미디어SW
                                </Typography>
                            </motion.div>
                            <motion.div // motion.div와 variants 적용
                                initial="hidden"
                                animate="visible"
                                variants={heroSubtitleAnim}
                            >
                                <Typography variant="lead" color="white" className="opacity-80 [@media(max-width:430px)]:text-[15px]">
                                    "미디어를 이해하는 개발자, 세상을 바꾸는 창작자"
                                </Typography>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Department Intro Section - MediaSWIntro 컴포넌트에 애니메이션 적용 */}
            <motion.section // motion.section과 variants 적용
                className="-mt-26 px-4 pt-20 pb-16 md:pb-24" // 스타일 통일
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionContainerFadeIn}
            >
                <div className="container mx-auto max-w-screen-xl">
                    <MediaSWIntro />
                </div>
            </motion.section>

            {/* Curriculum Section - CurriculumMediaSW 컴포넌트에 애니메이션 적용 */}
            <motion.section // motion.section과 variants 적용
                className="relative bg-white py-24 px-4" // 스타일 통일
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionContainerScaleIn} // 또는 sectionContainerFadeIn
            >
                <div className="container mx-auto">
                    <PageTitle section="과목 소개" heading="주요 전공 교과목">
                        미디어SW학과의 핵심 커리큘럼입니다. 이론과 실습을 통해 미디어 콘텐츠 제작 및 개발 전문가를 양성합니다.
                    </PageTitle>
                    {/* CurriculumMediaSW 컴포넌트가 내부적으로 curriculumData_Media_SW를 map으로 돌면서 Card를 생성한다고 가정 */}
                    {/* 각 Card 아이템에 fadeIn 애니메이션을 적용하려면 CurriculumMediaSW 내부 수정이 필요합니다. */}
                    <CurriculumMediaSW />
                    {/* 만약 CurriculumMediaSW ICT.jsx의 curriculumData_ICT.map 부분과 유사한 구조로 되어있다면,
                        그 내부의 Card 컴포넌트를 motion.div로 감싸고 fadeIn 애니메이션을 적용해야 합니다.
                        예시:
                        <div className="mx-auto mt-20 mb-24 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                            {curriculumData_Media_SW.map(({ title, icon, description }, index) => ( // curriculumData_Media_SW 사용
                                <motion.div
                                    key={title}
                                    variants={fadeIn}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.2 }}
                                    custom={index}
                                >
                                   <Card ... /> // Card 컴포넌트 사용
                                </motion.div>
                            ))}
                        </div>
                    */}
                </div>
            </motion.section>

            {/* Professor Introduction Section */}
            <motion.section // motion.section과 variants 적용
                className="px-4 pt-20 pb-20 bg-[#f7f8fa]" // 스타일 통일 (pb-48에서 pb-20으로)
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={sectionContainerFadeIn}
            >
                <div className="container mx-auto max-w-screen-xl">
                    <PageTitle section="교수 소개" heading="미디어SW학과 교수진"> {/* 제목 수정 */}
                        “미디어SW의 길, 여러분의 가능성을 열어드립니다.”
                    </PageTitle>
                    <div className="mt-24 grid grid-cols-1 [@media(max-width:430px)]:grid-cols-2 [@media(max-width:430px)]:gap-8 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
                        {professorsToDisplay.map(({ img, name, position, socials, detailUrl }, index) => ( // index 추가
                            <motion.div // motion.div와 variants 적용
                                key={name}
                                variants={fadeIn}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.2 }}
                                custom={index} // custom prop 추가
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
            </motion.section>

            <div className="bg-white">
                <Footer />
            </div>
            <ChatbotUI />
        </>
    )
}

export default Media_SW; // export default 추가