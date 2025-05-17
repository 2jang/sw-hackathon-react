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

const ComputerSWIntro = () => {
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
                    <h2 className="text-[#1e293b] text-xl font-semibold mb-2 [@media(max-width:430px)]:text-sm">
                        Leader in IT Education
                    </h2>
                    <h1 className="text-3xl text-[#1e293b] md:text-4xl font-extrabold mb-6 [@media(max-width:430px)]:text-2sm">
                        컴퓨터SW학과 소개
                    </h1>
                </motion.div>

                {/* 소개 본문 */}
                <motion.p
                    className="text-[#1e293b] text-lg leading-relaxed text-center max-w-5xl mx-auto [@media(max-width:430px)]:text-sm"
                    variants={fadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    custom={2}
                >
                    현대는 정보화 사회로, 컴퓨터 및 통신기술이 중심이 되는 시대입니다. 이에 따라 컴퓨터SW 전공은 컴퓨터와 정보통신의 기본 이론과 실습을 바탕으로 전문 지식을 갖춘 고급 인력을 양성하는 데 중점을 두며, <br/>
                    이를 통해 컴퓨터 과학자, 기술자, 관리자 등 유능한 인재를 육성하는 것을 목표로 합니다.
                </motion.p>
            </div>
        </section>
    );
};

export default ComputerSWIntro;
