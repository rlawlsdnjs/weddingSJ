import { ReactNode } from "react";
import Account from "../components/cardContents/Account";
import Gallery from "../components/cardContents/Gallery";
import Invitation from "../components/cardContents/Invitation";
import Location from "../components/cardContents/Location";
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
        title: "Invitation",
        color: "linear-gradient(to bottom, #fff9d9 10%, #ffffff 90%)", // 연한 노랑
        childrenNode: <Invitation />,
    },

    {
        title: "Location",
        color: "linear-gradient(to bottom, #d8f5e4 10%, #ffffff 90%)", // 연한 초록색
        childrenNode: (
            <Location
                address="경기도 고양시 일산동구 중앙로 1080, 10층 (백석동 1288-2)"
                placeName="천년컨벤션웨딩홀"
                phoneNumber="031-811-7000"
            />
        ),
    },
    {
        title: "Gallery",
        color: "linear-gradient(to bottom, #d5f0d1 10%, #ffffff 90%)", // 연한 초록색
        childrenNode: <Gallery />,
    },
    {
        title: "Account",
        color: "linear-gradient(to bottom, #fef9e6 10%, #ffffff 90%)", // 연한 녹색
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
];
