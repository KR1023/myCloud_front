import styled from "styled-components"
import Button from "./Button";

const Background = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.3);
`;
const ModalBox = styled.div`
    width: 400px;
    height: 150px;
    z-index: 50;
    border: solid 1px #c8c8c8;
    background: rgba(212, 230, 241, .95);
    animation: 0.3s ease-in-out loadEffect1;
    .content{
        font-size: 1.25rem;
        font-weight: 700;
        text-align: center;
        margin-top: 1rem;
    }
    .btnContainer{
        display: flex;
        justify-content: flex-end;
        margin-top: 2rem;
        margin-right: 1rem;
    }

    @keyframes loadEffect1{
        0%{
           opacity: 0; 
        }
        100%{
            opacity: 1;
        }
    }
`;

const Modal = ({onConfirm}) => {
    return(
        <Background>
            <ModalBox>
                <div className="content">아이디와 비밀번호를 확인해 주세요.</div>
                <div className="btnContainer">
                    <Button onClick={onConfirm}>확인</Button>
                </div>
            </ModalBox>
        </Background>
        
    );
};

export default Modal;