import Memo from "../../components/memo/Memo"
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialize, changeField, createMemo} from "../../modules/memo/write";
import { memoList, getMemo, initMemo, deleteMemo } from "../../modules/memo/memo";
import { updateMemo } from "../../modules/memo/write";
import Modal from '../../components/common/Modal';

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
    const [searchText, setSearchText] = useState('');
    const [modalOption, setModalOption] = useState(
        {
            show: false,
            message: ''
        }
    );

    const titleInput = useRef();

    useEffect(() => {
        dispatch(memoList({userEmail}));
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

    const searchMemo = useCallback(e => {
        if(searchText.trim().length !== 0 && searchText.trim().length < 2){
            setModalOption({show: true, message: '두 글자 이상 입력해 주세요.'});
            return;
        }

        dispatch(memoList({userEmail, searchText}));
    }, [userEmail, searchText, dispatch]);

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
    
    const onDeleteMemo = useCallback(() => {
        if(memo){
            dispatch(deleteMemo({memoId: memo.memoId, userEmail}));
            setSubject('');
        }
    }, [memo, userEmail, dispatch]);

    const closeModal = useCallback(() => {
        setModalOption({show: false, message: ''});
    }, []);

    return(
        <>
            <Memo 
                searchText={searchText}
                setSearchText={setSearchText}
                searchMemo={searchMemo}
                title={title}
                body={body}
                titleInput={titleInput}
                onInitMemo={onInitMemo}
                selectMemo={selectMemo}
                onSaveOrUpdate={onSaveOrUpdate}
                onChangeTitle={onChangeTitle}
                onDeleteMemo={onDeleteMemo}
                subject={subject}
                setSubject={setSubject}
                memo={memo}
                memos={memos}
            />
            {   modalOption.show &&
                <Modal onConfirm={closeModal} message={modalOption.message} />
            }
            
        </>
    );
};

export default MemoContainer;