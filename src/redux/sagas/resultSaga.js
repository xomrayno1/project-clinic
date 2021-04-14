import {takeLatest, put, call} from 'redux-saga/effects'
import {message} from 'antd'

import {
    CREATE_RESULT,
    CREATE_RESULT_SUCCESS,
    CREATE_RESULT_FAILED,

    UPDATE_RESULT,
    UPDATE_RESULT_SUCCESS,
    UPDATE_RESULT_FAILED,

    FETCH_RESULT,
    FETCH_RESULT_SUCCESS,
    FETCH_RESULT_FAILED,

    GET_RESULT_BY_SCHEDULE,
    GET_RESULT_BY_SCHEDULE_SUCCESS,
    GET_RESULT_BY_SCHEDULE_FAILED,

    SET_MODAL_RESULT
} from '../../utils/Constant'
import resultApi from '../../api/resultApi'

//work
function* createResult({payload, addRef}){
    try {
        yield call(resultApi.create,payload)
        yield put({type: CREATE_RESULT_SUCCESS})
    } catch (error) {
        yield put({type: CREATE_RESULT_FAILED, payload: error})
    }
}

function* fetchResult({payload}){
    try {
        yield call()
    } catch (error) {
        
    }
}
function* getResultBySchedule({payload}){
    try {
        const response = yield call(resultApi.getResultBySchedule, payload);
        yield put({type: GET_RESULT_BY_SCHEDULE_SUCCESS, payload : response})
    } catch (error) {
        message.error(error.response.data.message)
        yield put({type: GET_RESULT_BY_SCHEDULE_FAILED, payload : error})
    }
}
function* setModalResult({payload, addRef}){
    try {
        const result = yield call(resultApi.getResultBySchedule, payload);
        console.log(result)
        addRef.current.setValues({
            doc_name: result && result.doc_name || '',
            pati_name: result && result.pati_name || '',
            reason: result && result.reason || '',
            reason_describe: result && result.reason_describe || '',
            blood_pressure: result && result.blood_pressure || '',
            height: result && result.height || '',
            weight:  result && result.height || '',
            diagnose:  result && result.diagnose || '',
            note: result && result.diagnose || '',
            // image_upload: result && result.diagnose || '',
            pati_id: result && result.pati_id || '',
            doctor_id: result && result.doctor_id || '',
            id: result.item && result.id || ''
        })
    } catch (error) {
        console.log(error.response)
        //message.error(error.response.data.message)
        
    }
}
function updateResult({payload, addRef}){
    try {
        
    } catch (error) {
        
    }
}


export default function* resultSaga(){
    yield takeLatest(CREATE_RESULT,createResult)
    yield takeLatest(UPDATE_RESULT,updateResult)
    yield takeLatest(FETCH_RESULT,fetchResult) 
    yield takeLatest(GET_RESULT_BY_SCHEDULE,getResultBySchedule)
    yield takeLatest(SET_MODAL_RESULT,setModalResult) 
}
//watch