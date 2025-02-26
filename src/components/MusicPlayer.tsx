import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { Volume2, VolumeX } from "lucide-react";

interface MusicPlayerProps {
    musicSrc: string;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ musicSrc }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    // 음악 재생/정지 토글 함수
    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false); // 🎯 음악 멈춘 후 상태 변경
            } else {
                audioRef.current.play().catch((e) => {
                    console.log("자동 재생이 차단되었습니다:", e);
                });
                setIsPlaying(true); // 🎯 음악 실행 후 상태 변경
            }
        }
    };

    // 컴포넌트가 마운트되면 자동 재생 시작
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.play().catch((e) => {
                console.log("자동 재생이 차단되었습니다:", e);
            });
        }
    }, []);

    return (
        <>
            <audio ref={audioRef} src={musicSrc} loop autoPlay />{" "}
            {/* 자동 재생을 위해 autoPlay 추가 */}
            <MusicControlButton onClick={toggleMusic}>
                {isPlaying ? (
                    <Volume2 size={15} color="#ddd" />
                ) : (
                    <VolumeX size={15} color="#ddd" />
                )}
            </MusicControlButton>
        </>
    );
};

const MusicControlButton = styled.button`
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: rgba(255, 255, 255, 0.4);
    border: 1px solid #ddd;
    border-radius: 30px;
    padding: 8px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.9);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        top: 10px;
        right: 10px;
        padding: 8px;
    }
`;

export default MusicPlayer;
