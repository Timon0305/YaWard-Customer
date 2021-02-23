import { takeEvery, fork, all } from 'redux-saga/effects';
import axios from 'axios';
import { REGISTER_USER } from './actionTypes';

import {webUrl} from "../../../config";

const url = webUrl + '/v3/api/customer/users/register';

function* registerUser({ payload: { user, history } }) {
    const code = localStorage.getItem('code');
    const phone = localStorage.getItem('phone');
    if (code === user) {
        axios.post(url, {'phone': phone})
            .then(response => {
                if (response.data['success'] === true) {
                    localStorage.setItem('authCustomer', JSON.stringify(response['data']['token']));
                    history.push('/')
                }
            })
            .catch(err => console.error(err))
    } else {
        alert('Code Error');
        return false;
    }
}

export function* watchUserRegister() {
    yield takeEvery(REGISTER_USER, registerUser);
}

function* accountSaga() {
    yield all([fork(watchUserRegister)]);
}

export default accountSaga;