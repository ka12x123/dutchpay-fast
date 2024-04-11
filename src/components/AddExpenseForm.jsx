import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { GroupMembersState } from "../recoilState/Groupmembers";
import { expenseState } from "../recoilState/expense"
import styled from "styled-components";

export default function AddExpenseForm() {
  const addExpense = useSetRecoilState(expenseState);
  const expense = useRecoilValue(expenseState);
  const [validGroupName0, setValidGroupName0] = useState(false);
  const [validGroupName1, setValidGroupName1] = useState(false);
  const [validGroupName2, setValidGroupName2] = useState(false);
  const today = new Date();
  const [date, setDate] = useState(
    [
      today.getFullYear(),
      (today.getMonth() + 1).toString().padStart(2, '0'),
      today.getDate().toString().padStart(2, '0')
    ].join("-")
  );
  const [desc, setDesc] = useState('');
  const [amount, setAmount] = useState(0);
  const [payer, setPayer] = useState(null);
  const [validated, setValidated] = useState(false);

  const members = useRecoilValue(GroupMembersState);
  function handleSubmit(event) {
    event.preventDefault();
    const checkFormValidity = () => {
      const descCheck = desc.length > 0; //=== 같은 것 보다 이게 좋은 듯
      const payerCheck = payer !== null;
      const amountCheck = amount > 0;
      setValidGroupName0(descCheck);
      setValidGroupName1(amountCheck);
      setValidGroupName2(payerCheck);
      return descCheck && amountCheck && payerCheck
    }
    if (checkFormValidity()) {
      const newExpense = {
        date,
        desc,
        amount,
        payer,
      }
      addExpense(expense => [
        ...expense,
        newExpense,
      ])
      // 폼이 유효한 경우에 대한 처리
      // 예: 서버로 데이터 전송 
    }
    setValidated(true);
  }
  return (
    <StyledWrapper>
      <Form noValidate onSubmit={handleSubmit}>
        <StyleTitle>1. 비용 추가하기</StyleTitle>
        <Row>
          <Col xs={12}>
            <Form.Group>
              <Form.Control
                type="date"
                placeholder="결제한 날짜를 선택해 주세요"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="비용에 대한 설명을 입력해 주세요."
                isValid={validGroupName0}
                isInvalid={!validGroupName0 && validated}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <Form.Control.Feedback type="invalid" data-valid={validGroupName0}>
                비용 내용을 입력해 주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <Form.Group>
              <Form.Control
                type="number"
                placeholder="비용은 얼마 였나요?"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                isValid={validGroupName1}
                isInvalid={!validGroupName1 && validated}
              />
              <Form.Control.Feedback type="invalid" data-valid={validGroupName1}>
                1원 이상의 금액을 입력해 주셔야 합니다.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
         <Col xs={12} lg={6}> {/*  라지 일때는 반을 차지할것 */}
            <Form.Group>
              <Form.Select
                defaultValue=""
                onChange={(e) => setPayer(e.target.value)}
                isValid={validGroupName2}
                isInvalid={!validGroupName2 && validated}
                className="form-control form-control"
              >
                <option disabled value="">
                  누가 결제 했스무니까?
                </option>
                {members.map(member =>
                  <option key={member} value={member}>{member}</option>
                )}
              </Form.Select>
              <Form.Control.Feedback type="invalid" data-valid={validGroupName2}>
                결제자를 선택해 주세요.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Col xs={12}>
          <StyledSubmitButton>추가하기</StyledSubmitButton>
        </Col>
      </Form>
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  border-radius: 12px;
  padding: 17px;
  background-color: #683BA1;
  input, select {
    height : 40px;
    color : #F8F9FA;
    radius : 3px;
    background : #59359A;
    box-shadow : 1px 1px 3px rgba(0, 0, 0, 0.2);
    border-radius : 6px;
    border : 0px;
    margin-top: 10px;
    &:focus {
      color : #F8F9FA;
      background-color : #59359A;
      filter : brightness(85%);
    }
    &::placeholder {
      color : #F8F9FA;
    }
  }
`


export const StyleTitle = styled.h3`
  color : #FFFBFB;
  text-align : center;
  font-weight : 700;
  font-size : 34px;
  line-height : 50px;
  margin-bottom: 15px;
  letter-spacing : 0.25px;
`


const StyledSubmitButton = styled(Button).attrs({
  type: "submit"
})`
  margin-top : 15px;
  padding: 16px 32px;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  border: 0px; /* 여기가 수정되었습니다. */
  background-color : #E2D9F3;
  color : #59359A;
  gap: 8px;
  &:hover, &:focus {
    background-color : #E2D9F3;
    filter : rgba(0,0,0,0.5);
  }
`;