import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

// 이미지들 import
import img1 from "../../../public/mainImage-min.jpg";
import img2 from "../../../public/02.03_BS_K2251-2.jpg";
import img3 from "../../../public/04_BS_K2356-2.jpg";
import img4 from "../../../public/05_BS_K2284-2.jpg";
import img5 from "../../../public/10.11_BS_K2511-2.jpg";
import img6 from "../../../public/12_BS_K2548-2.jpg";
import img7 from "../../../public/13_BS_K2574-2.jpg";
import img8 from "../../../public/14_BS_K2741-2.jpg";
import img10 from "../../../public/15_BS_K2762-2.jpg";
import img11 from "../../../public/16_BS_K2892.jpg";
import img12 from "../../../public/17_BS_K2835.jpg";
import img13 from "../../../public/18_BS_K3136.jpg";
import img14 from "../../../public/19_BS_K3160.jpg";
import img15 from "../../../public/20_BS_K3282-2.jpg";
import img16 from "../../../public/20_BS_K3334.jpg";
import img17 from "../../../public/21_BS_K3237.jpg";
import img18 from "../../../public/22.23_BS_K3554.jpg";
import img19 from "../../../public/24_BS_K1892-2.jpg";
import img20 from "../../../public/25_BS_K1920.jpg";
import img21 from "../../../public/26_BS_K1852-2.jpg";
import img22 from "../../../public/27_BS_K2078.jpg";
import img23 from "../../../public/28_BS_K2198.jpg";
import img24 from "../../../public/30_1_BS_K2460-2.jpg";
import img25 from "../../../public/32_1_BS_K2467-2.jpg";
import img26 from "../../../public/31_2_BS_K2476-2.jpg";
import img27 from "../../../public/33_2_BS_K2478_2.jpg";
import img28 from "../../../public/29.07_BS_K2448-2.jpg";

// 스타일 설정
const GalleryWrap = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    padding: 0 15px;
`;

const MasonryContainer = styled.div`
    column-count: 3;
    column-gap: 15px;
    width: 100%;
`;

const MasonryItem = styled.div`
    break-inside: avoid;
    margin-bottom: 15px;
    position: relative;
`;

const GalleryImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.03);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
`;

const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    height: 100%;
    position: relative;
`;

const ModalImageWrapper = styled.div`
    position: relative;
    display: inline-block;
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
    close?: boolean;
}

const Button = styled.div<ButtonProps>`
    position: absolute;
    font-size: 2rem;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 9999;
    opacity: 0.7;
    transition:
        opacity 0.3s,
        background-color 0.3s;

    &:hover {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.8);
    }

    ${(props) =>
        props.left &&
        `
        top: 50%;
        transform: translateY(-50%);
        left: 20px;
    `}

    ${(props) =>
        props.right &&
        `
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
    `}
    
    ${(props) =>
        props.close &&
        `
        top: 20px;
        right: 20px;
    `}
`;

// 이미지 인터페이스
interface ImageDimensions {
    width: number;
    height: number;
}

const Gallery: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // 이미지 import 배열
    const images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img10,
        img11,
        img12,
        img13,
        img14,
        img15,
        img16,
        img17,
        img18,
        img19,
        img20,
        img21,
        img22,
        img23,
        img24,
        img25,
        img26,
        img27,
        img28,
    ];

    // 이미지 preload 처리
    useEffect(() => {
        let loadedImages = 0;

        images.forEach((src: string) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loadedImages++;
                if (loadedImages === images.length) {
                    setImagesLoaded(true);
                }
            };
        });
    }, []);

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setCurrentImage(images[index]);
        setIsOpen(true);
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(prevIndex);
        setCurrentImage(images[prevIndex]);
    };

    const handleNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        const nextIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(nextIndex);
        setCurrentImage(images[nextIndex]);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCurrentImage(null);
    };

    // 이미지 영역 클릭 시 이벤트 전파 중단
    const handleImageClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    // 키보드 이벤트 처리
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === "ArrowLeft") {
                handlePrev(e as unknown as React.MouseEvent);
            } else if (e.key === "ArrowRight") {
                handleNext(e as unknown as React.MouseEvent);
            } else if (e.key === "Escape") {
                closeModal();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, currentIndex]);

    if (!imagesLoaded) {
        return <div>Loading gallery...</div>;
    }

    return (
        <GalleryWrap>
            <MasonryContainer>
                {images.map((image, index) => (
                    <MasonryItem key={index}>
                        <GalleryImage
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            onClick={() => openModal(index)}
                        />
                    </MasonryItem>
                ))}
            </MasonryContainer>

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
                        backgroundColor: "rgba(0,0,0,0.9)",
                        zIndex: 9999,
                    },
                    content: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0",
                        backgroundColor: "transparent",
                        border: "none",
                        width: "90%",
                        height: "90%",
                        maxWidth: "100%",
                        maxHeight: "100%",
                        margin: "0",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}>
                <ModalContainer onClick={closeModal}>
                    <Button close onClick={closeModal}>
                        <FaTimes />
                    </Button>
                    <Button left onClick={handlePrev}>
                        <FaArrowLeft />
                    </Button>
                    <ModalImageWrapper onClick={handleImageClick}>
                        <ModalImage
                            src={currentImage || ""}
                            alt="Modal Image"
                        />
                    </ModalImageWrapper>
                    <Button right onClick={handleNext}>
                        <FaArrowRight />
                    </Button>
                </ModalContainer>
            </Modal>
        </GalleryWrap>
    );
};

export default Gallery;
