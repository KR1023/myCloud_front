import Explorer from "../../components/explorer/Explorer"
import { useSelector, useDispatch } from 'react-redux';
import { useState, useCallback, useEffect, useRef } from 'react';
import { clearError, setError, getDirList, createDir, getFileAttr } from '../../modules/explorer/explorer';
import Modal from '../../components/common/Modal';

export const ExplorerContainer = () => {
    const dispatch = useDispatch();

    const ctxRef = useRef();

    const { user, error, loading, fileList, currFileAttr } = useSelector(({user, explorer}) => ({
        user: user.user,
        error: explorer.error,
        loading: explorer.loading,
        fileList: explorer.fileList,
        currFileAttr: explorer.currFileAttr
    }));

    const[modalOption, setModalOption] = useState(
        {
            show: false,
            message: ''
        }
    );

    const [currFile, setCurrFile] = useState(null);
    const [currDir, setCurrDir] = useState('/');
    const [inputData, setInputData] = useState('');

    const toTop = useCallback(e => {
        const lastDelIdx = currDir.lastIndexOf('/');
        if(lastDelIdx === 0){
            setCurrDir('/');
            dispatch(getDirList({userEmail: user.email, currDir}));
        }else{
            setCurrDir(currDir.substring(0, lastDelIdx));
            dispatch(getDirList({userEmail: user.email, currDir}));
        }
    }, [user, currDir, dispatch]);

    const onClickFile = useCallback((e, file) => {
        if(file.isDir){
            setCurrDir(currDir + '/' + file.element);
            dispatch(getDirList({userEmail: user.email, currDir}));
        }else if(!file.isDir){
            dispatch(getFileAttr(file));
        }
    }, [user, currDir, dispatch]);

    const onCreateDir = e => {
        setModalOption({show: true, message: '디렉토리 이름을 입력해 주세요.'});
    };
    const confirmCreateDir = useCallback(e => {
        if(inputData === ''){
            dispatch(setError({message: '이름을 입력해 주세요.'}));
            setModalOption({...modalOption, message: e.message});
            return;
        }
        dispatch(createDir({userEmail: user.email, currDir, dirName: inputData}));
        setModalOption({show: false, message: ''});
        setInputData('');
    }, [user, inputData, currDir, modalOption, dispatch]);

    const onChangeInput = useCallback((e) => {
        setInputData(e.target.value);
    }, [])
    

    const onCancel = e => {
        setModalOption({show: false});
        dispatch(clearError());
        setInputData('');
    }
    
    const showContextMenu = useCallback((e, file) => {
        e.preventDefault();
        setCurrFile(file);

        let targetRect = null;
        let targetTop = '0';
        let targetLeft = '0';

        if(e.target.tagName === 'DIV'){
            targetRect = e.target.getBoundingClientRect();
            targetTop = targetRect.top;
            targetLeft = targetRect.left;

        }else{
            targetRect = e.target.parentNode.getBoundingClientRect();
            targetTop = targetRect.top;
            targetLeft = targetRect.left;
        }

        ctxRef.current.style.top = `${targetTop-80}px`;
        ctxRef.current.style.left = `${targetLeft-60}px`;
        
        ctxRef.current.style.visibility = 'visible';
    }, []);

    const closeContextMenu = useCallback(() => {
        setCurrFile(null);
        ctxRef.current.style.visibility = 'hidden';
    }, []);

    const showAttr = useCallback(() => {
        dispatch(getFileAttr(currFile));
    }, [currFile, dispatch]);

    useEffect(() => {
        dispatch(getDirList({userEmail: user.email, currDir}));
    }, [user, currDir, dispatch]);

    return(
        <>
            <Explorer ctxRef={ctxRef} loading={loading} fileList={fileList} currDir={currDir} setCurrDir={setCurrDir} onClickFile={onClickFile} toTop={toTop} onCreateDir={onCreateDir} showContextMenu={showContextMenu} closeContextMenu={closeContextMenu} showAttr={showAttr} currFileAttr={currFileAttr}/>
            { modalOption.show && 
                <Modal type={"createDir"} onConfirm={onCancel}  proceed={confirmCreateDir} message={modalOption.message} inputData={inputData} onChangeInput={onChangeInput} />
            }
            {
                error &&
                <Modal onConfirm={onCancel} message={error.message}/>
            }
            
        </>
    );
};

export default ExplorerContainer;