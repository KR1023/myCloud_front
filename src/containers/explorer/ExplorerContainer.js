import Explorer from "../../components/explorer/Explorer"
import { useSelector, useDispatch } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';
import { getDirList } from '../../modules/explorer/explorer';

export const ExplorerContainer = () => {
    const dispatch = useDispatch();

    const { user, loading, fileList } = useSelector(({user, explorer}) => ({
        user: user.user,
        loading: explorer.loading,
        fileList: explorer.fileList
    }));

    const [currDir, setCurrDir] = useState('/');

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
        }
    }, [user, currDir, dispatch]);

    useEffect(() => {
        dispatch(getDirList({userEmail: user.email, currDir}));
    }, [user, currDir, dispatch]);

    return(
        <>
            <Explorer loading={loading} fileList={fileList} currDir={currDir} setCurrDir={setCurrDir} onClickFile={onClickFile} toTop={toTop} />
        </>
    );
};

export default ExplorerContainer;