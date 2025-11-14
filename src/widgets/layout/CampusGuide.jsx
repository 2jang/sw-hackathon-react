import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import {Link} from "react-router-dom";

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

const CampusGuide = () => {
    return (
        <div className="mt-32 flex flex-wrap items-center">
            {/* 왼쪽 텍스트 영역 */}
            <motion.div
                className="mx-auto -mt-8 w-full px-4 md:w-5/12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                custom={0}
            >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg [@media(max-width:430px)]:w-[40px] [@media(max-width:430px)]:h-[40px]">
                    <MapPinIcon className="h-8 w-8 text-white" />
                </div>
                <Typography variant="h3" className="mb-3 font-bold [@media(max-width:430px)]:text-[20px]" color="blue-gray">
                    캠퍼스 내 최적의 동선,
                    <br /> 시간표를 효율적으로 계획하세요!
                </Typography>
                <Typography className="mb-8 font-normal text-blue-gray-500 [@media(max-width:430px)]:text-[16px]">
                    이동은 짧게, 수업은 알차게. 캠퍼스 길찾기로 시간표를 전략적으로 구성하세요!
                    <br />
                    <br />
                </Typography>
                <Link to="/pathfinder">
                    <Button size="lg"
                            variant="text"
                            color="[#1E293B]"
                            className="hover:bg-gray-100 transition-all duration-300 ring-1 ring-gray-200 shadow-gray-500/10 rounded-lg"
                    >시작하기</Button>
                </Link>
            </motion.div>

            {/* 오른쪽 카드 영역 */}
            <motion.div
                className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0 [@media(max-width:430px)]:mt-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
                custom={0.2}
            >
                {/* Link 컴포넌트로 카드를 감싸서 라우팅 기능 추가 */}
                <Link to="/pathfinder" className="w-full max-w-sm">
                    <Card className="shadow-lg border shadow-gray-500/10 rounded-lg w-full
                                 ring-1 ring-gray-200
                                  hover:ring-green-500 hover:ring-opacity-75
                                 transition-all duration-300 ease-in-out
                                 hover:shadow-2xl hover:shadow-green-500/40 hover:scale-105">
                        <CardHeader floated={false} className="relative h-56">
                            <img
                                alt="Card Image"
                                src="/img/campusmap_img_2024.jpg"
                                loading="lazy"
                                decoding="async"
                                className="h-full w-full object-cover"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="small" color="blue-gray" className="font-normal">
                                Campus Navigation
                            </Typography>
                            <Typography
                                variant="h5"
                                color="blue-gray"
                                className="mb-3 mt-2 font-bold"
                            >
                                수원대학교 길찾기 서비스
                            </Typography>
                            <Typography className="font-normal text-blue-gray-500">
                                캠퍼스 내 건물 이동시간 알아보러가기
                            </Typography>
                        </CardBody>
                    </Card>
                </Link>
            </motion.div>
        </div>
    );
};

export default CampusGuide;