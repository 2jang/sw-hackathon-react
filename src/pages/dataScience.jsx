import {
    Card,
    Typography
} from "@material-tailwind/react";
import {curriculumData, featuresDataDepartment3} from "@/data/index.js";
import { FeatureCardDepartment3 } from "@/widgets/cards/index.js";
import React from "react";
import {Footer, PageTitle} from "@/widgets/layout/index.js";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI.jsx";
import {Link} from "react-router-dom";

export function DataScience() {
    return(
        <>
            <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('public/img/background-6.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-grey/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-10/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                데이터과학부
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                데이터과학부는 4차 산업혁명에 필요한 데이터 분석·AI 역량을 갖춘 창의적 데이터 과학자 양성을 목표로 한다.<br/>
                                데이터 처리, 머신러닝·딥러닝, 통계, 프로그래밍 등을 기반으로 실무 중심의 교육과 캡스톤 프로젝트를 통해 현장 맞춤형 전문가를 배출한다.
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <section className="-mt-52 bg-white px-4 pb-20 pt-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-2 sm:gap-6 md:gap-16 lg:gap-20 md:grid-cols-2 lg:grid-cols-2">
                        {featuresDataDepartment3.map(({ color, title, icon, description, path }) => (
                            <Link key={title} to={path}>
                                <FeatureCardDepartment3
                                    key={title}
                                    color={color}
                                    title={title}
                                    icon={React.createElement(icon, {
                                        className: "w-5 h-5 text-white",
                                    })}
                                    description={description}
                                />
                            </Link>
                        ))}
                    </div>
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
                        {curriculumData.map(({ title, icon, description }) => (
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