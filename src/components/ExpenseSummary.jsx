import { useRecoilValue } from "recoil"
import { expenseState } from "../recoilState/expense"
import { GroupMembersState } from "../recoilState/Groupmembers"
import styled from "styled-components"
import {StyleTitle} from "./AddExpenseForm"

export const calculateMinimumTransaction = (expense, members, amountPerPerson) => {
    const miniumTransactions = []

    if (amountPerPerson === 0){
        return miniumTransactions
    }
    // 1. 사람별로 냈어야 할 금액 
    const membersToPay = {}
    members.forEach(member => {
        membersToPay[member] = amountPerPerson
    })
    // 2. 사람별로 냈어야 할 금액 업데이트
    expense.forEach(({payer, amount}) => {
        membersToPay[payer] -= amount
    })
    const sortmembersToPay = Object.keys(membersToPay)
    .map((member) => (
        {member : member, amount : membersToPay[member]}
    ))
    .sort((a, b) => a.amount - b.amount)
    var left = 0
    var right = sortmembersToPay.length -1
    while(left < right){
        while(left < right && sortmembersToPay[left].amount === 0){
            left++
        }
        while(left < right && sortmembersToPay[right].amount === 0){
            right--
        }
        const toReceive = sortmembersToPay[left]
        const toReceiveAmount = Math.abs(toReceive.amount)
        const sender = sortmembersToPay[right]
        const senderAmount = Math.abs(sender.amount)
        if(toReceiveAmount < senderAmount){
            miniumTransactions.push({   
                receiver : toReceive.member,
                sender : sender.member,
                amount : toReceiveAmount,
            })
            toReceive.amount = 0
            sender.amount -= toReceiveAmount
            left++
        }
        else{
            miniumTransactions.push({
                receiver : toReceive.member,
                sender : sender.member,
                amount : senderAmount,
            })
            sender.amount = 0
            toReceive.amount += senderAmount
            right--
        }
    }
    return miniumTransactions

}
export default function ExpenseSummary(){
    const expenses = useRecoilValue(expenseState)
    const groupMembers = useRecoilValue(GroupMembersState)
    const totalExpenseAmount = parseInt(expenses.reduce((a, c) => a + parseInt(c.amount), 0)) 
    const people = groupMembers.length
    const amountPerPerson = totalExpenseAmount / people
    const miniumTransaction = calculateMinimumTransaction(expenses, groupMembers, amountPerPerson)
    return(
        <StyledWrapper>
            <StyleTitle>2. 정산은 이렇게!</StyleTitle>
            {totalExpenseAmount > 0 && people > 0 && (
                <div>
                    <StyledSumary>
                        <span>{people} 명이서 총 {totalExpenseAmount} 원 지출</span>
                        <br></br>
                        <span>한 사람당 {amountPerPerson} 원</span>
                    </StyledSumary>
                    <Styledul>
                    {
                        miniumTransaction.map(({receiver, sender, amount}, index) =>
                        <li key={index}>
                        <span>{sender}이 {receiver}에게 {amount} 원 보내야함</span>
                        </li>
                        )
                    }
                    </Styledul>
                </div>
            )}
        </StyledWrapper>
    );
}
const StyledSumary = styled.div`
    margin-top : 21px;
`
const StyledWrapper = styled.div`
    padding: 32px;
    background-color: #683BA1;
    color: white;
    box-shadow: 2px 0px 3px rgba(0, 0, 0, 0.2);
    border-radius: 9px;
    text-align: center;
    font-size: 15px;
`
const Styledul = styled.ul`
    margin-top : 21px;
    font-weight : 600;
    line-height : 200%;
    list-style-type : disclosure-closed;
    li::marker {
        animation : blinker 2s linear infinite;
    }
    @keyframes blinker {
        50% {
            opacity : 0;
        }
    }
`