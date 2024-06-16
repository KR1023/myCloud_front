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
    z-index: 30;
`;
const ModalBox = styled.div`
    width: 380px;
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    z-index: 50;
    border: solid 1px #c8c8c8;
    border-radius: 15px;
    background: rgba(248, 249, 249);
    animation: 0.3s ease-in-out loadEffect1;

    .content{
        width: 100%;
        margin-top: 20px;
        display: flex;
        justify-content: center;
        font-size: 1.25rem;
        font-weight: 700;
    }
    .btn_container{
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 15px;
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

const Modal = ({type = 'info', onConfirm, proceed,  message}) => {
    return(
        <Background>
            <ModalBox>
                <div className="content"><span>{message}</span></div>
                <div className="btn_container">
                    {
                        type === 'info' && 
                        <Button onClick={onConfirm}>확인</Button>
                    }
                    { type !== 'info' &&
                        <Button onClick={proceed}>확인</Button>
                    }
                    { type !== 'info' &&
                        <Button onClick={onConfirm}>취소</Button>
                    }
                </div>
            </ModalBox>
        </Background>
        
    );
};

export default Modal;