import { useTransform, motion, useScroll } from "framer-motion";
import { ReactNode, useRef } from "react";
import styled from "styled-components";

// Props types
interface CardProps {
    i: number;
    title: string;
    color: string;
    progress: any;
    range: [number, number];
    targetScale: number;
    isVisible: boolean;
    childrenNode?: ReactNode;
    id: string;
}

// Styled Components
const CardContainer = styled.div<{ isVisible: boolean }>`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: sticky;
    top: 0px;
    transition: visibility 0.3s ease;
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
    transform-origin: center top;
    will-change: transform;
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
    font-family: "Parisienne", cursive;
    color: #000;
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
    height: 100%;
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
        font-size: 16px;
        line-height: 1.6;
        color: #333;

        @media (max-width: 768px) {
            font-size: 14px;
        }
    }

    > span {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
        margin-top: 15px;

        a {
            font-size: 16px;
            text-decoration: underline;
            cursor: pointer;
            color: #333;
            transition: color 0.3s ease;

            &:hover {
                color: #000;
            }
        }
    }
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    flex: 1;
    min-height: 200px;
    border-radius: 15px;
    overflow: hidden;
    margin-top: 10px;
`;

const Inner = styled(motion.div)`
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Card: React.FC<CardProps> = ({
    i,
    title,
    color,
    progress,
    range,
    targetScale,
    isVisible,
    childrenNode,
    id,
}) => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
    const scale = useTransform(progress, range, [1, targetScale]);

    return (
        <CardContainer ref={container} isVisible={isVisible} id={id}>
            <StyledCard
                style={{
                    background: color,
                    scale,
                    top: `calc(-5vh + ${i * 30}px)`,
                }}
                initial={{ opacity: 1, y: 0 }} // y값을 0으로 변경하여 처음부터 보이도록 함
                animate={
                    isVisible ? { opacity: 1, y: 0 } : { opacity: 1, y: 30 } // 두 상태 모두 y: 0으로 설정
                }
                transition={{ duration: 0, delay: i * 0.1 }}>
                <CardTitle>{title}</CardTitle>
                <CardBody>
                    <Description>{childrenNode}</Description>
                    {/* <ImageContainer>
                        <Inner style={{ scale: imageScale }} />
                    </ImageContainer> */}
                </CardBody>
            </StyledCard>
        </CardContainer>
    );
};

export default Card;
