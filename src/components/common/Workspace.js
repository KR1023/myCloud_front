import { useRef, useCallback } from 'react';
import '../css/Workspace.scss';
import close from '../../svgs/close.svg';
import MemoContainer from '../../containers/memo/MemoContainer';
import Photo from '../photo/Photo';


const Workspace = ({title, closeWorkspace}) => {
    const background = useRef();
    const workspace = useRef();

    let offsetX, offsetY;

    const selectBackground = e => {
        background.current.style.zIndex = 1;
    };

    const selectWorkspace = e => {
        e.stopPropagation();
        background.current.style.zIndex = 10;
    }

    const mouseDown = e => {
        const top = workspace.current.offsetTop;
        const left = workspace.current.offsetLeft;

        offsetX = e.clientX - left;
        offsetY = e.clientY - top;

        document.addEventListener("mousemove", mouseMove);
    };

    const mouseMove = (e) => {
        workspace.current.style.top = `${e.clientY - offsetY}px`;
        workspace.current.style.left = `${e.clientX - offsetX}px`;
    }

    const mouseUp = (e) => {
        document.removeEventListener('mousemove', mouseMove);
    }

    /*
        에디터 사용 시 
        <div className="viewer"> 의 onClick 이벤트에
    */
    const focusOnEditor = e => {
        const editorBox  = document.getElementById('editor_box');
        editorBox.focus();
    }

    return(
        <div className="Workspace" ref={background} onClick={selectBackground}>
            <div className="wrapper" ref={workspace} onClick={selectWorkspace}>
                <div className="title" onMouseDown={mouseDown} onMouseUp={mouseUp}>
                    <span>{title}</span>
                    <div className="btn_exit" onClick={closeWorkspace}></div>
                </div>
                {
                    title === '메모' &&
                    <MemoContainer />
                }
                {
                    title === '사진' &&
                    <Photo />
                }
            </div>
        </div>
    );
};

export default Workspace;