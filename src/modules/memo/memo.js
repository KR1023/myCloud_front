import { createAction, handleActions } from "redux-actions";
import { put, call, takeLatest } from 'redux-saga/effects';
import * as memoAPI from '../../lib/api/memo';

const MEMO_LIST = 'memo/MEMO_LIST';
const MEMO_LIST_SUCCESS = 'memo/MEMO_LIST_SUCCESS';

const GET_MEMO = 'memo/GET_MEMO';
const GET_MEMO_SUCCESS = 'memo/GET_MEMO_SUCCESS';

export const memoList = createAction(MEMO_LIST, userEmail => ({userEmail}));
export const memoListSuccess = createAction(MEMO_LIST_SUCCESS, memos => memos);
export const getMemo = createAction(GET_MEMO, memoId => memoId);
export const getMemoSuccess = createAction(GET_MEMO_SUCCESS, memo => memo);

function* memoListSaga(action){
    try{
        const response = yield call(memoAPI.getMemoList, action.payload);
        if(response.data){
            yield put(memoListSuccess(response.data));
        }
    }catch(e){
        console.error(e);
    }
}

function* getMemoSaga(action){
    try{
        const response = yield call(memoAPI.getMemo, action.payload);
        if(response.data){
            yield put(getMemoSuccess(response.data));
        }
    }catch(e){
        console.error(e);
    }
}

const initialState = {
    memo: null,
    memos: null
};

export function* memoSaga(){
    yield takeLatest(MEMO_LIST, memoListSaga);
    yield takeLatest(GET_MEMO, getMemoSaga);
}

export const memo = handleActions(
    {
        [MEMO_LIST_SUCCESS]: (state, {payload: memos}) => ({
            ...state,
            memos
        }),
        [GET_MEMO_SUCCESS]: (state, {payload: memo}) => ({
            ...state,
            memo
        })
    },
    initialState
);

export default memo;