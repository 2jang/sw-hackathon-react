import {
    AcademicCapIcon,
    MapPinIcon,
    PhoneIcon,
    EnvelopeIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import deanImg from "/public/img/Telecommunication_Engineering/GIMDAEYEOP.jpeg"; // 실제 이미지 경로 확인

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
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: "easeOut" },
    };

    const contactInfoItems = [
        { icon: AcademicCapIcon, label: "소속", value: deanInfo.department },
        { icon: MapPinIcon, label: "연구실", value: deanInfo.office },
        { icon: PhoneIcon, label: "대표전화", value: deanInfo.phone },
        // { icon: EnvelopeIcon, label: "이메일", value: deanInfo.email }, // 필요시 주석 해제
    ];

    return (
        <motion.section
            className="py-16 md:py-24 bg-white"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInAnimation}
        >
            <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        학장 소개
                    </h2>
                    <p className="text-lg text-gray-600">
                        지능형SW융합대학을 이끌어가는 학장님을 소개합니다.
                    </p>
                </div>

                <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden md:flex">
                    {/* 왼쪽: 학장 사진 - 최대 너비 조정 */}
                    <div className="md:max-w-40 md:flex-shrink-0 h-48 md:h-auto bg-gray-100"> {/* md:max-w-48 -> md:max-w-40 */}
                        <img
                            src={deanImg}
                            alt={`${deanInfo.name} 학장`}
                            className="w-full h-full object-contain object-center"
                        />
                    </div>

                    <div className="md:flex-1 p-4 md:p-6 flex flex-col justify-start">
                        <div className="mb-4">
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-0.5">
                                {deanInfo.name}
                            </h3>
                            <p className="text-sm md:text-base text-gray-700 font-medium">
                                {deanInfo.position} / {deanInfo.department}
                            </p>
                        </div>

                        <div className="flex flex-row flex-wrap justify-start gap-x-4 gap-y-2 mb-4">
                            {contactInfoItems.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <item.icon className="h-4 w-4 text-gray-700 mr-1.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs md:text-sm text-gray-700">{item.label}: {item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-3 md:pt-4 border-t border-gray-200">
                            <p className="text-xs text-gray-600 leading-snug">
                                지능형SW융합대학의 발전을 위해 최선을 다하고 계시는 학장님께 궁금한 점이나 건의사항이 있으시면 언제든지 연락 주시기 바랍니다.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default DeanIntro;