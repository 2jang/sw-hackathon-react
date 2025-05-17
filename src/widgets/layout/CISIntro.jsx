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

const CISIntro = () => {
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
                        정보보호학과 소개
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
                    정보보호 전공은 미래 정보화 사회의 필수 기반 기술인 정보보호 전문가를 양성하기 위해, 컴퓨터 공학 기초 지식 위에 암호학, 접근통제,
                    시스템 및 네트워크 보안 등 핵심 이론과 관련 개발·관리 기술을 교육하며, 이론과 실습 및 인턴십 기회를 통해 정보의 비밀성, 무결성,
                    가용성을 보장하는 현장 친화적인 실무 인재를 키우는 것을 목표로 합니다.
                </motion.p>
            </div>
        </section>
    );
};

export default CISIntro;