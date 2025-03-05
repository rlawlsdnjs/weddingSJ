import React from "react";
import styled from "styled-components";
import { Phone, MapPin, Car, LocateIcon, Map } from "lucide-react"; // lucid-react 아이콘 추가
import naverImg from "../../../public/naver_map.png";
import kakaoImg from "../../../public/kakao_map.png";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
`;

const AddressLocationTitle = styled.h3`
    font-size: 1rem;
    color: #333;
    margin-bottom: 3px;
    font-family: "Nanum Myeongjo", serif;
    word-spacing: -0.8rem;
    font-weight: 600;
`;
const AddressText = styled.p`
    font-size: 14px;
    color: #333;
    font-family: "Nanum Myeongjo", serif;
    word-spacing: -0.8rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 12px;
    margin-top: 12px;
    margin-bottom: 10px;
`;

const CallButton = styled.a`
    padding: 6px 15px;
    background-color: #fff;
    color: #666;
    border-radius: 15px;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    transition: background-color 0.3s;
    border: 1px solid #ddd;

    &:hover {
        background-color: #e55a5a;
    }
`;

const MapButton = styled.a`
    padding: 6px 15px;
    background-color: #fff;
    color: #666;
    border-radius: 15px;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 15px;
    transition: background-color 0.3s;
    border: 1px solid #ddd;
    &:hover {
        background-color: #3a90c2;
    }
`;

const LocationImg = styled.img`
    width: 100%;
    border-radius: 8px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #ddd;
`;

const NavButtons = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    border: 1px solid #ddd;
    border-right: none;
    border-top: none;
`;

const NavButton = styled.a`
    width: 50%;
    padding: 5px 5px;
    background-color: #fff;
    color: #666;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 14px;
    letter-spacing: -0.02em;
    transition: background-color 0.3s;
    border-right: 1px solid #ddd;
    &:hover {
        background-color: #5a7ea0;
    }
`;

interface LocationProps {
    address: string;
    subAddress: string;
    placeName: string;
    phoneNumber: string;
}

const Location: React.FC<LocationProps> = ({
    address,
    subAddress,
    placeName,
    phoneNumber,
}) => {
    const kakaoMapEmbedUrl = `https://map.kakao.com/?q=${encodeURIComponent(
        placeName
    )}`;
    const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(
        placeName
    )}`;
    const kakaoNaviUrl = `https://map.kakao.com/link/to/${encodeURIComponent(
        placeName
    )},37.643649,126.790246`;

    return (
        <Container>
            <AddressLocationTitle>
                천년컨벤션 웨딩홀 10층 그리다홀
            </AddressLocationTitle>
            <AddressText>{address}</AddressText>
            <AddressText>{subAddress}</AddressText>

            <ButtonContainer>
                <CallButton href={`tel:${phoneNumber}`}>
                    <Phone size={15} /> 전화
                </CallButton>
                <MapButton
                    href={kakaoMapEmbedUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Map size={15} />
                    지도
                </MapButton>
            </ButtonContainer>

            <LocationImg
                src="https://map2.daum.net/map/mapservice?FORMAT=PNG&SCALE=2.5&MX=452620&MY=1151722&S=0&IW=504&IH=310&LANG=0&COORDSTM=WCONGNAMUL&logo=kakao_logo"
                alt="Kakao Map"
            />

            <NavButtons>
                <NavButton
                    href={naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                        src={naverImg}
                        alt="Naver Map"
                        width={20}
                        height={20}
                    />{" "}
                    네이버 지도
                </NavButton>
                <NavButton
                    href={kakaoNaviUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img
                        src={kakaoImg}
                        alt="Kakao Map"
                        width={20}
                        height={20}
                    />{" "}
                    카카오 네비
                </NavButton>
            </NavButtons>
        </Container>
    );
};

export default Location;
