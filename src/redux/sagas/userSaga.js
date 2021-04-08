import {takeLatest, put, call} from 'redux-saga/effects'
import {message} from 'antd'

import {
    GET_ALL_USER_FAILED,
    GET_ALL_USER,
    GET_ALL_USER_SUCCESS,
    UPDATE_USER,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    GET_USER,
    GET_USER_FAILED,
    GET_USER_SUCCESS,
    DELETE_USER,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILED,
    RESTORE_USER,
    CREATE_USER,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILED
}
from '../../utils/Constant'
import userApi from '../../api/userApi'
import {defaultFilter} from '../../utils/AppUtils'


function* fetchUser({payload}){
    try {
        const response = yield call(userApi.getAllFilter,payload);
        yield put({type: GET_ALL_USER_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: GET_ALL_USER_FAILED, payload: error})
    }
}
function* updateUser({payload}){
    try { //ref get dataa
        yield call(userApi.update,payload);
        const response = yield call(userApi.getAllFilter,defaultFilter);
        yield put({type: UPDATE_USER_SUCCESS, payload: response})
    } catch (error) { //ref set error
        const data = error.response.data
        message.error(`  ${data.message}`)
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
function* deleteUser({payload}){ // ref get data add
    try {
        yield call(userApi.delete,payload);
        const response = yield call(userApi.getAllFilter,defaultFilter);
        yield put({type: DELETE_USER_SUCCESS, payload: response})
    } catch (error) { // ref set
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: DELETE_USER_FAILED, payload: error})
    }
}

function* restoreUser({payload}){
    try {
        yield call(userApi.restore,payload);
        const response = yield call(userApi.getAllFilter,defaultFilter);
        yield put({type: GET_ALL_USER_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(` ${data.message}`)
        yield put({type: GET_ALL_USER_FAILED, payload: error})
    }
}
function* createUser({payload}){
    try {
        yield call(userApi.create,payload);
        const response = yield call(userApi.getAllFilter,defaultFilter);
        yield put({type: CREATE_USER_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`  ${data.message}`)
        yield put({type: CREATE_USER_FAILED, payload: error})
    }
}
function* userSaga(){
    yield takeLatest(GET_ALL_USER, fetchUser)
    yield takeLatest(UPDATE_USER, updateUser)
    yield takeLatest(GET_USER, findUserById)
    yield takeLatest(DELETE_USER, deleteUser)
    yield takeLatest(RESTORE_USER, restoreUser)
    yield takeLatest(CREATE_USER, createUser)
}
export default userSaga;