import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import {curriculumData_ICT ,curriculumDataComputerScienceAndEngineering} from "@/data/index.js";
import React from "react";
import PageTitle from "@/widgets/layout/page-title.jsx";

const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const CurriculumComputerScienceAndEngineering = () => {
    return (
        <section className="relative bg-white py-24 px-4">
            <div className="container mx-auto">
                <PageTitle section="과목 소개" heading="전공 교육 분야">
                    컴퓨터 학부는 소프트웨어 개발, 인공지능, 네트워크 등 정보기술 전반에 대한 이론과 실습을 통해 실무 능력을 갖춘 인재를 양성합니다.<br/>
                    4차 산업혁명 시대를 선도할 창의적 문제 해결력과 전문성을 배양하는 것을 목표로 합니다.
                </PageTitle>
                <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                    {curriculumDataComputerScienceAndEngineering.map(({ title, icon, description }) => (
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
    );
};

export default CurriculumComputerScienceAndEngineering;