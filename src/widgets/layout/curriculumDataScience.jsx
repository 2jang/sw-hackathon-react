import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { motion } from "framer-motion";
import {curriculumData, curriculumDataDataScience} from "@/data/index.js";
import React from "react";
import PageTitle from "@/widgets/layout/page-title.jsx";
import  { curriculumDataComputerSW } from "@/data/curriculum-data-computerSW.jsx";

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

const CurriculumDataScience = () => {
    return (
        <section className="relative bg-white py-24 px-4">
            <div className="container mx-auto">
                <PageTitle section="과목 소개" heading="전공 교육 분야">
                    데이터과학부는 제4차 산업혁명의 필요한 전문인 양성을 적합한 교육과정을 제공한다.<br/>
                    이에 따라 데이터 분석에서부터 인공지능 알고리즘 개발 및 실행에 필요한 전문 지식을 익히도록 한다.
                </PageTitle>
                <div className="mx-auto mt-20 mb-48 grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
                    {curriculumDataDataScience.map(({ title, icon, description }) => (
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

export default CurriculumDataScience;