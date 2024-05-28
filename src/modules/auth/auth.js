import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import * as  authAPI from '../../lib/api/auth';
import { takeLatest, call, put } from 'redux-saga/effects';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const CHECK_USER = 'auth/CHECK_USER';
const CHECK_DUP = 'auth/CHECK_DUP';

const REGISTER = 'auth/REGISTER';
const REGISTER_ERROR = 'auth/REGISTER_ERROR';

export const changeField = createAction(CHANGE_FIELD, 
    ({ form, key, value }) => ({
        form,
        key,
        value
    })
);

export const initializeForm = createAction(INITIALIZE_FORM);

export const checkUser = createAction(CHECK_USER, ({email}) => ({
    email
}));

export const checkDup = createAction(CHECK_DUP, ({exists}) => exists);

export const register = createAction(REGISTER, ({email, password, username}) => ({
    email,
    password,
    username
}));

export const registerError = createAction(REGISTER_ERROR, ({message}) => ({
    message
}));




function* checkUserSaga(action){
    try{
        const response = yield call(authAPI.checkDuplicate, action.payload);
        if(response.data){
            yield put(checkDup({exists: true}))
        }else if(!response.data){
            yield put(checkDup({exists: false}))
        }
    }catch(e){
        console.error(e);
    }
}

function* registerSaga(action){
    try{
        const response = yield call(authAPI.register, action.payload);
    }catch(e){
        yield put(registerError(e.response.data));
    }
}



export function* authSaga(){
    yield takeLatest(CHECK_USER, checkUserSaga);
    yield takeLatest(REGISTER, registerSaga);
}

const initialState = {
    login: {
        email: '',
        password: '',
    },
    register: {
        email: '',
        password: '',
        passConfirm: '',
        username: '',
        exists: false,
        error: {
            message: null
        }
    }
};

const auth = handleActions(
    {
        [CHANGE_FIELD]: (state, {payload : { form, key, value }}) => produce(state, draft => {
            draft[form][key] = value;
        }),
        [INITIALIZE_FORM]: (state, { payload: { form }}) => ({
            ...state,
            [form]: initialState[form]
        }),
        [CHECK_DUP]: (state, {payload: exists}) => produce(state, draft => {
            draft.register.exists = exists;
        }),
        [REGISTER_ERROR]: (state, { payload: message }) => produce(state, draft => {
            draft.register.error = message;
        })
    },
    initialState
);

export default auth;