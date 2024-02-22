import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateGroup } from "./CreateGroup";

describe("그룹 생성 페이지", () => {
  function renderComponent() {
    render(<CreateGroup />);
    const input = screen.getByPlaceholderText("2022 제주도 여행");
    const btn = screen.getByText("저장");
    const errmessage = screen.getByText("그룹 이름을 입력해주세요.");

    return { input, btn, errmessage };
  }

  test("그룹 이름 입력 페이지가 렌더링 되는가?", () => {
    const { input, btn } = renderComponent();
    expect(input).not.toBeNull();
    expect(btn).not.toBeNull();
  });

  test("그룹 이름 입력 메시지에 아무것도 입력하지 않을 시 반환되는 메시지가 뜨는가?", async () => {
    const { btn, errmessage } = renderComponent();
    await userEvent.click(btn);
    expect(errmessage).not.toBeNull();
  });

  test("그룹 이름을 입력하고 저장버튼을 누를 시 저장이 잘 되는가?", async () => {
    const { input, btn, errmessage } = renderComponent();
    await userEvent.type(input, "돈키맨 그룹");
    await userEvent.click(btn);
    expect(errmessage).toBeNull();
  });
});
