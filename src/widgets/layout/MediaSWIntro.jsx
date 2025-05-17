import {
    useInView,
    useMotionValue,
    useTransform,
    animate,
    motion,
} from "framer-motion";
import { useEffect, useRef } from "react";
import {
    UserGroupIcon,
    AcademicCapIcon,
} from "@heroicons/react/24/outline";
import {BriefcaseIcon} from "@heroicons/react/24/solid";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
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

const CountUp = ({ target, suffix }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => `${Math.floor(latest)}${suffix || ""}`);
    const ref = useRef();

    useEffect(() => {
        const controls = animate(count, target, {
            duration: 1.8,
            ease: "easeOut",
        });
        return controls.stop;
    }, [target]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

const MediaSWIntro = () => {
    return (
        <section className="bg-[#ffffff] text-black px-8 py-20">
            <div className="max-w-7xl mx-auto grid gap-16">
                {/* 강조 문구 */}
                <motion.div
                    className="text-center"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <h2 className="text-[#1e293b] text-xl font-semibold mb-2">
                        Leader in IT Education
                    </h2>
                    <h1 className="text-3xl text-[#1e293b] md:text-4xl font-extrabold mb-6">
                        미디어SW학과 소개
                    </h1>
                </motion.div>

                {/* 소개 본문 */}
                <motion.p
                    className="text-[#1e293b] text-lg leading-relaxed text-center max-w-5xl mx-auto"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={2}
                >
                    미디어SW는 멀티미디어 시대의 웹 환경에서 정보의 생성, 저장, 검색, 관리 유지, 생산과 분배의 중심적인 역할을 한다. 본 전공에서는 컴퓨터 기본 지식을 바탕으로 하고 멀티미디어 관련 기술을 습득하며, <br/>
                    인터넷을 기반으로 정보 전송 및 교환, 컴퓨터 그래픽스, 컴퓨터 애니메이션, 컴퓨터 게임, 가상현실, 증강현실, 컨텐츠 디자인과 개발, 웹 프로그래밍 등에 관해 배운다. 다양한 분야에서 소프트웨어 개발 및 응용 기술에 관한 이론과 실제를 겸비한 창의적인 전문 인력 양성을 교육의 목표로 삼는다.
                </motion.p>
            </div>
        </section>
    );
};

export default MediaSWIntro;
