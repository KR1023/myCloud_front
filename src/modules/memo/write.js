import { createAction, handleActions } from "redux-actions";
import * as memoAPI from '../../lib/api/memo';
import { call, put, takeLatest } from 'redux-saga/effects';
import {memoList, getMemoSuccess} from './memo';

const INITIALIZE = 'write/INITAILIZE';
const CHANGE_FIELD = 'write/CHANGE_FIELD';

const CREATE_MEMO = 'write/CREATE_MEMO';
const CREATE_SUCCESS = 'write/CREATE_SUCCESS';

const UPDATE_MEMO = 'write/UPDATE_MEMO';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({
    key,
    value
}));
export const createMemo = createAction(CREATE_MEMO, ({title, body, userEmail}) => ({title, body, userEmail}))
export const createSuccess = createAction(CREATE_SUCCESS, memo => memo);
export const updateMemo = createAction(UPDATE_MEMO, ({ memoId, title, body, userEmail}) => ({
    memoId,
    title,
    body,
    userEmail
}));

function* createMemoSaga(action){
    try{
        const response = yield call(memoAPI.createMemo, action.payload);
        if(response.status === 201){
            yield put(getMemoSuccess(response.data));
            yield put(memoList(action.payload));
        }

    }catch(e){
        console.error(e);
    }
}

function* updateMemoSaga(action){
    try{
        const response = yield call(memoAPI.updateMemo, action.payload);
        if(response.status === 200){
            yield put(getMemoSuccess(response.data));
            yield put(memoList(action.payload));
        }
    }catch(e){
        console.error(e);
    }
}
export function* writeSaga(){
    yield takeLatest(CREATE_MEMO, createMemoSaga);
    yield takeLatest(UPDATE_MEMO, updateMemoSaga);
}

const initialState = {
    title: '',
    body: ''
};

const write = handleActions(
    {
        [INITIALIZE]: (state) => initialState,
        [CHANGE_FIELD]: (state, { payload: {key, value}}) => ({
            ...state,
            [key]: value
        }),
        [CREATE_SUCCESS]: (state, { payload: memo}) => ({
            ...state,
            memo
        })
    },
    initialState
);

export default write;