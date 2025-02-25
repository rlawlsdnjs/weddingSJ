import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// 스타일 설정
const GalleryWrap = styled.div`
    position: relative; /* 모달이 부모 요소에 상대적으로 위치하도록 설정 */
    height: 100%;
`;

const GalleryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3개의 열로 이미지 배치 */
    gap: 15px;
    width: 100%;
    height: 100%;
    position: relative;
`;

const GalleryImage = styled.img`
    width: 100%;
    height: auto; /* 부모에 맞게 자동 높이 조정 */
    object-fit: cover; /* 비율 유지하며 잘라내기 */
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05); /* hover 시 확대 */
    }
`;

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%; /* 부모 크기에 맞게 조정 */
    height: 100%; /* 부모 크기에 맞게 조정 */
`;

const ModalImage = styled.img`
    max-width: 100%; /* 부모 너비에 맞춰서 크기 제한 */
    max-height: 100vh; /* 화면 높이에 맞춰서 최대 높이 제한 */
    object-fit: contain; /* 비율 유지하며 크기 맞추기 */
    border-radius: 8px;
`;

interface ButtonProps {
    left?: boolean; // left 속성 추가
    right?: boolean; // right 속성 추가 (필요한 경우)
}

const Button = styled.div<ButtonProps>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 2rem;
    color: white;
    cursor: pointer;
    z-index: 9999;
    opacity: 0.7;
    transition: opacity 0.3s;

    &:hover {
        opacity: 1;
    }

    /* 왼쪽 버튼 */
    ${(props) =>
        props.left &&
        `
        left: 10px;
    `}

    /* 오른쪽 버튼 */
    ${(props) =>
        props.right &&
        `
        right: 10px;
    `}
`;

// Gallery 컴포넌트
const Gallery: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // 샘플 이미지 URL들
    const images = [
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
        "https://swiperjs.com/demos/images/nature-3.jpg",
        "https://swiperjs.com/demos/images/nature-4.jpg",
        "https://swiperjs.com/demos/images/nature-5.jpg",
        "https://swiperjs.com/demos/images/nature-6.jpg",
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-1.jpg",
    ];

    // 이미지 클릭 시 모달 열기
    const openModal = (index: number) => {
        setCurrentIndex(index);
        setCurrentImage(images[index]);
        setIsOpen(true);
    };

    // 슬라이드 이전 이미지로
    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setCurrentImage(images[prevIndex]);
    };

    // 슬라이드 다음 이미지로
    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setCurrentImage(images[nextIndex]);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsOpen(false);
        setCurrentImage(null);
    };

    return (
        <GalleryWrap>
            <GalleryContainer>
                {images.map((image, index) => (
                    <GalleryImage
                        key={index}
                        src={image}
                        alt={`Gallery Image ${index + 1}`}
                        onClick={() => openModal(index)}
                    />
                ))}
            </GalleryContainer>

            {/* 모달 */}
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                ariaHideApp={false}
                style={{
                    overlay: {
                        position: "fixed", // fixed로 설정
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "100dvw", // 부모 크기 맞추기
                        height: "100dvh", // 부모 크기 맞추기
                        backgroundColor: "rgba(0,0,0,0.8)", // 배경 색상
                        zIndex: 9999, // 모달이 가장 위에 오도록 설정
                        inset: "0px",
                    },
                    content: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "0",
                        borderRadius: "10px",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        width: "90%", // 부모의 너비에 맞춰서 크기 설정
                        height: "80%", // 부모의 높이에 맞춰서 크기 설정
                        maxWidth: "100%", // 최대 너비 제한
                        maxHeight: "100%", // 최대 높이 제한
                        margin: "0", // 모달의 여백을 제거하여 부모 크기에 딱 맞게
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}>
                <ModalContainer>
                    <Button left onClick={handlePrev}>
                        <FaArrowLeft />
                    </Button>
                    <ModalImage src={currentImage || ""} alt="Modal Image" />
                    <Button right onClick={handleNext}>
                        <FaArrowRight />
                    </Button>
                </ModalContainer>
            </Modal>
        </GalleryWrap>
    );
};

export default Gallery;
