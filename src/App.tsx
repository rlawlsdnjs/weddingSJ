import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import { useMotionValueEvent, useMotionValue } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Card from "./components/Card";
import "./App.css";
import mainImage from "../public/mainResizeImage.jpg";
import { CARD_ARRAY } from "./constants/CARD_ARRAY";
import MusicPlayer from "./components/MusicPlayer";
import InvitationSection from "./components/InvitationSection";
import bgm from "../public/wedding-251610.mp3";

const INVITATION_TEXTS = [
    "화사한 봄날, 식목일에,",
    "서로의 사랑을 뿌리내리며,",
    "미래를 함께 키워가려 합니다.",
    "나무처럼 견고하게,",
    "꽃처럼 아름다운 사랑을,",
    "여러분의 축복 속에,",
    "깊고 넓게 키우겠습니다.",
];
const App = () => {
    const container = useRef<HTMLDivElement>(null);
    const introSection = useRef<HTMLDivElement>(null);
    const invitationSection = useRef<HTMLDivElement>(null);

    // 스크롤 감지 영역을 더 크게 설정하여 애니메이션 속도 조절
    const { scrollYProgress } = useScroll({
        target: invitationSection,
        offset: ["start end", "end start"],
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
            requestAnimationFrame(raf);
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
            {/* 음악 플레이어 컴포넌트 */}
            <MusicPlayer musicSrc={bgm} />
            {/* 인트로 섹션 */}
            <div ref={introSection} className="intro-section">
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
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
                        </div>
                    </div>
                    <div className="scroll-indicator">
                        <div className="scroll-dots">
                            {[...Array(6)].map((_, i) => (
                                <span key={i} className={`dot dot-${i + 1}`}>
                                    •
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
            {/* 초대 섹션 컴포넌트 */}
            <div ref={invitationSection}>
                <InvitationSection invitationTexts={INVITATION_TEXTS} />
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
                            id={`card-${i}`}
                        />
                    );
                })}
            </main>

            {/* Footer 영역 */}
            <footer className="footer">
                <p>좋은 하루 되세요!</p>
            </footer>
        </div>
    );
};

export default App;
