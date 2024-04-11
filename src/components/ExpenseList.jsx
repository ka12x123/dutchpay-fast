import { expenseState } from "../recoilState/expense";
import { Table } from "react-bootstrap";
import {useRecoilValue} from "recoil";
import OverlayWrapper from "./shared/OverlayWrapper";
import styled from "styled-components";
export default function ExpenseList() {
    const expenses = useRecoilValue(expenseState);
    return (
        <OverlayWrapper minHeight={"71.5vh"}>
            <Table data-testid = 'expenseList' borderless hover responsive>
            <Styledtr>
                <tr>
                    <th>날짜</th>
                    <th>내용</th>
                    <th>결제자</th>
                    <th>금액</th>
                </tr>
            </Styledtr>
            <Styledbody>
                {expenses.map(({date, desc, amount, payer}, idx) => (
                    <tr key={idx}>
                        <td>{date}</td>
                        <td>{desc}</td>
                        <td>{parseInt(amount)} 원</td>
                        <td>{payer}</td>
                    </tr>
                ))}
            </Styledbody>
        </Table>  
        </OverlayWrapper>
    );
}
const Styledbody = styled.tbody`
    td{
        font-weight : 400;
        font-size: 24px;
        line-height : 59px;
    }   
`
const Styledtr = styled.thead`
    text-align: center;
    th{
        color : #6B3DA6;
        padding : 20px 8px;
        font-weight : 700;
        font-size : 22px;
        line-height : 29px;
    }
`