import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion"; // 플립 애니메이션 효과
import grass from "../../public/grasss.png";

const Dday = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const externalRef = useRef<HTMLSpanElement | null>(null); // 외동딸 요소를 참조
    const [externalSize, setExternalSize] = useState(0); // 외동딸의 크기 저장
    useEffect(() => {
        // 외동딸 크기 계산
        if (externalRef.current) {
            setExternalSize(externalRef.current.offsetWidth); // 외동딸의 너비를 저장
        }
    }, [timeLeft]); // 타이머가 업데이트될 때마다 외동딸의 크기를 다시 계산
    useEffect(() => {
        const weddingDate = new Date("2025-04-05T00:00:00");

        const updateCountdown = () => {
            const now = new Date();
            const diff = weddingDate.getTime() - now.getTime();

            if (diff > 0) {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                const minutes = Math.floor(
                    (diff % (1000 * 60 * 60)) / (1000 * 60)
                );
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000); // 🔥 초 단위 업데이트

        return () => clearInterval(timer);
    }, []);

    return (
        <DayWrap>
            <DdayContainer>
                <img
                    style={{ width: "25px", marginBottom: "20px" }}
                    src={grass}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}>
                    <div
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            gap: "10px",
                        }}>
                        <div style={{ fontWeight: "bold" }}>
                            김철규
                            <br />
                            김혜자
                        </div>
                        <div
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                gap: "10px",
                            }}>
                            <span>의</span>

                            <span style={{ width: `${externalSize}px` }}>
                                장남
                            </span>

                            <span style={{ fontWeight: "bold" }}>진원</span>
                        </div>
                    </div>
                    <div
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            display: "flex",
                            gap: "10px",
                        }}>
                        <div style={{ fontWeight: "bold" }}>
                            박기준
                            <br />
                            이수민
                        </div>
                        <div
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                display: "flex",
                                gap: "10px",
                            }}>
                            <span>의</span>
                            <span ref={externalRef}>외동딸</span>
                            <span style={{ fontWeight: "bold" }}>소라</span>
                        </div>
                    </div>
                </div>
                <DdayTitle>결혼식까지</DdayTitle>
                <CountdownWrapper>
                    <FlipBoxWrap>
                        <FlipBox
                            initial={{ rotateX: 90 }}
                            animate={{ rotateX: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}>
                            <Number>{timeLeft.days}</Number>
                        </FlipBox>
                        <Label>일</Label>
                    </FlipBoxWrap>
                    <FlipBoxWrap>
                        <FlipBox
                            initial={{ rotateX: 90 }}
                            animate={{ rotateX: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}>
                            <Number>{timeLeft.hours}</Number>
                        </FlipBox>
                        <Label>시간</Label>
                    </FlipBoxWrap>
                    <FlipBoxWrap>
                        <FlipBox
                            initial={{ rotateX: 90 }}
                            animate={{ rotateX: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}>
                            <Number>{timeLeft.minutes}</Number>
                        </FlipBox>
                        <Label>분</Label>
                    </FlipBoxWrap>
                    <FlipBoxWrap>
                        <FlipBox
                            initial={{ rotateX: 90 }}
                            animate={{ rotateX: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}>
                            <Number>{timeLeft.seconds}</Number>
                        </FlipBox>
                        <Label>초</Label>
                    </FlipBoxWrap>
                </CountdownWrapper>
            </DdayContainer>
        </DayWrap>
    );
};

export default Dday;

const DayWrap = styled.div`
    height: 70dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: "Nanum Myeongjo", serif;
    word-spacing: -0.8rem;
    position: relative;
    z-index: 8;
    background-color: #f8fde0;
    color: #333;
`;
const DdayContainer = styled.div`
    text-align: center;
    font-family: "Nanum Myeongjo", serif;
    word-spacing: -0.8rem;
    color: #333;
`;

const DdayTitle = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 12px;
    margin-top: 40px;
`;

const CountdownWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 6px;
`;
const FlipBoxWrap = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

const FlipBox = styled(motion.div)`
    width: 60px;
    height: 60px;
    background: linear-gradient(to bottom, #ffffff, #f0f0f0);
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    font-weight: bold;
    position: relative;
    perspective: 1000px;
`;

const Number = styled.span`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
`;

const Label = styled.span`
    font-size: 14px;
    color: #666;
`;
