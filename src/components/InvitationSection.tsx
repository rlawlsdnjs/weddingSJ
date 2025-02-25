import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useScroll, useTransform } from "framer-motion";

interface InvitationSectionProps {
    invitationTexts: string[];
}

const InvitationSection: React.FC<InvitationSectionProps> = ({
    invitationTexts,
}) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

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
                            style={{ opacity, y }}
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
    background: linear-gradient(to bottom, #fff7d2, #f9ffdf 70%);

    position: relative;
    overflow: hidden;
`;

const TextContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
`;

const StyledMotionText = styled(motion.p)`
    font-family: "Nanum Myeongjo", serif;
    color: rgb(51, 51, 51);
    text-align: center;
    letter-spacing: 0em;
    line-height: 2.3em;
    word-break: keep-all;
    margin: 0;
    font-weight: bold;
    opacity: 0; /* 시작 시 투명하게 설정 */

    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

export default InvitationSection;
