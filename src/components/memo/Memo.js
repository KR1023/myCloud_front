import { useEffect, useState } from 'react';
import QuillEditorContainer from '../../containers/memo/QuillEditorContainer';
import returnDateString from '../../lib/returnDateString';

const Memo = ({onChangeTitle, createMemo, selectMemo, title, body, memo, memos }) => {

    const [subject, setSubject] = useState('');

    useEffect(() => {
        if(memo)
            setSubject(memo.subject);
    }, [memo]);

    const onChangeSubject= e => {
        setSubject(e.target.value);
    }

    return(
        <div className="memo">
            <div className="list">
                <div className="search">
                    <input type="text" name="search_memo" placeholder="메모 찾기"/>
                    <button></button>
                </div>
                <div className="memo_list">
                    { memos && 
                        memos.map(memo => 
                            <div className="content" key={memo.memoId} onClick={() => selectMemo(memo.memoId)}>
                                <div className="memo_title">{memo.subject}</div>
                                <div className="memo_content">{memo.content.replace(/(<([^>]+)>)/ig, '')}</div>
                                <div className="memo_date">{memo.updatedDt ? returnDateString(memo.updatedDt) : returnDateString(memo.createdDt)}</div>
                            </div>        
                        )
                    }
                </div>
            </div>
            <div className="viewer">
                <div className="toolbar">
                    <div><button className='add_memo'></button></div>
                    <div><button className='save_memo' onClick={createMemo}></button></div>
                    <div><button className='delete_memo'></button></div>
                </div>
                <div className="viewer_title">
                    { memo ? 
                        (<input type="input" placeholder="제목을 입력하세요." value={subject} onChange={(e) => {onChangeTitle(e); onChangeSubject(e)}} />) : 
                        (<input type="input" placeholder="제목을 입력하세요." onChange={onChangeTitle} />)
                    }
                </div>
                <div className="viewer_date">
                    {   memo ?
                        (<span>{memo.updatedDt ? new Date(memo.updatedDt).toLocaleString() : new Date(memo.createdDt).toLocaleString()}</span>) :
                        (<span>{new Date().toLocaleDateString()}</span>)
                    }
                    
                </div>
                <div className="viewer_content">
                    <QuillEditorContainer title={title} body={body} memo={memo} />
                    {/* <TextEditor /> */}
                </div>
            </div>
        </div>
    )
};

export default Memo;