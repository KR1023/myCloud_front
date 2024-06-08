import Memo from "../../components/memo/Memo"
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialize, changeField, createMemo} from "../../modules/memo/write";

const MemoContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return(() => {
            dispatch(initialize());
        });
    }, [dispatch]);

    const { title, body, userEmail } = useSelector(({write, user}) => ({
        title: write.title,
        body: write.body,
        userEmail: user.user.email
    }));
    
    const onChangeTitle = useCallback(e => {
        dispatch(changeField({key: 'title', value: e.target.value}));
    }, [dispatch]);

    const onCreateMemo = useCallback(() => {
        dispatch(createMemo({title, body, userEmail}));
    }, [title, body, userEmail, dispatch]);

    return(
        <Memo title={title} body={body} createMemo={onCreateMemo} onChangeTitle={onChangeTitle} />
    );
};

export default MemoContainer;