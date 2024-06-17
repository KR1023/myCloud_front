import { createAction, handleActions } from 'redux-actions';
import * as expAPI from '../../lib/api/explorer';
import { put, call, takeLatest } from 'redux-saga/effects';

const GET_DIR_LIST = 'exp/GET_DIR_LIST';
const GET_DIR_LIST_SUCCESS = 'exp/GET_DIR_LIST_SUCCESS';
const GET_DIR_LIST_FAIL = 'exp/GET_DIR_LIST_FAIL';
const LOADING = 'exp/LOADING';
const LOADING_SUCCESS = 'exp/LOADING_SUCCESS';

export const getDirList = createAction(GET_DIR_LIST, ({userEmail, currDir}) => ({userEmail, currDir}));
export const getDirListSuccess = createAction(GET_DIR_LIST_SUCCESS, fileList => fileList);
export const getDirListFail = createAction(GET_DIR_LIST_FAIL);
export const loading = createAction(LOADING);
export const loadingSuccess = createAction(LOADING_SUCCESS);

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
    }
}

export function* explorerSaga(){
    yield takeLatest(GET_DIR_LIST, getDirListSaga);
}

const initialState = ({
    fileList: null,
    loading: false,
    error: null
});

export const explorer = handleActions(
    {
        [GET_DIR_LIST_SUCCESS]: (state, {payload: fileList}) => ({
            ...state,
            fileList
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


