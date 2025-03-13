import { motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";

// Props types
interface CardProps {
    i: number;
    title: string;
    color: string;
    isVisible: boolean;
    childrenNode?: ReactNode;
    id: string;
}

// Styled Components
const CardContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; /* sticky 제거 */
    margin-bottom: 50px; /* 카드 간격 조정 */
    &:last-child {
        margin-bottom: 0px;
    }
`;

const StyledCard = styled(motion.div)`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 90%;
    height: 85vh;
    border-radius: 5px;
    padding: 20px 0px;
    background-color: white;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.15);
    overflow-y: auto;
    justify-content: center;

    @media (max-width: 768px) {
        width: 90%;
        height: 80vh;
        padding: 15px;
    }
`;

const CardTitle = styled.h2`
    text-align: center;
    margin: 0;
    font-size: 40px;
    padding-bottom: 15px;
    font-family: "Nanum Myeongjo", serif;
    font-weight: 400;
    color: #666;
    letter-spacing: -0.08rem;

    @media (max-width: 768px) {
        font-size: 30px;
    }
`;

const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100% - 60px);
    gap: 20px;
    overflow-y: auto;
    flex-grow: 1;
    justify-content: center;
`;

const Description = styled.div`
    width: 100%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Card: React.FC<CardProps> = ({
    i,
    title,
    color,
    isVisible,
    childrenNode,
    id,
}) => {
    return (
        <CardContainer id={id}>
            <StyledCard
                style={{
                    background: color,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isVisible ? 1 : 0.5, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}>
                <CardTitle>{title}</CardTitle>
                <CardBody>
                    <Description>{childrenNode}</Description>
                </CardBody>
            </StyledCard>
        </CardContainer>
    );
};

export default Card;
