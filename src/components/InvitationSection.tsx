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
    const stepSize = 1 / totalTexts;

    return (
        <StyledSection ref={sectionRef}>
            <TextContainer>
                {invitationTexts.map((text, index) => {
                    const appearStart = stepSize * index;
                    const appearEnd = appearStart + stepSize * 0.1; // 문장이 더 오래 보이게 수정

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
    height: 1000vh; /* 문장이 보일 시간을 충분히 확보할 수 있도록 높이를 늘림 */
    background-color: #f7f7f7;
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
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin: 0;
    opacity: 0; /* 시작 시 투명하게 설정 */

    @media (max-width: 768px) {
        font-size: 1.5rem;
    }
`;

export default InvitationSection;
