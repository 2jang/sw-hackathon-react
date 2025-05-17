import React from "react";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import {
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import deanImg from "/public/img/Data_Science/JEONGJINMYEONG.jpeg"; // 이미지 경로는 실제 프로젝트 구조에 맞게 확인해주세요.

const DeanIntro_DataScience = () => {
    const deanInfo = {
        name: "정진명",
        department: "데이터과학부",
        position: "학부장",
        office: "지능형SW융합대학 918호",
        phone: "031-229-8671",
        email: "jmjung@suwon.ac.kr", //실제 이메일 주소로 변경해주세요.
        website: "https://www.suwon.ac.kr/mainHp/prointro/detail.html?eno=1174107", // 학장 또는 학과 웹사이트 URL
    };

    const cardFadeIn = {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5, ease: "easeOut" }
    };

    const iconPopIn = {
        initial: { opacity: 0, scale: 0.5 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut",
                delay: 0.2
            }
        }
    };

    const headingFadeDown = {
        initial: { opacity: 0, y: -20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.4
            }
        }
    };

    const paragraphFadeUp = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                delay: 0.6
            }
        }
    };


    return (
        <section className="py-14 px-4 bg-gray-50">
            <div className="container mx-auto max-w-screen-xl"> {/* 최대 너비 1280px 유지 */}
                {/* gap-10 md:gap-16 에서 gap-12 md:gap-24 으로 변경하여 간격 대폭 확대 */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-1 md:gap-24">
                    {/* 왼쪽: 학장 정보 카드 */}
                    <motion.div
                        className="w-full md:w-1/2"
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        variants={cardFadeIn}
                    >
                        <a
                            href={deanInfo.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block cursor-pointer"
                        >
                            <Card className="shadow-xl rounded-lg overflow-hidden
                                ring-1 ring-gray-300 hover:ring-green-500 hover:ring-opacity-75
                                transition-all duration-300 ease-in-out
                                hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105">
                                <CardBody className="p-6 md:p-8">
                                    <div className="flex flex-col sm:flex-row items-start">
                                        <div className="w-32 sm:w-28 flex-shrink-0 mx-auto sm:mx-0 mb-4 sm:mb-0 sm:mr-6 md:mr-7">
                                            <img
                                                src={deanImg}
                                                alt={`${deanInfo.name} 학장`}
                                                className="w-full h-auto object-cover rounded-lg shadow-md aspect-square"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="mb-3 text-center sm:text-left">
                                                <Typography variant="h5" className="text-xl font-bold text-blue-gray-900">
                                                    {deanInfo.name}
                                                </Typography>
                                                <Typography className="text-sm text-blue-gray-700 font-medium">
                                                    {deanInfo.position} | {deanInfo.department}
                                                </Typography>
                                            </div>
                                            <div className="space-y-2 mb-4 text-xs sm:text-sm">
                                                <div className="flex items-center">
                                                    <MapPinIcon className="h-4 w-4 text-blue-gray-500 mr-2" />
                                                    <span className="text-gray-700">{deanInfo.office}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <PhoneIcon className="h-4 w-4 text-blue-gray-500 mr-2" />
                                                    <span className="text-gray-700">{deanInfo.phone}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <EnvelopeIcon className="h-4 w-4 text-blue-gray-500 mr-2" />
                                                    <span className="text-gray-700">{deanInfo.email}</span>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <Typography className="text-xs text-gray-600 leading-relaxed">
                                                    데이터과학부의 발전을 위해 힘쓰는 학부장님께 궁금한 점이나 건의사항이 있으시면 언제든지 연락주시기 바랍니다.
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </a>
                    </motion.div>

                    {/* 오른쪽: 텍스트 섹션 */}
                    <div className="w-full md:w-1/2 text-center md:text-left flex flex-col">
                        <motion.div
                            className="flex justify-center md:justify-start mb-4"
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={iconPopIn}
                        >
                            <div className="p-3 rounded-full bg-gray-800 inline-flex items-center justify-center shadow-md">
                                <AcademicCapIcon className="h-8 w-8 text-white" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={headingFadeDown}
                        >
                            <Typography
                                variant="h2"
                                className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
                            >
                                데이터과학부의 학부장님을 소개합니다!
                            </Typography>
                        </motion.div>

                        <motion.div
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                            variants={paragraphFadeUp}
                        >
                            <Typography color="gray" className="text-base md:text-lg text-gray-600 mb-6 md:mb-0">
                                대학의 발전과 학생들의 성장을 위해 헌신하시는 학부장님의 비전을 확인해보세요. <br/>
                                따뜻한 리더십과 혁신적인 교육 철학으로 데이터과학부를 이끌고 계십니다.
                            </Typography>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DeanIntro_DataScience;