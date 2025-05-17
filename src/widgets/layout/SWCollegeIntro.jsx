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

const stats = [
    {
        title: "교수진 수",
        value: 31,
        subtitle: "전임 교수 기준",
        icon: AcademicCapIcon,
    },
    {
        title: "학생 수",
        value: 1539,
        subtitle: "2025.02 재학생 및 휴학생 기준",
        icon: UserGroupIcon,
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

const CountUp = ({ target }) => {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) =>
        Math.floor(latest).toLocaleString()
    );
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.6, once: false }); // 👈 반복 허용

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, target, {
                duration: 1.5,
                ease: "easeOut",
            });

            return controls.stop;
        } else {
            // 뷰포트에서 벗어나면 리셋해 다시 재진입 시 반복 가능하게
            count.set(0);
        }
    }, [isInView, target]);

    return (
        <motion.span ref={ref}>
            {rounded}
        </motion.span>
    );
};

const SWCollegeIntro = () => {
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
                        지능형SW융합대학 소개
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
                    ICT 융합대학은 4차 산업혁명 시대, 사물인터넷 시대를 선도할 정보보안, 사물인터넷, 빅데이터, 스마트 제조 등 ICT 분야의 전문가 양성을 목표로, 첨단 실습 기자재와 현장 중심 기술을 기반으로 교육합니다.
                    HW·SW융합 STEAM 교육, 코딩, 3D모델링, 머신러닝 등 실습 환경과 Digital Fabrication Center, Smart Factory Center, VR/AR Center 등의 최첨단 교육 공간을 제공합니다.
                </motion.p>

                {/* 통계 카드 */}
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
                                <CountUp target={stat.value} />
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

export default SWCollegeIntro;
