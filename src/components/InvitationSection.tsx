import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";

interface InvitationSectionProps {
    invitationTexts: string[];
}

const InvitationSection: React.FC<InvitationSectionProps> = ({
    invitationTexts,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isScrolledBeyond, setIsScrolledBeyond] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // StyledSection의 높이가 스크롤 값보다 커지면 z-index를 -1로 설정
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const sectionHeight = sectionRef.current.offsetHeight;
                const scrollPosition = window.scrollY;
                setIsScrolledBeyond(scrollPosition > sectionHeight);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const totalTexts = invitationTexts.length;
    const stepSize = 0.08; // 고정된 stepSize 사용

    return (
        <StyledSection ref={sectionRef}>
            <TextContainer>
                {invitationTexts.map((text, index) => {
                    const appearStart = stepSize * index;
                    const appearEnd = appearStart + stepSize * 0.8; // 텍스트가 더 오랫동안 보이게 수정

                    const opacity = useTransform(
                        scrollYProgress,
                        [appearStart, appearEnd],
                        [0, 1]
                    );

                    const y = useTransform(
                        scrollYProgress,
                        [appearStart, appearEnd],
                        [50, 0] // 아래에서 위로 등장하도록
                    );

                    return (
                        <StyledMotionText
                            key={index}
                            style={{
                                opacity,
                                y,
                                zIndex: isScrolledBeyond ? -1 : 1, // 스크롤 범위 벗어나면 z-index를 -1로
                            }}
                            transition={{ duration: 0.6, ease: "easeInOut" }}>
                            {text}
                        </StyledMotionText>
                    );
                })}
            </TextContainer>
        </StyledSection>
    );
};

const StyledSection = styled.section`
    height: 300vh; /* 300vh로 높이 설정 */
    background: linear-gradient(to bottom, #fff9dc, #f8fde0 70%);

    position: relative;
    overflow: hidden;
`;

const TextTitle = styled.h2`
    font-family: "Nanum Myeongjo", serif;
    word-spacing: -0.8rem;
    font-size: 1.2rem;
    position: absolute;
    top: 200px;
    left: 50%;
    z-index: 99;
    transform: translateX(-50%);
    font-weight: bold;
`;

const TextContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
    z-index: 1;
`;

const StyledMotionText = styled(motion.p)`
    font-family: "Nanum Myeongjo", serif;
    word-spacing: -0.8rem;
    color: rgb(51, 51, 51);
    text-align: center;
    letter-spacing: 0em;
    line-height: 2.3em;
    word-break: keep-all;
    margin: 0;
    font-weight: bold;
    opacity: 0; /* 시작 시 투명하게 설정 */
    font-size: 1.5rem;
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

export default InvitationSection;
