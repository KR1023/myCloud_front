import Memo from "../../components/memo/Memo"
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialize, changeField, createMemo} from "../../modules/memo/write";
import { memoList, getMemo, initMemo } from "../../modules/memo/memo";
import { updateMemo } from "../../modules/memo/write";

const MemoContainer = () => {
    const dispatch = useDispatch();

    const { title, body, userEmail } = useSelector(({write, user}) => ({
        title: write.title,
        body: write.body,
        userEmail: user.user.email
    }));

    const { memos, memo } = useSelector(({memo}) => ({
        memos: memo.memos,
        memo: memo.memo
    }));

    const [subject, setSubject] = useState('');

    const titleInput = useRef();

    useEffect(() => {
        dispatch(memoList(userEmail));
        return(() => {
            dispatch(initialize());
        });
    }, [userEmail, dispatch]);

    const onChangeTitle = useCallback(e => {
        setSubject(e.target.value);
        dispatch(changeField({key: 'title', value: e.target.value}));
    }, [dispatch]);
    
    const onInitMemo = useCallback(e => {
        if(memo){
            titleInput.current.value = '';
        }
        dispatch(initMemo());
        dispatch(changeField({key: 'title', value: ''}));
        setSubject('');
    }, [memo, dispatch]);

    const selectMemo = memoId => {
        dispatch(getMemo(memoId));
    }

    useEffect(() => {
        if(memo)
            dispatch(changeField({key: 'title', value: memo.subject}));
    }, [memo, dispatch])

    const onSaveOrUpdate = useCallback(() => {
        if(!memo){
            if(title.length === 0)
                return;
            dispatch(createMemo({title, body, userEmail}));
        }else if(memo){
            const memoId = memo.memoId;
            dispatch(updateMemo({memoId, title, body, userEmail}));
        }
    }, [memo, title, body, userEmail, dispatch]);
    
    return(
        <Memo 
            title={title}
            body={body}
            titleInput={titleInput}
            onInitMemo={onInitMemo}
            selectMemo={selectMemo}
            onSaveOrUpdate={onSaveOrUpdate}
            onChangeTitle={onChangeTitle}
            subject={subject}
            setSubject={setSubject}
            memo={memo}
            memos={memos}
            />
    );
};

export default MemoContainer;