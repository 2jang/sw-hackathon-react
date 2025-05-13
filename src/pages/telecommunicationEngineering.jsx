import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    IconButton,
    Input,
    Textarea,
    Typography
} from "@material-tailwind/react";
import {contactData, featuresDataDepartment1, teamData} from "@/data/index.js";
import {FeatureCardDepartment1, TeamCard} from "@/widgets/cards/index.js";
import React from "react";
import {MapPinIcon} from "@heroicons/react/24/solid/index.js";
import {Footer, PageTitle} from "@/widgets/layout/index.js";
import { ChatbotUI } from "@/widgets/layout/ChatbotUI";

export function TelecommunicationEngineering() {
    return(
        <>
            <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
                <div className="absolute top-0 h-full w-full bg-[url('public/img/background-4.png')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-grey/60 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-6 font-black"
                            >
                                정보통신학부
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
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-2 sm:gap-6 md:gap-16 lg:gap-20 md:grid-cols-2 lg:grid-cols-2">
                        {featuresDataDepartment1.map(({ color, title, icon, description }) => (
                            <FeatureCardDepartment1
                                key={title}
                                color={color}
                                title={title}
                                icon={React.createElement(icon, {
                                    className: "w-5 h-5 text-white",
                                })}
                                description={description}
                            />
                        ))}
                    </div>
                </div>
            </section>
            <section className="px-4 pt-20 pb-48">
                <div className="container mx-auto">
                    <PageTitle section="교수 소개" heading="정보통신학과">
                        “정보통신의 길, 여러분의 가능성을 열어드립니다.”
                    </PageTitle>
                    <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
                        {teamData.map(({ img, name, position, socials }) => (
                            <TeamCard
                                key={name}
                                img={img}
                                name={name}
                                position={position}
                                socials={
                                    <div className="flex items-center gap-2">
                                        {socials.map(({ color, name }) => (
                                            <IconButton key={name} color={color} variant="text">
                                                <i className={`fa-solid text-xl fa-${name}`} />
                                            </IconButton>
                                        ))}
                                    </div>
                                }
                            />
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