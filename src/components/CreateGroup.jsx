import { Form } from "react-bootstrap";
import CenteredOverlayFrom from "./shared/CenteredOverlayFrom"
import { useRecoilState } from 'recoil'
import { useState } from "react";
import { groupNameState } from "../recoilState/GroupName";
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from "../Router";
export default function CreateGroup() {
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [ validGroupName, setValidGroupName] = useState(false);
    const [GroupName , setGroupName] = useRecoilState(groupNameState);
    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity()) {
            navigate(ROUTERS.ADD_MEMBERS)
            setValidGroupName(true);
        } else {
            event.stopPropagation();
            setValidGroupName(false);
        }
        setValidated(true);
    }
    return (
        <CenteredOverlayFrom
            title="먼저, 더치 페이 할 그룹의 이름을 정해볼까요?"
            validated={validated}
            validGroupName={GroupName}
            handleSubmit={handleSubmit}
        >
            <Form.Group controlId="validationGroupName">
                <Form.Control type="text" required placeholder="2022 제주도 여행" onChange={(e) => setGroupName(e.target.value)} />
                <Form.Control.Feedback type="invalid" data-valid={validGroupName}>그룹 이름을 입력해 주세요.
                </Form.Control.Feedback>
            </Form.Group>
        </CenteredOverlayFrom>
    );
}