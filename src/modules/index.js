import { combineReducers } from "redux";
import auth, { authSaga } from "./auth/auth";
import user, { userSaga } from "./auth/user";
import write, { writeSaga } from './memo/write';
import memo, { memoSaga } from './memo/memo';
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    auth,
    user,
    write,
    memo
});

export function* rootSaga(){
    yield all([authSaga(), userSaga(), writeSaga(), memoSaga()]);
}

export default rootReducer;