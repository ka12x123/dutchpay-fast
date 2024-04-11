import styled from "styled-components";

export default function OverlayWrapper({children, padding, minHeight}){
    return(
        <StyledComponent padding={padding} minHeight={minHeight}>{children}</StyledComponent>
    );
}

const StyledComponent = styled.div`
    padding: ${(props) => props.padding || "4vw"};
    border-radius: 10px;
    background-color : white;
    filter : drop-shadow(0px 4px 4px rgba(0,0,0,0.25));
    min-height : ${(props) => props.minHeight || '0'};
`