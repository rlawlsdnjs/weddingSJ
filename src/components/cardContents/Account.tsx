import styled from "styled-components";

const SectionContainer = styled.div``;

const SectionTitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
`;

const AccountItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

const AccountItemTop = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;

const AccountName = styled.span`
    font-size: 16px;
`;

const CopyButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    padding: 2px 5px;
    &:hover {
        background-color: #0056b3;
    }
`;

interface AccountProps {
    section: string;
    accounts: { name: string; account: string }[];
}

const Account = ({ section, accounts }: AccountProps) => {
    const copyToClipboard = (account: string) => {
        navigator.clipboard.writeText(account);
        alert(`계좌번호가 복사되었습니다:\n${account}`);
    };

    return (
        <SectionContainer>
            <SectionTitle>{section}</SectionTitle>
            {accounts.map((acc, index) => (
                <AccountItem key={index}>
                    <AccountItemTop>
                        <AccountName>{acc.name}</AccountName>
                        <CopyButton
                            onClick={() => copyToClipboard(acc.account)}>
                            계좌번호 복사
                        </CopyButton>
                    </AccountItemTop>
                    <p>{acc.account}</p>
                </AccountItem>
            ))}
        </SectionContainer>
    );
};

export default Account;
