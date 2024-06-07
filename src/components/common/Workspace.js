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
            <div className="wrapper" ref={workspace} onClick={selectWorkspace}>
                <div className="title" onMouseDown={mouseDown} onMouseUp={mouseUp}>
                    <span>{title}</span>
                    <div className="btn_exit" onClick={closeWorkspace}></div>
                </div>
                {
                    title === 'memo' &&
                    <div className="memo">
                        <div className="list">
                            <div className="search">
                                <input type="text" name="search_memo" placeholder="메모 찾기"/>
                                <button></button>
                            </div>
                            <div className="memo_list">
                                <div className="content">
                                    <div className="memo_title">제목</div>
                                    <div className="memo_content">테스트 메모를 작성했습니다...테스트 메모를 작성했습니다...테스트 메모를 작성했습니다...테스트 메모를 작성했습니다...</div>
                                    <div className="memo_date">2024.06.07</div>
                                </div>
                            </div>
                        </div>
                        <div className="viewer">
                            <div className="toolbar">
                                <div>되돌리기/</div>
                                <div>다시 실행하기/</div>
                                <div>새 글 작성/</div>
                                <div>저장/</div>
                                <div>글 삭제/</div>
                            </div>
                            <div className="viewer_title">제목</div>
                            <div className="viewer_content">테스트 메모를 작성했습니다...테스트 메모를 작성했습니다...테스트 메모를 작성했습니다...테스트 메모를 작성했습니다...</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Workspace;