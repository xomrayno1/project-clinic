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
    const {current} = payload ;
    try {
        const response = yield call(authApi.login,current.values);
        const auth = {
            isLogin : true,
            user: {
                username: response.username,
                roles : response.roles,
                jwt : response.token,
                id: response.id
            }
        }
        localStorage.setItem('auth',JSON.stringify(auth));
        message.success("Đăng nhập thành công")
        yield put({type: AUTH_LOGIN_SUCCESS, payload: response})
    } catch (error) {
        // const data = error.response.data
        current.setErrors({
            password : 'Tài khoản hoặc mật khẩu bị sai'
        })
        yield put({type: AUTH_LOGIN_FAILED, payload: error})
    }
}
function* register({payload}){
    console.log(payload)
    const {current} = payload ;
    try {
        yield call(authApi.register,current.values);
        yield put({type: AUTH_REGISTER_SUCCESS})
        message.success(`Đăng ký tài khoản thành công`)
        current.resetForm({})
    } catch (error) {
        if(error.response.status === 409){
            const data = error.response.data
            switch(data.code){
                case 303:
                    current.setErrors({email:"Email đã tồn tại"})
                    break;
                case 304 :
                    current.setErrors({username:"Username đã tồn tại"})
                    break;
                default: 
                    break;
            }
        }else{
            message.error(`Đăng ký tài khoản thất bại`)
        }
        yield put({type: AUTH_REGISTER_FAILED, payload: error})
    }
}

function* doctorSaga(){
    yield takeLatest(AUTH_LOGIN, login)
    yield takeLatest(AUTH_REGISTER, register)
 
}
export default doctorSaga;