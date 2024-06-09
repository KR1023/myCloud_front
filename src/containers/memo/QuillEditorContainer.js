import { useDispatch, useSelector } from "react-redux";
import QuillEditor from "../../components/common/QuillEditor";
import { changeField, initialize } from "../../modules/memo/write";
import { useEffect, useCallback} from 'react';

const QuillEditorContainer = ({memo}) => {
    const dispatch = useDispatch();

    const onChangeBody = useCallback(payload => {
        dispatch(changeField(payload));
    }, [dispatch]);

    useEffect(() => {
        // console.log(memo);
        if(memo){
            onChangeBody({key: 'body', value: memo.content});
        }
        return(() => {
            dispatch(initialize());
        });
    }, [memo, dispatch, onChangeBody]);
    
    

    return(
        <div>
            <QuillEditor onChangeBody={onChangeBody} memo={memo} />
        </div>
    );
};

export default QuillEditorContainer;