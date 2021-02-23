import { takeEvery, fork, all } from 'redux-saga/effects';
import { LOGIN_USER } from './actionTypes';

import axios from 'axios';

import {webUrl} from "../../../config";
import {errorToastr} from "../../../pages/Toastr";

const url = webUrl + '/v3/api/customer/users/verify';

function* loginUser({ payload: { user, history } }) {
    return axios.post(url, {'phone': user})
        .then(response => {
            if (response['data']['success'] === true) {
                // localStorage.setItem('code', response['data']['code']);
                const code = response['data']['code'];
                localStorage.setItem('phone', user);
                history.push({
                    pathname: '/verify',
                    data: user,
                    code: code
                })
            } else {
                errorToastr(response['data']['msg']);
            }
    }).catch(err => console.error(err))
}



export function* watchUserLogin() {
    yield takeEvery(LOGIN_USER, loginUser)
}

function* authSaga() {
    yield all([
        fork(watchUserLogin),
    ]);
}

export default authSaga;