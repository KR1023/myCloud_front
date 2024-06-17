import { combineReducers } from "redux";
import auth, { authSaga } from "./auth/auth";
import user, { userSaga } from "./auth/user";
import write, { writeSaga } from './memo/write';
import memo, { memoSaga } from './memo/memo';
import photo, { photoSaga } from './photo/photo';
import explorer, { explorerSaga } from './explorer/explorer';
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({
    auth,
    user,
    write,
    memo,
    photo,
    explorer
});

export function* rootSaga(){
    yield all([authSaga(), userSaga(), writeSaga(), memoSaga(), photoSaga(), explorerSaga()]);
}

export default rootReducer;