import { Flower } from "lucide-react";
import styled from "styled-components";

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
`;

const SectionTitle = styled.h3<{ isGroom: boolean }>`
    display: flex;
    align-items: center;
    gap: 1px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    background-color: #e9e9e9;
    color: ${({ isGroom }) =>
        isGroom ? "#000987" : "#750000"}; /* 연한 파랑, 연한 핑크 */
    padding: 3px 10px;
    font-family: "Nanum Myeongjo", serif;
    & > span {
        margin-top: 2px;
    }
`;

const AccountList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
`;

const AccountItem = styled.li<{ isFirst: boolean }>`
    display: flex;
    flex-direction: column;
    padding: 8px 12px;
    background: #f9f9f9;
    border-top: 1px solid #e9e9e9;
    gap: 5px;
`;

const AccountItemTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: "Noto Sans KR", sans-serif;
    letter-spacing: -0.02em;
`;

const AccountName = styled.span`
    font-size: 13px;
    color: #444;
`;

const AccountNumber = styled.p`
    font-size: 13px;
    margin-top: 2px;
    color: #666;
`;

const CopyButton = styled.button`
    background-color: #fff;
    color: #666;
    border: 1px solid #ddd;
    border-radius: 15px;
    cursor: pointer;
    font-size: 12px;
    padding: 8px 15px;
    transition: background 0.2s;
    width: max-content;
    font-weight: 900;
    &:hover {
        background-color: #0056b3;
    }
    margin: 0 auto;
`;

interface AccountProps {
    section: string;
    accounts: { name: string; account: string }[];
    isGroom: boolean; // 신랑측인지 신부측인지를 나타내는 prop
}

const Account = ({ section, accounts, isGroom }: AccountProps) => {
    const copyToClipboard = (account: string) => {
        navigator.clipboard.writeText(account);
        alert(`계좌번호가 복사되었습니다:\n${account}`);
    };

    return (
        <SectionContainer>
            <SectionTitle isGroom={isGroom}>
                <Flower size={15} />
                <span>{section}</span>
            </SectionTitle>
            <AccountList>
                {accounts.map((acc, index) => (
                    <AccountItem key={index} isFirst={index === 0}>
                        <AccountItemTop>
                            <AccountName>{acc.name}</AccountName>
                            <AccountNumber>{acc.account}</AccountNumber>
                        </AccountItemTop>
                        <CopyButton
                            onClick={() => copyToClipboard(acc.account)}>
                            계좌 번호 복사
                        </CopyButton>
                    </AccountItem>
                ))}
            </AccountList>
        </SectionContainer>
    );
};

export default Account;
