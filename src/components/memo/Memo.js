import QuillEditorContainer from '../../containers/memo/QuillEditorContainer';

const Memo = ({onChangeTitle, createMemo, title, body}) => {

    return(
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
                    <div><button onClick={createMemo}>글 저장</button></div>
                    <div>글 삭제/</div>
                </div>
                <div className="viewer_title">
                    <input type="input" placeholder="제목을 입력하세요." onChange={onChangeTitle} />
                </div>
                <div className="viewer_date">
                    <span>2024-06-08 17:54:32</span>
                </div>
                <div className="viewer_content">
                    <QuillEditorContainer title={title} body={body} />
                    {/* <TextEditor /> */}
                </div>
            </div>
        </div>
    )
};

export default Memo;