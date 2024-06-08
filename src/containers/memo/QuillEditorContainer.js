import { useDispatch, useSelector } from "react-redux";
import QuillEditor from "../../components/common/QuillEditor";
import { changeField, initialize } from "../../modules/memo/write";
import { useEffect, useCallback} from 'react';

const QuillEditorContainer = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        return(() => {
            dispatch(initialize());
        });
    }, [dispatch]);
    
    const onChangeBody = useCallback(payload => {
        dispatch(changeField(payload));
    }, [dispatch]);

    return(
        <div>
            <QuillEditor onChangeBody={onChangeBody} />
        </div>
    );
};

export default QuillEditorContainer;