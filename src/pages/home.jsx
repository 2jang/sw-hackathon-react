import React from "react";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import { MapPinIcon, UsersIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCardCollege, TeamCard } from "@/widgets/cards";
import {featuresDataCollege, curriculumData, teamData_ICT, teamData_CIS, teamData_Media_SW, teamData_Data_Science, teamData_Computer_SW} from "@/data";
import SWCollegeIntro from "@/widgets/layout/SWCollegeIntro.jsx";
import DeanIntro from "@/widgets/layout/DeanIntro.jsx";
import CampusGuide from "@/widgets/layout/CampusGuide.jsx";


// Home.js 상단 또는 animations.js 등으로 분리 가능

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

export function Home() {
  const [showAllProfessors, setShowAllProfessors] = React.useState(false);

  const professorsToDisplay = showAllProfessors
      ? teamData_Data_Science
      : teamData_Data_Science.slice(0, 8);

  return (
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
                    animate="visible" // Hero는 바로 보이도록 animate 사용
                    variants={heroTitleAnim}
                >
                  <Typography
                      variant="h1"
                      color="white"
                      className="mb-6 font-black"
                  >
                    지능형SW융합대학
                  </Typography>
                </motion.div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={heroSubtitleAnim}
                >
                  <Typography variant="lead" color="white" className="opacity-80">
                    COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE <br/>
                    제4차 산업혁명, 수원대학교 지능형SW융합대학이 주도합니다.
                  </Typography>
                </motion.div>
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
            <SWCollegeIntro /> {/* SWCollegeIntro는 자체 애니메이션을 가짐 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 mt-12">
              {featuresDataCollege.map(({ color, title, icon, description, links }, index) => (
                  <motion.div
                      key={title}
                      variants={fadeIn} // 기존 fadeInUp 효과
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      custom={index} // staggered delay
                  >
                    <FeatureCardCollege
                        color={color}
                        title={title}
                        icon={React.createElement(icon, {
                          className: "w-5 h-5 text-white",
                        })}
                        description={description}
                        links={links}
                    />
                  </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section 2: Dean Intro */}
        {/* DeanIntro는 자체적으로 다양한 내부 애니메이션을 가짐. 추가 wrapping 불필요. */}
        <DeanIntro />

        {/* Section 3: Campus Guide */}
        {/* 이 섹션 전체를 감싸는 motion.div 추가 */}
        <motion.section
            className="bg-white px-4 pt-10 md:pt-16 pb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionContainerScaleIn} // 스케일인 효과
        >
          <div className="container mx-auto max-w-screen-xl">
            <CampusGuide /> {/* CampusGuide는 자체 애니메이션을 가짐 */}
          </div>
        </motion.section>

        <div className="bg-white">
          <Footer />
        </div>
        <ChatbotUI />
      </>
  );
}

export default Home;