import { styled } from "styled-components";

const Transportation = () => {
    return (
        <TransportationWrap>
            <TransportationTitle>오시는 길</TransportationTitle>
            <Section>
                <Heading>지하철</Heading>
                <List>
                    <ListItem>3호선 백석역 5번출구(150m)</ListItem>
                    <ListItem>
                        LG전자 베스트샵 지나 정면건물
                        <br />
                        (남정골드프라자 10층)
                    </ListItem>
                </List>
            </Section>
            <Section>
                <Heading>버스</Heading>
                <List>
                    <ListItem>
                        일반 : 05,8, 66, 76, 88, 90, 95, 96, 150, 780
                    </ListItem>
                    <ListItem>좌석 : 108, 770, 830, 871</ListItem>
                    <ListItem>직행 : 200, 3300, 8109, 8407, 9700</ListItem>
                    <ListItem>
                        B : 700, R : 9707, 9711, G : 7727, M : 7412
                    </ListItem>
                </List>
            </Section>
            <Section>
                <Heading>자가용</Heading>
                <List>
                    <ListItem>
                        2시간 무료(이후 발생하는 요금은 개별 정산)
                    </ListItem>
                    <ListItem>
                        1. 네비게이션 - 천년컨벤션웨딩홀 또는 CN천년웨딩홀
                        일산점
                    </ListItem>
                    <ListItem>
                        2. 천년컨벤션 웨딩홀 상가 1층, 지하 1,2층
                        <br /> 주차장 만차 시 주차요원의 안내에 따라 이동
                    </ListItem>
                    <ListItem>
                        3. 외부 주차장(고양터미널 지하 4층)
                        <br />
                        이용 시 웨딩홀 셔틀버스 운영
                    </ListItem>
                    <ListItem>가급적 대중교통 이용 권장</ListItem>
                </List>
            </Section>
        </TransportationWrap>
    );
};

export default Transportation;

const TransportationWrap = styled.div`
    font-family: "Nanum Myeongjo", serif;
    color: #666;
    padding: 0 20px;
`;
const TransportationTitle = styled.h2`
    font-size: 1.1rem;
    font-weight: bold;
`;

const Section = styled.div`
    padding-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #ddd;

    &:last-child {
        border: none;
    }
`;

const Heading = styled.h3`
    font-size: 1rem;
    font-weight: bold;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
    margin-top: 10px;
`;
const ListItem = styled.li`
    font-size: 0.8rem;
    line-height: 1.5;
    margin-top: 5px;
`;
