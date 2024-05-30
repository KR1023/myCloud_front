import styled from "styled-components"

const ButtonBlock = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    background: #61CBF4;
    cursor: pointer;
    font-weight: 600;
    font-size: 1.1rem;
    border-radius: 5px;
    &:hover{
        color: #fff;
    }
`;

const Button = ({onClick, children}) => {
    return(
        <ButtonBlock onClick={onClick}>{children}</ButtonBlock>
    );
};

export default Button;