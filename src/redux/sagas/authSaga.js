import {takeLatest, put, call} from 'redux-saga/effects'
import {message} from 'antd'


import {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILED,
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILED
} from '../../utils/Constant'

import authApi from '../../api/authApi'
 
function* login({payload}){
    try {
        const response = yield call(authApi.login,payload);
        console.log(response)
        const auth = {
            isLogin : true,
            user: {
                username: response.username,
                roles : response.roles,
                jwt : response.token,
            }
        }
        localStorage.setItem('auth',JSON.stringify(auth));
        message.success("Đăng nhập thành công")
        yield put({type: AUTH_LOGIN_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`${data.code} ${data.message}`)
        yield put({type: AUTH_LOGIN_FAILED, payload: error})
    }
}
function* register({payload}){
    try {
        yield call(authApi.register,payload);
        yield put({type: AUTH_REGISTER_SUCCESS})
    } catch (error) {
        const data = error.response.data
        message.error(`${data.code} ${data.message}`)
        yield put({type: AUTH_REGISTER_FAILED, payload: error})
    }
}

function* doctorSaga(){
    yield takeLatest(AUTH_LOGIN, login)
    yield takeLatest(AUTH_REGISTER, register)
 
}
export default doctorSaga;