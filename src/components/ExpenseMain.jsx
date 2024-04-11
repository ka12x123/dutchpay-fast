import { Col, Container, Row } from "react-bootstrap";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseList from "./ExpenseList";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { groupNameState } from "../recoilState/GroupName";
import ExpenseSummary from "./ExpenseSummary";
import ServiceLogo from "./shared/ServiceLogo";
export default function ExoenseMain(){
    return(
        <Container fluid>
            {/* Row Col 을 통해 나눌 수 있음 */}
            <Row> 
                <Col xs={12} sm={5} md={4}>
                    <LeftPane />
                </Col>
                <Col>
                    <RightPane />
                </Col>
            </Row>
        </Container>
    );
}
function LeftPane(){ 
    return(
        <Container>
            {/* Row 는 flex 형태여서 flex 코드 사용가능 */}
            <StyledRow>
                <Row>
                    <ServiceLogo />
                </Row>
                <Row>
                    <AddExpenseForm />
                </Row>
                <Row>
                    <ExpenseSummary />
                </Row>
            </StyledRow>
        </Container>
        
    );
}

const RightPane = () => { //중괄호는 return 값이 있을 때 사용하며 없을 때는 소괄호를 사용함 ( 위 코드보다 코드 양이 적네 )
    const groupName = useRecoilValue(groupNameState);
        return(
        <StyledCotainer>
        <Row>
            <Styledh21>{groupName || "그룹 선택이 안됨 ㅅㄱ"}</Styledh21>
        </Row>
        <Row>
            <ExpenseList />
        </Row>
        </StyledCotainer>
    );
}

const StyledRow = styled(Row)`
    gap : 3.3vh;
    padding-top : 55px;
    margin-right: 40px;
    margin-left: 40px;
    justify-content: center;
` 

const Styledh21 = styled.h2`
    margin-bottom: 55px;
    font-weight : 700;
    font-size : 45px;
    line-height : 38px;
    text-align : center;
`
const StyledCotainer = styled(Container)`
padding : 60px 31px 100px 31px;
margin-bottom : 0px;
`