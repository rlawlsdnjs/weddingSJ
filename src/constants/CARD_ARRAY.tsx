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
        color: "rgba(255,255,255,1)",
        childrenNode: <Invitation />,
    },
    {
        title: "Account",
        color: "rgba(255,255,255,1)",
        childrenNode: (
            <>
                {BANK_ACCOUNTS.map((group, index) => (
                    <Account key={index} {...group} />
                ))}
            </>
        ),
    },

    {
        title: "Location",
        color: "rgba(255,255,255,1)",
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
        color: "rgba(255,255,255,1)",
        childrenNode: <Gallery />,
    },
];
