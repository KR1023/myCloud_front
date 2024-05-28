import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest} from 'redux-saga/effects';
import * as authAPI from '../../lib/api/auth';

const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const LOGOUT = 'auth/LOGOUT';

const TEMP_SET_USER = 'auth/TEMP_SET_USER';
const INIT_ERROR = 'auth/INIT_ERROR';

export const login = createAction(LOGIN, ({email, password}) => ({
    email,
    password
}));

export const loginSuccess = createAction(LOGIN_SUCCESS, (user) => user);
export const loginFail = createAction(LOGIN_FAIL, (error) => error);
export const logout = createAction(LOGOUT);
export const tempSetUser = createAction(TEMP_SET_USER, user => user);
export const initError = createAction(INIT_ERROR);

function* loginSaga(action){
    try{
        const response = yield call(authAPI.login, action.payload);
        console.log(response);
        if(response.status === 201){
            yield put(loginSuccess(response.data));
            yield put(loginFail(null));
        }
    }catch(e){
        console.error(e);
        if(e.response.status === 401){
            yield put(loginFail(e.response.data));
            yield put(loginSuccess(null));
        }
    }
}

function* logoutSaga(action){
    try{
        const response = yield call(authAPI.logout);
        console.log(response);
        localStorage.removeItem('user');
    }catch(e){
        console.error(e);
    }
}

export function* userSaga(){
    yield takeLatest(LOGIN, loginSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
    user: null,
    error: null
}

const user = handleActions(
    {
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
        })
    },
    initialState
);

export default user;