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

export function Home() {
  const [showAllProfessors, setShowAllProfessors] = React.useState(false);

  // 표시할 교수님 목록 결정 (teamData_Data_Science 사용으로 가정)
  // 만약 다른 교수 데이터(예: teamData_ICT)를 사용해야 한다면 해당 변수로 변경해주세요.
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
                <Typography
                    variant="h1"
                    color="white"
                    className="mb-6 font-black"
                >
                  지능형SW융합대학
                </Typography>
                <Typography variant="lead" color="white" className="opacity-80">
                  COLLEGE OF INTELLIGENT SOFTWARE CONVERGENCE <br/>
                  제4차 산업혁명, 수원대학교 지능형SW융합대학이 주도합니다.
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: SW College Intro & Features with Gradient Background */}
        <section className="-mt-26 px-4 pt-20 pb-16 md:pb-24">
          <div className="container mx-auto max-w-screen-xl">
            <SWCollegeIntro /> {/* 지능형SW융합대학 소개를 위로 이동 */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 mt-12"> {/* SWCollegeIntro와 카드 간의 상단 마진 추가 */}
              {featuresDataCollege.map(({ color, title, icon, description, links }, index) => (
                  <motion.div
                      key={title}
                      variants={fadeIn}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      custom={index}
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
        </section>

        {/* Section 2: Dean Intro */}
        <DeanIntro /> {/* 학장 소개 */}

        {/* Section 3: Campus Guide */}
        <section className="bg-white px-4 pt-10 md:pt-16 pb-20">
          <div className="container mx-auto max-w-screen-xl">
            <CampusGuide /> {/* 캠퍼스 안내 */}
          </div>
        </section>
        <div className="bg-white">
          <Footer />
        </div>
        <ChatbotUI />
      </>
  );
}

export default Home;