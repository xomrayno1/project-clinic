import {takeLatest, put, call} from 'redux-saga/effects'
import {
    GET_ALL_PATIENT_FAILED,
    GET_ALL_PATIENT,
    GET_ALL_PATIENT_SUCCESS,
    UPDATE_PATIENT,
    UPDATE_PATIENT_SUCCESS,
    UPDATE_PATIENT_FAILED
}
from '../../utils/Constant'
import patientApi from '../../api/patientApi'
import {defaultFilter} from '../../utils/AppUtils'

function* fetchPatient({payload}){
    try {
        const response = yield call(patientApi.getAll,payload);
        yield put({type: GET_ALL_PATIENT_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: GET_ALL_PATIENT_FAILED, payload: error})
    }
}
function* updatePatient({payload}){
    try {
        yield call(patientApi.update,payload);
        const response = yield call(patientApi.getAll,defaultFilter);
        yield put({type: UPDATE_PATIENT_SUCCESS, payload: response})
    } catch (error) {
        yield put({type: UPDATE_PATIENT_FAILED, payload: error})
    }
}


function* patientSaga(){
    yield takeLatest(GET_ALL_PATIENT, fetchPatient)
    yield takeLatest(UPDATE_PATIENT, updatePatient)
}
export default patientSaga;