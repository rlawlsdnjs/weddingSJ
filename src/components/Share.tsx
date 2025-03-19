import React, { useEffect } from "react";
import { styled } from "styled-components";
import yellowFlower from "../../public/yeloflower.png";
import mainImg from "../../public/mainResizeImage.jpg";
const Share = () => {
    // 카카오 SDK 초기화
    useEffect(() => {
        // 카카오 SDK가 이미 초기화 되었는지 확인
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init("f5381c601d71499124c5920125f3f74d"); // 카카오 개발자 사이트에서 발급받은 앱 키를 입력
        }
    }, []);

    // 링크 복사하기
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("링크가 복사되었습니다!");
    };

    // 카카오톡 공유하기
    const handleKakaoShare = () => {
        if (window.Kakao) {
            window.Kakao.Link.sendDefault({
                objectType: "feed",
                content: {
                    title: "진원❣️소라", // 공유할 제목
                    description: "모바일 청첩장", // 공유할 설명
                    imageUrl: mainImg, // 공유할 이미지 URL
                    link: {
                        mobileWebUrl: window.location.href, // 모바일 웹 URL
                        webUrl: window.location.href, // PC 웹 URL
                    },
                },
            });
        } else {
            alert("카카오톡 SDK가 로드되지 않았습니다.");
        }
    };

    return (
        <ShareWrapper>
            <img style={{ width: "50px" }} src={yellowFlower} />
            <ShareTitle>
                여러분의 꽃도 <br />
                활짝 피어나기를 바라며
            </ShareTitle>
            <ButtonContainer>
                <ShareButton onClick={handleCopyLink}>
                    링크 복사하기
                </ShareButton>
                <ShareButton onClick={handleKakaoShare}>
                    카카오톡 공유하기
                </ShareButton>
            </ButtonContainer>
        </ShareWrapper>
    );
};

export default Share;

const ShareWrapper = styled.div`
    text-align: center;
    padding-top: 100px;
    width: 100%;
    font-family: "Nanum Myeongjo", serif;
`;
const ShareTitle = styled.h3`
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
    color: #666;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background: #666;
`;

const ShareButton = styled.button`
    flex: 1;
    padding: 12px;
    color: white;
    border: none;
    border-radius: 0px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
`;
