import Memo from "../../components/memo/Memo"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialize, changeField, createMemo} from "../../modules/memo/write";
import { memoList, getMemo } from "../../modules/memo/memo";

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

    useEffect(() => {
        dispatch(memoList(userEmail));
        return(() => {
            dispatch(initialize());
        });
    }, [userEmail, dispatch]);

    const onChangeTitle = useCallback(e => {
        dispatch(changeField({key: 'title', value: e.target.value}));
    }, [dispatch]);

    const selectMemo = memoId => {
        // console.log(memoId);
        // console.log('메모 선택');
        dispatch(getMemo(memoId));
    }

    useEffect(() => {
        if(memo)
            dispatch(changeField({key: 'title', value: memo.subject}));
    }, [memo, dispatch])

    const onCreateMemo = useCallback(() => {
        dispatch(createMemo({title, body, userEmail}));
    }, [title, body, userEmail, dispatch]);
    
    return(
        <Memo 
            title={title}
            body={body}
            selectMemo={selectMemo}
            createMemo={onCreateMemo}
            onChangeTitle={onChangeTitle}
            memo={memo}
            memos={memos}
            />
    );
};

export default MemoContainer;