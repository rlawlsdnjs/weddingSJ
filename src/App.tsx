import { useEffect, useRef, useState } from "react";
import { useScroll, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import Card from "./components/Card";
import "./App.css";

// 프로젝트 데이터 타입 정의 (타입스크립트 사용 시)
interface Project {
    title: string;
    description: string;
    src: string;
    link: string;
    color: string;
}

// 프로젝트 배열
export const projects: Project[] = [
    {
        title: "Matthias Leidinger",
        description:
            "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",
        src: "rock.jpg",
        link: "https://www.ignant.com/2023/03/25/ad2186-matthias-leidingers-photographic-exploration-of-awe-and-wonder/",
        color: "#BBACAF",
    },
    {
        title: "Clément Chapillon",
        description:
            "Originally hailing from Austria, Berlin-based photographer Matthias Leindinger is a young creative brimming with talent and ideas.",

        src: "tree.jpg",
        link: "https://www.ignant.com/2022/09/30/clement-chapillon-questions-geographical-and-mental-isolation-with-les-rochers-fauves/",
        color: "#977F6D",
    },
    {
        title: "Zissou",
        description:
            "Though he views photography as a medium for storytelling, Zissou's images don't insist on a narrative. Both crisp and ethereal, they're encoded with an ambiguity—a certain tension—that lets the viewer find their own story within them.",
        src: "water.jpg",
        link: "https://www.ignant.com/2023/10/28/capturing-balis-many-faces-zissou-documents-the-sacred-and-the-mundane-of-a-fragile-island/",
        color: "#C2491D",
    },
    {
        title: "Mathias Svold and Ulrik Hasemann",
        description:
            "The coastlines of Denmark are documented in tonal colors in a pensive new series by Danish photographers Ulrik Hasemann and Mathias Svold; an ongoing project investigating how humans interact with and disrupt the Danish coast.",
        src: "house.jpg",
        link: "https://www.ignant.com/2019/03/13/a-photographic-series-depicting-the-uncertain-future-of-denmarks-treasured-coastlines/",
        color: "#B62429",
    },
    {
        title: "Mark Rammers",
        description:
            "Dutch photographer Mark Rammers has shared with IGNANT the first chapter of his latest photographic project, 'all over again'—captured while in residency at Hektor, an old farm in Los Valles, Lanzarote. Titled 'Beginnings', the mesmerizing collection of images is a visual and meditative journey into the origins of regrets and the uncertainty of stepping into new unknowns.",
        src: "cactus.jpg",
        link: "https://www.ignant.com/2023/04/12/mark-rammers-all-over-again-is-a-study-of-regret-and-the-willingness-to-move-forward/",
        color: "#88A28D",
    },
];

const App = () => {
    const container = useRef<HTMLDivElement>(null);
    const introSection = useRef<HTMLDivElement>(null);

    // useScroll 설정
    const { scrollYProgress } = useScroll({
        container,
        offset: ["start start", "end end"],
    });

    // 인트로 섹션 지나갔는지 확인하기 위한 상태
    const [hasScrolledPastIntro, setHasScrolledPastIntro] = useState(false);

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const lenis = new Lenis();

        lenis.on("scroll", ({ scroll }) => {
            // 현재 스크롤 위치를 progress 값으로 변환
            const maxScroll =
                document.documentElement.scrollHeight - window.innerHeight;
            setScrollProgress(scroll / maxScroll);
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="app-container">
            {/* 인트로 섹션 */}
            <div ref={introSection} className="intro-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="intro-content">
                    <h1>배포 Gallery</h1>
                    <p>
                        Scroll down to explore our stunning collection of
                        photographs
                    </p>
                    <div className="scroll-indicator">
                        <span>Scroll</span>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 4V20M12 20L18 14M12 20L6 14"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </motion.div>
            </div>

            {/* 카드 섹션 */}
            <main ref={container} className="main-container">
                {projects.map((project, i) => {
                    const scaleFactor = 0.04; // 스케일 감소 폭을 줄임 (기존 0.05 → 0.02)
                    const targetScale = 1 - (projects.length - i) * scaleFactor;
                    return (
                        <Card
                            key={`p_${i}`}
                            i={i}
                            {...project}
                            progress={scrollYProgress}
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
