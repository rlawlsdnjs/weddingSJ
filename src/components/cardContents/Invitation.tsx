import { useEffect, useState } from "react";
import { styled } from "styled-components";
const InvitationText = styled.div`
    font-family: "Nanum Myeongjo", serif;
    font-size: 4.5vw;
    color: rgb(51, 51, 51);
    text-align: center;
    letter-spacing: 0em;
    line-height: 2.3em;
    word-break: keep-all;
`;
const Invitation = () => {
    const [dday, setDday] = useState<number | null>(null); // 🔹 D-Day 상태 추가

    useEffect(() => {
        // D-Day 계산 로직
        const weddingDate = new Date("2025-04-05");
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const diff = weddingDate.getTime() - today.getTime();
        const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));

        setDday(daysLeft);
    }, []);

    return (
        <div>
            {/* 🔹 D-Day 표시 */}
            <p className="dday-text">D - {dday !== null ? dday : "..."}</p>
            <InvitationText>
                서로가 마주보며 다져온 사랑을
                <br />
                이제 함께 한 곳을 바라보며
                <br />
                걸어갈 수 있는 큰 사랑으로 키우고자 합니다.
                <br />
                저희 두 사람이 사랑의 이름으로
                <br />
                지켜나갈 수 있게 앞날을
                <br />
                축복해 주시면 감사하겠습니다.
            </InvitationText>
        </div>
    );
};

export default Invitation;
