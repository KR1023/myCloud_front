import { useDispatch, useSelector } from "react-redux";
import QuillEditor from "../../components/common/QuillEditor";
import { changeField, initialize } from "../../modules/memo/write";
import { useEffect, useCallback} from 'react';

const QuillEditorContainer = ({memo}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        // console.log(memo);
        return(() => {
            dispatch(initialize());
        });
    }, [memo, dispatch]);
    
    const onChangeBody = useCallback(payload => {
        dispatch(changeField(payload));
    }, [dispatch]);

    return(
        <div>
            <QuillEditor onChangeBody={onChangeBody} memo={memo} />
        </div>
    );
};

export default QuillEditorContainer;