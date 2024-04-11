import styled from "styled-components";
import CenteredOverlayFrom from "./shared/CenteredOverlayFrom";
import { GroupMembersState } from "../recoilState/Groupmembers";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { InputTags } from 'react-bootstrap-tagsinput';
import { groupNameState } from "../recoilState/GroupName";
import { ROUTERS } from "../Router";
export default function AddMembers(){
    const navigate = useNavigate();
    const [GroupMembers, setGroupMembers] = useRecoilState(GroupMembersState);
    const GroupName = useRecoilValue(groupNameState);
    const [validated, setvalidated] = useState(false);
    function handleSubmit(e){
        e.preventDefault();
        setvalidated(true);
        if(GroupMembers.length > 0){
            navigate(ROUTERS.EXPENSE_MAIN)
        }
    }
    const header = `${GroupName} 그룹의 속한 사람들의 이름을 적어 주세요.`;
    return (
            <CenteredOverlayFrom 
                title = {header}
                validated={validated}
                handleSubmit={handleSubmit}
            >
            <InputTags placeholder="이름 간 뛰어 쓰기" values={GroupMembers} onTags={(value) => setGroupMembers(value.values)}/>
            {validated && GroupMembers.length === 0 && (<Spanerr> 이름을 쓰세요 </Spanerr>)}
            </CenteredOverlayFrom>

    );
}

const Spanerr = styled.span`
    color : red;
`