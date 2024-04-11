import styled from "styled-components"
import {Button, Container, Form, Row} from "react-bootstrap"
import OverlayWrapper from "./OverlayWrapper";
import ServiceLogo from "./ServiceLogo"
export default function CenteredOverlayFrom({title, children, validated, handleSubmit}){
    return(
        <CentralizedContainer>
        <ServiceLogo />
        <OverlayWrapper>
            <Container>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}> {/* 값이 없으면 그룹 이름 적어 뜨고, 있으면 체크 뜨게 해주는 건 bootsrtap에서 알아서 해주는 듯*/}
                        <StyledRow>
                            <Row className="align-items-start">
                                <StyledH2>{title}</StyledH2>
                            </Row>
                            <Row className="align-items-center">
                                {children}
                            </Row>
                            <Row className="align-items-end">
                                <Styledbtn>저장</Styledbtn>
                            </Row>
                        </StyledRow> 
                    </Form>
            </Container>
        </OverlayWrapper>
        </CentralizedContainer>
    );

}
const CentralizedContainer = styled(Container)`
    width: 40vw;
    //화면의 50% 차지
    min-height: 100vh;
    //최소 화면에 100퍼센트여야한다.
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    gap: 10px;
`;
const StyledH2 = styled.h2`
    font-weight: 550;
    line-height : 40px;
    overflow-wrap : break-word; //화면을 줄일 때 부드럽게 가능
    word-break : keep-all;     //단어 단위로 끊음
    letter-spacing : 3px;
`

const Styledbtn = styled(Button).attrs(  {//styled 도 컴포넌트이다 보니까 무조건 첫 글자가 대문자여야함
    type : "submit"
})`       
    background-color : #6610F2;
    border-radius : 10px;
    border : none;
    &:hover{
        background-color : #6610F2;
        filter : brightness(80%); //brightness(80%)는 요소의 밝기를 80%로 조절하라는 의미
    }
`
//export 만 붙이면 다른 파일에서 사용가능하다니...
const StyledRow = styled(Row)` // React-bootstrap 에 있거나 존재 했던 것을 상속받아 바꿀 떄는 이런 식으로 괄호 안에 쓰고, 아닐 때는 .을 붙여서 만든다. 
    align-items : center;
    justify-content : center;
    height: 60vh;
`

