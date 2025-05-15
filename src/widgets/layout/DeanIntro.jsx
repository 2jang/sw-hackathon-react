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
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import deanImg from "/public/img/Telecommunication_Engineering/GIMDAEYEOP.jpeg";

const DeanIntro = () => {
    const deanInfo = {
        name: "김대엽",
        department: "정보통신학부",
        position: "학장",
        office: "지능형SW융합대학 525호",
        phone: "031-229-8352",
        email: "dean@example.com",
    };

    const fadeInAnimation = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 }
    };

    return (
        <section className="py-14 px-4">
            <div className="container mx-auto max-w-screen-xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        학장 소개
                    </h2>
                    <p className="text-gray-600">
                        지능형SW융합대학을 이끌어가는 학장님을 소개합니다
                    </p>
                </div>

                <motion.div
                    className="max-w-2xl mx-auto"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeInAnimation}
                >
                    <Card className="shadow-md rounded-lg">
                        <CardBody className="p-6">
                            <div className="flex flex-row items-start">
                                {/* 학장 사진 - 더 작게 조정 */}
                                <div className="w-1/4 flex-shrink-0 mr-5">
                                    <img
                                        src={deanImg}
                                        alt={`${deanInfo.name} 학장`}
                                        className="w-full rounded-lg shadow-sm"
                                    />
                                </div>

                                {/* 학장 정보 */}
                                <div className="flex-grow">
                                    <div className="mb-3">
                                        <Typography variant="h4" className="text-xl font-bold text-gray-800">
                                            {deanInfo.name}
                                        </Typography>
                                        <Typography className="text-sm text-gray-700">
                                            {deanInfo.position} | {deanInfo.department}
                                        </Typography>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center">
                                            <MapPinIcon className="h-4 w-4 text-gray-600 mr-2" />
                                            <span className="text-sm text-gray-700">{deanInfo.office}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <PhoneIcon className="h-4 w-4 text-gray-600 mr-2" />
                                            <span className="text-sm text-gray-700">{deanInfo.phone}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <EnvelopeIcon className="h-4 w-4 text-gray-600 mr-2" />
                                            <span className="text-sm text-gray-700">{deanInfo.email}</span>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <p className="text-xs text-gray-600">
                                            지능형SW융합대학의 발전을 위해 힘쓰는 학장님께 궁금한 점이나 건의사항이 있으시면 언제든지 연락하시기 바랍니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default DeanIntro;