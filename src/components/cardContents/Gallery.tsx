import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// 이미지들 import
import img1 from "../../../public/mainImage-min.jpg";
import img2 from "../../../public/19_BS_K3160-min.jpg";
import img3 from "../../../public/20_BS_K3282-2-min.jpg";
import img4 from "../../../public/20_BS_K3334-min.jpg";
import img5 from "../../../public/21_BS_K3237-min.jpg";
import img6 from "../../../public/24_BS_K1892-2-min.jpg";
import img7 from "../../../public/25_BS_K1920-min.jpg";
import img8 from "../../../public/26_BS_K1852-2-min.jpg";
import img9 from "../../../public/28_BS_K2198-min.jpg";

// 스타일 설정
const GalleryWrap = styled.div`
    position: relative;
    height: 100%;
`;

const GalleryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    width: 100%;
    height: 100%;
    position: relative;
`;

const GalleryImage = styled.img`
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.05);
    }
`;

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 100%;
`;

const ModalImage = styled.img`
    max-width: 100%;
    max-height: 100vh;
    object-fit: contain;
    border-radius: 8px;
`;

interface ButtonProps {
    left?: boolean;
    right?: boolean;
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

    ${(props) =>
        props.left &&
        `
        left: 10px;
    `}

    ${(props) =>
        props.right &&
        `
        right: 10px;
    `}
`;

const Gallery: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // 이미지 import 배열
    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setCurrentImage(images[index]);
        setIsOpen(true);
    };

    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setCurrentImage(images[prevIndex]);
    };

    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setCurrentImage(images[nextIndex]);
    };

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
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.8)",
                    },
                    content: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "0",
                        backgroundColor: "rgba(0,0,0,0.8)",
                        width: "90%",
                        height: "80%",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        margin: "0",
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
