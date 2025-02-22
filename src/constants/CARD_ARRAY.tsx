import { ReactNode } from "react";
import Invitation from "../components/cardContents/Invitation";

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
        childrenNode: <Invitation />,
    },

    {
        title: "Zissou",
        color: "rgba(255,255,255,1)",
        childrenNode: <Invitation />,
    },
    {
        title: "Mathias Svold and Ulrik Hasemann",
        color: "rgba(255,255,255,1)",
        childrenNode: <Invitation />,
    },
];
