import Explorer from "../../components/explorer/Explorer"
import { useSelector, useDispatch } from 'react-redux';
import { useState, useCallback, useEffect, useRef } from 'react';
import { clearError, setError, getDirList, createDir, getFileAttr, clearFileAttr, changeTargetName } from '../../modules/explorer/explorer';
import Modal from '../../components/common/Modal';
import * as expAPI from '../../lib/api/explorer';

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
            type: null,
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
        setModalOption({show: true, message: '디렉토리 이름을 입력해 주세요.', type: 'createDir'});
    };
    const confirmCreateDir = useCallback(e => {
        if(inputData === ''){
            dispatch(setError({message: '이름을 입력해 주세요.'}));
            setModalOption({...modalOption, message: e.message});
            return;
        }
        dispatch(createDir({userEmail: user.email, currDir, dirName: inputData}));
        setModalOption({show: false, message: '', type: null});
        setInputData('');
    }, [user, inputData, currDir, modalOption, dispatch]);

    const onChangeInput = useCallback((e) => {
        setInputData(e.target.value);
    }, [])
    

    const onCancel = e => {
        setModalOption({show: false, type: null, message: ''});
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

        if(file.isDir){
            ctxRef.current.childNodes[2].style.display = 'none';
            ctxRef.current.style.height = '90px';
        }else{
            ctxRef.current.childNodes[2].style.display = 'block';
            ctxRef.current.style.height = '120px';
        }
        
        ctxRef.current.style.top = `${targetTop-80}px`;
        ctxRef.current.style.left = `${targetLeft-60}px`;
        
        ctxRef.current.style.visibility = 'visible';
    }, []);

    const closeContextMenu = useCallback(() => {
        // setCurrFile(null);
        ctxRef.current.style.visibility = 'hidden';
    }, []);

    const showAttr = useCallback(() => {
        dispatch(getFileAttr(currFile));
    }, [currFile, dispatch]);

    const onChangeTargetName = useCallback(() => {
        setInputData(currFile.element);
        setModalOption({show: true, type: 'rename', message: '변경할 이름을 입력해 주세요.'});
    }, [currFile]);

    const confirmChangeTargetName = useCallback(() => {
        dispatch(changeTargetName(
            {
                userEmail: user.email, 
                currDir, 
                oldPath: currFile.filePath, 
                dirPath: currFile.dirPath, 
                newName: inputData
            }));
        setModalOption({show: false, message: '', type: null});
        setInputData('');
        setCurrFile(null);
    }, [user, currFile, currDir, inputData, dispatch]);

    const onDownloadFile = useCallback(async () => {
        try{
            // const response = await photoAPI.downloadPhoto(currPhoto.photo_id);
            const response = await fetch(`http://localhost:4000/file/download`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userEmail: user.email,
                    filePath: currFile.filePath
                })
            });

            const file = await response.blob();
            const downloadUrl = window.URL.createObjectURL(file);

            const a = document.createElement('a');
            document.body.appendChild(a);
            a.download = currFile.element;
            a.href = downloadUrl;

            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);

        }catch(e){
            console.error(e);
        }
    }, [user, currFile]);

    const onUploadFile = useCallback((e) => {
        const fileInput = document.createElement('input');
        fileInput.setAttribute("type", "file");
        // fileInput.setAttribute("accept", ".jpg,.jpeg,.png");
        fileInput.setAttribute("multiple", false);
        fileInput.click();

        fileInput.addEventListener('change', async() => {
            const file = fileInput.files[0];
            
            const formData = new FormData();
            formData.append('userEmail', user.email);
            formData.append('currDir', currDir);
            formData.append('file', file);

            try{
                const response = await expAPI.uploadFile(formData);
                if(response.status === 200){
                    dispatch(getDirList({userEmail: user.email, currDir}));
                }
            }catch(e){
                console.error(e);
            }
        });
    }, [user, currDir, dispatch]);

    useEffect(() => {
        dispatch(getDirList({userEmail: user.email, currDir}));
        return (() => {
            dispatch(clearFileAttr());
        });
    }, [user, currDir, dispatch]);

    return(
        <>
            <Explorer 
                ctxRef={ctxRef} 
                loading={loading} 
                fileList={fileList}
                currDir={currDir} 
                setCurrDir={setCurrDir} 
                onClickFile={onClickFile} 
                toTop={toTop} 
                onCreateDir={onCreateDir} 
                showContextMenu={showContextMenu} 
                closeContextMenu={closeContextMenu} 
                showAttr={showAttr} 
                currFileAttr={currFileAttr}
                onChangeTargetName={onChangeTargetName}
                onDownloadFile={onDownloadFile}
                onUploadFile={onUploadFile}
            />

            { (modalOption.show && modalOption.type === 'createDir') && 
                <Modal type={"createDir"} onConfirm={onCancel}  proceed={confirmCreateDir} message={modalOption.message} inputData={inputData} onChangeInput={onChangeInput} />
            }
            { (modalOption.show && modalOption.type === 'rename') && 
                <Modal type={"createDir"} onConfirm={onCancel}  proceed={confirmChangeTargetName} message={modalOption.message} inputData={inputData} onChangeInput={onChangeInput} />
            }
            {
                error &&
                <Modal onConfirm={onCancel} message={error.message}/>
            }
        </>
    );
};

export default ExplorerContainer;