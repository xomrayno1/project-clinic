import {takeLatest, put, call} from 'redux-saga/effects'
import {
    GET_ALL_USER_FAILED,
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    GET_USER,
    GET_USER_FAILED,
    GET_USER_SUCCESS
}
from '../../utils/Constant'
import userApi from '../../api/userApi'
import {defaultFilter} from '../../utils/AppUtils'

function* fetchUser({payload}){
    try {
        const response = yield call(userApi.getAllFilter,payload);
        yield put({type: GET_ALL_USER_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_ALL_USER_FAILED, payload: error})
    }
}
function* updateUser({payload}){
    try {
        yield call(userApi.update,payload);
        const response = yield call(userApi.getAllFilter,defaultFilter);
        yield put({type: UPDATE_USER_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: UPDATE_USER_FAILED, payload: error})
    }
}
function* findUserById({payload}){
    try {
        const response = yield call(userApi.findById,payload);
        yield put({type: GET_USER_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_USER_FAILED, payload: error})
    }
}
function* userSaga(){
    yield takeLatest(GET_ALL_USER, fetchUser)
    yield takeLatest(UPDATE_USER, updateUser)
    yield takeLatest(GET_USER, findUserById)
}
export default userSaga;