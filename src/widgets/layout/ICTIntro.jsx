import {
    useInView,
    useMotionValue,
    useTransform,
    animate,
    motion,
} from "framer-motion";
import { useEffect, useRef } from "react";

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

const ICTIntro = () => {
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
                        정보통신학과 소개
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
                    정보통신 전공은 ICT 융합 및 사물인터넷(IoT) 시대에 미래를 개척할 공학 인재 양성을 목표로, 유무선 네트워크, 모바일 프로그래밍, 임베디드 시스템 등 핵심 분야의 전문 지식과 현장 기반 실무 경험을 교육하며, 특히 로봇과 같은 융합 교과를 특화하여 학생들의 창의력 배양을 지원합니다.
                </motion.p>
            </div>
        </section>
    );
};

export default ICTIntro;
