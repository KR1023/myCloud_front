import styled from "styled-components"

const ButtonBlock = styled.div`
    width: 100px;
    height: 25px;
    background: cyan;
    text-align: center;
    cursor: pointer;
`;

const Button = ({onClick, children}) => {
    return(
        <ButtonBlock onClick={onClick}>{children}</ButtonBlock>
    );
};

export default Button;