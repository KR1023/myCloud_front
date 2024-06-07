import { useRef, useCallback } from 'react';
import '../css/Workspace.scss';
import close from '../../svgs/close.svg';

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

    return(
        <div className="Workspace" ref={background} onClick={selectBackground}>
            <div className="wrapper workspace" ref={workspace} onClick={selectWorkspace}>
                <div className="title" onMouseDown={mouseDown} onMouseUp={mouseUp}>
                    <span>{title}</span>
                    <div className="btn_exit" onClick={closeWorkspace}></div>
                </div>
            </div>
        </div>
    );
};

export default Workspace;