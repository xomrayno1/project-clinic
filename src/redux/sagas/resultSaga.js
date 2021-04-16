import {takeLatest, put, call} from 'redux-saga/effects'
import {message} from 'antd'

import {
    SAVE_RESULT,
    SAVE_RESULT_SUCCESS,
    SAVE_RESULT_FAILED,

    UPDATE_RESULT,
    UPDATE_RESULT_SUCCESS,
    UPDATE_RESULT_FAILED,

    FETCH_RESULT,
    FETCH_RESULT_SUCCESS,
    FETCH_RESULT_FAILED,

    GET_RESULT_BY_SCHEDULE,
    GET_RESULT_BY_SCHEDULE_SUCCESS,
    GET_RESULT_BY_SCHEDULE_FAILED,

    SET_MODAL_RESULT,
    SET_MODAL_RESULT_SUCCESS,
    SET_MODAL_RESULT_FAILED
} from '../../utils/Constant'
import resultApi from '../../api/resultApi'

//work
function* saveResult({payload, addRef,setModalResult}){
    try {
     
        yield call(resultApi.save,payload)
        const response = yield call(resultApi.getAllFilter, {
            searchKey: '',
            limit : 5,
            page : 1,
            dateTo : '',
            dateFrom : '',
            
        });
        yield put({type: SAVE_RESULT_SUCCESS, payload: response })
        setModalResult({visible : false})
        message.success( "Lưu thành công",)
    } catch (error) {
        addRef.current.setErrors({
            ...error.response.data.fieldErrors
        })
        // message.error(error.response.data.message)
        yield put({type: SAVE_RESULT_FAILED, payload: error})
    }
}

function* fetchResult({payload}){
    try {
        const response = yield call(resultApi.getAllFilter, payload);
        yield put({type: FETCH_RESULT_SUCCESS, payload : response})
    } catch (error) {
        message.error("Tải thất bại")
        yield put({type: FETCH_RESULT_FAILED, payload: error})
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
        addRef.current.resetForm();
        addRef.current.resetForm({
            image_upload : ''
        });
        addRef.current.setValues({
            // doc_name: result && result.doc_name || '',
            // pati_name: result && result.pati_name || '',
            reason: result && result.reason || '',
            reasonDescribe: result && result.reason_describe || '',
            bloodPressure: result && result.blood_pressure || '',
            height: result && result.height || 0,
            weight:  result && result.weight || 0,
            diagnose:  result && result.diagnose || '',
            note: result && result.note || '',
            id: result && result.id || 0,
            
        })
        yield put({type: SET_MODAL_RESULT_SUCCESS, payload : result})
    } catch (error) {
        //console.log(error.response)
        message.error(error.response.data.message)
        yield put({type: SET_MODAL_RESULT_FAILED, payload : error.response.data.message})
    }
}
function* updateResult({payload, addRef}){
    try {
        yield call(resultApi.save,payload);
        const response = yield call(resultApi.getAllFilter, payload);
        yield put({type: UPDATE_RESULT_SUCCESS, payload: response})
        message.success("Cập nhật thành công")
    } catch (error) {
        message.error(error.response.data.message)
        yield put({type: UPDATE_RESULT_FAILED, payload: error})
    }
}


export default function* resultSaga(){
    yield takeLatest(SAVE_RESULT,saveResult)
    yield takeLatest(UPDATE_RESULT,updateResult)
    yield takeLatest(FETCH_RESULT,fetchResult) 
    yield takeLatest(GET_RESULT_BY_SCHEDULE,getResultBySchedule)
    yield takeLatest(SET_MODAL_RESULT,setModalResult) 
}
//watch