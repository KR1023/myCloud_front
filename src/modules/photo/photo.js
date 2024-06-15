import { createAction, handleActions } from 'redux-actions';
import { put, call, takeLatest } from 'redux-saga/effects';
import * as photoAPI from '../../lib/api/photo';

const GET_PHOTO_LIST = 'photo/GET_PHOTO_LIST';
const GET_PHOTO_LIST_SUCCESS = 'photo/GET_PHOTO_LIST_SUCCESS';
const GET_PHOTO_LIST_FAIL = 'photo/GET_PHOTO_LIST_FAIL';


export const getPhotoList = createAction(GET_PHOTO_LIST, userEmail => userEmail);
export const getPhotoListSuccess = createAction(GET_PHOTO_LIST_SUCCESS, photoList => photoList);
export const getPhotoListFail = createAction(GET_PHOTO_LIST_FAIL, error => error);

function* getPhotoListSaga(action){
    try{
        const response = yield call(photoAPI.getPhotoList, action.payload);
        if(response.status === 200){
            yield put(getPhotoListSuccess(response.data));
        }
    }catch(e){
        console.error(e);
        yield put(getPhotoListFail(e.message));
    }
}

export function* photoSaga(){
    yield takeLatest(GET_PHOTO_LIST, getPhotoListSaga);
}

const initialState = {
    photo: null,
    photoList: null,
    error: null
};

export const photo = handleActions(
    {
        [GET_PHOTO_LIST_SUCCESS]: (state, {payload: photoList}) => ({
            ...state,
            photoList: photoList
        }),
        [GET_PHOTO_LIST_FAIL]: (state, { payload: error }) => ({
            ...state,
            error: null
        })
    },
    initialState
)

export default photo;