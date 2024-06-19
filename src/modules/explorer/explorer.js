import { createAction, handleActions } from 'redux-actions';
import * as expAPI from '../../lib/api/explorer';
import { put, call, takeLatest } from 'redux-saga/effects';

const SET_ERROR = 'exp/SET_ERROR';
const CLEAR_ERROR = 'exp/CLEAR_ERROR';
const GET_DIR_LIST = 'exp/GET_DIR_LIST';
const GET_DIR_LIST_SUCCESS = 'exp/GET_DIR_LIST_SUCCESS';
const GET_DIR_LIST_FAIL = 'exp/GET_DIR_LIST_FAIL';
const LOADING = 'exp/LOADING';
const LOADING_SUCCESS = 'exp/LOADING_SUCCESS';
const CREATE_DIR = 'exp/CREATE_DIR';
const GET_FILE_ATTR = 'exp/GET_FILE_ATTR';
const GET_FILE_ATTR_SUCCESS = 'exp/GET_FILE/GET_FILE_ATTR_SUCCESS';
const GET_FILE_ATTR_FAIL = 'exp/GET_FILE_ATTR_FAIL'
const CLEAR_FILE_ATTR = 'exp/CLEAR_FILE_ATTR';
const CHANGE_TARGET_NAME = 'exp/CHANGE_TARGET_NAME';
const DELETE_FILE = 'exp/DELETE_FILE';

export const setError = createAction(SET_ERROR, error => error);
export const clearError = createAction(CLEAR_ERROR);
export const getDirList = createAction(GET_DIR_LIST, ({userEmail, currDir}) => ({userEmail, currDir}));
export const getDirListSuccess = createAction(GET_DIR_LIST_SUCCESS, fileList => fileList);
export const getDirListFail = createAction(GET_DIR_LIST_FAIL);
export const loading = createAction(LOADING);
export const loadingSuccess = createAction(LOADING_SUCCESS);
export const createDir = createAction(CREATE_DIR, ({userEmail, currDir, dirName}) => ({userEmail, currDir, dirName}));
export const getFileAttr = createAction(GET_FILE_ATTR, currFile => currFile);
export const getFileAttrSuccess = createAction(GET_FILE_ATTR_SUCCESS, fileAttr => fileAttr);
export const getFileAttrFail = createAction(GET_FILE_ATTR_FAIL);
export const clearFileAttr = createAction(CLEAR_FILE_ATTR);
export const changeTargetName = createAction(CHANGE_TARGET_NAME);
export const deleteFile = createAction(DELETE_FILE, ({userEmail, currDir, filePath}) => ({userEmail, currDir, filePath}));

function* getDirListSaga(action){
    try{
        yield put(loading());
        const response = yield call(expAPI.getDirList, action.payload);
        if(response.status === 200){
            yield put(getDirListSuccess(response.data));
            yield put(loadingSuccess());
        }
    }catch(e){
        console.error(e);
        yield put(setError(e));
    }finally{
        yield put(clearFileAttr());
    }
}

function* createDirSaga(action){
    try{
        const response = yield call(expAPI.createDirectory, action.payload);
        if(response.status === 200){
            yield put(getDirList(action.payload));
        }
    }catch(e){
        console.error(e);
        if(e.response.status === 409)
            yield put(setError({...e, message: "이미 존재하는 디렉토리입니다."}));
        else
            yield put(setError(e));
    }
}

function* getFileAttrSaga(action){
    try{
        const response = yield call(expAPI.getFileAttr, action.payload);
        if(response.status === 200){
            yield put(getFileAttrSuccess(response.data));
        }
    }catch(e){
        console.error(e);
        yield put(getFileAttrFail(e));
    }
}

function* changeTargetNameSaga(action){
    try{
        const response = yield call(expAPI.renameFile, action.payload);
        if(response.status === 200){
            yield put(getDirList(action.payload));
        }
    }catch(e){
        console.error(e);
        yield put(setError(e));
    }
}

function* deleteFileSaga(action){
    try{
        const response = yield call(expAPI.deleteFile, action.payload);
        if(response.status === 200)
            yield put(getDirList(action.payload));
    }catch(e){
        console.error(e);
        if(e.response.status === 406)
            yield put(setError({...e, message: '디렉터리가 비어있지 않습니다.'}));
        else
            yield put(setError(e));
    }
}

export function* explorerSaga(){
    yield takeLatest(GET_DIR_LIST, getDirListSaga);
    yield takeLatest(CREATE_DIR, createDirSaga);
    yield takeLatest(GET_FILE_ATTR, getFileAttrSaga);
    yield takeLatest(CHANGE_TARGET_NAME, changeTargetNameSaga);
    yield takeLatest(DELETE_FILE, deleteFileSaga);
}

const initialState = ({
    fileList: null,
    loading: false,
    currFileAttr: null,
    error: null
});

export const explorer = handleActions(
    {
        [SET_ERROR]: (state, {payload: error}) => ({
            ...state,
            error
        }),
        [CLEAR_ERROR]: (state) => ({
            ...state,
            error: null
        }),
        [GET_DIR_LIST_SUCCESS]: (state, {payload: fileList}) => ({
            ...state,
            fileList
        }),
        [GET_FILE_ATTR_SUCCESS]: (state, {payload: currFileAttr}) => ({
            ...state,
            currFileAttr
        }),
        [GET_FILE_ATTR_FAIL]: (state, {payload: error}) => ({
            ...state,
            currFileAttr: null,
            error
        }),
        [CLEAR_FILE_ATTR]: state => ({
            ...state,
            currFileAttr: null
        }),
        [LOADING]: (state) => ({ 
            ...state,
            loading: true
        }),
        [LOADING_SUCCESS]: (state) => ({
            ...state,
            loading: false
        })
    },
    initialState
);

export default explorer;


