import {takeEvery, put, call} from 'redux-saga/effects'
import {
    GET_ALL_DOCTOR_FAILED,
    GET_ALL_DOCTOR,
    GET_ALL_DOCTOR_SUCCESS,
    UPDATE_DOCTOR,
    UPDATE_DOCTOR_SUCCESS,
    UPDATE_DOCTOR_FAILED
}
from '../../utils/Constant'
import doctorApi from '../../api/doctorApi'

function* fetchDoctor({payload}){
    try {
        const response = yield call(doctorApi.getAll,payload);
        yield put({type: GET_ALL_DOCTOR_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_ALL_DOCTOR_FAILED, payload: error})
    }
}
function* updateDoctor({payload}){
    try {
        yield call(doctorApi.update,payload);
        const response = yield call(doctorApi.getAll,{search : '', limit: 5, page : 1});
        yield put({type: UPDATE_DOCTOR_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: UPDATE_DOCTOR_FAILED, payload: error})
    }
}


function* doctorSaga(){
    yield takeEvery(GET_ALL_DOCTOR, fetchDoctor)
    yield takeEvery(UPDATE_DOCTOR, updateDoctor)
}
export default doctorSaga;