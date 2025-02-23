import React from "react";
import styled from "styled-components";
import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaMap,
    FaCar,
    FaMapSigns,
} from "react-icons/fa"; // 아이콘 추가

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
`;

const AddressText = styled.p`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
`;

const CallButton = styled.a`
    padding: 8px 15px;
    background-color: #ff6b6b;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e55a5a;
    }
`;

const MapButton = styled.a`
    padding: 8px 15px;
    background-color: #4dabf7;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #3a90c2;
    }
`;

const LocationImg = styled.img`
    width: 100%;
    border-radius: 8px;
    margin-bottom: 20px;
`;

const NavButtons = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const NavButton = styled.a`
    padding: 8px 15px;
    background-color: #6a89cc;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #5a7ea0;
    }
`;

interface LocationProps {
    address: string;
    placeName: string;
    phoneNumber: string;
}

const Location: React.FC<LocationProps> = ({
    address,
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
    const tMapUrl = `https://apis.openapi.sk.com/tmap/app/routes?name=${encodeURIComponent(
        placeName
    )}&lat=37.643649&lon=126.790246`;

    return (
        <Container>
            <h3>📍 위치 안내</h3>
            <AddressText>{address}</AddressText>

            <ButtonContainer>
                <CallButton href={`tel:${phoneNumber}`}>
                    <FaPhoneAlt /> 전화 걸기
                </CallButton>
                <MapButton
                    href={kakaoMapEmbedUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaMapMarkerAlt />
                    지도 열기
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
                    <FaMap /> 네이버 지도 열기
                </NavButton>
                <NavButton
                    href={kakaoNaviUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaCar /> 카카오 네비 열기
                </NavButton>
                <NavButton
                    href={tMapUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    <FaMapSigns /> 티맵 열기
                </NavButton>
            </NavButtons>
        </Container>
    );
};

export default Location;
