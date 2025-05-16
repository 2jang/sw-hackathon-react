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

const stats = [
    {
        title: "교수진 수",
        value: 8,
        subtitle: "전임 교수 기준",
        icon: AcademicCapIcon,
    },
    {
        title: "취업률",
        value: 89,
        subtitle: "20--.-- 졸업생 및 재학생 기준",
        icon: BriefcaseIcon,
        suffix: "%"  // ✅ 백분율 표시 추가
    },
];

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

const ComputerScienceAndEngineeringIntro = () => {
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
                        컴퓨터학부 소개
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
                    수원대학교 컴퓨터학부는 컴퓨터 과학과 공학 분야의 창의적이고 실무 중심의 인재 양성을 목표로 합니다. <br/>
                    ICT 기반의 소프트웨어 개발 역량을 바탕으로 다양한 산업에 즉시 투입 가능한 전문가를 배출합니다.
                </motion.p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.title}
                            className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 text-center"
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            custom={i + 3}
                        >
                            <div className="flex justify-center mb-4">
                                <stat.icon className="h-10 w-10 text-white" />
                            </div>
                            <h3 className="text-4xl font-bold text-white">
                                <CountUp target={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="text-white text-xl mt-2">{stat.title}</p>
                            <p className="text-white text-sm mt-1">{stat.subtitle}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComputerScienceAndEngineeringIntro;
