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
import { MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCardCollege, TeamCard } from "@/widgets/cards";
import {featuresDataCollege, contactData, teamData_ICT} from "@/data";
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
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
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
      <section className="-mt-52 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto max-w-screen-xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-2">
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
          <SWCollegeIntro />
          <DeanIntro />
          <CampusGuide />
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
            {contactData.map(({ title, icon, description }) => (
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
        </div>
      </section>
      <section className="px-4 pt-20 pb-48 bg-[#f7f8fa]">
        {/* 이 div에 max-w-screen-xl 추가 */}
        <div className="container mx-auto max-w-screen-xl">
          <PageTitle section="교수 소개" heading="정보통신학과">
            “정보통신의 길, 여러분의 가능성을 열어드립니다.”
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData_ICT.map(({ img, name, position, socials, detailUrl }) => (
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
        </div>
      </section>
      {/* Co-Working 섹션 배경색 변경 */}
      <section className="relative bg-white py-24 px-4">
        <div className="container mx-auto">
          <PageTitle section="교과 과정 소개" heading="핵심 전공 과정">
            “미래 기술의 중심, 당신의 잠재력에 날개를 달아드립니다."
          </PageTitle>
          <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
            {contactData.map(({ title, icon, description }) => (
                <Card
                    key={title}
                    color="transparent"
                    shadow={false}
                    className="text-center text-blue-gray-900
                           transition-all duration-300 ease-in-out
                           hover:ring-1 hover:ring-green-500 hover:ring-opacity-50
                           hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105"
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
          <form className="mx-auto w-full mt-12 lg:w-5/12">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Full Name" />
              <Input variant="outlined" size="lg" label="Email Address" />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
                label={
                  <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center font-normal"
                  >
                    I agree the
                    <a
                        href="#"
                        className="font-medium transition-colors hover:text-gray-900"
                    >
                      &nbsp;Terms and Conditions
                    </a>
                  </Typography>
                }
                containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form>
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
