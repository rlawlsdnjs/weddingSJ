import React from "react";
import styled from "styled-components";

interface InvitationSectionProps {
    invitationTexts: string[];
}

const InvitationSection: React.FC<InvitationSectionProps> = ({
    invitationTexts,
}) => {
    return (
        <StyledSection>
            <TextContainer>
                {invitationTexts.map((text, index) => (
                    <StyledText key={index}>{text}</StyledText>
                ))}
            </TextContainer>
        </StyledSection>
    );
};

const StyledSection = styled.section`
    min-height: auto; /* 콘텐츠가 자연스럽게 스크롤되도록 설정 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to bottom, #fff9dc, #f8fde0 70%);
    padding: 100px 20px;
    padding-bottom: 60px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px; /* 텍스트 간격 조정 */
`;

const StyledText = styled.p`
    font-family: "Nanum Myeongjo", serif;
    color: rgb(51, 51, 51);
    text-align: center;
    letter-spacing: -0.07em;
    line-height: 1.5em;
    word-break: keep-all;
    font-weight: bold;
    font-size: 1.5rem;
    @media (max-width: 768px) {
        font-size: 1.2rem;
    }
`;

export default InvitationSection;
