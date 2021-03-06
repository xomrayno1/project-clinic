import {takeLatest, put, call} from 'redux-saga/effects'
import {message} from 'antd'

import {
    GET_ALL_DOCTOR_FAILED,
    GET_ALL_DOCTOR,
    GET_ALL_DOCTOR_SUCCESS,
    UPDATE_DOCTOR,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAILED,
    GET_DOCTOR,
    GET_DOCTOR_FAILED,
    GET_DOCTOR_SUCCESS,
    DELETE_DOCTOR,
    DELETE_DOCTOR_SUCCESS,
    DELETE_DOCTOR_FAILED,
    RESTORE_DOCTOR,
    RESTORE_DOCTOR_SUCCESS,
    RESTORE_DOCTOR_FAILED,
    FETCH_DOCTOR_ACTIVE,
    FETCH_DOCTOR_ACTIVE_FAILED,
    FETCH_DOCTOR_ACTIVE_SUCCESS
}
from '../../utils/Constant'
import doctorApi from '../../api/doctorApi'
import {defaultFilter} from '../../utils/AppUtils'

function* fetchDoctor({payload}){
    try {
        const response = yield call(doctorApi.getAllFilter,payload);
        yield put({type: GET_ALL_DOCTOR_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`${data.message}`)
        yield put({type: GET_ALL_DOCTOR_FAILED, payload: error})
    }
}
function* updateDoctor({payload, onCancel}){
    try {
        const data = yield call(doctorApi.update,payload);
        const response = yield call(doctorApi.getAllFilter,defaultFilter);
        yield put({type: UPDATE_DOCTOR_SUCCESS, payload: response})
        message.success(`${data.message}`)
        onCancel()
    } catch (error) {
        const data = error.response.data
        message.error(`${data.message}`)
        yield put({type: UPDATE_DOCTOR_FAILED, payload: error})
    }
}
function* findDoctorById({payload}){
    try {
        const response = yield call(doctorApi.findById,payload);
        yield put({type: GET_DOCTOR_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`${data.message}`)
        yield put({type: GET_DOCTOR_FAILED, payload: error})
    }
}
function* deleteDoctor({payload}){
    try {
        const data = yield call(doctorApi.delete,payload);
        const response = yield call(doctorApi.getAllFilter,defaultFilter);
        yield put({type: DELETE_DOCTOR_SUCCESS, payload: response})
        message.success(`${data.message}`)
    } catch (error) {
        const data = error.response.data
        message.error(`${data.message}`)
        yield put({type: DELETE_DOCTOR_FAILED, payload: error})
    }
}
function* fetchDoctorActive({payload}){
    try {
        const response = yield call(doctorApi.getAllActive,payload);
        yield put({type: FETCH_DOCTOR_ACTIVE_SUCCESS, payload: response})
    } catch (error) {
        const data = error.response.data
        message.error(`${data.message}`)
        yield put({type: FETCH_DOCTOR_ACTIVE_FAILED, payload: error})
    }
}
function* restoreDoctor({payload}){
    try {
        const data = yield call(doctorApi.restore,payload);
        const response = yield call(doctorApi.getAllFilter,defaultFilter);
        yield put({type: RESTORE_DOCTOR_SUCCESS, payload: response})
        message.success(`${data.message}`)
    } catch (error) {
        const data = error.response.data
        message.error(`${data.message}`)
        yield put({type: RESTORE_DOCTOR_FAILED, payload: error})
    }
}
function* doctorSaga(){
    yield takeLatest(GET_ALL_DOCTOR, fetchDoctor)
    yield takeLatest(FETCH_DOCTOR_ACTIVE, fetchDoctorActive)
    yield takeLatest(UPDATE_DOCTOR, updateDoctor)
    yield takeLatest(GET_DOCTOR, findDoctorById)
    yield takeLatest(DELETE_DOCTOR, deleteDoctor)
    yield takeLatest(RESTORE_DOCTOR, restoreDoctor)
}
export default doctorSaga;