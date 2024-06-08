import { combineReducers } from "redux";
import auth, { authSaga } from "./auth/auth";
import user, { userSaga } from "./auth/user";
import write, { writeSaga } from './memo/write';
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    auth,
    user,
    write
});

export function* rootSaga(){
    yield all([authSaga(), userSaga(), writeSaga()]);
}

export default rootReducer;