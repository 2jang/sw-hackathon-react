import {
    UserIcon,
    MapPinIcon,
    PhoneIcon,
    BuildingOffice2Icon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import deanImg from "/public/img/Telecommunication_Engineering/GIMDAEYEOP.jpeg"; // 실제 이미지 경로에 맞게 수정

const DeanIntro = () => {
    return (
        <section className="bg-white px-8 py-16">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
                {/* 제목 */}
                <h2 className="text-xl font-semibold text-[#1e3a8a] whitespace-nowrap">
                    <span className="inline-block w-4 h-4 rounded-full bg-[#1e3a8a] mr-2 align-middle"></span>
                    학장소개
                </h2>

                {/* 카드 */}
                <motion.div
                    className="flex flex-col md:flex-row items-center md:items-start border border-gray-300 rounded-md p-6 shadow-md w-full"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* 사진 */}
                    <img
                        src={deanImg}
                        alt="김대엽 교수"
                        className="w-40 h-52 object-cover rounded-md border mb-6 md:mb-0 md:mr-8"
                    />

                    {/* 정보 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-800">
                        <div className="flex items-center">
                            <UserIcon className="h-5 w-5 text-yellow-500 mr-2" />
                            <span>성명 : 김대엽</span>
                        </div>
                        <div className="flex items-center">
                            <BuildingOffice2Icon className="h-5 w-5 text-yellow-500 mr-2" />
                            <span>소속 : 정보통신학부</span>
                        </div>
                        <div className="flex items-center">
                            <MapPinIcon className="h-5 w-5 text-yellow-500 mr-2" />
                            <span>위치 : 지능형SW융합대학 525호</span>
                        </div>
                        <div className="flex items-center">
                            <PhoneIcon className="h-5 w-5 text-yellow-500 mr-2" />
                            <span>대표전화 : 031-229-8352</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default DeanIntro;
