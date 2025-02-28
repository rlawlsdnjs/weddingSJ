import { ReactNode } from "react";
import Account from "../components/cardContents/Account";
import Gallery from "../components/cardContents/Gallery";
import Invitation from "../components/cardContents/Invitation";
import Location from "../components/cardContents/Location";
import Transportation from "../components/cardContents/Transportation";
import Dday from "../components/Dday";
import { BANK_ACCOUNTS } from "./BANK_ACCOUNT";

// 프로젝트 데이터 타입 정의 (타입스크립트 사용 시)
interface CardProps {
    title: string;
    color: string;
    childrenNode?: ReactNode;
}

// 프로젝트 배열
export const CARD_ARRAY: CardProps[] = [
    {
        title: "Gallery",
        // color: "linear-gradient(to bottom, #f5fbe8 10%, #ffffff 90%)", // 연한 레몬그린 (싱그러운 봄 느낌)
        color: "#ffffff",
        childrenNode: <Gallery />,
    },
    {
        title: "마음 전하실 곳",
        // color: "linear-gradient(to bottom, #fefaf0 10%, #ffffff 90%)", // 연한 크림 베이지 (따뜻하고 부드러운 느낌)
        color: "#ffffff",

        childrenNode: (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                }}>
                {BANK_ACCOUNTS.map((group, index) => (
                    <Account key={index} {...group} />
                ))}
            </div>
        ),
    },
    {
        title: "Location",
        // color: "linear-gradient(to bottom, #eafbee 10%, #ffffff 90%)", // 연한 민트색 (봄의 신선한 느낌)
        color: "#ffffff",
        childrenNode: (
            <Location
                address="경기도 고양시 일산동구 중앙로 1080, 10층"
                subAddress="(백석동 1288-2)"
                placeName="천년컨벤션 웨딩홀"
                phoneNumber="031-811-7000"
            />
        ),
    },
];
