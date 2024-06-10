import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest} from 'redux-saga/effects';
import { sessionStatus } from "./auth";
import * as authAPI from '../../lib/api/auth';
import * as userAPI from '../../lib/api/user';

const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const GOOGLE_LOGIN = 'auth/GOOGLE_LOGIN';

const LOGOUT = 'auth/LOGOUT';

const TEMP_SET_USER = 'auth/TEMP_SET_USER';
const INIT_ERROR = 'auth/INIT_ERROR';

const UPDATE_USERINFO = 'user/UPDATE_USERINFO';
const UPDATE_MESSAGE = 'user/UPDATE_MESSAGE';
const UPDATE_ERROR = 'user/UPDATE_ERROR';

const WITHDRAWAL = 'user/WITHDRAWAL';


export const login = createAction(LOGIN, ({email, password}) => ({
    email,
    password
}));
export const googleLogin = createAction(GOOGLE_LOGIN);
export const loginSuccess = createAction(LOGIN_SUCCESS, (user) => user);
export const loginFail = createAction(LOGIN_FAIL, (error) => error);
export const logout = createAction(LOGOUT);
export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const initError = createAction(INIT_ERROR);
export const updateUserinfo = createAction(UPDATE_USERINFO, (form) => form);
export const updateMessage = createAction(UPDATE_MESSAGE, message => message);
export const updateError = createAction(UPDATE_ERROR);
export const withdrawal = createAction(WITHDRAWAL, user => user);

function* loginSaga(action){
    try{
        const response = yield call(authAPI.login, action.payload);
        if(response.status === 201){
            yield put(loginSuccess(response.data));
            yield put(loginFail(null));
            yield put(sessionStatus(true));
        }
    }catch(e){
        console.error(e);
        if(e.response.status === 401){
            yield put(loginFail('아이디와 비밀번호를 확인해 주세요.'));
            yield put(loginSuccess(null));
        }else if(e.response.status === 500){
            yield put(loginFail('서버 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.'));
            yield put(loginSuccess(null));
        }
    }
}

function* logoutSaga(action){
    try{
        const response = yield call(authAPI.logout);
        console.log(response);
        localStorage.removeItem('user');
        yield put(sessionStatus(false));
    }catch(e){
        console.error(e);
    }
}

function* updateUserinfoSaga(action){
    try{
        const response = yield call(userAPI.updateUserInfo, action.payload);
        if(response.status === 200){
            yield put(tempSetUser(response.data));
            yield put(updateMessage('사용자 정보 업데이트 완료'));
            localStorage.setItem("user", JSON.stringify(response.data));
        }
    }catch(e){
        console.error(e);
        yield put(updateError(e.response));
    }
}

function* withdrawalSaga(action){
    try{
        const response = yield call(userAPI.withdrawal, action.payload);
        console.log(response);
        if(response.status === 200){
            yield put(tempSetUser(null));
            localStorage.removeItem('user');
        }
    }catch(e){
        console.error(e);
    }
}

export function* userSaga(){
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(LOGOUT, logoutSaga);
    yield takeLatest(UPDATE_USERINFO, updateUserinfoSaga);
    yield takeLatest(WITHDRAWAL, withdrawalSaga);
}

const initialState = {
    user: null,
    error: null,
    updateMsg: null
}

const user = handleActions(
    {   
        [GOOGLE_LOGIN]: (state, { payload: user}) => ({
            ...state,
            user
        }),
        [LOGIN_SUCCESS]: (state, { payload: user}) => ({
            ...state,
            user
        }),
        [LOGIN_FAIL]: (state, { payload: error}) => ({
            ...state,
            error
        }),
        [LOGOUT]: (state) => ({
            ...state,
            user: null
        }),
        [TEMP_SET_USER]: (state, {payload: user}) => ({
            ...state,
            user
        }),
        [INIT_ERROR]: (state) => ({
            ...state,
            error: null
        }),
        [UPDATE_MESSAGE]: (state, {payload: message}) => ({
            ...state,
            updateMsg: message
        }),
        [UPDATE_ERROR]: (state, {payload: error}) => ({
            ...state,
            error
        })
    },
    initialState
);

export default user;