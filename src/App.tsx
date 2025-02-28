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
import bgm from "../public/mainBgm.mp3";
import Dday from "./components/Dday";
import Transportation from "./components/cardContents/Transportation";
import Share from "./components/Share";
import Opening from "./components/Opening";

const INVITATION_TEXTS = [
    "화사한 봄날, 식목일에",
    "서로의 사랑을 뿌리내리며",
    "미래를 함께 키워가려 합니다.",
    "나무처럼 견고하고",
    "꽃처럼 아름다운 사랑을",
    "여러분의 축복 속에서",
    "깊고 넓게 키우겠습니다.",
];
const App = () => {
    const [isOpeningDone, setIsOpeningDone] = useState(false);

    // 오프닝 텍스트 애니메이션 완료 후 메인 콘텐츠 로드
    useEffect(() => {
        setTimeout(() => {
            setIsOpeningDone(true); // 1.5초 후에 메인 콘텐츠 로드
        }, 3000);
    }, []);

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
            {/* 오프닝 화면 */}
            {!isOpeningDone && (
                <Opening onFinish={() => setIsOpeningDone(true)} />
            )}

            {isOpeningDone && (
                <>
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
                                        <span>김진원 </span>
                                        <span
                                            style={{
                                                fontSize: "15px",
                                                color: "coral",
                                            }}>
                                            ♥︎
                                        </span>
                                        <span>박소라</span>
                                    </h3>
                                    <span>
                                        2025.04.05 토 PM 12:30
                                        <br />
                                        천년컨벤션 웨딩홀 10층 그리다홀
                                    </span>
                                </div>
                            </div>
                            <div className="scroll-indicator">
                                <div className="scroll-dots">
                                    {[...Array(6)].map((_, i) => (
                                        <span
                                            key={i}
                                            className={`dot dot-${i + 1}`}>
                                            •
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    {/* 초대 섹션 컴포넌트 */}
                    <div
                        ref={invitationSection}
                        style={{ position: "relative", zIndex: 2 }}>
                        <InvitationSection invitationTexts={INVITATION_TEXTS} />
                    </div>
                    <div style={{ position: "relative", zIndex: 3 }}>
                        <Dday></Dday>
                    </div>
                    {/* 카드 섹션 */}
                    <div style={{ position: "relative", zIndex: 4 }}>
                        <main ref={container} className="main-container">
                            {CARD_ARRAY.map((card, i) => {
                                const scaleFactor = 0.03;
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
                    </div>
                    <div
                        style={{
                            position: "relative",
                            zIndex: 5,
                            background:
                                "linear-gradient(to bottom,  rgb(255, 238, 238),rgb(255, 238, 238))",
                        }}>
                        <Transportation />
                    </div>
                    <div
                        style={{
                            position: "relative",
                            zIndex: 6,
                            background:
                                "linear-gradient(to bottom,  rgb(255, 238, 238),rgb(255, 238, 228))",
                        }}>
                        {/* Footer 영역 */}
                        <Share />
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
