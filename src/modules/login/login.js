import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const CHANGE_FIELD = 'login/CHANGE_FIELD';
const INITIALIZE_FORM = 'login/INITIALIZE_FORM';

export const changeField = createAction(CHANGE_FIELD, 
    ({ form, key, value }) => ({
        form,
        key,
        value
    })
);

export const initializeForm = createAction(INITIALIZE_FORM);

const initialState = {
    login: {
        username: '',
        password: ''
    }
};

const login = handleActions(
    {
        [CHANGE_FIELD]: (state, {payload : {form, key, value}}) => produce(state, draft => {
            draft[form][key] = value;
        }),
        [INITIALIZE_FORM]: (state, { payload: {form}}) => ({
            ...state,
            [form]: initialState[form]
        })
    },
    initialState
);

export default login;