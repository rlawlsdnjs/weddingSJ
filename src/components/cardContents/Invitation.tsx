import { useEffect, useState } from "react";
import { styled } from "styled-components";

const InvitationWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;
const InvitationText = styled.div`
    font-family: "Nanum Myeongjo", serif;
    font-size: 2rem;
    color: rgb(51, 51, 51);
    text-align: center;
    letter-spacing: 0em;
    line-height: 2.3em;
    word-break: keep-all;
`;
const Invitation = () => {
    return (
        <InvitationWrap>
            <InvitationText>
                서로가 마주보며 다져온 사랑을
                <br />
                이제 함께 한 곳을 바라보며
                <br />
                걸어갈 수 있는
                <br />
                큰 사랑으로 키우고자 합니다.
                <br />
                저희 두 사람이 사랑의 이름으로
                <br />
                지켜나갈 수 있게 앞날을
                <br />
                축복해 주시면 감사하겠습니다.
            </InvitationText>
        </InvitationWrap>
    );
};

export default Invitation;
