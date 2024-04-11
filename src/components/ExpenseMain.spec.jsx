import { RecoilRoot } from "recoil";
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import ExpenseMain from "./ExpenseMain";
import '@testing-library/jest-dom';
const renderComponent = () => {
    render(
        <RecoilRoot>
            <ExpenseMain/> 
        </RecoilRoot>
    );
        
    const dateInput = screen.getByPlaceholderText(/결제한 날짜/i); // 이런 식으로 플레이스 홀더를 test 해즘
    const descInput = screen.getByPlaceholderText(/비용에 대한 설명/i);
    const amountInput = screen.getByPlaceholderText(/비용은 얼마/i);
    const payerInput = screen.getByDisplayValue(/누가 결제/i);
    
    const addButton = screen.getByText("추가하기");
    const descErrorMessage = screen.getByText('비용 내용을 입력해 주세요.');
    const payerErrorMessage = screen.getByText('결제자를 선택해 주세요.');
    const amountErrorMessage = screen.getByText('1원 이상의 금액을 입력해 주셔야 합니다.');

    return{
        dateInput, 
        descInput,
        amountInput,
        payerInput,
        addButton,
        descErrorMessage,
        payerErrorMessage,
        amountErrorMessage
    };
}

describe("비용 정산 메인 페이지", () => {
    describe('비용 추가 컴포넌트', () => {
        test('비용 추가 컴포넌트 렌더링', () => {
            const {dateInput, descInput, amountInput, payerInput, addButton} = renderComponent();
            expect(dateInput).toBeInTheDocument();
            expect(descInput).toBeInTheDocument();
            expect(amountInput).toBeInTheDocument();
            expect(payerInput).toBeInTheDocument();
            expect(addButton).toBeInTheDocument();
        })
        test('필수 비용 입력 값을 채우지 않고 "추가" 버튼 클릭시, 에러 메시지 노출', async () => {
            const {addButton, descErrorMessage, payerErrorMessage, amountErrorMessage} = renderComponent();
            await userEvent.click(addButton);

           
            expect(descErrorMessage).toBeInTheDocument(); 
            
            expect(payerErrorMessage).toBeInTheDocument();
            
            expect(amountErrorMessage).toBeInTheDocument();
        })
        test('비용 추가에 필수적인 값들을 입력한 후 "추가" 버튼 클릭시, 저장에 성공', async () => {
            const { descInput, amountInput, payerInput, addButton, descErrorMessage, payerErrorMessage, amountErrorMessage } = renderComponent();
            await userEvent.type(descInput, '장보기');
            await userEvent.type(amountInput, '3000');
            await userEvent.selectOptions(payerInput, '영숙이'); //테스트 돌리기 전에 payerList (멤버들 이름)을 셋업해야 함 
            await userEvent.click(addButton);

            expect(descErrorMessage).toHaveAttribute('data-valid', "true"); 
            expect(payerErrorMessage).toHaveAttribute('data-valid', "true");
            expect(amountErrorMessage).toHaveAttribute('data-valid', "true");

        })
    })
    describe("비용 리스트 컴포넌트", () => {
        test('비용 리스트 컴포넌트가  렌더링 되는가?', () => {
            renderComponent();
            const expenseListComponent = screen.getByTestId('expenseList');
            expect(expenseListComponent).toBeInTheDocument();
        })
    })
    describe("정산 결과 컴포넌트", () => {
        renderComponent()
        const component = screen.getByText(/정산은 이렇게/i)
        expect(component).toBeInTheDocument();

    })
    describe('새로운 비용이 입력 되었을 때,', () => {
        const addNewExpense = async () => {
            const {dateInput, descInput, amountInput, payerInput, addButton} =renderComponent();
            await userEvent.type(descInput, '장보기');
            await userEvent.type(dateInput, '2024-03-04');
            await userEvent.type(amountInput, '30000');
            await userEvent.selectOptions(payerInput, '영숙이');
            await userEvent.click(addButton);
        }
        
        test('비용 데이터 존재할 경우, 날짜, 내용, 결제자, 금액 데이터가 보여지는가?', async () => {
            await addNewExpense();
            const expenseListComponent = screen.getByTestId('expenseList');
            const dateValue = within(expenseListComponent).getByText('2024-03-04');
            expect(dateValue).toBeInTheDocument();
            const descValue = within(expenseListComponent).getByText('장보기');
            expect(descValue).toBeInTheDocument();
            const payerValue = within(expenseListComponent).getByText('영숙이');
            expect(payerValue).toBeInTheDocument();
            const amountValue = within(expenseListComponent).getByText('30000 원');
            expect(amountValue).toBeInTheDocument();

        })
        test('정산 결과 또한 업데이트가 된다. ', async () => {
            await addNewExpense();

            const totalText = screen.getByText(/2명 - 총 30000 원 지출/i)
            expect(totalText).toBeInTheDocument()
            const  transactionText = screen.getByText(/영희가 영수에게 15000원/i)
            expect(transactionText).toBeInTheDocument()

        })
    })

})

