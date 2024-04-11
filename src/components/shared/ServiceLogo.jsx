import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { ROUTERS } from "../../Router";
export default function ServiceLogo(){
    const navigate = useNavigate();
    return(
        <StyledHeader onClick={() => navigate(ROUTERS.CREATE_GROUP)}>Dutch Pay</StyledHeader>
    )
}
const StyledHeader = styled.h1`
    font-weight: 200;
    letter-spacing: 10px;
    cursor: pointer;
    color : slateblue;
    text-align: center;
    margin-bottom : 0.2em;
    padding-bottom:13px;
`;
 