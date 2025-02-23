import { useEffect, useRef, useState } from "react";
import { useScroll, motion } from "framer-motion";
import { useMotionValueEvent, useMotionValue } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Card from "./components/Card";
import "./App.css";
import mainImage from "../public/mainImage.jpg";
import { CARD_ARRAY } from "./constants/CARD_ARRAY";

const App = () => {
    const container = useRef<HTMLDivElement>(null);
    const introSection = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        container,
        offset: ["start start", "end end"],
    });

    const [hasScrolledPastIntro, setHasScrolledPastIntro] = useState(false);

    useEffect(() => {
        const lenis = new Lenis();

        const handleScroll = () => {
            if (introSection.current) {
                const introRect = introSection.current.getBoundingClientRect();
                setHasScrolledPastIntro(introRect.bottom <= 0);
            }
        };

        window.addEventListener("scroll", handleScroll);

        const raf = (time: number) => {
            lenis.raf(time);
            ~requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const boundedProgress = useMotionValue(0);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        boundedProgress.set(Math.min(1, Math.max(0, latest)));
    });

    return (
        <div className="app-container">
            {/* 인트로 섹션 */}
            <div ref={introSection} className="intro-section">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="intro-content ">
                    <div className="intro-content-top">
                        <h1 className="wedding-text">
                            <span>W</span>
                            <span>e</span>
                            <span>d</span>
                            <span>d</span>
                            <span>i</span>
                            <span>n</span>
                            <span>g</span>
                            <span>D</span>
                            <span>a</span>
                            <span>y</span>
                        </h1>
                    </div>
                    <div className="intro-content-middle">
                        <img src={mainImage} alt="Wedding Image" />
                    </div>
                    <div className="intro-content-bottom">
                        <div className="intro-content-main-text">
                            <h3>
                                <span>김진원 </span> <span>|</span>
                                <span>박소라</span>
                            </h3>
                            <span>
                                2025.04.05 SAT PM 12:30
                                <br />
                                백석 CN웨딩 그리다홀
                            </span>
                            <div className="scroll-indicator">
                                <div className="scroll-dots">
                                    {[...Array(3)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`dot dot-${i + 1}`}>
                                            •
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* 카드 섹션 */}
            <main ref={container} className="main-container">
                {CARD_ARRAY.map((card, i) => {
                    const scaleFactor = 0.04;
                    const targetScale =
                        1 - (CARD_ARRAY.length - i) * scaleFactor;
                    return (
                        <Card
                            key={`p_${i}`}
                            i={i}
                            {...card}
                            progress={boundedProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                            isVisible={hasScrolledPastIntro}
                        />
                    );
                })}
            </main>
        </div>
    );
};

export default App;
