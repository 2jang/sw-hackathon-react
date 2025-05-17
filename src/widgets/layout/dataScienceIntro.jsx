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
        value: 17,
        subtitle: "전임 교수 기준",
        icon: AcademicCapIcon,
    },
    {
        title: "취업률",
        value: 82,
        subtitle: "2025.02 졸업생 및 재학생 기준",
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

const dataScienceIntro = () => {
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
                        데이터과학과 소개
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
                    데이터과학과는 제4차 산업혁명의 필요한 전문인 양성을 적합한 교육과정을 제공한다. <br/>
                    이에 따라 데이터 분석에서부터 인공지능 알고리즘 개발 및 실행에 필요한 전문 지식을 익히도록 한다.
                </motion.p>

                <div className="grid grid-cols-1 [@media(max-width:430px)]:grid-cols-2 sm:grid-cols-2 gap-10 [@media(max-width:430px)]:gap-5 max-w-4xl mx-auto">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.title}
                            className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 text-center [@media(max-width:430px)]:w-[160px] [@media(max-width:430px)]:h-[160px]"
                            variants={fadeIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            custom={i + 3}
                        >
                            <div className="flex justify-center mb-4">
                                <stat.icon className="h-10 w-10 [@media(max-width:430px)]:h-5 [@media(max-width:430px)]:w-5 text-white" />
                            </div>
                            <h3 className="text-4xl [@media(max-width:430px)]:text-[25px] font-bold text-white">
                                <CountUp target={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="text-white text-xl [@media(max-width:430px)]:text-[16px] mt-2 [@media(max-width:430px)]:mt-1">{stat.title}</p>
                            <p className="text-white text-sm [@media(max-width:430px)]:text-[8px] mt-1 [@media(max-width:430px)]:mt-0">{stat.subtitle}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default dataScienceIntro;
